import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Send, 
  MessageCircle, 
  Mail, 
  Copy, 
  Check, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  Inbox, 
  ArrowRight,
  ExternalLink,
  Tag
} from 'lucide-react';

export const AutoResponseModal: React.FC = () => {
  const { 
    data, 
    lastSubmittedQuote, 
    isAutoResponseModalOpen, 
    setIsAutoResponseModalOpen, 
    setIsQuoteManagerOpen,
    markDesignerNotified,
    themeMode, 
    language,
    t 
  } = usePortfolio();

  const isDark = themeMode === 'dark';
  const [copied, setCopied] = useState(false);

  if (!isAutoResponseModalOpen || !lastSubmittedQuote) return null;

  const rawPhone = data.profile.phone.replace(/[^0-9]/g, '');
  const quote = lastSubmittedQuote;
  const tAuto = t.autoResponseModal || {
    title: '¡Solicitud de Cotización Recibida con Éxito!',
    subtitle: 'Se ha generado tu acuse de recibo y la respuesta automática formal del diseñador.',
    officialQuoteNumber: 'Cotización Oficial N°',
    issuedDate: 'Fecha y Hora de Emisión',
    statusPending: 'En Revisión Prioritaria',
    timeEstimateTitle: 'Tiempo Estimado de Respuesta Formal',
    timeEstimateValue: '2 a 4 Horas Hábiles',
    designerNoticeTitle: 'Respuesta Inmediata del Diseñador Víctor Hugo González:',
    summaryTitle: 'Resumen de Requerimientos Recibidos:',
    clientLabel: 'Cliente',
    companyLabel: 'Empresa / Marca',
    contactLabel: 'Canal de Contacto',
    projectLabel: 'Proyecto',
    servicesLabel: 'Servicios Seleccionados',
    referencesLabel: 'Piezas de Referencia',
    budgetLabel: 'Presupuesto',
    timelineLabel: 'Plazo Estimado',
    notesLabel: 'Observaciones',
    notifyDesignerSection: 'Notificar al Diseñador Víctor Hugo González:',
    notifyDesignerDesc: 'Envía un aviso directo por WhatsApp o Correo para priorizar la revisión de tu cotización:',
    notifyWhatsAppBtn: 'Enviar Notificación por WhatsApp',
    notifyEmailBtn: 'Enviar Notificación por Correo',
    copyVoucherBtn: 'Copiar Comprobante de Cotización',
    copiedVoucher: '¡Comprobante Copiado!',
    viewAllQuotesBtn: 'Ver Bandeja de Cotizaciones',
    closeBtn: 'Entendido y Cerrar'
  };

  const selectedProjectsData = data.projects.filter(p => quote.selectedProjects.includes(p.id));

  // Generate full text voucher
  const voucherText = `╔════════════════════════════════════════════════════════════╗
  COMPROBANTE OFICIAL DE COTIZACIÓN DE DISEÑO
  Víctor Hugo González · Portafolio Profesional
╚════════════════════════════════════════════════════════════╝

📋 CÓDIGO DE COTIZACIÓN: ${quote.quoteNumber}
📅 FECHA DE EMISIÓN: ${quote.createdAt}
⚡ ESTADO: ${quote.status === 'pending' ? 'EN REVISIÓN PRIORITARIA' : quote.status.toUpperCase()}
⏱️ TIEMPO ESTIMADO DE RESPUESTA: 2 a 4 Horas Hábiles

👤 DATOS DEL CLIENTE:
• Nombre: ${quote.clientName || 'Cliente'}
• Empresa: ${quote.clientCompany || 'Particular'}
• Contacto: ${quote.clientContact || 'No especificado'}

🎯 DETALLES DEL PROYECTO:
• Tipo: ${quote.projectType}
• Presupuesto: ${quote.budgetRange}
• Tiempo Deseado: ${quote.estimatedTimeline}

✨ SERVICIOS SOLICITADOS:
${quote.selectedServices.length > 0 ? quote.selectedServices.map(s => `  [✓] ${s}`).join('\n') : '  - Servicio general de diseño'}

🎨 REFERENCIAS DEL PORTAFOLIO:
${selectedProjectsData.length > 0 ? selectedProjectsData.map(p => `  • [Ref ${p.number}] ${p.title} (Cliente: ${p.client})`).join('\n') : '  - Referencias no especificadas'}

📝 NOTAS / ESPECIFICACIONES:
${quote.additionalNotes ? `"${quote.additionalNotes}"` : 'Sin notas adicionales'}

💬 MENSAJE DE RESPUESTA INMEDIATA DEL DISEÑADOR:
"¡Hola ${quote.clientName || 'estimado cliente'}! He recibido con éxito tu solicitud para ${quote.projectType}. Estoy evaluando tus requerimientos técnicos y en breve te contactaré con la propuesta formal detallada."

Diseñador: ${data.profile.name}
Email: ${data.profile.email} | WhatsApp: ${data.profile.phone}`;

  const handleCopyVoucher = async () => {
    try {
      await navigator.clipboard.writeText(voucherText);
      setCopied(true);
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.8 }
      });
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Error copying voucher:', err);
    }
  };

  // WhatsApp notification message specifically formatted for the designer
  const handleNotifyDesignerWhatsApp = () => {
    markDesignerNotified(quote.id);
    const clientStr = quote.clientName ? `${quote.clientName}${quote.clientCompany ? ` (${quote.clientCompany})` : ''}` : 'Nuevo Cliente';
    
    let msg = `🚨 *NUEVA SOLICITUD DE COTIZACIÓN RECIBIDA*\n`;
    msg += `🔖 *Código:* ${quote.quoteNumber}\n`;
    msg += `📅 *Fecha:* ${quote.createdAt}\n\n`;
    msg += `👤 *Cliente:* ${clientStr}\n`;
    msg += `📞 *Contacto:* ${quote.clientContact || 'Por definir'}\n`;
    msg += `🎨 *Tipo de Proyecto:* ${quote.projectType}\n`;
    msg += `💰 *Presupuesto:* ${quote.budgetRange}\n`;
    msg += `⏱️ *Tiempo Estimado:* ${quote.estimatedTimeline}\n\n`;
    
    if (quote.selectedServices.length > 0) {
      msg += `🛠️ *Servicios Solicitados:*\n`;
      quote.selectedServices.forEach(s => {
        msg += `  • ${s}\n`;
      });
      msg += `\n`;
    }
    
    if (selectedProjectsData.length > 0) {
      msg += `🖼️ *Referencias de Interés del Portafolio:*\n`;
      selectedProjectsData.forEach(p => {
        msg += `  • [Ref ${p.number}] ${p.title}\n`;
      });
      msg += `\n`;
    }
    
    if (quote.additionalNotes) {
      msg += `📝 *Observaciones del Cliente:*\n"${quote.additionalNotes}"\n\n`;
    }
    
    msg += `📌 *Acción requerida:* Preparar propuesta y contactar al cliente.`;

    const encoded = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${rawPhone}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleNotifyDesignerEmail = () => {
    markDesignerNotified(quote.id);
    const subject = encodeURIComponent(`[NUEVA COTIZACIÓN] #${quote.quoteNumber} - ${quote.clientName || 'Cliente'} (${quote.projectType})`);
    const body = encodeURIComponent(voucherText);
    const mailtoUrl = `mailto:${data.profile.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className={`relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border my-auto flex flex-col max-h-[92vh] transition-colors ${
          isDark 
            ? 'bg-[#10111a] text-white border-white/15' 
            : 'bg-white text-slate-900 border-slate-200 shadow-slate-900/20'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Success Accent */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-5 sm:p-6 text-white relative">
          <button
            id="close-auto-response-modal-x-btn"
            onClick={() => setIsAutoResponseModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4 pr-8">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-inner shrink-0">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/25 text-white text-[11px] font-bold uppercase tracking-wider mb-1.5">
                <Sparkles className="w-3 h-3" />
                Respuesta Inmediata Confirmada
              </div>
              <h2 className="text-lg sm:text-2xl font-black leading-tight">
                {tAuto.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/90 mt-1">
                {tAuto.subtitle}
              </p>
            </div>
          </div>

          {/* Quick Tracking Strip */}
          <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
              <span className="text-white/70 block text-[10px] uppercase tracking-wider font-semibold">
                {tAuto.officialQuoteNumber}
              </span>
              <span className="font-mono font-bold text-sm text-white tracking-wide">
                {quote.quoteNumber}
              </span>
            </div>

            <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
              <span className="text-white/70 block text-[10px] uppercase tracking-wider font-semibold">
                {tAuto.statusPending}
              </span>
              <span className="font-semibold text-xs text-emerald-200 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping inline-block" />
                Prioridad Alta
              </span>
            </div>

            <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
              <span className="text-white/70 block text-[10px] uppercase tracking-wider font-semibold">
                {tAuto.timeEstimateTitle}
              </span>
              <span className="font-bold text-xs text-white flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                {tAuto.timeEstimateValue}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 max-h-[58vh]">
          
          {/* Official Instant Letter from the Designer */}
          <div className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
            isDark 
              ? 'bg-white/5 border-pink-500/30' 
              : 'bg-pink-50/80 border-pink-200 shadow-xs'
          }`}>
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-pink-500/40 shrink-0">
                <img 
                  src={data.profile.avatarUrl} 
                  alt={data.profile.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <h4 className={`text-xs font-bold ${isDark ? 'text-pink-300' : 'text-pink-700'}`}>
                  {tAuto.designerNoticeTitle}
                </h4>
                <p className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  {data.profile.name} · {data.profile.title}
                </p>
              </div>
            </div>
            
            <p className={`text-xs sm:text-[13px] leading-relaxed italic ${
              isDark ? 'text-neutral-200' : 'text-slate-700'
            }`}>
              "{quote.autoResponseSummary || `¡Hola ${quote.clientName || 'estimado cliente'}! Tu solicitud para ${quote.projectType} ha sido registrada. He tomado nota de tus requerimientos y estoy preparando tu propuesta formal.`}"
            </p>
          </div>

          {/* Quick Summary Grid of Requirements */}
          <div className={`p-4 rounded-2xl border space-y-3 ${
            isDark ? 'bg-[#090a10] border-white/10' : 'bg-slate-50 border-slate-200'
          }`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              isDark ? 'text-neutral-300' : 'text-slate-700'
            }`}>
              <FileText className="w-3.5 h-3.5 text-pink-500" />
              {tAuto.summaryTitle}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className={`block font-semibold ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  {tAuto.clientLabel}:
                </span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {quote.clientName || 'Cliente'} {quote.clientCompany ? `(${quote.clientCompany})` : ''}
                </span>
              </div>

              <div>
                <span className={`block font-semibold ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  {tAuto.contactLabel}:
                </span>
                <span className={`font-medium ${isDark ? 'text-neutral-200' : 'text-slate-800'}`}>
                  {quote.clientContact || 'Por convenir'}
                </span>
              </div>

              <div>
                <span className={`block font-semibold ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  {tAuto.projectLabel}:
                </span>
                <span className={`font-bold ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>
                  {quote.projectType}
                </span>
              </div>

              <div>
                <span className={`block font-semibold ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  {tAuto.budgetLabel} / {tAuto.timelineLabel}:
                </span>
                <span className={`font-medium ${isDark ? 'text-neutral-200' : 'text-slate-800'}`}>
                  {quote.budgetRange} · {quote.estimatedTimeline}
                </span>
              </div>
            </div>

            {/* Selected Services Tags */}
            {quote.selectedServices.length > 0 && (
              <div className="pt-2 border-t border-white/5">
                <span className={`block text-[11px] font-semibold mb-1.5 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  {tAuto.servicesLabel}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quote.selectedServices.map((srv, idx) => (
                    <span 
                      key={idx}
                      className={`px-2.5 py-0.5 rounded-lg text-[11px] font-medium border ${
                        isDark 
                          ? 'bg-white/5 text-pink-300 border-pink-500/20' 
                          : 'bg-pink-50 text-pink-700 border-pink-200'
                      }`}
                    >
                      ✓ {srv}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Portfolio References */}
            {selectedProjectsData.length > 0 && (
              <div className="pt-2 border-t border-white/5">
                <span className={`block text-[11px] font-semibold mb-1.5 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  {tAuto.referencesLabel}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProjectsData.map((p) => (
                    <span 
                      key={p.id}
                      className={`px-2.5 py-0.5 rounded-lg text-[11px] font-medium border ${
                        isDark 
                          ? 'bg-white/5 text-neutral-300 border-white/10' 
                          : 'bg-white text-slate-800 border-slate-200'
                      }`}
                    >
                      [{p.number}] {p.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Call to Action: Notify Designer Directly */}
          <div className={`p-4 sm:p-5 rounded-2xl border ${
            isDark ? 'bg-gradient-to-b from-[#141522] to-[#0c0d15] border-white/10' : 'bg-slate-100 border-slate-300'
          }`}>
            <div className="flex items-center gap-2 mb-1.5">
              <Send className="w-4 h-4 text-emerald-500" />
              <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {tAuto.notifyDesignerSection}
              </h4>
            </div>
            <p className={`text-xs mb-3.5 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
              {tAuto.notifyDesignerDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                id="notify-designer-whatsapp-btn"
                onClick={handleNotifyDesignerWhatsApp}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30 transition-all active:scale-98 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{tAuto.notifyWhatsAppBtn}</span>
              </button>

              <button
                id="notify-designer-email-btn"
                onClick={handleNotifyDesignerEmail}
                className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold border transition-all active:scale-98 cursor-pointer ${
                  isDark 
                    ? 'bg-white/10 hover:bg-white/15 text-white border-white/15' 
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-2xs'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>{tAuto.notifyEmailBtn}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className={`p-4 sm:p-5 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isDark ? 'border-white/10 bg-[#090a10]' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Copy Receipt Button */}
            <button
              id="copy-voucher-btn"
              onClick={handleCopyVoucher}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white border-transparent'
                  : isDark
                    ? 'bg-white/10 hover:bg-white/15 text-white border-white/10'
                    : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-2xs'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>{tAuto.copiedVoucher}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{tAuto.copyVoucherBtn}</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              id="view-quotes-dashboard-from-auto-btn"
              onClick={() => {
                setIsAutoResponseModalOpen(false);
                setIsQuoteManagerOpen(true);
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-white/5 hover:bg-white/10 text-neutral-300 border-white/10' 
                  : 'bg-slate-200/70 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
            >
              <Inbox className="w-3.5 h-3.5" />
              <span>{tAuto.viewAllQuotesBtn}</span>
            </button>

            <button
              id="close-auto-response-btn"
              onClick={() => setIsAutoResponseModalOpen(false)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 py-2.5 px-5 bg-gradient-to-r from-pink-600 to-purple-600 hover:brightness-110 text-white rounded-xl text-xs font-bold shadow-md shadow-pink-600/30 transition-all active:scale-98 cursor-pointer"
            >
              <span>{tAuto.closeBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
