import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import './Education.css';

const Education = () => {
  return (
    <section className="section education" id="education">
      <div className="container">
        <h2 className="section-title">Education</h2>
        
        <div className="education-timeline">
          <div className="timeline-item glass-card">
            <div className="timeline-icon">
              <GraduationCap size={28} />
            </div>
            <div className="timeline-content">
              <h3 className="gradient-text">Bachelor of Technology in Information Technology</h3>
              <div className="timeline-meta">
                <span><MapPin size={16} /> P.S.R Engineering College</span>
                <span><Calendar size={16} /> 2023 – Present</span>
              </div>
              <p>
                CGPA: 8.2. Focused on software development, web technologies, database management systems, and problem solving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
