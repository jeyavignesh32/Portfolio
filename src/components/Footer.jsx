import { Code2, Link, Mail, Heart, ArrowUp, ExternalLink } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-glow"></div>
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h2 className="footer-name">
              <span className="gradient-text">Jeyavignesh J</span>
            </h2>
            <p className="footer-tagline">Full Stack Developer &middot; MERN Stack Enthusiast</p>
          </div>

          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-socials">
            <a href="https://github.com/jeyavignesh32" className="footer-social-icon" aria-label="GitHub">
              <Code2 size={18} />
            </a>
            <a href="http://www.linkedin.com/in/jeyavignesh-j-284543311" className="footer-social-icon" aria-label="LinkedIn">
              <Link size={18} />
            </a>
            <a href="https://leetcode.com/u/MWOWFci40J/" className="footer-social-icon" aria-label="LeetCode">
              <ExternalLink size={18} />
            </a>
            <a href="mailto:jeyavignesh0732@gmail.com" className="footer-social-icon" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; 2026 Jeyavignesh J. Built with <Heart size={14} className="heart-icon" /> and React.
          </p>
          <button className="back-to-top" onClick={scrollToTop} aria-label="Scroll to top">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
