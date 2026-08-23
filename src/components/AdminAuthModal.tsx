import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  ShieldCheck, 
  KeyRound, 
  Eye, 
  EyeOff, 
  X, 
  Lock, 
  Mail, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminAuthModal: React.FC = () => {
  const { 
    isAdminAuthModalOpen, 
    setIsAdminAuthModalOpen, 
    loginAdmin, 
    themeMode, 
    data,
    resetAdminPassword 
  } = usePortfolio();

  const isDark = themeMode === 'dark';
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'login' | 'recovery'>('login');

  // Recovery State
  const [recoveryEmailInput, setRecoveryEmailInput] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState(false);
  const [recoveryError, setRecoveryError] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [isResetStep, setIsResetStep] = useState(false);

  const registeredEmail = (data.profile.adminSecurityEmail || data.profile.email || 'vectoruno07@gmail.com').trim().toLowerCase();

  // Masked email for display (e.g. vec******07@gmail.com)
  const getMaskedEmail = (emailStr: string) => {
    const [user, domain] = emailStr.split('@');
    if (!domain) return emailStr;
    if (user.length <= 4) {
      return `${user[0]}***@${domain}`;
    }
    const start = user.slice(0, 3);
    const end = user.slice(-2);
    return `${start}******${end}@${domain}`;
  };

  useEffect(() => {
    if (isAdminAuthModalOpen) {
      setPassword('');
      setErrorMsg('');
      setActiveTab('login');
      setRecoverySuccess(false);
      setRecoveryError('');
      setRecoveryEmailInput('');
      setIsResetStep(false);
      setNewPasswordInput('');
      setConfirmPasswordInput('');
    }
  }, [isAdminAuthModalOpen]);

  if (!isAdminAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMsg('Por favor ingresa la clave de acceso.');
      return;
    }

    const success = loginAdmin(password.trim(), rememberDevice);
    if (!success) {
      setErrorMsg('Clave de acceso incorrecta. Inténtalo de nuevo.');
      setPassword('');
    }
  };

  const handleRecoveryEmailVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError('');

    const inputClean = recoveryEmailInput.trim().toLowerCase();
    if (!inputClean) {
      setRecoveryError('Por favor ingresa tu correo electrónico registrado.');
      return;
    }

    // Check if input matches registered admin email or fallback email
    if (inputClean === registeredEmail || inputClean === 'vectoruno07@gmail.com') {
      setIsResetStep(true);
      setRecoveryError('');
    } else {
      setRecoveryError('El correo ingresado no coincide con la cuenta del administrador.');
    }
  };

  const handleSetNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError('');

    if (newPasswordInput.length < 4) {
      setRecoveryError('La nueva clave debe tener al menos 4 caracteres.');
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      setRecoveryError('Las claves no coinciden.');
      return;
    }

    resetAdminPassword(newPasswordInput);
    setRecoverySuccess(true);
    setTimeout(() => {
      loginAdmin(newPasswordInput, true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 12 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className={`w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden ${
          isDark 
            ? 'bg-[#12131d] border-white/10 text-white' 
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header Decorator Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-pink-500 to-blue-500"></div>

        {/* Modal Top Bar */}
        <div className="p-6 pb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400/20 to-pink-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight flex items-center gap-2">
                <span>Panel de Seguridad</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/30">
                  Admin
                </span>
              </h3>
              <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                Víctor Hugo González &bull; Portafolio
              </p>
            </div>
          </div>

          <button
            id="close-admin-auth-btn"
            onClick={() => setIsAdminAuthModalOpen(false)}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isDark ? 'hover:bg-white/10 text-neutral-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-800'
            }`}
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 pt-2">
          <AnimatePresence mode="wait">
            {activeTab === 'login' ? (
              <motion.div
                key="login-tab"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.18 }}
              >
                <p className={`text-xs leading-relaxed mb-5 ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                  Ingresa tu clave de seguridad para activar las herramientas de edición, gestión de proyectos y personalización en tiempo real.
                </p>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                      Clave de Acceso
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <input
                        id="admin-password-input"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errorMsg) setErrorMsg('');
                        }}
                        placeholder="Ingresa tu clave..."
                        autoFocus
                        className={`w-full pl-10 pr-11 py-3 text-sm rounded-xl border transition-all focus:outline-hidden ${
                          errorMsg 
                            ? 'border-red-500 ring-2 ring-red-500/20' 
                            : isDark 
                              ? 'bg-white/5 border-white/15 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white' 
                              : 'bg-slate-50 border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-slate-900'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute inset-y-0 right-0 pr-3.5 flex items-center transition-colors cursor-pointer ${
                          isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'
                        }`}
                        title={showPassword ? 'Ocultar clave' : 'Mostrar clave'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}

                  {/* Options */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberDevice}
                        onChange={(e) => setRememberDevice(e.target.checked)}
                        className="rounded border-slate-400 text-amber-500 focus:ring-amber-400 cursor-pointer"
                      />
                      <span className={isDark ? 'text-neutral-300' : 'text-slate-600'}>
                        Recordar en este equipo
                      </span>
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('recovery');
                        setErrorMsg('');
                      }}
                      className="text-pink-500 hover:text-pink-400 font-semibold hover:underline cursor-pointer"
                    >
                      ¿Olvidaste tu clave?
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAdminAuthModalOpen(false)}
                      className={`w-1/2 py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        isDark 
                          ? 'border-white/10 text-neutral-300 hover:bg-white/5' 
                          : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      Cancelar
                    </button>

                    <button
                      id="submit-admin-auth-btn"
                      type="submit"
                      className="w-1/2 py-2.5 px-4 bg-gradient-to-r from-amber-400 via-pink-500 to-pink-600 hover:brightness-110 text-neutral-950 font-bold text-xs rounded-xl shadow-lg shadow-pink-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Ingresar</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="recovery-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.18 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-pink-500 mb-1">
                  <Mail className="w-4 h-4" />
                  <span>Recuperación de Seguridad</span>
                </div>

                {recoverySuccess ? (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
                    <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-emerald-400">
                      ¡Clave Actualizada con Éxito!
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                      Iniciando sesión en modo administrador automáticamente...
                    </p>
                  </div>
                ) : !isResetStep ? (
                  <form onSubmit={handleRecoveryEmailVerify} className="space-y-4">
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                      Para restablecer tu acceso, ingresa el correo registrado como administrador (<strong>{getMaskedEmail(registeredEmail)}</strong>):
                    </p>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                        Correo Electrónico de Seguridad
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          value={recoveryEmailInput}
                          onChange={(e) => {
                            setRecoveryEmailInput(e.target.value);
                            if (recoveryError) setRecoveryError('');
                          }}
                          placeholder="vectoruno07@gmail.com"
                          autoFocus
                          className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border transition-all focus:outline-hidden ${
                            recoveryError 
                              ? 'border-red-500 ring-2 ring-red-500/20' 
                              : isDark 
                                ? 'bg-white/5 border-white/15 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-white' 
                                : 'bg-slate-50 border-slate-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 text-slate-900'
                          }`}
                        />
                      </div>
                    </div>

                    {recoveryError && (
                      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{recoveryError}</span>
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('login');
                          setRecoveryError('');
                        }}
                        className={`flex items-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          isDark 
                            ? 'border-white/10 text-neutral-300 hover:bg-white/5' 
                            : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Volver</span>
                      </button>

                      <button
                        type="submit"
                        className="py-2.5 px-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:brightness-110 text-white font-bold text-xs rounded-xl shadow-lg shadow-pink-600/20 active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Verificar y Restablecer</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleSetNewPassword} className="space-y-4">
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                      Identidad confirmada. Escribe la nueva clave de acceso que deseas asignar a tu portafolio:
                    </p>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                        Nueva Clave
                      </label>
                      <input
                        type="password"
                        value={newPasswordInput}
                        onChange={(e) => setNewPasswordInput(e.target.value)}
                        placeholder="Mínimo 4 caracteres..."
                        autoFocus
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all focus:outline-hidden ${
                          isDark 
                            ? 'bg-white/5 border-white/15 focus:border-amber-400 text-white' 
                            : 'bg-slate-50 border-slate-300 focus:border-amber-500 text-slate-900'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                        Confirmar Nueva Clave
                      </label>
                      <input
                        type="password"
                        value={confirmPasswordInput}
                        onChange={(e) => setConfirmPasswordInput(e.target.value)}
                        placeholder="Repite la nueva clave..."
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all focus:outline-hidden ${
                          isDark 
                            ? 'bg-white/5 border-white/15 focus:border-amber-400 text-white' 
                            : 'bg-slate-50 border-slate-300 focus:border-amber-500 text-slate-900'
                        }`}
                      />
                    </div>

                    {recoveryError && (
                      <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{recoveryError}</span>
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setIsResetStep(false)}
                        className={`flex items-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          isDark 
                            ? 'border-white/10 text-neutral-300 hover:bg-white/5' 
                            : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Atrás</span>
                      </button>

                      <button
                        type="submit"
                        className="py-2.5 px-4 bg-gradient-to-r from-amber-400 to-pink-500 hover:brightness-110 text-neutral-950 font-bold text-xs rounded-xl shadow-lg shadow-pink-500/20 active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Guardar Clave</span>
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer info notice */}
        <div className={`px-6 py-3 border-t text-[11px] flex items-center justify-between ${
          isDark ? 'bg-white/3 border-white/10 text-neutral-400' : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}>
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Acceso rápido: 5 clics en el logotipo</span>
          </div>
          <span>v2.5 Seguro</span>
        </div>
      </motion.div>
    </div>
  );
};
