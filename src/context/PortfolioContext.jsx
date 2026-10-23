import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_PORTFOLIO_DATA } from '../data/defaultData';

const LOCAL_STORAGE_KEY = 'ganindu_portfolio_data_v2';
const AUTH_KEY = 'ganindu_portfolio_admin_auth';

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  // Load data from LocalStorage or initialize with default data
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults in case new fields were added
        return {
          ...DEFAULT_PORTFOLIO_DATA,
          ...parsed,
          hero: { ...DEFAULT_PORTFOLIO_DATA.hero, ...(parsed.hero || {}) },
          about: { ...DEFAULT_PORTFOLIO_DATA.about, ...(parsed.about || {}) },
          contact: { ...DEFAULT_PORTFOLIO_DATA.contact, ...(parsed.contact || {}) },
          adminSettings: { ...DEFAULT_PORTFOLIO_DATA.adminSettings, ...(parsed.adminSettings || {}) },
          projects: parsed.projects || DEFAULT_PORTFOLIO_DATA.projects,
          certificates: parsed.certificates || DEFAULT_PORTFOLIO_DATA.certificates,
          skills: parsed.skills || DEFAULT_PORTFOLIO_DATA.skills
        };
      }
    } catch (e) {
      console.error('Failed to load portfolio data from localStorage', e);
    }
    return DEFAULT_PORTFOLIO_DATA;
  });

  // Navigation View: 'portfolio' | 'admin'
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const isPathAdmin = window.location.pathname.toLowerCase().includes('/admin');
      const isHashAdmin = window.location.hash.toLowerCase().includes('admin');
      const isSearchAdmin = window.location.search.toLowerCase().includes('admin=true');
      return (isPathAdmin || isHashAdmin || isSearchAdmin) ? 'admin' : 'portfolio';
    }
    return 'portfolio';
  });

  // Admin Authentication
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Save to LocalStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save portfolio data to localStorage', e);
    }
  }, [data]);

  // Keep URL in sync with view
  useEffect(() => {
    const handlePopState = () => {
      const isHashAdmin = window.location.hash.toLowerCase().includes('admin');
      const isPathAdmin = window.location.pathname.toLowerCase().includes('/admin');
      if (isHashAdmin || isPathAdmin) {
        setCurrentView('admin');
      }
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const switchView = (view) => {
    setCurrentView(view);
    if (typeof window !== 'undefined') {
      if (view === 'admin') {
        window.history.replaceState(null, '', '#admin');
      } else {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  };

  const loginAdmin = (pinInput) => {
    const expectedPin = data.adminSettings?.pin || '1234';
    if (data.adminSettings?.allowAutoLogin || pinInput === expectedPin) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem(AUTH_KEY, 'true');
      } catch {}
      return { success: true };
    }
    return { success: false, message: 'Invalid admin passcode. Default is 1234.' };
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_KEY);
    } catch {}
    switchView('portfolio');
  };

  // --- Hero & About & Contact Updates ---
  const updateHero = (heroUpdates) => {
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...heroUpdates }
    }));
  };

  const updateAbout = (aboutUpdates) => {
    setData((prev) => ({
      ...prev,
      about: { ...prev.about, ...aboutUpdates }
    }));
  };

  const updateContact = (contactUpdates) => {
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...contactUpdates }
    }));
  };

  const updateAdminSettings = (settingsUpdates) => {
    setData((prev) => ({
      ...prev,
      adminSettings: { ...prev.adminSettings, ...settingsUpdates }
    }));
  };

  // --- Projects Management ---
  const addProject = (project) => {
    const newProject = {
      id: `proj_${Date.now()}`,
      title: project.title || 'Untitled Project',
      date: project.date || 'Recent',
      images: Array.isArray(project.images) && project.images.length > 0 ? project.images : ['/images/image.png'],
      desc: project.desc || '',
      tags: Array.isArray(project.tags) ? project.tags : [],
      link: project.link || '#',
      repo: project.repo || '',
      status: project.status || 'completed', // 'completed' | 'ongoing' | 'planned'
      isPinned: !!project.isPinned,
      order: data.projects.length + 1
    };

    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
    return newProject;
  };

  const updateProject = (id, updates) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updates } : p))
    }));
  };

  const deleteProject = (id) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }));
  };

  const togglePinProject = (id) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, isPinned: !p.isPinned } : p))
    }));
  };

  const moveProject = (id, direction) => {
    setData((prev) => {
      const items = [...prev.projects];
      const index = items.findIndex((p) => p.id === id);
      if (index === -1) return prev;

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= items.length) return prev;

      // Swap
      const temp = items[index];
      items[index] = items[targetIndex];
      items[targetIndex] = temp;

      // Update explicit order field
      const reindexed = items.map((p, idx) => ({ ...p, order: idx + 1 }));
      return { ...prev, projects: reindexed };
    });
  };

  // --- Certificates Management ---
  const addCertificate = (cert) => {
    const newCert = {
      id: `cert_${Date.now()}`,
      title: cert.title || 'Certificate Title',
      issuer: cert.issuer || 'Issuer Organization',
      date: cert.date || '2026',
      credentialUrl: cert.credentialUrl || '#',
      badge: cert.badge || '/logo/University_of_Moratuwa_logo.png',
      color: cert.color || '#a855f7',
      order: data.certificates.length + 1
    };

    setData((prev) => ({
      ...prev,
      certificates: [...prev.certificates, newCert]
    }));
    return newCert;
  };

  const updateCertificate = (id, updates) => {
    setData((prev) => ({
      ...prev,
      certificates: prev.certificates.map((c) => (c.id === id ? { ...c, ...updates } : c))
    }));
  };

  const deleteCertificate = (id) => {
    setData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((c) => c.id !== id)
    }));
  };

  const moveCertificate = (id, direction) => {
    setData((prev) => {
      const items = [...prev.certificates];
      const index = items.findIndex((c) => c.id === id);
      if (index === -1) return prev;

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= items.length) return prev;

      const temp = items[index];
      items[index] = items[targetIndex];
      items[targetIndex] = temp;

      const reindexed = items.map((c, idx) => ({ ...c, order: idx + 1 }));
      return { ...prev, certificates: reindexed };
    });
  };

  // --- Skills Management ---
  const addSkill = (skill) => {
    const newSkill = {
      id: `skill_${Date.now()}`,
      title: skill.title || 'New Skill',
      desc: skill.desc || 'Skill description',
      level: skill.level ? `${parseInt(skill.level, 10)}%` : '80%',
      category: skill.category || 'General',
      icon: skill.icon || 'code'
    };

    setData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
    return newSkill;
  };

  const updateSkill = (id, updates) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...updates } : s))
    }));
  };

  const deleteSkill = (id) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id)
    }));
  };

  // --- Backup & Restore ---
  const exportData = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `ganindu_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importData = (importedJson) => {
    try {
      const parsed = typeof importedJson === 'string' ? JSON.parse(importedJson) : importedJson;
      if (!parsed || (!parsed.hero && !parsed.projects)) {
        throw new Error('Invalid portfolio backup JSON format');
      }
      setData({
        ...DEFAULT_PORTFOLIO_DATA,
        ...parsed
      });
      return { success: true };
    } catch (err) {
      console.error('Import error:', err);
      return { success: false, message: err.message };
    }
  };

  const resetToDefaults = () => {
    setData(DEFAULT_PORTFOLIO_DATA);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        currentView,
        setCurrentView: switchView,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        // Updaters
        updateHero,
        updateAbout,
        updateContact,
        updateAdminSettings,
        // Projects
        addProject,
        updateProject,
        deleteProject,
        togglePinProject,
        moveProject,
        // Certificates
        addCertificate,
        updateCertificate,
        deleteCertificate,
        moveCertificate,
        // Skills
        addSkill,
        updateSkill,
        deleteSkill,
        // Data tools
        exportData,
        importData,
        resetToDefaults
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
