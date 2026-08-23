import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Radar, 
  Cpu, 
  PieChart, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Layers, 
  Palette, 
  Laptop, 
  GraduationCap, 
  Printer, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

interface RadarAxis {
  key: string;
  nameEs: string;
  nameEn: string;
  value: number; // 0 - 100
  experience: string;
  detailsEs: string;
  detailsEn: string;
  icon: React.ReactNode;
}

interface SoftwareSkill {
  name: string;
  level: number;
  years: number;
  category: 'adobe' | 'web' | 'academic' | 'print';
  masteryLabelEs: string;
  masteryLabelEn: string;
  color: string;
  iconColor: string;
  tagsEs: string[];
  tagsEn: string[];
  descriptionEs: string;
  descriptionEn: string;
}

const RADAR_AXES: RadarAxis[] = [
  {
    key: 'branding',
    nameEs: 'Identidad Corporativa & Branding',
    nameEn: 'Corporate Branding & Identity',
    value: 98,
    experience: '+20 Años',
    detailsEs: 'Diseño de logotipos, monogramas, manuales de normas y sistemas de identidad visual completos.',
    detailsEn: 'Logo design, monograms, brand standard manuals, and comprehensive visual systems.',
    icon: <Palette className="w-3.5 h-3.5" />
  },
  {
    key: 'typography',
    nameEs: 'Tipografía & Morfología',
    nameEn: 'Typography & Morphology',
    value: 96,
    experience: '17 Años Cátedra',
    detailsEs: 'Cátedra universitaria de morfología, estudio de forma, jerarquía y anatomía tipográfica.',
    detailsEn: 'University professorship in morphology, form theory, hierarchy, and font anatomy.',
    icon: <GraduationCap className="w-3.5 h-3.5" />
  },
  {
    key: 'editorial',
    nameEs: 'Diseño Editorial & Retículas',
    nameEn: 'Editorial Design & Grids',
    value: 95,
    experience: '18 Años',
    detailsEs: 'Maquetación de diarios periódicos, revistas, catálogos desplegables y publicaciones culturales.',
    detailsEn: 'Layout design for newspapers, magazines, foldout catalogs, and cultural publications.',
    icon: <Layers className="w-3.5 h-3.5" />
  },
  {
    key: 'posters',
    nameEs: 'Cartelería & Afiches Culturales',
    nameEn: 'Posters & Cultural Art',
    value: 94,
    experience: '+20 Años',
    detailsEs: 'Pósters de alto impacto para festivales artísticos, obras teatrales, orquestas y congresos.',
    detailsEn: 'High-impact posters for arts festivals, theater plays, orchestras, and conferences.',
    icon: <Sparkles className="w-3.5 h-3.5" />
  },
  {
    key: 'print',
    nameEs: 'Pre-prensa & Medios Impresos',
    nameEn: 'Prepress & Print Production',
    value: 99,
    experience: '+20 Años',
    detailsEs: 'Separación de color CMYK/Pantone, troqueles, barnices UV, tramado y artes finales.',
    detailsEn: 'CMYK/Pantone color separation, die-cuts, UV spot coating, halftones, and press prep.',
    icon: <Printer className="w-3.5 h-3.5" />
  },
  {
    key: 'infographics',
    nameEs: 'Infografía & Comunicación Visual',
    nameEn: 'Infographics & Data Visuals',
    value: 95,
    experience: '17 Años',
    detailsEs: 'Cátedra de infoperiodismo, síntesis visual de datos complejos y diagramas explicativos.',
    detailsEn: 'Infographic journalism teaching, complex data synthesis, and technical visual diagrams.',
    icon: <TrendingUp className="w-3.5 h-3.5" />
  },
  {
    key: 'illustration',
    nameEs: 'Ilustración & Vectorización',
    nameEn: 'Illustration & Vector Art',
    value: 92,
    experience: '15 Años',
    detailsEs: 'Ilustración digital 2D, portadas de discos, carátulas infantiles y arte estilizado.',
    detailsEn: '2D digital illustration, music album artwork, children covers, and stylized assets.',
    icon: <Palette className="w-3.5 h-3.5" />
  },
  {
    key: 'web_ui',
    nameEs: 'Diseño Web & Formatos Multimedia',
    nameEn: 'Web UI & Digital Multimedia',
    value: 88,
    experience: '10 Años',
    detailsEs: 'Interfaces web responsivas, landing pages, banners digitales y presencia para redes.',
    detailsEn: 'Responsive web interfaces, landing pages, digital banners, and social media kits.',
    icon: <Laptop className="w-3.5 h-3.5" />
  }
];

const SOFTWARE_SKILLS: SoftwareSkill[] = [
  {
    name: 'Adobe Illustrator',
    level: 98,
    years: 20,
    category: 'adobe',
    masteryLabelEs: 'Maestría / Experto',
    masteryLabelEn: 'Mastery / Expert',
    color: 'from-amber-500 to-orange-500',
    iconColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    tagsEs: ['Identidad Visual', 'Vectorial Avanzado', 'Cartelería', 'Troqueles'],
    tagsEn: ['Brand Identity', 'Advanced Vector', 'Posters', 'Die-Cuts'],
    descriptionEs: 'Herramienta insignia para creación de logotipos, monogramas vectoriales, afiches y empaques.',
    descriptionEn: 'Core tool for logo design, vector monograms, event posters, and packaging systems.'
  },
  {
    name: 'Adobe Photoshop',
    level: 96,
    years: 20,
    category: 'adobe',
    masteryLabelEs: 'Maestría / Experto',
    masteryLabelEn: 'Mastery / Expert',
    color: 'from-blue-500 to-cyan-500',
    iconColor: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    tagsEs: ['Retoque Digital', 'Fotomontaje', 'Banners Web', 'Efectos Visuales'],
    tagsEn: ['Photo Retouching', 'Photomontage', 'Web Banners', 'Visual FX'],
    descriptionEs: 'Edición y postproducción fotográfica, fotomontajes artísticos y piezas gráficas digitales.',
    descriptionEn: 'High-end photo editing, artistic photomontages, and digital advertising graphics.'
  },
  {
    name: 'Adobe InDesign',
    level: 95,
    years: 18,
    category: 'adobe',
    masteryLabelEs: 'Maestría / Experto',
    masteryLabelEn: 'Mastery / Expert',
    color: 'from-pink-500 to-rose-500',
    iconColor: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
    tagsEs: ['Maquetación', 'Revistas & Diarios', 'Catálogos', 'Retículas'],
    tagsEn: ['Editorial Layout', 'Magazines & Press', 'Catalogs', 'Grid Systems'],
    descriptionEs: 'Diagramación de publicaciones periódicas, revistas corporativas y manuales extensos.',
    descriptionEn: 'Layout and typography for periodical press, corporate magazines, and brand manuals.'
  },
  {
    name: 'Pre-prensa & Artes Finales (CMYK / Pantone)',
    level: 99,
    years: 20,
    category: 'print',
    masteryLabelEs: 'Especialista Máster',
    masteryLabelEn: 'Master Specialist',
    color: 'from-emerald-500 to-teal-500',
    iconColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    tagsEs: ['Separación de Color', 'Ganancia de Punto', 'Barniz Reserva', 'Planchas'],
    tagsEn: ['Color Separation', 'Dot Gain Control', 'Spot UV Varnish', 'Printing Plates'],
    descriptionEs: 'Control milimétrico para imprenta offset, serigrafía y gran formato sin errores de impresión.',
    descriptionEn: 'Precise technical output for offset, screen-print, and large format without printing defects.'
  },
  {
    name: 'WordPress & Web Layout',
    level: 88,
    years: 10,
    category: 'web',
    masteryLabelEs: 'Avanzado',
    masteryLabelEn: 'Advanced',
    color: 'from-indigo-500 to-blue-500',
    iconColor: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
    tagsEs: ['Diseño Responsivo', 'E-commerce', 'Landing Pages', 'Optimización'],
    tagsEn: ['Responsive Design', 'E-commerce', 'Landing Pages', 'Optimization'],
    descriptionEs: 'Estructuración de sitios corporativos, catálogos online y páginas de captura optimizadas.',
    descriptionEn: 'Creation of corporate web layouts, online product catalogs, and optimized landing pages.'
  },
  {
    name: 'Figma & UI Kits',
    level: 86,
    years: 5,
    category: 'web',
    masteryLabelEs: 'Avanzado',
    masteryLabelEn: 'Advanced',
    color: 'from-purple-500 to-pink-500',
    iconColor: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
    tagsEs: ['Wireframing', 'Prototipos', 'Design Systems', 'Componentes UI'],
    tagsEn: ['Wireframing', 'Prototypes', 'Design Systems', 'UI Components'],
    descriptionEs: 'Prototipado interactivo y sistemas de diseño para aplicaciones web y móviles.',
    descriptionEn: 'Interactive prototyping and design systems for web and mobile digital experiences.'
  },
  {
    name: 'Infografía & Sistemas de Representación',
    level: 96,
    years: 17,
    category: 'academic',
    masteryLabelEs: 'Docente Titular',
    masteryLabelEn: 'Senior Professor',
    color: 'from-amber-400 to-yellow-500',
    iconColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    tagsEs: ['Cátedra Universitaria', 'Síntesis Visual', 'Morfología', 'Didáctica'],
    tagsEn: ['University Chair', 'Visual Synthesis', 'Morphology', 'Pedagogy'],
    descriptionEs: '17 años de formación de nuevas generaciones en diseño, morfología y lenguaje visual.',
    descriptionEn: '17 years training new generations in visual morphology, design theory, and visual communication.'
  }
];

const CATEGORY_DISTRIBUTION = [
  { id: 'logos', nameEs: 'Logotipos & Imagotipos', nameEn: 'Logos & Monograms', share: 32, color: 'bg-amber-500', text: 'text-amber-400', count: 480 },
  { id: 'identidad', nameEs: 'Identidad Corporativa', nameEn: 'Corporate Identity', share: 24, color: 'bg-pink-500', text: 'text-pink-400', count: 360 },
  { id: 'poster', nameEs: 'Cartelería Cultural & Eventos', nameEn: 'Cultural Posters & Events', share: 18, color: 'bg-purple-500', text: 'text-purple-400', count: 270 },
  { id: 'editorial', nameEs: 'Diseño Editorial & Publicaciones', nameEn: 'Editorial & Publications', share: 14, color: 'bg-blue-500', text: 'text-blue-400', count: 210 },
  { id: 'web_social', nameEs: 'Web, Social Media & Flyers', nameEn: 'Web, Social Media & Flyers', share: 8, color: 'bg-emerald-500', text: 'text-emerald-400', count: 120 },
  { id: 'ilustracion', nameEs: 'Ilustración & Tarjetería', nameEn: 'Illustration & Stationery', share: 4, color: 'bg-cyan-500', text: 'text-cyan-400', count: 60 }
];

export const SkillCharts: React.FC = () => {
  const { themeMode, language, t } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'radar' | 'software' | 'distribution' | 'timeline'>('radar');
  const [hoveredAxis, setHoveredAxis] = useState<RadarAxis | null>(null);
  const [softwareCategory, setSoftwareCategory] = useState<'all' | 'adobe' | 'web' | 'print' | 'academic'>('all');
  
  const isDark = themeMode === 'dark';
  const isEs = language === 'es';

  // Radar geometry calculations
  const size = 320;
  const center = size / 2;
  const radius = size * 0.38;
  const totalAxes = RADAR_AXES.length;

  const getCoordinates = (index: number, valueRatio: number) => {
    const angle = (index * 2 * Math.PI) / totalAxes - Math.PI / 2;
    const r = radius * valueRatio;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  // Polygon points for radar area
  const radarPolygonPoints = RADAR_AXES.map((axis, i) => {
    const coords = getCoordinates(i, axis.value / 100);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  const filteredSoftware = softwareCategory === 'all' 
    ? SOFTWARE_SKILLS 
    : SOFTWARE_SKILLS.filter(s => s.category === softwareCategory);

  return (
    <div className={`w-full rounded-3xl border p-5 sm:p-7 backdrop-blur-xl shadow-2xl transition-all ${
      isDark 
        ? 'bg-[#10111a]/95 border-white/10 shadow-black/40' 
        : 'bg-white/95 border-slate-200 shadow-slate-200/70'
    }`}>
      {/* Header with Title and Mode Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 border ${
              isDark ? 'bg-pink-500/10 border-pink-500/30 text-pink-400' : 'bg-pink-50 border-pink-200 text-pink-700'
            }`}>
              <Sparkles className="w-3 h-3 text-pink-500" />
              {t.skillCharts.badge}
            </span>
            <span className={`text-xs font-semibold ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
              +20 {isEs ? 'Años de Trayectoria' : 'Years Track Record'}
            </span>
          </div>
          <h3 className={`text-lg sm:text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {t.skillCharts.title}
          </h3>
          <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
            {t.skillCharts.subtitle}
          </p>
        </div>

        {/* Tab Navigation Pill Group */}
        <div className={`flex flex-wrap p-1 rounded-2xl border self-start md:self-auto ${
          isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            id="tab-skill-radar"
            onClick={() => setActiveTab('radar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'radar'
                ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-md shadow-pink-600/30'
                : isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Radar className="w-3.5 h-3.5" />
            <span>{t.skillCharts.tabs.radar}</span>
          </button>

          <button
            id="tab-skill-software"
            onClick={() => setActiveTab('software')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'software'
                ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-md shadow-pink-600/30'
                : isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{t.skillCharts.tabs.software}</span>
          </button>

          <button
            id="tab-skill-distribution"
            onClick={() => setActiveTab('distribution')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'distribution'
                ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-md shadow-pink-600/30'
                : isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            <span>{t.skillCharts.tabs.distribution}</span>
          </button>

          <button
            id="tab-skill-timeline"
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-md shadow-pink-600/30'
                : isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{t.skillCharts.tabs.timeline}</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="pt-6">
        <AnimatePresence mode="wait">
          {/* TAB 1: RADAR DE COMPETENCIAS */}
          {activeTab === 'radar' && (
            <motion.div
              key="radar-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              {/* Radar SVG Display (Col 1-7) */}
              <div className={`lg:col-span-6 flex flex-col items-center justify-center p-4 rounded-3xl border relative overflow-hidden ${
                isDark ? 'bg-black/30 border-white/5' : 'bg-slate-50/80 border-slate-200'
              }`}>
                {/* SVG Radar Chart */}
                <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
                  <svg 
                    viewBox={`0 0 ${size} ${size}`} 
                    className="w-full h-full overflow-visible drop-shadow-md"
                  >
                    <defs>
                      <linearGradient id="radarAreaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ec4899" stopOpacity="0.45" />
                        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                      </linearGradient>
                      <linearGradient id="radarStrokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f472b6" />
                        <stop offset="50%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#60a5fa" />
                      </linearGradient>
                    </defs>

                    {/* Concentric Web Rings (20%, 40%, 60%, 80%, 100%) */}
                    {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, ringIdx) => {
                      const ringPoints = RADAR_AXES.map((_, i) => {
                        const coords = getCoordinates(i, level);
                        return `${coords.x},${coords.y}`;
                      }).join(' ');

                      return (
                        <g key={ringIdx}>
                          <polygon
                            points={ringPoints}
                            fill="none"
                            stroke={isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}
                            strokeWidth={ringIdx === 4 ? "1.5" : "1"}
                            strokeDasharray={ringIdx < 4 ? "3,3" : "none"}
                          />
                          <text
                            x={center + 4}
                            y={center - radius * level - 2}
                            fill={isDark ? '#737373' : '#94a3b8'}
                            fontSize="8"
                            fontWeight="bold"
                            textAnchor="start"
                          >
                            {Math.round(level * 100)}%
                          </text>
                        </g>
                      );
                    })}

                    {/* Radial Axis Spokes */}
                    {RADAR_AXES.map((axis, i) => {
                      const outer = getCoordinates(i, 1.0);
                      const isHovered = hoveredAxis?.key === axis.key;
                      return (
                        <line
                          key={i}
                          x1={center}
                          y1={center}
                          x2={outer.x}
                          y2={outer.y}
                          stroke={isHovered ? '#ec4899' : isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'}
                          strokeWidth={isHovered ? "1.8" : "1"}
                        />
                      );
                    })}

                    {/* Area Polygon */}
                    <polygon
                      points={radarPolygonPoints}
                      fill="url(#radarAreaGradient)"
                      stroke="url(#radarStrokeGradient)"
                      strokeWidth="2.5"
                      strokeLinejoin="round"
                    />

                    {/* Vertex Data Nodes */}
                    {RADAR_AXES.map((axis, i) => {
                      const point = getCoordinates(i, axis.value / 100);
                      const isHovered = hoveredAxis?.key === axis.key;

                      return (
                        <g 
                          key={i} 
                          className="cursor-pointer transition-transform"
                          onMouseEnter={() => setHoveredAxis(axis)}
                          onMouseLeave={() => setHoveredAxis(null)}
                          onClick={() => setHoveredAxis(axis)}
                        >
                          {/* Pulsing ring for active or hovered node */}
                          {isHovered && (
                            <circle
                              cx={point.x}
                              cy={point.y}
                              r="9"
                              fill="none"
                              stroke="#f472b6"
                              strokeWidth="1.5"
                              className="animate-ping opacity-75"
                            />
                          )}
                          <circle
                            cx={point.x}
                            cy={point.y}
                            r={isHovered ? "6.5" : "4.5"}
                            fill={isHovered ? '#f472b6' : '#ec4899'}
                            stroke="#ffffff"
                            strokeWidth="2"
                            className="transition-all"
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <p className={`text-[11px] font-medium mt-2 text-center ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  {isEs ? 'Pasa el cursor o toca cada nodo para ver detalles de maestría y experiencia' : 'Hover or tap nodes to view mastery details and experience'}
                </p>
              </div>

              {/* Radar Axis List & Dynamic Focus Card (Col 8-12) */}
              <div className="lg:col-span-6 space-y-4">
                {/* Active Focus Card or Highlight Box */}
                <div className={`p-4 rounded-2xl border transition-all ${
                  hoveredAxis 
                    ? isDark ? 'bg-pink-950/30 border-pink-500/40 text-white' : 'bg-pink-50/80 border-pink-300 text-slate-900'
                    : isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-xl border ${
                        isDark ? 'bg-pink-500/20 border-pink-500/30 text-pink-400' : 'bg-pink-100 border-pink-200 text-pink-600'
                      }`}>
                        {hoveredAxis ? hoveredAxis.icon : <Award className="w-4 h-4 text-amber-500" />}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold">
                          {hoveredAxis ? (isEs ? hoveredAxis.nameEs : hoveredAxis.nameEn) : (isEs ? 'Resumen Global de Competencias' : 'Global Competency Overview')}
                        </h4>
                        <span className={`text-[11px] font-medium ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                          {hoveredAxis ? hoveredAxis.experience : (isEs ? 'Promedio de Dominio: 95.8% (Nivel Máster)' : 'Average Mastery: 95.8% (Master Level)')}
                        </span>
                      </div>
                    </div>
                    <span className="text-lg font-black text-pink-500">
                      {hoveredAxis ? `${hoveredAxis.value}%` : '96%'}
                    </span>
                  </div>
                  <p className={`text-xs mt-2.5 leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                    {hoveredAxis 
                      ? (isEs ? hoveredAxis.detailsEs : hoveredAxis.detailsEn)
                      : (isEs 
                          ? 'Más de 20 años articulando identidad gráfica, cátedras universitarias y artes finales en soportes impresos y digitales.'
                          : 'Over 20 years leading graphic identity, academic professorship, and print/digital final art direction.')}
                  </p>
                </div>

                {/* Compact Interactive Mini-Grid of All 8 Axes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {RADAR_AXES.map((axis) => {
                    const isSelected = hoveredAxis?.key === axis.key;
                    return (
                      <button
                        key={axis.key}
                        onClick={() => setHoveredAxis(isSelected ? null : axis)}
                        onMouseEnter={() => setHoveredAxis(axis)}
                        onMouseLeave={() => setHoveredAxis(null)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-gradient-to-r from-pink-600/20 to-purple-600/20 border-pink-500/60 shadow-xs' 
                            : isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <span className={isSelected ? 'text-pink-500' : isDark ? 'text-neutral-400' : 'text-slate-500'}>
                            {axis.icon}
                          </span>
                          <span className={`font-semibold truncate ${isSelected ? (isDark ? 'text-white' : 'text-slate-900') : (isDark ? 'text-neutral-300' : 'text-slate-700')}`}>
                            {isEs ? axis.nameEs : axis.nameEn}
                          </span>
                        </div>
                        <span className={`text-[11px] font-black shrink-0 px-2 py-0.5 rounded-md ${
                          isSelected 
                            ? 'bg-pink-600 text-white' 
                            : isDark ? 'bg-white/10 text-neutral-300' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {axis.value}%
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: DOMINIO DE SOFTWARE */}
          {activeTab === 'software' && (
            <motion.div
              key="software-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 pb-2">
                {[
                  { id: 'all', labelEs: 'Todas las Herramientas', labelEn: 'All Tools' },
                  { id: 'adobe', labelEs: 'Adobe Creative Cloud', labelEn: 'Adobe CC Suite' },
                  { id: 'print', labelEs: 'Pre-prensa & Impresión', labelEn: 'Print & Prepress' },
                  { id: 'web', labelEs: 'Web & UI/UX', labelEn: 'Web & UI/UX' },
                  { id: 'academic', labelEs: 'Docencia & Morfología', labelEn: 'Academic & Morphology' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSoftwareCategory(cat.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      softwareCategory === cat.id
                        ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white shadow-xs'
                        : isDark ? 'bg-white/5 hover:bg-white/10 text-neutral-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isEs ? cat.labelEs : cat.labelEn}
                  </button>
                ))}
              </div>

              {/* Software Skills Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSoftware.map((skill, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border space-y-3 transition-all ${
                      isDark 
                        ? 'bg-white/5 border-white/10 hover:border-pink-500/30' 
                        : 'bg-white border-slate-200 shadow-xs hover:border-pink-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl border font-bold text-xs ${skill.iconColor}`}>
                          <Laptop className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {skill.name}
                          </h4>
                          <span className={`text-[11px] font-medium ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                            {skill.years} {t.skillCharts.software.yearsBadge} · {isEs ? skill.masteryLabelEs : skill.masteryLabelEn}
                          </span>
                        </div>
                      </div>

                      <span className="text-base font-black text-pink-500">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className={`w-full h-2.5 rounded-full overflow-hidden ${
                      isDark ? 'bg-white/10' : 'bg-slate-100'
                    }`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.05, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                      />
                    </div>

                    <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                      {isEs ? skill.descriptionEs : skill.descriptionEn}
                    </p>

                    {/* Specialty Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {(isEs ? skill.tagsEs : skill.tagsEn).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className={`text-[10px] px-2 py-0.5 rounded-md font-medium border ${
                            isDark 
                              ? 'bg-white/5 border-white/10 text-neutral-300' 
                              : 'bg-slate-100 border-slate-200 text-slate-600'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: DISTRIBUCIÓN POR ESPECIALIDAD */}
          {activeTab === 'distribution' && (
            <motion.div
              key="distribution-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Proportional Segment Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className={isDark ? 'text-neutral-300' : 'text-slate-700'}>
                    {isEs ? 'Volumen Histórico por Especialidad' : 'Historical Production Volume by Specialty'}
                  </span>
                  <span className="text-pink-500 font-bold">100% (+1,500 {isEs ? 'Proyectos' : 'Projects'})</span>
                </div>

                <div className="w-full h-5 rounded-xl overflow-hidden flex shadow-inner border border-white/10">
                  {CATEGORY_DISTRIBUTION.map((cat) => (
                    <div
                      key={cat.id}
                      style={{ width: `${cat.share}%` }}
                      className={`${cat.color} h-full hover:brightness-115 transition-all relative group cursor-pointer`}
                      title={`${isEs ? cat.nameEs : cat.nameEn}: ${cat.share}% (~${cat.count} ${isEs ? 'trabajos' : 'works'})`}
                    />
                  ))}
                </div>
              </div>

              {/* Distribution Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {CATEGORY_DISTRIBUTION.map((cat, idx) => (
                  <div
                    key={cat.id}
                    className={`p-3.5 rounded-2xl border space-y-2 transition-all ${
                      isDark 
                        ? 'bg-white/5 border-white/5 hover:bg-white/10' 
                        : 'bg-white border-slate-200 shadow-2xs hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${cat.color}`} />
                        <h4 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {isEs ? cat.nameEs : cat.nameEn}
                        </h4>
                      </div>
                      <span className={`text-xs font-black ${cat.text}`}>
                        {cat.share}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className={isDark ? 'text-neutral-400' : 'text-slate-500'}>
                        {isEs ? 'Proyectos estimados' : 'Estimated projects'}:
                      </span>
                      <span className={`font-bold ${isDark ? 'text-neutral-200' : 'text-slate-800'}`}>
                        ~{cat.count}+
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* High-Impact Career Metric Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className={`p-3.5 rounded-2xl border text-center ${
                  isDark ? 'bg-amber-400/5 border-amber-400/20' : 'bg-amber-50/80 border-amber-200'
                }`}>
                  <p className={`text-xl font-black ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>+1,500</p>
                  <p className={`text-[11px] mt-0.5 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                    {isEs ? 'Proyectos Diseñados' : 'Designed Projects'}
                  </p>
                </div>

                <div className={`p-3.5 rounded-2xl border text-center ${
                  isDark ? 'bg-pink-500/5 border-pink-500/20' : 'bg-pink-50/80 border-pink-200'
                }`}>
                  <p className={`text-xl font-black ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>+3,000</p>
                  <p className={`text-[11px] mt-0.5 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                    {isEs ? 'Horas de Docencia' : 'Lecture Hours'}
                  </p>
                </div>

                <div className={`p-3.5 rounded-2xl border text-center ${
                  isDark ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-50/80 border-blue-200'
                }`}>
                  <p className={`text-xl font-black ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>+20</p>
                  <p className={`text-[11px] mt-0.5 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                    {isEs ? 'Años en el Mercado' : 'Years in Market'}
                  </p>
                </div>

                <div className={`p-3.5 rounded-2xl border text-center ${
                  isDark ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-50/80 border-emerald-200'
                }`}>
                  <p className={`text-xl font-black ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>100%</p>
                  <p className={`text-[11px] mt-0.5 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                    {isEs ? 'Garantía & Rigor' : 'Rigorous Standards'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: LÍNEA DE TRAYECTORIA */}
          {activeTab === 'timeline' && (
            <motion.div
              key="timeline-tab"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="relative pl-6 sm:pl-8 space-y-6 border-l-2 border-pink-500/30 ml-2 sm:ml-4 py-2"
            >
              {t.skillCharts.timeline.milestones.map((m: any, idx: number) => (
                <div key={idx} className="relative group">
                  {/* Glowing Node Dot */}
                  <span className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-pink-500 border-4 border-[#07080c] shadow-md shadow-pink-500/40 group-hover:scale-125 transition-transform" />

                  <div className={`p-4 rounded-2xl border transition-all ${
                    isDark 
                      ? 'bg-white/5 border-white/10 hover:border-pink-500/30' 
                      : 'bg-white border-slate-200 shadow-xs hover:border-pink-300'
                  }`}>
                    <div className="flex items-center gap-2 text-pink-500 font-black text-xs">
                      <span>{m.year}</span>
                    </div>
                    <h4 className={`text-sm font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {m.title}
                    </h4>
                    <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
