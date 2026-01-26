import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.services': { es: 'Servicios', en: 'Services' },
  'nav.testimonials': { es: 'Testimonios', en: 'Testimonials' },
  'nav.pricing': { es: 'Precios', en: 'Pricing' },
  'nav.guarantees': { es: 'Garantías', en: 'Guarantees' },
  'nav.contact': { es: 'Contacto', en: 'Contact' },
  
  // Hero
  'hero.title': { 
    es: 'Mantenimiento de Piscinas en Miami que Realmente Funciona', 
    en: 'Pool Maintenance in Miami That Actually Works' 
  },
  'hero.subtitle': { 
    es: 'Servicio profesional, confiable y en español. Cubrimos todo Miami-Dade con respuesta garantizada en 2 horas.', 
    en: 'Professional, reliable service. We cover all of Miami-Dade with guaranteed 2-hour response.' 
  },
  'hero.cta.call': { es: 'Llamar Ahora - Respuesta en 2 Horas', en: 'Call Now - 2 Hour Response' },
  'hero.cta.whatsapp': { es: 'WhatsApp para Cotización Gratis', en: 'WhatsApp for Free Quote' },
  'hero.badge.rating': { es: '4.9/5 Google', en: '4.9/5 Google' },
  'hero.badge.licensed': { es: 'Licenciados', en: 'Licensed' },
  'hero.badge.certified': { es: 'CPO Certified', en: 'CPO Certified' },
  'hero.badge.spanish': { es: 'Servicio en Español', en: 'Bilingual Service' },

  // Problems
  'problems.title': { es: '¿Le Suena Familiar Alguno de Estos Problemas?', en: 'Do Any of These Problems Sound Familiar?' },
  'problems.1.title': { es: 'Piscina Verde Recurrente', en: 'Recurring Green Pool' },
  'problems.1.desc': { es: 'Su piscina se pone verde una y otra vez, sin importar cuánto pague por "limpiarla".', en: 'Your pool keeps turning green no matter how much you pay to "clean" it.' },
  'problems.2.title': { es: 'Técnico que No Responde', en: 'Unresponsive Technician' },
  'problems.2.desc': { es: 'Llama, manda mensaje, pero nadie contesta. Su piscina queda abandonada.', en: 'You call, text, but no one answers. Your pool sits abandoned.' },
  'problems.3.title': { es: 'Aumentos de Precio Sorpresa', en: 'Surprise Price Hikes' },
  'problems.3.desc': { es: 'El precio inicial era bueno, pero cada mes aparecen cargos nuevos "necesarios".', en: 'The initial price was good, but new "necessary" charges appear every month.' },
  'problems.4.title': { es: 'Técnico Diferente Cada Semana', en: 'Different Tech Each Week' },
  'problems.4.desc': { es: 'Nunca sabe quién viene. Cada persona hace las cosas diferente.', en: 'You never know who\'s coming. Each person does things differently.' },
  'problems.transition': { es: 'Si identificó alguno de estos problemas, no está solo. Le ofrecemos una solución real.', en: 'If you identified with any of these problems, you\'re not alone. We offer a real solution.' },
  'problems.cta': { es: 'Descubra Nuestra Diferencia', en: 'Discover Our Difference' },

  // Services
  'services.title': { es: 'Así Es Como Mantenemos Su Piscina Perfecta Todas las Semanas', en: 'This Is How We Keep Your Pool Perfect Every Week' },
  'services.1.title': { es: 'Limpieza Profesional Completa', en: 'Complete Professional Cleaning' },
  'services.1.items': { 
    es: 'Cepillado de paredes y piso|Aspirado del fondo|Limpieza de línea de agua|Vaciado de canastas|Limpieza de skimmers', 
    en: 'Wall and floor brushing|Bottom vacuuming|Water line cleaning|Basket emptying|Skimmer cleaning' 
  },
  'services.2.title': { es: 'Balance Químico Preciso', en: 'Precise Chemical Balance' },
  'services.2.items': { 
    es: 'Análisis de agua semanal|Ajuste de pH y cloro|Control de alcalinidad|Prevención de algas|Informe detallado', 
    en: 'Weekly water analysis|pH and chlorine adjustment|Alkalinity control|Algae prevention|Detailed report' 
  },
  'services.3.title': { es: 'Inspección de Equipos', en: 'Equipment Inspection' },
  'services.3.items': { 
    es: 'Revisión de bomba y motor|Inspección de filtro|Verificación de válvulas|Detección temprana de problemas|Recomendaciones de mantenimiento', 
    en: 'Pump and motor check|Filter inspection|Valve verification|Early problem detection|Maintenance recommendations' 
  },
  'services.4.title': { es: 'Comunicación Constante', en: 'Constant Communication' },
  'services.4.items': { 
    es: 'Foto de piscina después del servicio|Reporte por WhatsApp|Respuesta en menos de 2 horas|Programación flexible|Mismo técnico siempre', 
    en: 'Pool photo after service|WhatsApp report|Response in under 2 hours|Flexible scheduling|Same technician always' 
  },

  // Testimonials
  'testimonials.title': { es: 'Lo Que Nuestros Clientes Dicen', en: 'What Our Clients Say' },
  'testimonials.subtitle': { es: 'Más de 200 familias confían en nosotros cada semana', en: 'Over 200 families trust us every week' },
  'testimonials.1.name': { es: 'María González', en: 'María González' },
  'testimonials.1.location': { es: 'Doral, FL', en: 'Doral, FL' },
  'testimonials.1.text': { 
    es: 'Después de 3 compañías que dejaron mi piscina verde, finalmente encontré a alguien confiable. Carlos viene cada martes sin falta, y mi piscina siempre está cristalina. ¡Los recomiendo 100%!', 
    en: 'After 3 companies that left my pool green, I finally found someone reliable. Carlos comes every Tuesday without fail, and my pool is always crystal clear. I recommend them 100%!' 
  },
  'testimonials.2.name': { es: 'Roberto Martínez', en: 'Roberto Martínez' },
  'testimonials.2.location': { es: 'Kendall, FL', en: 'Kendall, FL' },
  'testimonials.2.text': { 
    es: 'Lo que más valoro es la comunicación. Me mandan foto después de cada servicio y siempre responden mis mensajes. El precio no ha cambiado en 2 años. Servicio honesto y profesional.', 
    en: 'What I value most is the communication. They send me photos after each service and always respond to my messages. The price hasn\'t changed in 2 years. Honest and professional service.' 
  },
  'testimonials.3.name': { es: 'Ana Rodríguez', en: 'Ana Rodríguez' },
  'testimonials.3.location': { es: 'Coral Gables, FL', en: 'Coral Gables, FL' },
  'testimonials.3.text': { 
    es: 'Tenía problemas con mi bomba y me explicaron exactamente qué necesitaba sin intentar venderme cosas innecesarias. Arreglaron todo rápido y a buen precio. Son mi equipo de confianza.', 
    en: 'I had pump issues and they explained exactly what I needed without trying to sell me unnecessary things. They fixed everything quickly and at a good price. They\'re my trusted team.' 
  },

  // Pricing
  'pricing.title': { es: 'Precios Claros y Justos - Sin Sorpresas', en: 'Clear and Fair Pricing - No Surprises' },
  'pricing.monthly': { es: 'por mes', en: 'per month' },
  'pricing.popular': { es: 'Más Popular', en: 'Most Popular' },
  'pricing.cta': { es: 'Empezar Ahora', en: 'Start Now' },
  'pricing.basic.name': { es: 'Básico', en: 'Basic' },
  'pricing.basic.price': { es: '$120', en: '$120' },
  'pricing.basic.features': { 
    es: 'Limpieza semanal|Balance químico|Vaciado de canastas|Reporte por foto|Soporte por WhatsApp', 
    en: 'Weekly cleaning|Chemical balance|Basket emptying|Photo report|WhatsApp support' 
  },
  'pricing.premium.name': { es: 'Premium', en: 'Premium' },
  'pricing.premium.price': { es: '$175', en: '$175' },
  'pricing.premium.features': { 
    es: 'Todo en Básico|Inspección de equipos|Limpieza de filtro mensual|Prioridad en emergencias|Descuento en reparaciones', 
    en: 'Everything in Basic|Equipment inspection|Monthly filter cleaning|Emergency priority|Repair discount' 
  },
  'pricing.complete.name': { es: 'Completo', en: 'Complete' },
  'pricing.complete.price': { es: '$250', en: '$250' },
  'pricing.complete.features': { 
    es: 'Todo en Premium|2 visitas por semana|Químicos incluidos|Reparaciones menores gratis|Garantía extendida', 
    en: 'Everything in Premium|2 visits per week|Chemicals included|Minor repairs free|Extended warranty' 
  },
  'pricing.calculator.title': { es: '¿Cuánto Cuesta Realmente?', en: 'What Does It Really Cost?' },
  'pricing.calculator.text': { es: 'Menos de $30/semana por una piscina siempre perfecta. Compárelo con el costo de químicos, tiempo y frustraciones de hacerlo usted mismo.', en: 'Less than $30/week for a pool that\'s always perfect. Compare it to the cost of chemicals, time, and frustration of doing it yourself.' },

  // About
  'about.title': { es: 'Familia Sirviendo Familias Desde 2012', en: 'Family Serving Families Since 2012' },
  'about.story.1': { es: 'Soy Carlos Mendoza, y junto con mi esposa Ana comenzamos este negocio hace más de 10 años. Lo que empezó limpiando la piscina de un vecino se convirtió en nuestra pasión y forma de vida.', en: 'I\'m Carlos Mendoza, and together with my wife Ana, we started this business over 10 years ago. What started by cleaning a neighbor\'s pool became our passion and way of life.' },
  'about.story.2': { es: 'Entendemos lo frustrante que es cuando su piscina no está lista para disfrutar. Por eso tratamos cada piscina como si fuera la nuestra, y a cada cliente como familia.', en: 'We understand how frustrating it is when your pool isn\'t ready to enjoy. That\'s why we treat every pool as if it were our own, and every client like family.' },
  'about.story.3': { es: 'Hoy somos un equipo de 8 técnicos certificados, todos comprometidos con los mismos valores: honestidad, puntualidad y excelencia en cada visita.', en: 'Today we\'re a team of 8 certified technicians, all committed to the same values: honesty, punctuality, and excellence in every visit.' },
  'about.credentials.license': { es: 'Licencia Estatal', en: 'State License' },
  'about.credentials.cpo': { es: 'CPO Certified', en: 'CPO Certified' },
  'about.credentials.insurance': { es: 'Asegurados $1M', en: '$1M Insured' },
  'about.credentials.member': { es: 'Miembro FSPA', en: 'FSPA Member' },
  'about.promise': { es: 'Nuestra Promesa: Si no está 100% satisfecho con nuestro servicio, lo arreglamos gratis o le devolvemos su dinero. Sin excusas, sin letras pequeñas.', en: 'Our Promise: If you\'re not 100% satisfied with our service, we fix it free or refund your money. No excuses, no fine print.' },

  // Guarantees
  'guarantees.title': { es: 'Nuestras Garantías - Nosotros Asumimos Todo el Riesgo', en: 'Our Guarantees - We Take All the Risk' },
  'guarantees.1.title': { es: 'Garantía de Satisfacción', en: 'Satisfaction Guarantee' },
  'guarantees.1.desc': { es: 'Si no está satisfecho con cualquier visita, volvemos el mismo día a arreglarlo. Sin costo adicional, sin preguntas.', en: 'If you\'re not satisfied with any visit, we come back the same day to fix it. No extra cost, no questions asked.' },
  'guarantees.2.title': { es: 'Respuesta en 2 Horas', en: '2-Hour Response' },
  'guarantees.2.desc': { es: 'Garantizamos responder a su llamada o mensaje en menos de 2 horas durante horario laboral. Si no lo hacemos, su próximo servicio es gratis.', en: 'We guarantee to respond to your call or message within 2 hours during business hours. If we don\'t, your next service is free.' },
  'guarantees.3.title': { es: 'Precio Congelado', en: 'Price Lock' },
  'guarantees.3.desc': { es: 'El precio que acuerda hoy es el precio que paga. No aumentos sorpresa, no cargos ocultos. Nunca.', en: 'The price you agree to today is the price you pay. No surprise increases, no hidden charges. Ever.' },
  'guarantees.4.title': { es: 'Mismo Técnico Siempre', en: 'Same Technician Always' },
  'guarantees.4.desc': { es: 'Asignamos un técnico dedicado a su piscina. Conocerá su equipo, su piscina y sus preferencias.', en: 'We assign a dedicated technician to your pool. They\'ll know your equipment, your pool, and your preferences.' },

  // FAQ
  'faq.title': { es: 'Preguntas Que Nuestros Clientes Hacen Antes de Contratar', en: 'Questions Our Clients Ask Before Hiring' },
  'faq.1.q': { es: '¿Qué pasa si mi piscina está verde cuando empiezan?', en: 'What if my pool is green when you start?' },
  'faq.1.a': { es: 'No hay problema. Hacemos una recuperación inicial (puede tener costo adicional según el estado) y luego mantenemos el servicio regular. La recuperación típica toma 3-5 días.', en: 'No problem. We do an initial recovery (may have additional cost depending on condition) and then maintain regular service. Typical recovery takes 3-5 days.' },
  'faq.2.q': { es: '¿Incluyen los químicos en el precio?', en: 'Are chemicals included in the price?' },
  'faq.2.a': { es: 'En los planes Básico y Premium, los químicos se cobran por separado según uso. En el plan Completo, todos los químicos están incluidos.', en: 'In Basic and Premium plans, chemicals are charged separately based on usage. In the Complete plan, all chemicals are included.' },
  'faq.3.q': { es: '¿Qué día y hora vienen?', en: 'What day and time do you come?' },
  'faq.3.a': { es: 'Acordamos un día fijo que funcione para usted. El horario típico es entre 8am-4pm. Le avisamos cuando estamos en camino.', en: 'We agree on a fixed day that works for you. Typical hours are 8am-4pm. We notify you when we\'re on our way.' },
  'faq.4.q': { es: '¿Tienen que estar en casa?', en: 'Do I need to be home?' },
  'faq.4.a': { es: 'No es necesario. Solo necesitamos acceso a la piscina. Muchos clientes nos dan código de portón o llave.', en: 'Not necessary. We just need access to the pool. Many clients give us a gate code or key.' },
  'faq.5.q': { es: '¿Qué pasa si necesito cancelar una semana?', en: 'What if I need to cancel a week?' },
  'faq.5.a': { es: 'Avísenos con 24 horas de anticipación y no hay cargo. Las cancelaciones de último minuto pueden tener un cargo parcial.', en: 'Let us know 24 hours in advance and there\'s no charge. Last-minute cancellations may have a partial charge.' },
  'faq.6.q': { es: '¿Hacen reparaciones de equipos?', en: 'Do you do equipment repairs?' },
  'faq.6.a': { es: 'Sí, nuestros técnicos están capacitados para reparaciones de bombas, filtros, calentadores y automatización. Las reparaciones se cotizan por separado.', en: 'Yes, our technicians are trained for pump, filter, heater, and automation repairs. Repairs are quoted separately.' },
  'faq.7.q': { es: '¿Cómo es el proceso para empezar?', en: 'What\'s the process to get started?' },
  'faq.7.a': { es: '1) Llámenos o envíe WhatsApp. 2) Hacemos una visita inicial gratuita para evaluar. 3) Le damos precio exacto. 4) Si acepta, empezamos la próxima semana.', en: '1) Call us or send WhatsApp. 2) We do a free initial visit to evaluate. 3) We give you an exact price. 4) If you accept, we start next week.' },
  'faq.8.q': { es: '¿Tienen contrato?', en: 'Do you have a contract?' },
  'faq.8.a': { es: 'Ofrecemos servicio mes a mes sin contrato de largo plazo. Puede cancelar cuando quiera con aviso de 2 semanas.', en: 'We offer month-to-month service with no long-term contract. You can cancel anytime with 2 weeks notice.' },

  // Service Areas
  'areas.title': { es: 'Servimos Estas Áreas de Miami-Dade', en: 'We Serve These Miami-Dade Areas' },
  'areas.west': { es: 'Zona Oeste', en: 'West Zone' },
  'areas.west.list': { es: 'Doral|Sweetwater|Fontainebleau|Tamiami|Westchester', en: 'Doral|Sweetwater|Fontainebleau|Tamiami|Westchester' },
  'areas.south': { es: 'Zona Sur', en: 'South Zone' },
  'areas.south.list': { es: 'Kendall|Pinecrest|Palmetto Bay|Cutler Bay|Homestead', en: 'Kendall|Pinecrest|Palmetto Bay|Cutler Bay|Homestead' },
  'areas.north': { es: 'Zona Norte', en: 'North Zone' },
  'areas.north.list': { es: 'Miami Lakes|Hialeah|Miami Springs|Opa-Locka|North Miami', en: 'Miami Lakes|Hialeah|Miami Springs|Opa-Locka|North Miami' },
  'areas.east': { es: 'Zona Este', en: 'East Zone' },
  'areas.east.list': { es: 'Coral Gables|Coconut Grove|Brickell|Miami Beach|Key Biscayne', en: 'Coral Gables|Coconut Grove|Brickell|Miami Beach|Key Biscayne' },
  'areas.not.found': { es: '¿No ve su área? ¡Contáctenos! Probablemente también la cubrimos.', en: 'Don\'t see your area? Contact us! We probably cover it too.' },

  // Contact Form
  'contact.title': { es: 'Solicite Su Cotización Gratis en 30 Segundos', en: 'Request Your Free Quote in 30 Seconds' },
  'contact.name': { es: 'Nombre', en: 'Name' },
  'contact.phone': { es: 'Teléfono', en: 'Phone' },
  'contact.email': { es: 'Email (opcional)', en: 'Email (optional)' },
  'contact.city': { es: 'Ciudad / Vecindario', en: 'City / Neighborhood' },
  'contact.service': { es: 'Tipo de Servicio', en: 'Service Type' },
  'contact.service.weekly': { es: 'Mantenimiento Semanal', en: 'Weekly Maintenance' },
  'contact.service.repair': { es: 'Reparación', en: 'Repair' },
  'contact.service.recovery': { es: 'Recuperación de Piscina Verde', en: 'Green Pool Recovery' },
  'contact.service.other': { es: 'Otro', en: 'Other' },
  'contact.message': { es: 'Mensaje (opcional)', en: 'Message (optional)' },
  'contact.submit': { es: 'Enviar Mi Solicitud - Llamada en 2 Horas', en: 'Submit My Request - Call Within 2 Hours' },
  'contact.privacy': { es: 'Su información está segura. Nunca compartimos sus datos con terceros.', en: 'Your information is safe. We never share your data with third parties.' },
  'contact.alt.title': { es: 'O Contáctenos Directamente', en: 'Or Contact Us Directly' },
  'contact.success': { es: '¡Gracias! Le llamaremos en menos de 2 horas.', en: 'Thank you! We\'ll call you within 2 hours.' },

  // Final CTA
  'final.title': { es: '¿Listo Para Disfrutar Su Piscina Sin Preocupaciones?', en: 'Ready to Enjoy Your Pool Worry-Free?' },
  'final.subtitle': { es: 'Únase a más de 200 familias en Miami que confían en nosotros cada semana.', en: 'Join over 200 families in Miami who trust us every week.' },
  'final.cta.call': { es: 'Llamar Ahora', en: 'Call Now' },
  'final.cta.whatsapp': { es: 'Enviar WhatsApp', en: 'Send WhatsApp' },

  // Footer
  'footer.services': { es: 'Servicios', en: 'Services' },
  'footer.areas': { es: 'Áreas de Servicio', en: 'Service Areas' },
  'footer.contact': { es: 'Contacto', en: 'Contact' },
  'footer.legal': { es: 'Legal', en: 'Legal' },
  'footer.privacy': { es: 'Política de Privacidad', en: 'Privacy Policy' },
  'footer.terms': { es: 'Términos de Servicio', en: 'Terms of Service' },
  'footer.rights': { es: 'Todos los derechos reservados.', en: 'All rights reserved.' },

  // WhatsApp
  'whatsapp.message': { 
    es: 'Hola! Me interesa información sobre servicios de limpieza de piscinas.', 
    en: 'Hi! I\'m interested in information about pool cleaning services.' 
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'es' || saved === 'en')) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
