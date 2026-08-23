import { Language } from '../types';

export const translations = {
  es: {
    // Header & Global Top Bar
    header: {
      statusExp: '+20 años exp.',
      lightMode: 'Modo Claro',
      darkMode: 'Modo Oscuro',
      switchToLight: 'Cambiar a Modo Claro',
      switchToDark: 'Cambiar a Modo Oscuro',
      editorMode: 'Modo Editor',
      clientView: 'Vista Cliente',
      viewShort: 'Ver',
      brandTitle: 'Portafolio de Diseño Digital',
      brandSubtitle: 'Trabajos Emblemáticos & Cotizador',
      searchPlaceholder: 'Buscar por cliente, logo, poster...',
      searchTitle: 'Buscar en portafolio',
      editProfile: 'Editar Biografía y Perfil',
      newProject: 'Nuevo Trabajo',
      quoteBuilder: 'Cotizador',
      viewQuote: 'Ver Cotización',
      langSwitcher: 'Idioma',
      focusMode: 'Modo Enfoque',
      fullscreen: 'Pantalla Completa',
      exitFocusMode: 'Salir de Modo Enfoque',
      focusModeActive: 'Modo Enfoque Activado',
      focusModeHint: 'Presiona ESC para salir',
      focusModeSubtitle: 'Visualización inmersiva de proyectos sin distracciones',
      installApp: 'Instalar App (PWA)',
      installAppShort: 'Instalar App',
      installAppTooltip: 'Instalar en tu dispositivo para acceso rápido y offline',
      offlineActive: 'Modo Offline Activo',
      offlineDesc: 'Portafolio disponible sin internet gracias a Service Worker y LocalStorage'
    },
    // Curricular / Bento Hero Summary
    hero: {
      interactiveBadge: 'Portafolio Profesional Interactivo',
      designStudioUpper: 'ESTUDIO DE',
      designStudioLower: 'DISEÑO',
      stats: {
        experienceValue: '+20 Años',
        experienceLabel: 'Experiencia en Diseño Gráfico',
        teachingValue: '17 Años',
        teachingLabel: 'Docencia Universitaria',
        areasValue: '8 Áreas',
        areasLabel: 'Especialidades & Medios',
        interactiveValue: '100%',
        interactiveLabel: 'Editable e Interactivo'
      },
      ctaQuote: 'Crear Resumen de Cotización',
      hideResume: 'Ocultar Resumen Curricular',
      showResume: 'Ver Resumen Curricular & Docencia',
      editProfileBtn: 'Editar Datos del Perfil',
      academicTitle: 'Trayectoria Académica & Docente',
      modulesTitle: 'Módulos impartidos:',
      modulesList: ['Morfología', 'Historia del Diseño & Arte', 'Taller de Diseño', 'Infografía', 'Sistemas de Representación', 'Medios Impresos'],
      skillsTitle: 'Habilidades & Dominio Técnico',
      toolsTitle: 'Herramientas principales:',
      skillChartsBtn: 'Ver Gráficos de Habilidades',
      hideSkillChartsBtn: 'Ocultar Gráficos'
    },
    // Skill Charts & Analytics
    skillCharts: {
      title: 'Gráficos de Habilidades & Dominio Técnico',
      subtitle: 'Visualización interactiva de competencias, software y trayectoria profesional',
      badge: 'Métricas de Dominio',
      tabs: {
        radar: 'Radar de Competencias',
        software: 'Dominio de Software',
        distribution: 'Distribución por Especialidad',
        timeline: 'Línea de Trayectoria'
      },
      radar: {
        title: 'Radar de Competencias Visuales',
        description: 'Evaluación integral de 8 áreas fundamentales del diseño gráfico, metodología y producción.',
        levels: {
          expert: 'Maestría / Experto',
          advanced: 'Avanzado',
          proficient: 'Competente'
        },
        experienceTooltip: 'años de experiencia'
      },
      software: {
        title: 'Nivel de Dominio en Software & Herramientas',
        description: 'Herramientas de cabecera con flujo de trabajo profesional, atajos y optimización de pre-prensa.',
        seniority: 'Senior / Docente',
        masterLevel: 'Maestría',
        advancedLevel: 'Avanzado',
        yearsBadge: 'Años exp.'
      },
      distribution: {
        title: 'Distribución Histórica de Proyectos & Especialidades',
        description: 'Proporción de trabajos realizados en más de 20 años de producción profesional y académica.',
        totalProjects: '1,500+ Proyectos Realizados',
        teachingHours: '3,000+ Horas Cátedra',
        yearsExp: '20+ Años Carrera',
        clientSatisfaction: '100% Satisfacción'
      },
      timeline: {
        title: 'Hitos y Evolución de Carrera',
        description: 'Trayectoria cronológica en diseño gráfico, cátedra universitaria y dirección de arte.',
        milestones: [
          {
            year: '2004 - 2008',
            title: 'Inicios Profesionales & Formación Gráfica',
            desc: 'Graduación con honores y primeros desarrollos en diseño editorial, cartelería cultural y artes gráficas.'
          },
          {
            year: '2009 - Presente',
            title: 'Docencia Universitaria (17 Años)',
            desc: 'Cátedras de Morfología, Historia del Arte y el Diseño, Taller de Diseño, Infografía y Sistemas de Representación.'
          },
          {
            year: '2012 - 2018',
            title: 'Consolidación en Branding & Medios Impresos',
            desc: 'Dirección de identidad visual para decenas de marcas corporativas, cartelería de eventos masivos y diarios impresos.'
          },
          {
            year: '2019 - Presente',
            title: 'Diseño Web, Multimedia & Remoto Internacional',
            desc: 'Expansión hacia interfaces web interactivas, campañas multicanal, redes sociales y clientes internacionales.'
          }
        ]
      }
    },
    // Category Filter Bar
    categories: {
      all: 'Todos los Trabajos',
      allShort: 'Todos',
      activeFilter: 'Filtro Activo',
      showing: 'Mostrando',
      of: 'de',
      works: 'trabajos',
      items: {
        logos: {
          name: 'Diseño de Logos',
          shortName: 'Logos',
          description: 'Creación de imagotipos, isotipos y logotipos con personalidad única, síntesis gráfica memorable y total originalidad.'
        },
        identidad: {
          name: 'Identidad Visual Corporativa',
          shortName: 'Identidad',
          description: 'Desarrollo integral del sistema visual: aplicaciones en papelería, empaques, banners y presencia digital coherente.'
        },
        poster: {
          name: 'Diseño de Póster y Carteles',
          shortName: 'Pósters',
          description: 'Piezas de alto impacto visual para espectáculos artísticos, conciertos, obras teatrales y convocatorias institucionales.'
        },
        editorial: {
          name: 'Diseño Editorial & Publicaciones',
          shortName: 'Editorial',
          description: 'Maquetación y diagramación de folletos corporativos, catálogos desplegables, manuales y diarios periódicos.'
        },
        web: {
          name: 'Diseño Web & Multimedia',
          shortName: 'Web / Flyers',
          description: 'Interfaces web responsivas para e-commerce, material publicitario digital y flyers optimizados para conversión rápida.'
        },
        social: {
          name: 'Social Media & Banners',
          shortName: 'Redes Sociales',
          description: 'Campañas visuales para Instagram, Facebook, WhatsApp y plataformas web con formatos adaptados y alto poder de enganche.'
        },
        ilustracion: {
          name: 'Ilustración Digital',
          shortName: 'Ilustración',
          description: 'Creaciones artísticas digitales para bandas musicales, carátulas y publicaciones educativas con calidez humana.'
        },
        tarjeteria: {
          name: 'Tarjetería & Eventos',
          shortName: 'Tarjetería',
          description: 'Invitaciones personalizadas para ocasiones especiales (Baby Showers, Cumpleaños, Quinceañeros con temática)'
        }
      }
    },
    // Advanced Filters Panel
    advancedFilters: {
      title: 'Filtros Avanzados',
      buttonText: 'Filtros Avanzados',
      hideButtonText: 'Ocultar Filtros',
      activeBadge: 'activos',
      byYear: 'Año de Realización',
      allYears: 'Todos los Años',
      byTool: 'Herramienta / Técnica',
      allTools: 'Todas las Herramientas',
      byCategory: 'Especialidad / Categoría',
      allCategories: 'Todas las Categorías',
      clearAll: 'Limpiar Filtros',
      activeFiltersTitle: 'Filtros aplicados:',
      showingResults: 'Mostrando',
      ofProjects: 'proyectos filtrados',
      noMatchTitle: 'No hay proyectos que coincidan con estos filtros',
      noMatchDesc: 'Prueba cambiando el año seleccionado o la herramienta para ver más trabajos.',
      resetFilters: 'Restablecer todos los filtros',
      activeYear: 'Año',
      activeTool: 'Herramienta',
      activeCategory: 'Categoría',
      quickPresets: 'Atajos de filtrado:',
      presetRecent: 'Recientes (2022-2023)',
      presetIllustrator: 'Solo Illustrator',
      presetPhotoshop: 'Solo Photoshop',
      presetInDesign: 'Solo InDesign'
    },
    // Project Card
    card: {
      featuredBadge: 'Emblemático',
      viewDetails: 'Ver Detalle',
      client: 'Cliente',
      year: 'Año',
      tools: 'Herramientas',
      interestedStyle: 'Me interesa este estilo',
      selectedStyle: 'Seleccionado en mi cotización',
      edit: 'Editar',
      delete: 'Eliminar',
      confirmDelete: '¿Estás seguro de que deseas eliminar este proyecto?'
    },
    // Gallery Header & Banner
    gallery: {
      mainTitle: 'Trabajos Emblemáticos & Portafolio',
      searchResultsFor: 'Resultados para',
      clearSearch: 'Limpiar búsqueda',
      noResultsTitle: 'No se encontraron proyectos para esta búsqueda',
      noResultsDesc: 'Intenta con otras palabras clave como "logo", "afiche", "revista" o cambia la categoría.',
      viewAllProjects: 'Ver todos los proyectos',
      instructionsTitle: '¿Cómo solicitar una propuesta personalizada?',
      instructionsDesc: 'Haz clic en "Me interesa este estilo" en los trabajos que te gusten, luego presiona el botón "Generar Resumen" para copiar tu cotización formateada y enviarla por WhatsApp o Correo.',
      openQuoter: 'Abrir Cotizador'
    },
    // Project Detail Modal
    modal: {
      projectDetail: 'Detalle del Trabajo Seleccionado',
      conceptTitle: 'Concepto & Morfología Visual',
      deliverablesTitle: 'Entregables & Características Clave',
      toolsTitle: 'Herramientas / Software Utilizado',
      clientInstitution: 'Cliente / Institución',
      yearProduction: 'Año de Producción',
      category: 'Categoría',
      code: 'Código',
      close: 'Cerrar',
      includeInQuote: 'Incluir en mi Solicitud de Cotización',
      includedInQuote: 'Incluido en tu Selección de Cotización'
    },
    // Client Summary / Quotation Modal
    quoteModal: {
      title: 'Resumen Interactivo de Cotización',
      subtitle: 'Personaliza los datos de tu proyecto y envíalo listo formateado',
      clientInfoSection: '1. Información del Cliente o Empresa',
      clientNameLabel: 'Tu Nombre / Contacto',
      clientNamePlaceholder: 'Ej. María Pérez',
      companyLabel: 'Empresa / Emprendimiento',
      companyPlaceholder: 'Ej. Boutique Café & Co.',
      contactLabel: 'Teléfono / WhatsApp o Email',
      contactPlaceholder: 'Ej. +58 414 1234567 o email@empresa.com',
      projectTypeLabel: '2. Tipo de Proyecto Principal',
      selectedItemsSection: '3. Piezas Seleccionadas del Portafolio',
      noProjectsSelected: 'No has seleccionado proyectos aún. Puedes explorar la galería y marcar "Me interesa este estilo".',
      servicesSection: '4. Servicios Requeridos',
      budgetSection: '5. Rango de Presupuesto Estimado',
      timelineSection: '6. Tiempo Estimado de Entrega',
      notesSection: '7. Notas o Requerimientos Específicos',
      notesPlaceholder: 'Cuéntanos más sobre tu idea, colores preferidos, público objetivo o fecha límite...',
      copyBtn: 'Copiar Resumen',
      copiedBtn: '¡Copiado al Portapapeles!',
      whatsappBtn: 'Enviar por WhatsApp',
      emailBtn: 'Enviar por Correo',
      printBtn: 'Imprimir / Guardar PDF',
      closeBtn: 'Cerrar',
      submitAndNotifyBtn: 'Confirmar Solicitud & Recibir Respuesta Inmediata',
      instantResponseHint: 'Genera un acuse de recibo inmediato con código oficial y envía notificación directa al diseñador.',
      openManagerBtn: 'Ver Bandeja de Cotizaciones'
    },
    // Auto Response Modal (Respuesta Inmediata al Cliente)
    autoResponseModal: {
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
    },
    // Quote Manager / Dashboard (Gestión y Borrado de Solicitudes)
    quoteManager: {
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
    },
    // Floating WhatsApp Button
    whatsapp: {
      buttonLabel: 'Contactar por WhatsApp',
      close: 'Cerrar',
      available: 'Disponible para proyectos',
      selectedNotice: 'Tienes {count} trabajo(s) en tu lista',
      viewQuoter: 'Ver cotizador',
      quickTemplates: 'Mensajes Predefinidos Rápidos',
      messageToSend: 'Mensaje a Enviar',
      openChat: 'Abrir Chat en WhatsApp',
      openFullQuoter: 'Generar cotización detallada previa',
      templates: {
        general: {
          label: 'Consulta General',
          preview: 'Disponibilidad para nuevo proyecto',
          text: '¡Hola Víctor Hugo! Estuve revisando tu portafolio digital y me gustaría consultar tu disponibilidad para un nuevo proyecto de diseño gráfico.'
        },
        branding: {
          label: 'Logotipo & Branding',
          preview: 'Identidad visual y manual de marca',
          text: '¡Hola Víctor! Me interesa cotizar el diseño de un logotipo e identidad corporativa para mi emprendimiento/empresa. ¿Podrías darme información sobre el proceso y costos?'
        },
        editorial: {
          label: 'Editorial & Cartelería',
          preview: 'Revistas, catálogos o afiches',
          text: '¡Hola Víctor! Vi tus trabajos editoriales y carteles en el portafolio. Me gustaría cotizar la maquetación y diseño de una publicación / cartel cultural.'
        },
        web: {
          label: 'Diseño Web & Digital',
          preview: 'Páginas web y piezas para redes',
          text: '¡Hola Víctor! Deseo cotizar el diseño de una interfaz web responsiva y piezas gráficas para canales digitales.'
        }
      }
    },
    // Footer
    footer: {
      tagline: 'Soluciones visuales profesionales con más de dos décadas de excelencia en diseño gráfico e identidad de marca.',
      navigationTitle: 'Navegación Rápida',
      top: 'Ir al Inicio',
      portfolio: 'Portafolio de Trabajos',
      quote: 'Cotizador Interactivo',
      academic: 'Resumen Curricular',
      contactTitle: 'Contacto Directo',
      location: 'Maracaibo / Venezuela & Remoto Internacional',
      managementTitle: 'Gestión del Portafolio',
      exportJson: 'Exportar Respaldo JSON',
      importJson: 'Importar Datos JSON',
      resetDefaults: 'Restaurar Valores Originales',
      copyright: 'Todos los derechos reservados. Diseñado bajo estándares profesionales.'
    },
    // AI Assistant & Gemini Features
    ai: {
      assistantTitle: 'Víctor AI · Asistente de Diseño & Cotizaciones',
      assistantSubtitle: 'Potenciado con IA de Google Gemini para responder consultas, evaluar proyectos y generar briefs',
      badge: 'Gemini AI',
      quickButton: 'Asistente IA',
      quickTooltip: 'Consulta a Víctor AI sobre proyectos, cotizaciones o genera un brief',
      chatTab: '💬 Chat con Asistente',
      briefTab: '📋 Generador de Brief con IA',
      critiqueTab: '🧠 Análisis Crítico de Diseño',
      inputPlaceholder: 'Pregúntale a Víctor AI sobre sus trabajos, cotizaciones, preprensa...',
      send: 'Enviar',
      clearChat: 'Limpiar Conversación',
      thinking: 'Víctor AI está pensando...',
      suggestedPromptsTitle: 'Consultas Rápidas Recomendadas:',
      prompts: [
        '¿Qué proyectos de identidad corporativa ha realizado Víctor?',
        '¿Cuánto cuesta un paquete completo de identidad visual y qué incluye?',
        'Explícame la experiencia técnica de Víctor en preprensa y separación de color',
        '¿Cómo trabaja Víctor el diseño editorial y la tipografía para publicaciones?'
      ],
      brief: {
        title: 'Generador de Brief Creativo & Alcance con IA',
        description: 'Describe tu idea en pocas palabras y la IA estructurará un brief técnico profesional listo para cotizar.',
        clientLabel: 'Nombre de tu Empresa / Marca:',
        clientPlaceholder: 'Ej. Café Aromático, Startup Fintech...',
        ideaLabel: '¿En qué consiste tu proyecto o necesidad?:',
        ideaPlaceholder: 'Ej. Necesitamos lanzar una nueva marca de café gourmet con empaque ecológico y presencia en redes...',
        budgetLabel: 'Presupuesto Estimado / Expectativa (Opcional):',
        budgetPlaceholder: 'Ej. $10,000 - $15,000 MXN',
        generateBtn: 'Generar Brief con IA',
        generating: 'Generando Brief Estructurado con Gemini...',
        deliverablesTitle: 'Entregables Técnicos Sugeridos:',
        timelineTitle: 'Tiempo Estimado de Desarrollo:',
        methodologyTitle: 'Metodología de Trabajo de Víctor:',
        copyBrief: 'Copiar Brief',
        copied: '¡Copiado!',
        useInQuote: 'Aplicar a Cotizador'
      },
      critique: {
        button: 'Análisis Crítico con IA',
        analyzing: 'Analizando composición, retícula, cromatismo y pregnancia...',
        modalTitle: 'Evaluación Crítica & Conceptual con IA (Gemini)',
        score: 'Puntuación de Diseño',
        hierarchy: 'Jerarquía Visual & Composición',
        colorAndTypo: 'Colorimetría & Tipografía',
        impact: 'Impacto Comunicacional & Marca',
        technical: 'Aspectos Técnicos Destacados',
        takeaway: 'Conclusión Conceptual',
        close: 'Cerrar Análisis'
      },
      enhance: {
        button: 'Optimizar con IA',
        optimizing: 'Mejorando redacción y sugiriendo herramientas...',
        success: '¡Proyecto optimizado con Gemini!'
      }
    }
  },
  en: {
    // Header & Global Top Bar
    header: {
      statusExp: '+20 yrs exp.',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      switchToLight: 'Switch to Light Mode',
      switchToDark: 'Switch to Dark Mode',
      editorMode: 'Editor Mode',
      clientView: 'Client View',
      viewShort: 'View',
      brandTitle: 'Digital Design Portfolio',
      brandSubtitle: 'Flagship Works & Interactive Quote',
      searchPlaceholder: 'Search by client, logo, poster...',
      searchTitle: 'Search portfolio',
      editProfile: 'Edit Bio and Profile',
      newProject: 'New Project',
      quoteBuilder: 'Quote Builder',
      viewQuote: 'View Quote',
      langSwitcher: 'Language',
      focusMode: 'Focus Mode',
      fullscreen: 'Fullscreen View',
      exitFocusMode: 'Exit Focus Mode',
      focusModeActive: 'Focus Mode Active',
      focusModeHint: 'Press ESC to exit',
      focusModeSubtitle: 'Distraction-free immersive project gallery',
      installApp: 'Install App (PWA)',
      installAppShort: 'Install App',
      installAppTooltip: 'Install to your device for quick offline access',
      offlineActive: 'Offline Mode Active',
      offlineDesc: 'Portfolio fully accessible offline via Service Worker and LocalStorage'
    },
    // Curricular / Bento Hero Summary
    hero: {
      interactiveBadge: 'Interactive Professional Portfolio',
      designStudioUpper: 'STUDIO OF',
      designStudioLower: 'DESIGN',
      stats: {
        experienceValue: '+20 Years',
        experienceLabel: 'Graphic Design Experience',
        teachingValue: '17 Years',
        teachingLabel: 'University Professor',
        areasValue: '8 Areas',
        areasLabel: 'Specialties & Media Formats',
        interactiveValue: '100%',
        interactiveLabel: 'Editable & Interactive'
      },
      ctaQuote: 'Create Project Quote Summary',
      hideResume: 'Hide Academic Resume',
      showResume: 'View Academic Resume & Teaching',
      editProfileBtn: 'Edit Profile Data',
      academicTitle: 'Academic & Teaching Career',
      modulesTitle: 'Taught Modules & Courses:',
      modulesList: ['Morphology', 'History of Design & Art', 'Design Workshop', 'Infographics', 'Representation Systems', 'Print Media'],
      skillsTitle: 'Core Skills & Technical Mastery',
      toolsTitle: 'Primary Software & Tools:',
      skillChartsBtn: 'View Skill Charts',
      hideSkillChartsBtn: 'Hide Charts'
    },
    // Skill Charts & Analytics
    skillCharts: {
      title: 'Skills & Technical Mastery Charts',
      subtitle: 'Interactive visualization of competencies, software proficiency, and professional trajectory',
      badge: 'Mastery Metrics',
      tabs: {
        radar: 'Competency Radar',
        software: 'Software Proficiency',
        distribution: 'Specialty Distribution',
        timeline: 'Career Timeline'
      },
      radar: {
        title: 'Visual Competency Radar',
        description: 'Comprehensive evaluation of 8 core domains of graphic design, methodology, and print/digital production.',
        levels: {
          expert: 'Mastery / Expert',
          advanced: 'Advanced',
          proficient: 'Proficient'
        },
        experienceTooltip: 'years of experience'
      },
      software: {
        title: 'Software & Tools Mastery Level',
        description: 'Primary workflow suites with professional speed, prepress optimization, and advanced vector mastery.',
        seniority: 'Senior / Academic',
        masterLevel: 'Mastery',
        advancedLevel: 'Advanced',
        yearsBadge: 'Yrs exp.'
      },
      distribution: {
        title: 'Historical Projects & Specialty Distribution',
        description: 'Portfolio allocation across 20+ years of professional and academic design production.',
        totalProjects: '1,500+ Completed Projects',
        teachingHours: '3,000+ Lecture Hours',
        yearsExp: '20+ Career Years',
        clientSatisfaction: '100% Satisfaction'
      },
      timeline: {
        title: 'Career Milestones & Evolution',
        description: 'Chronological timeline of graphic design, university professorship, and art direction.',
        milestones: [
          {
            year: '2004 - 2008',
            title: 'Professional Foundations & Print Design',
            desc: 'Graduation with honors and initial career work in editorial design, cultural posters, and commercial printing.'
          },
          {
            year: '2009 - Present',
            title: 'University Professorship (17 Years)',
            desc: 'Academic chair teaching Morphology, History of Art and Design, Design Workshop, Infographics, and Representation Systems.'
          },
          {
            year: '2012 - 2018',
            title: 'Brand Identity & Commercial Print Media',
            desc: 'Art direction for corporate brand identity systems, major cultural event posters, and periodic newspaper publications.'
          },
          {
            year: '2019 - Present',
            title: 'Web Design, Multimedia & Worldwide Remote',
            desc: 'Expansion into responsive web interfaces, multichannel brand collateral, social media design, and international remote projects.'
          }
        ]
      }
    },
    // Category Filter Bar
    categories: {
      all: 'All Projects',
      allShort: 'All',
      activeFilter: 'Active Filter',
      showing: 'Showing',
      of: 'of',
      works: 'works',
      items: {
        logos: {
          name: 'Logo Design',
          shortName: 'Logos',
          description: 'Creation of imagotypes, isotypes, and logos with unique personality, memorable graphic synthesis, and complete originality.'
        },
        identidad: {
          name: 'Corporate Brand Identity',
          shortName: 'Identity',
          description: 'Comprehensive visual system design: corporate stationery, product packaging, signage, and consistent digital presence.'
        },
        poster: {
          name: 'Poster & Billboard Design',
          shortName: 'Posters',
          description: 'High-impact visual artworks for artistic performances, music concerts, theater plays, and cultural events.'
        },
        editorial: {
          name: 'Editorial & Publication Design',
          shortName: 'Editorial',
          description: 'Layout and typographical composition for corporate brochures, foldouts, product catalogs, and newspapers.'
        },
        web: {
          name: 'Web & Multimedia Design',
          shortName: 'Web / Flyers',
          description: 'Responsive web interfaces for e-commerce, digital advertising assets, and promotional flyers optimized for conversion.'
        },
        social: {
          name: 'Social Media & Banners',
          shortName: 'Social Media',
          description: 'Visual campaigns for Instagram, Facebook, WhatsApp, and digital banners with engaging high-retention formats.'
        },
        ilustracion: {
          name: 'Digital Illustration',
          shortName: 'Illustration',
          description: 'Digital artworks and vector character creations for musical albums, book covers, and educational literature.'
        },
        tarjeteria: {
          name: 'Stationery & Events',
          shortName: 'Stationery',
          description: 'Custom invitations and luxury event stationery for special occasions, anniversaries, and themed celebrations.'
        }
      }
    },
    // Advanced Filters Panel
    advancedFilters: {
      title: 'Advanced Filters',
      buttonText: 'Advanced Filters',
      hideButtonText: 'Hide Filters',
      activeBadge: 'active',
      byYear: 'Year of Execution',
      allYears: 'All Years',
      byTool: 'Tool / Technique',
      allTools: 'All Tools',
      byCategory: 'Specialty / Category',
      allCategories: 'All Categories',
      clearAll: 'Clear Filters',
      activeFiltersTitle: 'Active filters:',
      showingResults: 'Showing',
      ofProjects: 'filtered projects',
      noMatchTitle: 'No projects match these filters',
      noMatchDesc: 'Try adjusting the selected year or tool to view more works.',
      resetFilters: 'Reset all filters',
      activeYear: 'Year',
      activeTool: 'Tool',
      activeCategory: 'Category',
      quickPresets: 'Filter shortcuts:',
      presetRecent: 'Recent (2022-2023)',
      presetIllustrator: 'Illustrator Only',
      presetPhotoshop: 'Photoshop Only',
      presetInDesign: 'InDesign Only'
    },
    // Project Card
    card: {
      featuredBadge: 'Featured',
      viewDetails: 'View Details',
      client: 'Client',
      year: 'Year',
      tools: 'Tools',
      interestedStyle: 'Interested in this style',
      selectedStyle: 'Selected in my quote',
      edit: 'Edit',
      delete: 'Delete',
      confirmDelete: 'Are you sure you want to delete this project?'
    },
    // Gallery Header & Banner
    gallery: {
      mainTitle: 'Flagship Projects & Portfolio',
      searchResultsFor: 'Results for',
      clearSearch: 'Clear search',
      noResultsTitle: 'No projects found matching your search',
      noResultsDesc: 'Try different keywords such as "logo", "poster", "editorial" or switch categories.',
      viewAllProjects: 'View all projects',
      instructionsTitle: 'How to request a personalized proposal?',
      instructionsDesc: 'Click on "Interested in this style" on projects you like, then hit "Create Quote Summary" to copy your formatted brief and send it directly via WhatsApp or Email.',
      openQuoter: 'Open Quote Builder'
    },
    // Project Detail Modal
    modal: {
      projectDetail: 'Selected Project Details',
      conceptTitle: 'Visual Morphology & Concept',
      deliverablesTitle: 'Key Deliverables & Specifications',
      toolsTitle: 'Software & Tools Used',
      clientInstitution: 'Client / Organization',
      yearProduction: 'Production Year',
      category: 'Category',
      code: 'Code',
      close: 'Close',
      includeInQuote: 'Add to my Project Quotation',
      includedInQuote: 'Included in your Quote Request'
    },
    // Client Summary / Quotation Modal
    quoteModal: {
      title: 'Interactive Project Quote Builder',
      subtitle: 'Customize your project requirements and send a formatted brief directly',
      clientInfoSection: '1. Client or Company Information',
      clientNameLabel: 'Your Name / Contact Person',
      clientNamePlaceholder: 'e.g. Sarah Miller',
      companyLabel: 'Company / Brand Name',
      companyPlaceholder: 'e.g. Zenith Studio & Co.',
      contactLabel: 'Phone / WhatsApp or Email',
      contactPlaceholder: 'e.g. +1 555 123 4567 or contact@brand.com',
      projectTypeLabel: '2. Primary Project Type',
      selectedItemsSection: '3. Selected Portfolio References',
      noProjectsSelected: 'No projects selected yet. Explore the gallery and click "Interested in this style".',
      servicesSection: '4. Required Services',
      budgetSection: '5. Estimated Budget Range',
      timelineSection: '6. Expected Delivery Timeline',
      notesSection: '7. Specific Project Requirements & Notes',
      notesPlaceholder: 'Tell us more about your concept, preferred color schemes, target audience or deadlines...',
      copyBtn: 'Copy Brief Summary',
      copiedBtn: 'Copied to Clipboard!',
      whatsappBtn: 'Send via WhatsApp',
      emailBtn: 'Send via Email',
      printBtn: 'Print / Save as PDF',
      closeBtn: 'Close',
      submitAndNotifyBtn: 'Submit Request & Get Instant Auto-Response',
      instantResponseHint: 'Generates an official tracking voucher immediately and triggers direct notification to the designer.',
      openManagerBtn: 'View Quotes Dashboard'
    },
    // Auto Response Modal (Instant Client Response)
    autoResponseModal: {
      title: 'Quote Request Received Successfully!',
      subtitle: 'Your instant receipt and formal designer auto-response have been generated.',
      officialQuoteNumber: 'Official Quote #',
      issuedDate: 'Date & Time Issued',
      statusPending: 'Under Priority Review',
      timeEstimateTitle: 'Estimated Formal Response Time',
      timeEstimateValue: '2 to 4 Business Hours',
      designerNoticeTitle: 'Instant Message from Designer Víctor Hugo González:',
      summaryTitle: 'Summary of Received Requirements:',
      clientLabel: 'Client',
      companyLabel: 'Company / Brand',
      contactLabel: 'Contact Channel',
      projectLabel: 'Project',
      servicesLabel: 'Selected Services',
      referencesLabel: 'Reference Projects',
      budgetLabel: 'Budget',
      timelineLabel: 'Timeline',
      notesLabel: 'Notes',
      notifyDesignerSection: 'Notify Designer Víctor Hugo González:',
      notifyDesignerDesc: 'Send an immediate alert via WhatsApp or Email to fast-track your quotation:',
      notifyWhatsAppBtn: 'Send Notification via WhatsApp',
      notifyEmailBtn: 'Send Notification via Email',
      copyVoucherBtn: 'Copy Quotation Receipt',
      copiedVoucher: 'Receipt Copied!',
      viewAllQuotesBtn: 'View Quotes Dashboard',
      closeBtn: 'Got it & Close'
    },
    // Quote Manager / Dashboard (Management & Deletion)
    quoteManager: {
      title: 'Quote Requests Dashboard',
      subtitle: 'Manage, review, reply, and delete quote requests submitted by clients',
      filterAll: 'All',
      filterPending: 'Pending',
      filterResponded: 'Responded',
      filterApproved: 'Approved',
      totalCount: 'Total Quotes',
      newBadge: 'NEW',
      statusLabel: 'Status:',
      statusPending: 'Awaiting Response',
      statusResponded: 'Response Sent',
      statusApproved: 'Proposal Approved',
      statusArchived: 'Archived',
      designerNotified: 'Designer Notified',
      designerPending: 'Pending Notification',
      emptyTitle: 'No quote requests yet',
      emptyDesc: 'New quote requests submitted through the digital portfolio will automatically appear here.',
      deleteQuoteBtn: 'Delete Request',
      deleteConfirm: 'Are you sure you want to permanently delete this quote request?',
      clearAllBtn: 'Delete All Quotes',
      clearAllConfirm: 'Do you want to permanently delete ALL recorded quote requests?',
      copySummaryBtn: 'Copy Data',
      replyWhatsAppBtn: 'Reply on WhatsApp',
      replyEmailBtn: 'Reply via Email',
      markAsResponded: 'Mark as Responded',
      markAsApproved: 'Mark as Approved',
      markAsPending: 'Mark as Pending',
      closeBtn: 'Close Dashboard'
    },
    // Floating WhatsApp Button
    whatsapp: {
      buttonLabel: 'Contact via WhatsApp',
      close: 'Close',
      available: 'Available for new projects',
      selectedNotice: 'You have {count} project(s) in your list',
      viewQuoter: 'View quote builder',
      quickTemplates: 'Quick Predefined Messages',
      messageToSend: 'Message to Send',
      openChat: 'Open Chat in WhatsApp',
      openFullQuoter: 'Generate detailed quote brief first',
      templates: {
        general: {
          label: 'General Inquiry',
          preview: 'Availability for a new project',
          text: 'Hello Víctor Hugo! I reviewed your digital portfolio and would like to check your availability for a new graphic design project.'
        },
        branding: {
          label: 'Logo & Branding',
          preview: 'Visual identity & brand manual',
          text: 'Hello Víctor! I would like to get a quote for a logo design and corporate visual identity for my business. Could you share details on process and pricing?'
        },
        editorial: {
          label: 'Editorial & Posters',
          preview: 'Magazines, catalogs or posters',
          text: 'Hello Víctor! I saw your editorial and poster designs in your portfolio. I would like to quote the typography and layout for a publication / cultural poster.'
        },
        web: {
          label: 'Web & Digital Design',
          preview: 'Websites & social media banners',
          text: 'Hello Víctor! I would like to quote a responsive web interface and digital graphics for our brand.'
        }
      }
    },
    // Footer
    footer: {
      tagline: 'Professional visual solutions with over two decades of excellence in graphic design and brand identity.',
      navigationTitle: 'Quick Navigation',
      top: 'Back to Top',
      portfolio: 'Works Portfolio',
      quote: 'Interactive Quote Builder',
      academic: 'Academic Resume',
      contactTitle: 'Direct Contact',
      location: 'Maracaibo / Venezuela & Worldwide Remote',
      managementTitle: 'Portfolio Management',
      exportJson: 'Export Backup JSON',
      importJson: 'Import JSON Data',
      resetDefaults: 'Restore Original Defaults',
      copyright: 'All rights reserved. Designed to professional standards.'
    },
    // AI Assistant & Gemini Features
    ai: {
      assistantTitle: 'Víctor AI · Design & Quotation Assistant',
      assistantSubtitle: 'Powered by Google Gemini to answer questions, critique works, and generate briefs',
      badge: 'Gemini AI',
      quickButton: 'AI Assistant',
      quickTooltip: 'Ask Víctor AI about projects, quotes or generate a design brief',
      chatTab: '💬 Chat with Assistant',
      briefTab: '📋 AI Creative Brief Generator',
      critiqueTab: '🧠 Design Critique & Analysis',
      inputPlaceholder: 'Ask Víctor AI about projects, pricing, prepress techniques...',
      send: 'Send',
      clearChat: 'Clear Chat',
      thinking: 'Víctor AI is thinking...',
      suggestedPromptsTitle: 'Recommended Quick Inquiries:',
      prompts: [
        'What brand identity projects has Víctor completed?',
        'How much does a full brand identity package cost and what does it include?',
        'Explain Víctor\'s prepress expertise and color separation skills',
        'How does Víctor approach editorial design and typography for publications?'
      ],
      brief: {
        title: 'AI Creative Brief & Scope Generator',
        description: 'Describe your idea in a few words and AI will structure a production-grade brief ready for estimation.',
        clientLabel: 'Your Company / Brand Name:',
        clientPlaceholder: 'E.g., Artisan Coffee, Fintech Startup...',
        ideaLabel: 'What is your project idea or visual need?:',
        ideaPlaceholder: 'E.g., We need to launch a gourmet coffee brand with eco packaging and social media assets...',
        budgetLabel: 'Estimated Budget / Expectation (Optional):',
        budgetPlaceholder: 'E.g., $800 - $1,500 USD',
        generateBtn: 'Generate Brief with AI',
        generating: 'Structuring Creative Brief with Gemini...',
        deliverablesTitle: 'Recommended Technical Deliverables:',
        timelineTitle: 'Estimated Execution Timeline:',
        methodologyTitle: 'Víctor\'s Design Methodology:',
        copyBrief: 'Copy Brief',
        copied: 'Copied!',
        useInQuote: 'Apply to Quote'
      },
      critique: {
        button: 'AI Design Critique',
        analyzing: 'Analyzing visual hierarchy, layout grid, typography and brand strength...',
        modalTitle: 'Conceptual & Technical Design Critique (Gemini)',
        score: 'Design Score',
        hierarchy: 'Visual Hierarchy & Composition',
        colorAndTypo: 'Color Theory & Typography',
        impact: 'Brand & Communication Impact',
        technical: 'Key Technical Highlights',
        takeaway: 'Key Takeaway',
        close: 'Close Critique'
      },
      enhance: {
        button: 'Enhance with AI',
        optimizing: 'Refining description and suggesting tools...',
        success: 'Project enhanced with Gemini!'
      }
    }
  }
};
