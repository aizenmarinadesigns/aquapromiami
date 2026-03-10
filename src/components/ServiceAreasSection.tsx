import { MapPin, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export function ServiceAreasSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedZone, setExpandedZone] = useState<number | null>(0);

  const zones = [
    { name: t('areas.west'), areas: t('areas.west.list').split('|') },
    { name: t('areas.south'), areas: t('areas.south.list').split('|') },
    { name: t('areas.north'), areas: t('areas.north.list').split('|') },
    { name: t('areas.east'), areas: t('areas.east.list').split('|') },
  ];

  return (
    <section ref={ref} className="py-12 md:py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-secondary font-semibold text-xs md:text-sm uppercase tracking-wider">
            {t('footer.areas')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            {t('areas.title')}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {t('areas.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto items-center">
          {/* Left: Google Maps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full rounded-2xl overflow-hidden shadow-lg border border-border bg-muted h-96"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d447193.48477659753!2d-80.6683589!3d25.761681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b02ffffffff%3A0xff96f271ddad4f65!2sMiami-Dade%20County%2C%20FL!5e0!3m2!1ses!2sus!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Miami-Dade County Service Area"
            ></iframe>
          </motion.div>

          {/* Right: Dropdown Zones */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            {zones.map((zone, index) => (
              <div key={index} className="border border-border rounded-lg overflow-hidden bg-card">
                <button
                  onClick={() => setExpandedZone(expandedZone === index ? null : index)}
                  className="w-full px-4 md:px-6 py-4 md:py-5 flex items-center justify-between hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-foreground text-base md:text-lg">{zone.name}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedZone === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-secondary" />
                  </motion.div>
                </button>

                {/* Dropdown Content */}
                <motion.div
                  initial={false}
                  animate={{ height: expandedZone === index ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 md:px-6 py-4 md:py-5 border-t border-border bg-muted/20">
                    <ul className="space-y-2 md:space-y-3">
                      {zone.areas.map((area, i) => (
                        <li key={i} className="flex items-center gap-3 text-foreground text-sm md:text-base">
                          <div className="w-2 h-2 rounded-full bg-secondary flex-shrink-0" />
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            ))}

            {/* Note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-xs md:text-sm pt-4"
            >
              {t('areas.not.found')}{' '}
              <a href="#contacto" className="text-secondary font-medium hover:underline">
                {t('nav.contact')}
              </a>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
