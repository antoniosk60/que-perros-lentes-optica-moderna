
import React from 'react';
import { Home, ShoppingBag, MessageSquare } from 'lucide-react';

const MobileNav: React.FC = () => {
  const navItems = [
    { label: 'Inicio', icon: <Home className="w-5 h-5" />, href: '#inicio' },
    { label: 'Modelos', icon: <ShoppingBag className="w-5 h-5" />, href: '#productos' },
    { label: 'Contacto', icon: <MessageSquare className="w-5 h-5" />, href: '#contacto' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-[90] pb-safe shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.1)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex flex-col items-center justify-center w-full h-full text-slate-500 active:text-blue-600 transition-colors gap-1"
          >
            <div className="p-1 rounded-lg">
              {item.icon}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
