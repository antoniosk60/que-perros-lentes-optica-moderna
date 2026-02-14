
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-white text-slate-900 p-2 rounded-lg font-black text-lg italic">
              QPL
            </div>
            <span className="text-xl font-black text-white tracking-tight">Qué Perros Lentes</span>
          </div>

          <div className="flex gap-8 text-sm font-medium">
            <a href="#nosotros" className="hover:text-white transition-colors">Nosotros</a>
            <a href="#productos" className="hover:text-white transition-colors">Productos</a>
            <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
          </div>

          <p className="text-sm">
            © {new Date().getFullYear()} Qué Perros Lentes. Todos los derechos reservados.
          </p>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs opacity-50">
          <p>La salud visual es importante. Realiza tu examen de la vista al menos una vez al año.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
