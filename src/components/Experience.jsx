
import { Briefcase, CalendarDays, Code2 } from 'lucide-react';
import './Experience.css';
import './Projects.css';

const Experience = () => {
  const internships = [
    {
      icon: <Code2 size={20} />,
      title: 'Internship Trainee – JavaScript & IT Skills',
      company: 'Zoho Corporation Pvt. Ltd.',
      location: 'Surandai',
      duration: 'November – December 2025',
      description:
        'Completed internship training at Zoho Corporation, gaining knowledge in JavaScript, IT skills and object-oriented programming concepts.',
      highlights: [
        'JavaScript programming fundamentals',
        'IT skills and technical learning',
        'Object-oriented programming concepts',
      ],
      tech: ['JavaScript', 'IT Skills', 'OOP'],
    },
    {
      icon: <Briefcase size={20} />,
      title: 'Internship Trainee – Core Java',
      company: 'Zoho Corporation Pvt. Ltd.',
      location: 'Surandai',
      duration: 'December 2024',
      description:
        'Underwent internship training in core Java programming, strengthening programming fundamentals and problem-solving skills.',
      highlights: [
        'Core Java programming',
        'Programming fundamentals',
        'Problem-solving skills',
      ],
      tech: ['Java', 'Programming', 'Problem Solving'],
    },
  ];

  return (
    <section className="section experience" id="experience">
      <div className="container">
        <h2 className="section-title">Professional Experience</h2>

        <div className="projects-grid experience-grid">
          {internships.map((internship, index) => (
            <div
              key={index}
              className="project-card glass-card animate-on-scroll"
            >
              <div className="project-header">
                <div className="project-icon">
                  {internship.icon}
                </div>
                <span className="experience-type">Internship</span>
              </div>

              <h3 className="project-title">
                {internship.title}
              </h3>

              <h4 className="experience-company">
                {internship.company}
              </h4>

              <p className="experience-duration">
                <CalendarDays size={15} />
                {internship.duration}
              </p>

              <p className="experience-location">
                {internship.location}
              </p>

              <p className="project-description">
                {internship.description}
              </p>

              <div className="project-features">
                <h4>Training Highlights:</h4>
                <ul>
                  {internship.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </div>

              <div className="project-tech">
                {internship.tech.map((item, i) => (
                  <span key={i} className="tech-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
