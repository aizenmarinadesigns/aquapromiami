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
    <section ref={ref} className="py-20 section-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            {t('footer.areas')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            {t('areas.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {zones.map((zone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-elevated"
            >
              <div className={`w-10 h-10 rounded-lg ${zone.color} flex items-center justify-center mb-4`}>
                <MapPin className="w-5 h-5 text-secondary-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-3">{zone.name}</h3>
              <ul className="space-y-2">
                {zone.areas.map((area, i) => (
                  <li key={i} className="text-muted-foreground text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
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
          className="text-center mt-10 text-muted-foreground"
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
