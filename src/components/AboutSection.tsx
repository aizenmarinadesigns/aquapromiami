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
    <section ref={ref} className="py-20 section-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Nosotros
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            {t('about.title')}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>{t('about.story.1')}</p>
              <p>{t('about.story.2')}</p>
              <p>{t('about.story.3')}</p>
            </div>

            {/* Promise Box */}
            <div className="mt-8 p-6 bg-primary/10 border-l-4 border-primary rounded-r-xl">
              <p className="text-foreground font-medium">
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
            <div className="grid grid-cols-2 gap-4">
              {credentials.map((cred, index) => (
                <div
                  key={index}
                  className="card-elevated text-center p-6"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <cred.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-bold text-foreground text-sm">{cred.label}</p>
                  <p className="text-muted-foreground text-xs mt-1">{cred.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
