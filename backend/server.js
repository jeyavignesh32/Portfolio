
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// -------------------- SECURITY --------------------

app.use(helmet());

const allowedOrigins = [
  "https://jeyavignesh32.github.io",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json({ limit: "10kb" }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many messages. Please try again later.",
  },
});

// -------------------- EMAIL CONFIGURATION --------------------

// If BREVO_API_KEY exists, use the HTTPS API.
// Otherwise, use SMTP for local VS Code development.

const useBrevoApi = Boolean(process.env.BREVO_API_KEY?.trim());

const requiredEnv = [
  "BREVO_FROM_NAME",
  "BREVO_FROM_EMAIL",
  "CONTACT_RECEIVER_EMAIL",
  ...(useBrevoApi
    ? ["BREVO_API_KEY"]
    : [
        "BREVO_SMTP_HOST",
        "BREVO_SMTP_PORT",
        "BREVO_SMTP_LOGIN",
        "BREVO_SMTP_KEY",
      ]),
];

const missingEnv = requiredEnv.filter(
  (key) => !process.env[key]?.trim()
);

if (missingEnv.length > 0) {
  console.error(
    "Missing environment variables:",
    missingEnv.join(", ")
  );
  process.exit(1);
}

console.log(
  useBrevoApi
    ? "Email provider: Brevo HTTPS API"
    : "Email provider: Brevo SMTP"
);

// -------------------- SMTP FALLBACK FOR LOCAL DEVELOPMENT --------------------

let transporter = null;

if (!useBrevoApi) {
  transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST,
    port: Number(process.env.BREVO_SMTP_PORT),
    secure: Number(process.env.BREVO_SMTP_PORT) === 465,
    auth: {
      user: process.env.BREVO_SMTP_LOGIN,
      pass: process.env.BREVO_SMTP_KEY,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });

  transporter.verify((error) => {
    if (error) {
      console.error("Brevo SMTP connection failed:", error.message);
    } else {
      console.log("Brevo SMTP connection successful.");
    }
  });
}

// -------------------- VALIDATION AND HELPERS --------------------

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const escapeHtml = (value = "") => {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
};

// -------------------- HEALTH CHECK --------------------

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio backend is running.",
  });
});

// -------------------- CONTACT FORM API --------------------

app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message,
      website,
    } = req.body || {};

    // Honeypot: silently accept bot submissions
    if (website) {
      return res.status(200).json({
        success: true,
        message: "Message received successfully.",
      });
    }

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim();
    const cleanSubject = String(subject).trim();
    const cleanMessage = String(message).trim();

    if (
      cleanName.length < 2 ||
      cleanName.length > 80 ||
      cleanEmail.length > 190 ||
      cleanSubject.length < 2 ||
      cleanSubject.length > 150 ||
      cleanMessage.length < 10 ||
      cleanMessage.length > 5000
    ) {
      return res.status(400).json({
        success: false,
        message: "Please check the length of your submitted details.",
      });
    }

    if (!isValidEmail(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    const safeName = escapeHtml(cleanName);
    const safeEmail = escapeHtml(cleanEmail);
    const safeSubject = escapeHtml(cleanSubject);
    const safeMessage = escapeHtml(cleanMessage);

    const emailSubject = `Portfolio Contact: ${cleanSubject}`;

    const textContent = `
New Portfolio Contact Message

Name: ${cleanName}
Email: ${cleanEmail}
Subject: ${cleanSubject}

Message:
${cleanMessage}
`;

    const htmlContent = `
<div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;padding:20px;color:#222;">
  <h2 style="color:#16a085;">New Portfolio Contact Message</h2>
  <p><strong>Name:</strong> ${safeName}</p>
  <p><strong>Email:</strong> ${safeEmail}</p>
  <p><strong>Subject:</strong> ${safeSubject}</p>
  <hr style="border:0;border-top:1px solid #ddd;margin:20px 0;">
  <h3>Message</h3>
  <p style="white-space:pre-wrap;line-height:1.6;">${safeMessage}</p>
</div>
`;

    // -------------------- BREVO HTTPS API --------------------

    if (useBrevoApi) {
      const brevoResponse = await fetch(
        "https://api.brevo.com/v3/smtp/email",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "api-key": process.env.BREVO_API_KEY,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            sender: {
              name: process.env.BREVO_FROM_NAME,
              email: process.env.BREVO_FROM_EMAIL,
            },
            to: [
              {
                email: process.env.CONTACT_RECEIVER_EMAIL,
              },
            ],
            replyTo: {
              email: cleanEmail,
              name: cleanName,
            },
            subject: emailSubject,
            textContent,
            htmlContent,
          }),
        }
      );

      const responseText = await brevoResponse.text();

      let result = {};

      try {
        result = responseText ? JSON.parse(responseText) : {};
      } catch {
        result = {};
      }

      if (!brevoResponse.ok) {
        console.error("Brevo API request failed:", {
          status: brevoResponse.status,
          response: result,
        });

        return res.status(502).json({
          success: false,
          message:
            "Email provider could not accept your message. Please try again later.",
        });
      }

      console.log("Brevo API accepted contact email:", {
        messageId: result.messageId || "Accepted",
      });

      return res.status(200).json({
        success: true,
        message: "Your message was accepted for email processing.",
      });
    }

    // -------------------- SMTP FALLBACK --------------------

    const info = await transporter.sendMail({
      from: {
        name: process.env.BREVO_FROM_NAME,
        address: process.env.BREVO_FROM_EMAIL,
      },
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: cleanEmail,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
    });

    console.log("Brevo SMTP response:", {
      accepted: info.accepted,
      rejected: info.rejected,
      messageId: info.messageId,
    });

    const recipientAccepted = info.accepted.some(
      (address) =>
        address.toLowerCase() ===
        process.env.CONTACT_RECEIVER_EMAIL.toLowerCase()
    );

    if (!recipientAccepted || info.rejected.length > 0) {
      return res.status(502).json({
        success: false,
        message:
          "Brevo did not accept the recipient. Please try again later.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your message was accepted for email processing.",
    });

  } catch (error) {
    console.error("Contact email error:", {
      message: error.message,
      code: error.code,
      status: error.status,
    });

    return res.status(500).json({
      success: false,
      message:
        "Unable to send your message right now. Please try again later.",
    });
  }
});

// -------------------- ERROR HANDLER --------------------

app.use((error, req, res, next) => {
  if (
    error instanceof SyntaxError &&
    error.status === 400 &&
    "body" in error
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid request data.",
    });
  }

  if (error.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "Origin not allowed.",
    });
  }

  console.error("Server error:", error.message);

  return res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

// -------------------- START SERVER --------------------

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Portfolio backend running on port ${PORT}`);
});
