/**
 * Image Optimizer and Canvas-based Processing Utility
 * Optimizes photos automatically for portfolio display:
 * - Smart resizing maintaining aspect ratio (up to 1920px max dimension)
 * - High-fidelity bicubic canvas interpolation
 * - Preserves high visual sharpness while reducing payload to avoid localStorage bottlenecks
 */

export interface OptimizeOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0 (default 0.90 for high visual fidelity)
  outputFormat?: 'image/webp' | 'image/jpeg';
}

export interface OptimizationResult {
  dataUrl: string;
  originalWidth: number;
  originalHeight: number;
  width: number;
  height: number;
  originalSize: number;
  optimizedSize: number;
  savingsPercent: number;
  format: string;
}

export interface ImageAdjustments {
  brightness: number; // -50 to +50 (default 0)
  contrast: number;   // -50 to +50 (default 0)
  saturation: number; // -50 to +50 (default 0)
  rotation: number;   // 0, 90, 180, 270
  aspectRatio: 'original' | '16:9' | '4:3' | '1:1' | '3:2';
}

export const IMAGE_SPEC_GUIDE = {
  recommendedResolution: '1920 × 1080 px (16:9) o 1600 × 1200 px (4:3)',
  minResolution: '1200 × 800 px (72 a 150 DPI para pantallas retina)',
  optimalRatio: 'Horizontal / Paisaje (16:9 o 4:3) para carrusel y portadas',
  formats: 'JPG, PNG, WebP, SVG',
  maxUploadSize: 'Hasta 20 MB (el optimizador la ajusta automáticamente a ~200-350 KB sin pérdida visible de nitidez)'
};

/**
 * Load an image from File or URL / DataURL
 */
export const loadImage = (src: string | File): Promise<{ img: HTMLImageElement; originalSize: number }> => {
  return new Promise((resolve, reject) => {
    let originalSize = 0;
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      resolve({ img, originalSize });
    };

    img.onerror = (err) => {
      reject(new Error('No se pudo cargar la imagen. Comprueba el formato o la URL.'));
    };

    if (typeof src === 'string') {
      originalSize = Math.round((src.length * 3) / 4); // Approximate base64 size
      img.src = src;
    } else {
      originalSize = src.size;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          img.src = e.target.result as string;
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(src);
    }
  });
};

/**
 * Automatically resize & optimize an image maintaining graphic quality
 */
export const optimizeImage = async (
  src: string | File,
  options: OptimizeOptions = {}
): Promise<OptimizationResult> => {
  const {
    maxWidth = 1440,
    maxHeight = 1440,
    quality = 0.84,
    outputFormat = 'image/webp'
  } = options;

  const { img, originalSize } = await loadImage(src);

  const origWidth = img.naturalWidth || img.width;
  const origHeight = img.naturalHeight || img.height;

  // Calculate new dimensions
  let targetWidth = origWidth;
  let targetHeight = origHeight;

  if (targetWidth > maxWidth || targetHeight > maxHeight) {
    const ratio = Math.min(maxWidth / targetWidth, maxHeight / targetHeight);
    targetWidth = Math.round(targetWidth * ratio);
    targetHeight = Math.round(targetHeight * ratio);
  }

  // Create canvas for high quality render
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    throw new Error('No se pudo inicializar el procesador de imagen Canvas 2D.');
  }

  // High quality interpolation settings
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Fill with clean background (for transparent PNGs converted to JPEG if necessary)
  if (outputFormat === 'image/jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  }

  // Draw image
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  // Try WebP first, fallback to JPEG if browser doesn't support WebP export
  let dataUrl = '';
  let finalFormat = outputFormat;

  try {
    dataUrl = canvas.toDataURL(outputFormat, quality);
    // Some browsers return image/png if webp is unsupported
    if (outputFormat === 'image/webp' && !dataUrl.startsWith('data:image/webp')) {
      dataUrl = canvas.toDataURL('image/jpeg', quality);
      finalFormat = 'image/jpeg';
    }
  } catch {
    dataUrl = canvas.toDataURL('image/jpeg', quality);
    finalFormat = 'image/jpeg';
  }

  // Adaptive second-pass: If payload is still > 180KB, compress slightly more to stay ultra-light
  let optimizedSize = Math.round((dataUrl.length * 3) / 4);
  if (optimizedSize > 180 * 1024) {
    const secondaryCanvas = document.createElement('canvas');
    const scale = Math.min(1, 1200 / Math.max(targetWidth, targetHeight));
    secondaryCanvas.width = Math.round(targetWidth * scale);
    secondaryCanvas.height = Math.round(targetHeight * scale);
    const secCtx = secondaryCanvas.getContext('2d');
    if (secCtx) {
      secCtx.imageSmoothingEnabled = true;
      secCtx.imageSmoothingQuality = 'high';
      secCtx.drawImage(canvas, 0, 0, secondaryCanvas.width, secondaryCanvas.height);
      const secondaryDataUrl = secondaryCanvas.toDataURL(finalFormat, 0.78);
      if (secondaryDataUrl && secondaryDataUrl.length < dataUrl.length) {
        dataUrl = secondaryDataUrl;
        targetWidth = secondaryCanvas.width;
        targetHeight = secondaryCanvas.height;
        optimizedSize = Math.round((dataUrl.length * 3) / 4);
      }
    }
  }

  const savingsPercent = originalSize > 0 
    ? Math.max(0, Math.round(((originalSize - optimizedSize) / originalSize) * 100))
    : 0;

  return {
    dataUrl,
    originalWidth: origWidth,
    originalHeight: origHeight,
    width: targetWidth,
    height: targetHeight,
    originalSize,
    optimizedSize,
    savingsPercent,
    format: finalFormat
  };
};

/**
 * Apply interactive visual adjustments (brightness, contrast, saturation, rotation, aspect crop)
 */
export const applyImageAdjustments = async (
  src: string,
  adjustments: ImageAdjustments,
  quality = 0.90
): Promise<string> => {
  const { img } = await loadImage(src);
  const origW = img.naturalWidth || img.width;
  const origH = img.naturalHeight || img.height;

  // Handle aspect ratio cropping
  let sourceX = 0;
  let sourceY = 0;
  let sourceW = origW;
  let sourceH = origH;

  if (adjustments.aspectRatio !== 'original') {
    let targetRatio = 16 / 9;
    if (adjustments.aspectRatio === '4:3') targetRatio = 4 / 3;
    if (adjustments.aspectRatio === '1:1') targetRatio = 1;
    if (adjustments.aspectRatio === '3:2') targetRatio = 3 / 2;

    const currentRatio = origW / origH;

    if (currentRatio > targetRatio) {
      // Crop sides
      sourceW = Math.round(origH * targetRatio);
      sourceX = Math.round((origW - sourceW) / 2);
    } else {
      // Crop top/bottom
      sourceH = Math.round(origW / targetRatio);
      sourceY = Math.round((origH - sourceH) / 2);
    }
  }

  const isRotated = adjustments.rotation === 90 || adjustments.rotation === 270;
  const destW = isRotated ? sourceH : sourceW;
  const destH = isRotated ? sourceW : sourceH;

  // Scale down if too large
  let finalW = destW;
  let finalH = destH;
  const maxDim = 1920;
  if (finalW > maxDim || finalH > maxDim) {
    const scale = Math.min(maxDim / finalW, maxDim / finalH);
    finalW = Math.round(finalW * scale);
    finalH = Math.round(finalH * scale);
  }

  const canvas = document.createElement('canvas');
  canvas.width = finalW;
  canvas.height = finalH;

  const ctx = canvas.getContext('2d');
  if (!ctx) return src;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Apply visual filters (brightness, contrast, saturation)
  const bPercent = 100 + adjustments.brightness;
  const cPercent = 100 + adjustments.contrast;
  const sPercent = 100 + adjustments.saturation;

  ctx.filter = `brightness(${bPercent}%) contrast(${cPercent}%) saturate(${sPercent}%)`;

  // Apply rotation
  ctx.save();
  ctx.translate(finalW / 2, finalH / 2);
  ctx.rotate((adjustments.rotation * Math.PI) / 180);

  const drawW = isRotated ? finalH : finalW;
  const drawH = isRotated ? finalW : finalH;

  ctx.drawImage(
    img,
    sourceX,
    sourceY,
    sourceW,
    sourceH,
    -drawW / 2,
    -drawH / 2,
    drawW,
    drawH
  );
  ctx.restore();

  try {
    return canvas.toDataURL('image/webp', quality);
  } catch {
    return canvas.toDataURL('image/jpeg', quality);
  }
};

/**
 * Format bytes to readable string (e.g. 1.2 MB or 350 KB)
 */
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};
