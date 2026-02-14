
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Products from './components/Products';
import Benefits from './components/Benefits';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import MobileNav from './components/MobileNav';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-grow">
        <section id="inicio">
          <Hero />
        </section>
        <section id="nosotros">
          <AboutUs />
        </section>
        <section id="productos">
          <Products />
        </section>
        <section id="beneficios" className="bg-slate-900 text-white">
          <Benefits />
        </section>
        <section id="proceso">
          <Process />
        </section>
        <section id="contacto">
          <Contact />
        </section>
      </main>
      <Footer />
      <MobileNav />
      <FloatingWhatsApp />
    </div>
  );
};

export default App;
