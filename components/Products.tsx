
import React, { useRef, useState, useMemo } from 'react';
import { WHATSAPP_LINK } from '../constants';
import { ChevronLeft, ChevronRight, ShoppingCart, X, Info, Filter, SlidersHorizontal, Check } from 'lucide-react';

interface ProductDetail {
  id: string;
  name: string;
  description: string;
  image: string;
  style: 'Moderno' | 'Clásico' | 'Deportivo' | 'Elegante';
  material: 'Acetato' | 'Metal' | 'TR90' | 'Titanio';
  priceRange: 'Económico' | 'Intermedio' | 'Premium';
  category: string;
}

interface Category {
  title: string;
  description: string;
  images: string[];
  details: ProductDetail[];
}

const productCategories: Category[] = [
  {
    title: "Lentes Graduados",
    description: "Micas monofocales, bifocales y progresivas con antirreflejante de última generación.",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=600&q=80"
    ],
    details: [
      {
        id: 'g1',
        name: "Micas Antirreflejantes Elite",
        description: "Elimina los reflejos molestos y mejora la claridad visual en condiciones de poca luz.",
        image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=400&q=80",
        style: 'Elegante',
        material: 'Acetato',
        priceRange: 'Premium',
        category: 'Lentes Graduados'
      },
      {
        id: 'g2',
        name: "Filtro de Luz Azul Pro",
        description: "Protección esencial para quienes pasan más de 4 horas frente a pantallas digitales.",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80",
        style: 'Moderno',
        material: 'TR90',
        priceRange: 'Intermedio',
        category: 'Lentes Graduados'
      },
      {
        id: 'g3',
        name: "Lentes Progresivos Digitales",
        description: "Visión nítida a todas las distancias con una transición suave y natural.",
        image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=400&q=80",
        style: 'Clásico',
        material: 'Titanio',
        priceRange: 'Premium',
        category: 'Lentes Graduados'
      }
    ]
  },
  {
    title: "Lentes de Sol",
    description: "Protección UV400 y polarizados con estilos clásicos y de vanguardia.",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=600&q=80"
    ],
    details: [
      {
        id: 's1',
        name: "Polarizados High-Contrast",
        description: "Bloquea el deslumbramiento y mejora la percepción del color y el contraste.",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80",
        style: 'Deportivo',
        material: 'Metal',
        priceRange: 'Intermedio',
        category: 'Lentes de Sol'
      },
      {
        id: 's2',
        name: "Estilo Aviador Clásico",
        description: "Un diseño icónico que nunca pasa de moda, ahora con materiales ultra ligeros.",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80",
        style: 'Clásico',
        material: 'Metal',
        priceRange: 'Económico',
        category: 'Lentes de Sol'
      }
    ]
  },
  {
    title: "Armazones Modernos",
    description: "Materiales ligeros como acetato, TR90 y titanio en colores increíbles.",
    images: [
      "https://images.unsplash.com/photo-1508243529287-e219147131df?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
    ],
    details: [
      {
        id: 'a1',
        name: "TR90 Ultra Flex",
        description: "Armazones prácticamente indestructibles y sumamente ligeros para comodidad todo el día.",
        image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=400&q=80",
        style: 'Moderno',
        material: 'TR90',
        priceRange: 'Económico',
        category: 'Armazones Modernos'
      },
      {
        id: 'a2',
        name: "Acetato Pulido a Mano",
        description: "Acabados premium con colores vibrantes y una textura de lujo.",
        image: "https://images.unsplash.com/photo-1508243529287-e219147131df?auto=format&fit=crop&w=400&q=80",
        style: 'Elegante',
        material: 'Acetato',
        priceRange: 'Premium',
        category: 'Armazones Modernos'
      }
    ]
  }
];

const lensTypes = [
  { id: 'monofocal', label: 'Monofocal', price: 0, description: 'Visión sencilla (lejos o cerca)' },
  { id: 'bifocal', label: 'Bifocal', price: 450, description: 'Doble visión con línea' },
  { id: 'progresivo', label: 'Progresivo', price: 1250, description: 'Visión continua sin líneas' },
];

const treatments = [
  { id: 'ar', label: 'Antirreflejante Básico', price: 250, description: 'Mejora claridad visual' },
  { id: 'blue', label: 'Filtro Luz Azul', price: 550, description: 'Protección para pantallas' },
  { id: 'photo', label: 'Fotocromático', price: 850, description: 'Se oscurecen con el sol' },
];

const ProductCarousel = ({ images, title }: { images: string[], title: string }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group/carousel h-64 overflow-hidden pointer-events-none md:pointer-events-auto">
      <div 
        ref={scrollRef}
        className="flex h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide no-scrollbar pointer-events-auto"
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="flex-none w-full h-full snap-center">
            <img 
              src={img} 
              alt={`${title} view ${idx + 1}`} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      <button 
        onClick={(e) => { e.stopPropagation(); scroll('left'); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10 hover:bg-white pointer-events-auto"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5 text-slate-900" />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); scroll('right'); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover/carousel:opacity-100 transition-opacity z-10 hover:bg-white pointer-events-auto"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5 text-slate-900" />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
        {images.map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/50 shadow-sm"></div>
        ))}
      </div>
    </div>
  );
};

const ProductModal = ({ category, onClose }: { category: Category, onClose: () => void }) => {
  const [selectedLens, setSelectedLens] = useState(lensTypes[0].id);
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);

  const toggleTreatment = (id: string) => {
    setSelectedTreatments(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const totalPriceAdjustment = useMemo(() => {
    const lensPrice = lensTypes.find(l => l.id === selectedLens)?.price || 0;
    const treatmentsPrice = selectedTreatments.reduce((acc, id) => {
      return acc + (treatments.find(t => t.id === id)?.price || 0);
    }, 0);
    return lensPrice + treatmentsPrice;
  }, [selectedLens, selectedTreatments]);

  const selectedLensLabel = lensTypes.find(l => l.id === selectedLens)?.label;
  const selectedTreatmentsLabels = selectedTreatments.map(id => treatments.find(t => t.id === id)?.label).join(', ');

  const whatsappMsg = encodeURIComponent(
    `¡Hola! Me interesan los ${category.title}. Configuración: Mica ${selectedLensLabel}${selectedTreatments.length > 0 ? ` con ${selectedTreatmentsLabels}` : ''}.`
  );

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl max-h-[95vh] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900">{category.title}</h3>
            <p className="text-slate-500 text-sm md:text-base font-medium uppercase tracking-widest">Configura tus micas</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
            aria-label="Cerrar detalles"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 md:p-10">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: Configuration Options */}
            <div className="lg:col-span-2 space-y-10">
              {/* Lens Type Section */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</div>
                  <h4 className="text-xl font-black text-slate-900">Selecciona el tipo de mica</h4>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {lensTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedLens(type.id)}
                      className={`relative p-5 rounded-2xl border-2 text-left transition-all ${
                        selectedLens === type.id 
                          ? 'border-blue-600 bg-blue-50/50 shadow-md' 
                          : 'border-slate-100 hover:border-slate-200 bg-white'
                      }`}
                    >
                      {selectedLens === type.id && (
                        <div className="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" strokeWidth={4} />
                        </div>
                      )}
                      <div className="font-bold text-slate-900 mb-1">{type.label}</div>
                      <div className="text-xs text-slate-500 leading-relaxed mb-3">{type.description}</div>
                      <div className="text-blue-600 font-black">+{type.price > 0 ? `$${type.price}` : 'Base'}</div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Treatments Section */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</div>
                  <h4 className="text-xl font-black text-slate-900">Agrega tratamientos (Opcional)</h4>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {treatments.map((treatment) => (
                    <button
                      key={treatment.id}
                      onClick={() => toggleTreatment(treatment.id)}
                      className={`relative p-5 rounded-2xl border-2 text-left transition-all ${
                        selectedTreatments.includes(treatment.id)
                          ? 'border-blue-600 bg-blue-50/50 shadow-md' 
                          : 'border-slate-100 hover:border-slate-200 bg-white'
                      }`}
                    >
                      {selectedTreatments.includes(treatment.id) && (
                        <div className="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" strokeWidth={4} />
                        </div>
                      )}
                      <div className="font-bold text-slate-900 mb-1">{treatment.label}</div>
                      <div className="text-xs text-slate-500 leading-relaxed mb-3">{treatment.description}</div>
                      <div className="text-blue-600 font-black">+${treatment.price}</div>
                    </button>
                  ))}
                </div>
              </section>
              
              {/* Product Visual Info */}
              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Modelos Destacados</h4>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {category.details.map((detail, idx) => (
                    <div key={idx} className="flex-none w-48 group">
                      <div className="aspect-square rounded-2xl overflow-hidden mb-3 border border-slate-100 shadow-sm">
                        <img src={detail.image} alt={detail.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <h5 className="font-bold text-sm text-slate-900 truncate">{detail.name}</h5>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right: Summary Card */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white sticky top-0 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-8 italic">Resumen de Cotización</h4>
                  
                  <div className="space-y-6 mb-10">
                    <div className="flex justify-between items-start border-b border-white/10 pb-4">
                      <div>
                        <div className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Mica Seleccionada</div>
                        <div className="font-bold text-lg">{selectedLensLabel}</div>
                      </div>
                      <div className="font-black text-blue-400">
                        {lensTypes.find(l => l.id === selectedLens)?.price ? `+$${lensTypes.find(l => l.id === selectedLens)?.price}` : 'Incluido'}
                      </div>
                    </div>

                    {selectedTreatments.length > 0 && (
                      <div className="flex justify-between items-start border-b border-white/10 pb-4 animate-in fade-in duration-300">
                        <div>
                          <div className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Tratamientos</div>
                          <div className="font-bold text-sm space-y-1">
                            {selectedTreatments.map(id => (
                              <div key={id} className="flex items-center gap-2">
                                <Check className="w-3 h-3 text-green-400" />
                                {treatments.find(t => t.id === id)?.label}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="font-black text-blue-400">
                          +${selectedTreatments.reduce((acc, id) => acc + (treatments.find(t => t.id === id)?.price || 0), 0)}
                        </div>
                      </div>
                    )}

                    <div className="pt-4">
                      <div className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Ajuste de Precio Estimado</div>
                      <div className="text-4xl font-black text-white flex items-baseline gap-1">
                        +${totalPriceAdjustment}
                        <span className="text-xs text-slate-400 ml-2 font-medium">MXN</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-4 leading-relaxed">
                        *El precio final depende del armazón seleccionado y la graduación exacta (dioptrías).
                      </p>
                    </div>
                  </div>

                  <a 
                    href={`${WHATSAPP_LINK}&text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/40 flex items-center justify-center gap-3 active:scale-95"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    LO QUIERO
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [activeFilter, setActiveFilter] = useState<{
    style: string;
    material: string;
    price: string;
  }>({ style: 'Todos', material: 'Todos', price: 'Todos' });

  const allProducts = useMemo(() => {
    return productCategories.flatMap(cat => cat.details);
  }, []);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      const matchStyle = activeFilter.style === 'Todos' || product.style === activeFilter.style;
      const matchMaterial = activeFilter.material === 'Todos' || product.material === activeFilter.material;
      const matchPrice = activeFilter.price === 'Todos' || product.priceRange === activeFilter.price;
      return matchStyle && matchMaterial && matchPrice;
    });
  }, [allProducts, activeFilter]);

  const isFiltering = activeFilter.style !== 'Todos' || activeFilter.material !== 'Todos' || activeFilter.price !== 'Todos';

  const filterOptions = {
    style: ['Todos', 'Moderno', 'Clásico', 'Deportivo', 'Elegante'],
    material: ['Todos', 'Acetato', 'Metal', 'TR90', 'Titanio'],
    price: ['Todos', 'Económico', 'Intermedio', 'Premium']
  };

  return (
    <div className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight uppercase italic">Catálogo & Modelos</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">
            Encuentra los lentes perfectos para ti usando nuestros filtros especializados.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-12 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6 text-slate-900 font-black uppercase text-sm tracking-widest">
            <SlidersHorizontal className="w-4 h-4" />
            Filtrar Catálogo
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Estilo</label>
              <select 
                value={activeFilter.style}
                onChange={(e) => setActiveFilter(prev => ({ ...prev, style: e.target.value }))}
                className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {filterOptions.style.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Material</label>
              <select 
                value={activeFilter.material}
                onChange={(e) => setActiveFilter(prev => ({ ...prev, material: e.target.value }))}
                className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {filterOptions.material.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Presupuesto</label>
              <select 
                value={activeFilter.price}
                onChange={(e) => setActiveFilter(prev => ({ ...prev, price: e.target.value }))}
                className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {filterOptions.price.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>
          {isFiltering && (
            <button 
              onClick={() => setActiveFilter({ style: 'Todos', material: 'Todos', price: 'Todos' })}
              className="mt-6 text-blue-600 text-xs font-bold uppercase tracking-widest hover:text-blue-700"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {isFiltering ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 italic">Resultados ({filteredProducts.length})</h3>
            </div>
            {filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 flex flex-col group">
                    <div className="h-48 overflow-hidden relative">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black px-2 py-1 rounded">
                        {product.category}
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h4 className="text-lg font-bold text-slate-900 mb-2">{product.name}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-grow">{product.description}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold uppercase">{product.material}</span>
                        <span className="text-[10px] bg-blue-50 text-blue-500 px-2 py-0.5 rounded font-bold uppercase">{product.style}</span>
                      </div>
                      <a 
                        href={`${WHATSAPP_LINK}&text=Hola!%20Me%20interesa%20el%20modelo%20${encodeURIComponent(product.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Preguntar por WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
                <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-slate-400">No encontramos lentes con esos filtros</h4>
                <button 
                  onClick={() => setActiveFilter({ style: 'Todos', material: 'Todos', price: 'Todos' })}
                  className="mt-4 text-blue-600 font-bold"
                >
                  Intentar con otros filtros
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {productCategories.map((cat, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedCategory(cat)}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 flex flex-col h-full border border-slate-100"
              >
                <ProductCarousel images={cat.images} title={cat.title} />
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-2xl font-black text-slate-900">{cat.title}</h4>
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">Detalles</span>
                  </div>
                  <p className="text-slate-500 mb-8 leading-relaxed flex-grow text-sm font-medium">
                    {cat.description}
                  </p>
                  <div className="space-y-4 mt-auto">
                    <a 
                      href={WHATSAPP_LINK}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 active:scale-[0.98]"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Configurar & Comprar
                    </a>
                    <button 
                      className="flex items-center text-slate-400 text-xs font-bold hover:text-blue-600 transition-colors gap-2 w-full justify-center uppercase tracking-widest"
                    >
                      Ver más información
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-20 bg-slate-900 rounded-[3rem] p-10 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
           <div className="relative z-10">
             <span className="inline-block bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full mb-6 uppercase tracking-[0.2em]">Rápido & Fácil</span>
             <h3 className="text-3xl md:text-5xl font-black mb-6 italic tracking-tight">¿Ya tienes tu receta?</h3>
             <p className="text-lg md:text-xl mb-10 text-slate-400 max-w-2xl mx-auto font-medium">
               Sube la foto de tu examen de la vista por WhatsApp y recibe una cotización con los mejores armazones para tu rostro.
             </p>
             <a 
               href={WHATSAPP_LINK}
               className="bg-white text-slate-900 px-12 py-5 rounded-2xl font-black text-xl hover:bg-blue-50 transition-all shadow-xl inline-flex items-center gap-3"
             >
               ENVIAR MI RECETA
               <ChevronRight className="w-6 h-6" />
             </a>
           </div>
           <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full -mr-40 -mt-40 blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32"></div>
        </div>
      </div>

      {selectedCategory && (
        <ProductModal 
          category={selectedCategory} 
          onClose={() => setSelectedCategory(null)} 
        />
      )}
    </div>
  );
};

export default Products;
