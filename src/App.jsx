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
  FaCloud,
  FaTimes,
  FaLock,
  FaThumbtack,
  FaBolt,
  FaCheckCircle,
  FaCertificate,
  FaCog,
  FaLaptopCode,
  FaTools
} from 'react-icons/fa';
import './App.css';
import { usePortfolio } from './context/PortfolioContext';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminAuthModal } from './components/admin/AdminAuthModal';

// ==========================================
//              NAVIGATION DATA
// ==========================================

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' }
];

// Helper to map skill icon keys to icon components
const getSkillIcon = (iconKey) => {
  switch (iconKey) {
    case 'code':
      return <FaCode />;
    case 'server':
      return <FaServer />;
    case 'microchip':
      return <FaMicrochip />;
    case 'brain':
      return <FaBrain />;
    case 'database':
      return <FaDatabase />;
    case 'cloud':
      return <FaCloud />;
    case 'laptop':
      return <FaLaptopCode />;
    case 'tools':
      return <FaTools />;
    default:
      return <FaCode />;
  }
};

// Helper to map social ID to icon
const getSocialIcon = (id) => {
  switch (id) {
    case 'github':
      return FaGithub;
    case 'linkedin':
      return FaLinkedin;
    case 'instagram':
      return FaInstagram;
    default:
      return FaExternalLinkAlt;
  }
};

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
      transition: { type: 'spring', stiffness: 50, damping: 20 }
    }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'backOut' }
    }
  },
  float: {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 1, -1, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  },
  pulseGlow: {
    animate: {
      boxShadow: [
        '0 0 0px rgba(168, 85, 247, 0)',
        '0 0 20px rgba(168, 85, 247, 0.5)',
        '0 0 0px rgba(168, 85, 247, 0)'
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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 2600;
    let raf;
    const tick = (now) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 700);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  const rainCols = Array.from({ length: 18 }, (_, i) => i);
  const codeChars = ['</', '{}', '=>', '[];', 'fn()', 'git', 'npm', '0x1', '&&', '||', 'API', '404', 'SSH', 'JWT', 'AI', 'GPU', 'let', '==='];

  return (
    <motion.div
      className="splash-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(16px)' }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <div className="splash-rain" aria-hidden>
        {rainCols.map((col) => (
          <motion.div
            key={col}
            className="splash-rain-col"
            style={{ left: `${(col / 18) * 100}%`, animationDelay: `${col * 0.18}s` }}
          >
            {Array.from({ length: 10 }, (_, r) => (
              <span key={r} style={{ animationDelay: `${r * 0.3 + col * 0.1}s` }}>
                {codeChars[(col + r) % codeChars.length]}
              </span>
            ))}
          </motion.div>
        ))}
      </div>

      <div className="splash-content">
        <motion.div
          className="splash-orb"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 1, 1],
            borderRadius: ['50%', '40% 60% 60% 40% / 60% 40% 60% 40%', '50%']
          }}
          transition={{ duration: 1.2, ease: 'easeOut', times: [0, 0.6, 1] }}
        >
          <div className="splash-orb-inner" />
        </motion.div>

        <motion.h1
          className="splash-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          {[...'Ganindu'].map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.9 + i * 0.09, duration: 0.4 }}
            >
              {char}
            </motion.span>
          ))}
          <motion.span
            className="splash-dot-dev"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7, duration: 0.5 }}
          >
            .dev
          </motion.span>
        </motion.h1>

        <motion.p
          className="splash-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          Full Stack Developer
        </motion.p>

        <motion.div
          className="splash-progress-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="splash-progress-bar-bg">
            <motion.div
              className="splash-progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="splash-progress-pct">{progress}%</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ─── Navbar ──────────────────────────────────────────────────────────────────
const Navbar = ({ onOpenAdmin }) => {
  const [active, setActive] = useState('');
  const [logoClicks, setLogoClicks] = useState(0);
  const logoTimerRef = useRef(null);
  const { data } = usePortfolio();
  const hero = data.hero || {};

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map((l) => document.getElementById(l.id));
      const scrollY = window.scrollY + 100;
      let current = '';
      sections.forEach((sec) => {
        if (sec && sec.offsetTop <= scrollY) current = sec.id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSecretLogoClick = (e) => {
    setLogoClicks((prev) => {
      const updated = prev + 1;
      if (updated >= 3) {
        e.preventDefault();
        onOpenAdmin();
        return 0;
      }
      return updated;
    });

    if (logoTimerRef.current) clearTimeout(logoTimerRef.current);
    logoTimerRef.current = setTimeout(() => {
      setLogoClicks(0);
    }, 1200);
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'circOut' }}
    >
      <a href="#" className="logo interactive" onClick={handleSecretLogoClick}>
        <span className="logo-icon">⬡</span>
        {hero.name ? hero.name.split(' ')[0] : 'Ganindu'}
        <span className="text-highlight">.dev</span>
      </a>

      <div className="nav-pill-wrap">
        <ul className="nav-menu">
          {NAV_LINKS.map((link, i) => (
            <motion.li
              key={link.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
            >
              <a
                href={`#${link.id}`}
                className={`nav-link interactive${active === link.id ? ' active' : ''}`}
              >
                {link.label}
                {active === link.id && (
                  <motion.span
                    className="nav-active-dot"
                    layoutId="nav-dot"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <motion.a
          href={hero.resumeUrl || '/Ganindu Wickramasinghe_CV.pdf.pdf'}
          download={hero.resumeFileName || 'Ganindu_Wickramasinghe_Resume.pdf'}
          className="btn-resume interactive"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Resume ↓
        </motion.a>
      </div>
    </motion.nav>
  );
};

// ─── Hero Section ────────────────────────────────────────────────────────────
const HeroSection = () => {
  const { data } = usePortfolio();
  const hero = data.hero || {};
  const titleLetters = (hero.title_2 || 'Developer').split('');

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
            {hero.statusBadge || 'Ready to Innovate'}
          </motion.div>

          <motion.h2 variants={VARIANTS.fadeInUp} className="hero-greeting">
            {hero.greeting || "Hello, I'm"}{' '}
            <span className="text-highlight">{hero.name || 'Ganindu Pabasara'}</span>
          </motion.h2>

          <h1 className="hero-title">
            <motion.div variants={VARIANTS.fadeInUp} className="block-reveal">
              {hero.title_1 || 'Full Stack'}
            </motion.div>
            <motion.div className="gradient-text-wrapper" variants={VARIANTS.typingContainer}>
              {titleLetters.map((char, index) => (
                <motion.span key={index} variants={VARIANTS.typingLetter} className="gradient-char">
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </h1>

          <motion.p variants={VARIANTS.fadeInUp} className="hero-description">
            {hero.description}
          </motion.p>

          <motion.div variants={VARIANTS.fadeInUp} className="hero-actions">
            <a href="#projects" className="btn-primary interactive">
              View Work <FaExternalLinkAlt className="btn-icon" />
            </a>
            <a href="#contact" className="btn-secondary interactive">
              Contact Me <FaEnvelope className="btn-icon" />
            </a>
          </motion.div>

          {hero.tech_stack && hero.tech_stack.length > 0 && (
            <motion.div variants={VARIANTS.fadeInUp} className="tech-stack-row">
              <span className="tech-label">Tech Stack:</span>
              <div className="tech-pills">
                {hero.tech_stack.map((tech) => (
                  <motion.span
                    key={tech}
                    className="tech-pill"
                    whileHover={{ y: -5, backgroundColor: 'rgba(168, 85, 247, 0.2)' }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="hero-image-wrapper"
          initial={{ opacity: 0, x: 100, rotateY: -30 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          variants={VARIANTS.float}
        >
          <div className="hero-image-card">
            <img
              src={hero.avatar || '/images/developer.png'}
              alt={hero.name}
              className="hero-img"
            />
            <div className="hero-glow-effect"></div>

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

// ─── About Section ───────────────────────────────────────────────────────────
const AboutSection = () => {
  const { data } = usePortfolio();
  const about = data.about || {};

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
            <img src={about.image || '/images/me.jpg'} alt={about.title} />
            <div className="polaroid-caption">
              {about.caption || 'Working on the Next Big Thing 🚀'}
            </div>
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
          <motion.h3 variants={VARIANTS.fadeInUp} className="section-subtitle">
            {about.subtitle || 'Who I Am'}
          </motion.h3>
          <motion.h2 variants={VARIANTS.fadeInUp} className="section-title">
            {about.title || 'Passionate About Technology & Innovation'}
          </motion.h2>

          {about.desc_1 && (
            <motion.p variants={VARIANTS.fadeInUp} className="about-desc">
              {about.desc_1}
            </motion.p>
          )}

          {about.desc_2 && (
            <motion.p variants={VARIANTS.fadeInUp} className="about-desc">
              {about.desc_2}
            </motion.p>
          )}

          {about.stats && about.stats.length > 0 && (
            <motion.div variants={VARIANTS.fadeInUp} className="about-stats">
              {about.stats.map((st, i) => (
                <div key={st.id || i} className="stat-item">
                  <span className="stat-number">{st.number}</span>
                  <span className="stat-label">{st.label}</span>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// ─── Skills Section ──────────────────────────────────────────────────────────
const SkillsSection = () => {
  const { data } = usePortfolio();
  const skills = data.skills || [];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <motion.div
          className="section-header text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            My Technical <span className="text-primary">Arsenal</span>
          </h2>
          <p className="section-lead">The tools and technologies I use to bring ideas to life.</p>
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={VARIANTS.containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              className="skill-card glass-panel interactive"
              variants={VARIANTS.fadeInUp}
              whileHover={{
                y: -10,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: '#a855f7'
              }}
            >
              <div className="skill-icon-wrapper">{getSkillIcon(skill.icon)}</div>
              <h3 className="skill-title">{skill.title}</h3>
              <p className="skill-desc">{skill.desc}</p>
              <div className="skill-bar-container">
                <div className="skill-level-label">
                  <span>{skill.category || 'Proficiency'}</span>
                  <span style={{ color: '#d8b4fe', fontWeight: 600 }}>{skill.level}</span>
                </div>
                <div className="skill-bar-bg">
                  <motion.div
                    className="skill-bar-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.level }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
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

// ─── Project Modal ────────────────────────────────────────────────────────────
const ProjectModal = ({ project, onClose }) => {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const images = Array.isArray(project.images) && project.images.length > 0 ? project.images : ['/images/image.png'];
  const hasLink = project.link && project.link !== '#';
  const hasRepo = project.repo && project.repo !== '#' && project.repo !== '';

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-panel"
        initial={{ opacity: 0, scale: 0.75, y: 60, rotateX: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 40 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          className="modal-close modal-close-red"
          onClick={onClose}
          whileHover={{ rotate: 90, scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="modal-close-x">✕</span>
        </motion.button>

        <div className="modal-image-wrap">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImg}
              src={images[activeImg] || images[0]}
              alt={project.title}
              className="modal-main-img"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            />
          </AnimatePresence>

          {images.length > 1 && (
            <div className="modal-img-dots">
              {images.map((_, i) => (
                <motion.button
                  key={i}
                  className={`modal-dot${i === activeImg ? ' active' : ''}`}
                  onClick={() => setActiveImg(i)}
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          )}
          <div className="modal-img-shine" />
        </div>

        <div className="modal-body">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <div className="modal-meta-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span className="modal-date">{project.date}</span>
                {project.status === 'ongoing' ? (
                  <span className="badge-ongoing" style={{ fontSize: '0.72rem' }}>
                    <FaBolt /> Ongoing Project
                  </span>
                ) : (
                  <span className="badge-completed" style={{ fontSize: '0.72rem' }}>
                    <FaCheckCircle /> Completed
                  </span>
                )}
                {project.isPinned && (
                  <span className="badge-pinned" style={{ fontSize: '0.72rem' }}>
                    📌 Pinned
                  </span>
                )}
              </div>

              {project.tags && (
                <div className="modal-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="modal-tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <h2 className="modal-title">{project.title}</h2>
            <p className="modal-desc">{project.desc}</p>

            <div className="modal-actions">
              {hasRepo && (
                <motion.a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-btn modal-btn-github"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <FaGithub className="modal-btn-icon" />
                  View on GitHub
                </motion.a>
              )}
              {hasLink && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-btn modal-btn-live"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <FaExternalLinkAlt className="modal-btn-icon" />
                  Live Site
                </motion.a>
              )}
              {!hasRepo && !hasLink && (
                <span className="modal-btn-disabled">No external links</span>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Project Card ─────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const images = Array.isArray(project.images) && project.images.length > 0 ? project.images : ['/images/image.png'];
  const currentImageIndex = isHovered && images.length > 1 ? 1 : 0;

  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -12, boxShadow: '0 25px 60px rgba(168,85,247,0.28)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpen(project)}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      {/* Dynamic Project Card Badges (Ongoing & Pinned) */}
      <div className="project-card-badges">
        {project.status === 'ongoing' && (
          <span className="portfolio-ongoing-badge" title="Project is currently in progress">
            <FaBolt /> Ongoing
          </span>
        )}
        {project.isPinned && (
          <span className="portfolio-pinned-badge" title="Pinned Highlight">
            <FaThumbtack /> Pinned
          </span>
        )}
      </div>

      <div className="project-image-container">
        <AnimatePresence>
          <motion.img
            key={images[currentImageIndex]}
            src={images[currentImageIndex]}
            alt={project.title}
            className="project-img"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, position: 'absolute' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AnimatePresence>
        <div className="project-overlay">
          <motion.div
            className="project-click-hint"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
          >
            <span>Click to Explore</span>
          </motion.div>
        </div>
      </div>

      <div className="project-content">
        <div className="project-meta">
          <span className="project-date">{project.date}</span>
          <div className="project-tags">
            {project.tags &&
              project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tiny-tag">
                  #{tag}
                </span>
              ))}
          </div>
        </div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.desc}</p>
      </div>
    </motion.div>
  );
};

// ─── Projects Section ────────────────────────────────────────────────────────
const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'pinned' | 'ongoing' | 'completed'
  const { data } = usePortfolio();
  const projects = data.projects || [];

  const pinnedCount = projects.filter((p) => p.isPinned).length;
  const ongoingCount = projects.filter((p) => p.status === 'ongoing').length;
  const completedCount = projects.filter((p) => p.status === 'completed').length;

  const filteredProjects = projects.filter((p) => {
    if (activeTab === 'pinned') return !!p.isPinned;
    if (activeTab === 'ongoing') return p.status === 'ongoing';
    if (activeTab === 'completed') return p.status === 'completed';
    return true;
  });

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            Featured <span className="text-secondary">Projects</span>
          </h2>
          <p className="section-lead" style={{ textAlign: 'center', marginTop: '0.4rem', color: '#94a3b8' }}>
            Showcasing production apps, ongoing systems, and client solutions.
          </p>
        </motion.div>

        {/* Filter Navigation Tabs */}
        <div className="project-filter-tabs">
          <button
            type="button"
            className={`project-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Work ({projects.length})
          </button>
          {pinnedCount > 0 && (
            <button
              type="button"
              className={`project-tab-btn ${activeTab === 'pinned' ? 'active' : ''}`}
              onClick={() => setActiveTab('pinned')}
            >
              📌 Pinned Highlights ({pinnedCount})
            </button>
          )}
          {ongoingCount > 0 && (
            <button
              type="button"
              className={`project-tab-btn ${activeTab === 'ongoing' ? 'active' : ''}`}
              onClick={() => setActiveTab('ongoing')}
            >
              ⚡ Ongoing Builds ({ongoingCount})
            </button>
          )}
          <button
            type="button"
            className={`project-tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            ✅ Completed ({completedCount})
          </button>
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={setSelectedProject}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

// ─── Certificates Section ────────────────────────────────────────────────────
const CertificatesSection = () => {
  const { data } = usePortfolio();
  const certificates = data.certificates || [];

  return (
    <section id="certificates" className="certificates-section">
      <div className="container">
        <motion.div
          className="section-header text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="section-subtitle">Credentials</h3>
          <h2 className="section-title">
            My <span className="text-primary">Certificates</span>
          </h2>
          <p className="section-lead">Verified certifications in software development and computer science.</p>
        </motion.div>

        <motion.div
          className="certs-grid"
          variants={VARIANTS.containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {certificates.map((cert) => {
            const isImageBadge =
              cert.badge &&
              (cert.badge.startsWith('/') ||
                cert.badge.startsWith('data:') ||
                cert.badge.startsWith('http'));

            return (
              <motion.a
                key={cert.id}
                href={cert.credentialUrl && cert.credentialUrl !== '#' ? cert.credentialUrl : undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-card glass-panel interactive"
                variants={VARIANTS.fadeInUp}
                whileHover={{ y: -8, borderColor: cert.color }}
                style={{ '--cert-color': cert.color || '#a855f7' }}
              >
                <div
                  className="cert-badge"
                  style={{ background: `${cert.color || '#a855f7'}22`, color: cert.color || '#a855f7' }}
                >
                  {isImageBadge ? (
                    <img src={cert.badge} alt={cert.issuer} className="cert-badge-img" />
                  ) : (
                    <span className="cert-badge-icon">{cert.badge || '🎓'}</span>
                  )}
                </div>
                <div className="cert-body">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <h3 className="cert-title">{cert.title}</h3>
                  <div className="cert-footer">
                    <span className="cert-date">📅 {cert.date}</span>
                    <span className="cert-verify">
                      {cert.credentialUrl && cert.credentialUrl !== '#' ? 'View Credential ↗' : 'Verified'}
                    </span>
                  </div>
                </div>
                <div
                  className="cert-glow"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${cert.color || '#a855f7'}33, transparent 70%)`
                  }}
                />
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

// ─── Contact Toast ───────────────────────────────────────────────────────────
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
        <button className="toast-close" onClick={onDismiss}>
          ×
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Contact Section ─────────────────────────────────────────────────────────
const ContactSection = () => {
  const { data } = usePortfolio();
  const contact = data.contact || {};
  const emailjsConfig = contact.emailjs || {
    serviceId: 'service_beniihq',
    templateId: 'template_ndkel7c',
    publicKey: 'tD1XU03PmDdGKFaHO'
  };

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
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject || 'No Subject',
          message: form.message
        },
        emailjsConfig.publicKey
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

  const socials = data.hero?.socials || [];

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
            <h2 className="section-title">
              Let's Start a <span className="text-primary">Conversation</span>
            </h2>
            <p>{contact.subheading || 'Have a project in mind or just want to say hi? My inbox is always open.'}</p>
          </div>

          <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="contact-name">
                  Your Name <span className="required">*</span>
                </label>
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
                <label htmlFor="contact-email">
                  Your Email <span className="required">*</span>
                </label>
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
              <label htmlFor="contact-message">
                Message <span className="required">*</span>
              </label>
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
                <>
                  <span className="spinner"></span> Sending...
                </>
              ) : (
                <>
                  Send Message <FaPaperPlane />
                </>
              )}
            </motion.button>
          </form>

          {socials.length > 0 && (
            <div className="contact-socials">
              <p>Or connect via social media:</p>
              <div className="social-icons-row">
                {socials.map((social, i) => {
                  const Icon = getSocialIcon(social.id);
                  return (
                    <a
                      key={i}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon-link interactive"
                      title={social.label}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// ─── Footer ──────────────────────────────────────────────────────────────────
const Footer = ({ onSecretTrigger }) => {
  const { data } = usePortfolio();
  const name = data.hero?.name || 'Ganindu Pabasara Wickramasinghe';

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
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#certificates">Certificates</a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Engineering</h4>
          <ul>
            <li>Full Stack Development</li>
            <li>IoT & Hardware Integration</li>
            <li>Scalable Cloud Systems</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p
          onDoubleClick={onSecretTrigger}
          title=""
          style={{ userSelect: 'none', cursor: 'default' }}
        >
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

// ─── Scroll to Top ───────────────────────────────────────────────────────────
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
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
  const { data, currentView, setCurrentView, isAdminAuthenticated } = usePortfolio();
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleOpenAdmin = () => {
    if (isAdminAuthenticated || data.adminSettings?.allowAutoLogin) {
      setCurrentView('admin');
    } else {
      setShowAuthModal(true);
    }
  };

  // Stealth Global Hotkey Listener: Ctrl + Shift + A OR Alt + A
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
        (e.altKey && (e.key === 'A' || e.key === 'a'))
      ) {
        e.preventDefault();
        handleOpenAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminAuthenticated, data.adminSettings]);

  // If currently in Admin view, render AdminDashboard or Auth Gate
  if (currentView === 'admin') {
    if (isAdminAuthenticated || data.adminSettings?.allowAutoLogin) {
      return <AdminDashboard />;
    } else {
      return (
        <div className="admin-viewport">
          <AdminAuthModal isOpen={true} onClose={() => setCurrentView('portfolio')} />
        </div>
      );
    }
  }

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
            <motion.div className="scroll-progress-bar" style={{ scaleX }} />

            <div className="stars-bg"></div>
            <div className="stars-bg-2"></div>
            <div className="stars-bg-3"></div>

            <Navbar onOpenAdmin={handleOpenAdmin} />

            <main>
              <HeroSection />
              <AboutSection />
              <SkillsSection />
              <ProjectsSection />
              <CertificatesSection />
              <ContactSection />
            </main>

            <Footer onSecretTrigger={handleOpenAdmin} />
            <ScrollToTop />

            {/* Admin Password Modal (only opens on secret triggers) */}
            <AdminAuthModal
              isOpen={showAuthModal}
              onClose={() => setShowAuthModal(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;