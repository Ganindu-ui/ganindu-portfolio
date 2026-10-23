import React, { useState } from 'react';
import {
  FaPlus,
  FaSearch,
  FaThumbtack,
  FaArrowUp,
  FaArrowDown,
  FaEdit,
  FaTrash,
  FaBolt,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaGithub,
  FaTimes,
  FaSave
} from 'react-icons/fa';
import { usePortfolio } from '../../context/PortfolioContext';
import { ImagePasteDropzone } from './ImagePasteDropzone';

export const AdminProjects = () => {
  const {
    data,
    addProject,
    updateProject,
    deleteProject,
    togglePinProject,
    moveProject
  } = usePortfolio();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'pinned' | 'ongoing' | 'completed'
  const [editingProject, setEditingProject] = useState(null); // null or project object
  const [isNewProject, setIsNewProject] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    desc: '',
    tagsString: '',
    link: '',
    repo: '',
    status: 'completed',
    isPinned: false,
    images: []
  });

  // Filter and sort
  const projects = data.projects || [];
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase()) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())));

    if (!matchesSearch) return false;

    if (filter === 'pinned') return !!p.isPinned;
    if (filter === 'ongoing') return p.status === 'ongoing';
    if (filter === 'completed') return p.status === 'completed';
    return true;
  });

  const handleOpenAddModal = () => {
    setIsNewProject(true);
    setFormData({
      title: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      desc: '',
      tagsString: 'React, Node.js, Tailwind',
      link: '#',
      repo: '',
      status: 'ongoing',
      isPinned: false,
      images: []
    });
    setEditingProject({ id: 'new' });
  };

  const handleOpenEditModal = (proj) => {
    setIsNewProject(false);
    setFormData({
      title: proj.title || '',
      date: proj.date || '',
      desc: proj.desc || '',
      tagsString: Array.isArray(proj.tags) ? proj.tags.join(', ') : '',
      link: proj.link || '',
      repo: proj.repo || '',
      status: proj.status || 'completed',
      isPinned: !!proj.isPinned,
      images: Array.isArray(proj.images) ? proj.images : (proj.images ? [proj.images] : [])
    });
    setEditingProject(proj);
  };

  const handleCloseModal = () => {
    setEditingProject(null);
    setIsNewProject(false);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please provide a project title');
      return;
    }

    const tags = formData.tagsString
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const imagesToSave =
      formData.images.length > 0 ? formData.images : ['/images/image.png'];

    const projectPayload = {
      title: formData.title.trim(),
      date: formData.date.trim(),
      desc: formData.desc.trim(),
      tags,
      link: formData.link.trim() || '#',
      repo: formData.repo.trim(),
      status: formData.status,
      isPinned: formData.isPinned,
      images: imagesToSave
    };

    if (isNewProject) {
      addProject(projectPayload);
    } else {
      updateProject(editingProject.id, projectPayload);
    }

    handleCloseModal();
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteProject(id);
    }
  };

  const quickTags = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Tailwind', 'MongoDB', 'PostgreSQL', 'Framer Motion', 'IoT', 'Supabase'];

  const addQuickTag = (tag) => {
    const current = formData.tagsString
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    if (!current.includes(tag)) {
      const updated = [...current, tag].join(', ');
      setFormData({ ...formData, tagsString: updated });
    }
  };

  return (
    <div className="admin-projects-section">
      <div className="panel-header-row">
        <div>
          <h2 className="panel-title">
            🚀 Projects <span className="text-highlight">Manager</span>
          </h2>
          <p className="panel-desc">
            Organize project order, pin top highlights, manage ongoing builds, and copy-paste screenshots directly.
          </p>
        </div>

        <button className="admin-btn admin-btn-primary" onClick={handleOpenAddModal}>
          <FaPlus /> Add New Project
        </button>
      </div>

      {/* Toolbar */}
      <div className="admin-toolbar">
        <div className="admin-search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search projects by title, description or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-pills-row">
          <button
            type="button"
            className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({projects.length})
          </button>
          <button
            type="button"
            className={`filter-pill ${filter === 'pinned' ? 'active' : ''}`}
            onClick={() => setFilter('pinned')}
          >
            📌 Pinned ({projects.filter((p) => p.isPinned).length})
          </button>
          <button
            type="button"
            className={`filter-pill ${filter === 'ongoing' ? 'active' : ''}`}
            onClick={() => setFilter('ongoing')}
          >
            ⚡ Ongoing ({projects.filter((p) => p.status === 'ongoing').length})
          </button>
          <button
            type="button"
            className={`filter-pill ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            ✅ Completed ({projects.filter((p) => p.status === 'completed').length})
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '90px' }}>Order</th>
              <th style={{ width: '80px' }}>Pin</th>
              <th>Project Details</th>
              <th style={{ width: '130px' }}>Status</th>
              <th style={{ width: '180px' }}>Tags</th>
              <th style={{ width: '120px' }}>Links</th>
              <th style={{ width: '110px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
                  No projects match your filter or search criteria.
                </td>
              </tr>
            ) : (
              filteredProjects.map((project, idx) => {
                const coverImage =
                  Array.isArray(project.images) && project.images.length > 0
                    ? project.images[0]
                    : '/images/image.png';

                // Find global index for order movements
                const globalIndex = projects.findIndex((p) => p.id === project.id);
                const isFirst = globalIndex === 0;
                const isLast = globalIndex === projects.length - 1;

                return (
                  <tr key={project.id} className={project.isPinned ? 'is-pinned-row' : ''}>
                    {/* Order Controls */}
                    <td>
                      <div className="order-controls-box">
                        <span className="order-rank-num">#{globalIndex + 1}</span>
                        <button
                          type="button"
                          className="order-btn"
                          disabled={isFirst}
                          onClick={() => moveProject(project.id, 'up')}
                          title="Move Up"
                        >
                          <FaArrowUp />
                        </button>
                        <button
                          type="button"
                          className="order-btn"
                          disabled={isLast}
                          onClick={() => moveProject(project.id, 'down')}
                          title="Move Down"
                        >
                          <FaArrowDown />
                        </button>
                      </div>
                    </td>

                    {/* Pin Toggle */}
                    <td>
                      <button
                        type="button"
                        className={`btn-icon-action ${project.isPinned ? 'pin-active' : ''}`}
                        onClick={() => togglePinProject(project.id)}
                        title={project.isPinned ? 'Unpin project' : 'Pin to top'}
                      >
                        <FaThumbtack />
                      </button>
                    </td>

                    {/* Project Info */}
                    <td>
                      <div className="thumb-cell-wrap">
                        <img src={coverImage} alt={project.title} className="table-thumbnail" />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span className="project-title-link">{project.title}</span>
                            {project.isPinned && (
                              <span className="badge-pinned" title="Pinned Project">
                                📌 Pinned
                              </span>
                            )}
                          </div>
                          <span className="project-meta-date">{project.date}</span>
                          <p
                            style={{
                              fontSize: '0.8rem',
                              color: '#94a3b8',
                              margin: '0.2rem 0 0',
                              maxWidth: '380px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {project.desc}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td>
                      {project.status === 'ongoing' ? (
                        <span className="badge-ongoing">
                          <FaBolt /> Ongoing
                        </span>
                      ) : (
                        <span className="badge-completed">
                          <FaCheckCircle /> Completed
                        </span>
                      )}
                    </td>

                    {/* Tags */}
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                        {project.tags &&
                          project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              style={{
                                fontSize: '0.72rem',
                                background: 'rgba(255,255,255,0.06)',
                                padding: '0.15rem 0.45rem',
                                borderRadius: '4px',
                                color: '#d8b4fe'
                              }}
                            >
                              #{tag}
                            </span>
                          ))}
                        {project.tags && project.tags.length > 3 && (
                          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Links */}
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {project.link && project.link !== '#' && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-icon-action"
                            title="Live Demo"
                          >
                            <FaExternalLinkAlt />
                          </a>
                        )}
                        {project.repo && (
                          <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-icon-action"
                            title="GitHub Repository"
                          >
                            <FaGithub />
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="action-buttons-cell" style={{ justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="btn-icon-action"
                          onClick={() => handleOpenEditModal(project)}
                          title="Edit Project"
                        >
                          <FaEdit />
                        </button>
                        <button
                          type="button"
                          className="btn-icon-action delete-action"
                          onClick={() => handleDelete(project.id, project.title)}
                          title="Delete Project"
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

      {/* Add / Edit Project Modal */}
      {editingProject && (
        <div className="admin-modal-backdrop" onClick={handleCloseModal}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-bar">
              <h3 className="modal-title-text">
                {isNewProject ? <FaPlus /> : <FaEdit />}
                {isNewProject ? 'Add New Project' : `Edit: ${formData.title || 'Project'}`}
              </h3>
              <button className="modal-close-btn" onClick={handleCloseModal}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSaveModal} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div className="modal-scroll-body">
                {/* Row 1: Title & Date */}
                <div className="form-grid-2">
                  <div className="form-group-item">
                    <label className="admin-label">Project Title *</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Smart Inventory System"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group-item">
                    <label className="admin-label">Date / Timeline</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="e.g. Feb 2026 or Ongoing"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>

                {/* Row 2: Status & Pinning */}
                <div className="form-grid-2">
                  <div className="form-group-item">
                    <label className="admin-label">Project Status</label>
                    <select
                      className="admin-select"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="completed">✅ Completed</option>
                      <option value="ongoing">⚡ Ongoing / In Progress</option>
                      <option value="planned">💡 Concept / Planned</option>
                    </select>
                  </div>

                  <div className="form-group-item" style={{ justifyContent: 'center' }}>
                    <label className="admin-label">Featured & Pinning</label>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem',
                        cursor: 'pointer',
                        padding: '0.65rem 1rem',
                        background: formData.isPinned ? 'rgba(168, 85, 247, 0.15)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${formData.isPinned ? '#a855f7' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: '10px'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.isPinned}
                        onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                      />
                      <span style={{ fontSize: '0.9rem', color: formData.isPinned ? '#d8b4fe' : '#94a3b8', fontWeight: 600 }}>
                        📌 Pin this project to top of portfolio
                      </span>
                    </label>
                  </div>
                </div>

                {/* Row 3: Live Link & GitHub */}
                <div className="form-grid-2">
                  <div className="form-group-item">
                    <label className="admin-label">Live Site URL</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="https://yourproject.com (or #)"
                      value={formData.link}
                      onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    />
                  </div>

                  <div className="form-group-item">
                    <label className="admin-label">GitHub Repository URL</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="https://github.com/..."
                      value={formData.repo}
                      onChange={(e) => setFormData({ ...formData, repo: e.target.value })}
                    />
                  </div>
                </div>

                {/* Row 4: Description */}
                <div className="form-group-item">
                  <label className="admin-label">Project Description</label>
                  <textarea
                    rows={4}
                    className="admin-textarea"
                    placeholder="Describe your role, key technologies used, architecture, and achievements..."
                    value={formData.desc}
                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  />
                </div>

                {/* Row 5: Tags */}
                <div className="form-group-item">
                  <label className="admin-label">
                    <span>Tech Tags (comma separated)</span>
                  </label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="React, Python, Supabase, Tailwind"
                    value={formData.tagsString}
                    onChange={(e) => setFormData({ ...formData, tagsString: e.target.value })}
                  />
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Quick add:</span>
                    {quickTags.map((qt) => (
                      <button
                        key={qt}
                        type="button"
                        onClick={() => addQuickTag(qt)}
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          border: 'none',
                          color: '#cbd5e1',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '12px',
                          fontSize: '0.72rem',
                          cursor: 'pointer'
                        }}
                      >
                        +{qt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row 6: Image Dropzone & Clipboard Paste */}
                <ImagePasteDropzone
                  images={formData.images}
                  multiple={true}
                  label="Project Screenshots & Media"
                  helperText="Easily paste screenshots directly from your clipboard (Ctrl + V), drag and drop, or upload"
                  onChange={(updatedImages) => setFormData({ ...formData, images: updatedImages })}
                />
              </div>

              <div className="modal-footer-bar">
                <button type="button" className="admin-btn admin-btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  <FaSave /> {isNewProject ? 'Create Project' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
