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
          <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider">
            Nosotros
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-2">
            {t('about.title')}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-4 md:space-y-6 text-muted-foreground text-sm md:text-lg leading-relaxed">
              <p>{t('about.story.1')}</p>
              <p>{t('about.story.2')}</p>
              <p>{t('about.story.3')}</p>
            </div>

            {/* Promise Box */}
            <div className="mt-6 md:mt-8 p-4 md:p-6 bg-primary/10 border-l-4 border-primary rounded-r-xl">
              <p className="text-foreground font-medium text-sm md:text-base">
                {t('about.promise')}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Credentials Grid */}
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              {credentials.map((cred, index) => (
                <div
                  key={index}
                  className="card-elevated text-center p-3 md:p-6"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2 md:mb-3">
                    <cred.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <p className="font-bold text-foreground text-xs md:text-sm">{cred.label}</p>
                  <p className="text-muted-foreground text-[10px] md:text-xs mt-1">{cred.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
