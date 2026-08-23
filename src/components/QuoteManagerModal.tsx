import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  Trash2, 
  Inbox, 
  CheckCircle2, 
  Clock, 
  MessageCircle, 
  Mail, 
  Copy, 
  Check, 
  Search, 
  Filter, 
  Sparkles, 
  AlertTriangle, 
  ChevronDown, 
  Tag, 
  FileText, 
  Send,
  Building,
  User,
  Phone,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { QuoteRequest } from '../types';

export const QuoteManagerModal: React.FC = () => {
  const { 
    data, 
    quoteRequests, 
    deleteQuoteRequest, 
    clearAllQuoteRequests, 
    updateQuoteRequestStatus, 
    markDesignerNotified,
    isQuoteManagerOpen, 
    setIsQuoteManagerOpen, 
    themeMode, 
    language,
    t 
  } = usePortfolio();

  const isDark = themeMode === 'dark';
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  if (!isQuoteManagerOpen) return null;

  const tMgr = t.quoteManager || {
    title: 'Bandeja de Solicitudes de Cotización',
    subtitle: 'Administra, revisa, responde y elimina las cotizaciones solicitadas por clientes',
    filterAll: 'Todas',
    filterPending: 'Pendientes',
    filterResponded: 'Respondidas',
    filterApproved: 'Aprobadas',
    totalCount: 'Total Cotizaciones',
    newBadge: 'NUEVA',
    statusLabel: 'Estado:',
    statusPending: 'Pendiente de Respuesta',
    statusResponded: 'Respuesta Enviada',
    statusApproved: 'Propuesta Aprobada',
    statusArchived: 'Archivada',
    designerNotified: 'Diseñador Notificado',
    designerPending: 'Pendiente de Notificar',
    emptyTitle: 'No hay solicitudes de cotización',
    emptyDesc: 'Las nuevas cotizaciones solicitadas desde el portafolio aparecerán automáticamente aquí.',
    deleteQuoteBtn: 'Borrar Solicitud',
    deleteConfirm: '¿Estás seguro de que deseas borrar permanentemente esta solicitud de cotización?',
    clearAllBtn: 'Borrar Todas las Cotizaciones',
    clearAllConfirm: '¿Deseas eliminar permanentemente TODAS las solicitudes de cotización registradas?',
    copySummaryBtn: 'Copiar Datos',
    replyWhatsAppBtn: 'Responder por WhatsApp',
    replyEmailBtn: 'Responder por Correo',
    markAsResponded: 'Marcar como Respondida',
    markAsApproved: 'Marcar como Aprobada',
    markAsPending: 'Marcar como Pendiente',
    closeBtn: 'Cerrar Bandeja'
  };

  const filteredQuotes = quoteRequests.filter(q => {
    if (filterStatus !== 'all' && q.status !== filterStatus) return false;
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      q.quoteNumber.toLowerCase().includes(term) ||
      q.clientName.toLowerCase().includes(term) ||
      q.clientCompany.toLowerCase().includes(term) ||
      q.projectType.toLowerCase().includes(term) ||
      q.clientContact.toLowerCase().includes(term)
    );
  });

  const pendingCount = quoteRequests.filter(q => q.status === 'pending').length;

  const handleCopyQuote = async (quote: QuoteRequest) => {
    const selectedProjs = data.projects.filter(p => quote.selectedProjects.includes(p.id));
    let text = `📋 SOLICITUD #${quote.quoteNumber}\n`;
    text += `Cliente: ${quote.clientName || 'Cliente'} ${quote.clientCompany ? `(${quote.clientCompany})` : ''}\n`;
    text += `Contacto: ${quote.clientContact}\n`;
    text += `Proyecto: ${quote.projectType}\n`;
    text += `Presupuesto: ${quote.budgetRange} | Plazo: ${quote.estimatedTimeline}\n`;
    text += `Servicios: ${quote.selectedServices.join(', ')}\n`;
    if (selectedProjs.length > 0) {
      text += `Referencias: ${selectedProjs.map(p => `[${p.number}] ${p.title}`).join(', ')}\n`;
    }
    if (quote.additionalNotes) {
      text += `Notas: "${quote.additionalNotes}"\n`;
    }
    text += `Fecha: ${quote.createdAt}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(quote.id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch (err) {
      console.error('Error copying quote:', err);
    }
  };

  const handleWhatsAppReply = (quote: QuoteRequest) => {
    markDesignerNotified(quote.id);
    const clientPhone = quote.clientContact.replace(/[^0-9]/g, '');
    const targetPhone = clientPhone.length >= 8 ? clientPhone : data.profile.phone.replace(/[^0-9]/g, '');
    
    let msg = `¡Hola ${quote.clientName || 'estimado/a'}! Te saluda *Víctor Hugo González*, Diseñador Gráfico.\n\n`;
    msg += `He recibido con gusto tu solicitud de cotización *#${quote.quoteNumber}* para el proyecto de *${quote.projectType}*.\n\n`;
    msg += `He revisado tus requerimientos y tengo lista la propuesta técnico-conceptual ajustada a tu plazo de ${quote.estimatedTimeline} y presupuesto.\n\n`;
    msg += `¿Podemos conversar unos minutos por aquí para coordinar los detalles iniciales?`;

    const encoded = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${targetPhone}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleEmailReply = (quote: QuoteRequest) => {
    markDesignerNotified(quote.id);
    const subject = encodeURIComponent(`Propuesta de Diseño: ${quote.projectType} [Cotización #${quote.quoteNumber}]`);
    let body = `Hola ${quote.clientName || 'estimado cliente'},\n\n`;
    body += `Gracias por contactarme a través de mi portafolio digital.\n\n`;
    body += `He revisado detalladamente tu solicitud #${quote.quoteNumber} para el proyecto de "${quote.projectType}" y me complace adjuntar la propuesta técnica.\n\n`;
    body += `Atentamente,\n`;
    body += `${data.profile.name}\n${data.profile.title}\n${data.profile.phone} | ${data.profile.email}`;
    
    const mailtoUrl = `mailto:${quote.clientContact.includes('@') ? quote.clientContact : data.profile.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleDeleteWithConfirm = (quote: QuoteRequest) => {
    if (window.confirm(`${tMgr.deleteConfirm}\n\nCódigo: ${quote.quoteNumber}\nCliente: ${quote.clientName || 'Cliente'}`)) {
      deleteQuoteRequest(quote.id);
      setDeletingId(null);
    }
  };

  const handleClearAllWithConfirm = () => {
    if (window.confirm(`${tMgr.clearAllConfirm}\n\nSe eliminarán todas las ${quoteRequests.length} solicitudes registradas.`)) {
      clearAllQuoteRequests();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className={`relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border my-auto flex flex-col max-h-[92vh] transition-colors ${
          isDark 
            ? 'bg-[#10111a] text-white border-white/15' 
            : 'bg-white text-slate-900 border-slate-200 shadow-slate-900/20'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-5 sm:p-6 border-b flex items-center justify-between gap-4 ${
          isDark ? 'bg-[#090a10] border-white/10' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-gradient-to-tr from-pink-600 to-purple-600 rounded-2xl shadow-md shadow-pink-600/30 text-white">
              <Inbox className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className={`text-base sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {tMgr.title}
                </h2>
                {pendingCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-pink-600 text-white text-[11px] font-extrabold animate-pulse">
                    {pendingCount} {tMgr.filterPending.toLowerCase()}
                  </span>
                )}
              </div>
              <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                {tMgr.subtitle}
              </p>
            </div>
          </div>

          <button
            id="close-quote-manager-btn"
            onClick={() => setIsQuoteManagerOpen(false)}
            className={`p-2 rounded-full transition-colors ${
              isDark ? 'text-neutral-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
            }`}
            aria-label="Cerrar bandeja de cotizaciones"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Search, Filters, and Clear All */}
        <div className={`p-4 border-b flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isDark ? 'bg-[#0d0e17] border-white/10' : 'bg-slate-100/80 border-slate-200'
        }`}>
          {/* Search Box */}
          <div className={`relative flex items-center w-full sm:w-72 rounded-xl px-3 py-1.5 border text-xs ${
            isDark ? 'bg-[#151622] border-white/15' : 'bg-white border-slate-300'
          }`}>
            <Search className={`w-3.5 h-3.5 mr-2 shrink-0 ${isDark ? 'text-neutral-400' : 'text-slate-400'}`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por cliente, cotización..."
              className={`bg-transparent outline-none w-full ${
                isDark ? 'text-white placeholder:text-neutral-500' : 'text-slate-900 placeholder:text-slate-400'
              }`}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="text-neutral-400 hover:text-white p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: tMgr.filterAll, count: quoteRequests.length },
              { id: 'pending', label: tMgr.filterPending, count: quoteRequests.filter(q => q.status === 'pending').length },
              { id: 'responded', label: tMgr.filterResponded, count: quoteRequests.filter(q => q.status === 'responded').length },
              { id: 'approved', label: tMgr.filterApproved, count: quoteRequests.filter(q => q.status === 'approved').length },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  filterStatus === tab.id
                    ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-xs'
                    : isDark 
                      ? 'bg-white/5 text-neutral-300 hover:bg-white/10' 
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}

            {/* Clear All Action */}
            {quoteRequests.length > 0 && (
              <button
                id="clear-all-quotes-btn"
                onClick={handleClearAllWithConfirm}
                className={`ml-auto sm:ml-2 flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium transition-colors text-red-500 hover:bg-red-500/10 border border-red-500/20 cursor-pointer`}
                title={tMgr.clearAllBtn}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{tMgr.clearAllBtn}</span>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Quotes List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 max-h-[60vh]">
          {filteredQuotes.length === 0 ? (
            <div className={`p-12 text-center rounded-3xl border ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-pink-600/20 to-purple-600/20 flex items-center justify-center text-pink-500">
                <Inbox className="w-7 h-7" />
              </div>
              <h3 className={`text-base font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                {tMgr.emptyTitle}
              </h3>
              <p className={`text-xs max-w-sm mx-auto ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                {tMgr.emptyDesc}
              </p>
            </div>
          ) : (
            filteredQuotes.map(quote => {
              const selectedProjects = data.projects.filter(p => quote.selectedProjects.includes(p.id));
              const isDeleting = deletingId === quote.id;

              return (
                <div 
                  key={quote.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all relative ${
                    isDark 
                      ? 'bg-[#090a10] border-white/10 hover:border-pink-500/30 shadow-md shadow-black/40' 
                      : 'bg-white border-slate-200 hover:border-pink-300 shadow-sm'
                  }`}
                >
                  {/* Top Bar: Code, Date, Status, and Delete Action */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-white/5 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg bg-pink-600/20 text-pink-400 font-mono text-xs font-black tracking-wider border border-pink-500/30">
                        {quote.quoteNumber}
                      </span>
                      <span className={`text-[11px] font-medium ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                        {quote.createdAt}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Status Selector */}
                      <select
                        value={quote.status}
                        onChange={(e) => updateQuoteRequestStatus(quote.id, e.target.value as QuoteRequest['status'])}
                        className={`text-xs font-bold px-2.5 py-1 rounded-xl border focus:outline-none cursor-pointer ${
                          quote.status === 'pending'
                            ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                            : quote.status === 'responded'
                              ? 'bg-blue-500/15 border-blue-500/40 text-blue-300'
                              : quote.status === 'approved'
                                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                                : 'bg-neutral-500/15 border-neutral-500/40 text-neutral-300'
                        }`}
                      >
                        <option value="pending" className="bg-[#151622] text-white">⚡ {tMgr.statusPending}</option>
                        <option value="responded" className="bg-[#151622] text-white">✉️ {tMgr.statusResponded}</option>
                        <option value="approved" className="bg-[#151622] text-white">✓ {tMgr.statusApproved}</option>
                        <option value="archived" className="bg-[#151622] text-white">📁 {tMgr.statusArchived}</option>
                      </select>

                      {/* Delete Quote Button */}
                      <button
                        id={`delete-quote-${quote.id}-btn`}
                        onClick={() => handleDeleteWithConfirm(quote)}
                        className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
                        title={tMgr.deleteQuoteBtn}
                        aria-label={`Borrar cotización ${quote.quoteNumber}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Client & Project Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs mb-3.5">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                        <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {quote.clientName || 'Cliente No Identificado'}
                        </span>
                        {quote.clientCompany && (
                          <span className={`text-[11px] px-2 py-0.5 rounded-md border ${
                            isDark ? 'bg-white/5 border-white/10 text-neutral-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                          }`}>
                            {quote.clientCompany}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[11px]">
                        <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span className={`font-medium ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                          {quote.clientContact || 'Contacto no suministrado'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                          Proyecto:
                        </span>
                        <span className={`font-bold ${isDark ? 'text-pink-300' : 'text-pink-600'}`}>
                          {quote.projectType}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px]">
                        <span>
                          <span className={`font-medium ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Presupuesto: </span>
                          <strong className={isDark ? 'text-white' : 'text-slate-900'}>{quote.budgetRange}</strong>
                        </span>
                        <span>
                          <span className={`font-medium ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>Plazo: </span>
                          <strong className={isDark ? 'text-white' : 'text-slate-900'}>{quote.estimatedTimeline}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Services & References Chips */}
                  <div className="space-y-2 mb-3.5">
                    {quote.selectedServices.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                          Servicios:
                        </span>
                        {quote.selectedServices.map((srv, idx) => (
                          <span 
                            key={idx}
                            className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold border ${
                              isDark 
                                ? 'bg-pink-500/10 text-pink-300 border-pink-500/20' 
                                : 'bg-pink-50 text-pink-700 border-pink-200'
                            }`}
                          >
                            {srv}
                          </span>
                        ))}
                      </div>
                    )}

                    {selectedProjects.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                          Trabajos Portafolio:
                        </span>
                        {selectedProjects.map((p) => (
                          <span 
                            key={p.id}
                            className={`px-2 py-0.5 rounded-lg text-[10px] font-medium border ${
                              isDark 
                                ? 'bg-white/5 text-neutral-300 border-white/10' 
                                : 'bg-slate-100 text-slate-800 border-slate-200'
                            }`}
                          >
                            [{p.number}] {p.title}
                          </span>
                        ))}
                      </div>
                    )}

                    {quote.additionalNotes && (
                      <div className={`p-2.5 rounded-xl text-xs italic ${
                        isDark ? 'bg-white/5 text-neutral-300' : 'bg-slate-50 text-slate-700 border border-slate-200'
                      }`}>
                        "{quote.additionalNotes}"
                      </div>
                    )}
                  </div>

                  {/* Card Actions: Reply WhatsApp, Reply Email, Copy */}
                  <div className={`pt-3 border-t flex flex-wrap items-center justify-between gap-2 ${
                    isDark ? 'border-white/5' : 'border-slate-100'
                  }`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        id={`reply-whatsapp-${quote.id}-btn`}
                        onClick={() => handleWhatsAppReply(quote)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-xs shadow-emerald-600/20 transition-all cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>{tMgr.replyWhatsAppBtn}</span>
                      </button>

                      <button
                        id={`reply-email-${quote.id}-btn`}
                        onClick={() => handleEmailReply(quote)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          isDark 
                            ? 'bg-white/5 hover:bg-white/10 text-white border-white/10' 
                            : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-2xs'
                        }`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>{tMgr.replyEmailBtn}</span>
                      </button>
                    </div>

                    <button
                      id={`copy-quote-${quote.id}-btn`}
                      onClick={() => handleCopyQuote(quote)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold transition-colors ${
                        copiedId === quote.id
                          ? 'text-emerald-400 bg-emerald-500/10'
                          : isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {copiedId === quote.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{tMgr.copySummaryBtn}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className={`p-4 sm:p-5 border-t flex items-center justify-between gap-3 ${
          isDark ? 'border-white/10 bg-[#090a10]' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="text-xs text-neutral-400">
            <span>{quoteRequests.length} solicitudes almacenadas localmente</span>
          </div>

          <button
            id="close-quote-manager-footer-btn"
            onClick={() => setIsQuoteManagerOpen(false)}
            className="flex items-center gap-1.5 py-2 px-5 bg-gradient-to-r from-pink-600 to-purple-600 hover:brightness-110 text-white rounded-xl text-xs font-bold shadow-md shadow-pink-600/30 transition-all active:scale-98 cursor-pointer"
          >
            <span>{tMgr.closeBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
