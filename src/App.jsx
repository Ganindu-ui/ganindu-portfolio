import React, { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  useInView
} from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaCode,
  FaServer,
  FaPaintBrush,
  FaBrain,
  FaMicrochip,
  FaUser,
  FaRocket,
  FaEnvelope,
  FaExternalLinkAlt,
  FaPaperPlane,
  FaArrowUp,
  FaDatabase,
  FaMobileAlt,
  FaCloud
} from 'react-icons/fa';
import './App.css';

// ==========================================
//              DATA SECTION
// ==========================================

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

const HERO_DATA = {
  greeting: "Hello, I'm",
  name: "Ganindu Pabasara",
  title_1: "Full Stack",
  title_2: "Developer",
  description: "Designing Responsive, Innovative, and User-Centric Websites with Seamless Full Stack & IoT Solutions. Transforming complex problems into elegant digital experiences.",
  tech_stack: ["React", "Javascript", "Node.js", "Tailwind", "Python", "Framer", "Three.js", "MongoDB"],
  socials: [
    { icon: FaGithub, url: "https://github.com/Ganindu-ui" },
    { icon: FaLinkedin, url: "https://www.linkedin.com/in/ganindu-wickramasinghe/" },
    { icon: FaInstagram, url: "https://www.instagram.com/ganindu_wickramasinghe/" }
  ]
};

const SKILLS_DATA = [
  {
    id: 1,
    icon: <FaCode />,
    title: "Frontend Architecture",
    desc: "Building complex SPAs with React, Redux, and modern CSS frameworks like Tailwind and Bootstrap.",
    level: "90%"
  },
  {
    id: 2,
    icon: <FaServer />,
    title: "Backend Engineering",
    desc: "Designing RESTful APIs using Python (Flask/Django) and Node.js. Database management with SQL & NoSQL.",
    level: "85%"
  },
  {
    id: 3,
    icon: <FaMicrochip />,
    title: "IoT Integration",
    desc: "Bridging the gap between hardware and software using Arduino, Raspberry Pi, and MQTT protocols.",
    level: "80%"
  },
  {
    id: 4,
    icon: <FaBrain />,
    title: "Algorithmic Logic",
    desc: "Advanced problem-solving capabilities, data structure optimization, and performance analysis.",
    level: "95%"
  },
  {
    id: 5,
    icon: <FaDatabase />,
    title: "Database Management",
    desc: "Architecting efficient schemas in PostgreSQL, MySQL, and MongoDB for scalable applications.",
    level: "80%"
  },
  {
    id: 6,
    icon: <FaCloud />,
    title: "Cloud & DevOps",
    desc: "Deploying scalable applications using Docker, AWS, and CI/CD pipelines for automated testing.",
    level: "70%"
  }
];

const PROJECTS_DATA = [
  {
    id: 1,
    title: "Traffic Data Visualizer",
    date: "Nov 2023",
    images: ["/images/traffic data analyser.png"],
    desc: "A Python-based traffic analysis tool using Tkinter. Reads daily survey data and displays vehicle frequency histograms.",
    tags: ["Python", "Tkinter", "Pandas", "Matplotlib"],
    link: "#",
    repo: "https://github.com/Ganindu-ui/Python-based-traffic-data-analysis-system.git"
  },
  {
    id: 2,
    title: "Life Below Water",
    date: "Sept 2024",
    images: ["/images/Life Below Water.png"],
    desc: "A web project inspired by UN Goal 14. Raises awareness about protecting oceans through interactive visuals.",
    tags: ["HTML5", "CSS3", "JS", "GreenSock"],
    link: "#",
    repo: "#"
  },
  {
    id: 3,
    title: "Portfolio 2026",
    date: "Jan 2026",
    images: ["/images/image.png"],
    desc: "This advanced React Single Page Application featuring Framer Motion animations and complex state management.",
    tags: ["React", "Vite", "Motion", "CSS Modules"],
    link: "https://ganindu-portfolio.vercel.app/",
    repo: "https://github.com/Ganindu-ui/ganindu-portfolio.git"
  },
  {
    id: 4,
    title: "Smart Inventory System",
    date: "Feb 2026",
    images: ["/images/SmartStock.png", "/images/SmartStock_2.png"],
    desc: "A full-stack inventory management system for tracking stock, managing products, and monitoring real-time inventory updates with an intuitive dashboard.",
    tags: ["React", "Python", "Supabase", "PostgreSQL"],
    link: "#",
    repo: "https://github.com/Ganindu-ui/SmartInventory.git"
  },
  {
    id: 5,
    title: "Smart Inventory System",
    date: "Feb 2026",
    images: ["/images/SmartStock.png"],
    desc: "A full-stack inventory management system for tracking stock, managing products, and monitoring real-time inventory updates with an intuitive dashboard.",
    tags: ["React", "Node.js", "Supabase", "PostgreSQL"],
    link: "#",
    repo: "https://github.com/Ganindu-ui/SmartInventory.git"
  }
];

// ==========================================
//           ANIMATION VARIANTS
// ==========================================

const VARIANTS = {
  containerStagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 20 }
    }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "backOut" }
    }
  },
  float: {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 1, -1, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  pulseGlow: {
    animate: {
      boxShadow: [
        "0 0 0px rgba(168, 85, 247, 0)",
        "0 0 20px rgba(168, 85, 247, 0.5)",
        "0 0 0px rgba(168, 85, 247, 0)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity
      }
    }
  },
  typingContainer: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  },
  typingLetter: {
    hidden: { opacity: 0, y: 20, rotateX: 90 },
    visible: { opacity: 1, y: 0, rotateX: 0 }
  }
};

// ==========================================
//           SUB-COMPONENTS
// ==========================================

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="splash-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
    >
      <div className="splash-content">
        <motion.div className="splash-icons-row" variants={VARIANTS.containerStagger} initial="hidden" animate="visible">
          {[FaCode, FaRocket, FaUser].map((Icon, i) => (
            <motion.div key={i} className="splash-icon-wrapper" variants={VARIANTS.scaleIn}>
              <Icon />
            </motion.div>
          ))}
        </motion.div>

        <motion.h1
          className="splash-title"
          initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
          animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
          transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
        >
          Ganindu<span className="text-primary">.Dev</span>
        </motion.h1>

        <motion.div
          className="splash-loader"
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 2, delay: 0.8 }}
        />
      </div>
    </motion.div>
  );
};

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });

    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="cursor-dot"
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "tween", duration: 0 }}
      />
      <motion.div
        className="cursor-outline"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          width: isHovering ? 60 : 30,
          height: isHovering ? 60 : 30,
          borderColor: isHovering ? "#ec4899" : "#a855f7",
          mixBlendMode: isHovering ? "difference" : "normal"
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
    </>
  );
};

const Navbar = () => {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "circOut" }}
    >
      <a href="#" className="logo interactive">
        🌟 Ganindu<span className="text-highlight">.Dev</span>
      </a>

      <ul className="nav-menu">
        {NAV_LINKS.map((link, i) => (
          <motion.li
            key={link.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + (i * 0.1) }}
          >
            <a href={`#${link.id}`} className="nav-link interactive">
              <span className="nav-number">0{i + 1}.</span> {link.label}
            </a>
          </motion.li>
        ))}
      </ul>

      <motion.button
        className="btn-resume interactive"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Resume
      </motion.button>
    </motion.nav>
  );
};

const HeroSection = () => {
  const titleLetters = HERO_DATA.title_2.split("");

  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        <motion.div
          className="hero-content"
          variants={VARIANTS.containerStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="status-badge" variants={VARIANTS.fadeInUp}>
            <span className="pulse-dot"></span>
            Ready to Innovate
          </motion.div>

          <motion.h2 variants={VARIANTS.fadeInUp} className="hero-greeting">
            {HERO_DATA.greeting} <span className="text-highlight">{HERO_DATA.name}</span>
          </motion.h2>

          <h1 className="hero-title">
            <motion.div variants={VARIANTS.fadeInUp} className="block-reveal">
              {HERO_DATA.title_1}
            </motion.div>
            <motion.div
              className="gradient-text-wrapper"
              variants={VARIANTS.typingContainer}
            >
              {titleLetters.map((char, index) => (
                <motion.span key={index} variants={VARIANTS.typingLetter} className="gradient-char">
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </h1>

          <motion.p variants={VARIANTS.fadeInUp} className="hero-description">
            {HERO_DATA.description}
          </motion.p>

          <motion.div variants={VARIANTS.fadeInUp} className="hero-actions">
            <a href="#projects" className="btn-primary interactive">
              View Work <FaExternalLinkAlt className="btn-icon" />
            </a>
            <a href="#contact" className="btn-secondary interactive">
              Contact Me <FaEnvelope className="btn-icon" />
            </a>
          </motion.div>

          <motion.div variants={VARIANTS.fadeInUp} className="tech-stack-row">
            <span className="tech-label">Tech Stack:</span>
            <div className="tech-pills">
              {HERO_DATA.tech_stack.map((tech, i) => (
                <motion.span
                  key={tech}
                  className="tech-pill"
                  whileHover={{ y: -5, backgroundColor: "rgba(168, 85, 247, 0.2)" }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image-wrapper"
          initial={{ opacity: 0, x: 100, rotateY: -30 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          variants={VARIANTS.float}
        >
          <div className="hero-image-card">
            <img src="/images/developer.png" alt="Ganindu" className="hero-img" />
            <div className="hero-glow-effect"></div>

            {/* Floating Cards */}
            <motion.div
              className="float-card float-card-1"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            >
              <FaCode /> <span>Clean Code</span>
            </motion.div>
            <motion.div
              className="float-card float-card-2"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
            >
              <FaRocket /> <span>Fast Performance</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      <div className="container about-container">
        <motion.div
          className="about-image-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={VARIANTS.fadeInLeft}
        >
          <div className="about-polaroid">
            <img src="/images/me.jpg" alt="About Ganindu" />
            <div className="polaroid-caption">Working on the Next Big Thing 🚀</div>
          </div>
          <div className="about-bg-blob"></div>
        </motion.div>

        <motion.div
          className="about-text-col"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={VARIANTS.containerStagger}
        >
          <motion.h3 variants={VARIANTS.fadeInUp} className="section-subtitle">Who I Am</motion.h3>
          <motion.h2 variants={VARIANTS.fadeInUp} className="section-title">
            Passionate About <span className="text-primary">Technology</span> & <span className="text-secondary">Innovation</span>
          </motion.h2>

          <motion.p variants={VARIANTS.fadeInUp} className="about-desc">
            I’m <span className="highlight">Ganindu Pabasara</span>, a tech enthusiast from Sri Lanka with a deep love for creating digital solutions that matter.
            My journey began with breaking apart electronic toys to see how they worked, which naturally evolved into a career in
            <span className="highlight"> Full Stack Development</span> and <span className="highlight">IoT Engineering</span>.
          </motion.p>

          <motion.p variants={VARIANTS.fadeInUp} className="about-desc">
            I believe that code is more than just syntax; it's a tool to solve real-world problems. Whether I'm optimizing a database query
            or soldering a sensor to a microcontroller, I bring the same level of dedication and curiosity to every task.
          </motion.p>

          <motion.div variants={VARIANTS.fadeInUp} className="about-stats">
            <div className="stat-item">
              <span className="stat-number">02+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">3+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <motion.div
          className="section-header text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">My Technical <span className="text-primary">Arsenal</span></h2>
          <p className="section-lead">The tools and technologies I use to bring ideas to life.</p>
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={VARIANTS.containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SKILLS_DATA.map((skill) => (
            <motion.div
              key={skill.id}
              className="skill-card glass-panel interactive"
              variants={VARIANTS.fadeInUp}
              whileHover={{
                y: -10,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderColor: "#a855f7"
              }}
            >
              <div className="skill-icon-wrapper">
                {skill.icon}
              </div>
              <h3 className="skill-title">{skill.title}</h3>
              <p className="skill-desc">{skill.desc}</p>
              <div className="skill-bar-container">
                <div className="skill-level-label">Proficiency</div>
                <div className="skill-bar-bg">
                  <motion.div
                    className="skill-bar-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.level }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const currentImageIndex = isHovered && project.images.length > 1 ? 1 : 0;

  return (
    <motion.div
      className="project-card interactive"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="project-image-container">
        <AnimatePresence mode="wait">
          <motion.img
            key={project.images[currentImageIndex]}
            src={project.images[currentImageIndex]}
            alt={project.title}
            className="project-img"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>
        
        {project.images.length > 1 && (
          <div className="project-image-dots">
            {project.images.map((_, i) => (
              <div 
                key={i} 
                className={`image-dot ${i === currentImageIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        )}

        <div className="project-overlay">
          <button className="btn-icon-only"><FaExternalLinkAlt /></button>
          <button className="btn-icon-only"><FaGithub /></button>
        </div>
      </div>
      <div className="project-content">
        <div className="project-meta">
          <span className="project-date">{project.date}</span>
          <div className="project-tags">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="tiny-tag">#{tag}</span>
            ))}
          </div>
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.desc}</p>
        <a href={project.link} className="project-link">Read Case Study &rarr;</a>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.div className="section-header">
          <h2 className="section-title">Featured <span className="text-secondary">Projects</span></h2>
        </motion.div>

        <div className="projects-grid">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── EmailJS Configuration ────────────────────────────────────────────────
// Replace the three placeholders below with your real EmailJS credentials:
//   1. Go to https://www.emailjs.com/ and create a free account
//   2. Add an Email Service  → copy the Service ID
//   3. Create an Email Template → copy the Template ID
//      Template variables to use: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
//   4. Go to Account → API Keys → copy the Public Key
const EMAILJS_SERVICE_ID = 'service_beniihq';   
const EMAILJS_TEMPLATE_ID = 'template_ndkel7c';  
const EMAILJS_PUBLIC_KEY = 'tD1XU03PmDdGKFaHO';   

const Toast = ({ toast, onDismiss }) => (
  <AnimatePresence>
    {toast && (
      <motion.div
        className={`toast toast-${toast.type}`}
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 60, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <span>{toast.type === 'success' ? '✅' : '❌'}</span>
        <span>{toast.message}</span>
        <button className="toast-close" onClick={onDismiss}>×</button>
      </motion.div>
    )}
  </AnimatePresence>
);

const ContactSection = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      showToast('error', 'Please fill in all required fields.');
      return;
    }
    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject || 'No Subject',
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      showToast('success', "Message sent! I'll get back to you soon 🚀");
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      showToast('error', 'Oops! Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <Toast toast={toast} onDismiss={() => setToast(null)} />
      <div className="container contact-container-inner">
        <div className="contact-bg-glow"></div>

        <motion.div
          className="contact-card glass-panel"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="contact-header">
            <h2 className="section-title">Let's Start a <span className="text-primary">Conversation</span></h2>
            <p>Have a project in mind or just want to say hi? My inbox is always open.</p>
          </div>

          <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="contact-name">Your Name <span className="required">*</span></label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="interactive"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="contact-email">Your Email <span className="required">*</span></label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  className="interactive"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="contact-subject">Subject</label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                placeholder="Project Inquiry"
                className="interactive"
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="contact-message">Message <span className="required">*</span></label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder="Tell me about your project..."
                className="interactive"
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <motion.button
              type="submit"
              className={`btn-submit interactive${sending ? ' btn-sending' : ''}`}
              whileHover={sending ? {} : { scale: 1.02 }}
              whileTap={sending ? {} : { scale: 0.98 }}
              disabled={sending}
            >
              {sending ? (
                <><span className="spinner"></span> Sending...</>
              ) : (
                <>Send Message <FaPaperPlane /></>
              )}
            </motion.button>
          </form>

          <div className="contact-socials">
            <p>Or connect via social media:</p>
            <div className="social-icons-row">
              {HERO_DATA.socials.map((social, i) => (
                <a key={i} href={social.url} className="social-icon-link interactive">
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-col">
          <h3 className="footer-logo">Ganindu.Dev</h3>
          <p>Building the future, one line of code at a time.</p>
        </div>
        <div className="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Ganindu Pabasara Wickramasinghe. All rights reserved.</p>
      </div>
    </footer>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="scroll-to-top interactive"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ y: -5 }}
        >
          <FaArrowUp />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ==========================================
//             MAIN APP COMPONENT
// ==========================================

function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="app-wrapper">
      <AnimatePresence mode="wait">
        {loading ? (
          <SplashScreen key="splash" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CustomCursor />

            <motion.div
              className="scroll-progress-bar"
              style={{ scaleX }}
            />

            {/* Background Particles/Stars would be handled via CSS or a separate Canvas component */}
            <div className="stars-bg"></div>
            <div className="stars-bg-2"></div>
            <div className="stars-bg-3"></div>

            <Navbar />

            <main>
              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <ContactSection />
            </main>

            <Footer />
            <ScrollToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;