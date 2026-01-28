import { MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function ServiceAreasSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const zones = [
    { name: t('areas.west'), areas: t('areas.west.list').split('|'), color: 'bg-primary' },
    { name: t('areas.south'), areas: t('areas.south.list').split('|'), color: 'bg-secondary' },
    { name: t('areas.north'), areas: t('areas.north.list').split('|'), color: 'bg-accent' },
    { name: t('areas.east'), areas: t('areas.east.list').split('|'), color: 'bg-whatsapp' },
  ];

  return (
    <section ref={ref} className="py-12 md:py-20 section-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider">
            {t('footer.areas')}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-2 md:mb-3">
            {t('areas.title')}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto px-4">
            {t('areas.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 max-w-5xl mx-auto">
          {zones.map((zone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-elevated p-3 md:p-6"
            >
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg ${zone.color} flex items-center justify-center mb-2 md:mb-4`}>
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-secondary-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2 md:mb-3 text-sm md:text-base">{zone.name}</h3>
              <ul className="space-y-1 md:space-y-2">
                {zone.areas.map((area, i) => (
                  <li key={i} className="text-muted-foreground text-xs md:text-sm flex items-center gap-1.5 md:gap-2">
                    <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {area}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-6 md:mt-10 text-muted-foreground text-sm md:text-base px-4"
        >
          {t('areas.not.found')}{' '}
          <a href="#contacto" className="text-primary font-medium hover:underline">
            {t('nav.contact')}
          </a>
        </motion.p>
      </div>
    </section>
  );
}
