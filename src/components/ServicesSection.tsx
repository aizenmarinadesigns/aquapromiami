import { Sparkles, FlaskConical, Settings, MessageSquare, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function ServicesSection() {
  const { t } = useLanguage();
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

  return (
    <section ref={ref} id="servicios" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            {t('nav.services')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            {t('services.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="card-elevated group"
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-7 h-7 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-4">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
