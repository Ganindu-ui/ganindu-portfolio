import React, { useState } from 'react';
import { FaLock, FaKey, FaTimes, FaArrowRight, FaShieldAlt } from 'react-icons/fa';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminAuthModal = ({ isOpen, onClose }) => {
  const { loginAdmin, setCurrentView } = usePortfolio();
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = loginAdmin(pin);
    if (res.success) {
      setCurrentView('admin');
      onClose();
    } else {
      setErrorMsg(res.message || 'Incorrect passcode');
    }
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div
        className="admin-modal-card"
        style={{ maxWidth: '420px', textAlign: 'center' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header-bar" style={{ justifyContent: 'center', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#fff', fontWeight: 700 }}>
            <FaShieldAlt style={{ color: '#a855f7' }} /> Admin Authentication
          </div>
          <button
            className="modal-close-btn"
            style={{ position: 'absolute', right: '1.2rem' }}
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '2rem 1.8rem' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              color: '#d8b4fe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              margin: '0 auto 1.2rem',
              boxShadow: '0 0 25px rgba(168, 85, 247, 0.25)'
            }}
          >
            <FaLock />
          </div>

          <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.4rem' }}>
            Enter Admin Passcode
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Access the portfolio command center to manage projects, certificates and bio.
          </p>

          {errorMsg && (
            <div
              className="dropzone-alert alert-error"
              style={{ marginBottom: '1.2rem', textAlign: 'left' }}
            >
              {errorMsg}
            </div>
          )}

          <div className="form-group-item" style={{ marginBottom: '1.5rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                borderRadius: '12px',
                padding: '0.65rem 1rem'
              }}
            >
              <FaKey style={{ color: '#94a3b8' }} />
              <input
                type="password"
                placeholder="Passcode PIN"
                autoFocus
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1.2rem',
                  letterSpacing: '3px',
                  width: '100%',
                  outline: 'none',
                  textAlign: 'center'
                }}
              />
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.4rem' }}>
              Default PIN is <strong>1234</strong> (can be changed in Admin Settings)
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              type="submit"
              className="admin-btn admin-btn-primary"
              style={{ width: '100%', padding: '0.8rem' }}
            >
              Unlock Admin Panel <FaArrowRight />
            </button>

            <button
              type="button"
              className="admin-btn admin-btn-secondary admin-btn-sm"
              onClick={() => {
                loginAdmin('1234');
                setCurrentView('admin');
                onClose();
              }}
              style={{ width: '100%', fontSize: '0.8rem' }}
            >
              ⚡ Quick Unlock as Owner (1234)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
