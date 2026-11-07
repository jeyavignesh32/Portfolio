import { Code2, Layers3, Lightbulb } from 'lucide-react';
import './About.css';

export default function About() {
  return (
    <section className="section about about-clean" id="about">
      <div className="container about-clean-container">
        <h2 className="section-title">About Me</h2>
        <div className="about-clean-card glass-card animate-on-scroll">
          <p className="about-lead">
            I'm <strong className="gradient-text">Jeyavignesh J</strong>, a Full Stack Developer and final-year
            Information Technology student who enjoys turning ideas into useful, reliable web applications.
          </p>
          <p>
            I work across frontend and backend development, building responsive interfaces and practical
            application features using React, Node.js, Express.js, MongoDB and MySQL. I value clean code,
            thoughtful problem-solving and continuous learning, and I enjoy collaborating on projects that
            solve real-world problems.
          </p>
          <div className="about-highlights">
            <div><Code2 size={20} /><span>Full-stack development</span></div>
            <div><Layers3 size={20} /><span>Frontend & backend</span></div>
            <div><Lightbulb size={20} /><span>Problem-solving mindset</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
