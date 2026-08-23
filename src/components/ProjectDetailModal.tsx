import React, { useEffect, useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  X, 
  Check, 
  Plus, 
  Tag, 
  Calendar, 
  Briefcase, 
  Wrench, 
  FileText,
  Sparkles,
  ArrowRight,
  Share2,
  ChevronLeft,
  ChevronRight,
  Images
} from 'lucide-react';

export const ProjectDetailModal: React.FC = () => {
  const { 
    viewingProject, 
    setViewingProject, 
    clientSelection, 
    toggleProjectInterest,
    setIsSummaryModalOpen,
    data,
    themeMode,
    getButtonClass,
    getButtonStyle
  } = usePortfolio();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const isDark = themeMode === 'dark';

  // Extract all images for the current project
  const projectImages: string[] = useMemo(() => {
    if (!viewingProject) return [];
    if (viewingProject.images && viewingProject.images.length > 0) {
      return viewingProject.images.filter(Boolean);
    }
    return viewingProject.imageUrl ? [viewingProject.imageUrl] : [];
  }, [viewingProject]);

  // Reset active image index when viewingProject changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [viewingProject?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setViewingProject(null);
      } else if (e.key === 'ArrowLeft' && projectImages.length > 1) {
        setActiveImageIndex((prev) => (prev === 0 ? projectImages.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight' && projectImages.length > 1) {
        setActiveImageIndex((prev) => (prev === projectImages.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setViewingProject, projectImages.length]);

  if (!viewingProject) return null;

  const isSelected = clientSelection.selectedProjects.includes(viewingProject.id);
  const categoryInfo = data.categories.find(c => c.id === viewingProject.category);
  const hasMultipleImages = projectImages.length > 1;
  const currentImageUrl = projectImages[activeImageIndex] || viewingProject.imageUrl;

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev === 0 ? projectImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev === projectImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className={`relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border my-auto flex flex-col max-h-[90vh] transition-colors ${
          isDark 
            ? 'bg-[#101119] text-white border-white/10' 
            : 'bg-white text-slate-900 border-slate-200 shadow-slate-900/20'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${
          isDark ? 'border-white/10 bg-[#0c0d14]' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-2.5">
            <span className={`px-2.5 py-0.5 text-xs font-bold rounded-lg border ${
              isDark ? 'bg-white/10 text-white border-white/10' : 'bg-slate-200 text-slate-800 border-slate-300'
            }`}>
              {viewingProject.number}
            </span>
            <span className="text-xs font-semibold text-pink-500 bg-pink-500/10 border border-pink-500/20 px-2.5 py-0.5 rounded-lg">
              {categoryInfo?.name || viewingProject.category}
            </span>
          </div>
          <button
            id="close-project-detail-modal"
            onClick={() => setViewingProject(null)}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isDark ? 'text-neutral-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Main Visual Image with Carousel Controls */}
          <div className="space-y-3">
            <div className={`relative rounded-2xl overflow-hidden border flex items-center justify-center shadow-inner aspect-16/10 max-h-[380px] select-none ${
              isDark ? 'bg-[#07080c] border-white/10' : 'bg-slate-100 border-slate-200'
            }`}>
              <img
                key={currentImageUrl}
                src={currentImageUrl}
                alt={`${viewingProject.title} - Vista ${activeImageIndex + 1}`}
                className="w-full h-full object-contain transition-opacity duration-300 animate-fadeIn"
              />

              {/* Carousel Indicators & Arrows */}
              {hasMultipleImages && (
                <>
                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2.5 py-1 bg-black/75 backdrop-blur-md border border-white/15 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md">
                      <Images className="w-3.5 h-3.5 text-pink-400" />
                      <span>{activeImageIndex + 1} de {projectImages.length}</span>
                    </span>
                  </div>

                  <button
                    onClick={handlePrev}
                    aria-label="Foto anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-lg hover:scale-110 cursor-pointer border border-white/10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleNext}
                    aria-label="Siguiente foto"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-lg hover:scale-110 cursor-pointer border border-white/10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip (if multiple photos) */}
            {hasMultipleImages && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin">
                {projectImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      idx === activeImageIndex
                        ? 'border-pink-500 ring-2 ring-pink-500/40 scale-105 shadow-md'
                        : isDark
                          ? 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                          : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Miniatura ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.2 bg-black/70 text-[9px] font-bold text-white rounded-md">
                      {idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Titles & Meta */}
          <div>
            <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {viewingProject.title}
            </h2>
            
            <div className={`flex flex-wrap items-center gap-y-2 gap-x-4 mt-2 text-xs sm:text-sm ${
              isDark ? 'text-neutral-300' : 'text-slate-600'
            }`}>
              <div className="flex items-center gap-1.5">
                <Briefcase className={`w-4 h-4 ${isDark ? 'text-neutral-500' : 'text-slate-400'}`} />
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{viewingProject.client}</span>
              </div>
              {viewingProject.year && (
                <div className="flex items-center gap-1.5">
                  <Calendar className={`w-4 h-4 ${isDark ? 'text-neutral-500' : 'text-slate-400'}`} />
                  <span>{viewingProject.year}</span>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Description */}
          <div className={`rounded-2xl p-4 sm:p-5 border ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
          }`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
              isDark ? 'text-neutral-400' : 'text-slate-500'
            }`}>
              Concepto &amp; Desarrollo del Proyecto
            </h4>
            <p className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-neutral-200' : 'text-slate-700'
            }`}>
              {viewingProject.description}
            </p>
          </div>

          {/* Features / Entregables */}
          {viewingProject.features && viewingProject.features.length > 0 && (
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${
                isDark ? 'text-neutral-400' : 'text-slate-500'
              }`}>
                Características &amp; Alcance Visual
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {viewingProject.features.map((feat, idx) => (
                  <li key={idx} className={`flex items-start gap-2 text-xs sm:text-sm p-3 rounded-2xl border ${
                    isDark 
                      ? 'text-neutral-200 bg-white/5 border-white/10' 
                      : 'text-slate-700 bg-slate-50 border-slate-200'
                  }`}>
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tools Used */}
          {viewingProject.tools && viewingProject.tools.length > 0 && (
            <div>
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${
                isDark ? 'text-neutral-400' : 'text-slate-500'
              }`}>
                Herramientas &amp; Técnicas
              </h4>
              <div className="flex flex-wrap gap-2">
                {viewingProject.tools.map((t, idx) => (
                  <span key={idx} className={`text-xs font-medium px-3.5 py-1 rounded-xl border ${
                    isDark 
                      ? 'bg-white/5 border-white/10 text-neutral-200' 
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className={`p-4 sm:p-5 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isDark ? 'border-white/10 bg-[#0c0d14]' : 'border-slate-200 bg-slate-50'
        }`}>
          <button
            id="modal-toggle-interest-btn"
            onClick={() => toggleProjectInterest(viewingProject.id)}
            className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold transition-all active:scale-98 ${
              isSelected
                ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-md shadow-pink-600/30'
                : isDark
                  ? 'bg-white/5 hover:bg-pink-500/20 text-neutral-200 hover:text-white border border-white/10'
                  : 'bg-white hover:bg-pink-50 text-slate-700 hover:text-pink-700 border border-slate-300 shadow-2xs'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Incluido en mi Selección de Cotización</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Agregar este estilo a mi cotización</span>
              </>
            )}
          </button>

          <button
            id="modal-open-summary-btn"
            onClick={() => {
              if (!isSelected) {
                toggleProjectInterest(viewingProject.id);
              }
              setViewingProject(null);
              setIsSummaryModalOpen(true);
            }}
            style={getButtonStyle()}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold shadow-md transition-all active:scale-98 cursor-pointer ${getButtonClass()}`}
          >
            <FileText className="w-4 h-4" />
            <span>Generar Resumen</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

