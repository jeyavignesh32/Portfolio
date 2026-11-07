import { ExternalLink, Code2, Lightbulb, PenTool, LayoutDashboard } from 'lucide-react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      icon: <Lightbulb size={20} />,
      title: "Interactive Job & Internship Platform (Fake-Free)",
      description: "Engineered a web platform enabling employer verification to prevent fake job and internship postings. Implemented secure JWT-based login system and designed a MySQL schema supporting 3 user roles for job listing management.",
      keyFeatures: [
        "Employer verification",
        "Secure JWT-based login",
        "Role-based job management"
      ],
      tech: ["React", "Node.js", "Express.js", "MySQL", "JWT", "REST APIs"],
      demoLink: "https://github.com/jeyavignesh32/JobSecure#readme",
      githubLink: "https://github.com/jeyavignesh32/JobSecure"
    },
    {
      icon: <LayoutDashboard size={20} />,
      title: "Travel Expense Tracker",
      description: "Designed an application to track and manage travel expenses and daily expense records. Used database storage to maintain expense history and calculate total expenses.",
      keyFeatures: [
        "Track travel expenses",
        "Manage daily records",
        "Calculate total expenses"
      ],
      tech: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs"],
      demoLink: "https://github.com/jeyavignesh32/travel-expense-tracker#readme",
      githubLink: "https://github.com/jeyavignesh32/travel-expense-tracker"
    },
    {
      icon: <PenTool size={20} />,
      title: "Public Issue Tracker",
      description: "Built a civic issue reporting platform where citizens can raise and track local problems like road damage and electricity outages, with a role-based system for citizens and admins to manage issues efficiently.",
      keyFeatures: [
        "Role-based system",
        "Track local problems",
        "Admin issue management"
      ],
      tech: ["React", "Node.js", "Express.js", "MySQL", "REST APIs"],
      demoLink: "https://github.com/jeyavignesh32/Public_Issue_Tracker#readme",
      githubLink: "https://github.com/jeyavignesh32/Public_Issue_Tracker"
    }
  ];

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card glass-card animate-on-scroll">
              <div className="project-header">
                <div className="project-icon">
                  {project.icon}
                </div>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="project-features">
                <h4>Key Features:</h4>
                <ul>
                  {project.keyFeatures.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>

              <div className="project-actions">
                <a href={project.demoLink} className="btn-small btn-outline">
                  <ExternalLink size={16} /> View Details
                </a>
                <a href={project.githubLink} className="btn-small btn-primary">
                  <Code2 size={16} /> Source Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
