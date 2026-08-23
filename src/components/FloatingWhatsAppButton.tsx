import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  FileText, 
  CheckCheck, 
  Layers, 
  ArrowUpRight,
  Palette,
  BookOpen,
  Globe
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const FloatingWhatsAppButton: React.FC = () => {
  const { 
    data, 
    themeMode, 
    clientSelection, 
    setIsSummaryModalOpen 
  } = usePortfolio();

  const isDark = themeMode === 'dark';
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const selectedCount = clientSelection.selectedProjects.length;
  const rawPhone = data.profile.phone.replace(/[^0-9]/g, '');

  const predefinedTemplates = [
    {
      id: 'general',
      icon: Sparkles,
      label: 'Consulta General',
      preview: 'Disponibilidad para nuevo proyecto',
      text: `¡Hola ${data.profile.name}! Estuve revisando tu portafolio digital y me gustaría consultar tu disponibilidad para un nuevo proyecto de diseño gráfico.`
    },
    {
      id: 'branding',
      icon: Palette,
      label: 'Logotipo & Branding',
      preview: 'Identidad visual y manual de marca',
      text: `¡Hola Víctor! Me interesa cotizar el diseño de un logotipo e identidad corporativa para mi emprendimiento/empresa. ¿Podrías darme información sobre el proceso y costos?`
    },
    {
      id: 'editorial',
      icon: BookOpen,
      label: 'Editorial & Cartelería',
      preview: 'Revistas, catálogos o afiches',
      text: `¡Hola Víctor! Vi tus trabajos editoriales y carteles en el portafolio. Me gustaría cotizar la maquetación y diseño de una publicación / cartel cultural.`
    },
    {
      id: 'web',
      icon: Globe,
      label: 'Diseño Web & Digital',
      preview: 'Páginas web y piezas para redes',
      text: `¡Hola Víctor! Deseo cotizar el diseño de una interfaz web responsiva y piezas gráficas para canales digitales.`
    }
  ];

  // Set default message when template is selected
  const handleSelectTemplate = (index: number) => {
    setSelectedTemplateIndex(index);
    setCustomMessage(predefinedTemplates[index].text);
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSend = () => {
    const textToSend = customMessage.trim() || predefinedTemplates[0].text;
    const encodedText = encodeURIComponent(textToSend);
    const waUrl = `https://wa.me/${rawPhone}?text=${encodedText}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-16 right-4 sm:bottom-6 sm:right-6 z-40 max-w-[calc(100vw-2rem)]" ref={popoverRef}>
      {/* WhatsApp Dialog Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.94 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute bottom-14 sm:bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-96 max-w-[380px] rounded-3xl overflow-hidden shadow-2xl border flex flex-col backdrop-blur-xl ${
              isDark 
                ? 'bg-[#10111a]/95 text-white border-white/15 shadow-black/60 ring-1 ring-white/10' 
                : 'bg-white/98 text-slate-900 border-slate-200 shadow-slate-900/20 ring-1 ring-slate-900/5'
            }`}
          >
            {/* Header: WhatsApp Brand styling */}
            <div className="bg-gradient-to-r from-[#128C7E] to-[#25D366] p-4 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-white/40 shadow-inner bg-black/20">
                    <img
                      src={data.profile.avatarUrl}
                      alt={data.profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-300 border-2 border-emerald-700 rounded-full" />
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-tight flex items-center gap-1.5">
                    {data.profile.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    <span>Disponible para proyectos</span>
                  </div>
                </div>
              </div>

              <button
                id="close-whatsapp-popover-btn"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/15 rounded-full transition-colors"
                aria-label="Cerrar ventana de WhatsApp"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 space-y-3.5 max-h-[70vh] overflow-y-auto">
              
              {/* Selected Projects Notification if client picked styles */}
              {selectedCount > 0 && (
                <div className={`p-3 rounded-2xl border flex items-center justify-between gap-3 text-xs transition-colors ${
                  isDark 
                    ? 'bg-pink-500/10 border-pink-500/30 text-pink-200' 
                    : 'bg-pink-50 border-pink-200 text-pink-800'
                }`}>
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-pink-500 shrink-0" />
                    <span>Tienes <strong>{selectedCount}</strong> trabajo(s) en tu lista</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsSummaryModalOpen(true);
                    }}
                    className="underline font-bold hover:opacity-80 shrink-0 text-[11px]"
                  >
                    Ver cotizador
                  </button>
                </div>
              )}

              {/* Quick Template Selector */}
              <div>
                <span className={`block text-[11px] font-bold uppercase tracking-wider mb-2 ${
                  isDark ? 'text-neutral-400' : 'text-slate-500'
                }`}>
                  Mensajes Predefinidos Rápidos
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {predefinedTemplates.map((template, idx) => {
                    const IconComp = template.icon;
                    const isSelected = selectedTemplateIndex === idx;

                    return (
                      <button
                        key={template.id}
                        onClick={() => handleSelectTemplate(idx)}
                        className={`p-2.5 rounded-2xl text-left border transition-all flex flex-col gap-1.5 ${
                          isSelected
                            ? isDark
                              ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 ring-1 ring-emerald-500/30'
                              : 'bg-emerald-50 border-emerald-300 text-emerald-800 ring-1 ring-emerald-300'
                            : isDark
                              ? 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10 hover:border-white/20'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <IconComp className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : isDark ? 'text-neutral-400' : 'text-slate-500'}`} />
                          {isSelected && <CheckCheck className="w-3 h-3 text-emerald-400" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold leading-tight line-clamp-1">{template.label}</p>
                          <p className={`text-[10px] leading-tight line-clamp-1 mt-0.5 ${
                            isDark ? 'text-neutral-400' : 'text-slate-500'
                          }`}>
                            {template.preview}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message Box */}
              <div>
                <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1.5 ${
                  isDark ? 'text-neutral-400' : 'text-slate-500'
                }`}>
                  Mensaje a Enviar
                </label>
                <textarea
                  id="whatsapp-custom-message-input"
                  value={customMessage}
                  onChange={(e) => {
                    setCustomMessage(e.target.value);
                    setSelectedTemplateIndex(null);
                  }}
                  placeholder="Escribe tu mensaje o selecciona una plantilla..."
                  rows={3}
                  className={`w-full px-3.5 py-2.5 text-xs rounded-2xl border resize-none focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-all leading-relaxed ${
                    isDark 
                      ? 'bg-[#090a10] border-white/15 text-neutral-100 placeholder:text-neutral-500' 
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  id="send-whatsapp-direct-btn"
                  onClick={handleSend}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-[#25D366] to-[#1ebe5d] hover:brightness-105 active:scale-[0.98] text-white rounded-2xl text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Abrir Chat en WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-auto opacity-75" />
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsSummaryModalOpen(true);
                  }}
                  className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-[11px] font-semibold transition-colors ${
                    isDark 
                      ? 'text-neutral-400 hover:text-white hover:bg-white/5' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Generar cotización detallada previa</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button Trigger */}
      <motion.button
        id="floating-whatsapp-trigger-btn"
        onClick={() => {
          if (!isOpen && !customMessage) {
            handleSelectTemplate(0);
          }
          setIsOpen(!isOpen);
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="group relative flex items-center gap-2 py-2.5 px-3.5 sm:py-3 sm:px-4.5 bg-gradient-to-tr from-[#1ebe5d] via-[#25D366] to-[#34e77b] text-white rounded-full shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/45 transition-all duration-300 border border-emerald-300/40 cursor-pointer"
        aria-label="Contactar por WhatsApp"
      >
        {/* Animated pulse ring */}
        <span className="absolute -inset-0.5 rounded-full bg-[#25D366] opacity-30 group-hover:opacity-60 animate-ping pointer-events-none" />
        
        {/* Icon */}
        <div className="relative z-10 flex items-center justify-center">
          {isOpen ? (
            <X className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-90 duration-200" />
          ) : (
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white/20" />
          )}
        </div>

        {/* Text Label */}
        <span className="relative z-10 text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap drop-shadow-xs">
          {isOpen ? 'Cerrar' : (
            <>
              <span className="inline sm:hidden">WhatsApp</span>
              <span className="hidden sm:inline">Contactar por WhatsApp</span>
            </>
          )}
        </span>

        {/* Selected Counter Pill if items picked */}
        {selectedCount > 0 && !isOpen && (
          <span className="relative z-10 ml-0.5 px-1.5 py-0.5 bg-white text-emerald-800 text-[10px] font-black rounded-full shadow-xs">
            {selectedCount}
          </span>
        )}
      </motion.button>
    </div>
  );
};
