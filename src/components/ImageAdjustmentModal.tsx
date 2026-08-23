import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  applyImageAdjustments, 
  ImageAdjustments,
  IMAGE_SPEC_GUIDE 
} from '../utils/imageOptimizer';
import { 
  X, 
  Check, 
  Sliders, 
  RotateCw, 
  Crop, 
  Sun, 
  Contrast, 
  Palette, 
  Sparkles,
  Info,
  RefreshCw
} from 'lucide-react';

interface ImageAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onSaveAdjustedImage: (newImageUrl: string) => void;
  imageIndex?: number;
}

export const ImageAdjustmentModal: React.FC<ImageAdjustmentModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  onSaveAdjustedImage,
  imageIndex = 0
}) => {
  const { themeMode } = usePortfolio();
  const isDark = themeMode === 'dark';

  const [adjustments, setAdjustments] = useState<ImageAdjustments>({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    rotation: 0,
    aspectRatio: 'original'
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [showSpecsGuide, setShowSpecsGuide] = useState(false);

  if (!isOpen || !imageUrl) return null;

  const handleRotate = () => {
    setAdjustments(prev => ({
      ...prev,
      rotation: (prev.rotation + 90) % 360
    }));
  };

  const handleReset = () => {
    setAdjustments({
      brightness: 0,
      contrast: 0,
      saturation: 0,
      rotation: 0,
      aspectRatio: 'original'
    });
  };

  const handleApplyAndSave = async () => {
    setIsProcessing(true);
    try {
      const adjusted = await applyImageAdjustments(imageUrl, adjustments);
      onSaveAdjustedImage(adjusted);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Hubo un problema al aplicar los ajustes a la imagen.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Preview styling filters
  const previewFilter = `brightness(${100 + adjustments.brightness}%) contrast(${100 + adjustments.contrast}%) saturate(${100 + adjustments.saturation}%)`;
  const previewTransform = `rotate(${adjustments.rotation}deg)`;

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className={`relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border my-auto flex flex-col max-h-[92vh] transition-colors ${
          isDark ? 'bg-[#101119] text-white border-white/10' : 'bg-white text-slate-900 border-slate-200 shadow-2xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${
          isDark ? 'border-white/10 bg-[#090a0f]' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${
              isDark ? 'bg-pink-500/10 border-pink-500/20 text-pink-400' : 'bg-pink-50 border-pink-200 text-pink-700'
            }`}>
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-base sm:text-lg font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Ajuste &amp; Optimización de Fotografía #{imageIndex + 1}
              </h3>
              <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                Personaliza la proporción, rotación, nitidez y tono visual
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-toggle-specs-guide"
              onClick={() => setShowSpecsGuide(!showSpecsGuide)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                showSpecsGuide 
                  ? 'bg-pink-600 text-white border-pink-500 shadow-sm'
                  : isDark
                    ? 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Guía de Resolución</span>
            </button>
            <button
              id="btn-close-adjustment-modal"
              onClick={onClose}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isDark ? 'text-neutral-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Specs Guide Drawer / Collapsible Banner */}
        {showSpecsGuide && (
          <div className={`px-6 py-4 border-b animate-fadeIn ${
            isDark ? 'bg-pink-950/20 border-pink-500/20 text-neutral-200' : 'bg-pink-50 border-pink-200 text-slate-800'
          }`}>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-1.5 text-xs">
                <h4 className="font-bold text-pink-500 text-sm">
                  Especificaciones Técnicas Recomendadas para Portafolio
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  <div>
                    <strong className="text-pink-400">Resolución Ideal:</strong> {IMAGE_SPEC_GUIDE.recommendedResolution}
                  </div>
                  <div>
                    <strong className="text-pink-400">Resolución Mínima:</strong> {IMAGE_SPEC_GUIDE.minResolution}
                  </div>
                  <div>
                    <strong className="text-pink-400">Proporción:</strong> {IMAGE_SPEC_GUIDE.optimalRatio}
                  </div>
                  <div>
                    <strong className="text-pink-400">Formatos &amp; Peso:</strong> {IMAGE_SPEC_GUIDE.formats} (Hasta 20 MB)
                  </div>
                </div>
                <p className={`text-[11px] pt-1 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                  💡 <em>El optimizador automático reduce el peso hasta un 85% preservando la fidelidad de vectores, tipografías y detalles finos con renderizado bicúbico HD.</em>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Body Grid: Preview + Controls */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Image Preview Canvas Container */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className={`relative w-full aspect-[16/10] rounded-2xl overflow-hidden flex items-center justify-center border shadow-inner ${
              isDark ? 'bg-black/60 border-white/10' : 'bg-slate-100 border-slate-300'
            }`}>
              <img
                src={imageUrl}
                alt="Vista previa ajustada"
                className="max-w-full max-h-full object-contain transition-transform duration-200"
                style={{
                  filter: previewFilter,
                  transform: previewTransform
                }}
              />

              {/* Aspect Ratio Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[11px] font-mono font-bold flex items-center gap-1.5 border border-white/20">
                <Crop className="w-3 h-3 text-pink-400" />
                <span>Ratio: {adjustments.aspectRatio.toUpperCase()}</span>
              </div>

              {/* Rotation Badge */}
              {adjustments.rotation > 0 && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[11px] font-mono font-bold flex items-center gap-1.5 border border-white/20">
                  <RotateCw className="w-3 h-3 text-pink-400" />
                  <span>{adjustments.rotation}°</span>
                </div>
              )}
            </div>
            <p className={`text-[11px] mt-2 text-center ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
              Vista previa en tiempo real. Los cambios se renderizan con calidad visual HD al guardar.
            </p>
          </div>

          {/* Right: Fine-Tuning Controls */}
          <div className="lg:col-span-5 space-y-4">
            {/* Aspect Ratio Presets */}
            <div>
              <label className={`block text-xs font-bold mb-2 flex items-center gap-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                <Crop className="w-3.5 h-3.5 text-pink-500" />
                <span>Proporción de Recorte</span>
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {(['original', '16:9', '4:3', '1:1', '3:2'] as const).map((ratio) => (
                  <button
                    key={ratio}
                    type="button"
                    onClick={() => setAdjustments(prev => ({ ...prev, aspectRatio: ratio }))}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      adjustments.aspectRatio === ratio
                        ? 'bg-pink-600 text-white border-pink-500 shadow-md shadow-pink-600/30'
                        : isDark
                          ? 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    }`}
                  >
                    {ratio === 'original' ? 'Original' : ratio}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Rotate Button */}
            <div>
              <label className={`block text-xs font-bold mb-2 flex items-center gap-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                <RotateCw className="w-3.5 h-3.5 text-pink-500" />
                <span>Rotación de Orientación</span>
              </label>
              <button
                type="button"
                onClick={handleRotate}
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  isDark 
                    ? 'bg-white/5 hover:bg-white/10 text-neutral-200 border-white/10' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                }`}
              >
                <RotateCw className="w-4 h-4 text-pink-500" />
                <span>Girar 90° en Sentido Horario ({adjustments.rotation}°)</span>
              </button>
            </div>

            {/* Sliders: Brightness */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className={`font-semibold flex items-center gap-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Brillo / Luminosidad</span>
                </span>
                <span className="font-mono text-[11px] text-pink-500 font-bold">
                  {adjustments.brightness > 0 ? `+${adjustments.brightness}` : adjustments.brightness}%
                </span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={adjustments.brightness}
                onChange={(e) => setAdjustments(prev => ({ ...prev, brightness: Number(e.target.value) }))}
                className="w-full accent-pink-500 h-1.5 bg-neutral-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Sliders: Contrast */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className={`font-semibold flex items-center gap-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                  <Contrast className="w-3.5 h-3.5 text-blue-400" />
                  <span>Contraste &amp; Definición</span>
                </span>
                <span className="font-mono text-[11px] text-pink-500 font-bold">
                  {adjustments.contrast > 0 ? `+${adjustments.contrast}` : adjustments.contrast}%
                </span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={adjustments.contrast}
                onChange={(e) => setAdjustments(prev => ({ ...prev, contrast: Number(e.target.value) }))}
                className="w-full accent-pink-500 h-1.5 bg-neutral-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Sliders: Saturation */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className={`font-semibold flex items-center gap-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                  <Palette className="w-3.5 h-3.5 text-pink-400" />
                  <span>Saturación de Color</span>
                </span>
                <span className="font-mono text-[11px] text-pink-500 font-bold">
                  {adjustments.saturation > 0 ? `+${adjustments.saturation}` : adjustments.saturation}%
                </span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={adjustments.saturation}
                onChange={(e) => setAdjustments(prev => ({ ...prev, saturation: Number(e.target.value) }))}
                className="w-full accent-pink-500 h-1.5 bg-neutral-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Reset Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className={`w-full py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isDark ? 'text-neutral-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restablecer Valores Originales</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className={`px-6 py-4 border-t flex items-center justify-between ${
          isDark ? 'border-white/10 bg-[#090a0f]' : 'border-slate-200 bg-slate-50'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
              isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cancelar
          </button>

          <button
            type="button"
            id="btn-apply-image-adjustments"
            onClick={handleApplyAndSave}
            disabled={isProcessing}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white rounded-xl text-xs font-bold shadow-lg shadow-pink-500/25 transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>{isProcessing ? 'Procesando en HD...' : 'Aplicar Ajustes a la Foto'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
