import { Shield, Award, BadgeCheck, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function AboutSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const credentials = [
    { icon: Shield, label: t('about.credentials.license'), value: '#CPC1234567' },
    { icon: Award, label: t('about.credentials.cpo'), value: 'Certified' },
    { icon: BadgeCheck, label: t('about.credentials.insurance'), value: 'Full Coverage' },
    { icon: Users, label: t('about.credentials.member'), value: 'Since 2012' },
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
          <span className="text-secondary font-semibold text-xs md:text-sm uppercase tracking-wider">
            Nosotros
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            {t('about.title')}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start max-w-6xl mx-auto">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-4 md:space-y-6 text-muted-foreground text-sm md:text-lg leading-relaxed mb-8">
              <p>{t('about.story.1')}</p>
              <p>{t('about.story.2')}</p>
              <p>{t('about.story.3')}</p>
            </div>

            {/* Promise Statement */}
            <div className="mb-8 p-6 bg-secondary/5 rounded-xl border border-secondary/20">
              <p className="text-foreground font-medium text-base">
                {t('about.promise')}
              </p>
            </div>

            {/* Credentials Below - No Boxes */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {credentials.map((cred, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <cred.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm">{cred.label}</p>
                      <p className="text-muted-foreground text-xs">{cred.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center"
          >
            <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-border bg-muted">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop"
                alt="Equipo de mantenimiento de piscinas AquaPro Miami"
                className="w-full h-full object-cover aspect-square"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
