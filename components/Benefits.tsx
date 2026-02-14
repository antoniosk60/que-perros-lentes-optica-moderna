
import React from 'react';
import { BENEFITS } from '../constants';

const Benefits: React.FC = () => {
  return (
    <div className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/3">
            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-[0.2em] mb-4">¿Por qué elegirnos?</h2>
            <h3 className="text-5xl font-black mb-6 leading-tight">Mucho más que una óptica.</h3>
            <p className="text-slate-400 text-xl leading-relaxed">
              En Qué Perros Lentes nos obsesionamos con los detalles para que tú solo te preocupes por lucir increíble.
            </p>
          </div>
          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-8">
            {BENEFITS.map((benefit, idx) => (
              <div key={idx} className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-blue-500 transition-colors group">
                <div className="mb-6 p-4 bg-slate-900 w-fit rounded-2xl group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h4 className="text-2xl font-bold mb-3">{benefit.title}</h4>
                <p className="text-slate-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
