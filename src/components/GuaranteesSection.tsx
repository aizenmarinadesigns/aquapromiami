import { ThumbsUp, Clock, DollarSign, UserCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function GuaranteesSection() {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const guarantees = [
    { icon: ThumbsUp, title: t('guarantees.1.title'), desc: t('guarantees.1.desc'), color: 'from-primary to-primary/70' },
    { icon: Clock, title: t('guarantees.2.title'), desc: t('guarantees.2.desc'), color: 'from-accent to-accent/70' },
    { icon: DollarSign, title: t('guarantees.3.title'), desc: t('guarantees.3.desc'), color: 'from-whatsapp to-whatsapp/70' },
    { icon: UserCheck, title: t('guarantees.4.title'), desc: t('guarantees.4.desc'), color: 'from-secondary to-secondary/70' },
  ];

  const sectionId = language === 'es' ? 'garantias' : 'guarantees';

  return (
    <section ref={ref} id={sectionId} className="py-12 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider">
            {t('nav.guarantees')}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary-foreground mt-2 px-4">
            {t('guarantees.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-secondary-foreground/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-6 border border-secondary-foreground/20 hover:bg-secondary-foreground/15 transition-colors"
            >
              <div className={`w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl bg-gradient-to-br ${guarantee.color} flex items-center justify-center mb-2 md:mb-4`}>
                <guarantee.icon className="w-5 h-5 md:w-7 md:h-7 text-secondary-foreground" />
              </div>
              <h3 className="text-sm md:text-xl font-bold text-secondary-foreground mb-1 md:mb-3">
                {guarantee.title}
              </h3>
              <p className="text-secondary-foreground/80 text-xs md:text-sm leading-relaxed">
                {guarantee.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
