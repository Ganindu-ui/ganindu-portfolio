import React, { useState } from 'react';
import {
  FaPlus,
  FaArrowUp,
  FaArrowDown,
  FaEdit,
  FaTrash,
  FaExternalLinkAlt,
  FaTimes,
  FaSave,
  FaCertificate,
  FaPalette
} from 'react-icons/fa';
import { usePortfolio } from '../../context/PortfolioContext';
import { ImagePasteDropzone } from './ImagePasteDropzone';

const COLOR_PRESETS = [
  { label: 'Neon Purple', color: '#a855f7' },
  { label: 'Cyber Pink', color: '#ec4899' },
  { label: 'Electric Cyan', color: '#06b6d4' },
  { label: 'Emerald Green', color: '#10b981' },
  { label: 'Golden Amber', color: '#f59e0b' },
  { label: 'Sky Blue', color: '#3b82f6' }
];

export const AdminCertificates = () => {
  const {
    data,
    addCertificate,
    updateCertificate,
    deleteCertificate,
    moveCertificate
  } = usePortfolio();

  const [editingCert, setEditingCert] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '',
    credentialUrl: '',
    badge: '',
    color: '#a855f7'
  });

  const certificates = data.certificates || [];

  const handleOpenAdd = () => {
    setIsNew(true);
    setFormData({
      title: '',
      issuer: '',
      date: new Date().getFullYear().toString(),
      credentialUrl: '',
      badge: '/logo/University_of_Moratuwa_logo.png',
      color: '#a855f7'
    });
    setEditingCert({ id: 'new' });
  };

  const handleOpenEdit = (cert) => {
    setIsNew(false);
    setFormData({
      title: cert.title || '',
      issuer: cert.issuer || '',
      date: cert.date || '',
      credentialUrl: cert.credentialUrl || '',
      badge: cert.badge || '',
      color: cert.color || '#a855f7'
    });
    setEditingCert(cert);
  };

  const handleClose = () => {
    setEditingCert(null);
    setIsNew(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.issuer.trim()) {
      alert('Please provide Certificate Title and Issuer');
      return;
    }

    const payload = {
      title: formData.title.trim(),
      issuer: formData.issuer.trim(),
      date: formData.date.trim(),
      credentialUrl: formData.credentialUrl.trim() || '#',
      badge: formData.badge || '/logo/University_of_Moratuwa_logo.png',
      color: formData.color || '#a855f7'
    };

    if (isNew) {
      addCertificate(payload);
    } else {
      updateCertificate(editingCert.id, payload);
    }

    handleClose();
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Delete certificate "${title}"?`)) {
      deleteCertificate(id);
    }
  };

  return (
    <div className="admin-certificates-section">
      <div className="panel-header-row">
        <div>
          <h2 className="panel-title">
            🎓 Certificates <span className="text-highlight">Manager</span>
          </h2>
          <p className="panel-desc">
            Organize credentials display order, customize glow theme colors, and paste certificate badges directly.
          </p>
        </div>

        <button className="admin-btn admin-btn-primary" onClick={handleOpenAdd}>
          <FaPlus /> Add New Certificate
        </button>
      </div>

      {/* Certificates Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '90px' }}>Order</th>
              <th>Certificate & Issuer</th>
              <th style={{ width: '130px' }}>Date</th>
              <th style={{ width: '140px' }}>Glow Theme</th>
              <th style={{ width: '120px' }}>Credential</th>
              <th style={{ width: '110px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {certificates.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                  No certificates found. Click "Add New Certificate" above to create one.
                </td>
              </tr>
            ) : (
              certificates.map((cert, index) => {
                const isFirst = index === 0;
                const isLast = index === certificates.length - 1;

                return (
                  <tr key={cert.id}>
                    {/* Order Controls */}
                    <td>
                      <div className="order-controls-box">
                        <span className="order-rank-num">#{index + 1}</span>
                        <button
                          type="button"
                          className="order-btn"
                          disabled={isFirst}
                          onClick={() => moveCertificate(cert.id, 'up')}
                          title="Move Up"
                        >
                          <FaArrowUp />
                        </button>
                        <button
                          type="button"
                          className="order-btn"
                          disabled={isLast}
                          onClick={() => moveCertificate(cert.id, 'down')}
                          title="Move Down"
                        >
                          <FaArrowDown />
                        </button>
                      </div>
                    </td>

                    {/* Badge & Info */}
                    <td>
                      <div className="thumb-cell-wrap">
                        <div
                          style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '12px',
                            background: `${cert.color || '#a855f7'}20`,
                            border: `1px solid ${cert.color || '#a855f7'}50`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            flexShrink: 0
                          }}
                        >
                          {cert.badge ? (
                            <img
                              src={cert.badge}
                              alt={cert.title}
                              style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
                            />
                          ) : (
                            <FaCertificate style={{ color: cert.color || '#a855f7', fontSize: '1.2rem' }} />
                          )}
                        </div>
                        <div>
                          <span className="project-title-link">{cert.title}</span>
                          <span className="project-meta-date" style={{ color: '#cbd5e1' }}>
                            {cert.issuer}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td>
                      <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{cert.date}</span>
                    </td>

                    {/* Color Glow */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            backgroundColor: cert.color || '#a855f7',
                            boxShadow: `0 0 10px ${cert.color || '#a855f7'}`
                          }}
                        />
                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{cert.color}</span>
                      </div>
                    </td>

                    {/* Link */}
                    <td>
                      {cert.credentialUrl && cert.credentialUrl !== '#' ? (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-icon-action"
                          title="Verify Credential"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      ) : (
                        <span style={{ color: '#64748b', fontSize: '0.8rem' }}>None</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="action-buttons-cell" style={{ justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="btn-icon-action"
                          onClick={() => handleOpenEdit(cert)}
                          title="Edit Certificate"
                        >
                          <FaEdit />
                        </button>
                        <button
                          type="button"
                          className="btn-icon-action delete-action"
                          onClick={() => handleDelete(cert.id, cert.title)}
                          title="Delete Certificate"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Certificate Modal */}
      {editingCert && (
        <div className="admin-modal-backdrop" onClick={handleClose}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <h3 className="modal-title-text">
                {isNew ? <FaPlus /> : <FaEdit />}
                {isNew ? 'Add Certificate' : `Edit: ${formData.title || 'Certificate'}`}
              </h3>
              <button className="modal-close-btn" onClick={handleClose}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div className="modal-scroll-body">
                {/* Row 1: Title & Issuer */}
                <div className="form-grid-2">
                  <div className="form-group-item">
                    <label className="admin-label">Certificate Title *</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Python for Beginners"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group-item">
                    <label className="admin-label">Issuing Organization *</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. University of Moratuwa"
                      value={formData.issuer}
                      onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Row 2: Date & Credential URL */}
                <div className="form-grid-2">
                  <div className="form-group-item">
                    <label className="admin-label">Issue Date</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. April 2025"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div className="form-group-item">
                    <label className="admin-label">Verification Link</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="https://verify.example.com/... or #"
                      value={formData.credentialUrl}
                      onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                    />
                  </div>
                </div>

                {/* Row 3: Color Glow Picker */}
                <div className="form-group-item">
                  <label className="admin-label">
                    <span>Card Neon Glow Accent</span>
                    <span style={{ color: formData.color, fontWeight: 700 }}>{formData.color}</span>
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                    {COLOR_PRESETS.map((preset) => (
                      <button
                        key={preset.color}
                        type="button"
                        onClick={() => setFormData({ ...formData, color: preset.color })}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          background: formData.color === preset.color ? `${preset.color}30` : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${formData.color === preset.color ? preset.color : 'rgba(255,255,255,0.1)'}`,
                          padding: '0.35rem 0.8rem',
                          borderRadius: '20px',
                          color: '#fff',
                          fontSize: '0.78rem',
                          cursor: 'pointer'
                        }}
                      >
                        <span
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: preset.color
                          }}
                        />
                        {preset.label}
                      </button>
                    ))}

                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      style={{
                        width: '38px',
                        height: '34px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      title="Custom Color"
                    />
                  </div>
                </div>

                {/* Row 4: Certificate / Badge Image Dropzone */}
                <ImagePasteDropzone
                  images={formData.badge}
                  multiple={false}
                  label="Certificate Badge / Logo / Document"
                  helperText="Easily paste screenshot or image from clipboard (Ctrl + V), drag and drop, or enter image link"
                  onChange={(imgUrl) => setFormData({ ...formData, badge: imgUrl })}
                />
              </div>

              <div className="modal-footer-bar">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  <FaSave /> {isNew ? 'Create Certificate' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
