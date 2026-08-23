import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ProjectItem } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Check, 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink, 
  Star, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Images
} from 'lucide-react';

interface ProjectCardProps {
  project: ProjectItem;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index = 0 }) => {
  const { 
    isEditMode, 
    clientSelection, 
    toggleProjectInterest, 
    setViewingProject, 
    setEditingProject, 
    deleteProject,
    data,
    themeMode,
    t
  } = usePortfolio();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isDark = themeMode === 'dark';
  const isSelected = clientSelection.selectedProjects.includes(project.id);
  const categoryInfo = data.categories.find(c => c.id === project.category);
  const categoryTrans = (t.categories.items as Record<string, { shortName: string; name: string }>)[project.category];
  const displayCategory = categoryTrans ? categoryTrans.shortName : (categoryInfo?.shortName || project.category);

  // Collect all images for the carousel
  const projectImages: string[] = React.useMemo(() => {
    if (project.images && project.images.length > 0) {
      return project.images.filter(Boolean);
    }
    return project.imageUrl ? [project.imageUrl] : [];
  }, [project.images, project.imageUrl]);

  const hasMultipleImages = projectImages.length > 1;
  const currentImageUrl = projectImages[currentImageIndex] || project.imageUrl;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? projectImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === projectImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      id={`project-card-${project.id}`}
      layout
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 8, transition: { duration: 0.2 } }}
      transition={{ 
        duration: 0.35, 
        ease: [0.16, 1, 0.3, 1],
        delay: Math.min(index * 0.04, 0.25),
        layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
      }}
      whileHover={{ scale: 1.02 }}
      className={`group relative rounded-3xl overflow-hidden border transition-shadow duration-300 transform-gpu flex flex-col ${
        isDark 
          ? `bg-[#12131c]/90 backdrop-blur-xl shadow-lg hover:shadow-2xl hover:shadow-pink-500/15 ${
              isSelected 
                ? 'border-pink-500/80 ring-2 ring-pink-500/30 bg-[#161222]/95 shadow-pink-500/15' 
                : 'border-white/10 hover:border-pink-500/50'
            }`
          : `bg-white shadow-sm hover:shadow-xl hover:shadow-slate-300/60 ${
              isSelected 
                ? 'border-pink-500 ring-2 ring-pink-500/20 bg-pink-50/20 shadow-pink-500/10' 
                : 'border-slate-200 hover:border-pink-400'
            }`
      }`}
    >
      {/* Image container with Carousel */}
      <div 
        className={`relative aspect-4/3 w-full overflow-hidden cursor-pointer select-none ${
          isDark ? 'bg-[#07080c]' : 'bg-slate-100'
        }`}
        onClick={() => setViewingProject(project)}
      >
        <img
          key={currentImageUrl}
          src={currentImageUrl}
          alt={project.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 animate-fadeIn"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 bg-[#090a0f]/85 backdrop-blur-md border border-white/10 text-white text-[11px] font-bold rounded-lg tracking-wider">
              {project.number}
            </span>
            {project.featured && (
              <span className="px-2.5 py-0.5 bg-amber-400/90 backdrop-blur-md text-neutral-950 text-[10px] font-bold rounded-lg flex items-center gap-1 shadow-sm">
                <Star className="w-2.5 h-2.5 fill-current" />
                {t.card.featuredBadge}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {hasMultipleImages && (
              <span className="px-2 py-0.5 bg-pink-600/90 backdrop-blur-md text-white text-[10px] font-bold rounded-lg flex items-center gap-1 shadow-sm">
                <Images className="w-3 h-3" />
                <span>{currentImageIndex + 1}/{projectImages.length}</span>
              </span>
            )}
            <span className="px-2.5 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 text-neutral-200 text-[11px] font-medium rounded-lg">
              {displayCategory}
            </span>
          </div>
        </div>

        {/* Carousel Navigation Arrows (visible if multiple images) */}
        {hasMultipleImages && (
          <>
            <button
              onClick={handlePrevImage}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-md hover:scale-110 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              aria-label="Siguiente foto"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-md hover:scale-110 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Carousel Dot Indicators */}
            <div className="absolute bottom-2.5 left-0 right-0 flex items-center justify-center gap-1.5 z-10 pointer-events-auto">
              {projectImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === currentImageIndex 
                      ? 'w-5 bg-pink-500 shadow-sm' 
                      : 'w-1.5 bg-white/60 hover:bg-white'
                  }`}
                  aria-label={`Ir a foto ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Hover overlay hint */}
        <div className={`absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none backdrop-blur-xs ${hasMultipleImages ? 'pb-6' : ''}`}>
          <span className="bg-white/95 text-neutral-950 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
            <ExternalLink className="w-3.5 h-3.5" />
            {t.card.viewDetails}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 
              className={`text-base font-bold leading-snug cursor-pointer transition-colors line-clamp-2 ${
                isDark 
                  ? 'text-white hover:text-pink-400' 
                  : 'text-slate-900 hover:text-pink-600'
              }`}
              onClick={() => setViewingProject(project)}
            >
              {project.title}
            </h3>
          </div>

          <p className={`text-xs font-medium mt-1 mb-2 flex items-center gap-1.5 ${
            isDark ? 'text-neutral-400' : 'text-slate-500'
          }`}>
            <span className={isDark ? 'text-neutral-500' : 'text-slate-400'}>{t.card.client}:</span>
            <span className={`font-semibold ${isDark ? 'text-neutral-200' : 'text-slate-800'}`}>{project.client}</span>
            {project.year && (
              <>
                <span className={isDark ? 'text-neutral-600' : 'text-slate-300'}>•</span>
                <span className={isDark ? 'text-neutral-400' : 'text-slate-500'}>{project.year}</span>
              </>
            )}
          </p>

          <p className={`text-xs line-clamp-2 leading-relaxed ${
            isDark ? 'text-neutral-300' : 'text-slate-600'
          }`}>
            {project.description}
          </p>

          {/* Tools tag badges */}
          {project.tools && project.tools.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.tools.map((tool, idx) => (
                <span 
                  key={idx} 
                  className={`text-[10px] px-2.5 py-0.5 rounded-lg font-medium border ${
                    isDark 
                      ? 'bg-white/5 border-white/10 text-neutral-300' 
                      : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  {tool}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className={`mt-3 pt-3 border-t flex items-center justify-between gap-2 ${
          isDark ? 'border-white/10' : 'border-slate-200'
        }`}>
          {/* Client Selection / Interest button */}
          <button
            id={`toggle-interest-btn-${project.id}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleProjectInterest(project.id);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all active:scale-98 cursor-pointer ${
              isSelected
                ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-md shadow-pink-600/30'
                : isDark
                  ? 'bg-white/5 hover:bg-pink-500/15 text-neutral-300 hover:text-pink-300 border border-white/10'
                  : 'bg-slate-50 hover:bg-pink-50 text-slate-700 hover:text-pink-700 border border-slate-200'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>{t.card.selectedStyle}</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>{t.card.interestedStyle}</span>
              </>
            )}
          </button>

          {/* Edit Mode Quick Actions */}
          {isEditMode && (
            <div className="flex items-center gap-1">
              <button
                id={`edit-proj-btn-${project.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingProject(project);
                }}
                className={`p-2 rounded-xl transition-colors border cursor-pointer ${
                  isDark
                    ? 'text-neutral-400 hover:text-amber-400 hover:bg-amber-400/10 border-transparent hover:border-amber-400/20'
                    : 'text-slate-500 hover:text-amber-700 hover:bg-amber-50 border-transparent hover:border-amber-200'
                }`}
                title={t.card.edit}
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                id={`delete-proj-btn-${project.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`${t.card.confirmDelete} ("${project.title}")`)) {
                    deleteProject(project.id);
                  }
                }}
                className={`p-2 rounded-xl transition-colors border cursor-pointer ${
                  isDark
                    ? 'text-neutral-400 hover:text-red-400 hover:bg-red-400/10 border-transparent hover:border-red-400/20'
                    : 'text-slate-500 hover:text-red-600 hover:bg-red-50 border-transparent hover:border-red-200'
                }`}
                title={t.card.delete}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
