
import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <div className="relative">
              <img 
                src="https://picsum.photos/id/442/800/600" 
                alt="About Qué Perros Lentes" 
                className="rounded-3xl shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-blue-500 rounded-3xl z-0"></div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-4">Nuestra Historia</h2>
            <h3 className="text-4xl font-extrabold text-slate-900 mb-6">Porque tu vista merece algo más que lo convencional.</h3>
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                <strong>Qué Perros Lentes</strong> nació de una idea simple: comprar lentes no debería ser aburrido ni excesivamente caro. Vimos que el mercado estaba dividido entre armazones carísimos de marca o micas de mala calidad.
              </p>
              <p>
                Nos enfocamos en ofrecer un <strong>trato cercano</strong> y experto. Seleccionamos cuidadosamente cada armazón pensando en las tendencias actuales y en la comodidad que necesitas para tu día a día.
              </p>
              <p>
                Nuestro compromiso es con tu estilo y tu bolsillo. Aquí no pagas por el logo de una marca de lujo, pagas por <strong>calidad, diseño y una visión perfecta.</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
