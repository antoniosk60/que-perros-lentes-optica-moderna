
import React from 'react';
import { WHATSAPP_LINK, ADDRESS, SCHEDULE } from '../constants';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-12 md:p-20 bg-slate-900 text-white">
            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">¿Listo para estrenar?</h2>
            <h3 className="text-4xl md:text-5xl font-black mb-10 leading-tight">Visítanos o escríbenos hoy mismo.</h3>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="mt-1 p-3 bg-slate-800 rounded-xl group-hover:text-blue-400 transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Ubicación</h4>
                  <p className="text-slate-400 text-lg leading-relaxed">{ADDRESS}</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="mt-1 p-3 bg-slate-800 rounded-xl group-hover:text-blue-400 transition-colors">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Horarios</h4>
                  <p className="text-slate-400 text-lg leading-relaxed">{SCHEDULE}</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="mt-1 p-3 bg-slate-800 rounded-xl group-hover:text-blue-400 transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">WhatsApp Directo</h4>
                  <p className="text-slate-400 text-lg leading-relaxed">Atención inmediata de 10am a 7pm.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center items-center text-center">
            <div className="mb-8 p-6 bg-blue-50 rounded-full">
              <Phone className="w-16 h-16 text-blue-600 animate-pulse" />
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-6">¿Prefieres que te asesoremos por mensaje?</h3>
            <p className="text-slate-600 text-lg mb-10 max-w-sm">
              Estamos a un click de distancia. Cotiza micas, armazones o agenda tu examen de la vista.
            </p>
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-2xl font-black text-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-2.32 0-4.522.903-6.163 2.544-3.4 3.399-3.399 8.928 0 12.327l1.322-1.322c-2.67-2.67-2.67-7.012 0-9.682 1.291-1.291 3.007-2.003 4.841-2.003s3.55.712 4.841 2.003c2.67 2.67 2.67 7.012 0 9.682l1.322 1.322c3.4-3.399 3.4-8.928 0-12.327-1.641-1.641-3.843-2.544-6.163-2.544zM12.031 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10z"/>
                <path d="M17.472 14.382c-.301-.15-1.781-.879-2.056-.979-.275-.1-.475-.15-.675.15-.199.299-.775.979-.95 1.178-.175.199-.35.224-.65.075-.299-.149-1.264-.466-2.409-1.485-.889-.792-1.49-1.77-1.664-2.07-.175-.299-.019-.461.13-.61.135-.134.3-.35.45-.524.151-.174.201-.299.301-.499.1-.2.05-.375-.025-.524-.075-.15-.675-1.625-.925-2.225-.244-.589-.493-.51-.675-.519-.175-.009-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.113 3.227 5.12 4.527.714.309 1.272.493 1.706.631.717.227 1.369.195 1.886.118.577-.086 1.781-.727 2.031-1.428.25-.7.25-1.3.175-1.428-.075-.128-.275-.203-.575-.353z"/>
              </svg>
              ESCRIBIR POR WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
