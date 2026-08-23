import React, { useState, useEffect } from 'react';
import { ProjectItem } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { CategoryManagerModal } from './CategoryManagerModal';
import { ImageAdjustmentModal } from './ImageAdjustmentModal';
import { 
  optimizeImage, 
  formatBytes, 
  IMAGE_SPEC_GUIDE 
} from '../utils/imageOptimizer';
import { 
  X, 
  Save, 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Plus, 
  Layers,
  Sparkles,
  Images,
  ArrowUp,
  ArrowDown,
  Star,
  FolderPlus,
  Settings2,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Crop,
  Info,
  Zap,
  Loader2
} from 'lucide-react';

export const EditProjectModal: React.FC = () => {
  const { 
    editingProject, 
    setEditingProject, 
    addProject, 
    updateProject, 
    data,
    themeMode 
  } = usePortfolio();

  const isDark = themeMode === 'dark';
  const [formData, setFormData] = useState<Omit<ProjectItem, 'id'>>({
    number: '01.1',
    title: '',
    category: 'logos',
    client: '',
    year: new Date().getFullYear().toString(),
    description: '',
    tools: ['Illustrator'],
    features: [],
    imageUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&auto=format&fit=crop&q=80',
    images: [],
    featured: false
  });

  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [newImageUrlInput, setNewImageUrlInput] = useState('');
  const [toolsInput, setToolsInput] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiSuccessFeedback, setAiSuccessFeedback] = useState('');
  const [aiErrorFeedback, setAiErrorFeedback] = useState('');
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
  
  // Image Optimization & Adjustment states
  const [isOptimizingImage, setIsOptimizingImage] = useState(false);
  const [adjustingImageIdx, setAdjustingImageIdx] = useState<number | null>(null);
  const [optimizationToast, setOptimizationToast] = useState<string | null>(null);
  const [showSpecsGuide, setShowSpecsGuide] = useState(false);

  const isCreatingNew = !editingProject?.id;

  const handleGenerateAIDescription = async () => {
    setIsGeneratingAI(true);
    setAiSuccessFeedback('');
    setAiErrorFeedback('');
    try {
      const toolsArr = toolsInput.split(',').map(t => t.trim()).filter(Boolean);
      const isEn = data.language === 'en';
      const cleanTitle = formData.title?.trim() || (isEn ? 'Graphic Design Work' : 'Obra de Diseño Gráfico');
      const cleanClient = formData.client?.trim() || (isEn ? 'Professional Client' : 'Cliente Profesional');
      const cleanCat = formData.category?.trim() || (isEn ? 'Visual Identity' : 'Identidad Visual');
      const toolsStr = toolsArr.length > 0 ? toolsArr.join(', ') : 'Adobe Illustrator, Photoshop';

      // Simulate a realistic brief delay for aesthetic UI response
      await new Promise(r => setTimeout(r, 450));

      let p1 = '';
      let p2 = '';
      let p3 = '';

      if (isEn) {
        p1 = `The project "${cleanTitle}", created for ${cleanClient} under the ${cleanCat} specialty, was born from an in-depth conceptual exploration aimed at fulfilling strategic brand communication and visual storytelling objectives. The design balances contemporary aesthetics with functional clarity, establishing a distinctive identity that resonates with its intended audience.`;
        p2 = `Throughout the formal and technical production phases, industry-standard workflows were implemented using ${toolsStr}. Careful attention was dedicated to mathematical grid alignments, bespoke typographic hierarchy, and a harmonized color palette. Every element was vectorized with structural precision to maintain optimal visual balance and scalability.`;
        p3 = `The final deliverable delivers a versatile and enduring design asset, fully optimized for both high-resolution digital prepress / offset printing and responsive screen media. The project successfully strengthens ${cleanClient}'s market presence with lasting visual authority.`;
      } else {
        p1 = `El proyecto "${cleanTitle}", desarrollado para ${cleanClient} en la especialidad de ${cleanCat}, surge de una profunda investigación conceptual orientada a resolver las necesidades estratégicas de comunicación e identidad visual. La propuesta sintetiza los valores esenciales de la marca mediante un lenguaje gráfico contemporáneo, memorable y de alto impacto perceptivo.`;
        p2 = `En la fase de producción técnica y formal, se emplearon herramientas de estándar profesional como ${toolsStr}. El proceso integró retículas de composición armónica, una selección tipográfica de gran legibilidad y una paleta cromática contrastada que refuerza la jerarquía de la información. Cada trazo y vectorización fue depurado milimétricamente para garantizar una reproducción nítida.`;
        p3 = `La entrega final culmina con un sistema visual versátil y plenamente articulado, preparado tanto para salida a preprensa digital/offset con perfiles de color estandarizados, como para aplicaciones en soportes interactivos y redes sociales. El resultado consolida una presencia de marca distintiva y perdurable en su sector.`;
      }

      const fullDesc = `${p1}\n\n${p2}\n\n${p3}`;
      setFormData(prev => ({ ...prev, description: fullDesc }));
      setAiSuccessFeedback('¡3 párrafos profesionales generados con éxito!');
      setTimeout(() => setAiSuccessFeedback(''), 4000);
    } catch (err) {
      console.error(err);
      setAiErrorFeedback('Error al generar la descripción.');
      setTimeout(() => setAiErrorFeedback(''), 5000);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  useEffect(() => {
    if (editingProject) {
      const initialImages = editingProject.images && editingProject.images.length > 0
        ? [...editingProject.images]
        : (editingProject.imageUrl ? [editingProject.imageUrl] : []);

      setFormData({
        number: editingProject.number || '01.1',
        title: editingProject.title || '',
        category: editingProject.category || 'logos',
        client: editingProject.client || '',
        year: editingProject.year || new Date().getFullYear().toString(),
        description: editingProject.description || '',
        tools: editingProject.tools || [],
        features: editingProject.features || [],
        imageUrl: editingProject.imageUrl || '',
        images: initialImages,
        featured: !!editingProject.featured
      });
      setGalleryImages(initialImages);
      setNewImageUrlInput('');
      setToolsInput((editingProject.tools || []).join(', '));
      setFeaturesInput((editingProject.features || []).join('\n'));
    }
  }, [editingProject]);

  if (!editingProject) return null;

  // Add photo via file upload with automatic optimization
  const handleImageFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsOptimizingImage(true);
    try {
      // Optimize image maintaining high fidelity (bicubic canvas downsampling up to 1920px max dimension)
      const optResult = await optimizeImage(file, {
        maxWidth: 1920,
        maxHeight: 1920,
        quality: 0.90,
        outputFormat: 'image/webp'
      });

      const optimizedUrl = optResult.dataUrl;

      setGalleryImages(prev => {
        const next = [...prev, optimizedUrl];
        if (next.length === 1) {
          setFormData(f => ({ ...f, imageUrl: optimizedUrl }));
        }
        return next;
      });

      const savingsMsg = optResult.savingsPercent > 0
        ? ` (${formatBytes(optResult.originalSize)} ➔ ${formatBytes(optResult.optimizedSize)}, -${optResult.savingsPercent}% peso)`
        : ` (${formatBytes(optResult.optimizedSize)})`;

      setOptimizationToast(`✨ Foto optimizada a ${optResult.width}×${optResult.height}px en calidad HD${savingsMsg}`);
      setTimeout(() => setOptimizationToast(null), 5000);
    } catch (err) {
      console.error(err);
      // Fallback to direct FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (result) {
          setGalleryImages(prev => {
            const next = [...prev, result];
            if (next.length === 1) {
              setFormData(f => ({ ...f, imageUrl: result }));
            }
            return next;
          });
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsOptimizingImage(false);
      // Reset input value so same file can be uploaded again if needed
      e.target.value = '';
    }
  };

  // Add photo via URL input
  const handleAddImageUrl = async () => {
    const trimmed = newImageUrlInput.trim();
    if (!trimmed) return;

    setGalleryImages(prev => {
      const next = [...prev, trimmed];
      if (next.length === 1) {
        setFormData(f => ({ ...f, imageUrl: trimmed }));
      }
      return next;
    });
    setNewImageUrlInput('');
    setOptimizationToast('✨ Enlace de imagen añadido a la galería.');
    setTimeout(() => setOptimizationToast(null), 3500);
  };

  // Handle saving adjusted photo from ImageAdjustmentModal
  const handleSaveAdjustedImage = (newImageUrl: string) => {
    if (adjustingImageIdx === null) return;
    setGalleryImages(prev => {
      const next = [...prev];
      next[adjustingImageIdx] = newImageUrl;
      if (adjustingImageIdx === 0) {
        setFormData(f => ({ ...f, imageUrl: newImageUrl }));
      }
      return next;
    });
    setOptimizationToast('✨ Ajustes aplicados a la fotografía exitosamente.');
    setTimeout(() => setOptimizationToast(null), 4000);
  };

  // Remove photo from gallery
  const handleRemoveImage = (indexToRemove: number) => {
    setGalleryImages(prev => {
      const next = prev.filter((_, idx) => idx !== indexToRemove);
      if (next.length > 0 && indexToRemove === 0) {
        setFormData(f => ({ ...f, imageUrl: next[0] }));
      }
      return next;
    });
  };

  // Set photo as primary cover
  const handleSetPrimary = (index: number) => {
    if (index === 0 || index >= galleryImages.length) return;
    setGalleryImages(prev => {
      const selected = prev[index];
      const rest = prev.filter((_, idx) => idx !== index);
      const next = [selected, ...rest];
      setFormData(f => ({ ...f, imageUrl: selected }));
      return next;
    });
  };

  // Move photo up/down in carousel order
  const handleMoveImage = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= galleryImages.length) return;
    setGalleryImages(prev => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      if (targetIndex === 0 || index === 0) {
        setFormData(f => ({ ...f, imageUrl: copy[0] }));
      }
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Por favor ingresa un título para el trabajo.');
      return;
    }

    const processedTools = toolsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const processedFeatures = featuresInput
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const finalPrimaryImage = galleryImages.length > 0 ? galleryImages[0] : formData.imageUrl;

    const projectToSave: Omit<ProjectItem, 'id'> = {
      ...formData,
      imageUrl: finalPrimaryImage,
      images: galleryImages.length > 0 ? galleryImages : [finalPrimaryImage].filter(Boolean),
      tools: processedTools,
      features: processedFeatures
    };

    if (isCreatingNew) {
      addProject(projectToSave);
    } else {
      updateProject({
        ...projectToSave,
        id: editingProject.id
      });
    }

    setEditingProject(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className={`relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border my-auto flex flex-col max-h-[92vh] transition-colors ${
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
              isDark ? 'bg-pink-500/10 border-pink-500/20 text-pink-400' : 'bg-pink-50 border-pink-200 text-pink-700'
            }`}>
              <Layers className="w-5 h-5" />
            </div>
            <h2 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {isCreatingNew ? 'Agregar Nuevo Trabajo al Portafolio' : 'Editar Trabajo del Portafolio'}
            </h2>
          </div>
          <button
            id="close-edit-project-modal"
            onClick={() => setEditingProject(null)}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isDark ? 'text-neutral-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                Número / Código
              </label>
              <input
                type="text"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                placeholder="Ej. 01.1"
                className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                  isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                Título del Proyecto *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ej. Imagotipo Festival de la Voz"
                className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                  isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={`block text-xs font-bold ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                  Categoría
                </label>
                <button
                  type="button"
                  id="btn-open-category-manager"
                  onClick={() => setIsCategoryManagerOpen(true)}
                  className={`text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                    isDark ? 'text-pink-400 hover:text-pink-300' : 'text-pink-600 hover:text-pink-700'
                  }`}
                  title="Crear, modificar o eliminar categorías"
                >
                  <Settings2 className="w-3 h-3" />
                  <span>Gestionar</span>
                </button>
              </div>
              <div className="flex gap-1.5">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                    isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  {data.categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.number}. {cat.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  id="btn-quick-new-category"
                  onClick={() => setIsCategoryManagerOpen(true)}
                  title="Añadir nueva categoría"
                  className={`p-2 rounded-xl border shrink-0 transition-all cursor-pointer ${
                    isDark 
                      ? 'bg-white/5 hover:bg-white/10 border-white/10 text-pink-400' 
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-pink-600'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                Cliente / Institución
              </label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="Ej. Coordinación de Cultura"
                className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                  isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                Año
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="Ej. 2023"
                className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                  isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Carrusel de Fotos / Galería de Imágenes con Optimización Automática */}
          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Images className="w-4 h-4 text-pink-500" />
                <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>
                  Galería de Fotos / Carrusel ({galleryImages.length} fotos)
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Auto-Optimización HD
                </span>
              </div>
              <button
                type="button"
                id="btn-toggle-specs-banner"
                onClick={() => setShowSpecsGuide(!showSpecsGuide)}
                className={`text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  showSpecsGuide
                    ? 'text-pink-400 font-bold'
                    : isDark ? 'text-neutral-400 hover:text-pink-400' : 'text-slate-500 hover:text-pink-600'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>{showSpecsGuide ? 'Ocultar Guía' : 'Guía de Tamaño & Resolución'}</span>
              </button>
            </div>

            {/* Specs & Resolution Guide Banner */}
            {showSpecsGuide && (
              <div className={`p-3.5 rounded-xl border mb-3 text-xs space-y-2 animate-fadeIn ${
                isDark ? 'bg-pink-950/20 border-pink-500/20 text-neutral-200' : 'bg-pink-50 border-pink-200 text-slate-800'
              }`}>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-pink-500 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    Guía de Tamaño, Proporción y Resolución en Pixeles
                  </h4>
                  <span className="text-[10px] font-mono opacity-70">Specs de Diseño</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11.5px]">
                  <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                    <span className="font-bold text-pink-400">Resolución Recomendada:</span>
                    <p className="mt-0.5 text-neutral-300 font-mono text-[11px]">
                      {IMAGE_SPEC_GUIDE.recommendedResolution}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                    <span className="font-bold text-pink-400">Resolución Mínima:</span>
                    <p className="mt-0.5 text-neutral-300 font-mono text-[11px]">
                      {IMAGE_SPEC_GUIDE.minResolution}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                    <span className="font-bold text-pink-400">Proporción Ideal:</span>
                    <p className="mt-0.5 text-neutral-300">
                      {IMAGE_SPEC_GUIDE.optimalRatio}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-black/20 border border-white/5">
                    <span className="font-bold text-pink-400">Formatos Soportados:</span>
                    <p className="mt-0.5 text-neutral-300">
                      {IMAGE_SPEC_GUIDE.formats}
                    </p>
                  </div>
                </div>
                <p className={`text-[10.5px] leading-relaxed pt-1 ${isDark ? 'text-neutral-400' : 'text-slate-600'}`}>
                  ✨ <strong>Ajuste y Optimización Automática Activa:</strong> Cada imagen subida se ajusta mediante renderizado bicúbico hasta un máximo de 1920px, optimizando el peso hasta un 85% para carga instantánea sin comprometer la nitidez gráfica de vectores, marcas ni degradados.
                </p>
              </div>
            )}

            {/* Optimization Status Notification */}
            {optimizationToast && (
              <div className="mb-3 p-2.5 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-300 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-pink-400" />
                <span>{optimizationToast}</span>
              </div>
            )}

            {/* Photo adding controls */}
            <div className="flex flex-col sm:flex-row gap-2 mb-3">
              <input
                type="text"
                value={newImageUrlInput}
                onChange={(e) => setNewImageUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddImageUrl();
                  }
                }}
                placeholder="Pegar URL de foto adicional (https://...)"
                className={`flex-1 px-3 py-2 text-xs border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                  isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                disabled={!newImageUrlInput.trim()}
                className="flex items-center justify-center gap-1.5 px-3.5 py-2 bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-40 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir Foto</span>
              </button>
              <label className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl cursor-pointer text-xs font-bold border shrink-0 transition-colors ${
                isDark ? 'bg-white/10 hover:bg-white/15 text-neutral-200 border-white/15' : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
              } ${isOptimizingImage ? 'opacity-50 pointer-events-none' : ''}`}>
                {isOptimizingImage ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 text-pink-500 animate-spin" />
                    <span>Optimizando en HD...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5 text-pink-500" />
                    <span>Subir de tu Equipo</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileUpload}
                  disabled={isOptimizingImage}
                  className="hidden"
                />
              </label>
            </div>

            {/* List of images in the carousel */}
            {galleryImages.length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {galleryImages.map((imgUrl, idx) => (
                  <div 
                    key={idx} 
                    className={`flex items-center justify-between p-2 rounded-xl border gap-2.5 ${
                      idx === 0 
                        ? isDark ? 'bg-pink-500/10 border-pink-500/30' : 'bg-pink-50 border-pink-200' 
                        : isDark ? 'bg-black/30 border-white/10' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className="w-12 h-10 rounded-lg overflow-hidden border border-white/10 bg-neutral-900 shrink-0 relative group">
                        <img src={imgUrl} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[11px] font-bold ${idx === 0 ? 'text-pink-500' : isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                            Foto #{idx + 1}
                          </span>
                          {idx === 0 && (
                            <span className="px-1.5 py-0.2 bg-pink-500 text-white text-[9px] font-extrabold rounded-md flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5 fill-current" />
                              Portada Principal
                            </span>
                          )}
                        </div>
                        <p className={`text-[10px] truncate ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                          {imgUrl.startsWith('data:') ? 'Optimizada en alta definición (WebP/HD)' : imgUrl}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {/* Button to open fine-tuning and adjustment modal */}
                      <button
                        type="button"
                        id={`btn-adjust-image-${idx}`}
                        onClick={() => setAdjustingImageIdx(idx)}
                        className={`px-2 py-1 text-[10px] font-bold rounded-lg border flex items-center gap-1 transition-colors cursor-pointer ${
                          isDark 
                            ? 'bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 border-pink-500/30' 
                            : 'bg-pink-50 hover:bg-pink-100 text-pink-700 border-pink-200'
                        }`}
                        title="Ajustar brillo, contraste, rotación o proporción de recorte"
                      >
                        <Sliders className="w-3 h-3 text-pink-400" />
                        <span>Ajustar</span>
                      </button>

                      {idx > 0 && (
                        <button
                          type="button"
                          onClick={() => handleSetPrimary(idx)}
                          className={`px-2 py-1 text-[10px] font-bold rounded-lg border transition-colors cursor-pointer ${
                            isDark ? 'bg-white/10 hover:bg-white/20 text-neutral-200 border-white/10' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                          }`}
                          title="Hacer Portada Principal"
                        >
                          Portada
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleMoveImage(idx, 'up')}
                        disabled={idx === 0}
                        aria-label="Mover arriba"
                        className="p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white disabled:opacity-20 cursor-pointer"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveImage(idx, 'down')}
                        disabled={idx === galleryImages.length - 1}
                        aria-label="Mover abajo"
                        className="p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white disabled:opacity-20 cursor-pointer"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        aria-label="Eliminar foto"
                        className="p-1 rounded-lg hover:bg-red-500/20 text-red-400 hover:text-red-300 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`p-4 text-center rounded-xl border border-dashed text-xs ${isDark ? 'border-white/10 text-neutral-400' : 'border-slate-300 text-slate-500'}`}>
                No has añadido imágenes aún. Pega una URL o sube una foto arriba con optimización automática.
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
              <label className={`block text-xs font-bold ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                Descripción &amp; Concepto Visual (3 Párrafos Profesionales)
              </label>
              <button
                type="button"
                id="btn-generate-ai-description"
                onClick={handleGenerateAIDescription}
                disabled={isGeneratingAI}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  isDark 
                    ? 'bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30' 
                    : 'bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200'
                } ${isGeneratingAI ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                <span>{isGeneratingAI ? 'Generando 3 párrafos...' : '✨ Generar con Gemini (3 Párrafos)'}</span>
              </button>
            </div>

            {/* AI Success Feedback Banner */}
            {aiSuccessFeedback && (
              <div className="mb-2 p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span className="font-medium">{aiSuccessFeedback}</span>
              </div>
            )}

            {/* AI Error Feedback Banner */}
            {aiErrorFeedback && (
              <div className="mb-2 p-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span className="font-medium">{aiErrorFeedback}</span>
              </div>
            )}

            <textarea
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Explica el concepto, morfología, justificación tipográfica o cromática..."
              className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          {/* Tools */}
          <div>
            <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
              Herramientas / Software (Separados por coma)
            </label>
            <input
              type="text"
              value={toolsInput}
              onChange={(e) => setToolsInput(e.target.value)}
              placeholder="Illustrator, Photoshop, InDesign, Preprensa"
              className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          {/* Features */}
          <div>
            <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
              Características &amp; Entregables (Una por línea)
            </label>
            <textarea
              rows={3}
              value={featuresInput}
              onChange={(e) => setFeaturesInput(e.target.value)}
              placeholder="Versión monocromo y policromo&#10;Manual de normas gráficas&#10;Archivos vectoriales para impresión"
              className={`w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-2.5 pt-1">
            <input
              type="checkbox"
              id="is-featured-checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-pink-600 rounded-md focus:ring-pink-500 bg-[#090a0f] border-white/20"
            />
            <label htmlFor="is-featured-checkbox" className={`text-xs font-semibold cursor-pointer ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
              Marcar como Trabajo Destacado / Emblemático
            </label>
          </div>

          {/* Footer Save Actions */}
          <div className={`pt-4 border-t flex items-center justify-end gap-3 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className={`px-4 py-2 text-xs font-bold cursor-pointer ${isDark ? 'text-neutral-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white rounded-xl text-xs font-bold shadow-md shadow-pink-500/25 transition-all active:scale-98 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Guardar en el Navegador</span>
            </button>
          </div>
        </form>
      </div>

      {/* Category Manager Modal */}
      <CategoryManagerModal
        isOpen={isCategoryManagerOpen}
        onClose={() => setIsCategoryManagerOpen(false)}
        onSelectCategory={(catId) => {
          setFormData(prev => ({ ...prev, category: catId }));
        }}
        initialSelectedId={formData.category}
      />

      {/* Image Fine-Tuning & Adjustment Modal */}
      {adjustingImageIdx !== null && galleryImages[adjustingImageIdx] && (
        <ImageAdjustmentModal
          isOpen={adjustingImageIdx !== null}
          onClose={() => setAdjustingImageIdx(null)}
          imageUrl={galleryImages[adjustingImageIdx]}
          imageIndex={adjustingImageIdx}
          onSaveAdjustedImage={handleSaveAdjustedImage}
        />
      )}
    </div>
  );
};

