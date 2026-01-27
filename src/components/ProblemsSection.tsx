import { AlertTriangle, PhoneOff, TrendingUp, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function ProblemsSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const problems = [
    { icon: AlertTriangle, title: t('problems.1.title'), desc: t('problems.1.desc'), color: 'text-red-500' },
    { icon: PhoneOff, title: t('problems.2.title'), desc: t('problems.2.desc'), color: 'text-orange-500' },
    { icon: TrendingUp, title: t('problems.3.title'), desc: t('problems.3.desc'), color: 'text-yellow-500' },
    { icon: Users, title: t('problems.4.title'), desc: t('problems.4.desc'), color: 'text-purple-500' },
  ];

  return (
    <section ref={ref} className="py-12 md:py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-4 px-4">
            {t('problems.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-elevated text-center p-3 md:p-6"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-2 md:mb-4">
                <problem.icon className={`w-6 h-6 md:w-8 md:h-8 ${problem.color}`} />
              </div>
              <h3 className="text-sm md:text-lg font-bold text-foreground mb-1 md:mb-2">{problem.title}</h3>
              <p className="text-muted-foreground text-xs md:text-sm">{problem.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-sm md:text-lg text-muted-foreground mb-4 md:mb-6 max-w-2xl mx-auto px-4">
            {t('problems.transition')}
          </p>
          <a href="#servicios" className="btn-coral inline-block text-sm md:text-base px-6 md:px-8 py-3 md:py-4">
            {t('problems.cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
