
import React from 'react';
import { ShoppingCart, HeartPulse, Sparkles, Wallet, MessageSquare, Search, Glasses, CheckCircle } from 'lucide-react';

export const WHATSAPP_LINK = "https://wa.me/521234567890?text=Hola!%20Me%20interesa%20cotizar%20unos%20lentes.";
export const ADDRESS = "Av. Principal #123, Col. Centro, Ciudad de México, CP 06000 (A dos cuadras del metro).";
export const SCHEDULE = "Lunes a Viernes: 10:00 AM - 7:00 PM | Sábados: 10:00 AM - 3:00 PM";

export const BENEFITS = [
  {
    icon: <HeartPulse className="w-8 h-8 text-blue-500" />,
    title: "Atención Personalizada",
    description: "No somos una cadena más. Te asesoramos según la forma de tu rostro y necesidades visuales."
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-green-500" />,
    title: "Calidad Garantizada",
    description: "Trabajamos con los mejores materiales y laboratorios para asegurar la durabilidad de tus lentes."
  },
  {
    icon: <Sparkles className="w-8 h-8 text-purple-500" />,
    title: "Diseños Modernos",
    description: "Tenemos lo último en tendencias. Armazones que realmente te harán decir: ¡Qué perros lentes!"
  },
  {
    icon: <Wallet className="w-8 h-8 text-amber-500" />,
    title: "Precios Accesibles",
    description: "Estilo y salud visual no tienen por qué ser caros. Opciones para todos los presupuestos."
  }
];

export const PROCESS_STEPS = [
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Contáctanos",
    description: "Envíanos un mensaje por WhatsApp. Cuéntanos qué buscas."
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Asesoría Gratis",
    description: "Te enviamos opciones digitales y resolvemos tus dudas sobre graduaciones."
  },
  {
    icon: <Glasses className="w-6 h-6" />,
    title: "Elige tus Favoritos",
    description: "Selecciona el armazón y el tipo de mica que mejor se adapte a ti."
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "Entrega o Envío",
    description: "Recibe tus lentes listos para usar y estrenar estilo."
  }
];
