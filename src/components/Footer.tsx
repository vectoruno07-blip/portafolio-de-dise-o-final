import React, { useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { PersonalLogo } from './PersonalLogo';
import { SocialIcon, getSocialIconColors } from './SocialIconRenderer';
import { 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  Sparkles, 
  ArrowUp,
  MessageCircle,
  Heart,
  Inbox
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { 
    data, 
    clientSelection, 
    setIsSummaryModalOpen, 
    setIsQuoteManagerOpen,
    quoteRequests,
    isEditMode,
    themeMode,
    t
  } = usePortfolio();

  const isDark = themeMode === 'dark';
  const totalSelected = clientSelection.selectedProjects.length + clientSelection.selectedServices.length;

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile Sticky Floating Summary Action Bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-30 sm:hidden backdrop-blur-xl border-t p-3 shadow-2xl flex items-center justify-between gap-3 ${
        isDark 
          ? 'bg-[#0a0b12]/95 border-white/10 text-white' 
          : 'bg-white/95 border-slate-200 text-slate-900'
      }`}>
        <div className="flex flex-col">
          <span className={`text-[11px] font-medium ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
            {totalSelected === 0 ? t.footer.mobileQuoterTitle : `${totalSelected} ${t.footer.mobileSelectedCount}`}
          </span>
          <span className={`text-xs font-bold truncate max-w-[170px] ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {clientSelection.projectType}
          </span>
        </div>

        <button
          id="mobile-bottom-summary-btn"
          onClick={() => setIsSummaryModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl text-xs font-bold shadow-md shadow-pink-600/30 active:scale-95 transition-all cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>{t.footer.generateSummaryBtn}</span>
        </button>
      </div>

      {/* Main Footer */}
      <footer className={`pt-12 pb-24 sm:pb-12 border-t transition-colors duration-200 ${
        isDark 
          ? 'bg-[#05060a] text-neutral-400 border-white/10' 
          : 'bg-slate-100 text-slate-600 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Main Call to Action Bento Box for Clients */}
          <div className={`backdrop-blur-xl border rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl transition-all ${
            isDark 
              ? 'bg-[#12131c]/90 border-white/10' 
              : 'bg-white border-slate-200 shadow-slate-200/50'
          }`}>
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-500">
                {t.footer.ctaEyebrow}
              </span>
              <h3 className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {t.footer.ctaTitle}
              </h3>
              <p className={`text-xs sm:text-sm max-w-xl ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                {t.footer.ctaDesc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                id="footer-open-quote-manager-btn"
                onClick={() => setIsQuoteManagerOpen(true)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold border transition-all active:scale-95 cursor-pointer ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 text-white border-white/15'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-sm'
                }`}
              >
                <Inbox className="w-4 h-4 text-pink-500" />
                <span>Bandeja de Cotizaciones</span>
                {quoteRequests.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-pink-600 text-white text-xs font-black">
                    {quoteRequests.length}
                  </span>
                )}
              </button>

              <button
                id="footer-open-summary-btn"
                onClick={() => setIsSummaryModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 via-pink-500 to-purple-600 hover:brightness-110 text-white rounded-xl text-sm font-bold shadow-lg shadow-pink-600/30 transition-all active:scale-95 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>{t.footer.generateSummaryBtn}</span>
              </button>
            </div>
          </div>

          {/* Designer Details & Quick Links (Bento columns) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* Column 1: Brand & Bio */}
            <div className={`p-6 rounded-3xl border space-y-3 ${
              isDark ? 'bg-[#0e0f17] border-white/5' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <PersonalLogo size="md" variant="color" />
              <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                {t.footer.bioText}
              </p>
              <p className={`text-[11px] ${isDark ? 'text-neutral-500' : 'text-slate-400'}`}>
                {t.footer.basedOnPdf}
              </p>
            </div>

            {/* Column 2: Contact Info */}
            <div className={`p-6 rounded-3xl border space-y-3 ${
              isDark ? 'bg-[#0e0f17] border-white/5' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {t.footer.directContact}
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-pink-500 shrink-0" />
                  <a href={`mailto:${data.profile.email}`} className={`hover:underline transition-colors ${
                    isDark ? 'text-neutral-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'
                  }`}>
                    {data.profile.email}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                  <a href={`tel:${data.profile.phone}`} className={`hover:underline transition-colors ${
                    isDark ? 'text-neutral-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'
                  }`}>
                    {data.profile.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className={isDark ? 'text-neutral-300' : 'text-slate-700'}>
                    {data.profile.location}
                  </span>
                </li>
                {socialLinksList.map((link) => {
                  const formattedUrl = (link.url.startsWith('http') || link.url.startsWith('mailto:') || link.url.startsWith('tel:'))
                    ? link.url
                    : `https://${link.url}`;
                  return (
                    <li key={link.id} className="flex items-center gap-2.5">
                      <SocialIcon iconName={link.icon} className="w-4 h-4 shrink-0" isDark={isDark} />
                      <a 
                        href={formattedUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`hover:underline transition-colors ${
                          isDark ? 'text-neutral-300 hover:text-white' : 'text-slate-700 hover:text-slate-900'
                        }`}
                      >
                        {link.name || link.url}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 3: Storage & App Info */}
            <div className={`p-6 rounded-3xl border space-y-3 ${
              isDark ? 'bg-[#0e0f17] border-white/5' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {t.footer.storageTitle}
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                {t.footer.storageDesc}
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] ${
            isDark ? 'border-white/5 text-neutral-500' : 'border-slate-200 text-slate-500'
          }`}>
            <div className="flex items-center gap-1">
              <span>© {new Date().getFullYear()} {data.profile.name}. {t.footer.rights}</span>
            </div>

            <button
              onClick={scrollToTop}
              className={`flex items-center gap-1 transition-colors cursor-pointer ${
                isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};
