import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CategoryInfo } from '../types';
import {
  X,
  Plus,
  Edit2,
  Trash2,
  Check,
  Shapes,
  Building2,
  Sparkles,
  BookOpen,
  Layout,
  Share2,
  Palette,
  Gift,
  Layers,
  Image as ImageIcon,
  Film,
  Briefcase,
  Box,
  Tag,
  Stamp,
  Monitor,
  PenTool,
  Award,
  Star,
  Globe,
  Camera,
  FolderPlus,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const ICON_OPTIONS: { name: string; label: string; icon: React.ElementType }[] = [
  { name: 'Shapes', label: 'Formas / Logos', icon: Shapes },
  { name: 'Building2', label: 'Corporativo / Identidad', icon: Building2 },
  { name: 'Sparkles', label: 'Pósters / Destacado', icon: Sparkles },
  { name: 'BookOpen', label: 'Editorial / Libros', icon: BookOpen },
  { name: 'Layout', label: 'Web / Layouts', icon: Layout },
  { name: 'Share2', label: 'Social / Redes', icon: Share2 },
  { name: 'Palette', label: 'Ilustración / Arte', icon: Palette },
  { name: 'Gift', label: 'Tarjetería / Eventos', icon: Gift },
  { name: 'Layers', label: 'Sistemas / Capas', icon: Layers },
  { name: 'Box', label: 'Packaging / Empaques', icon: Box },
  { name: 'ImageIcon', label: 'Fotografía / Gráficos', icon: ImageIcon },
  { name: 'Film', label: 'Multimedia / Video', icon: Film },
  { name: 'Monitor', label: 'Digital / Pantallas', icon: Monitor },
  { name: 'PenTool', label: 'Vectorial / Trazado', icon: PenTool },
  { name: 'Briefcase', label: 'Consultoría / Marcas', icon: Briefcase },
  { name: 'Tag', label: 'Etiquetas / Merch', icon: Tag },
  { name: 'Stamp', label: 'Sellos / Preprensa', icon: Stamp },
  { name: 'Award', label: 'Premios / Reconocimientos', icon: Award },
  { name: 'Star', label: 'Especial / Premium', icon: Star },
  { name: 'Globe', label: 'Global / Campañas', icon: Globe },
  { name: 'Camera', label: 'Estudio / Captura', icon: Camera }
];

export const getCategoryIconComponent = (iconName?: string): React.ElementType => {
  const match = ICON_OPTIONS.find(o => o.name === iconName);
  return match ? match.icon : Shapes;
};

interface CategoryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory?: (categoryId: string) => void;
  initialSelectedId?: string;
}

export const CategoryManagerModal: React.FC<CategoryManagerModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  initialSelectedId
}) => {
  const { data, addCategory, updateCategory, deleteCategory, themeMode } = usePortfolio();
  const isDark = themeMode === 'dark';

  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list');
  const [editingCatId, setEditingCatId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [number, setNumber] = useState('');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState('Shapes');

  // Deletion state
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryInfo | null>(null);
  const [reassignTargetId, setReassignTargetId] = useState<string>('');

  // Status message
  const [statusFeedback, setStatusFeedback] = useState<string>('');

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setStatusFeedback(msg);
    setTimeout(() => setStatusFeedback(''), 3500);
  };

  const startCreate = () => {
    const nextNum = String(data.categories.length + 1).padStart(2, '0');
    setName('');
    setShortName('');
    setNumber(nextNum);
    setDescription('');
    setIconName('Shapes');
    setEditingCatId(null);
    setMode('create');
  };

  const startEdit = (cat: CategoryInfo) => {
    setName(cat.name);
    setShortName(cat.shortName || cat.name);
    setNumber(cat.number);
    setDescription(cat.description || '');
    setIconName(cat.iconName || 'Shapes');
    setEditingCatId(cat.id);
    setMode('edit');
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showNotification('Por favor ingresa un nombre para la categoría.');
      return;
    }

    if (mode === 'create') {
      const created = addCategory({
        name: name.trim(),
        shortName: shortName.trim() || name.trim(),
        number: number.trim() || String(data.categories.length + 1).padStart(2, '0'),
        description: description.trim(),
        iconName: iconName || 'Shapes'
      });
      showNotification(`Categoría "${created.name}" creada exitosamente.`);
      if (onSelectCategory) {
        onSelectCategory(created.id);
      }
    } else if (mode === 'edit' && editingCatId) {
      updateCategory({
        id: editingCatId,
        name: name.trim(),
        shortName: shortName.trim() || name.trim(),
        number: number.trim(),
        description: description.trim(),
        iconName: iconName || 'Shapes'
      });
      showNotification(`Categoría "${name}" actualizada correctamente.`);
      if (onSelectCategory) {
        onSelectCategory(editingCatId);
      }
    }

    setMode('list');
  };

  const startDeleteConfirmation = (cat: CategoryInfo) => {
    if (data.categories.length <= 1) {
      showNotification('Debe existir al menos una categoría en el portafolio.');
      return;
    }
    const otherCats = data.categories.filter(c => c.id !== cat.id);
    setReassignTargetId(otherCats.length > 0 ? otherCats[0].id : '');
    setCategoryToDelete(cat);
  };

  const confirmDelete = () => {
    if (!categoryToDelete) return;
    const catName = categoryToDelete.name;
    const count = data.projects.filter(p => p.category === categoryToDelete.id).length;
    
    deleteCategory(categoryToDelete.id, reassignTargetId);
    setCategoryToDelete(null);
    showNotification(`Categoría "${catName}" eliminada.${count > 0 ? ` ${count} proyectos fueron reasignados.` : ''}`);
  };

  const getProjectsCountForCategory = (catId: string) => {
    return data.projects.filter(p => p.category === catId).length;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className={`relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border my-auto flex flex-col max-h-[90vh] transition-colors ${
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
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${
              isDark ? 'bg-pink-500/10 border-pink-500/20 text-pink-400' : 'bg-pink-50 border-pink-200 text-pink-700'
            }`}>
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base sm:text-lg font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {mode === 'list' && 'Gestor de Categorías del Portafolio'}
                {mode === 'create' && 'Crear Nueva Categoría'}
                {mode === 'edit' && 'Modificar Categoría'}
              </h2>
              <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                {mode === 'list' && `${data.categories.length} categorías configuradas`}
                {mode === 'create' && 'Define el nombre, icono y descripción'}
                {mode === 'edit' && `Editando: ${name || 'Categoría'}`}
              </p>
            </div>
          </div>

          <button
            id="close-category-manager-modal"
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isDark ? 'text-neutral-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Alert Toast */}
        {statusFeedback && (
          <div className="px-6 py-2.5 bg-pink-500/15 border-b border-pink-500/30 text-pink-400 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-pink-400 shrink-0" />
            <span>{statusFeedback}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="overflow-y-auto p-6 flex-1 space-y-4">
          {/* LIST MODE */}
          {mode === 'list' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className={`text-xs font-medium ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                  Puedes crear, editar o eliminar especialidades según tus trabajos.
                </span>
                <button
                  id="btn-add-new-category"
                  onClick={startCreate}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-pink-600 hover:bg-pink-500 text-white transition-all shadow-md shadow-pink-600/20 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nueva Categoría</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {data.categories.map((cat) => {
                  const IconComponent = getCategoryIconComponent(cat.iconName);
                  const projectCount = getProjectsCountForCategory(cat.id);
                  const isSelectedInParent = initialSelectedId === cat.id;

                  return (
                    <div
                      key={cat.id}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                        isSelectedInParent
                          ? isDark 
                            ? 'bg-pink-500/10 border-pink-500/40 ring-1 ring-pink-500/30' 
                            : 'bg-pink-50 border-pink-300 ring-1 ring-pink-300'
                          : isDark 
                            ? 'bg-white/5 border-white/10 hover:border-white/20' 
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0 flex-1">
                        <div className={`p-2.5 rounded-xl shrink-0 ${
                          isDark ? 'bg-white/10 text-pink-400' : 'bg-white text-pink-600 shadow-sm border border-slate-200'
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-pink-500 font-mono">
                              {cat.number}
                            </span>
                            <h4 className={`text-sm font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              {cat.name}
                            </h4>
                            {cat.shortName && cat.shortName !== cat.name && (
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                isDark ? 'bg-white/10 text-neutral-300' : 'bg-slate-200 text-slate-700'
                              }`}>
                                {cat.shortName}
                              </span>
                            )}
                          </div>
                          {cat.description && (
                            <p className={`text-xs mt-0.5 line-clamp-1 ${isDark ? 'text-neutral-400' : 'text-slate-500'}`}>
                              {cat.description}
                            </p>
                          )}
                          <div className="flex items-center gap-3 mt-1.5 text-[11px]">
                            <span className={isDark ? 'text-neutral-400' : 'text-slate-500'}>
                              {projectCount} {projectCount === 1 ? 'trabajo asignado' : 'trabajos asignados'}
                            </span>
                            <span className="text-neutral-600 dark:text-neutral-500">•</span>
                            <span className="font-mono text-neutral-500 text-[10px]">
                              ID: {cat.id}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {onSelectCategory && (
                          <button
                            id={`select-cat-${cat.id}`}
                            onClick={() => {
                              onSelectCategory(cat.id);
                              onClose();
                            }}
                            title="Seleccionar para el trabajo actual"
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                              isSelectedInParent
                                ? 'bg-pink-600 text-white shadow-sm'
                                : isDark
                                  ? 'bg-white/10 hover:bg-white/20 text-neutral-200'
                                  : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{isSelectedInParent ? 'Activa' : 'Usar'}</span>
                          </button>
                        )}
                        <button
                          id={`edit-cat-${cat.id}`}
                          onClick={() => startEdit(cat)}
                          title="Modificar categoría"
                          className={`p-2 rounded-lg transition-colors cursor-pointer ${
                            isDark ? 'hover:bg-white/10 text-neutral-300 hover:text-white' : 'hover:bg-slate-200 text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          id={`delete-cat-${cat.id}`}
                          onClick={() => startDeleteConfirmation(cat)}
                          title="Eliminar categoría"
                          disabled={data.categories.length <= 1}
                          className={`p-2 rounded-lg transition-colors cursor-pointer ${
                            data.categories.length <= 1
                              ? 'opacity-30 cursor-not-allowed text-neutral-500'
                              : 'hover:bg-red-500/15 text-red-400 hover:text-red-300'
                          }`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CREATE / EDIT FORM MODE */}
          {(mode === 'create' || mode === 'edit') && (
            <form onSubmit={handleSaveForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="sm:col-span-1">
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                    Número / Código
                  </label>
                  <input
                    type="text"
                    required
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Ej. 09"
                    className={`w-full px-3 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                      isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                    Nombre Completo de la Categoría *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (!shortName || shortName === name) {
                        setShortName(e.target.value.split(' ')[0] || e.target.value);
                      }
                    }}
                    placeholder="Ej. Packaging, Empaques & Troqueles"
                    className={`w-full px-3 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                      isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                  Nombre Corto para Pestaña / Filtro (Opcional)
                </label>
                <input
                  type="text"
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                  placeholder="Ej. Packaging"
                  className={`w-full px-3 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                    isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                  Descripción / Concepto de la Especialidad
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ej. Diseño estructural, etiquetas memorables y troqueles listos para preprensa e impresión."
                  className={`w-full px-3 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                    isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              {/* Icon Selector Grid */}
              <div>
                <label className={`block text-xs font-bold mb-2 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                  Selecciona un Icono Representativo
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 max-h-48 overflow-y-auto p-1">
                  {ICON_OPTIONS.map((opt) => {
                    const IconComp = opt.icon;
                    const isSelected = iconName === opt.name;
                    return (
                      <button
                        type="button"
                        key={opt.name}
                        onClick={() => setIconName(opt.name)}
                        className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center cursor-pointer ${
                          isSelected
                            ? 'bg-pink-600 text-white border-pink-500 shadow-md shadow-pink-600/30 scale-102'
                            : isDark
                              ? 'bg-white/5 border-white/10 hover:bg-white/10 text-neutral-300 hover:text-white'
                              : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700 hover:text-slate-900'
                        }`}
                      >
                        <IconComp className="w-4 h-4 shrink-0" />
                        <span className="text-[10px] font-medium leading-tight truncate w-full">
                          {opt.label.split('/')[0].trim()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setMode('list')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    isDark ? 'bg-white/10 hover:bg-white/15 text-neutral-300' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  }`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-pink-600 hover:bg-pink-500 text-white transition-all shadow-lg shadow-pink-600/30 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>{mode === 'create' ? 'Crear Categoría' : 'Guardar Cambios'}</span>
                </button>
              </div>
            </form>
          )}

          {/* DELETE CONFIRMATION DIALOG */}
          {categoryToDelete && (
            <div className={`p-5 rounded-2xl border space-y-4 animate-fadeIn ${
              isDark ? 'bg-red-950/30 border-red-500/30 text-white' : 'bg-red-50 border-red-200 text-slate-900'
            }`}>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-red-500/20 text-red-400 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-red-400">
                    ¿Eliminar categoría "{categoryToDelete.name}"?
                  </h4>
                  <p className={`text-xs mt-1 ${isDark ? 'text-neutral-300' : 'text-slate-600'}`}>
                    Actualmente hay <strong className="text-pink-400">{getProjectsCountForCategory(categoryToDelete.id)}</strong> proyectos asignados a esta categoría.
                  </p>
                </div>
              </div>

              {getProjectsCountForCategory(categoryToDelete.id) > 0 && (
                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${isDark ? 'text-neutral-300' : 'text-slate-700'}`}>
                    Reasignar los proyectos existentes a otra categoría:
                  </label>
                  <select
                    value={reassignTargetId}
                    onChange={(e) => setReassignTargetId(e.target.value)}
                    className={`w-full px-3 py-2 text-xs border rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none ${
                      isDark ? 'bg-[#090a0f] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  >
                    {data.categories
                      .filter(c => c.id !== categoryToDelete.id)
                      .map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.number}. {cat.name} ({getProjectsCountForCategory(cat.id)} trabajos)
                        </option>
                      ))}
                  </select>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCategoryToDelete(null)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    isDark ? 'bg-white/10 hover:bg-white/15 text-neutral-300' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                  }`}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-all shadow-md shadow-red-600/30 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Eliminar y Reasignar</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`px-6 py-3 border-t flex items-center justify-between text-xs ${
          isDark ? 'border-white/10 bg-[#090a0f] text-neutral-400' : 'border-slate-200 bg-slate-50 text-slate-500'
        }`}>
          <span>Los cambios se sincronizan en tiempo real con el portafolio.</span>
          <button
            onClick={onClose}
            className={`px-4 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
              isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
            }`}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
