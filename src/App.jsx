import { useState, useEffect } from 'react'
import './App.css'
import profilePhoto from './assets/jibsonlambinicio.jpg'
import resumePDF from './assets/Jibson_Lambinicio_Resume.pdf'
import logo from './assets/Logo.png'
import gameTrailer from './assets/cybereum_trailer.mp4'
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaLinkedin, FaGraduationCap, FaBriefcase, FaGithub, FaArrowUp, FaDownload, FaPlay } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { IoLocationSharp } from 'react-icons/io5'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowBackToTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, observerOptions)

    // Observe all elements with animate class
    const animateElements = document.querySelectorAll('.animate-on-scroll')
    animateElements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
      setIsMenuOpen(false)
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const name = formData.get('name')
    const email = formData.get('email')
    const message = formData.get('message')
    
    // Create mailto link with pre-filled content
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)
    const mailtoLink = `mailto:lambiniciojibsonpaul@gmail.com?subject=${subject}&body=${body}`
    
    // Open email client
    window.location.href = mailtoLink
    
    // Reset form
    e.target.reset()
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const openVideoModal = () => {
    setShowVideoModal(true)
  }

  const closeVideoModal = () => {
    setShowVideoModal(false)
  }

  return (
    <div className="app">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">JPL15</div>
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a href="#about" onClick={() => scrollToSection('about')}>About</a></li>
            <li><a href="#experience" onClick={() => scrollToSection('experience')}>Experience</a></li>
            <li><a href="#projects" onClick={() => scrollToSection('projects')}>Projects</a></li>
            <li><a href="#skills" onClick={() => scrollToSection('skills')}>Skills</a></li>
            <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
          </ul>
          <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {isDarkMode ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="profile-photo">
            <img src={profilePhoto} alt="Jibson Paul Lambinicio" />
          </div>
          <div className="hero-text">
            <h1 className="greeting">Hi, I'm</h1>
            <h1 className="name">Jibson Paul Lambinicio</h1>
            <p className="tagline">Fresh IT Graduate | Software Developer | AI-Powered Developer</p>
            <p className="subtitle">Building innovative and reliable digital solutions with passion and creativity</p>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={() => scrollToSection('contact')}>Get In Touch</button>
              <button className="btn-secondary" onClick={() => scrollToSection('projects')}>View My Work</button>
              <a 
                href={resumePDF} 
                download="Jibson_Lambinicio_Resume.pdf"
                className="btn-download"
              >
                <FaDownload /> Download Resume
              </a>
            </div>
          </div>
        </div>
        <div className="scroll-indicator" onClick={() => scrollToSection('about')}>
          <div className="mouse"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title animate-on-scroll">About Me</h2>
          <div className="about-content">
            <div className="about-text animate-on-scroll">
              <p className="intro">
                Hello! I’m Jibson Paul, an Information Technology graduate from Lyceum of the Philippines University – Cavite, 
                passionate about turning ideas into intelligent, efficient, and impactful digital solutions.
              </p>
              <p>
                My background in software and web development, game design, and IT support has strengthened my ability to approach technical challenges 
                with both creativity and precision. During my internship at OKADA Manila, I optimized system operations, streamlined processes, and gained
                valuable hands-on experience in enterprise-level IT environments.
              </p>
              <p>
                I actively leverage AI technologies to enhance productivity, streamline development, and improve overall efficiency. 
                Beyond practical application, I’m committed to deepening my understanding of artificial intelligence and how it drives automation, innovation, 
                and the creation of smarter software systems.
              </p>
              <div className="objective-box">
                <h3>My Objective</h3>
                <p>
                  To develop scalable, AI-driven digital solutions that enhance productivity, reliability, and user
                  experience, while continuously learning new technologies, programming languages, and frameworks
                  to make a meaningful impact in the tech industry.

                </p>
              </div>
            </div>
            <div className="about-stats animate-on-scroll">
              <div className="stat-card">
                <div className="stat-number">2025</div>
                <div className="stat-label">BS Information Technology Graduate</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">AI-Driven Workflow</div>
                <div className="stat-label">Using AI tools to code faster, stay organized, and work smarter</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">98% App Efficiency</div>
                <div className="stat-label">Tested and optimized in real-world project development</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="education">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Education</h2>
          <div className="education-card animate-on-scroll">
            <div className="edu-header">
              <h3>Lyceum of the Philippines University Cavite</h3>
              <span className="year">2021 - 2025</span>
            </div>
            <p className="degree">Bachelor of Science in Information Technology</p>
            <div className="coursework">
              <h4>Relevant Coursework:</h4>
              <div className="course-tags">
                <span>Software Engineering</span>
                <span>Database Management Systems</span>
                <span>Web Systems & Technologies</span>
                <span>Operating Systems</span>
                <span>Network Administration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="experience">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Work Experience</h2>
          <div className="timeline">
            <div className="timeline-item animate-on-scroll">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="experience-header">
                  <h3>IT ELV Operations Intern</h3>
                  <span className="company">OKADA Manila</span>
                  <span className="duration">Feb 2025 - May 2025</span>
                </div>
                <ul className="responsibilities">
                  <li>Assisted in troubleshooting, configuring, and deploying over 50+ IT systems and devices, ensuring smooth daily operations across departments</li>
                  <li>Managed event schedules using the 22Miles digital signage system, supporting multiple business units for real-time display updates</li>
                  <li>Recorded and organized deployed and faulty IT devices using Microsoft Excel, improving tracking accuracy and documentation efficiency</li>
                  <li>Prepared technical reports and assisted in project planning, contributing to well-documented and organized project workflows</li>
                  <li>Monitored network room conditions and performed preventive maintenance, reducing potential downtime by 15%</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Featured Project</h2>
          <div className="project-card featured animate-on-scroll">
            <div className="project-header">
              <h3>Cybereum: A Gamified Approach to Cybersecurity Education for K-12 Students</h3>
              <span className="project-tag">Capstone Project</span>
            </div>
            <p className="project-description">
              Developed a gamified mobile application to promote cybersecurity awareness among K-12 students 
              through interactive gameplay and DepEd-aligned educational modules.
            </p>
            <div className="project-details">
              <div className="detail-item">
                <h4>Key Achievements:</h4>
                <ul>
                  <li>Built using Unity (C#) and Firebase for real-time data management</li>
                  <li>Achieved 98.26% functionality and 100% compatibility across Android 10-14</li>
                  <li>Validated through testing with significant student learning gains</li>
                  <li>Received MARS rating of 3.76 ("Highly Acceptable")</li>
                  <li>Accepted for oral presentation at ICITE 2025, Saigon University, Vietnam</li>
                </ul>
              </div>
              <div className="tech-stack">
                <h4>Technologies Used:</h4>
                <div className="tech-tags">
                  <span>Unity</span>
                  <span>C#</span>
                  <span>Firebase</span>
                  <span>Game Design</span>
                  <span>Educational Tech</span>
                </div>
              </div>
            </div>
            <button className="btn-primary project-btn" onClick={openVideoModal}>
              <FaPlay /> View Project 
            </button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Technical Skills</h2>
          <div className="skills-grid">
            <div className="skill-category animate-on-scroll">
              <h3>Programming Languages</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <span className="skill-name">JavaScript</span>
                  <div className="skill-bar"><div className="skill-level" style={{width: '80%'}}></div></div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">Python</span>
                  <div className="skill-bar"><div className="skill-level" style={{width: '65%'}}></div></div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">C#</span>
                  <div className="skill-bar"><div className="skill-level" style={{width: '80%'}}></div></div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">HTML/CSS</span>
                  <div className="skill-bar"><div className="skill-level" style={{width: '90%'}}></div></div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">SQL</span>
                  <div className="skill-bar"><div className="skill-level" style={{width: '75%'}}></div></div>
                </div>
              </div>
            </div>

            <div className="skill-category animate-on-scroll">
              <h3>Frameworks & Libraries</h3>
              <div className="skill-tags">
                <span>React</span>
                <span>Bootstrap</span>
                <span>Node.js</span>
                <span>Tailwind CSS</span>
                <span>Next.js</span>
              </div>
            </div>

            <div className="skill-category animate-on-scroll">
              <h3>Tools & Platforms</h3>
              <div className="skill-tags">
                <span>Visual Studio Code</span>
                <span>Unity</span>
                <span>Git/GitHub</span>
                <span>Adobe Creative Suite</span>
                <span>Canva</span>
                <span>22Miles</span>
                <span>Microsoft 365</span>
                <span>Firebase</span>
                <span>Jira</span>
                <span>GitHub Copilot</span>
                <span>Cursor AI</span>
              </div>
            </div>

            <div className="skill-category animate-on-scroll">
              <h3>Other Skills</h3>
              <div className="skill-tags">
                <span>Hardware/Software Troubleshooting</span>
                <span>Preventive Maintenance</span>
                <span>Networking Fundamentals</span>
                <span>Generative AI Tools</span>
                <span>Prompt Engineering</span>
              </div>
            </div>
          </div>

          <div className="certifications animate-on-scroll">
            <h3>Certifications</h3>
            <div className="cert-grid">
              <div className="cert-card">
                <div className="cert-icon"><FaGraduationCap /></div>
                <h4>CCNAv7: Introduction to Networks</h4>
                <p>Lyceum of the Philippines University</p>
                <span className="cert-date">February 2024</span>
              </div>
              <div className="cert-card">
                <div className="cert-icon"><FaBriefcase /></div>
                <h4>SAP Business One: SAP Basic</h4>
                <p>Lyceum of the Philippines University</p>
                <span className="cert-date">March 2023</span>
              </div>
            </div>
          </div>
        </div>
      </section>

         {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title animate-on-scroll">Get In Touch</h2>
          <p className="contact-intro animate-on-scroll">
            I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, 
            feel free to reach out! I'll do my best to get back to you as soon as possible.
          </p>
          
          <div className="contact-content">
            <div className="contact-form-wrapper animate-on-scroll">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="John Doe" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="john@example.com" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    placeholder="Your message here..." 
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary submit-btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="social-links">
            <a href="https://github.com/lambiniciojibsonpaul-art" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/jibson-lambinicio-442166363" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="mailto:lambiniciojibsonpaul@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
          <p>&copy; 2025 Jibson Paul Lambinicio. All rights reserved.</p>

        </div>
      </footer>

      {/* Back to Top Button */}
      <button 
        className={`back-to-top ${showBackToTop ? 'show' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="video-modal" onClick={closeVideoModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeVideoModal}>×</button>
            <h2>Cybereum Game Preview</h2>
            <video controls autoPlay>
              <source src={gameTrailer} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
