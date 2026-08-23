import React, { useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Calendar, 
  Wrench, 
  RotateCcw, 
  Check, 
  Sparkles, 
  Layers, 
  SlidersHorizontal,
  X,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdvancedFilterPanel: React.FC = () => {
  const { 
    data, 
    selectedCategory, 
    setSelectedCategory,
    selectedYear, 
    setSelectedYear, 
    selectedTool, 
    setSelectedTool,
    isAdvancedFilterOpen,
    setIsAdvancedFilterOpen,
    resetAdvancedFilters,
    activeAdvancedFiltersCount,
    themeMode,
    t
  } = usePortfolio();

  const isDark = themeMode === 'dark';

  // Extract all unique years sorted descending
  const yearsList = useMemo(() => {
    const yearsSet = new Set<string>();
    data.projects.forEach(p => {
      if (p.year) yearsSet.add(p.year);
    });
    return Array.from(yearsSet).sort((a, b) => b.localeCompare(a));
  }, [data.projects]);

  // Extract all unique tools with project count
  const toolsList = useMemo(() => {
    const toolCountMap = new Map<string, number>();
    data.projects.forEach(p => {
      p.tools?.forEach(tool => {
        const trimmed = tool.trim();
        toolCountMap.set(trimmed, (toolCountMap.get(trimmed) || 0) + 1);
      });
    });
    // Sort by count descending, then alphabetical
    return Array.from(toolCountMap.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ name, count }));
  }, [data.projects]);

  // Helper count for years
  const getYearProjectCount = (year: string) => {
    return data.projects.filter(p => {
      const matchCat = selectedCategory === 'todos' || p.category === selectedCategory;
      const matchTool = selectedTool === 'todos' || p.tools?.some(t => t.toLowerCase() === selectedTool.toLowerCase() || t.toLowerCase().includes(selectedTool.toLowerCase()));
      return matchCat && matchTool && p.year === year;
    }).length;
  };

  // Helper count for tools
  const getToolProjectCount = (toolName: string) => {
    return data.projects.filter(p => {
      const matchCat = selectedCategory === 'todos' || p.category === selectedCategory;
      const matchYear = selectedYear === 'todos' || p.year === selectedYear;
      return matchCat && matchYear && p.tools?.some(t => t.toLowerCase() === toolName.toLowerCase() || t.toLowerCase().includes(toolName.toLowerCase()));
    }).length;
  };

  // Total matching count with current combination
  const matchingProjectsCount = useMemo(() => {
    return data.projects.filter(p => {
      const matchCat = selectedCategory === 'todos' || p.category === selectedCategory;
      const matchYear = selectedYear === 'todos' || p.year === selectedYear;
      const matchTool = selectedTool === 'todos' || p.tools?.some(t => t.toLowerCase() === selectedTool.toLowerCase() || t.toLowerCase().includes(selectedTool.toLowerCase()));
      return matchCat && matchYear && matchTool;
    }).length;
  }, [data.projects, selectedCategory, selectedYear, selectedTool]);

  if (!isAdvancedFilterOpen) {
    return null;
  }

  const isFilterActive = selectedYear !== 'todos' || selectedTool !== 'todos' || selectedCategory !== 'todos';

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`overflow-hidden border-t mt-3 pt-3 transition-colors ${
        isDark ? 'border-white/10' : 'border-slate-200'
      }`}
      id="advanced-filters-panel"
    >
      <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
        isDark 
          ? 'bg-[#0f111a]/95 border-white/10 shadow-xl shadow-black/40' 
          : 'bg-white/95 border-slate-200 shadow-lg shadow-slate-200/50'
      }`}>
        {/* Panel Header & Summary */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-white/5 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-500">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold tracking-tight">
                  {t.advancedFilters.title}
                </h4>
                {activeAdvancedFiltersCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500 text-white shadow-xs">
                    {activeAdvancedFiltersCount} {t.advancedFilters.activeBadge}
                  </span>
                )}
              </div>
              <p className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                {t.advancedFilters.showingResults} <strong className="text-pink-500">{matchingProjectsCount}</strong> {t.advancedFilters.of} {data.projects.length} {t.categories.works}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isFilterActive && (
              <button
                id="clear-all-advanced-filters-btn"
                onClick={() => {
                  resetAdvancedFilters();
                  setSelectedCategory('todos');
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border-white/10'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-200'
                }`}
                title={t.advancedFilters.clearAll}
              >
                <RotateCcw className="w-3 h-3 text-pink-500" />
                <span>{t.advancedFilters.clearAll}</span>
              </button>
            )}

            <button
              id="close-advanced-filters-panel-btn"
              onClick={() => setIsAdvancedFilterOpen(false)}
              className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
                isDark ? 'text-neutral-400 hover:text-white hover:bg-white/10' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
              title={t.advancedFilters.hideButtonText}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filters Grid: Year & Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Section 1: Filter by Year */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-pink-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.advancedFilters.byYear}</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {/* All Years Pill */}
              <button
                id="filter-year-todos"
                onClick={() => setSelectedYear('todos')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                  selectedYear === 'todos'
                    ? 'bg-pink-600 text-white border-pink-500 shadow-sm shadow-pink-600/30 font-semibold'
                    : isDark
                      ? 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {selectedYear === 'todos' && <Check className="w-3 h-3" />}
                <span>{t.advancedFilters.allYears}</span>
              </button>

              {/* Specific Year Pills */}
              {yearsList.map(year => {
                const isSelected = selectedYear === year;
                const count = getYearProjectCount(year);
                return (
                  <button
                    key={year}
                    id={`filter-year-${year}`}
                    onClick={() => setSelectedYear(isSelected ? 'todos' : year)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-pink-600 text-white border-pink-500 shadow-sm shadow-pink-600/30 font-semibold'
                        : isDark
                          ? 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{year}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      isSelected
                        ? 'bg-pink-900/60 text-white'
                        : isDark
                          ? 'bg-white/10 text-neutral-400'
                          : 'bg-slate-200 text-slate-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Filter by Tools & Software */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-400">
              <Wrench className="w-3.5 h-3.5" />
              <span>{t.advancedFilters.byTool}</span>
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
              {/* All Tools Pill */}
              <button
                id="filter-tool-todos"
                onClick={() => setSelectedTool('todos')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                  selectedTool === 'todos'
                    ? 'bg-purple-600 text-white border-purple-500 shadow-sm shadow-purple-600/30 font-semibold'
                    : isDark
                      ? 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {selectedTool === 'todos' && <Check className="w-3 h-3" />}
                <span>{t.advancedFilters.allTools}</span>
              </button>

              {/* Specific Tools */}
              {toolsList.map(({ name }) => {
                const isSelected = selectedTool.toLowerCase() === name.toLowerCase();
                const count = getToolProjectCount(name);
                return (
                  <button
                    key={name}
                    id={`filter-tool-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => setSelectedTool(isSelected ? 'todos' : name)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-500 shadow-sm shadow-purple-600/30 font-semibold'
                        : isDark
                          ? 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                      isSelected
                        ? 'bg-purple-900/60 text-white'
                        : isDark
                          ? 'bg-white/10 text-neutral-400'
                          : 'bg-slate-200 text-slate-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Presets Section */}
        <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2.5 text-[11px]">
          <div className="flex items-center gap-1.5 text-neutral-400">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="font-semibold">{t.advancedFilters.quickPresets}</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => {
                setSelectedYear('2023');
                setSelectedTool('todos');
              }}
              className={`px-2.5 py-0.5 rounded-lg border transition-all cursor-pointer ${
                selectedYear === '2023'
                  ? 'bg-pink-500/20 text-pink-400 border-pink-500/40 font-bold'
                  : isDark
                    ? 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
              }`}
            >
              {t.advancedFilters.presetRecent}
            </button>

            <button
              onClick={() => {
                setSelectedTool('Illustrator');
              }}
              className={`px-2.5 py-0.5 rounded-lg border transition-all cursor-pointer ${
                selectedTool.toLowerCase() === 'illustrator'
                  ? 'bg-purple-500/20 text-purple-400 border-purple-500/40 font-bold'
                  : isDark
                    ? 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
              }`}
            >
              {t.advancedFilters.presetIllustrator}
            </button>

            <button
              onClick={() => {
                setSelectedTool('Photoshop');
              }}
              className={`px-2.5 py-0.5 rounded-lg border transition-all cursor-pointer ${
                selectedTool.toLowerCase() === 'photoshop'
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/40 font-bold'
                  : isDark
                    ? 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
              }`}
            >
              {t.advancedFilters.presetPhotoshop}
            </button>

            <button
              onClick={() => {
                setSelectedTool('InDesign');
              }}
              className={`px-2.5 py-0.5 rounded-lg border transition-all cursor-pointer ${
                selectedTool.toLowerCase() === 'indesign'
                  ? 'bg-purple-500/20 text-purple-400 border-purple-500/40 font-bold'
                  : isDark
                    ? 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
              }`}
            >
              {t.advancedFilters.presetInDesign}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
