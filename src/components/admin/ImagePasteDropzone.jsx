import React, { useState, useRef, useEffect } from 'react';
import { FaPaste, FaCloudUploadAlt, FaTrash, FaStar, FaLink, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { processAndCompressImage } from '../../utils/imageUtils';

export const ImagePasteDropzone = ({
  images = [],
  onChange,
  multiple = true,
  label = "Upload / Paste Images",
  helperText = "Paste screenshots directly with Ctrl+V, drag & drop, or browse"
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);
  const zoneRef = useRef(null);

  // Normalize image list for uniform handling
  const imageList = multiple 
    ? (Array.isArray(images) ? images : (images ? [images] : []))
    : (images ? [images] : []);

  const notify = (msg, type = 'success') => {
    setStatusMsg({ msg, type });
    setTimeout(() => setStatusMsg(null), 3500);
  };

  const handleFiles = async (files) => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);
    const validFiles = Array.from(files).filter(f => f.type.startsWith('image/'));

    if (validFiles.length === 0) {
      notify("Please provide a valid image file", "error");
      setIsProcessing(false);
      return;
    }

    try {
      const processedList = [];
      for (const file of validFiles) {
        const compressed = await processAndCompressImage(file);
        processedList.push(compressed);
      }

      if (multiple) {
        onChange([...imageList, ...processedList]);
        notify(`Added ${processedList.length} image(s)!`);
      } else {
        onChange(processedList[0]);
        notify(`Image updated successfully!`);
      }
    } catch (err) {
      console.error("Error processing image:", err);
      notify("Could not process image", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  // Clipboard Paste Handler (Ctrl+V)
  const handlePasteEvent = async (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    if (!clipboardData) return;

    const items = clipboardData.items;
    const imageFiles = [];

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        if (blob) imageFiles.push(blob);
      }
    }

    if (imageFiles.length > 0) {
      e.preventDefault();
      await handleFiles(imageFiles);
      notify(`Pasted ${imageFiles.length} image(s) from clipboard! 🎉`);
    }
  };

  // Listen for paste event when container is focused or hovered
  useEffect(() => {
    const element = zoneRef.current;
    if (!element) return;

    const onPaste = (e) => handlePasteEvent(e);
    element.addEventListener('paste', onPaste);
    return () => element.removeEventListener('paste', onPaste);
  }, [imageList, multiple]);

  // Drag and Drop
  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer && e.dataTransfer.files) {
      await handleFiles(e.dataTransfer.files);
    }
  };

  // Add via Direct URL
  const handleAddUrl = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    const trimmed = urlInput.trim();

    if (multiple) {
      onChange([...imageList, trimmed]);
      notify("Added image URL!");
    } else {
      onChange(trimmed);
      notify("Updated image URL!");
    }
    setUrlInput('');
  };

  // Remove single image
  const handleRemove = (index) => {
    if (multiple) {
      const updated = imageList.filter((_, i) => i !== index);
      onChange(updated);
    } else {
      onChange('');
    }
    notify("Removed image", "info");
  };

  // Set as Cover (Move to index 0)
  const handleSetCover = (index) => {
    if (!multiple || index === 0) return;
    const updated = [...imageList];
    const [selected] = updated.splice(index, 1);
    updated.unshift(selected);
    onChange(updated);
    notify("Set as primary cover image!");
  };

  return (
    <div className="image-dropzone-wrapper">
      <div className="dropzone-header">
        <label className="admin-label">{label}</label>
        <span className="dropzone-hint">{helperText}</span>
      </div>

      {statusMsg && (
        <div className={`dropzone-alert alert-${statusMsg.type}`}>
          {statusMsg.type === 'error' ? <FaExclamationCircle /> : <FaCheckCircle />}
          <span>{statusMsg.msg}</span>
        </div>
      )}

      {/* Interactive Drop & Paste Box */}
      <div
        ref={zoneRef}
        tabIndex={0}
        className={`image-dropzone-box ${isDragging ? 'is-dragging' : ''} ${isProcessing ? 'is-processing' : ''}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          multiple={multiple}
          style={{ display: 'none' }}
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="dropzone-icon-cluster">
          <div className="icon-badge upload-badge">
            <FaCloudUploadAlt />
          </div>
          <div className="icon-badge paste-badge" title="Copy an image & press Ctrl+V">
            <FaPaste />
          </div>
        </div>

        <div className="dropzone-text-group">
          <p className="dropzone-main-text">
            <strong>Click to browse</strong>, drag images here, or <span className="highlight-ctrl-v">Ctrl + V to paste</span>
          </p>
          <p className="dropzone-sub-text">
            Supports PNG, JPG, WebP & direct clipboard screenshots
          </p>
        </div>

        {isProcessing && (
          <div className="processing-overlay">
            <div className="admin-spinner"></div>
            <span>Optimizing Image...</span>
          </div>
        )}
      </div>

      {/* Direct URL Input Row */}
      <div className="url-input-row">
        <div className="url-input-field">
          <FaLink className="url-icon" />
          <input
            type="text"
            placeholder="Or enter image URL (e.g. /images/preview.png or https://...)"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddUrl(e);
              }
            }}
          />
        </div>
        <button
          type="button"
          className="admin-btn admin-btn-sm admin-btn-secondary"
          onClick={handleAddUrl}
          disabled={!urlInput.trim()}
        >
          Add URL
        </button>
      </div>

      {/* Thumbnails Gallery */}
      {imageList.length > 0 && (
        <div className="dropzone-gallery">
          <div className="gallery-header">
            <span>{multiple ? `Attached Images (${imageList.length})` : 'Image Preview'}</span>
            {multiple && <small>First image is used as the cover card</small>}
          </div>

          <div className="gallery-grid">
            {imageList.map((imgSrc, idx) => (
              <div key={idx} className={`gallery-item ${idx === 0 && multiple ? 'is-cover' : ''}`}>
                <div className="gallery-thumb-wrap">
                  <img src={imgSrc} alt={`Attachment ${idx + 1}`} className="gallery-img" />
                  {idx === 0 && multiple && (
                    <span className="cover-badge" title="Primary Cover Image">
                      <FaStar /> Cover
                    </span>
                  )}
                </div>

                <div className="gallery-actions">
                  {multiple && idx !== 0 && (
                    <button
                      type="button"
                      className="thumb-btn make-cover-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetCover(idx);
                      }}
                      title="Set as Cover"
                    >
                      <FaStar /> Set Cover
                    </button>
                  )}
                  <button
                    type="button"
                    className="thumb-btn remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(idx);
                    }}
                    title="Remove image"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
