import './Skills.css';

const Skills = () => {
  const skillCategories = [
    { name: "HTML & CSS", percent: 90 },
    { name: "React", percent: 85 },
    { name: "JavaScript", percent: 85 },
    { name: "Java", percent: 85 },
    { name: "Node.js", percent: 80 },
    { name: "Express.js", percent: 80 },
    { name: "MySQL", percent: 80 },
    { name: "Python", percent: 80 },
    { name: "MongoDB", percent: 75 },
    { name: "C++", percent: 75 },
    { name: "Git & GitHub", percent: 80 },
    { name: "Docker & Jira", percent: 70 }
  ];

  return (
    <section className="section skills" id="skills">
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        
        <div className="skills-container glass-card animate-on-scroll">
          <div className="skill-bars-list">
            {skillCategories.map((skill, i) => (
              <div key={i} className="skill-bar-item">
                <div className="skill-bar-meta">
                  <span>{skill.name}</span>
                  <span>{skill.percent}%</span>
                </div>
                <div className="skill-bar-track">
                  <div
                    className="skill-bar-fill"
                    style={{ width: `${skill.percent}%`, animationDelay: `${i * 0.1}s` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
