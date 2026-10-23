import React, { useState } from 'react';
import {
  FaUser,
  FaSave,
  FaPlus,
  FaTimes,
  FaCheckCircle,
  FaFilePdf,
  FaEnvelope,
  FaInfoCircle
} from 'react-icons/fa';
import { usePortfolio } from '../../context/PortfolioContext';
import { ImagePasteDropzone } from './ImagePasteDropzone';

export const AdminProfile = () => {
  const { data, updateHero, updateAbout, updateContact } = usePortfolio();

  const [heroForm, setHeroForm] = useState({
    greeting: data.hero.greeting || "Hello, I'm",
    name: data.hero.name || 'Ganindu Pabasara',
    title_1: data.hero.title_1 || 'Full Stack',
    title_2: data.hero.title_2 || 'Developer',
    statusBadge: data.hero.statusBadge || 'Ready to Innovate',
    description: data.hero.description || '',
    resumeUrl: data.hero.resumeUrl || '/Ganindu Wickramasinghe_CV.pdf.pdf',
    resumeFileName: data.hero.resumeFileName || 'Ganindu_Wickramasinghe_Resume.pdf',
    tech_stack: data.hero.tech_stack || [],
    avatar: data.hero.avatar || '/images/developer.png'
  });

  const [socialsForm, setSocialsForm] = useState(
    data.hero.socials || [
      { id: 'github', label: 'GitHub', url: 'https://github.com/Ganindu-ui' },
      { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/ganindu-wickramasinghe/' },
      { id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/ganindu_wickramasinghe/' }
    ]
  );

  const [aboutForm, setAboutForm] = useState({
    subtitle: data.about.subtitle || 'Who I Am',
    title: data.about.title || 'Passionate About Technology & Innovation',
    caption: data.about.caption || 'Working on the Next Big Thing 🚀',
    image: data.about.image || '/images/me.jpg',
    desc_1: data.about.desc_1 || '',
    desc_2: data.about.desc_2 || '',
    stats: data.about.stats || [
      { id: 'stat_1', label: 'Years Experience', number: '02+' },
      { id: 'stat_2', label: 'Projects Completed', number: '7+' },
      { id: 'stat_3', label: 'Happy Clients', number: '3+' }
    ]
  });

  const [contactForm, setContactForm] = useState({
    heading: data.contact?.heading || "Let's Start a Conversation",
    subheading: data.contact?.subheading || "Have a project in mind or just want to say hi? My inbox is always open.",
    email: data.contact?.email || 'ganindu.contact@example.com',
    emailjs: {
      serviceId: data.contact?.emailjs?.serviceId || 'service_beniihq',
      templateId: data.contact?.emailjs?.templateId || 'template_ndkel7c',
      publicKey: data.contact?.emailjs?.publicKey || 'tD1XU03PmDdGKFaHO'
    }
  });

  const [newTechInput, setNewTechInput] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const handleSaveAll = (e) => {
    e.preventDefault();

    updateHero({
      ...heroForm,
      socials: socialsForm
    });

    updateAbout(aboutForm);
    updateContact(contactForm);

    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const addTechPill = () => {
    if (newTechInput.trim() && !heroForm.tech_stack.includes(newTechInput.trim())) {
      setHeroForm({
        ...heroForm,
        tech_stack: [...heroForm.tech_stack, newTechInput.trim()]
      });
      setNewTechInput('');
    }
  };

  const removeTechPill = (tech) => {
    setHeroForm({
      ...heroForm,
      tech_stack: heroForm.tech_stack.filter((t) => t !== tech)
    });
  };

  const updateStatItem = (index, field, value) => {
    const updated = [...aboutForm.stats];
    updated[index] = { ...updated[index], [field]: value };
    setAboutForm({ ...aboutForm, stats: updated });
  };

  const updateSocialUrl = (id, newUrl) => {
    const updated = socialsForm.map((s) => (s.id === id ? { ...s, url: newUrl } : s));
    setSocialsForm(updated);
  };

  return (
    <div className="admin-profile-section">
      <div className="panel-header-row">
        <div>
          <h2 className="panel-title">
            👤 Hero, About & <span className="text-highlight">Profile</span>
          </h2>
          <p className="panel-desc">
            Complete control over your personal bio, greetings, hero visual, tech stack pills, and contact credentials.
          </p>
        </div>

        <button className="admin-btn admin-btn-primary" onClick={handleSaveAll}>
          <FaSave /> Save Profile Settings
        </button>
      </div>

      {saveToast && (
        <div className="dropzone-alert alert-success" style={{ marginBottom: '1.5rem' }}>
          <FaCheckCircle />
          <span>Profile changes saved and applied immediately!</span>
        </div>
      )}

      {/* Hero Section Card */}
      <div className="admin-glass-card">
        <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          ✨ Hero Section Customization
        </h3>

        <div className="form-grid-2">
          <div className="form-group-item">
            <label className="admin-label">Greeting</label>
            <input
              type="text"
              className="admin-input"
              value={heroForm.greeting}
              onChange={(e) => setHeroForm({ ...heroForm, greeting: e.target.value })}
            />
          </div>

          <div className="form-group-item">
            <label className="admin-label">Display Name</label>
            <input
              type="text"
              className="admin-input"
              value={heroForm.name}
              onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
            />
          </div>
        </div>

        <div className="form-grid-2" style={{ marginTop: '1.2rem' }}>
          <div className="form-group-item">
            <label className="admin-label">Role Title 1</label>
            <input
              type="text"
              className="admin-input"
              value={heroForm.title_1}
              onChange={(e) => setHeroForm({ ...heroForm, title_1: e.target.value })}
            />
          </div>

          <div className="form-group-item">
            <label className="admin-label">Role Title 2 (Animated Gradient Text)</label>
            <input
              type="text"
              className="admin-input"
              value={heroForm.title_2}
              onChange={(e) => setHeroForm({ ...heroForm, title_2: e.target.value })}
            />
          </div>
        </div>

        <div className="form-grid-2" style={{ marginTop: '1.2rem' }}>
          <div className="form-group-item">
            <label className="admin-label">Status Badge (Top of Hero)</label>
            <input
              type="text"
              className="admin-input"
              value={heroForm.statusBadge}
              onChange={(e) => setHeroForm({ ...heroForm, statusBadge: e.target.value })}
            />
          </div>

          <div className="form-group-item">
            <label className="admin-label">Resume PDF Link</label>
            <input
              type="text"
              className="admin-input"
              value={heroForm.resumeUrl}
              onChange={(e) => setHeroForm({ ...heroForm, resumeUrl: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group-item" style={{ marginTop: '1.2rem' }}>
          <label className="admin-label">Hero Bio / Tagline</label>
          <textarea
            rows={3}
            className="admin-textarea"
            value={heroForm.description}
            onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
          />
        </div>

        {/* Tech Stack Pills Manager */}
        <div className="form-group-item" style={{ marginTop: '1.2rem' }}>
          <label className="admin-label">Hero Tech Stack Pills</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.8rem' }}>
            {heroForm.tech_stack.map((tech) => (
              <span
                key={tech}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'rgba(168, 85, 247, 0.2)',
                  border: '1px solid rgba(168, 85, 247, 0.4)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '20px',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechPill(tech)}
                  style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', padding: 0 }}
                >
                  <FaTimes />
                </button>
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', maxWidth: '400px' }}>
            <input
              type="text"
              className="admin-input"
              placeholder="e.g. Next.js, Docker, AI"
              value={newTechInput}
              onChange={(e) => setNewTechInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTechPill();
                }
              }}
            />
            <button type="button" className="admin-btn admin-btn-secondary" onClick={addTechPill}>
              <FaPlus /> Add
            </button>
          </div>
        </div>

        {/* Social Media Links */}
        <div style={{ marginTop: '1.6rem' }}>
          <label className="admin-label" style={{ marginBottom: '0.8rem' }}>
            Social Media Handles & Links
          </label>
          <div className="form-grid-2">
            {socialsForm.map((social) => (
              <div key={social.id} className="form-group-item">
                <label className="admin-label">{social.label} Profile URL</label>
                <input
                  type="text"
                  className="admin-input"
                  value={social.url}
                  onChange={(e) => updateSocialUrl(social.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section Card */}
      <div className="admin-glass-card">
        <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          📖 About Me Section
        </h3>

        <div className="form-grid-2">
          <div className="form-group-item">
            <label className="admin-label">Subtitle</label>
            <input
              type="text"
              className="admin-input"
              value={aboutForm.subtitle}
              onChange={(e) => setAboutForm({ ...aboutForm, subtitle: e.target.value })}
            />
          </div>

          <div className="form-group-item">
            <label className="admin-label">Section Heading</label>
            <input
              type="text"
              className="admin-input"
              value={aboutForm.title}
              onChange={(e) => setAboutForm({ ...aboutForm, title: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group-item" style={{ marginTop: '1.2rem' }}>
          <label className="admin-label">About Paragraph 1</label>
          <textarea
            rows={3}
            className="admin-textarea"
            value={aboutForm.desc_1}
            onChange={(e) => setAboutForm({ ...aboutForm, desc_1: e.target.value })}
          />
        </div>

        <div className="form-group-item" style={{ marginTop: '1.2rem' }}>
          <label className="admin-label">About Paragraph 2</label>
          <textarea
            rows={3}
            className="admin-textarea"
            value={aboutForm.desc_2}
            onChange={(e) => setAboutForm({ ...aboutForm, desc_2: e.target.value })}
          />
        </div>

        {/* Polaroid Picture & Caption with direct clipboard paste */}
        <div style={{ marginTop: '1.5rem' }}>
          <div className="form-group-item" style={{ marginBottom: '1rem' }}>
            <label className="admin-label">Polaroid Picture Caption</label>
            <input
              type="text"
              className="admin-input"
              value={aboutForm.caption}
              onChange={(e) => setAboutForm({ ...aboutForm, caption: e.target.value })}
            />
          </div>

          <ImagePasteDropzone
            images={aboutForm.image}
            multiple={false}
            label="About Polaroid Photo"
            helperText="Paste your photo directly from clipboard (Ctrl + V) or browse"
            onChange={(newImg) => setAboutForm({ ...aboutForm, image: newImg })}
          />
        </div>

        {/* Counter Stats */}
        <div style={{ marginTop: '1.6rem' }}>
          <label className="admin-label" style={{ marginBottom: '0.8rem' }}>
            Milestone Stats Counters
          </label>
          <div className="form-grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {aboutForm.stats.map((st, i) => (
              <div key={st.id || i} className="form-group-item" style={{ background: 'rgba(255,255,255,0.02)', padding: '0.8rem', borderRadius: '10px' }}>
                <label className="admin-label">{st.label}</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    className="admin-input"
                    value={st.number}
                    onChange={(e) => updateStatItem(i, 'number', e.target.value)}
                    placeholder="e.g. 02+"
                    style={{ width: '80px', fontWeight: 700, color: '#a855f7' }}
                  />
                  <input
                    type="text"
                    className="admin-input"
                    value={st.label}
                    onChange={(e) => updateStatItem(i, 'label', e.target.value)}
                    placeholder="Label"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EmailJS & Contact Settings */}
      <div className="admin-glass-card">
        <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          📬 Contact & EmailJS Integration
        </h3>

        <div className="form-grid-2">
          <div className="form-group-item">
            <label className="admin-label">EmailJS Service ID</label>
            <input
              type="text"
              className="admin-input"
              value={contactForm.emailjs.serviceId}
              onChange={(e) =>
                setContactForm({
                  ...contactForm,
                  emailjs: { ...contactForm.emailjs, serviceId: e.target.value }
                })
              }
            />
          </div>

          <div className="form-group-item">
            <label className="admin-label">EmailJS Template ID</label>
            <input
              type="text"
              className="admin-input"
              value={contactForm.emailjs.templateId}
              onChange={(e) =>
                setContactForm({
                  ...contactForm,
                  emailjs: { ...contactForm.emailjs, templateId: e.target.value }
                })
              }
            />
          </div>
        </div>

        <div className="form-grid-2" style={{ marginTop: '1.2rem' }}>
          <div className="form-group-item">
            <label className="admin-label">EmailJS Public Key</label>
            <input
              type="text"
              className="admin-input"
              value={contactForm.emailjs.publicKey}
              onChange={(e) =>
                setContactForm({
                  ...contactForm,
                  emailjs: { ...contactForm.emailjs, publicKey: e.target.value }
                })
              }
            />
          </div>

          <div className="form-group-item">
            <label className="admin-label">Direct Contact Email</label>
            <input
              type="email"
              className="admin-input"
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
        <button className="admin-btn admin-btn-primary" onClick={handleSaveAll}>
          <FaSave /> Save Profile Settings
        </button>
      </div>
    </div>
  );
};
