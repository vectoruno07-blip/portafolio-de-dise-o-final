import { PortfolioData } from '../types';

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: 'Víctor Hugo González Pérez',
    title: 'Licenciado en Diseño Gráfico',
    subTitle: 'Estudio de Diseño Integral',
    bio: 'Diseñador gráfico con más de 20 años de experiencia, altas capacidades creativas y control avanzado en programas y herramientas de diseño. Experiencia de trabajo en formatos web y multimedios, cartelería, publicidad, periodístico e info-periodismo, editoriales y eventos de alcance nacional e internacional.',
    teachingExperience: 'Experiencia docente universitaria de 17 años en el área del diseño, periodismo y representación arquitectónica (Morfología, Historia del Diseño y el Arte, Taller de Diseño, Dibujo, Infografía y Sistemas de Representación).',
    skills: [
      'Identidad Corporativa & Branding',
      'Diseño de Logotipos & Monogramas',
      'Cartelería Cultural & Afiches de Eventos',
      'Diseño Editorial, Diarios & Revistas',
      'Diseño Web Responsivo & Multimedia',
      'Estrategia Gráfica para Redes Sociales',
      'Ilustración Digital 2D/3D',
      'Tarjetería & Papelería Social Especializada'
    ],
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'WordPress', 'Figma', 'Fotografía Digital'],
    email: 'vectoruno07@gmail.com',
    phone: '+58 412 3776428',
    location: 'Maracaibo / Venezuela & Remoto Internacional',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    customLogoUrl: '',
    experienceValue: '20+ Años',
    experienceLabel: 'Trayectoria Profesional',
    teachingValue: '17 Años',
    teachingLabel: 'Docencia Universitaria',
    areasValue: '8 Áreas',
    areasLabel: 'Especialidades Gráficas',
    interactiveValue: '100% Editable',
    interactiveLabel: 'Diseño Personalizable',
    showInteractiveBadge: true,
    showLogoText: true,
    logoFontFamily: 'GatsbyFLF',
    logoLine1: 'ESTUDIO DE',
    logoLine2: 'DISEÑO',
    coverCustomLogoUrl: '',
    coverShowLogoText: true,
    coverLogoLine1: 'ESTUDIO DE',
    coverLogoLine2: 'DISEÑO',
    coverLogoFontFamily: 'GatsbyFLF',
    coverLogoSize: 'xl',
    experienceBadgeText: '+20 años exp.',
    portfolioSectionTitle: 'Trabajos Emblemáticos & Portafolio',
    socialLinks: [
      { id: '1', name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
      { id: '2', name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
      { id: '3', name: 'Behance', url: 'https://behance.net', icon: 'behance' },
      { id: '4', name: 'Dribbble', url: 'https://dribbble.com', icon: 'dribbble' }
    ],
    instagramUrl: 'https://instagram.com',
    linkedinUrl: 'https://linkedin.com',
    behanceUrl: 'https://behance.net',
    dribbbleUrl: 'https://dribbble.com',
    githubUrl: ''
  },
  themeColor: 'magenta-blue',
  buttonColor: 'magenta',
  themeMode: 'dark',
  categories: [
    {
      id: 'logos',
      number: '01',
      name: 'Diseño de Logos',
      shortName: 'Logos',
      description: 'Creación de imagotipos, isotipos y logotipos con personalidad única, síntesis gráfica memorable y total originalidad.',
      iconName: 'Shapes'
    },
    {
      id: 'identidad',
      number: '02',
      name: 'Identidad Visual Corporativa',
      shortName: 'Identidad',
      description: 'Desarrollo integral del sistema visual: aplicaciones en papelería, empaques, banners y presencia digital coherente.',
      iconName: 'Building2'
    },
    {
      id: 'poster',
      number: '03',
      name: 'Diseño de Póster y Carteles',
      shortName: 'Pósters',
      description: 'Piezas de alto impacto visual para espectáculos artísticos, conciertos, obras teatrales y convocatorias institucionales.',
      iconName: 'Sparkles'
    },
    {
      id: 'editorial',
      number: '04',
      name: 'Diseño Editorial & Publicaciones',
      shortName: 'Editorial',
      description: 'Maquetación y diagramación de folletos corporativos, catálogos desplegables, manuales y diarios periódicos.',
      iconName: 'BookOpen'
    },
    {
      id: 'web',
      number: '05',
      name: 'Diseño Web & Multimedia',
      shortName: 'Web / Flyers',
      description: 'Interfaces web responsivas para e-commerce, material publicitario digital y flyers optimizados para conversión rápida.',
      iconName: 'Layout'
    },
    {
      id: 'social',
      number: '06',
      name: 'Social Media & Banners',
      shortName: 'Redes Sociales',
      description: 'Campañas visuales para Instagram, Facebook, WhatsApp y plataformas web con formatos adaptados y alto poder de enganche.',
      iconName: 'Share2'
    },
    {
      id: 'ilustracion',
      number: '07',
      name: 'Ilustración Digital',
      shortName: 'Ilustración',
      description: 'Creaciones artísticas digitales para bandas musicales, carátulas y publicaciones educativas con calidez humana.',
      iconName: 'Palette'
    },
    {
      id: 'tarjeteria',
      number: '08',
      name: 'Tarjetería & Eventos',
      shortName: 'Tarjetería',
      description: 'Invitaciones personalizadas para ocasiones especiales (Baby Showers, Cumpleaños, Quinceañeros con temática)',
      iconName: 'Gift'
    }
  ],
  projects: [
    // 01. LOGOS
    {
      id: 'logo-ubv',
      number: '01.1',
      title: 'Festival de la Voz Universitaria UBV',
      category: 'logos',
      client: 'Coordinación de Cultura UBV Zulia',
      year: '2019',
      description: 'Diseño de imagotipo institucional para el Festival de la Voz Universitaria. Estructura con cintas dinámicas tricolores que evocan ondas sonoras y movimiento coral.',
      tools: ['Illustrator', 'Identidad Institucional'],
      features: ['Síntesis dinámica', 'Versión monocromo y policromo', 'Aplicación en diploma y carteles'],
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80'
      ],
      featured: true
    },
    {
      id: 'logo-pio-pio',
      number: '01.2',
      title: 'Restaurante Asadero Pío Pío',
      category: 'logos',
      client: 'Asadero Pío Pío',
      year: '2020',
      description: 'Generación de imagotipo con tipografía personalizada y personaje caricaturesco con gran dinamismo para cadena gastronómica de pollo asado.',
      tools: ['Illustrator', 'Photoshop'],
      features: ['Mascota personalizada', 'Lettering expresivo', 'Alta recordación de marca'],
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
      featured: true
    },
    {
      id: 'logo-cachapa-burguer',
      number: '01.3',
      title: 'Cachapa Burguer - Comida Rápida',
      category: 'logos',
      client: 'Cachapa Burguer',
      year: '2021',
      description: 'Isologotipo gastronómico que fusiona la silueta de la mazorca de maíz autóctona con una hamburguesa gourmet en un sello moderno.',
      tools: ['Illustrator', 'Branding Gastronómico'],
      features: ['Fusión de conceptos visuales', 'Contraste cálido', 'Sello para uniformes y empaques'],
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
      featured: false
    },
    {
      id: 'logo-accesorios-ita',
      number: '01.4',
      title: 'Accesorios Ita - Joyería & Bisutería',
      category: 'logos',
      client: 'Accesorios Ita E-Commerce',
      year: '2022',
      description: 'Imagotipo con pétalos policromáticos estilizados y tipografía fluida caligráfica para marca de orfebrería y accesorios de autor.',
      tools: ['Illustrator', 'Vector Art'],
      features: ['Estilo orgánico floral', 'Monograma de alta elegancia', 'Versatilidad en empaques pequeños'],
      imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80',
      featured: true
    },
    {
      id: 'logo-vanessa-rodriguez',
      number: '01.5',
      title: 'Vanessa Rodríguez Estudio de Belleza',
      category: 'logos',
      client: 'Estudio Vanessa Rodríguez',
      year: '2022',
      description: 'Monograma lineal sofisticado que entrelaza la V y la R con curvas estilizadas evocando cabello, rostro y silueta femenina.',
      tools: ['Illustrator', 'Branding Premium'],
      features: ['Trazos continuos dorados', 'Tipografía serif refinada', 'Aplicación en vidrieras y toallas'],
      imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80',
      featured: false
    },

    // 02. IDENTIDAD VISUAL CORPORATIVA
    {
      id: 'identidad-ita-completa',
      number: '02.1',
      title: 'Sistema de Identidad Visual Accesorios Ita',
      category: 'identidad',
      client: 'Accesorios Ita',
      year: '2022',
      description: 'Manual integral de aplicaciones: versión de alto contraste en fondo kraft, banners para blog digital, porta zarcillos, porta cadenas y piezas para la colección "Flores y Azares".',
      tools: ['Illustrator', 'Photoshop', 'InDesign'],
      features: ['Diseño de empaques troquelados', 'Material para punto de venta', 'Plantillas para WhatsApp Business e Instagram'],
      imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
      ],
      featured: true
    },

    // 03. PÓSTERS Y CARTELES
    {
      id: 'poster-odila',
      number: '03.1',
      title: 'Afiche Concierto Educativo ODILA',
      category: 'poster',
      client: 'Orquesta de Instrumentos Latinoamericanos',
      year: '2018',
      description: 'Diseño y diagramación de afiche conmemorativo con partituras clásicas, cuatro venezolano, tambor tradicional y guacamaya tropical.',
      tools: ['Photoshop', 'Illustrator'],
      features: ['Composición rítmica', 'Retoque de instrumentos', 'Tipografía temática clásica'],
      imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
      featured: true
    },
    {
      id: 'poster-cultura-ubv',
      number: '03.2',
      title: 'Afiche Convocatoria Talleres de Cultura UBV',
      category: 'poster',
      client: 'Universidad Bolivariana de Venezuela',
      year: '2019',
      description: 'Cartel informativo para los núcleos de Música, Artes Escénicas, Artes Plásticas y Literatura con estética de arcilla y tradición cultural.',
      tools: ['Photoshop', 'Diagramación'],
      features: ['Texturas de tierra cocida', 'Jerarquía tipográfica para fechas', 'Formato afiche de pared'],
      imageUrl: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=800&auto=format&fit=crop&q=80',
      featured: false
    },
    {
      id: 'poster-danza-maracaibo',
      number: '03.3',
      title: 'Danza Contemporánea de Maracaibo',
      category: 'poster',
      client: 'Compañía Artística Danza Contemporánea',
      year: '2020',
      description: 'Campaña gráfica integral: cartel principal en alto contraste rojo/negro, programa de mano de actividades y sistema de boletos numerados.',
      tools: ['Photoshop', 'InDesign', 'Preprensa'],
      features: ['Tratamiento tipográfico de bloques', 'Fotografía de danza en suspensión', 'Sistema de boletería con código'],
      imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80',
      featured: true
    },
    {
      id: 'poster-senoras-maracaibo',
      number: '03.4',
      title: 'Obra Teatral "Señoras de Maracaibo" - Teatro Baralt',
      category: 'poster',
      client: 'Compañía de Teatro FUNDRAMA',
      year: '2021',
      description: 'Póster promocional emblemático con ornamentos de hierro forjado marabino, tonos verde oliva y dorado, homenaje a actores y boletería para el histórico Teatro Baralt.',
      tools: ['Photoshop', 'Ilustración Ornamental'],
      features: ['Tipografía barroca costumbrista', 'Composición escénica', 'Boletos para primera función'],
      imageUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&auto=format&fit=crop&q=80',
      featured: true
    },

    // 04. EDITORIAL
    {
      id: 'editorial-guerrero-gomez',
      number: '04.1',
      title: 'Publicación Electrónica & Carpeta Multiservicios Guerrero Gómez',
      category: 'editorial',
      client: 'Multiservicios Guerrero Gómez C.A.',
      year: '2020',
      description: 'Maquetación de oferta de servicios en formato digital e impreso con diseño corporativo industrial y tarjeta de presentación a juego.',
      tools: ['InDesign', 'Photoshop'],
      features: ['Estructura de catálogo de servicios', 'Gama cromática azul y amarilla', 'Tarjeta de presentación corporativa'],
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      featured: false
    },
    {
      id: 'editorial-longchamp',
      number: '04.2',
      title: 'Guía de Productos & Desplegable de Bolsillo Longchamp',
      category: 'editorial',
      client: 'Cosmética Longchamp',
      year: '2021',
      description: 'Diagramación de catálogo de mano y tríptico desplegable promocional de bolsillo con retícula de 3 columnas para líneas corporal, facial e infantil.',
      tools: ['InDesign', 'Preprensa Editorial'],
      features: ['Retícula limpia multisección', 'Tratamiento fotográfico de frascos', 'Plegado de bolsillo práctico'],
      imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
      featured: true
    },
    {
      id: 'editorial-semanario-cumana',
      number: '04.3',
      title: 'Semanario Periódico "Ciudad de Cumaná"',
      category: 'editorial',
      client: 'Ciudad de Cumaná - Edición Impresa',
      year: '2022',
      description: 'Diseño de rotulado de cabezal y maquetación de cuerpo de noticias, suplemento de alimentación y medicina natural.',
      tools: ['InDesign', 'Tipografía Periodística'],
      features: ['Logotipo del cabezal', 'Retícula modular de 4 y 5 columnas', 'Diagramación ágil para rotativas'],
      imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80',
      featured: false
    },

    // 05. WEB & FLYERS
    {
      id: 'web-rita-redacciones',
      number: '05.1',
      title: 'Diseño Web Responsivo - Rita Redacciones',
      category: 'web',
      client: 'Rita Redacciones E-commerce',
      year: '2022',
      description: 'Propuesta de diseño de interfaz web responsiva adaptada a escritorio, tableta y teléfono móvil con esquema de color cálido y sello de lacre distintivo.',
      tools: ['UI/UX', 'Photoshop', 'Illustrator'],
      features: ['Arquitectura responsive 3 dispositivos', 'Jerarquía de lectura clara', 'Formularios y call-to-action'],
      imageUrl: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&auto=format&fit=crop&q=80',
      featured: true
    },
    {
      id: 'flyer-bigpepitos',
      number: '05.2',
      title: 'Flyer Digital Móvil - BigPepitos',
      category: 'web',
      client: 'BigPepitos Comida Rápida',
      year: '2023',
      description: 'Flyer vertical de alta conversión diseñado especialmente para estados de WhatsApp y mensajería móvil promocionando Big Hamburguesa.',
      tools: ['Photoshop', 'Diseño Móvil'],
      features: ['Tipografías de gran impacto visual', 'Optimizado para pantalla de smartphone', 'Elementos de llamada a la acción directa'],
      imageUrl: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800&auto=format&fit=crop&q=80',
      featured: false
    },
    {
      id: 'flyer-viatoca-medellin',
      number: '05.3',
      title: 'Flyer Turístico "Conoce Medellín" - VIATOCA',
      category: 'web',
      client: 'Agencia de Viajes VIATOCA',
      year: '2023',
      description: 'Pieza promocional digital para WhatsApp y redes con fotografía nocturna de Medellín y tipografía vertical de gran escala.',
      tools: ['Photoshop', 'Composición'],
      features: ['Texto vertical impactante', 'Caja de precios destacada', 'Información de contacto directa'],
      imageUrl: 'https://images.unsplash.com/photo-1599388278287-195b001d9f8e?w=800&auto=format&fit=crop&q=80',
      featured: false
    },
    {
      id: 'flyer-timg-ecommerce',
      number: '05.4',
      title: 'Flyers de Maquinaria Gráfica - TIMG',
      category: 'web',
      client: 'TIMG Equipos & Suministros',
      year: '2022',
      description: 'Serie de flyers técnicos verticales para catálogo web de cabezales de impresión, estampadoras y laminadores térmicos.',
      tools: ['Illustrator', 'Diseño Técnico'],
      features: ['Tablas de especificaciones técnicas', 'Recortes de producto en alta resolución', 'Línea gráfica industrial'],
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80',
      featured: false
    },

    // 06. SOCIAL MEDIA
    {
      id: 'social-pio-pio-campana',
      number: '06.1',
      title: 'Campaña Multi-Plataforma "Con Auténtico Sabor Casero"',
      category: 'social',
      client: 'Restaurante Asadero Pío Pío',
      year: '2023',
      description: 'Generación de piezas publicitarias adaptadas simultáneamente para post cuadrado (Instagram/Facebook), historias verticales, banner horizontal de cabecera web y Twitter.',
      tools: ['Photoshop', 'Social Ads'],
      features: ['Fórmula apetitosa con foco en producto', 'Identidad cromática amarillo-rojo vibrante', 'Set completo de 5 formatos coordinados'],
      imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=800&auto=format&fit=crop&q=80',
      featured: true
    },

    // 07. ILUSTRACIÓN DIGITAL
    {
      id: 'ilustracion-nota-azul',
      number: '07.1',
      title: 'Ilustración Digital "La Nota Azul" - Banda de Jazz',
      category: 'ilustracion',
      client: 'Banda Local de Jazz La Nota Azul',
      year: '2021',
      description: 'Ilustración conceptual con silueta de saxofonista inmerso en una gigantesca nota musical texturizada en acuarela y tonos azules profundos.',
      tools: ['Photoshop', 'Pintura Digital'],
      features: ['Texturas de acuarela líquida', 'Composición tipográfica circular', 'Atmósfera nocturna bohemia'],
      imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=80',
      featured: true
    },
    {
      id: 'ilustracion-derechos-inj',
      number: '07.2',
      title: 'Ilustración Educativa "Carta de los Derechos Fundamentales"',
      category: 'ilustracion',
      client: 'Instituto Nacional de la Juventud (INJ)',
      year: '2022',
      description: 'Desarrollo de ilustraciones digitales infantiles y juveniles para publicación oficial de derechos humanos con arcoíris de banderas y lenguaje accesible.',
      tools: ['Illustrator', 'Ilustración Infantil'],
      features: ['Personajes diversos e inclusivos', 'Colores alegres y pedagógicos', 'Diseño de páginas interiores'],
      imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
      featured: false
    },

    // 08. TARJETERÍA
    {
      id: 'tarjeta-baby-shower-vicky',
      number: '08.1',
      title: 'Invitación Baby Shower ZUMBA - Victoria Sofía',
      category: 'tarjeteria',
      client: 'Familia González - Evento Social',
      year: '2022',
      description: 'Diseño festivo personalizado con temática deportiva ZUMBA, banderines rústicos, tipografía juguetona y formato listo para impresión y envío digital.',
      tools: ['Illustrator', 'Photoshop'],
      features: ['Banderines decorativos', 'Ilustración tierna de bebé', 'Formato dual papel y WhatsApp'],
      imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80',
      featured: false
    },
    {
      id: 'tarjeta-aloha-15',
      number: '08.2',
      title: 'Tarjeta Postal de Invitación "Aloha 15 Años"',
      category: 'tarjeteria',
      client: 'Celebración 15 Años',
      year: '2023',
      description: 'Tarjeta temática hawaiana estilo postal de viaje con estampilla vintage, cóctel de bienvenida de coco y diseño tropical caribeño.',
      tools: ['Illustrator', 'Photoshop'],
      features: ['Concepto de postal de recuerdos', 'Tipografía estilo sello postal', 'Detalles ilustrados de flores de hibisco'],
      imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      featured: true
    }
  ]
};
