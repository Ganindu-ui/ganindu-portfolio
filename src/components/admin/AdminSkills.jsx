import React, { useState } from 'react';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaCode,
  FaServer,
  FaMicrochip,
  FaBrain,
  FaDatabase,
  FaCloud,
  FaLaptopCode,
  FaTools
} from 'react-icons/fa';
import { usePortfolio } from '../../context/PortfolioContext';

const ICON_OPTIONS = [
  { id: 'code', label: 'Frontend / Code', icon: <FaCode /> },
  { id: 'server', label: 'Backend / Server', icon: <FaServer /> },
  { id: 'microchip', label: 'IoT / Hardware', icon: <FaMicrochip /> },
  { id: 'brain', label: 'AI / Algorithms', icon: <FaBrain /> },
  { id: 'database', label: 'Databases / SQL', icon: <FaDatabase /> },
  { id: 'cloud', label: 'DevOps / Cloud', icon: <FaCloud /> },
  { id: 'laptop', label: 'Web Apps', icon: <FaLaptopCode /> },
  { id: 'tools', label: 'Tools & Config', icon: <FaTools /> }
];

export const AdminSkills = () => {
  const { data, addSkill, updateSkill, deleteSkill } = usePortfolio();

  const [editingSkill, setEditingSkill] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Frontend',
    desc: '',
    level: 85,
    icon: 'code'
  });

  const skills = data.skills || [];

  const handleOpenAdd = () => {
    setIsNew(true);
    setFormData({
      title: '',
      category: 'Frontend',
      desc: '',
      level: 80,
      icon: 'code'
    });
    setEditingSkill({ id: 'new' });
  };

  const handleOpenEdit = (skill) => {
    setIsNew(false);
    const parsedLevel = parseInt(skill.level, 10) || 80;
    setFormData({
      title: skill.title || '',
      category: skill.category || 'General',
      desc: skill.desc || '',
      level: parsedLevel,
      icon: skill.icon || 'code'
    });
    setEditingSkill(skill);
  };

  const handleClose = () => {
    setEditingSkill(null);
    setIsNew(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please provide a skill title');
      return;
    }

    const payload = {
      title: formData.title.trim(),
      category: formData.category.trim(),
      desc: formData.desc.trim(),
      level: `${formData.level}%`,
      icon: formData.icon
    };

    if (isNew) {
      addSkill(payload);
    } else {
      updateSkill(editingSkill.id, payload);
    }

    handleClose();
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete skill "${title}"?`)) {
      deleteSkill(id);
    }
  };

  const getIconElement = (iconKey) => {
    const found = ICON_OPTIONS.find((opt) => opt.id === iconKey);
    return found ? found.icon : <FaCode />;
  };

  return (
    <div className="admin-skills-section">
      <div className="panel-header-row">
        <div>
          <h2 className="panel-title">
            ⚡ Technical <span className="text-highlight">Skills</span>
          </h2>
          <p className="panel-desc">
            Fine-tune proficiency levels, skill categories, and descriptions displayed on your portfolio.
          </p>
        </div>

        <button className="admin-btn admin-btn-primary" onClick={handleOpenAdd}>
          <FaPlus /> Add New Skill
        </button>
      </div>

      <div className="admin-stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        {skills.map((skill) => (
          <div key={skill.id} className="stat-card-glass" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div className="stat-icon-wrapper stat-icon-purple">
                  {getIconElement(skill.icon)}
                </div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '1.05rem', margin: 0 }}>{skill.title}</h4>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{skill.category}</span>
                </div>
              </div>

              <div className="action-buttons-cell">
                <button
                  type="button"
                  className="btn-icon-action"
                  onClick={() => handleOpenEdit(skill)}
                  title="Edit Skill"
                >
                  <FaEdit />
                </button>
                <button
                  type="button"
                  className="btn-icon-action delete-action"
                  onClick={() => handleDelete(skill.id, skill.title)}
                  title="Delete Skill"
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: '0.8rem 0' }}>{skill.desc}</p>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                <span>Proficiency</span>
                <span style={{ color: '#d8b4fe', fontWeight: 700 }}>{skill.level}</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: skill.level,
                    height: '100%',
                    background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                    borderRadius: '4px'
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingSkill && (
        <div className="admin-modal-backdrop" onClick={handleClose}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <h3 className="modal-title-text">
                {isNew ? <FaPlus /> : <FaEdit />}
                {isNew ? 'Add Skill' : `Edit: ${formData.title || 'Skill'}`}
              </h3>
              <button className="modal-close-btn" onClick={handleClose}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="modal-scroll-body">
                <div className="form-grid-2">
                  <div className="form-group-item">
                    <label className="admin-label">Skill Title *</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Frontend Architecture"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group-item">
                    <label className="admin-label">Category</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Frontend, Backend, IoT, DevOps"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group-item">
                  <label className="admin-label">
                    <span>Proficiency Level</span>
                    <span style={{ color: '#a855f7', fontWeight: 700 }}>{formData.level}%</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value, 10) })}
                    style={{ accentColor: '#a855f7', width: '100%', cursor: 'pointer' }}
                  />
                </div>

                <div className="form-group-item">
                  <label className="admin-label">Icon Representation</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.6rem' }}>
                    {ICON_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: opt.id })}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.6rem 0.8rem',
                          background: formData.icon === opt.id ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                          border: `1px solid ${formData.icon === opt.id ? '#a855f7' : 'rgba(255, 255, 255, 0.08)'}`,
                          borderRadius: '8px',
                          color: '#fff',
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        {opt.icon} {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group-item">
                  <label className="admin-label">Description</label>
                  <textarea
                    rows={3}
                    className="admin-textarea"
                    placeholder="Brief description of your expertise with this skill set..."
                    value={formData.desc}
                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer-bar">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  <FaSave /> {isNew ? 'Create Skill' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
