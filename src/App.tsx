import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Header } from './components/Header';
import { PersonalLogo } from './components/PersonalLogo';
import { CurricularSummary } from './components/CurricularSummary';
import { CategoryFilter } from './components/CategoryFilter';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ClientSummaryModal } from './components/ClientSummaryModal';
import { EditProjectModal } from './components/EditProjectModal';
import { EditProfileModal } from './components/EditProfileModal';
import { AutoResponseModal } from './components/AutoResponseModal';
import { QuoteManagerModal } from './components/QuoteManagerModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { Footer } from './components/Footer';
import { 
  Search, 
  Sparkles, 
  Plus, 
  FileText, 
  Layers, 
  HelpCircle,
  CheckCircle,
  Filter,
  Maximize2,
  Minimize2,
  Eye,
  X,
  Edit2,
  Check
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    data, 
    updateProfile,
    selectedCategory, 
    setSelectedCategory,
    searchQuery, 
    setSearchQuery, 
    selectedYear,
    setSelectedYear,
    selectedTool,
    setSelectedTool,
    resetAdvancedFilters,
    activeAdvancedFiltersCount,
    isEditMode, 
    setEditingProject,
    setIsSummaryModalOpen,
    themeMode,
    isFocusMode,
    setIsFocusMode,
    t
  } = usePortfolio();

  const [isEditingSectionTitle, setIsEditingSectionTitle] = useState(false);
  const [sectionTitleDraft, setSectionTitleDraft] = useState('');

  const isDark = themeMode === 'dark';

  const currentSectionTitle = data.profile.portfolioSectionTitle || t.gallery.mainTitle;

  const handleStartEditingTitle = () => {
    setSectionTitleDraft(currentSectionTitle);
    setIsEditingSectionTitle(true);
  };

  const handleSaveSectionTitle = () => {
    const nextTitle = sectionTitleDraft.trim() || 'Portafolio';
    updateProfile({
      ...data.profile,
      portfolioSectionTitle: nextTitle
    });
    setIsEditingSectionTitle(false);
  };

  const handleCancelEditingTitle = () => {
    setIsEditingSectionTitle(false);
  };

  // Listen for Escape key to exit focus mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFocusMode) {
        setIsFocusMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFocusMode, setIsFocusMode]);

  // Filter projects based on category, year, tools, and search query
  const filteredProjects = useMemo(() => {
    return data.projects.filter(project => {
      const matchesCategory = 
        selectedCategory === 'todos' || project.category === selectedCategory;
      
      if (!matchesCategory) return false;

      const matchesYear = 
        selectedYear === 'todos' || !selectedYear || project.year === selectedYear;
      
      if (!matchesYear) return false;

      const matchesTool = 
        selectedTool === 'todos' || !selectedTool || 
        project.tools?.some(t => t.toLowerCase() === selectedTool.toLowerCase() || t.toLowerCase().includes(selectedTool.toLowerCase()));

      if (!matchesTool) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchTitle = project.title.toLowerCase().includes(q);
      const matchClient = project.client.toLowerCase().includes(q);
      const matchDesc = project.description.toLowerCase().includes(q);
      const matchTools = project.tools?.some(t => t.toLowerCase().includes(q));
      const matchCategory = project.category.toLowerCase().includes(q);
      const matchYear = project.year?.toLowerCase().includes(q);

      return matchTitle || matchClient || matchDesc || matchTools || matchCategory || matchYear;
    });
  }, [data.projects, selectedCategory, selectedYear, selectedTool, searchQuery]);

  const activeCategoryInfo = useMemo(() => {
    if (selectedCategory === 'todos') return null;
    const cat = data.categories.find(c => c.id === selectedCategory);
    if (!cat) return null;
    const categoryTrans = (t.categories.items as Record<string, { shortName: string; name: string; description: string }>)[cat.id];
    return {
      ...cat,
      name: categoryTrans ? categoryTrans.name : cat.name,
      description: categoryTrans ? categoryTrans.description : cat.description
    };
  }, [data.categories, selectedCategory, t]);

  return (
    <div className={`min-h-screen w-full max-w-full overflow-x-hidden relative font-sans flex flex-col selection:bg-pink-500 selection:text-white transition-colors duration-200 ${
      isDark 
        ? 'bg-[#07080c] text-neutral-100 bento-dot-bg' 
        : 'bg-[#f8f9fc] text-slate-900 bento-dot-bg-light'
    }`}>
      {/* Normal Header & Hero (Hidden in Focus Mode) */}
      {!isFocusMode ? (
        <>
          <Header />
          <CurricularSummary />
        </>
      ) : (
        /* Focus Mode Top Floating Navigation Bar */
        <div className={`sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-all shadow-lg ${
          isDark ? 'bg-[#07080c]/90 border-white/10 shadow-black/60' : 'bg-white/90 border-slate-200 shadow-slate-200/50'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <PersonalLogo size="sm" variant="color" />
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                </span>
                <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>
                  {t.header.focusModeActive}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className={`hidden md:inline-block text-[11px] font-medium px-2 py-0.5 rounded-md border ${
                isDark ? 'bg-white/5 border-white/10 text-neutral-400' : 'bg-slate-100 border-slate-200 text-slate-500'
              }`}>
                {t.header.focusModeHint}
              </span>

              <button
                id="exit-focus-mode-btn"
                onClick={() => setIsFocusMode(false)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:brightness-110 text-white rounded-xl text-xs font-bold shadow-md shadow-pink-600/30 transition-all active:scale-98 cursor-pointer"
                title={t.header.exitFocusMode}
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>{t.header.exitFocusMode}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Category Filter Bar */}
      <CategoryFilter />

      {/* Main Gallery Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Category Header or Search Title Bento Banner */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b transition-colors ${
          isDark ? 'border-white/10' : 'border-slate-200'
        }`}>
          <div>
            <div className="flex items-center gap-2.5">
              {activeCategoryInfo ? (
                <>
                  <span className="px-2.5 py-0.5 bg-gradient-to-r from-pink-600 to-pink-500 text-white text-xs font-bold rounded-lg shadow-xs shadow-pink-500/20">
                    {activeCategoryInfo.number}
                  </span>
                  <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {activeCategoryInfo.name}
                  </h2>
                </>
              ) : (
                <div className="flex flex-wrap items-center gap-2.5">
                  {isEditingSectionTitle ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={sectionTitleDraft}
                        onChange={(e) => setSectionTitleDraft(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveSectionTitle();
                          if (e.key === 'Escape') handleCancelEditingTitle();
                        }}
                        autoFocus
                        placeholder="Ej. Portafolio / Trabajos Emblemáticos"
                        className={`px-3 py-1 text-base sm:text-lg font-bold border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                          isDark ? 'bg-[#090a0f] border-pink-500/50 text-white' : 'bg-white border-pink-500 text-slate-900 shadow-sm'
                        }`}
                      />
                      <button
                        onClick={handleSaveSectionTitle}
                        className="p-1.5 bg-pink-600 hover:bg-pink-500 text-white rounded-xl transition-all shadow-sm cursor-pointer"
                        title="Guardar título"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleCancelEditingTitle}
                        className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                          isDark ? 'border-white/10 text-neutral-400 hover:text-white' : 'border-slate-300 text-slate-500 hover:text-slate-900'
                        }`}
                        title="Cancelar"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <h2 className={`text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      <span>{currentSectionTitle}</span>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                        isDark 
                          ? 'bg-white/10 text-neutral-300 border-white/10' 
                          : 'bg-slate-200/70 text-slate-700 border-slate-300'
                      }`}>
                        {filteredProjects.length} {t.categories.works}
                      </span>
                      {isEditMode && (
                        <button
                          onClick={handleStartEditingTitle}
                          className={`p-1 rounded-lg border text-xs flex items-center gap-1 transition-all cursor-pointer ${
                            isDark 
                              ? 'bg-pink-500/15 hover:bg-pink-500/25 border-pink-500/30 text-pink-300' 
                              : 'bg-pink-50 hover:bg-pink-100 border-pink-200 text-pink-700'
                          }`}
                          title="Cambiar título de la sección"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span className="text-[11px] font-bold">Cambiar Título</span>
                        </button>
                      )}
                    </h2>
                  )}
                </div>
              )}
            </div>
            
            {activeCategoryInfo && (
              <p className={`text-xs sm:text-sm mt-1 max-w-2xl ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                {activeCategoryInfo.description}
              </p>
            )}

            {searchQuery && (
              <p className={`text-xs mt-1.5 flex items-center gap-1.5 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                <Search className="w-3.5 h-3.5 text-pink-500" />
                <span>{t.gallery.searchResultsFor} "{searchQuery}"</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-pink-600 font-bold hover:underline ml-1 cursor-pointer"
                >
                  ({t.gallery.clearSearch})
                </button>
              </p>
            )}

            {/* Active Filter Badges */}
            {(selectedYear !== 'todos' || selectedTool !== 'todos' || selectedCategory !== 'todos' || searchQuery) && (
              <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                <span className={`text-[11px] font-semibold ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  {t.advancedFilters.activeFiltersTitle}
                </span>

                {selectedCategory !== 'todos' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-500 border border-pink-500/30">
                    <span>{t.advancedFilters.activeCategory}: {activeCategoryInfo?.shortName || selectedCategory}</span>
                    <button 
                      onClick={() => setSelectedCategory('todos')}
                      className="hover:text-pink-300 ml-0.5 cursor-pointer"
                      title="Eliminar filtro"
                    >
                      ×
                    </button>
                  </span>
                )}

                {selectedYear !== 'todos' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30">
                    <span>{t.advancedFilters.activeYear}: {selectedYear}</span>
                    <button 
                      onClick={() => setSelectedYear('todos')}
                      className="hover:text-purple-200 ml-0.5 cursor-pointer"
                      title="Eliminar filtro"
                    >
                      ×
                    </button>
                  </span>
                )}

                {selectedTool !== 'todos' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                    <span>{t.advancedFilters.activeTool}: {selectedTool}</span>
                    <button 
                      onClick={() => setSelectedTool('todos')}
                      className="hover:text-blue-200 ml-0.5 cursor-pointer"
                      title="Eliminar filtro"
                    >
                      ×
                    </button>
                  </span>
                )}

                <button
                  onClick={() => {
                    resetAdvancedFilters();
                    setSelectedCategory('todos');
                    setSearchQuery('');
                  }}
                  className={`text-[11px] font-bold underline ml-1 cursor-pointer ${
                    isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t.advancedFilters.clearAll}
                </button>
              </div>
            )}
          </div>

          {/* Quick interactive action for designer/client */}
          <div className="flex items-center gap-2 shrink-0">
            {isEditMode ? (
              <button
                id="add-new-project-main-btn"
                onClick={() => setEditingProject({
                  id: '',
                  number: `${data.projects.length + 1}`,
                  title: '',
                  category: selectedCategory === 'todos' ? 'logos' : selectedCategory,
                  client: '',
                  year: new Date().getFullYear().toString(),
                  description: '',
                  tools: ['Illustrator', 'Photoshop'],
                  features: [],
                  imageUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop&q=80',
                  featured: true
                })}
                className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-xl text-xs font-bold shadow-md shadow-amber-400/20 transition-all active:scale-98 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Trabajo a esta Sección</span>
              </button>
            ) : (
              <button
                id="main-quote-builder-btn"
                onClick={() => setIsSummaryModalOpen(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold backdrop-blur-md transition-all active:scale-98 shadow-xs border cursor-pointer ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white border-white/10'
                    : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-300 shadow-2xs'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-pink-500" />
                <span>{t.hero.ctaQuote}</span>
              </button>
            )}
          </div>
        </div>

        {/* Gallery Grid in Bento Arrangement */}
        {filteredProjects.length === 0 ? (
          <div className={`backdrop-blur-md rounded-3xl p-12 text-center border max-w-lg mx-auto space-y-4 my-8 ${
            isDark 
              ? 'bg-[#12131a]/80 border-white/10' 
              : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50'
          }`}>
            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mx-auto ${
              isDark ? 'bg-white/5 border-white/10 text-neutral-400' : 'bg-slate-100 border-slate-200 text-slate-500'
            }`}>
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{t.gallery.noResultsTitle}</h3>
              <p className={`text-xs mt-1 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                {t.gallery.noResultsDesc}
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
                resetAdvancedFilters();
              }}
              className="px-4 py-2 bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-xl text-xs font-bold hover:brightness-110 shadow-md shadow-pink-600/20 cursor-pointer"
            >
              {t.advancedFilters.resetFilters}
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Bento Interactive Instructions Banner for Clients / Visitors */}
        <div className={`rounded-2xl p-5 border backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8 shadow-lg ${
          isDark 
            ? 'bg-gradient-to-r from-[#141522]/90 via-[#171626]/80 to-[#141724]/90 border-white/10' 
            : 'bg-gradient-to-r from-slate-50 via-pink-50/30 to-purple-50/40 border-slate-200 shadow-slate-200/50'
        }`}>
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-pink-500/10 border border-pink-500/30 text-pink-500 rounded-xl shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {t.gallery.instructionsTitle}
              </h4>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                {t.gallery.instructionsDesc}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSummaryModalOpen(true)}
            className="shrink-0 px-4 py-2.5 bg-gradient-to-r from-pink-600 to-blue-600 hover:brightness-110 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-pink-600/20 active:scale-98 cursor-pointer"
          >
            {t.gallery.openQuoter}
          </button>
        </div>
      </main>

      {/* Footer (Hidden in Focus Mode) */}
      {!isFocusMode && <Footer />}

      {/* Floating Exit Focus Mode Quick Pill (Bottom Center) */}
      {isFocusMode && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce-subtle">
          <button
            id="floating-exit-focus-btn"
            onClick={() => setIsFocusMode(false)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white rounded-full text-xs font-bold shadow-xl shadow-pink-600/40 hover:brightness-110 active:scale-95 transition-all cursor-pointer border border-white/20"
            title={t.header.exitFocusMode}
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>{t.header.exitFocusMode}</span>
            <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded-full font-mono">ESC</span>
          </button>
        </div>
      )}

      {/* Modals */}
      <ProjectDetailModal />
      <ClientSummaryModal />
      <AutoResponseModal />
      <QuoteManagerModal />
      <EditProjectModal />
      <EditProfileModal />

      {/* Floating WhatsApp Action Widget */}
      <FloatingWhatsAppButton />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <MainContent />
    </PortfolioProvider>
  );
}
