/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { 
  Glasses, 
  Eye, 
  Search, 
  Wrench, 
  Ruler, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Star, 
  ChevronRight,
  Menu,
  X,
  Instagram,
  Facebook,
  Filter,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Camera,
  User,
  Send,
  Gift,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
const COLORS = {
  primary: "#1e3a8a", // Deep Blue
  secondary: "#0f172a", // Slate Black
  accent: "#d4af37", // Gold
  white: "#ffffff",
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const [cart, setCart] = useState<any[]>([]);
  const [tryOnImage, setTryOnImage] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState([
    { role: "bot", text: "¡Hola! Soy el asistente virtual de SMART LENS IZCALLI. ¿En qué puedo ayudarte hoy?" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [reviews, setReviews] = useState([
    { name: "María González", text: "Excelente atención y los lentes me quedaron perfectos. Muy recomendados.", stars: 5, date: "hace 2 días" },
    { name: "Roberto Silva", text: "Gran variedad de armazones y el examen de la vista fue muy profesional.", stars: 5, date: "hace 1 semana" },
    { name: "Ana Martínez", text: "El mejor servicio en Izcalli. Mis lentes llegaron antes de lo esperado.", stars: 5, date: "hace 2 semanas" },
  ]);
  const [newReview, setNewReview] = useState({ name: "", text: "", stars: 5 });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const addToCart = (product: any) => {
    const existing = cart.find(item => item.title === product.title);
    if (existing) {
      setCart(cart.map(item => item.title === product.title ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1, price: product.title === "Lentes Graduados" ? 1200 : product.title === "Lentes de Sol" ? 850 : 600 }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (title: string) => {
    setCart(cart.filter(item => item.title !== title));
  };

  const updateQuantity = (title: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.title === title) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const totalCart = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const sendQuoteWhatsApp = () => {
    const message = `Hola SMART LENS IZCALLI, me gustaría una cotización por:\n${cart.map(item => `- ${item.title} (${item.quantity}x): $${item.price * item.quantity}`).join("\n")}\nTotal: $${totalCart}\n¿Tienen disponibilidad?`;
    window.open(`https://wa.me/525518486327?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleTryOnUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setTryOnImage(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    const newMessages = [...chatMessages, { role: "user", text: userInput }];
    setChatMessages(newMessages);
    setUserInput("");
    
    // Simple bot logic
    setTimeout(() => {
      let botResponse = "Lo siento, no entiendo esa pregunta. ¿Te gustaría hablar con un humano por WhatsApp?";
      const input = userInput.toLowerCase();
      if (input.includes("horario")) botResponse = "Nuestro horario es: Lun-Vie 10am-7pm y Sáb 10am-3pm.";
      else if (input.includes("precio") || input.includes("cuanto")) botResponse = "Nuestros precios varían según el armazón y micas. ¡Puedes ver nuestro catálogo o pedir una cotización!";
      else if (input.includes("promo")) botResponse = "¡Tenemos 2x1 en armazones este mes! ¿Te interesa?";
      
      setChatMessages([...newMessages, { role: "bot", text: botResponse }]);
    }, 1000);
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;
    setReviews([{ ...newReview, date: "Recién publicado" }, ...reviews]);
    setNewReview({ name: "", text: "", stars: 5 });
  };
  const services = [
    {
      title: "Lentes Graduados",
      description: "Contamos con la mejor tecnología en micas para tu graduación exacta.",
      icon: <Glasses className="w-8 h-8" />,
    },
    {
      title: "Examen de la Vista",
      description: "Evaluación profesional completa realizada por especialistas certificados.",
      icon: <Eye className="w-8 h-8" />,
    },
    {
      title: "Armazones Modernos",
      description: "Amplia variedad de marcas y estilos que se adaptan a tu rostro y personalidad.",
      icon: <Search className="w-8 h-8" />,
    },
    {
      title: "Ajuste y Reparación",
      description: "Servicio técnico especializado para mantener tus lentes en perfecto estado.",
      icon: <Wrench className="w-8 h-8" />,
    },
    {
      title: "Adaptación de Lentes",
      description: "Asesoría personalizada para que te sientas cómodo con tu nueva visión.",
      icon: <Ruler className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center">
              <Glasses className="text-white w-6 h-6" />
            </div>
            <span className={`text-lg sm:text-xl font-bold tracking-tight ${isScrolled ? "text-slate-900" : "text-white"}`}>
              SMART LENS <span className="text-blue-600">IZCALLI</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {["Inicio", "Servicios", "Catálogo", "Galería", "Ubicación", "Contacto"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(" & ", "-")}`} 
                className={`text-sm font-medium hover:text-blue-600 transition-colors ${
                  isScrolled ? "text-slate-600" : "text-white/90"
                }`}
              >
                {item}
              </a>
            ))}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className={`relative p-2 rounded-full transition-colors ${isScrolled ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"}`}
              >
                <ShoppingBag className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setIsProfileOpen(true)}
                className={`p-2 rounded-full transition-colors ${isScrolled ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/10"}`}
              >
                <User className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
              >
                Reservar Ahora
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={isScrolled ? "text-slate-900" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-slate-900" : "text-white"} />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-6 px-4 flex flex-col gap-4 md:hidden border-t border-slate-100"
          >
            {["Inicio", "Servicios", "Catálogo", "Galería", "Ubicación", "Contacto"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(" & ", "-")}`} 
                className="text-slate-600 font-medium py-2 border-b border-slate-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button 
              onClick={() => {
                setIsBookingOpen(true);
                setIsMenuOpen(false);
              }}
              className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold mt-2"
            >
              Reservar Ahora
            </button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1511317559916-56d5ddb62563?q=80&w=2069&auto=format&fit=crop" 
            alt="Optical Shop"
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 px-3 py-1 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Óptica Profesional</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Cuida tu vista con los <span className="text-blue-500">mejores lentes</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
              Lentes graduados, armazones modernos y examen de la vista profesional. 
              Tecnología de vanguardia para tu salud visual en IZCALLI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-600/30"
              >
                Reservar Ahora
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setIsTryOnOpen(true)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Probador Virtual
              </button>
            </div>
          </motion.div>
        </div>

        {/* Booking Modal */}
        {isBookingOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
              >
                <X className="w-6 h-6 text-slate-500" />
              </button>

              <div className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Reserva tu Cita</h2>
                    <p className="text-slate-500 text-sm">Selecciona el mejor horario para ti</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Tipo de Consulta</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer">
                        <option>Examen de la Vista Completo</option>
                        <option>Consulta de Seguimiento</option>
                        <option>Adaptación de Lentes de Contacto</option>
                        <option>Urgencia Ocular</option>
                        <option>Ajuste de Armazón</option>
                        <option>Consulta Pediátrica</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Optometrista Preferido</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer">
                        <option>Cualquier especialista disponible</option>
                        <option>Dr. Alejandro Ruiz</option>
                        <option>Dra. Claudia Espinoza</option>
                        <option>Dr. Miguel Ángel Torres</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Fecha</label>
                      <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Hora</label>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all appearance-none">
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                        <option>12:00 PM</option>
                        <option>01:00 PM</option>
                        <option>04:00 PM</option>
                        <option>05:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      onClick={() => {
                        alert("¡Reserva confirmada! Te contactaremos pronto.");
                        setIsBookingOpen(false);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                    >
                      Confirmar Reserva
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-4">
                      Al reservar, aceptas nuestros términos y condiciones.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-blue-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats / Features */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Años de Experiencia", value: "10+" },
              { label: "Clientes Felices", value: "5k+" },
              { label: "Modelos de Armazones", value: "500+" },
              { label: "Garantía de Calidad", value: "100%" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-blue-900 mb-1">{stat.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="nosotros" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-600/10 rounded-full -z-10" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-amber-500/10 rounded-full -z-10" />
              <img 
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop" 
                alt="Expert Optician"
                className="rounded-3xl shadow-2xl w-full aspect-[4/5] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl hidden lg:block max-w-xs border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <Star className="text-amber-500 w-5 h-5 fill-amber-500" />
                  </div>
                  <span className="font-bold text-slate-900">Calidad Premium</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Utilizamos materiales de alta durabilidad y cristales con protección avanzada.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Sobre Nosotros</h2>
              <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Pasión por tu visión y estilo en <span className="text-blue-900">IZCALLI</span>
              </h3>
              <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
                En <strong>SMART LENS IZCALLI</strong> combinamos tecnología de punta y atención personalizada para ofrecerte la mejor experiencia visual. 
                Con más de 10 años de experiencia en el sector, somos tu óptica de confianza en el Estado de México. 
                Realizamos exámenes de la vista precisos, contamos con marcas exclusivas de armazones y te asesoramos en la adaptación de lentes según tus necesidades. 
                ¡Tu visión es nuestra prioridad!
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Atención personalizada por optometristas.",
                  "Las mejores marcas nacionales e internacionales.",
                  "Precios competitivos y promociones constantes.",
                  "Servicio post-venta y ajustes sin costo."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 p-1 rounded-full">
                      <ChevronRight className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-3 rounded-full font-bold transition-all">
                Conoce más
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Catalog & Models */}
      <section id="catálogo" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Catálogo & Modelos</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-6">Encuentra los lentes perfectos para ti</h3>
            <p className="text-slate-600 text-lg">
              Usa nuestros filtros especializados para descubrir la colección que mejor se adapta a tu estilo y necesidades.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-12">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex items-center gap-2 text-blue-900 font-bold whitespace-nowrap">
                <Filter className="w-5 h-5" />
                Filtrar Catálogo:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <div className="relative group">
                  <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer font-medium text-slate-700">
                    <option>Estilo</option>
                    <option>Aviador</option>
                    <option>Wayfarer</option>
                    <option>Redondos</option>
                    <option>Cuadrados</option>
                    <option>Cat Eye</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors" />
                </div>
                <div className="relative group">
                  <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer font-medium text-slate-700">
                    <option>Material</option>
                    <option>Acetato</option>
                    <option>Metal</option>
                    <option>Titanio</option>
                    <option>TR90</option>
                    <option>Madera</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors" />
                </div>
                <div className="relative group">
                  <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer font-medium text-slate-700">
                    <option>Presupuesto</option>
                    <option>$500 - $1,500</option>
                    <option>$1,500 - $3,000</option>
                    <option>$3,000 - $5,000</option>
                    <option>$5,000+</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Lentes Graduados",
                description: "Micas monofocales, bifocales y progresivas con antirreflejante de última generación.",
                images: [
                  "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=600&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=600&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1511317559916-56d5ddb62563?q=80&w=600&auto=format&fit=crop"
                ]
              },
              {
                title: "Lentes de Sol",
                description: "Protección UV400 y polarizados con estilos clásicos y de vanguardia.",
                images: [
                  "https://images.unsplash.com/photo-1516714819001-8ee7a13b71d7?q=80&w=600&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=600&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=600&auto=format&fit=crop"
                ]
              },
              {
                title: "Armazones Modernos",
                description: "Materiales ligeros como acetato, TR90 y titanio en colores increíbles.",
                images: [
                  "https://images.unsplash.com/photo-1509660197257-c54b39580aef?q=80&w=600&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=600&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop"
                ]
              }
            ].map((product, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="flex h-full transition-transform duration-500 group-hover:-translate-x-full">
                    {product.images.map((img, idx) => (
                      <img 
                        key={idx}
                        src={img} 
                        alt={`${product.title} view ${idx + 1}`}
                        className="w-full h-full object-cover flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-blue-900 uppercase tracking-widest border border-blue-100">
                    Nueva Colección
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-bold text-slate-900 mb-3">{product.title}</h4>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                    {product.description}
                  </p>
                    <div className="flex flex-col gap-3">
                      <button 
                        onClick={() => addToCart(product)}
                        className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-blue-900 transition-all flex items-center justify-center gap-2 group/btn"
                      >
                        <ShoppingBag className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        Configurar & Comprar
                      </button>
                      <button 
                        onClick={() => setIsTryOnOpen(true)}
                        className="w-full bg-slate-50 text-slate-600 font-bold py-3.5 rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                      >
                        <Camera className="w-4 h-4" />
                        Probar en mi rostro
                      </button>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="servicios" className="py-24 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4">Nuestros Servicios</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">Soluciones visuales completas</h3>
            <p className="text-slate-400 text-lg">
              Ofrecemos una gama completa de servicios para garantizar que veas el mundo con total claridad.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-slate-900/50 border border-slate-800 p-10 rounded-3xl hover:border-blue-500/50 transition-all group"
              >
                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {service.icon}
                </div>
                <h4 className="text-2xl font-bold mb-4">{service.title}</h4>
                <p className="text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Promotion Banner */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-[3rem] p-12 text-center text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-amber-500 text-blue-950 px-4 py-1 rounded-full text-sm font-bold mb-6">
                <Star className="w-4 h-4 fill-blue-950" />
                PROMOCIÓN DEL MES
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                2x1 en armazones al comprar lentes graduados + examen gratis
              </h3>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Aprovecha esta oferta única y renueva tu mirada con el mejor estilo y protección.
              </p>
              <a 
                href="https://wa.me/5215518486327?text=Quiero%20más%20info%20de%20la%20promoción%202x1" 
                target="_blank"
                className="inline-flex items-center gap-2 bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-full font-bold transition-all shadow-xl"
              >
                <MessageCircle className="w-5 h-5 text-green-500" />
                ¡Pregunta ahora por WhatsApp!
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section id="galería" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Galería</h2>
              <h3 className="text-4xl font-bold text-slate-900">Descubre nuestro estilo</h3>
            </div>
            <button className="text-blue-600 font-bold flex items-center gap-2 hover:underline">
              Ver todo en Facebook <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1509660197257-c54b39580aef?q=80&w=1974&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1516714819001-8ee7a13b71d7?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1511317559916-56d5ddb62563?q=80&w=2069&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=2080&auto=format&fit=crop",
            ].map((img, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className={`relative rounded-2xl overflow-hidden shadow-lg ${i === 0 || i === 6 ? "md:col-span-2 md:row-span-2" : ""}`}
              >
                <img 
                  src={img} 
                  alt={`Gallery ${i}`} 
                  className="w-full h-full object-cover aspect-square md:aspect-auto"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-blue-900/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white/90 p-3 rounded-full">
                    <Search className="w-6 h-6 text-blue-900" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Testimonios</h2>
            <h3 className="text-4xl font-bold text-slate-900">Lo que dicen nuestros clientes</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {reviews.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-blue-100 relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className={`w-4 h-4 ${idx < t.stars ? "text-amber-500 fill-amber-500" : "text-slate-200"}`} />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{t.date}</span>
                </div>
                <p className="text-slate-600 italic mb-6 leading-relaxed">"{t.text}"</p>
                <div className="font-bold text-slate-900">— {t.name}</div>
              </div>
            ))}
          </div>

          {/* Review Form */}
          <div className="max-w-2xl mx-auto bg-white p-10 rounded-[2.5rem] shadow-xl border border-blue-100">
            <h4 className="text-2xl font-bold text-slate-900 mb-6 text-center">Deja tu opinión</h4>
            <form onSubmit={submitReview} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Tu nombre" 
                  value={newReview.name}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                  className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all"
                />
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
                  <span className="text-sm font-bold text-slate-500">Calificación:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star} 
                        type="button"
                        onClick={() => setNewReview({...newReview, stars: star})}
                        className="transition-transform active:scale-125"
                      >
                        <Star className={`w-5 h-5 ${star <= newReview.stars ? "text-amber-500 fill-amber-500" : "text-slate-300"}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <textarea 
                placeholder="Cuéntanos tu experiencia..." 
                rows={3}
                value={newReview.text}
                onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all resize-none"
              />
              <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                Publicar Reseña
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section id="ubicación" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Contacto</h2>
              <h3 className="text-4xl font-bold text-slate-900 mb-8">Visítanos hoy mismo</h3>
              
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Dirección</h4>
                    <p className="text-slate-600">Av Cuauhtémoc 57 local 1, Estado de México, México, 56560</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Teléfono / WhatsApp</h4>
                    <p className="text-slate-600">55 1848 6327</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Horario</h4>
                    <p className="text-slate-600">Lun-Vie: 10:00 AM - 7:00 PM</p>
                    <p className="text-slate-600">Sábado: 10:00 AM - 3:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form id="contacto" className="space-y-4 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Nombre" 
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all"
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Asunto" 
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all"
                />
                <textarea 
                  placeholder="Mensaje" 
                  rows={4}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all resize-none"
                />
                <button className="w-full bg-blue-900 text-white font-bold py-4 rounded-xl hover:bg-slate-900 transition-all shadow-lg shadow-blue-900/20">
                  Enviar Mensaje
                </button>
              </form>
            </div>

            <div className="h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.538740263628!2d-98.9234567!3d19.2915678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce1f5f5f5f5f5f%3A0x5f5f5f5f5f5f5f5f!2sAv%20Cuauht%C3%A9moc%2057%2C%20Ixtapaluca%2C%20Edo%20de%20M%C3%A9xico!5e0!3m2!1ses-419!2smx!4v1711000000000!5m2!1ses-419!2smx" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Glasses className="text-white w-6 h-6" />
                </div>
                <span className="text-xl sm:text-2xl font-bold tracking-tight">
                  SMART LENS <span className="text-blue-500">IZCALLI</span>
                </span>
              </div>
              <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
                Tu salud visual es nuestra prioridad. Ofrecemos los mejores lentes graduados 
                y armazones modernos con tecnología de punta y atención profesional.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Enlaces Rápidos</h4>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#inicio" className="hover:text-blue-500 transition-colors">Inicio</a></li>
                <li><a href="#nosotros" className="hover:text-blue-500 transition-colors">Nosotros</a></li>
                <li><a href="#servicios" className="hover:text-blue-500 transition-colors">Servicios</a></li>
                <li><a href="#catálogo" className="hover:text-blue-500 transition-colors">Catálogo</a></li>
                <li><a href="#galería" className="hover:text-blue-500 transition-colors">Galería</a></li>
                <li><a href="#contacto" className="hover:text-blue-500 transition-colors">Contacto</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Promociones</h4>
              <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-2xl">
                <p className="text-sm text-blue-400 font-bold mb-2 uppercase tracking-widest">Oferta del Mes</p>
                <p className="font-bold text-white mb-4">20% de descuento en tu segundo par de lentes.</p>
                <button className="text-xs font-bold underline hover:text-blue-400 transition-colors">
                  Ver detalles
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col md:row justify-between items-center gap-4 text-slate-500 text-sm">
            <p>© 2026 SMART LENS IZCALLI. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Buttons & Modals */}
      
      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/525518486327" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[60] bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 active:scale-95 group"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-100">
          ¿En qué podemos ayudarte?
        </span>
      </a>

      {/* Chatbot Bubble */}
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-8 left-8 z-[60] bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-all hover:scale-110 active:scale-95 group"
      >
        {isChatOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
      </button>

      {/* Chatbot Window */}
      {isChatOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed bottom-24 left-8 z-[60] w-[350px] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col"
        >
          <div className="bg-blue-600 p-6 text-white">
            <h4 className="font-bold text-lg">Asistente SMART LENS</h4>
            <p className="text-blue-100 text-xs">En línea ahora</p>
          </div>
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-white text-slate-700 rounded-tl-none shadow-sm"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              placeholder="Escribe tu duda..." 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500"
            />
            <button 
              onClick={handleSendMessage}
              className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
                Tu Cotización
              </h3>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4">
                  <ShoppingBag className="w-16 h-16 opacity-20" />
                  <p className="font-medium">Tu carrito está vacío</p>
                </div>
              ) : (
                cart.map((item, i) => (
                  <div key={i} className="flex gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <img src={item.images[0]} className="w-20 h-20 object-cover rounded-xl" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-900">{item.title}</h4>
                        <button onClick={() => removeFromCart(item.title)} className="text-slate-400 hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-blue-600 font-bold text-sm mb-3">${item.price * item.quantity}</p>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(item.title, -1)} className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:border-blue-500">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-slate-700">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.title, 1)} className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:border-blue-500">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 bg-slate-50 border-t border-slate-100 space-y-4">
                <div className="flex justify-between items-center text-lg font-bold text-slate-900">
                  <span>Total Estimado:</span>
                  <span className="text-blue-600">${totalCart}</span>
                </div>
                <button 
                  onClick={sendQuoteWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Enviar Cotización por WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Try-On Modal */}
      {isTryOnOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row"
          >
            <button onClick={() => setIsTryOnOpen(false)} className="absolute top-6 right-6 p-2 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full z-10 shadow-lg">
              <X className="w-6 h-6 text-slate-500" />
            </button>

            <div className="flex-1 bg-slate-100 relative min-h-[400px] flex items-center justify-center overflow-hidden">
              {tryOnImage ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img src={tryOnImage} className="max-w-full max-h-full object-contain" />
                  <motion.div 
                    drag
                    dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                    className="absolute cursor-move"
                  >
                    <Glasses className="w-32 h-32 text-slate-900/80 drop-shadow-2xl" />
                  </motion.div>
                </div>
              ) : (
                <div className="text-center p-12">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                    <Camera className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Probador Virtual AR</h3>
                  <p className="text-slate-500 mb-8">Sube una foto de tu rostro para ver cómo te quedan nuestros modelos.</p>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleTryOnUpload} 
                    className="hidden" 
                    accept="image/*"
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-all"
                  >
                    Subir mi Foto
                  </button>
                </div>
              )}
            </div>

            <div className="w-full md:w-80 p-8 border-l border-slate-100 bg-white">
              <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Selecciona un Modelo</h4>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <button key={i} className="aspect-square bg-slate-50 rounded-2xl border-2 border-transparent hover:border-blue-500 transition-all flex items-center justify-center p-4">
                    <Glasses className="w-full h-full text-slate-400" />
                  </button>
                ))}
              </div>
              <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-xs text-blue-700 font-medium leading-relaxed">
                  <AlertCircle className="w-4 h-4 inline mr-1 mb-1" />
                  Tip: Puedes arrastrar los lentes sobre tu foto para ajustarlos.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative"
          >
            <button onClick={() => setIsProfileOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full">
              <X className="w-6 h-6 text-slate-500" />
            </button>
            
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-64 bg-slate-50 p-8 border-r border-slate-100">
                <div className="w-24 h-24 bg-blue-600 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold">
                  JS
                </div>
                <h4 className="text-xl font-bold text-slate-900 text-center mb-1">Juan Sánchez</h4>
                <p className="text-slate-500 text-xs text-center mb-8">Cliente desde 2024</p>
                
                <nav className="space-y-2">
                  {["Mi Perfil", "Mis Recetas", "Historial", "Ajustes"].map(item => (
                    <button key={item} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${item === "Mi Perfil" ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}>
                      {item}
                    </button>
                  ))}
                </nav>
              </div>
              
              <div className="flex-1 p-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Mi Receta Actual</h3>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ojo Derecho (OD)</p>
                    <p className="text-lg font-bold text-slate-900">-2.50 Sph / -0.75 Cyl</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Ojo Izquierdo (OI)</p>
                    <p className="text-lg font-bold text-slate-900">-2.25 Sph / -1.00 Cyl</p>
                  </div>
                </div>
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-4">
                  <CheckCircle2 className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="font-bold text-blue-900">Próximo Examen</p>
                    <p className="text-sm text-blue-700">Recomendado para Octubre 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
