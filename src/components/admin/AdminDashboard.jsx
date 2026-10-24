import React, { useState } from 'react';
import {
  FaRocket,
  FaCertificate,
  FaCode,
  FaUserAlt,
  FaCog,
  FaSignOutAlt,
  FaEye,
  FaThumbtack,
  FaBolt,
  FaCheckCircle,
  FaPlus,
  FaDownload,
  FaArrowRight,
  FaLayerGroup
} from 'react-icons/fa';
import { usePortfolio } from '../../context/PortfolioContext';
import { AdminProjects } from './AdminProjects';
import { AdminCertificates } from './AdminCertificates';
import { AdminSkills } from './AdminSkills';
import { AdminProfile } from './AdminProfile';
import { AdminSettings } from './AdminSettings';
import './admin.css';

export const AdminDashboard = () => {
  const { data, setCurrentView, logoutAdmin, exportData, canSaveToDisk, diskSaveStatus, saveToDisk } = usePortfolio();
  const [activeTab, setActiveTab] = useState('projects'); // 'overview' | 'projects' | 'certificates' | 'skills' | 'profile' | 'settings'

  const projects = data.projects || [];
  const certs = data.certificates || [];
  const skills = data.skills || [];
  const pinnedCount = projects.filter((p) => p.isPinned).length;
  const ongoingCount = projects.filter((p) => p.status === 'ongoing').length;

  return (
    <div className="admin-viewport">
      {/* Background ambient lighting */}
      <div className="admin-ambient-glow glow-purple" />
      <div className="admin-ambient-glow glow-pink" />

      {/* Top Navbar */}
      <header className="admin-navbar">
        <div className="admin-brand">
          <div className="brand-icon-box">⬡</div>
          <div className="brand-text-group">
            <span className="brand-title">GANINDU.DEV // ADMIN</span>
            <span className="brand-subtitle">PORTFOLIO CONTROL ENGINE</span>
          </div>
        </div>

        <div className="admin-nav-actions">
          <div
            className="status-indicator"
            title={canSaveToDisk ? "Auto-saving to src/data/defaultData.js on your computer" : "Saved in browser LocalStorage. Push code to Git for multi-device sync."}
          >
            <span
              className="status-dot-pulse"
              style={{
                backgroundColor: canSaveToDisk ? '#10b981' : '#f59e0b',
                boxShadow: canSaveToDisk ? '0 0 8px #10b981' : '0 0 8px #f59e0b'
              }}
            />
            <span style={{ color: canSaveToDisk ? '#a7f3d0' : '#fde68a' }}>
              {canSaveToDisk
                ? (diskSaveStatus === 'saving' ? 'Saving to Code...' : (diskSaveStatus === 'saved' ? 'Saved to Code ✓' : 'Disk Sync: Active'))
                : 'Device LocalStorage'}
            </span>
          </div>

          {canSaveToDisk && (
            <button
              type="button"
              className="admin-btn admin-btn-primary admin-btn-sm"
              onClick={() => saveToDisk()}
              title="Save current data directly to src/data/defaultData.js"
            >
              Save to Code
            </button>
          )}

          <button
            type="button"
            className="admin-btn admin-btn-secondary admin-btn-sm"
            onClick={() => setCurrentView('portfolio')}
            title="Preview Live Site"
          >
            <FaEye /> Live Portfolio
          </button>

          <button
            type="button"
            className="admin-btn admin-btn-danger admin-btn-sm"
            onClick={logoutAdmin}
            title="Log Out"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </header>

      {/* Layout: Sidebar + Main Content */}
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <ul className="sidebar-nav-list">
            <li>
              <button
                type="button"
                className={`sidebar-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                <FaLayerGroup className="sidebar-btn-icon" />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`sidebar-btn ${activeTab === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveTab('projects')}
              >
                <FaRocket className="sidebar-btn-icon" />
                <span>Projects</span>
                <span className="sidebar-badge">{projects.length}</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`sidebar-btn ${activeTab === 'certificates' ? 'active' : ''}`}
                onClick={() => setActiveTab('certificates')}
              >
                <FaCertificate className="sidebar-btn-icon" />
                <span>Certificates</span>
                <span className="sidebar-badge">{certs.length}</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`sidebar-btn ${activeTab === 'skills' ? 'active' : ''}`}
                onClick={() => setActiveTab('skills')}
              >
                <FaCode className="sidebar-btn-icon" />
                <span>Skills</span>
                <span className="sidebar-badge">{skills.length}</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`sidebar-btn ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <FaUserAlt className="sidebar-btn-icon" />
                <span>Profile & Bio</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                className={`sidebar-btn ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <FaCog className="sidebar-btn-icon" />
                <span>Settings & Data</span>
              </button>
            </li>
          </ul>

          <div className="sidebar-footer">
            <button
              type="button"
              className="admin-btn admin-btn-secondary admin-btn-sm"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={exportData}
            >
              <FaDownload /> Backup JSON
            </button>
          </div>
        </aside>

        <main className="admin-main-panel">
          {activeTab === 'overview' && (
            <div className="admin-overview-view">
              <div className="panel-header-row">
                <div>
                  <h2 className="panel-title">
                    ⚡ Welcome, <span className="text-highlight">{data.hero.name}</span>
                  </h2>
                  <p className="panel-desc">
                    Here is an overview of your portfolio content, pinned highlights, and live stats.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <button
                    className="admin-btn admin-btn-primary"
                    onClick={() => setActiveTab('projects')}
                  >
                    <FaPlus /> Manage Projects
                  </button>
                  <button
                    className="admin-btn admin-btn-secondary"
                    onClick={() => setCurrentView('portfolio')}
                  >
                    <FaEye /> View Live Site
                  </button>
                </div>
              </div>

              {/* Stats Tiles */}
              <div className="admin-stats-grid">
                <div className="stat-card-glass" onClick={() => setActiveTab('projects')} style={{ cursor: 'pointer' }}>
                  <div className="stat-icon-wrapper stat-icon-purple">
                    <FaRocket />
                  </div>
                  <div className="stat-data-col">
                    <span className="stat-big-num">{projects.length}</span>
                    <span className="stat-subtext">Total Projects</span>
                  </div>
                </div>

                <div className="stat-card-glass" onClick={() => setActiveTab('projects')} style={{ cursor: 'pointer' }}>
                  <div className="stat-icon-wrapper stat-icon-pink">
                    <FaThumbtack />
                  </div>
                  <div className="stat-data-col">
                    <span className="stat-big-num">{pinnedCount}</span>
                    <span className="stat-subtext">Pinned Highlights</span>
                  </div>
                </div>

                <div className="stat-card-glass" onClick={() => setActiveTab('projects')} style={{ cursor: 'pointer' }}>
                  <div className="stat-icon-wrapper stat-icon-cyan">
                    <FaBolt />
                  </div>
                  <div className="stat-data-col">
                    <span className="stat-big-num">{ongoingCount}</span>
                    <span className="stat-subtext">Ongoing Builds</span>
                  </div>
                </div>

                <div className="stat-card-glass" onClick={() => setActiveTab('certificates')} style={{ cursor: 'pointer' }}>
                  <div className="stat-icon-wrapper stat-icon-amber">
                    <FaCertificate />
                  </div>
                  <div className="stat-data-col">
                    <span className="stat-big-num">{certs.length}</span>
                    <span className="stat-subtext">Certificates</span>
                  </div>
                </div>
              </div>

              {/* Quick Jump Shortcuts */}
              <div className="admin-glass-card">
                <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1rem' }}>
                  🚀 Quick Jump Controls
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <div
                    onClick={() => setActiveTab('projects')}
                    style={{
                      padding: '1.2rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <h4 style={{ color: '#fff', margin: '0 0 0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FaRocket style={{ color: '#a855f7' }} /> Reorder & Pin Projects
                    </h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
                      Adjust display hierarchy, move projects up/down, and toggle ongoing status.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveTab('certificates')}
                    style={{
                      padding: '1.2rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <h4 style={{ color: '#fff', margin: '0 0 0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FaCertificate style={{ color: '#ec4899' }} /> Manage Certificates
                    </h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
                      Paste certificate badges directly with Ctrl+V and change card glow colors.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveTab('profile')}
                    style={{
                      padding: '1.2rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <h4 style={{ color: '#fff', margin: '0 0 0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FaUserAlt style={{ color: '#06b6d4' }} /> Edit Bio & Tech Stack
                    </h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>
                      Update greetings, hero pills, Polaroid photo, and stats counters.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Projects Access preview */}
              <AdminProjects />
            </div>
          )}

          {activeTab === 'projects' && <AdminProjects />}
          {activeTab === 'certificates' && <AdminCertificates />}
          {activeTab === 'skills' && <AdminSkills />}
          {activeTab === 'profile' && <AdminProfile />}
          {activeTab === 'settings' && <AdminSettings />}
        </main>
      </div>
    </div>
  );
};
