
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Productos', href: '#productos' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-slate-900 text-white p-2 rounded-lg font-black text-xl tracking-tighter italic">
            QPL
          </div>
          <span className={`text-xl font-extrabold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-slate-900 md:text-white'}`}>
            Qué Perros Lentes
          </span>
        </div>
        
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <a 
              key={item.label}
              href={item.href} 
              className={`text-sm font-semibold uppercase tracking-wider hover:opacity-70 transition-opacity ${
                isScrolled ? 'text-slate-600' : 'text-slate-900 md:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a 
          href="#contacto"
          className="md:hidden bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-full"
        >
          CONTACTO
        </a>
      </div>
    </header>
  );
};

export default Header;
