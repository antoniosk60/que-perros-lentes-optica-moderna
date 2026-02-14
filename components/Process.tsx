
import React from 'react';
import { PROCESS_STEPS } from '../constants';

const Process: React.FC = () => {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Tu nueva vista en 4 pasos</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Hacerte de unos lentes nuevos nunca fue tan fácil. Sin trámites complicados, todo directo por WhatsApp.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-12 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-8 z-0"></div>

          {PROCESS_STEPS.map((step, idx) => (
            <div key={idx} className="relative z-10 text-center flex flex-col items-center group">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                {step.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h4>
              <p className="text-slate-500 leading-relaxed px-4">
                {step.description}
              </p>
              {/* Step number badge */}
              <div className="mt-4 bg-slate-100 text-slate-400 text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
                {idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Process;
