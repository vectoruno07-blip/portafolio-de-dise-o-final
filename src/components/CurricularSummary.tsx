import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PersonalLogo } from './PersonalLogo';
import { SkillCharts } from './SkillCharts';
import { SocialIcon, getSocialIconColors } from './SocialIconRenderer';
import { 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  Sparkles, 
  Edit3,
  Layers,
  Palette,
  FileText,
  Radar,
  Plus
} from 'lucide-react';

export const CurricularSummary: React.FC = () => {
  const { data, isEditMode, setIsProfileModalOpen, setIsSummaryModalOpen, themeMode, t, getButtonClass } = usePortfolio();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const isDark = themeMode === 'dark';

  const socialLinksList = useMemo(() => {
    if (data.profile.socialLinks && data.profile.socialLinks.length > 0) {
      return data.profile.socialLinks;
    }
    const list = [];
    if (data.profile.instagramUrl) list.push({ id: 'legacy-ig', name: 'Instagram', url: data.profile.instagramUrl, icon: 'instagram' });
    if (data.profile.linkedinUrl) list.push({ id: 'legacy-li', name: 'LinkedIn', url: data.profile.linkedinUrl, icon: 'linkedin' });
    if (data.profile.behanceUrl) list.push({ id: 'legacy-be', name: 'Behance', url: data.profile.behanceUrl, icon: 'behance' });
    if (data.profile.dribbbleUrl) list.push({ id: 'legacy-dr', name: 'Dribbble', url: data.profile.dribbbleUrl, icon: 'dribbble' });
    if (data.profile.githubUrl) list.push({ id: 'legacy-gh', name: 'GitHub', url: data.profile.githubUrl, icon: 'github' });
    return list;
  }, [data.profile]);

  const stats = [
    {
      value: data.profile.experienceValue || '20+ Años',
      label: data.profile.experienceLabel || 'Trayectoria Profesional',
      colorClass: isDark ? 'text-amber-400' : 'text-amber-600'
    },
    {
      value: data.profile.teachingValue || '17 Años',
      label: data.profile.teachingLabel || 'Docencia Universitaria',
      colorClass: isDark ? 'text-pink-400' : 'text-pink-600'
    },
    {
      value: data.profile.areasValue || '8 Áreas',
      label: data.profile.areasLabel || 'Especialidades Gráficas',
      colorClass: isDark ? 'text-blue-400' : 'text-blue-600'
    },
    ...(data.profile.showInteractiveBadge !== false ? [{
      value: data.profile.interactiveValue || '100% Editable',
      label: data.profile.interactiveLabel || 'Diseño Personalizable',
      colorClass: isDark ? 'text-emerald-400' : 'text-emerald-600'
    }] : [])
  ];

  return (
    <div className={`pt-8 pb-10 px-3 sm:px-6 lg:px-8 border-b relative w-full max-w-full overflow-x-hidden overflow-hidden transition-colors duration-200 ${
      isDark
        ? 'border-white/10 bg-gradient-to-b from-[#090a10] via-[#0b0c14] to-[#07080c]'
        : 'border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-100/70'
    }`}>
      {/* Subtle geometric ambient glow lights */}
      <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none -mt-20 ${
        isDark ? 'bg-pink-600/10' : 'bg-pink-300/20'
      }`}></div>
      <div className={`absolute bottom-0 left-10 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
        isDark ? 'bg-blue-600/10' : 'bg-indigo-300/15'
      }`}></div>
      
      {/* Top golden-pink neon accent line from PDF design motif */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-pink-500 to-blue-500"></div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">
        
        {/* Bento Hero Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Main Bento Info Card (Cols 1-8) */}
          <div className={`lg:col-span-8 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border shadow-2xl flex flex-col justify-between space-y-6 transition-all ${
            isDark 
              ? 'bg-[#12131c]/90 border-white/10' 
              : 'bg-white/95 border-slate-200 shadow-slate-200/60'
          }`}>
            <div className="space-y-4">
              <div className={`inline-flex items-center gap-2 px-3 py-1 backdrop-blur-md rounded-full border text-xs font-semibold tracking-wide ${
                isDark 
                  ? 'bg-white/5 border-white/10 text-amber-300 shadow-inner' 
                  : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.hero.interactiveBadge}</span>
              </div>

              <div className="space-y-1.5">
                <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight font-sans ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {data.profile.name}
                </h1>
                <p className={`text-base sm:text-xl font-medium ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>
                  {data.profile.title} &bull; <span className={isDark ? 'text-neutral-300' : 'text-slate-600'}>{data.profile.subTitle}</span>
                </p>
              </div>

              <p className={`text-sm sm:text-base max-w-3xl leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                {data.profile.bio}
              </p>
            </div>

            {/* Bento Quick Stat Tiles (Dynamic grid: 2 cols on mobile, 4 cols on tablet and desktop) */}
            <div className={`grid grid-cols-2 ${stats.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-2.5 sm:gap-3 pt-2`}>
              {stats.map((stat, idx) => (
                <div key={idx} className={`border rounded-2xl p-3 sm:p-3.5 text-center sm:text-left transition-all min-w-0 ${
                  isDark 
                    ? 'bg-white/5 border-white/10 hover:bg-white/10' 
                    : 'bg-slate-50/80 border-slate-200 hover:bg-slate-100'
                }`}>
                  <p className={`text-lg sm:text-xl lg:text-2xl font-black tracking-tight truncate ${stat.colorClass}`}>{stat.value}</p>
                  <p className={`text-[10px] sm:text-[11px] leading-tight mt-0.5 truncate ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-open-quote-btn"
                onClick={() => setIsSummaryModalOpen(true)}
                className={`flex items-center gap-2 px-5 py-2.5 hover:brightness-110 rounded-xl text-xs sm:text-sm font-bold shadow-lg active:scale-98 transition-all cursor-pointer ${getButtonClass()}`}
              >
                <FileText className="w-4 h-4" />
                <span>{t.hero.ctaQuote}</span>
              </button>

              <button
                id="toggle-skill-charts-btn"
                onClick={() => setShowCharts(!showCharts)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all active:scale-98 cursor-pointer ${
                  showCharts
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white border-transparent shadow-md shadow-pink-600/30'
                    : isDark
                      ? 'bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white border-white/10'
                      : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-300 shadow-2xs'
                }`}
              >
                <Radar className={`w-4 h-4 ${showCharts ? 'text-white' : 'text-pink-500'}`} />
                <span>{showCharts ? t.hero.hideSkillChartsBtn : t.hero.skillChartsBtn}</span>
              </button>

              <button
                id="toggle-curricular-accordion-btn"
                onClick={() => setIsExpanded(!isExpanded)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all active:scale-98 cursor-pointer ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white border-white/10'
                    : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-300 shadow-2xs'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-amber-500" />
                <span>{isExpanded ? t.hero.hideResume : t.hero.showResume}</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {isEditMode && (
                <button
                  id="hero-edit-profile-btn"
                  onClick={() => setIsProfileModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-amber-400/20 transition-all active:scale-98 cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>{t.hero.editProfileBtn}</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Bento Emblem & Contact Card (Cols 9-12) */}
          <div className={`lg:col-span-4 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border shadow-2xl flex flex-col items-center justify-between text-center space-y-6 transition-all ${
            isDark 
              ? 'bg-[#12131c]/90 border-white/10' 
              : 'bg-white/95 border-slate-200 shadow-slate-200/60'
          }`}>
            <div className="flex flex-col items-center justify-center space-y-4 pt-2 w-full">
              <PersonalLogo size="xl" variant="color" showText={true} isCover={true} />
            </div>

            <div className={`w-full space-y-3 border p-4 rounded-2xl ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              {/* Correo Electrónico */}
              <div className={`flex items-center justify-center gap-2 ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                <Mail className="w-4 h-4 shrink-0" />
                <a href={`mailto:${data.profile.email}`} className={`hover:underline text-xs truncate max-w-[200px] ${
                  isDark ? 'text-neutral-200' : 'text-slate-700 font-medium'
                }`}>
                  {data.profile.email}
                </a>
              </div>

              {/* Teléfono / WhatsApp */}
              <div className={`flex items-center justify-center gap-2 ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>
                <Phone className="w-4 h-4 shrink-0" />
                <span className={`text-xs ${isDark ? 'text-neutral-200' : 'text-slate-700 font-medium'}`}>{data.profile.phone}</span>
              </div>

              {/* Redes Sociales con idéntica estética, tipografía y color de iconos */}
              {socialLinksList.map((link) => {
                const formattedUrl = (link.url.startsWith('http') || link.url.startsWith('mailto:') || link.url.startsWith('tel:'))
                  ? link.url
                  : `https://${link.url}`;
                
                return (
                  <div 
                    key={link.id} 
                    className={`flex items-center justify-center gap-2 ${getSocialIconColors(link.icon, isDark)}`}
                  >
                    <SocialIcon iconName={link.icon} className="w-4 h-4 shrink-0" isDark={isDark} />
                    <a 
                      href={formattedUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`hover:underline text-xs truncate max-w-[200px] ${
                        isDark ? 'text-neutral-200' : 'text-slate-700 font-medium'
                      }`}
                    >
                      {link.name || link.url}
                    </a>
                  </div>
                );
              })}

              {/* Botón rápido en Modo Edición para agregar o editar redes sociales */}
              {isEditMode && (
                <div className="pt-1">
                  <button
                    onClick={() => setIsProfileModalOpen(true)}
                    className={`w-full py-1.5 px-3 rounded-xl border text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isDark
                        ? 'bg-pink-500/10 hover:bg-pink-500/20 border-pink-500/30 text-pink-300'
                        : 'bg-pink-50 hover:bg-pink-100 border-pink-200 text-pink-700'
                    }`}
                    title="Administrar o Agregar Redes Sociales"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Administrar Redes Sociales</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Collapsible Bento Resume Modules (From PDF Page 2) */}
        {isExpanded && (
          <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-5 animate-fadeIn">
            {/* Academic & Teaching Background Bento Tile */}
            <div className={`backdrop-blur-xl p-5 sm:p-6 rounded-3xl border space-y-4 shadow-xl ${
              isDark 
                ? 'bg-[#12131c]/90 border-white/10' 
                : 'bg-white border-slate-200 shadow-slate-200/50'
            }`}>
              <div className="flex items-center gap-2.5 text-amber-500">
                <div className={`p-2 rounded-xl border ${
                  isDark ? 'bg-amber-400/10 border-amber-400/20' : 'bg-amber-50 border-amber-200'
                }`}>
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {t.hero.academicTitle}
                </h3>
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                {data.profile.teachingExperience}
              </p>
              <div className="pt-2">
                <p className={`text-xs font-semibold mb-2 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>{t.hero.modulesTitle}</p>
                <div className="flex flex-wrap gap-1.5">
                  {t.hero.modulesList.map((m: string, i: number) => (
                    <span key={i} className={`text-[11px] px-3 py-1 border rounded-xl ${
                      isDark 
                        ? 'bg-white/5 border-white/10 text-neutral-200' 
                        : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills & Software Mastery Bento Tile */}
            <div className={`backdrop-blur-xl p-5 sm:p-6 rounded-3xl border space-y-4 shadow-xl ${
              isDark 
                ? 'bg-[#12131c]/90 border-white/10' 
                : 'bg-white border-slate-200 shadow-slate-200/50'
            }`}>
              <div className="flex items-center gap-2.5 text-pink-500">
                <div className={`p-2 rounded-xl border ${
                  isDark ? 'bg-pink-500/10 border-pink-500/20' : 'bg-pink-50 border-pink-200'
                }`}>
                  <Palette className="w-5 h-5" />
                </div>
                <h3 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {t.hero.skillsTitle}
                </h3>
              </div>
              <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                {data.profile.skills.map((skill, idx) => (
                  <li key={idx} className={`flex items-center gap-2 border p-2 rounded-xl ${
                    isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <p className={`text-xs font-semibold mb-2 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>{t.hero.toolsTitle}</p>
                <div className="flex flex-wrap gap-1.5">
                  {data.profile.tools.map((tool, idx) => (
                    <span key={idx} className={`text-[11px] px-3 py-1 border rounded-xl font-medium ${
                      isDark 
                        ? 'bg-pink-950/40 text-pink-300 border-pink-500/30' 
                        : 'bg-pink-50 text-pink-700 border-pink-200'
                    }`}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skill Charts & Competency Graphs Section */}
        {showCharts && (
          <div className="pt-2 animate-fadeIn" id="skill-charts-section">
            <SkillCharts />
          </div>
        )}
      </div>
    </div>
  );
};
