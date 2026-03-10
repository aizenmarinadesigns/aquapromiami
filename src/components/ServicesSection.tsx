import { Sparkles, FlaskConical, Settings, MessageSquare, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function ServicesSection() {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    { 
      icon: Sparkles, 
      title: t('services.1.title'), 
      items: t('services.1.items').split('|'),
      gradient: 'from-primary to-primary/70'
    },
    { 
      icon: FlaskConical, 
      title: t('services.2.title'), 
      items: t('services.2.items').split('|'),
      gradient: 'from-secondary to-secondary/70'
    },
    { 
      icon: Settings, 
      title: t('services.3.title'), 
      items: t('services.3.items').split('|'),
      gradient: 'from-accent to-accent/70'
    },
    { 
      icon: MessageSquare, 
      title: t('services.4.title'), 
      items: t('services.4.items').split('|'),
      gradient: 'from-whatsapp to-whatsapp/70'
    },
  ];

  const sectionId = language === 'es' ? 'servicios' : 'services';

  return (
    <section ref={ref} id={sectionId} className="pt-20 pb-12 md:pt-32 md:pb-20 section-alternate relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider">
            {t('nav.services')}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-2">
            {t('services.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="card-elevated group p-4 md:p-5 aspect-square flex flex-col"
            >
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 mb-3 md:mb-4`}>
                <service.icon className="w-6 h-6 md:w-7 md:h-7 text-secondary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-base font-bold text-foreground mb-2 md:mb-3 line-clamp-2">{service.title}</h3>
                <ul className="space-y-1 md:space-y-1.5">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-muted-foreground text-xs md:text-sm">
                      <Check className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
