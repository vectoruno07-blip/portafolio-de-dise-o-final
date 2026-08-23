import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PersonalLogo } from './PersonalLogo';
import { 
  FileText, 
  Edit3, 
  Eye, 
  Search, 
  X, 
  Plus, 
  UserCheck, 
  CheckCircle2,
  Sparkles,
  Settings,
  Sun,
  Moon,
  Globe,
  Maximize2,
  Inbox,
  LogOut
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    data, 
    isEditMode, 
    setIsEditMode, 
    searchQuery, 
    setSearchQuery,
    clientSelection,
    setIsSummaryModalOpen,
    setEditingProject,
    setIsProfileModalOpen,
    quoteRequests,
    setIsQuoteManagerOpen,
    themeMode,
    toggleThemeMode,
    isFocusMode,
    toggleFocusMode,
    language,
    setLanguage,
    t,
    hasAdminAccess,
    logoutAdmin,
    handleLogoClick
  } = usePortfolio();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const totalSelected = clientSelection.selectedProjects.length + clientSelection.selectedServices.length;
  const pendingQuotesCount = quoteRequests.filter(q => q.status === 'pending').length;
  const isDark = themeMode === 'dark';

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-200 ${
      isDark 
        ? 'bg-[#090a0f]/90 border-white/10' 
        : 'bg-white/90 border-slate-200 shadow-xs'
    }`}>
      {/* Top Notification / Designer Status Bar (Mobile & Tablet friendly) */}
      <div className={`text-xs px-3 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-2 border-b transition-colors ${
        isDark 
          ? 'bg-[#050608] text-neutral-300 border-white/5' 
          : 'bg-slate-100 text-slate-600 border-slate-200'
      }`}>
        <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-block w-2 h-2 shrink-0 rounded-full bg-emerald-500 shadow-xs shadow-emerald-400"></span>
          <span className={`font-semibold tracking-wide shrink-0 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {data.profile.name}
          </span>
          <span className={`hidden sm:inline ${isDark ? 'text-neutral-600' : 'text-slate-400'} shrink-0`}>|</span>
          <span className={`hidden sm:inline truncate ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
            {data.profile.title}
          </span>
          <span className={`hidden lg:inline shrink-0 ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>
            ({data.profile.experienceBadgeText || t.header.statusExp})
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Top Bar Language Switcher */}
          <div 
            role="radiogroup" 
            aria-label={t.header.langSwitcher || "Selector de Idioma"}
            className={`flex items-center p-0.5 rounded-full border text-[11px] font-bold ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-300 shadow-2xs'
            }`}
          >
            <button
              id="top-lang-es-btn"
              role="radio"
              aria-checked={language === 'es'}
              onClick={() => setLanguage('es')}
              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                language === 'es'
                  ? 'bg-pink-600 text-white shadow-xs font-extrabold'
                  : isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Español (Spanish)"
            >
              ES
            </button>
            <button
              id="top-lang-en-btn"
              role="radio"
              aria-checked={language === 'en'}
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-pink-600 text-white shadow-xs font-extrabold'
                  : isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="English (Inglés)"
            >
              EN
            </button>
          </div>

          {/* Theme Quick Switcher in top bar for fast access */}
          <button
            id="top-theme-toggle-btn"
            onClick={toggleThemeMode}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              isDark
                ? 'bg-white/5 border border-white/10 text-neutral-300 hover:text-amber-300 hover:bg-white/10'
                : 'bg-white border border-slate-300 text-slate-700 hover:text-amber-600 hover:bg-slate-50 shadow-2xs'
            }`}
            title={isDark ? t.header.switchToLight : t.header.switchToDark}
            aria-label="Alternar tema"
          >
            {isDark ? (
              <>
                <Sun className="w-3 h-3 text-amber-400" />
                <span className="hidden sm:inline text-[11px]">{t.header.lightMode}</span>
              </>
            ) : (
              <>
                <Moon className="w-3 h-3 text-indigo-600" />
                <span className="hidden sm:inline text-[11px]">{t.header.darkMode}</span>
              </>
            )}
          </button>

          {/* Mode Switcher & Admin Logout */}
          {hasAdminAccess && (
            <div className="flex items-center gap-1.5">
              <button
                id="toggle-edit-mode-btn"
                onClick={() => setIsEditMode(!isEditMode)}
                className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isEditMode
                    ? 'bg-amber-400 text-neutral-950 shadow-sm ring-2 ring-amber-400/40'
                    : isDark
                      ? 'bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10'
                      : 'bg-white border border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-50 shadow-2xs'
                }`}
                title="Alternar entre vista de cliente y modo edición 100% editable"
              >
                {isEditMode ? (
                  <>
                    <Edit3 className="w-3 h-3" />
                    <span className="hidden sm:inline">{t.header.editorMode}</span>
                    <span className="sm:hidden">Edit</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3 h-3" />
                    <span className="hidden sm:inline">{t.header.clientView}</span>
                    <span className="sm:hidden">{t.header.viewShort}</span>
                  </>
                )}
              </button>

              <button
                id="logout-admin-btn"
                onClick={logoutAdmin}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isDark 
                    ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300 border border-red-500/20' 
                    : 'text-red-600 hover:bg-red-50 hover:text-red-700 border border-red-200 shadow-2xs'
                }`}
                title="Cerrar sesión de Administrador"
              >
                <LogOut className="w-3 h-3" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        {/* Brand & Personal Logo */}
        <div 
          className="flex items-center gap-2.5 sm:gap-3 min-w-0 cursor-pointer shrink-0 transition-transform active:scale-98"
          onClick={handleLogoClick}
          title="Víctor Hugo González - Portafolio Profesional (5 clics para autenticación)"
        >
          <PersonalLogo size="md" variant="color" />
          <div className={`hidden lg:block pl-3 border-l ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
            <p className={`text-xs font-bold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {t.header.brandTitle}
            </p>
            <p className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
              {t.header.brandSubtitle}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Prominent Language Switcher Pill in Main Bar (Visible on xl screens) */}
          <div 
            role="radiogroup"
            aria-label={t.header.langSwitcher || "Selector de Idioma"}
            className={`hidden xl:flex items-center p-1 rounded-2xl border transition-all ${
              isDark ? 'bg-[#15161e] border-white/10' : 'bg-slate-50 border-slate-200 shadow-2xs'
            }`}
          >
            <Globe className={`w-3.5 h-3.5 ml-1.5 mr-1 shrink-0 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`} />
            <button
              id="main-lang-es-btn"
              role="radio"
              aria-checked={language === 'es'}
              onClick={() => setLanguage('es')}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                language === 'es'
                  ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-xs shadow-pink-500/20 font-extrabold'
                  : isDark
                    ? 'text-neutral-400 hover:text-white hover:bg-white/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              title="Cambiar a Español"
            >
              <span>Español</span>
            </button>
            <button
              id="main-lang-en-btn"
              role="radio"
              aria-checked={language === 'en'}
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-xs shadow-pink-500/20 font-extrabold'
                  : isDark
                    ? 'text-neutral-400 hover:text-white hover:bg-white/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
              title="Switch to English"
            >
              <span>English</span>
            </button>
          </div>

          {/* Main Header Theme Toggle Button */}
          <button
            id="theme-toggle-btn"
            onClick={toggleThemeMode}
            className={`hidden md:flex p-2 rounded-xl transition-all border items-center gap-1.5 text-xs font-semibold cursor-pointer ${
              isDark
                ? 'text-neutral-300 hover:text-amber-300 hover:bg-white/10 border-white/10'
                : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-100 border-slate-200 shadow-2xs'
            }`}
            title={isDark ? t.header.switchToLight : t.header.switchToDark}
            aria-label="Alternar modo de color"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 transition-transform hover:-rotate-12" />
            )}
            <span className="hidden xl:inline">
              {isDark ? t.header.lightMode : t.header.darkMode}
            </span>
          </button>

          {/* Focus Mode / Fullscreen Immersion Button */}
          <button
            id="focus-mode-toggle-btn"
            onClick={toggleFocusMode}
            className={`hidden lg:flex p-2 rounded-xl transition-all border items-center gap-1.5 text-xs font-semibold cursor-pointer ${
              isFocusMode
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white border-transparent shadow-md shadow-pink-600/30'
                : isDark
                  ? 'text-neutral-300 hover:text-white hover:bg-white/10 border-white/10'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-200 shadow-2xs'
            }`}
            title={`${t.header.focusMode} (${t.header.focusModeSubtitle})`}
            aria-label={t.header.focusMode}
          >
            <Maximize2 className="w-4 h-4 text-pink-500" />
            <span className="hidden xl:inline">{t.header.focusMode}</span>
          </button>

          {/* Search Toggle button on Mobile / Expanded on desktop */}
          {isSearchOpen ? (
            <div className={`flex items-center rounded-xl px-2 sm:px-2.5 py-1 sm:py-1.5 border focus-within:ring-2 focus-within:ring-pink-500/50 ${
              isDark 
                ? 'bg-[#15161e] border-white/15' 
                : 'bg-slate-50 border-slate-300 shadow-inner'
            }`}>
              <Search className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-1.5 shrink-0 ${isDark ? 'text-neutral-400' : 'text-slate-400'}`} />
              <input
                id="search-input-header"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.header.searchPlaceholder}
                className={`bg-transparent text-xs sm:text-sm outline-none w-24 sm:w-36 lg:w-44 ${
                  isDark ? 'text-white placeholder:text-neutral-500' : 'text-slate-900 placeholder:text-slate-400'
                }`}
                autoFocus
              />
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className={`p-1 ${isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              id="open-search-btn"
              onClick={() => setIsSearchOpen(true)}
              className={`p-1.5 sm:p-2 rounded-xl transition-colors border cursor-pointer ${
                isDark 
                  ? 'text-neutral-300 hover:text-white hover:bg-white/10 border-white/10' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200 shadow-2xs'
              }`}
              title={t.header.searchTitle}
              aria-label={t.header.searchTitle}
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* Edit actions (only in edit mode) */}
          {isEditMode && (
            <>
              <button
                id="header-edit-profile-btn"
                onClick={() => setIsProfileModalOpen(true)}
                className={`p-1.5 sm:p-2 rounded-xl transition-colors border cursor-pointer ${
                  isDark 
                    ? 'text-neutral-300 hover:text-white hover:bg-white/10 border-white/10' 
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-300 shadow-2xs'
                }`}
                title={t.header.editProfile}
              >
                <Settings className="w-4 h-4" />
              </button>

              <button
                id="header-add-project-btn"
                onClick={() => setEditingProject({
                  id: '',
                  number: `${data.projects.length + 1}`,
                  title: '',
                  category: 'logos',
                  client: '',
                  year: new Date().getFullYear().toString(),
                  description: '',
                  tools: ['Illustrator'],
                  features: [],
                  imageUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop&q=80',
                  featured: true
                })}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-gradient-to-r from-pink-600 to-pink-500 hover:brightness-110 text-white rounded-xl text-xs font-semibold shadow-sm shadow-pink-600/30 transition-all active:scale-98 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.header.newProject}</span>
              </button>
            </>
          )}

          {/* Quote Requests Inbox / Dashboard Button */}
          <button
            id="open-quote-manager-header-btn"
            onClick={() => setIsQuoteManagerOpen(true)}
            className={`relative flex items-center gap-1.5 p-1.5 sm:px-2.5 lg:px-3 sm:py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              pendingQuotesCount > 0
                ? 'bg-gradient-to-r from-amber-500/20 to-pink-500/20 border border-amber-500/40 text-amber-300 hover:brightness-110 shadow-xs'
                : isDark
                  ? 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10'
                  : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-300 shadow-2xs'
            }`}
            title={`Bandeja de Cotizaciones (${quoteRequests.length} registradas)`}
            aria-label="Ver bandeja de cotizaciones"
          >
            <Inbox className="w-4 h-4 text-pink-500 shrink-0" />
            <span className="hidden xl:inline">
              {language === 'es' ? 'Cotizaciones' : 'Quotes'}
            </span>
            {quoteRequests.length > 0 && (
              <span className={`px-1.5 py-0.2 text-[10px] font-extrabold rounded-full ${
                pendingQuotesCount > 0
                  ? 'bg-pink-600 text-white animate-pulse'
                  : isDark ? 'bg-white/15 text-white' : 'bg-slate-200 text-slate-800'
              }`}>
                {quoteRequests.length}
              </span>
            )}
          </button>

          {/* Floating/Sticky Client Summary Action Button */}
          <button
            id="open-summary-modal-header-btn"
            onClick={() => setIsSummaryModalOpen(true)}
            className={`relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              totalSelected > 0
                ? 'bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white shadow-md shadow-pink-500/25 hover:brightness-110 active:scale-98'
                : isDark
                  ? 'bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white border border-white/10'
                  : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-300 shadow-2xs'
            }`}
          >
            <FileText className="w-4 h-4 text-pink-500 shrink-0" />
            <span className="whitespace-nowrap hidden sm:inline">
              {totalSelected > 0 ? t.header.viewQuote : t.header.quoteBuilder}
            </span>
            <span className="whitespace-nowrap sm:hidden">
              {totalSelected > 0 ? 'Cotización' : 'Cotizar'}
            </span>
            {totalSelected > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[10px] sm:text-[11px] font-bold bg-white text-neutral-950 rounded-full shadow-xs">
                {totalSelected}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

