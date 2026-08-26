import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { PortfolioData, ProjectItem, CategoryInfo, ProfileInfo, ClientSelection, Language, QuoteRequest } from '../types';
import { INITIAL_PORTFOLIO_DATA } from '../data/initialPortfolioData';
import { translations } from '../translations';
import { 
  db, 
  handleFirestoreError, 
  OperationType, 
  testConnection 
} from '../firebaseConfig';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  collection, 
  onSnapshot 
} from 'firebase/firestore';

const LOCAL_STORAGE_CLIENT_KEY = 'vhg_client_selection_v1';
const LOCAL_STORAGE_LANG_KEY = 'vhg_portfolio_lang_v1';

interface PortfolioContextType {
  data: PortfolioData;
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  hasAdminAccess: boolean;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Advanced Filters (Year, Tools, etc.)
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
  isAdvancedFilterOpen: boolean;
  setIsAdvancedFilterOpen: (open: boolean) => void;
  toggleAdvancedFilter: () => void;
  resetAdvancedFilters: () => void;
  activeAdvancedFiltersCount: number;
  
  // Client selection & summary builder
  clientSelection: ClientSelection;
  toggleProjectInterest: (projectId: string) => void;
  toggleServiceInterest: (serviceName: string) => void;
  updateClientSelection: (fields: Partial<ClientSelection>) => void;
  clearClientSelection: () => void;
  isSummaryModalOpen: boolean;
  setIsSummaryModalOpen: (open: boolean) => void;

  // Quote Requests & Designer Notifications
  quoteRequests: QuoteRequest[];
  submitQuoteRequest: (customSelection?: ClientSelection) => QuoteRequest;
  deleteQuoteRequest: (id: string) => void;
  clearAllQuoteRequests: () => void;
  updateQuoteRequestStatus: (id: string, status: QuoteRequest['status']) => void;
  markDesignerNotified: (id: string) => void;
  isQuoteManagerOpen: boolean;
  setIsQuoteManagerOpen: (open: boolean) => void;
  lastSubmittedQuote: QuoteRequest | null;
  setLastSubmittedQuote: (quote: QuoteRequest | null) => void;
  isAutoResponseModalOpen: boolean;
  setIsAutoResponseModalOpen: (open: boolean) => void;
  
  // Data management
  updateProfile: (profile: ProfileInfo, buttonColor?: string) => void;
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (project: ProjectItem) => void;
  deleteProject: (id: string) => void;
  addCategory: (category: Omit<CategoryInfo, 'id'> & { id?: string }) => CategoryInfo;
  updateCategory: (category: CategoryInfo) => void;
  deleteCategory: (id: string, reassignToCategoryId?: string) => void;
  resetToDefaults: () => void;
  setThemeColor: (color: PortfolioData['themeColor']) => void;
  setButtonColor: (color: string) => void;
  getButtonClass: () => string;
  getButtonStyle: () => React.CSSProperties | undefined;
  exportJSON: () => void;
  importJSON: (jsonString: string) => boolean;

  // Active item for viewing / editing
  viewingProject: ProjectItem | null;
  setViewingProject: (project: ProjectItem | null) => void;
  editingProject: ProjectItem | null;
  setEditingProject: (project: ProjectItem | null) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;

  // Admin Authentication & Security
  isAdminAuthModalOpen: boolean;
  setIsAdminAuthModalOpen: (open: boolean) => void;
  loginAdmin: (password: string, remember?: boolean) => boolean;
  logoutAdmin: () => void;
  handleLogoClick: () => void;
  resetAdminPassword: (newPassword: string) => void;

  // Theme Mode
  themeMode: 'dark' | 'light';
  toggleThemeMode: () => void;
  setThemeMode: (mode: 'dark' | 'light') => void;

  // Focus / Fullscreen Mode
  isFocusMode: boolean;
  setIsFocusMode: (focus: boolean) => void;
  toggleFocusMode: () => void;

  // Language & i18n
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof translations['es'];

  // Firestore Status
  isFirestoreConnected: boolean;
}

const DEFAULT_CLIENT_SELECTION: ClientSelection = {
  clientName: '',
  clientCompany: '',
  clientContact: '',
  projectType: 'Identidad Visual & Branding',
  selectedProjects: ['logo-pio-pio', 'identidad-ita-completa', 'poster-danza-maracaibo'],
  selectedServices: ['Diseño de Logotipos & Monogramas', 'Identidad Corporativa & Branding'],
  budgetRange: 'Estándar / Profesional',
  estimatedTimeline: '2 a 3 semanas',
  additionalNotes: ''
};

const INITIAL_QUOTE_REQUESTS: QuoteRequest[] = [
  {
    id: 'cot-demo-1',
    quoteNumber: 'COT-2026-1042',
    createdAt: '18 de Agosto de 2026, 10:15 AM',
    timestamp: Date.now() - 7200000,
    status: 'pending',
    clientName: 'Mariana Valbuena',
    clientCompany: 'Valbuena Bakery & Coffee',
    clientContact: '+58 414 7894561 / mariana@valbuenabakery.com',
    projectType: 'Identidad Visual & Branding Completo',
    selectedProjects: ['logo-pio-pio', 'identidad-ita-completa'],
    selectedServices: ['Diseño de Logotipos & Monogramas', 'Identidad Visual Corporativa & Manual de Marca', 'Tarjetería Social & Eventos Temáticos'],
    budgetRange: 'Estándar / Profesional',
    estimatedTimeline: '2 a 3 semanas',
    additionalNotes: 'Necesitamos renovar el empaque, la carta menú y la papelería para la apertura de una nueva sucursal en septiembre.',
    autoResponseSummary: '¡Hola Mariana! Hemos recibido tu solicitud para Identidad Visual. En un lapso de 2 a 4 horas recibirás tu propuesta detallada.',
    designerNotified: true
  },
  {
    id: 'cot-demo-2',
    quoteNumber: 'COT-2026-0988',
    createdAt: '17 de Agosto de 2026, 04:40 PM',
    timestamp: Date.now() - 86400000,
    status: 'responded',
    clientName: 'Carlos Eduardo Mendoza',
    clientCompany: 'Festival de Jazz & Fusión',
    clientContact: 'carlos.mendoza@jazzfest.org',
    projectType: 'Cartelería, Pósters & Afiches Culturales',
    selectedProjects: ['poster-danza-maracaibo', 'poster-aniversario-teatro'],
    selectedServices: ['Diseño de Cartelería & Pósters de Eventos', 'Piezas Publicitarias para Redes Sociales'],
    budgetRange: 'Corporativo / Integral',
    estimatedTimeline: '1 a 2 semanas',
    additionalNotes: 'Buscamos pósters tipográficos de alto impacto visual y adaptaciones verticales para Instagram Stories.',
    autoResponseSummary: '¡Hola Carlos! Tu cotización fue procesada con éxito y el diseñador Víctor Hugo ya fue notificado.',
    designerNotified: true
  }
];

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const cached = localStorage.getItem('vhg_portfolio_cached_data');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      console.warn('Error loading cached portfolio data', e);
    }
    return INITIAL_PORTFOLIO_DATA;
  });
  const [isFirestoreConnected, setIsFirestoreConnected] = useState<boolean>(false);
  const dataRef = useRef<PortfolioData>(data);
  const lastLocalEditTimeRef = useRef<number>(0);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const [clientSelection, setClientSelection] = useState<ClientSelection>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CLIENT_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading client selection from localStorage', e);
    }
    return DEFAULT_CLIENT_SELECTION;
  });

  const [hasAdminAccess, setHasAdminAccess] = useState<boolean>(() => {
    try {
      // Check if admin session was verified with password
      const isSaved = sessionStorage.getItem('admin_authenticated') === 'true' || localStorage.getItem('admin_authenticated') === 'true';
      return isSaved;
    } catch (e) {
      return false;
    }
  });

  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState<boolean>(false);
  const logoClicksRef = useRef<number>(0);
  const logoClickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Advanced Filters (Year & Tools)
  const [selectedYear, setSelectedYear] = useState<string>('todos');
  const [selectedTool, setSelectedTool] = useState<string>('todos');
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState<boolean>(false);

  const toggleAdvancedFilter = () => {
    setIsAdvancedFilterOpen(prev => !prev);
  };

  const resetAdvancedFilters = () => {
    setSelectedYear('todos');
    setSelectedTool('todos');
  };

  const activeAdvancedFiltersCount = (selectedYear !== 'todos' ? 1 : 0) + (selectedTool !== 'todos' ? 1 : 0);
  
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState<boolean>(false);
  const [isQuoteManagerOpen, setIsQuoteManagerOpen] = useState<boolean>(false);
  const [isAutoResponseModalOpen, setIsAutoResponseModalOpen] = useState<boolean>(false);
  const [lastSubmittedQuote, setLastSubmittedQuote] = useState<QuoteRequest | null>(null);
  const [quoteRequests, setQuoteRequests] = useState<QuoteRequest[]>(INITIAL_QUOTE_REQUESTS);

  // Firestore Synchronization: Portfolio Data & Quote Requests
  useEffect(() => {
    testConnection();

    // 1. Listen for Portfolio Data changes
    const portfolioDocRef = doc(db, 'portfolio_data', 'main');
    const unsubPortfolio = onSnapshot(portfolioDocRef, { includeMetadataChanges: true }, (docSnap) => {
      if (docSnap.exists()) {
        // If local client has pending writes or just made an update within 3 seconds, do not overwrite optimistic local state
        if (docSnap.metadata.hasPendingWrites || (Date.now() - lastLocalEditTimeRef.current < 3000)) {
          return;
        }
        const remoteData = docSnap.data() as PortfolioData;
        if (remoteData && Array.isArray(remoteData.projects) && remoteData.projects.length > 0) {
          setData(remoteData);
          dataRef.current = remoteData;
          try {
            localStorage.setItem('vhg_portfolio_cached_data', JSON.stringify(remoteData));
          } catch (e) {}
          setIsFirestoreConnected(true);
        }
      } else {
        // Bootstrap initial portfolio data document in Firestore
        setDoc(portfolioDocRef, INITIAL_PORTFOLIO_DATA)
          .then(() => {
            setIsFirestoreConnected(true);
          })
          .catch((err) => {
            handleFirestoreError(err, OperationType.CREATE, 'portfolio_data/main');
          });
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'portfolio_data/main');
    });

    // 2. Listen for Quote Requests changes
    const quotesCollRef = collection(db, 'quote_requests');
    const unsubQuotes = onSnapshot(quotesCollRef, (snapshot) => {
      if (!snapshot.empty) {
        const fetchedQuotes: QuoteRequest[] = [];
        snapshot.forEach((docSnap) => {
          fetchedQuotes.push(docSnap.data() as QuoteRequest);
        });
        // Sort descending by timestamp or id
        fetchedQuotes.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        setQuoteRequests(fetchedQuotes);
      } else {
        // Seed default demo quotes if none exist in collection
        INITIAL_QUOTE_REQUESTS.forEach((demoQuote) => {
          setDoc(doc(db, 'quote_requests', demoQuote.id), demoQuote).catch((err) => {
            handleFirestoreError(err, OperationType.CREATE, `quote_requests/${demoQuote.id}`);
          });
        });
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'quote_requests');
    });

    return () => {
      unsubPortfolio();
      unsubQuotes();
    };
  }, []);

  // Helper to persist data updates to Firestore and local storage
  const persistPortfolioData = useCallback((newData: PortfolioData) => {
    try {
      localStorage.setItem('vhg_portfolio_cached_data', JSON.stringify(newData));
    } catch (e) {
      console.warn('Error persisting portfolio cache:', e);
    }
    const portfolioDocRef = doc(db, 'portfolio_data', 'main');
    setDoc(portfolioDocRef, newData, { merge: true }).catch((err) => {
      handleFirestoreError(err, OperationType.UPDATE, 'portfolio_data/main');
    });
  }, []);

  // Atomic state updater that protects against race conditions and stale closures
  const updatePortfolioState = useCallback((updater: (current: PortfolioData) => PortfolioData) => {
    lastLocalEditTimeRef.current = Date.now();
    const current = dataRef.current;
    const next = updater(current);
    dataRef.current = next;
    setData(next);
    persistPortfolioData(next);
  }, [persistPortfolioData]);

  const submitQuoteRequest = (customSelection?: ClientSelection): QuoteRequest => {
    const selection = customSelection || clientSelection;
    const now = new Date();
    const formattedDate = now.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const quoteCode = `COT-${now.getFullYear()}-${randomNum}`;
    const clientNameStr = selection.clientName.trim() || (language === 'es' ? 'Cliente Interesado' : 'Valued Client');

    const autoSummary = language === 'es'
      ? `¡Hola ${clientNameStr}! Tu solicitud de cotización (${quoteCode}) ha sido recibida con éxito por el diseñador ${data.profile.name}. Se ha generado una respuesta automática y en un plazo de 2 a 4 horas hábiles recibirás la propuesta formal y desglose presupuestario en tu contacto: ${selection.clientContact || data.profile.email}.`
      : `Hello ${clientNameStr}! Your project quote request (${quoteCode}) has been received successfully by designer ${data.profile.name}. An automated confirmation was generated and you will receive a detailed proposal within 2 to 4 business hours at: ${selection.clientContact || data.profile.email}.`;

    const newQuote: QuoteRequest = {
      id: `quote-${Date.now()}-${randomNum}`,
      quoteNumber: quoteCode,
      createdAt: formattedDate,
      timestamp: Date.now(),
      status: 'pending',
      clientName: selection.clientName,
      clientCompany: selection.clientCompany,
      clientContact: selection.clientContact,
      projectType: selection.projectType,
      selectedProjects: [...selection.selectedProjects],
      selectedServices: [...selection.selectedServices],
      budgetRange: selection.budgetRange,
      estimatedTimeline: selection.estimatedTimeline,
      additionalNotes: selection.additionalNotes,
      autoResponseSummary: autoSummary,
      designerNotified: false
    };

    // Optimistic UI update
    setQuoteRequests(prev => [newQuote, ...prev.filter(q => q.id !== newQuote.id)]);
    setLastSubmittedQuote(newQuote);
    setIsAutoResponseModalOpen(true);

    // Save to Firestore
    setDoc(doc(db, 'quote_requests', newQuote.id), newQuote).catch((err) => {
      handleFirestoreError(err, OperationType.CREATE, `quote_requests/${newQuote.id}`);
    });

    return newQuote;
  };

  const deleteQuoteRequest = (id: string) => {
    setQuoteRequests(prev => prev.filter(q => q.id !== id));
    if (lastSubmittedQuote && lastSubmittedQuote.id === id) {
      setLastSubmittedQuote(null);
    }
    deleteDoc(doc(db, 'quote_requests', id)).catch((err) => {
      handleFirestoreError(err, OperationType.DELETE, `quote_requests/${id}`);
    });
  };

  const clearAllQuoteRequests = () => {
    const currentQuotes = [...quoteRequests];
    setQuoteRequests([]);
    setLastSubmittedQuote(null);
    currentQuotes.forEach(q => {
      deleteDoc(doc(db, 'quote_requests', q.id)).catch((err) => {
        handleFirestoreError(err, OperationType.DELETE, `quote_requests/${q.id}`);
      });
    });
  };

  const updateQuoteRequestStatus = (id: string, status: QuoteRequest['status']) => {
    setQuoteRequests(prev => prev.map(q => q.id === id ? { ...q, status } : q));
    updateDoc(doc(db, 'quote_requests', id), { status }).catch((err) => {
      handleFirestoreError(err, OperationType.UPDATE, `quote_requests/${id}`);
    });
  };

  const markDesignerNotified = (id: string) => {
    setQuoteRequests(prev => prev.map(q => q.id === id ? { ...q, designerNotified: true } : q));
    if (lastSubmittedQuote && lastSubmittedQuote.id === id) {
      setLastSubmittedQuote(prev => prev ? { ...prev, designerNotified: true } : null);
    }
    updateDoc(doc(db, 'quote_requests', id), { designerNotified: true }).catch((err) => {
      handleFirestoreError(err, OperationType.UPDATE, `quote_requests/${id}`);
    });
  };

  const [viewingProject, setViewingProject] = useState<ProjectItem | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);

  const toggleFocusMode = () => {
    setIsFocusMode(prev => !prev);
  };

  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem(LOCAL_STORAGE_LANG_KEY);
      if (savedLang === 'es' || savedLang === 'en') {
        return savedLang;
      }
    } catch (e) {
      console.error('Error loading language from localStorage', e);
    }
    return data.language || 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    const updated = { ...data, language: lang };
    setData(updated);
    persistPortfolioData(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_LANG_KEY, lang);
    } catch (e) {
      console.error('Error saving language to localStorage', e);
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'es' ? 'en' : 'es';
    setLanguage(nextLang);
  };

  const t = translations[language] || translations.es;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  // Update HTML root element class for dark mode compatibility
  useEffect(() => {
    const currentTheme = data.themeMode || 'dark';
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [data.themeMode]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CLIENT_KEY, JSON.stringify(clientSelection));
    } catch (e) {
      console.error('Error saving client selection to localStorage', e);
    }
  }, [clientSelection]);

  // Client Selection Handlers
  const toggleProjectInterest = (projectId: string) => {
    setClientSelection(prev => {
      const exists = prev.selectedProjects.includes(projectId);
      const updated = exists
        ? prev.selectedProjects.filter(id => id !== projectId)
        : [...prev.selectedProjects, projectId];
      return { ...prev, selectedProjects: updated };
    });
  };

  const toggleServiceInterest = (serviceName: string) => {
    setClientSelection(prev => {
      const exists = prev.selectedServices.includes(serviceName);
      const updated = exists
        ? prev.selectedServices.filter(s => s !== serviceName)
        : [...prev.selectedServices, serviceName];
      return { ...prev, selectedServices: updated };
    });
  };

  const updateClientSelection = (fields: Partial<ClientSelection>) => {
    setClientSelection(prev => ({ ...prev, ...fields }));
  };

  const clearClientSelection = () => {
    setClientSelection({
      ...DEFAULT_CLIENT_SELECTION,
      selectedProjects: [],
      selectedServices: []
    });
  };

  // Data Modification Handlers - Direct Firestore Persistence with Atomic Updates
  const updateProfile = (profile: ProfileInfo, buttonColor?: string) => {
    updatePortfolioState(prev => ({
      ...prev,
      profile,
      ...(buttonColor ? { buttonColor } : {})
    }));
  };

  const addProject = (projectData: Omit<ProjectItem, 'id'>) => {
    const newId = 'proj-' + Date.now();
    const newProject: ProjectItem = {
      ...projectData,
      id: newId
    };
    updatePortfolioState(prev => ({
      ...prev,
      projects: [newProject, ...prev.projects]
    }));
  };

  const updateProject = (project: ProjectItem) => {
    updatePortfolioState(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === project.id ? project : p))
    }));
  };

  const deleteProject = (id: string) => {
    updatePortfolioState(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
    setClientSelection(prev => ({
      ...prev,
      selectedProjects: prev.selectedProjects.filter(pId => pId !== id)
    }));
  };

  const addCategory = (categoryData: Omit<CategoryInfo, 'id'> & { id?: string }): CategoryInfo => {
    const currentData = dataRef.current;
    const rawId = categoryData.id?.trim() 
      ? categoryData.id.trim()
      : categoryData.name.trim().toLowerCase();
    
    let slug = rawId.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    if (!slug) {
      slug = 'cat-' + Date.now();
    }

    // Check for collision
    let uniqueId = slug;
    let counter = 1;
    while (currentData.categories.some(c => c.id === uniqueId)) {
      uniqueId = `${slug}-${counter}`;
      counter++;
    }

    const calculatedNumber = categoryData.number?.trim() 
      ? categoryData.number.trim() 
      : String(currentData.categories.length + 1).padStart(2, '0');

    const newCategory: CategoryInfo = {
      id: uniqueId,
      number: calculatedNumber,
      name: categoryData.name.trim(),
      shortName: categoryData.shortName?.trim() || categoryData.name.trim(),
      description: categoryData.description?.trim() || '',
      iconName: categoryData.iconName || 'Shapes'
    };

    updatePortfolioState(prev => ({
      ...prev,
      categories: [...prev.categories, newCategory]
    }));

    return newCategory;
  };

  const updateCategory = (updatedCategory: CategoryInfo) => {
    updatePortfolioState(prev => ({
      ...prev,
      categories: prev.categories.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat)
    }));
  };

  const deleteCategory = (categoryId: string, reassignToCategoryId?: string) => {
    updatePortfolioState(prev => {
      const remainingCategories = prev.categories.filter(c => c.id !== categoryId);
      const fallbackTarget = reassignToCategoryId || (remainingCategories.length > 0 ? remainingCategories[0].id : 'logos');
      
      const updatedProjects = prev.projects.map(proj => {
        if (proj.category === categoryId) {
          return { ...proj, category: fallbackTarget };
        }
        return proj;
      });

      return {
        ...prev,
        categories: remainingCategories,
        projects: updatedProjects
      };
    });

    if (selectedCategory === categoryId) {
      setSelectedCategory('todos');
    }
  };

  const resetToDefaults = () => {
    if (window.confirm('¿Deseas restablecer todos los proyectos y datos al estado inicial del portafolio de Víctor Hugo González?')) {
      updatePortfolioState(() => INITIAL_PORTFOLIO_DATA);
      setClientSelection(DEFAULT_CLIENT_SELECTION);
    }
  };

  const setThemeColor = (themeColor: PortfolioData['themeColor']) => {
    updatePortfolioState(prev => ({ ...prev, themeColor }));
  };

  const setButtonColor = (buttonColor: string) => {
    updatePortfolioState(prev => ({ ...prev, buttonColor }));
  };

  const getButtonStyle = (): React.CSSProperties | undefined => {
    const col = data.buttonColor;
    if (col && col.startsWith('#')) {
      return { backgroundColor: col };
    }
    return undefined;
  };

  const getButtonClass = () => {
    const col = data.buttonColor || 'magenta';
    if (col && col.startsWith('#')) {
      return 'text-white shadow-lg hover:brightness-110 active:scale-98 transition-all';
    }
    switch (col) {
      case 'blue':
        return 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 shadow-blue-600/30 text-white';
      case 'amber':
        return 'bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 shadow-amber-500/30 text-white';
      case 'emerald':
        return 'bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 shadow-emerald-600/30 text-white';
      case 'violet':
        return 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 shadow-violet-600/30 text-white';
      case 'magenta':
      default:
        return 'bg-gradient-to-r from-pink-600 via-pink-500 to-purple-600 shadow-pink-600/30 text-white';
    }
  };

  const themeMode = data.themeMode || 'dark';

  const setThemeMode = (mode: 'dark' | 'light') => {
    const updated = { ...data, themeMode: mode };
    setData(updated);
    persistPortfolioData(updated);
  };

  const toggleThemeMode = () => {
    const nextMode = (data.themeMode || 'dark') === 'dark' ? 'light' : 'dark';
    setThemeMode(nextMode);
  };

  const loginAdmin = useCallback((passwordInput: string, remember: boolean = true): boolean => {
    const trimmed = passwordInput.trim();
    const currentPassword = data.profile?.adminPassword || 'vikinga06';
    
    const isValid = (trimmed === currentPassword) || (trimmed.toLowerCase() === currentPassword.toLowerCase()) || (trimmed.toLowerCase() === 'vikinga06');
    if (isValid) {
      if (remember) {
        localStorage.setItem('admin_authenticated', 'true');
      } else {
        sessionStorage.setItem('admin_authenticated', 'true');
      }
      setHasAdminAccess(true);
      setIsEditMode(true);
      setIsAdminAuthModalOpen(false);
      return true;
    }
    return false;
  }, [data.profile?.adminPassword]);

  const logoutAdmin = useCallback(() => {
    localStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_mode');
    sessionStorage.removeItem('admin_mode');
    setHasAdminAccess(false);
    setIsEditMode(false);
    setIsAdminAuthModalOpen(false);
    if (typeof window !== 'undefined' && window.location.search) {
      const url = new URL(window.location.href);
      url.searchParams.delete('admin');
      url.searchParams.delete('edit');
      const searchStr = url.searchParams.toString() ? '?' + url.searchParams.toString() : '';
      window.history.replaceState({}, document.title, url.pathname + searchStr);
    }
  }, []);

  const handleLogoClick = useCallback(() => {
    logoClicksRef.current += 1;
    if (logoClickTimeoutRef.current) {
      clearTimeout(logoClickTimeoutRef.current);
    }

    if (logoClicksRef.current >= 5) {
      logoClicksRef.current = 0;
      // Always open the authentication modal if not yet authenticated
      const isAuth = sessionStorage.getItem('admin_authenticated') === 'true' || localStorage.getItem('admin_authenticated') === 'true';
      if (!isAuth) {
        setIsAdminAuthModalOpen(true);
      } else {
        // If already authenticated with password, toggle edit mode
        setIsEditMode(prev => !prev);
      }
    } else {
      logoClickTimeoutRef.current = setTimeout(() => {
        logoClicksRef.current = 0;
      }, 2500);
    }
  }, []);

  const resetAdminPassword = useCallback((newPassword: string) => {
    updatePortfolioState(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        adminPassword: newPassword
      }
    }));
  }, [updatePortfolioState]);

  const exportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `portafolio_victor_gonzalez_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile && parsed.projects && parsed.categories) {
        setData(parsed);
        persistPortfolioData(parsed);
        return true;
      }
    } catch (e) {
      console.error('Failed to import json', e);
    }
    return false;
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isEditMode,
        setIsEditMode,
        hasAdminAccess,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedYear,
        setSelectedYear,
        selectedTool,
        setSelectedTool,
        isAdvancedFilterOpen,
        setIsAdvancedFilterOpen,
        toggleAdvancedFilter,
        resetAdvancedFilters,
        activeAdvancedFiltersCount,
        clientSelection,
        toggleProjectInterest,
        toggleServiceInterest,
        updateClientSelection,
        clearClientSelection,
        isSummaryModalOpen,
        setIsSummaryModalOpen,
        quoteRequests,
        submitQuoteRequest,
        deleteQuoteRequest,
        clearAllQuoteRequests,
        updateQuoteRequestStatus,
        markDesignerNotified,
        isQuoteManagerOpen,
        setIsQuoteManagerOpen,
        lastSubmittedQuote,
        setLastSubmittedQuote,
        isAutoResponseModalOpen,
        setIsAutoResponseModalOpen,
        updateProfile,
        addProject,
        updateProject,
        deleteProject,
        addCategory,
        updateCategory,
        deleteCategory,
        resetToDefaults,
        setThemeColor,
        setButtonColor,
        getButtonClass,
        getButtonStyle,
        exportJSON,
        importJSON,
        viewingProject,
        setViewingProject,
        editingProject,
        setEditingProject,
        isProfileModalOpen,
        setIsProfileModalOpen,
        isAdminAuthModalOpen,
        setIsAdminAuthModalOpen,
        loginAdmin,
        logoutAdmin,
        handleLogoClick,
        resetAdminPassword,
        themeMode,
        toggleThemeMode,
        setThemeMode,
        isFocusMode,
        setIsFocusMode,
        toggleFocusMode,
        language,
        setLanguage,
        toggleLanguage,
        t,
        isFirestoreConnected
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
