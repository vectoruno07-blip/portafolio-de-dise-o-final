import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ProfileInfo, SocialLink } from '../types';
import { 
  SocialIcon, 
  SOCIAL_ICON_OPTIONS, 
  getSocialIconColors,
  detectSocialIconFromUrl,
  detectSocialNameFromUrl
} from './SocialIconRenderer';
import { 
  X, 
  Save, 
  Download, 
  Upload, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  CheckCircle2, 
  FileJson,
  Image as ImageIcon,
  Palette,
  Sparkles,
  Trash2,
  Plus,
  ArrowUp,
  ArrowDown,
  Edit2,
  Check,
  Link2,
  ExternalLink,
  Globe
} from 'lucide-react';

export const EditProfileModal: React.FC = () => {
  const { 
    data, 
    updateProfile, 
    exportJSON, 
    importJSON,
    isProfileModalOpen, 
    setIsProfileModalOpen,
    themeMode,
    setButtonColor 
  } = usePortfolio();

  const isDark = themeMode === 'dark';
  const [formData, setFormData] = useState<ProfileInfo>({ ...data.profile });
  const [skillsInput, setSkillsInput] = useState('');
  const [toolsInput, setToolsInput] = useState('');
  const [buttonColorSelection, setButtonColorSelection] = useState(data.buttonColor || 'magenta');

  // Social Links management state
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isAddingSocial, setIsAddingSocial] = useState(false);
  const [editingSocialId, setEditingSocialId] = useState<string | null>(null);
  const [newSocialName, setNewSocialName] = useState('');
  const [newSocialUrl, setNewSocialUrl] = useState('');
  const [newSocialIcon, setNewSocialIcon] = useState('instagram');

  useEffect(() => {
    if (isProfileModalOpen) {
      setFormData({ 
        ...data.profile,
        customLogoUrl: data.profile.customLogoUrl || '',
        experienceValue: data.profile.experienceValue || '20+ Años',
        experienceLabel: data.profile.experienceLabel || 'Trayectoria Profesional',
        teachingValue: data.profile.teachingValue || '17 Años',
        teachingLabel: data.profile.teachingLabel || 'Docencia Universitaria',
        areasValue: data.profile.areasValue || '8 Áreas',
        areasLabel: data.profile.areasLabel || 'Especialidades Gráficas',
        interactiveValue: data.profile.interactiveValue || '100% Editable',
        interactiveLabel: data.profile.interactiveLabel || 'Diseño Personalizable',
        showInteractiveBadge: data.profile.showInteractiveBadge ?? true,
        showLogoText: data.profile.showLogoText ?? true,
        logoFontFamily: data.profile.logoFontFamily || 'GatsbyFLF',
        logoLine1: data.profile.logoLine1 !== undefined ? data.profile.logoLine1 : 'ESTUDIO DE',
        logoLine2: data.profile.logoLine2 !== undefined ? data.profile.logoLine2 : 'DISEÑO',
        coverCustomLogoUrl: data.profile.coverCustomLogoUrl || '',
        coverShowLogoText: data.profile.coverShowLogoText ?? true,
        coverLogoLine1: data.profile.coverLogoLine1 !== undefined ? data.profile.coverLogoLine1 : 'ESTUDIO DE',
        coverLogoLine2: data.profile.coverLogoLine2 !== undefined ? data.profile.coverLogoLine2 : 'DISEÑO',
        coverLogoFontFamily: data.profile.coverLogoFontFamily || 'GatsbyFLF',
        experienceBadgeText: data.profile.experienceBadgeText || '+20 años exp.',
        portfolioSectionTitle: data.profile.portfolioSectionTitle || 'Trabajos Emblemáticos & Portafolio',
        portfolioSectionSubtitle: data.profile.portfolioSectionSubtitle || '',
        instagramUrl: data.profile.instagramUrl || '',
        linkedinUrl: data.profile.linkedinUrl || '',
        behanceUrl: data.profile.behanceUrl || '',
        dribbbleUrl: data.profile.dribbbleUrl || '',
        githubUrl: data.profile.githubUrl || ''
      });

      // Populate initial socialLinks
      if (data.profile.socialLinks && data.profile.socialLinks.length > 0) {
        setSocialLinks([...data.profile.socialLinks]);
      } else {
        const initialLinks: SocialLink[] = [];
        if (data.profile.instagramUrl) initialLinks.push({ id: '1', name: 'Instagram', url: data.profile.instagramUrl, icon: 'instagram' });
        if (data.profile.linkedinUrl) initialLinks.push({ id: '2', name: 'LinkedIn', url: data.profile.linkedinUrl, icon: 'linkedin' });
        if (data.profile.behanceUrl) initialLinks.push({ id: '3', name: 'Behance', url: data.profile.behanceUrl, icon: 'behance' });
        if (data.profile.dribbbleUrl) initialLinks.push({ id: '4', name: 'Dribbble', url: data.profile.dribbbleUrl, icon: 'dribbble' });
        if (data.profile.githubUrl) initialLinks.push({ id: '5', name: 'GitHub', url: data.profile.githubUrl, icon: 'github' });
        setSocialLinks(initialLinks);
      }

      setSkillsInput((data.profile.skills || []).join('\n'));
      setToolsInput((data.profile.tools || []).join(', '));
      setButtonColorSelection(data.buttonColor || 'magenta');
      setIsAddingSocial(false);
      setEditingSocialId(null);
    }
  }, [isProfileModalOpen]);

  if (!isProfileModalOpen) return null;

  // Social link helpers
  const handleOpenAddSocial = () => {
    setEditingSocialId(null);
    setNewSocialName('');
    setNewSocialUrl('https://');
    setNewSocialIcon('instagram');
    setIsAddingSocial(true);
  };

  const handleSelectPreset = (preset: typeof SOCIAL_ICON_OPTIONS[0]) => {
    setNewSocialName(preset.defaultLabel);
    setNewSocialIcon(preset.id);
    if (!newSocialUrl || newSocialUrl === 'https://' || newSocialUrl.trim() === '') {
      setNewSocialUrl(preset.defaultUrl);
    }
  };

  const handleEditSocial = (link: SocialLink) => {
    setEditingSocialId(link.id);
    setNewSocialName(link.name);
    setNewSocialUrl(link.url);
    setNewSocialIcon(link.icon || 'link');
    setIsAddingSocial(true);
  };

  const handleDirectUrlChange = (networkId: string, name: string, url: string) => {
    setFormData(prev => ({
      ...prev,
      [`${networkId}Url`]: url
    }));

    setSocialLinks(prev => {
      const existingIndex = prev.findIndex(s => s.icon === networkId || s.id === networkId || s.name.toLowerCase() === name.toLowerCase());
      if (url.trim() === '') {
        // If empty and was in list, remove or keep? Let's remove if empty
        if (existingIndex >= 0) {
          return prev.filter((_, idx) => idx !== existingIndex);
        }
        return prev;
      }

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          name: updated[existingIndex].name || name,
          url: url.trim(),
          icon: networkId
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: networkId,
            name: name,
            url: url.trim(),
            icon: networkId
          }
        ];
      }
    });
  };

  const handleUrlInputChange = (url: string) => {
    setNewSocialUrl(url);
    if (url.trim().length > 4) {
      const detectedIcon = detectSocialIconFromUrl(url);
      if (detectedIcon !== 'link') {
        setNewSocialIcon(detectedIcon);
        if (!newSocialName || newSocialName === 'Red Social' || newSocialName === 'Enlace' || newSocialName === 'https://') {
          setNewSocialName(detectSocialNameFromUrl(url));
        }
      }
    }
  };

  const handleSaveSocial = () => {
    if (!newSocialName.trim() && !newSocialUrl.trim()) return;

    if (editingSocialId) {
      setSocialLinks(prev => prev.map(item => {
        if (item.id === editingSocialId) {
          return {
            ...item,
            name: newSocialName.trim() || 'Enlace',
            url: newSocialUrl.trim(),
            icon: newSocialIcon
          };
        }
        return item;
      }));
    } else {
      const newEntry: SocialLink = {
        id: Date.now().toString(),
        name: newSocialName.trim() || 'Red Social',
        url: newSocialUrl.trim(),
        icon: newSocialIcon
      };
      setSocialLinks(prev => [...prev, newEntry]);
    }

    setIsAddingSocial(false);
    setEditingSocialId(null);
    setNewSocialName('');
    setNewSocialUrl('');
  };

  const handleDeleteSocial = (id: string) => {
    setSocialLinks(prev => prev.filter(item => item.id !== id));
    if (editingSocialId === id) {
      setIsAddingSocial(false);
      setEditingSocialId(null);
    }
  };

  const handleMoveSocial = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= socialLinks.length) return;
    const updated = [...socialLinks];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setSocialLinks(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedSkills = skillsInput
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const processedTools = toolsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    updateProfile({
      ...formData,
      socialLinks: socialLinks,
      instagramUrl: socialLinks.find(s => s.icon === 'instagram' || s.name.toLowerCase().includes('instagram'))?.url || '',
      linkedinUrl: socialLinks.find(s => s.icon === 'linkedin' || s.name.toLowerCase().includes('linkedin'))?.url || '',
      behanceUrl: socialLinks.find(s => s.icon === 'behance' || s.name.toLowerCase().includes('behance'))?.url || '',
      dribbbleUrl: socialLinks.find(s => s.icon === 'dribbble' || s.name.toLowerCase().includes('dribbble'))?.url || '',
      githubUrl: socialLinks.find(s => s.icon === 'github' || s.name.toLowerCase().includes('github'))?.url || '',
      skills: processedSkills,
      tools: processedTools
    }, buttonColorSelection);

    setIsProfileModalOpen(false);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setFormData(prev => ({ ...prev, customLogoUrl: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setFormData(prev => ({ ...prev, coverCustomLogoUrl: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          const ok = importJSON(content);
          if (ok) {
            alert('¡Portafolio importado correctamente!');
            setIsProfileModalOpen(false);
          } else {
            alert('El archivo JSON no tiene un formato válido.');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className={`relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border my-auto flex flex-col max-h-[92vh] transition-colors ${
          isDark 
            ? 'bg-[#101119] text-white border-white/10' 
            : 'bg-white text-slate-900 border-slate-200 shadow-slate-900/20'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${
          isDark ? 'border-white/10 bg-[#090a0f]' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl border ${
              isDark ? 'bg-amber-400/10 border-amber-400/20 text-amber-400' : 'bg-amber-50 border-amber-200 text-amber-700'
            }`}>
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Personalización Integral del Portafolio
              </h2>
              <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                Edita datos, logotipo personalizado (SVG/PNG), recuadros de resumen y colores de botones
              </p>
            </div>
          </div>
          <button
            id="close-edit-profile-modal"
            onClick={() => setIsProfileModalOpen(false)}
            className={`p-1.5 rounded-full transition-colors ${
              isDark ? 'text-neutral-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1">
          
          {/* Section 0: Encabezado y Barra Superior */}
          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
            <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
              <User className="w-4 h-4" />
              <span>Información de Encabezado (Nombre, Título & Experiencia)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>Nombre Completo</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-1.5 text-xs border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none ${
                    isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>Título Profesional</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-3 py-1.5 text-xs border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none ${
                    isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>Texto de Experiencia (Ej: +25 años exp.)</label>
                <input
                  type="text"
                  value={formData.experienceBadgeText || ''}
                  onChange={(e) => setFormData({ ...formData, experienceBadgeText: e.target.value })}
                  placeholder="+25 años exp."
                  className={`w-full px-3 py-1.5 text-xs border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none ${
                    isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/10">
              <div>
                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                  Título de la Sección de Proyectos (Ej: "Portafolio" o "Trabajos Emblemáticos & Portafolio")
                </label>
                <input
                  type="text"
                  value={formData.portfolioSectionTitle || ''}
                  onChange={(e) => setFormData({ ...formData, portfolioSectionTitle: e.target.value })}
                  placeholder="Ej: Portafolio / Trabajos Emblemáticos"
                  className={`w-full px-3 py-1.5 text-xs border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none ${
                    isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
                <p className={`text-[10px] mt-1 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  Puedes cambiar el texto predeterminado por "Portafolio", "Galería de Trabajos" o el que prefieras.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Logo Personalizado */}
          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
            <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>
              <ImageIcon className="w-4 h-4" />
              <span>Logotipo Personalizado (SVG o PNG transparente)</span>
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className={`w-20 h-20 rounded-xl border flex items-center justify-center overflow-hidden shrink-0 ${
                isDark ? 'bg-[#090a0f] border-white/10' : 'bg-white border-slate-300 shadow-xs'
              }`}>
                {formData.customLogoUrl ? (
                  <img src={formData.customLogoUrl} alt="Logo preview" className="w-full h-full object-contain p-1" />
                ) : (
                  <div className="text-center p-2">
                    <span className="text-[10px] font-semibold opacity-70">Vector Original</span>
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2 w-full">
                <div className="flex flex-wrap gap-2">
                  <label className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border cursor-pointer transition-colors ${
                    isDark ? 'bg-pink-600/20 border-pink-500/30 text-pink-300 hover:bg-pink-600/30' : 'bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-100'
                  }`}>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Cargar Logo (SVG / PNG)</span>
                    <input type="file" accept=".svg, .png, .jpg, .jpeg" onChange={handleLogoUpload} className="hidden" />
                  </label>
                  {formData.customLogoUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, customLogoUrl: '' })}
                      className="flex items-center gap-1 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-semibold border border-red-500/30"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Restaurar Logo Vectorial</span>
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="O pega URL directa de imagen SVG / PNG sin fondo..."
                  value={formData.customLogoUrl}
                  onChange={(e) => setFormData({ ...formData, customLogoUrl: e.target.value })}
                  className={`w-full px-3 py-1.5 text-xs border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                    isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Logo Typography & Text Toggle */}
            <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.showLogoText !== false}
                    onChange={(e) => setFormData({ ...formData, showLogoText: e.target.checked })}
                    className="rounded border-slate-400 text-pink-600 focus:ring-pink-500 w-4 h-4"
                  />
                  <span className={`text-xs font-semibold ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                    Mostrar texto / subtítulo de estudio debajo del isotipo
                  </span>
                </label>

                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>Tipografía Logo:</span>
                  <select
                    value={formData.logoFontFamily || 'GatsbyFLF'}
                    onChange={(e) => setFormData({ ...formData, logoFontFamily: e.target.value })}
                    className={`px-3 py-1.5 text-xs border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                      isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="GatsbyFLF">GatsbyFLF (Elegante Clásica)</option>
                    <option value="Cinzel">Cinzel Decorative (Alta Gama)</option>
                    <option value="Cormorant">Cormorant Garamond (Editorial Serif)</option>
                    <option value="Playfair">Playfair Display (Moderna Sofisticada)</option>
                    <option value="Sans">Montserrat / Sans (Minimalista)</option>
                  </select>
                </div>
              </div>

              {/* Logo text lines edit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>Texto Línea 1 (Arriba)</label>
                  <input
                    type="text"
                    value={formData.logoLine1 || ''}
                    onChange={(e) => setFormData({ ...formData, logoLine1: e.target.value })}
                    placeholder="Ej. ESTUDIO DE"
                    className={`w-full px-3 py-1.5 text-xs border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                      isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>Texto Línea 2 (Abajo)</label>
                  <input
                    type="text"
                    value={formData.logoLine2 || ''}
                    onChange={(e) => setFormData({ ...formData, logoLine2: e.target.value })}
                    placeholder="Ej. DISEÑO"
                    className={`w-full px-3 py-1.5 text-xs border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                      isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Personalización de Colores de Botones */}
          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
            <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
              <Palette className="w-4 h-4" />
              <span>Color de Botones y Acentos Principales</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-3">
              {[
                { id: 'magenta', name: 'Fucsia / Magenta', class: 'bg-gradient-to-r from-pink-600 to-purple-600' },
                { id: 'blue', name: 'Azul & Cian', class: 'bg-gradient-to-r from-blue-600 to-cyan-600' },
                { id: 'amber', name: 'Ámbar Dorado', class: 'bg-gradient-to-r from-amber-500 to-orange-500' },
                { id: 'emerald', name: 'Esmeralda', class: 'bg-gradient-to-r from-emerald-600 to-teal-600' },
                { id: 'violet', name: 'Violeta Púrpura', class: 'bg-gradient-to-r from-violet-600 to-indigo-600' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setButtonColorSelection(item.id)}
                  className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    buttonColorSelection === item.id 
                      ? (isDark ? 'border-amber-400 bg-amber-400/10 shadow-md' : 'border-amber-600 bg-amber-50 shadow-md')
                      : (isDark ? 'border-white/10 bg-white/5 hover:bg-white/10' : 'border-slate-200 bg-white hover:bg-slate-100')
                  }`}
                >
                  <div className={`w-full h-4 rounded-md ${item.class}`} />
                  <span className={`text-[11px] font-semibold ${buttonColorSelection === item.id ? 'font-bold' : ''}`}>
                    {item.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Custom Color Picker */}
            <div className={`flex items-center justify-between p-3 rounded-xl border ${isDark ? 'bg-[#090a0f] border-white/10' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-lg shadow-sm border border-white/20 flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: buttonColorSelection.startsWith('#') ? buttonColorSelection : '#ec4899' }}
                >
                  <input 
                    type="color" 
                    value={buttonColorSelection.startsWith('#') ? buttonColorSelection : '#ec4899'}
                    onChange={(e) => setButtonColorSelection(e.target.value)}
                    className="opacity-0 w-full h-full cursor-pointer"
                    title="Selecciona color personalizado"
                  />
                </div>
                <div>
                  <span className={`block text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Selector de Color Personalizado (HEX)</span>
                  <span className={`block text-[10px] ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Elige cualquier tono exacto para todos los botones de la app</span>
                </div>
              </div>
              <input 
                type="text" 
                value={buttonColorSelection}
                onChange={(e) => setButtonColorSelection(e.target.value)}
                placeholder="#ec4899"
                className={`px-3 py-1.5 text-xs font-mono border rounded-lg w-28 text-center focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                  isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Section 2B: Módulo Independiente del Panel Derecho (Portada) */}
          <div className={`p-4 rounded-2xl border space-y-4 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
            <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
              <ImageIcon className="w-4 h-4" />
              <span>Módulo Independiente del Panel Derecho (Portada / Contacto)</span>
            </h3>

            {/* Independent Isotip */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className={`w-16 h-16 rounded-xl border flex items-center justify-center overflow-hidden shrink-0 ${
                isDark ? 'bg-[#090a0f] border-white/10' : 'bg-white border-slate-300'
              }`}>
                {formData.coverCustomLogoUrl ? (
                  <img src={formData.coverCustomLogoUrl} alt="Cover Logo preview" className="w-full h-full object-contain p-1" />
                ) : (
                  <div className="text-center p-1">
                    <span className="text-[9px] font-semibold opacity-70">Isotipo Cover</span>
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2 w-full">
                <div className="flex flex-wrap gap-2">
                  <label className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer transition-colors ${
                    isDark ? 'bg-indigo-600/20 border-indigo-500/30 text-indigo-300 hover:bg-indigo-600/30' : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'
                  }`}>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Cargar Logo Independiente</span>
                    <input type="file" accept=".svg, .png, .jpg, .jpeg" onChange={handleCoverLogoUpload} className="hidden" />
                  </label>
                  {formData.coverCustomLogoUrl && (
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, coverCustomLogoUrl: '' })}
                      className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-semibold border border-red-500/30"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Restaurar Predeterminado</span>
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="URL directa de logo cover (SVG/PNG)..."
                  value={formData.coverCustomLogoUrl || ''}
                  onChange={(e) => setFormData({ ...formData, coverCustomLogoUrl: e.target.value })}
                  className={`w-full px-3 py-1.5 text-xs border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                    isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Cover Text & Typography */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.coverShowLogoText !== false}
                    onChange={(e) => setFormData({ ...formData, coverShowLogoText: e.target.checked })}
                    className="rounded border-slate-400 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                  />
                  <span className={`text-xs font-semibold ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                    Mostrar texto de dos líneas en el Panel Derecho
                  </span>
                </label>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[11px] font-bold ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>Tamaño:</span>
                    <select
                      value={formData.coverLogoSize || 'xl'}
                      onChange={(e) => setFormData({ ...formData, coverLogoSize: e.target.value as any })}
                      className={`px-2.5 py-1 text-xs border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                        isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="sm">Pequeño</option>
                      <option value="md">Mediano</option>
                      <option value="lg">Grande</option>
                      <option value="xl">Extra Grande</option>
                      <option value="2xl">Máximo</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={`text-[11px] font-bold ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>Tipografía:</span>
                    <select
                      value={formData.coverLogoFontFamily || 'GatsbyFLF'}
                      onChange={(e) => setFormData({ ...formData, coverLogoFontFamily: e.target.value })}
                      className={`px-2.5 py-1 text-xs border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                        isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="GatsbyFLF">GatsbyFLF</option>
                      <option value="Cinzel">Cinzel</option>
                      <option value="Cormorant">Cormorant</option>
                      <option value="Playfair">Playfair</option>
                      <option value="Sans">Montserrat</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>Cover Línea 1</label>
                  <input
                    type="text"
                    value={formData.coverLogoLine1 || ''}
                    onChange={(e) => setFormData({ ...formData, coverLogoLine1: e.target.value })}
                    placeholder="Ej. ESTUDIO DE"
                    className={`w-full px-3 py-1.5 text-xs border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                      isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>Cover Línea 2</label>
                  <input
                    type="text"
                    value={formData.coverLogoLine2 || ''}
                    onChange={(e) => setFormData({ ...formData, coverLogoLine2: e.target.value })}
                    placeholder="Ej. DISEÑO"
                    className={`w-full px-3 py-1.5 text-xs border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                      isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Datos Generales */}
          <div className="space-y-4">
            <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
              Información del Diseñador
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                  Nombre del Diseñador
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none ${
                    isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                  Título Profesional
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none ${
                    isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                  Subtítulo / Nombre de Estudio
                </label>
                <input
                  type="text"
                  value={formData.subTitle}
                  onChange={(e) => setFormData({ ...formData, subTitle: e.target.value })}
                  className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none ${
                    isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                  Ubicación
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none ${
                    isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                Resumen Curricular &amp; Perfil Profesional
              </label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none ${
                  isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                Experiencia Docente Universitaria
              </label>
              <textarea
                rows={2}
                value={formData.teachingExperience}
                onChange={(e) => setFormData({ ...formData, teachingExperience: e.target.value })}
                className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none ${
                  isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Section: Canales de Contacto & Redes Sociales con estética unificada */}
          <div className={`p-4 sm:p-5 rounded-2xl border space-y-4 ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Canales de Contacto & Redes Sociales
                </h3>
                <p className={`text-[11px] mt-0.5 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  Gestiona el correo, teléfono y las redes sociales mostradas en el panel de contacto y en el pie de página.
                </p>
              </div>
            </div>

            {/* Contacto Directo Principal: Correo y Teléfono */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className={`flex items-center gap-1.5 text-xs font-bold mb-1.5 ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span>Correo Electrónico Principal</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ejemplo@correo.com"
                  className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none ${
                    isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`flex items-center gap-1.5 text-xs font-bold mb-1.5 ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>Teléfono / WhatsApp</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+56 9 1234 5678"
                  className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none ${
                    isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Redes Sociales Principales: Campos Directos de URL */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className={`block text-xs font-bold uppercase tracking-wider ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                    URLs de Redes Sociales Principales
                  </span>
                  <span className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                    Ingresa tus enlaces; se renderizarán automáticamente con sus respectivos iconos y tipografía idéntica a tus datos de contacto.
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {/* Instagram */}
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-[#090a0f] border-white/10' : 'bg-white border-slate-200 shadow-xs'}`}>
                  <label className={`flex items-center gap-1.5 text-xs font-semibold mb-1 ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>
                    <SocialIcon iconName="instagram" className="w-3.5 h-3.5 shrink-0" isDark={isDark} />
                    <span>Instagram URL</span>
                  </label>
                  <input
                    type="text"
                    value={formData.instagramUrl || ''}
                    onChange={(e) => handleDirectUrlChange('instagram', 'Instagram', e.target.value)}
                    placeholder="https://instagram.com/tuusuario"
                    className={`w-full px-3 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none font-mono ${
                      isDark ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                {/* LinkedIn */}
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-[#090a0f] border-white/10' : 'bg-white border-slate-200 shadow-xs'}`}>
                  <label className={`flex items-center gap-1.5 text-xs font-semibold mb-1 ${isDark ? 'text-sky-400' : 'text-sky-600'}`}>
                    <SocialIcon iconName="linkedin" className="w-3.5 h-3.5 shrink-0" isDark={isDark} />
                    <span>LinkedIn URL</span>
                  </label>
                  <input
                    type="text"
                    value={formData.linkedinUrl || ''}
                    onChange={(e) => handleDirectUrlChange('linkedin', 'LinkedIn', e.target.value)}
                    placeholder="https://linkedin.com/in/tuusuario"
                    className={`w-full px-3 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono ${
                      isDark ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                {/* Behance */}
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-[#090a0f] border-white/10' : 'bg-white border-slate-200 shadow-xs'}`}>
                  <label className={`flex items-center gap-1.5 text-xs font-semibold mb-1 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                    <SocialIcon iconName="behance" className="w-3.5 h-3.5 shrink-0" isDark={isDark} />
                    <span>Behance URL</span>
                  </label>
                  <input
                    type="text"
                    value={formData.behanceUrl || ''}
                    onChange={(e) => handleDirectUrlChange('behance', 'Behance', e.target.value)}
                    placeholder="https://behance.net/tuusuario"
                    className={`w-full px-3 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono ${
                      isDark ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                {/* Dribbble */}
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-[#090a0f] border-white/10' : 'bg-white border-slate-200 shadow-xs'}`}>
                  <label className={`flex items-center gap-1.5 text-xs font-semibold mb-1 ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                    <SocialIcon iconName="dribbble" className="w-3.5 h-3.5 shrink-0" isDark={isDark} />
                    <span>Dribbble URL</span>
                  </label>
                  <input
                    type="text"
                    value={formData.dribbbleUrl || ''}
                    onChange={(e) => handleDirectUrlChange('dribbble', 'Dribbble', e.target.value)}
                    placeholder="https://dribbble.com/tuusuario"
                    className={`w-full px-3 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none font-mono ${
                      isDark ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                {/* GitHub */}
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-[#090a0f] border-white/10' : 'bg-white border-slate-200 shadow-xs'}`}>
                  <label className={`flex items-center gap-1.5 text-xs font-semibold mb-1 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                    <SocialIcon iconName="github" className="w-3.5 h-3.5 shrink-0" isDark={isDark} />
                    <span>GitHub URL</span>
                  </label>
                  <input
                    type="text"
                    value={formData.githubUrl || ''}
                    onChange={(e) => handleDirectUrlChange('github', 'GitHub', e.target.value)}
                    placeholder="https://github.com/tuusuario"
                    className={`w-full px-3 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none font-mono ${
                      isDark ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                {/* WhatsApp Directo / Link */}
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-[#090a0f] border-white/10' : 'bg-white border-slate-200 shadow-xs'}`}>
                  <label className={`flex items-center gap-1.5 text-xs font-semibold mb-1 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                    <SocialIcon iconName="whatsapp" className="w-3.5 h-3.5 shrink-0" isDark={isDark} />
                    <span>WhatsApp Link / Chat</span>
                  </label>
                  <input
                    type="text"
                    value={socialLinks.find(s => s.icon === 'whatsapp' || s.id === 'whatsapp')?.url || ''}
                    onChange={(e) => handleDirectUrlChange('whatsapp', 'WhatsApp', e.target.value)}
                    placeholder="https://wa.me/56912345678"
                    className={`w-full px-3 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono ${
                      isDark ? 'bg-black/40 border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Redes Sociales y Enlaces Personalizados Adicionales */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                    Lista Completa & Redes Personalizadas
                  </span>
                  <span className={`block text-[11px] ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                    Puedes añadir cualquier red (YouTube, TikTok, X, Pinterest, Portafolio Web) y reordenar su visualización.
                  </span>
                </div>
                {!isAddingSocial && (
                  <button
                    type="button"
                    onClick={handleOpenAddSocial}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isDark
                        ? 'bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30'
                        : 'bg-pink-100 hover:bg-pink-200 text-pink-700 border border-pink-200'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar Otra Red Social</span>
                  </button>
                )}
              </div>

              {/* Lista de redes agregadas */}
              {socialLinks.length === 0 ? (
                <div className={`p-4 rounded-xl text-center border border-dashed ${
                  isDark ? 'border-white/10 text-neutral-400' : 'border-slate-300 text-slate-500'
                }`}>
                  <p className="text-xs">No hay redes sociales configuradas actualmente.</p>
                  <p className="text-[11px] mt-1 opacity-80">Rellena los campos superiores o haz clic en "Agregar Otra Red Social".</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {socialLinks.map((link, idx) => (
                    <div
                      key={link.id}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                        isDark ? 'bg-[#090a0f] border-white/10' : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isDark ? 'bg-white/5' : 'bg-slate-100'
                        }`}>
                          <SocialIcon iconName={link.icon} className="w-4 h-4" isDark={isDark} />
                        </div>
                        <div className="min-w-0">
                          <p className={`text-xs font-semibold truncate ${
                            isDark ? 'text-neutral-200' : 'text-slate-800'
                          }`}>
                            {link.name}
                          </p>
                          <p className={`text-[11px] truncate font-mono ${
                            isDark ? 'text-neutral-400' : 'text-slate-500'
                          }`}>
                            {link.url}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleMoveSocial(idx, 'up')}
                          disabled={idx === 0}
                          className={`p-1.5 rounded-lg border transition-all ${
                            idx === 0 
                              ? 'opacity-30 cursor-not-allowed border-transparent' 
                              : isDark ? 'hover:bg-white/10 border-white/10 text-neutral-300' : 'hover:bg-slate-100 border-slate-200 text-slate-600'
                          }`}
                          title="Subir orden"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveSocial(idx, 'down')}
                          disabled={idx === socialLinks.length - 1}
                          className={`p-1.5 rounded-lg border transition-all ${
                            idx === socialLinks.length - 1 
                              ? 'opacity-30 cursor-not-allowed border-transparent' 
                              : isDark ? 'hover:bg-white/10 border-white/10 text-neutral-300' : 'hover:bg-slate-100 border-slate-200 text-slate-600'
                          }`}
                          title="Bajar orden"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEditSocial(link)}
                          className={`p-1.5 rounded-lg border transition-all ${
                            isDark ? 'hover:bg-white/10 border-white/10 text-amber-300' : 'hover:bg-amber-50 border-amber-200 text-amber-700'
                          }`}
                          title="Editar red social"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSocial(link.id)}
                          className="p-1.5 rounded-lg border border-red-500/20 hover:bg-red-500/10 text-red-400 transition-all"
                          title="Eliminar red social"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Formulario para Agregar o Editar Red Social */}
              {isAddingSocial && (
                <div className={`p-4 rounded-2xl border space-y-4 animate-in fade-in duration-200 ${
                  isDark ? 'bg-[#0b0c14] border-pink-500/30 ring-1 ring-pink-500/20' : 'bg-white border-pink-300 ring-1 ring-pink-300/30'
                }`}>
                  <div className="flex items-center justify-between border-b pb-2.5 border-white/10">
                    <span className={`text-xs font-bold flex items-center gap-2 ${isDark ? 'text-pink-300' : 'text-pink-700'}`}>
                      <SocialIcon iconName={newSocialIcon} className="w-4 h-4" isDark={isDark} />
                      <span>{editingSocialId ? 'Editar Red Social' : 'Nueva Red Social / Contacto'}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingSocial(false);
                        setEditingSocialId(null);
                      }}
                      className={`p-1 rounded-lg ${isDark ? 'hover:bg-white/10 text-neutral-400' : 'hover:bg-slate-100 text-slate-500'}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Redes predefinidas rápidas */}
                  <div>
                    <label className={`block text-[11px] font-bold mb-1.5 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                      Plantillas Rápidas (Icono y Prefijo)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {SOCIAL_ICON_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectPreset(opt)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-all cursor-pointer ${
                            newSocialIcon === opt.id
                              ? isDark 
                                ? 'bg-pink-500/20 border-pink-400 text-pink-200' 
                                : 'bg-pink-50 border-pink-400 text-pink-700 font-bold'
                              : isDark
                                ? 'bg-white/5 hover:bg-white/10 border-white/10 text-neutral-300'
                                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                          }`}
                        >
                          <SocialIcon iconName={opt.id} className="w-3.5 h-3.5" isDark={isDark} />
                          <span>{opt.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selector visual de iconos */}
                  <div>
                    <label className={`block text-[11px] font-bold mb-1.5 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                      Seleccionar Icono
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {SOCIAL_ICON_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setNewSocialIcon(opt.id)}
                          className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                            newSocialIcon === opt.id
                              ? isDark
                                ? 'bg-pink-500/20 border-pink-400 ring-2 ring-pink-500/40 text-white'
                                : 'bg-pink-50 border-pink-500 ring-2 ring-pink-300 text-pink-900 font-bold'
                              : isDark
                                ? 'bg-[#090a0f] hover:bg-white/5 border-white/10 text-neutral-400'
                                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                          }`}
                          title={opt.name}
                        >
                          <SocialIcon iconName={opt.id} className="w-4 h-4" isDark={isDark} />
                          <span className="text-[10px] truncate max-w-full">{opt.name.split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Campos de texto con exactamente la misma tipografía y estilo de Correo y Teléfono */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                        Nombre de la Red o Etiqueta
                      </label>
                      <input
                        type="text"
                        required
                        value={newSocialName}
                        onChange={(e) => setNewSocialName(e.target.value)}
                        placeholder="Ej. Instagram, Behance, WhatsApp..."
                        className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none ${
                          isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                        URL o Enlace (con autodetección)
                      </label>
                      <input
                        type="text"
                        required
                        value={newSocialUrl}
                        onChange={(e) => handleUrlInputChange(e.target.value)}
                        placeholder="https://..."
                        className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none ${
                          isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Botones de acción para la red social */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingSocial(false);
                        setEditingSocialId(null);
                      }}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-xl border ${
                        isDark ? 'border-white/10 hover:bg-white/5 text-neutral-400' : 'border-slate-300 hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveSocial}
                      disabled={!newSocialName.trim() && !newSocialUrl.trim()}
                      className={`px-4 py-1.5 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                        !newSocialName.trim() && !newSocialUrl.trim()
                          ? 'opacity-40 cursor-not-allowed bg-pink-500 text-white'
                          : 'bg-pink-600 hover:bg-pink-500 text-white shadow-md shadow-pink-600/30'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{editingSocialId ? 'Actualizar Red' : 'Guardar Red Social'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Vista Previa en Vivo Completa de Contacto */}
              <div className={`p-4 rounded-2xl border space-y-3 ${
                isDark ? 'bg-black/40 border-white/10' : 'bg-slate-100/90 border-slate-200'
              }`}>
                <span className={`block text-[11px] font-bold uppercase tracking-wider text-center ${
                  isDark ? 'text-neutral-400' : 'text-slate-500'
                }`}>
                  Vista Previa en Vivo: Panel de Contacto
                </span>
                
                <div className={`w-full max-w-sm mx-auto space-y-2.5 p-3.5 rounded-xl border ${
                  isDark ? 'bg-[#090a0f] border-white/10' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  {/* Correo */}
                  <div className={`flex items-center justify-center gap-2 ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                    <Mail className="w-4 h-4 shrink-0" />
                    <span className={`text-xs truncate max-w-[220px] ${isDark ? 'text-neutral-200' : 'text-slate-700 font-medium'}`}>
                      {formData.email || 'correo@ejemplo.com'}
                    </span>
                  </div>

                  {/* Teléfono */}
                  <div className={`flex items-center justify-center gap-2 ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>
                    <Phone className="w-4 h-4 shrink-0" />
                    <span className={`text-xs truncate max-w-[220px] ${isDark ? 'text-neutral-200' : 'text-slate-700 font-medium'}`}>
                      {formData.phone || '+56 9 1234 5678'}
                    </span>
                  </div>

                  {/* Redes */}
                  {socialLinks.map((link) => (
                    <div 
                      key={link.id} 
                      className={`flex items-center justify-center gap-2 ${getSocialIconColors(link.icon, isDark)}`}
                    >
                      <SocialIcon iconName={link.icon} className="w-4 h-4 shrink-0" isDark={isDark} />
                      <span className={`text-xs truncate max-w-[220px] ${isDark ? 'text-neutral-200' : 'text-slate-700 font-medium'}`}>
                        {link.name || link.url}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Recuadros de Resumen / Estadísticas */}
          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
            <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
              Recuadros de Resumen / Estadísticas (Hero)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <div>
                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>1. Exp. Profesional (Valor &amp; Etiqueta)</label>
                <div className="grid grid-cols-2 gap-1.5">
                  <input type="text" value={formData.experienceValue} onChange={(e) => setFormData({ ...formData, experienceValue: e.target.value })} className={`px-2.5 py-1.5 text-xs border rounded-lg ${isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300'}`} />
                  <input type="text" value={formData.experienceLabel} onChange={(e) => setFormData({ ...formData, experienceLabel: e.target.value })} className={`px-2.5 py-1.5 text-xs border rounded-lg ${isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300'}`} />
                </div>
              </div>
              <div>
                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>2. Docencia (Valor &amp; Etiqueta)</label>
                <div className="grid grid-cols-2 gap-1.5">
                  <input type="text" value={formData.teachingValue} onChange={(e) => setFormData({ ...formData, teachingValue: e.target.value })} className={`px-2.5 py-1.5 text-xs border rounded-lg ${isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300'}`} />
                  <input type="text" value={formData.teachingLabel} onChange={(e) => setFormData({ ...formData, teachingLabel: e.target.value })} className={`px-2.5 py-1.5 text-xs border rounded-lg ${isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300'}`} />
                </div>
              </div>
              <div>
                <label className={`block text-[11px] font-semibold mb-1 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>3. Áreas (Valor &amp; Etiqueta)</label>
                <div className="grid grid-cols-2 gap-1.5">
                  <input type="text" value={formData.areasValue} onChange={(e) => setFormData({ ...formData, areasValue: e.target.value })} className={`px-2.5 py-1.5 text-xs border rounded-lg ${isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300'}`} />
                  <input type="text" value={formData.areasLabel} onChange={(e) => setFormData({ ...formData, areasLabel: e.target.value })} className={`px-2.5 py-1.5 text-xs border rounded-lg ${isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300'}`} />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.showInteractiveBadge !== false}
                  onChange={(e) => setFormData({ ...formData, showInteractiveBadge: e.target.checked })}
                  className="rounded border-slate-400 text-pink-600 focus:ring-pink-500 w-4 h-4"
                />
                <span className={`text-xs font-semibold ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                  Mostrar recuadro / insignia de "100% Editable" (o personalizable)
                </span>
              </label>
              {formData.showInteractiveBadge !== false && (
                <div className="flex items-center gap-1.5">
                  <input type="text" value={formData.interactiveValue} onChange={(e) => setFormData({ ...formData, interactiveValue: e.target.value })} placeholder="Valor" className={`w-28 px-2.5 py-1 text-xs border rounded-lg ${isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300'}`} />
                  <input type="text" value={formData.interactiveLabel} onChange={(e) => setFormData({ ...formData, interactiveLabel: e.target.value })} placeholder="Etiqueta" className={`w-36 px-2.5 py-1 text-xs border rounded-lg ${isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300'}`} />
                </div>
              )}
            </div>
          </div>

          {/* Section 5: Habilidades */}
          <div>
            <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
              Habilidades Clave (Una por línea)
            </label>
            <textarea
              rows={4}
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none font-mono text-xs ${
                isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
              Software &amp; Herramientas (Separados por coma)
            </label>
            <input
              type="text"
              value={toolsInput}
              onChange={(e) => setToolsInput(e.target.value)}
              className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none ${
                isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          {/* Backup, Restore & Reset Section */}
          <div className={`pt-4 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
              Copia de Seguridad &amp; Restauración
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={exportJSON}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                  isDark ? 'bg-white/5 hover:bg-white/10 text-neutral-200 border-white/10' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar JSON</span>
              </button>

              <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer transition-colors ${
                isDark ? 'bg-white/5 hover:bg-white/10 text-neutral-200 border-white/10' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}>
                <Upload className="w-3.5 h-3.5" />
                <span>Importar JSON</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportFile}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className={`pt-4 border-t flex items-center justify-end gap-3 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(false)}
              className={`px-4 py-2 text-xs font-bold ${isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Cerrar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-xl text-xs font-bold shadow-md shadow-amber-400/20 transition-all active:scale-98 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
