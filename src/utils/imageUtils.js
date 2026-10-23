/**
 * Helper to compress image data to avoid hitting localStorage quotas.
 * Resizes images larger than maxWidth/maxHeight and compresses as JPEG/PNG data URL.
 */
export const processAndCompressImage = (fileOrBlob, maxWidth = 1200, maxHeight = 1200, quality = 0.82) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // If image is already smaller than max bounds and under 400KB, keep as is
        if (width <= maxWidth && height <= maxHeight && fileOrBlob.size < 400 * 1024) {
          resolve(dataUrl);
          return;
        }

        // Calculate aspect-ratio preserving dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Export as WebP or JPEG
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => resolve(dataUrl); // Fallback to raw dataUrl
      img.src = dataUrl;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(fileOrBlob);
  });
};
