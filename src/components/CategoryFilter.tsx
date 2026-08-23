import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { AdvancedFilterPanel } from './AdvancedFilterPanel';
import { getCategoryIconComponent } from './CategoryManagerModal';
import { 
  Grid,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react';
import { AnimatePresence } from 'motion/react';

export const CategoryFilter: React.FC = () => {
  const { 
    data, 
    selectedCategory, 
    setSelectedCategory, 
    isAdvancedFilterOpen,
    toggleAdvancedFilter,
    activeAdvancedFiltersCount,
    selectedYear,
    selectedTool,
    themeMode, 
    t 
  } = usePortfolio();
  
  const isDark = themeMode === 'dark';

  const getCategoryCount = (categoryId: string) => {
    return data.projects.filter(p => {
      const matchCat = categoryId === 'todos' || p.category === categoryId;
      const matchYear = selectedYear === 'todos' || p.year === selectedYear;
      const matchTool = selectedTool === 'todos' || p.tools?.some(t => t.toLowerCase() === selectedTool.toLowerCase() || t.toLowerCase().includes(selectedTool.toLowerCase()));
      return matchCat && matchYear && matchTool;
    }).length;
  };

  return (
    <div className={`w-full max-w-full overflow-hidden backdrop-blur-xl border-b py-2.5 sm:py-3 px-3 sm:px-6 sticky top-[68px] sm:top-[78px] z-30 shadow-sm transition-colors duration-200 ${
      isDark 
        ? 'bg-[#08090f]/90 border-white/10 shadow-black/20' 
        : 'bg-white/90 border-slate-200 shadow-slate-200/50'
    }`}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          {/* Scrollable Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth flex-1 py-0.5 max-w-full">
            {/* "Todos" Chip */}
            <button
              id="filter-category-todos"
              onClick={() => setSelectedCategory('todos')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                selectedCategory === 'todos'
                  ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-md shadow-pink-600/30 scale-102'
                  : isDark
                    ? 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>{t.categories.all}</span>
              <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                selectedCategory === 'todos' 
                  ? 'bg-pink-900/60 text-white' 
                  : isDark 
                    ? 'bg-white/10 text-neutral-400' 
                    : 'bg-slate-200 text-slate-600'
              }`}>
                {getCategoryCount('todos')}
              </span>
            </button>

            {/* Dynamic Categories */}
            {data.categories.map((cat) => {
              const IconComp = getCategoryIconComponent(cat.iconName);
              const isSelected = selectedCategory === cat.id;
              const count = getCategoryCount(cat.id);
              const categoryTrans = (t.categories.items as Record<string, { shortName: string; name: string }>)[cat.id];
              const displayName = categoryTrans ? categoryTrans.shortName : cat.shortName;

              return (
                <button
                  key={cat.id}
                  id={`filter-category-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white font-semibold shadow-md shadow-pink-600/30 scale-102'
                      : isDark
                        ? 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{cat.number}. {displayName}</span>
                  <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
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

          {/* Advanced Filters Toggle Button */}
          <button
            id="toggle-advanced-filters-btn"
            onClick={toggleAdvancedFilter}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer border ${
              isAdvancedFilterOpen || activeAdvancedFiltersCount > 0
                ? 'bg-gradient-to-r from-pink-600/20 to-purple-600/20 text-pink-400 border-pink-500/50 shadow-sm shadow-pink-500/10'
                : isDark
                  ? 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border-white/10'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-200'
            }`}
            title={t.advancedFilters.buttonText}
          >
            <SlidersHorizontal className={`w-3.5 h-3.5 ${activeAdvancedFiltersCount > 0 ? 'text-pink-500 animate-pulse' : ''}`} />
            <span className="hidden sm:inline">{t.advancedFilters.buttonText}</span>
            <span className="sm:hidden">{t.advancedFilters.title}</span>

            {activeAdvancedFiltersCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-pink-500 text-white">
                {activeAdvancedFiltersCount}
              </span>
            )}

            {isAdvancedFilterOpen ? (
              <ChevronUp className="w-3.5 h-3.5 text-neutral-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
            )}
          </button>
        </div>

        {/* Collapsible Advanced Filters Dropdown */}
        <AnimatePresence>
          {isAdvancedFilterOpen && <AdvancedFilterPanel />}
        </AnimatePresence>
      </div>
    </div>
  );
};
