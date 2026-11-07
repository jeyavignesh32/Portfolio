
import { useState } from "react";
import { Send, Mail, CheckCircle, AlertCircle } from "lucide-react";
import "./Contact.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });

  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));

    if (status.message) {
      setStatus({ type: "", message: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to send your message."
        );
      }

      setStatus({
        type: "success",
        message: result.message,
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        website: "",
      });

    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: "name",
      label: "Your Name",
      type: "text",
      placeholder: "Enter your name",
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "subject",
      label: "Subject",
      type: "text",
      placeholder: "What would you like to discuss?",
    },
  ];

  return (
    <section
      className="section contact contact-clean"
      id="contact"
    >
      <div className="container contact-clean-container">
        <h2 className="section-title">Contact</h2>

        <div className="contact-clean-intro">
          <Mail size={21} />
          <span>Send me a message</span>
        </div>

        <div className="contact-form-side animate-on-scroll">
          <div className="contact-form-card glass-card">
            <form
              onSubmit={handleSubmit}
              className="contact-form"
            >
              {fields.map((field) => (
                <div
                  className={`form-group ${
                    focusedField === field.name ? "focused" : ""
                  }`}
                  key={field.name}
                >
                  <label htmlFor={`contact-${field.name}`}>
                    {field.label}
                  </label>

                  <input
                    id={`contact-${field.name}`}
                    name={field.name}
                    type={field.type}
                    required
                    maxLength={
                      field.name === "name" ? 100 :
                      field.name === "email" ? 254 : 150
                    }
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              ))}

              <div
                className={`form-group ${
                  focusedField === "message" ? "focused" : ""
                }`}
              >
                <label htmlFor="contact-message">
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows="6"
                  required
                  maxLength={5000}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              {/* Hidden spam protection field */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  height: 0,
                  overflow: "hidden",
                }}
              >
                <label htmlFor="contact-website">
                  Leave this field empty
                </label>

                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex="-1"
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              {status.message && (
                <div
                  className={`contact-status ${status.type}`}
                  role="status"
                  aria-live="polite"
                >
                  {status.type === "success" ? (
                    <CheckCircle size={19} />
                  ) : (
                    <AlertCircle size={19} />
                  )}

                  <span>{status.message}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={loading}
              >
                <Send size={18} />

                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
