import { useState, useEffect } from 'react';
import { Download, ChevronRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import profilePic from '../assets/blazer-portrait.png';
import './Hero.css';

const Hero = () => {
  const roles = [
    'Full Stack Developer',
    'MERN Stack Enthusiast', 
    'Problem Solver',
    'Creative Coder'
  ];
  
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section className="hero" id="home">
      {/* Hero Particle Grid */}
      <div className="hero-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${6 + Math.random() * 8}s`
          }} />
        ))}
      </div>

      <div className="container hero-container animate-on-scroll">
        
        <div className="profile-wrapper animate-fade-in">
          <div className="profile-glow"></div>
          <div className="profile-pic">
            <img src={profilePic} alt="Jeyavignesh J" className="profile-image" />
          </div>
        </div>

        <div className="hero-content">
          <h2 className="greeting animate-fade-in delay-100">Hello, I'm</h2>
          <h1 className="name">
            Jeyavignesh J
          </h1>
          <h3 className="role animate-fade-in delay-200">
            <span className="typing-text">{displayText}</span>
            <span className="cursor">|</span>
          </h3>
          <p className="description animate-fade-in delay-300">
            Final-year Information Technology student with a strong foundation in building real-world web applications.
            Proficient in React, Node.js, Express.js, MongoDB and MySQL, with a passion for solving problems and creating impactful solutions.
          </p>
          
          <div className="cta-group animate-fade-in delay-400">
            <a href="#projects" className="btn btn-primary">
              View Projects <ChevronRight size={18} />
            </a>
            <a href="/Jeyavignesh_Resume.pdf" download="Jeyavignesh_Resume.pdf" className="btn btn-outline">
              <Download size={18} /> Download Resume
            </a>
          </div>

          <div className="social-connect animate-fade-in delay-400">
            <p className="connect-text">CONNECT WITH ME</p>
            <div className="social-icons">
              <a href="https://github.com/jeyavignesh32" className="social-icon" aria-label="GitHub">
                <FaGithub size={21} />
              </a>
              <a href="http://www.linkedin.com/in/jeyavignesh-j-284543311" className="social-icon" aria-label="LinkedIn">
                <FaLinkedinIn size={21} />
              </a>
              <a href="https://leetcode.com/u/MWOWFci40J/" className="social-icon" aria-label="LeetCode">
                <SiLeetcode size={21} />
              </a>
              <a href="mailto:jeyavignesh0732@gmail.com" className="social-icon" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator animate-fade-in">
        <div className="scroll-line"></div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
};

export default Hero;
