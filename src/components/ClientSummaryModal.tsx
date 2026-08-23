import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  Copy, 
  Check, 
  Send, 
  Mail, 
  Phone, 
  Sparkles, 
  Trash2, 
  FileText, 
  Briefcase, 
  Clock, 
  DollarSign, 
  CheckSquare, 
  Square,
  MessageCircle,
  Inbox,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const SERVICE_OPTIONS = [
  'Diseño de Logotipos & Monogramas',
  'Identidad Visual Corporativa & Manual de Marca',
  'Diseño de Cartelería & Pósters de Eventos',
  'Diseño Editorial (Revistas, Catálogos, Diarios)',
  'Diseño Web Responsivo & Interfaces',
  'Flyers Digitales & Material de Alta Conversión',
  'Piezas Publicitarias para Redes Sociales',
  'Ilustración Digital 2D/3D',
  'Tarjetería Social & Eventos Temáticos'
];

export const ClientSummaryModal: React.FC = () => {
  const { 
    data, 
    clientSelection, 
    updateClientSelection, 
    toggleProjectInterest,
    toggleServiceInterest,
    clearClientSelection,
    isSummaryModalOpen, 
    setIsSummaryModalOpen,
    submitQuoteRequest,
    setIsQuoteManagerOpen,
    quoteRequests,
    themeMode,
    t
  } = usePortfolio();

  const isDark = themeMode === 'dark';
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('preview');

  const tModal = t.quoteModal || {
    submitAndNotifyBtn: 'Confirmar Solicitud & Recibir Respuesta Inmediata',
    instantResponseHint: 'Genera un acuse de recibo inmediato con código oficial y envía notificación directa al diseñador.',
    openManagerBtn: 'Ver Bandeja de Cotizaciones'
  };

  const selectedProjectsData = useMemo(() => {
    return data.projects.filter(p => clientSelection.selectedProjects.includes(p.id));
  }, [data.projects, clientSelection.selectedProjects]);

  // Generate the formatted summary text for copying
  const generatedSummaryText = useMemo(() => {
    const divider = '========================================';
    const clientName = clientSelection.clientName || 'Cliente / Empresa Interesada';
    const contact = clientSelection.clientContact || 'Por definir';
    const company = clientSelection.clientCompany ? ` (${clientSelection.clientCompany})` : '';

    let text = `📋 SOLICITUD DE PROYECTO & COTIZACIÓN DE DISEÑO\n`;
    text += `Para: ${data.profile.name} - ${data.profile.title}\n`;
    text += `Email: ${data.profile.email} | Tel: ${data.profile.phone}\n`;
    text += `${divider}\n\n`;

    text += `👤 DATOS DEL CLIENTE:\n`;
    text += `• Nombre: ${clientName}${company}\n`;
    text += `• Contacto: ${contact}\n`;
    text += `• Tipo de Proyecto: ${clientSelection.projectType}\n`;
    text += `• Tiempo Estimado Deseado: ${clientSelection.estimatedTimeline}\n`;
    text += `• Rango Presupuestario: ${clientSelection.budgetRange}\n\n`;

    text += `✨ SERVICIOS REQUERIDOS:\n`;
    if (clientSelection.selectedServices.length > 0) {
      clientSelection.selectedServices.forEach(s => {
        text += `  [✓] ${s}\n`;
      });
    } else {
      text += `  (Servicio general de diseño gráfico a convenir)\n`;
    }
    text += `\n`;

    text += `🎨 REFERENCIAS Y TRABAJOS DE INTERÉS DEL PORTAFOLIO:\n`;
    if (selectedProjectsData.length > 0) {
      selectedProjectsData.forEach((p, idx) => {
        text += `  ${idx + 1}. [Ref ${p.number}] ${p.title} (Cliente: ${p.client})\n`;
      });
    } else {
      text += `  (No se especificaron piezas concretas del portafolio)\n`;
    }
    text += `\n`;

    if (clientSelection.additionalNotes.trim()) {
      text += `📝 NOTAS Y ESPECIFICACIONES ADICIONALES:\n`;
      text += `"${clientSelection.additionalNotes.trim()}"\n\n`;
    }

    text += `${divider}\n`;
    text += `Generado desde el Portafolio Digital de ${data.profile.name}\n`;
    text += `Fecha: ${new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}`;

    return text;
  }, [data, clientSelection, selectedProjectsData]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedSummaryText);
      setCopied(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      });
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleConfirmAndSubmit = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setIsSummaryModalOpen(false);
    submitQuoteRequest(clientSelection);
  };

  const handleWhatsAppSend = () => {
    const rawPhone = data.profile.phone.replace(/[^0-9]/g, '');
    const encodedText = encodeURIComponent(generatedSummaryText);
    const waUrl = `https://wa.me/${rawPhone}?text=${encodedText}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleEmailSend = () => {
    const subject = encodeURIComponent(`Solicitud de Cotización: ${clientSelection.projectType} - ${clientSelection.clientName || 'Cliente'}`);
    const body = encodeURIComponent(generatedSummaryText);
    const mailtoUrl = `mailto:${data.profile.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  if (!isSummaryModalOpen) return null;

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
        {/* Modal Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${
          isDark ? 'border-white/10 bg-[#090a0f]' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-pink-600 to-purple-600 rounded-xl shadow-md shadow-pink-600/30">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Resumen de Solicitud &amp; Cotización
              </h2>
              <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                Copia este resumen o envíalo directamente a Víctor Hugo González
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="close-summary-modal-btn"
              onClick={() => setIsSummaryModalOpen(false)}
              className={`p-1.5 rounded-full transition-colors ${
                isDark ? 'text-neutral-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className={`flex border-b px-6 pt-2 ${
          isDark ? 'border-white/10 bg-[#0c0d14]' : 'border-slate-200 bg-slate-100/70'
        }`}>
          <button
            onClick={() => setActiveTab('preview')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'preview'
                ? isDark ? 'border-pink-500 text-pink-400' : 'border-pink-600 text-pink-600'
                : isDark ? 'border-transparent text-neutral-400 hover:text-neutral-200' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            1. Resumen Generado (Listo para Copiar)
          </button>
          <button
            onClick={() => setActiveTab('edit')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'edit'
                ? isDark ? 'border-pink-500 text-pink-400' : 'border-pink-600 text-pink-600'
                : isDark ? 'border-transparent text-neutral-400 hover:text-neutral-200' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            2. Personalizar Datos del Proyecto
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-7 flex-1 space-y-4">
          {activeTab === 'preview' ? (
            <div className="space-y-4">
              {/* Selected Projects Quick Pills */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${
                    isDark ? 'text-neutral-400' : 'text-slate-500'
                  }`}>
                    Trabajos de referencia seleccionados ({selectedProjectsData.length})
                  </h4>
                  {selectedProjectsData.length > 0 && (
                    <button
                      onClick={clearClientSelection}
                      className={`text-[11px] flex items-center gap-1 transition-colors ${
                        isDark ? 'text-neutral-400 hover:text-red-400' : 'text-slate-500 hover:text-red-600'
                      }`}
                    >
                      <Trash2 className="w-3 h-3" />
                      Limpiar selección
                    </button>
                  )}
                </div>

                {selectedProjectsData.length === 0 ? (
                  <div className={`p-3.5 border rounded-2xl text-xs flex items-center justify-between ${
                    isDark ? 'bg-amber-400/10 border-amber-400/20 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}>
                    <span>No has seleccionado trabajos específicos aún. Puedes navegar el portafolio y marcar "Me interesa este estilo".</span>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {selectedProjectsData.map(p => (
                      <span 
                        key={p.id}
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-medium border ${
                          isDark 
                            ? 'bg-white/5 text-pink-300 border-pink-500/30' 
                            : 'bg-pink-50 text-pink-700 border-pink-200'
                        }`}
                      >
                        <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>[{p.number}]</span> {p.title}
                        <button
                          onClick={() => toggleProjectInterest(p.id)}
                          className="hover:opacity-75 ml-0.5"
                          title="Quitar"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Formatted Text Box Ready for Copying */}
              <div className="relative space-y-2">
                <div className="flex items-center justify-between">
                  <label className={`text-xs font-bold uppercase tracking-wider ${
                    isDark ? 'text-neutral-400' : 'text-slate-500'
                  }`}>
                    Texto Formateado para Copiar
                  </label>
                  <span className="text-[11px] text-emerald-500 font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Formato optimizado para WhatsApp y Correo
                  </span>
                </div>
                
                <textarea
                  id="client-summary-preview-textarea"
                  readOnly
                  value={generatedSummaryText}
                  rows={11}
                  className={`w-full font-mono text-xs sm:text-[13px] p-4 rounded-2xl border focus:outline-none select-all leading-relaxed shadow-inner ${
                    isDark 
                      ? 'bg-[#07080c] text-neutral-200 border-white/10' 
                      : 'bg-slate-50 text-slate-800 border-slate-300'
                  }`}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${
                    isDark ? 'text-neutral-300' : 'text-slate-700'
                  }`}>
                    Tu Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={clientSelection.clientName}
                    onChange={(e) => updateClientSelection({ clientName: e.target.value })}
                    placeholder="Ej. Juan Pérez"
                    className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                      isDark 
                        ? 'bg-[#090a0f] border-white/10 text-white placeholder:text-neutral-600' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${
                    isDark ? 'text-neutral-300' : 'text-slate-700'
                  }`}>
                    Empresa / Emprendimiento (Opcional)
                  </label>
                  <input
                    type="text"
                    value={clientSelection.clientCompany}
                    onChange={(e) => updateClientSelection({ clientCompany: e.target.value })}
                    placeholder="Ej. Mi Marca Gourmet C.A."
                    className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                      isDark 
                        ? 'bg-[#090a0f] border-white/10 text-white placeholder:text-neutral-600' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${
                    isDark ? 'text-neutral-300' : 'text-slate-700'
                  }`}>
                    WhatsApp o Teléfono de Contacto
                  </label>
                  <input
                    type="text"
                    value={clientSelection.clientContact}
                    onChange={(e) => updateClientSelection({ clientContact: e.target.value })}
                    placeholder="Ej. +58 412 0000000 / email@dominio.com"
                    className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                      isDark 
                        ? 'bg-[#090a0f] border-white/10 text-white placeholder:text-neutral-600' 
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${
                    isDark ? 'text-neutral-300' : 'text-slate-700'
                  }`}>
                    Tipo de Proyecto Principal
                  </label>
                  <select
                    value={clientSelection.projectType}
                    onChange={(e) => updateClientSelection({ projectType: e.target.value })}
                    className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                      isDark 
                        ? 'bg-[#090a0f] border-white/10 text-white' 
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="Identidad Visual &amp; Branding Completo">Identidad Visual &amp; Branding Completo</option>
                    <option value="Diseño de Logotipo Único">Diseño de Logotipo Único</option>
                    <option value="Cartelería, Pósters &amp; Afiches Culturales">Cartelería, Pósters &amp; Afiches Culturales</option>
                    <option value="Diseño Editorial (Revistas, Diarios, Catálogos)">Diseño Editorial (Revistas, Diarios, Catálogos)</option>
                    <option value="Diseño Web Responsivo / Interfaces">Diseño Web Responsivo / Interfaces</option>
                    <option value="Campaña Integral de Redes Sociales">Campaña Integral de Redes Sociales</option>
                    <option value="Ilustración Digital Especializada">Ilustración Digital Especializada</option>
                    <option value="Tarjetería Social &amp; Eventos">Tarjetería Social &amp; Eventos</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${
                    isDark ? 'text-neutral-300' : 'text-slate-700'
                  }`}>
                    Tiempo de Entrega Deseado
                  </label>
                  <select
                    value={clientSelection.estimatedTimeline}
                    onChange={(e) => updateClientSelection({ estimatedTimeline: e.target.value })}
                    className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                      isDark 
                        ? 'bg-[#090a0f] border-white/10 text-white' 
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="Urgente (Menos de 1 semana)">Urgente (Menos de 1 semana)</option>
                    <option value="1 a 2 semanas">1 a 2 semanas</option>
                    <option value="2 a 4 semanas">2 a 4 semanas</option>
                    <option value="Sin apuro / Flexible">Sin apuro / Flexible</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${
                    isDark ? 'text-neutral-300' : 'text-slate-700'
                  }`}>
                    Rango de Presupuesto Estimado
                  </label>
                  <select
                    value={clientSelection.budgetRange}
                    onChange={(e) => updateClientSelection({ budgetRange: e.target.value })}
                    className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                      isDark 
                        ? 'bg-[#090a0f] border-white/10 text-white' 
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="Emprendedor / Básico">Emprendedor / Básico</option>
                    <option value="Estándar / Profesional">Estándar / Profesional</option>
                    <option value="Corporativo / Integral">Corporativo / Integral</option>
                    <option value="A Convenir según Propuesta">A Convenir según Propuesta</option>
                  </select>
                </div>
              </div>

              {/* Service Checkboxes */}
              <div>
                <label className={`block text-xs font-bold mb-2 ${
                  isDark ? 'text-neutral-300' : 'text-slate-700'
                }`}>
                  Servicios que necesitas incluir:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERVICE_OPTIONS.map(service => {
                    const isChecked = clientSelection.selectedServices.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleServiceInterest(service)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl text-left text-xs font-medium border transition-all ${
                          isChecked
                            ? isDark
                              ? 'bg-pink-500/15 border-pink-500/50 text-pink-300'
                              : 'bg-pink-50 border-pink-300 text-pink-700 font-semibold'
                            : isDark
                              ? 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-pink-500 shrink-0" />
                        ) : (
                          <Square className={`w-4 h-4 shrink-0 ${isDark ? 'text-neutral-500' : 'text-slate-400'}`} />
                        )}
                        <span>{service}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className={`block text-xs font-bold mb-1.5 ${
                  isDark ? 'text-neutral-300' : 'text-slate-700'
                }`}>
                  Detalles / Requerimientos Adicionales
                </label>
                <textarea
                  value={clientSelection.additionalNotes}
                  onChange={(e) => updateClientSelection({ additionalNotes: e.target.value })}
                  placeholder="Describe aquí cualquier idea, colores preferidos, medidas o necesidades especiales de tu proyecto..."
                  rows={3}
                  className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                    isDark 
                      ? 'bg-[#090a0f] border-white/10 text-white placeholder:text-neutral-600' 
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className={`p-4 sm:p-5 border-t flex flex-col gap-3.5 ${
          isDark ? 'border-white/10 bg-[#0c0d14]' : 'border-slate-200 bg-slate-50'
        }`}>
          {/* Main Submission & Instant Response Action */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <button
              id="confirm-submit-quote-btn"
              onClick={handleConfirmAndSubmit}
              className="w-full flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:brightness-110 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/25 transition-all active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{tModal.submitAndNotifyBtn || 'Confirmar Solicitud & Recibir Respuesta Inmediata'}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <p className={`text-[11px] text-center ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
            ⚡ {tModal.instantResponseHint || 'Genera un acuse de recibo inmediato con código oficial y envía notificación directa al diseñador.'}
          </p>

          {/* Secondary Actions: Copy, WhatsApp, Email, Manager */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {/* Copy Summary */}
              <button
                id="copy-summary-clipboard-btn"
                onClick={handleCopy}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-bold border transition-all active:scale-98 cursor-pointer ${
                  copied
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : isDark
                      ? 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-2xs'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Resumen</span>
                  </>
                )}
              </button>

              {/* Direct WhatsApp Action */}
              <button
                id="send-whatsapp-btn"
                onClick={handleWhatsAppSend}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-2 px-3.5 bg-emerald-600/90 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs shadow-emerald-600/20 transition-all active:scale-98 cursor-pointer"
                title="Enviar mensaje por WhatsApp a Víctor Hugo González"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp</span>
              </button>

              {/* Direct Email Action */}
              <button
                id="send-email-btn"
                onClick={handleEmailSend}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-bold border transition-all active:scale-98 cursor-pointer ${
                  isDark 
                    ? 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10' 
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-2xs'
                }`}
                title="Enviar por correo electrónico a Víctor Hugo González"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </button>
            </div>

            {/* View Quotes Inbox */}
            <button
              id="open-quote-manager-from-summary-btn"
              onClick={() => {
                setIsSummaryModalOpen(false);
                setIsQuoteManagerOpen(true);
              }}
              className={`w-full sm:w-auto flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                isDark ? 'text-pink-400 hover:bg-pink-500/10' : 'text-pink-600 hover:bg-pink-50'
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>{tModal.openManagerBtn || 'Bandeja de Cotizaciones'} ({quoteRequests.length})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
