
import React from 'react';
import { WHATSAPP_LINK } from '../constants';
import { ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-100">
      {/* Background Image / Pattern */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/id/160/1920/1080" 
          alt="Modern glasses aesthetic" 
          className="w-full h-full object-cover opacity-60 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
            Tendencia & Salud Visual
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
            Lentes que se ven bien,<br /> 
            <span className="text-blue-600 italic">te hacen ver mejor.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8 font-medium leading-relaxed">
            Especialistas en lentes oftálmicos y de sol con diseños que resaltan tu personalidad. Calidad premium sin precios de centro comercial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Cotiza por WhatsApp
              <ChevronRight className="w-5 h-5" />
            </a>
            <a 
              href="#productos"
              className="bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center hover:bg-slate-50 transition-all"
            >
              Ver Catálogo
            </a>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <img 
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover" 
                  src={`https://picsum.photos/id/${i+50}/100/100`} 
                  alt="Happy Customer" 
                />
              ))}
            </div>
            <p className="text-sm text-slate-500 font-semibold italic">
              +500 miradas renovadas este año
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
