import React, { useState } from 'react';
import {
  FaDownload,
  FaUpload,
  FaRedoAlt,
  FaKey,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSave,
  FaShieldAlt,
  FaDatabase
} from 'react-icons/fa';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminSettings = () => {
  const {
    data,
    updateAdminSettings,
    exportData,
    importData,
    resetToDefaults,
    canSaveToDisk,
    diskSaveStatus,
    saveToDisk
  } = usePortfolio();

  const [pin, setPin] = useState(data.adminSettings?.pin || '1234');
  const [allowAutoLogin, setAllowAutoLogin] = useState(!!data.adminSettings?.allowAutoLogin);
  const [feedbackMsg, setFeedbackMsg] = useState(null);
  const [importJsonText, setImportJsonText] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const notify = (msg, type = 'success') => {
    setFeedbackMsg({ msg, type });
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const handleCopyCode = () => {
    const code = `export const DEFAULT_PORTFOLIO_DATA = ${JSON.stringify(data, null, 2)};\n`;
    navigator.clipboard.writeText(code);
    notify('Copied defaultData.js code to clipboard!');
  };

  const handleSaveToCode = async () => {
    const res = await saveToDisk();
    if (res.success) {
      notify('Saved changes directly to src/data/defaultData.js on disk! 🎉');
    } else {
      notify(`Could not save to disk: ${res.message || 'Error'}`, 'error');
    }
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    if (!pin.trim()) {
      notify('Passcode PIN cannot be empty', 'error');
      return;
    }
    updateAdminSettings({
      pin: pin.trim(),
      allowAutoLogin
    });
    notify('Security settings updated successfully!');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        const res = importData(parsed);
        if (res.success) {
          notify('Portfolio backup successfully restored! 🎉');
        } else {
          notify(`Failed to restore: ${res.message}`, 'error');
        }
      } catch (err) {
        notify('Invalid JSON file format', 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleImportText = () => {
    if (!importJsonText.trim()) return;
    try {
      const parsed = JSON.parse(importJsonText);
      const res = importData(parsed);
      if (res.success) {
        notify('Portfolio data loaded from JSON!');
        setImportJsonText('');
      } else {
        notify(`Failed to import: ${res.message}`, 'error');
      }
    } catch (err) {
      notify('Invalid JSON string syntax', 'error');
    }
  };

  const handleConfirmReset = () => {
    resetToDefaults();
    setShowResetConfirm(false);
    notify('Portfolio reset to original factory defaults!', 'info');
  };

  // Estimate localStorage usage
  const storageSizeKB = Math.round(
    (JSON.stringify(data).length * 2) / 1024
  );

  return (
    <div className="admin-settings-section">
      <div className="panel-header-row">
        <div>
          <h2 className="panel-title">
            ⚙️ System & <span className="text-highlight">Backups</span>
          </h2>
          <p className="panel-desc">
            Export JSON backups, restore configurations, adjust admin passkey, or reset to default template data.
          </p>
        </div>
      </div>

      {feedbackMsg && (
        <div className={`dropzone-alert alert-${feedbackMsg.type}`} style={{ marginBottom: '1.5rem' }}>
          {feedbackMsg.type === 'error' ? <FaExclamationTriangle /> : <FaCheckCircle />}
          <span>{feedbackMsg.msg}</span>
        </div>
      )}

      {/* Storage Status */}
      <div className="admin-stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        <div className="stat-card-glass">
          <div className="stat-icon-wrapper stat-icon-purple">
            <FaDatabase />
          </div>
          <div className="stat-data-col">
            <span className="stat-big-num">{storageSizeKB} KB</span>
            <span className="stat-subtext">LocalStorage Cache Footprint</span>
          </div>
        </div>

        <div className="stat-card-glass">
          <div className="stat-icon-wrapper stat-icon-cyan">
            <FaShieldAlt />
          </div>
          <div className="stat-data-col">
            <span className="stat-big-num">PIN Protected</span>
            <span className="stat-subtext">Passcode: {data.adminSettings?.pin || '1234'}</span>
          </div>
        </div>
      </div>

      {/* Multi-Device Sync & Permanent Deployment */}
      <div className="admin-glass-card" style={{ borderColor: canSaveToDisk ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.3)' }}>
        <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <FaDatabase /> Multi-Device Sync & Deployment
        </h3>
        <p style={{ color: '#cbd5e1', fontSize: '0.92rem', marginBottom: '1.2rem', lineHeight: '1.5' }}>
          {canSaveToDisk ? (
            <span>
              <strong style={{ color: '#34d399' }}>✓ Connected to Dev Server:</strong> Changes are auto-saved directly into{' '}
              <code style={{ background: 'rgba(0,0,0,0.3)', padding: '0.2rem 0.4rem', borderRadius: '4px', color: '#67e8f9' }}>
                src/data/defaultData.js
              </code>{' '}
              on your computer. To make changes show on your phone and other devices, simply commit and push your code to Git (
              <code style={{ background: 'rgba(0,0,0,0.3)', padding: '0.2rem 0.4rem', borderRadius: '4px', color: '#f472b6' }}>
                git push
              </code>
              ). Vercel will deploy it everywhere!
            </span>
          ) : (
            <span>
              <strong style={{ color: '#fbbf24' }}>ℹ️ Local Storage Mode:</strong> You are currently viewing a static build or on another device. Changes made here stay inside this browser. To sync changes across all devices, copy the data code below, paste it into{' '}
              <code>src/data/defaultData.js</code>, and push to GitHub.
            </span>
          )}
        </p>

        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          {canSaveToDisk && (
            <button className="admin-btn admin-btn-primary" onClick={handleSaveToCode}>
              <FaSave /> {diskSaveStatus === 'saving' ? 'Saving to Code...' : 'Save Directly to defaultData.js'}
            </button>
          )}

          <button className="admin-btn admin-btn-secondary" onClick={handleCopyCode}>
            <FaDownload /> Copy Code for defaultData.js
          </button>
        </div>
      </div>

      {/* Backup & Export */}
      <div className="admin-glass-card">
        <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <FaDownload /> Export & Backup Data
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.2rem' }}>
          Download an offline JSON snapshot of your entire portfolio — all projects, order sequences, custom images, certificates, and settings.
        </p>

        <button className="admin-btn admin-btn-primary" onClick={exportData}>
          <FaDownload /> Download Portfolio Backup (.json)
        </button>
      </div>

      {/* Restore & Import */}
      <div className="admin-glass-card">
        <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <FaUpload /> Restore Backup
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.2rem' }}>
          Import a previously exported JSON backup file to instantly populate or migrate your portfolio.
        </p>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
          <label className="admin-btn admin-btn-secondary" style={{ cursor: 'pointer' }}>
            <FaUpload /> Choose Backup JSON File
            <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>
        </div>

        <div className="form-group-item">
          <label className="admin-label">Or paste JSON content directly:</label>
          <textarea
            rows={3}
            className="admin-textarea"
            placeholder='{"hero": {...}, "projects": [...]}'
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
          />
          <div style={{ marginTop: '0.6rem' }}>
            <button
              className="admin-btn admin-btn-sm admin-btn-secondary"
              onClick={handleImportText}
              disabled={!importJsonText.trim()}
            >
              Apply JSON Text
            </button>
          </div>
        </div>
      </div>

      {/* Passcode Security */}
      <div className="admin-glass-card">
        <h3 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <FaKey /> Admin Security & Passkey
        </h3>

        <form onSubmit={handleSaveSecurity} style={{ maxWidth: '480px' }}>
          <div className="form-group-item" style={{ marginBottom: '1.2rem' }}>
            <label className="admin-label">Admin Passcode (Default: 1234)</label>
            <input
              type="text"
              className="admin-input"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="e.g. 1234 or your secret key"
            />
          </div>

          <div className="form-group-item" style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={allowAutoLogin}
                onChange={(e) => setAllowAutoLogin(e.target.checked)}
              />
              <span style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>
                Remember login on this browser (skip password prompt)
              </span>
            </label>
          </div>

          <button type="submit" className="admin-btn admin-btn-primary">
            <FaSave /> Update Security Settings
          </button>
        </form>
      </div>

      {/* Factory Reset */}
      <div className="admin-glass-card" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
        <h3 style={{ color: '#f87171', fontSize: '1.25rem', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <FaExclamationTriangle /> Reset to Factory Defaults
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.2rem' }}>
          Restore the portfolio back to its original code state with Ganindu's default projects, skills, certificates and biography.
        </p>

        {!showResetConfirm ? (
          <button className="admin-btn admin-btn-danger" onClick={() => setShowResetConfirm(true)}>
            <FaRedoAlt /> Reset Portfolio Data
          </button>
        ) : (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1rem', borderRadius: '10px' }}>
            <p style={{ color: '#fca5a5', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600 }}>
              ⚠️ Are you sure? Any custom changes made will be replaced by the original portfolio defaults.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={handleConfirmReset}>
                Yes, Reset Everything
              </button>
              <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setShowResetConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
