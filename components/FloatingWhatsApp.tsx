
import React from 'react';
import { WHATSAPP_LINK } from '../constants';

const FloatingWhatsApp: React.FC = () => {
  return (
    <a 
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-8 right-6 md:right-8 z-[100] bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center"
      aria-label="Contactar por WhatsApp"
    >
      <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.301-.15-1.781-.879-2.056-.979-.275-.1-.475-.15-.675.15-.199.299-.775.979-.95 1.178-.175.199-.35.224-.65.075-.299-.149-1.264-.466-2.409-1.485-.889-.792-1.49-1.77-1.664-2.07-.175-.299-.019-.461.13-.61.135-.134.3-.35.45-.524.151-.174.201-.299.301-.499.1-.2.05-.375-.025-.524-.075-.15-.675-1.625-.925-2.225-.244-.589-.493-.51-.675-.519-.175-.009-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.113 3.227 5.12 4.527.714.309 1.272.493 1.706.631.717.227 1.369.195 1.886.118.577-.086 1.781-.727 2.031-1.428.25-.7.25-1.3.175-1.428-.075-.128-.275-.203-.575-.353zM12.031 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10z"/>
      </svg>
    </a>
  );
};

export default FloatingWhatsApp;
