import { ThumbsUp, Clock, DollarSign, UserCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function GuaranteesSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const guarantees = [
    { icon: ThumbsUp, title: t('guarantees.1.title'), desc: t('guarantees.1.desc'), color: 'from-primary to-primary/70' },
    { icon: Clock, title: t('guarantees.2.title'), desc: t('guarantees.2.desc'), color: 'from-accent to-accent/70' },
    { icon: DollarSign, title: t('guarantees.3.title'), desc: t('guarantees.3.desc'), color: 'from-whatsapp to-whatsapp/70' },
    { icon: UserCheck, title: t('guarantees.4.title'), desc: t('guarantees.4.desc'), color: 'from-secondary to-secondary/70' },
  ];

  return (
    <section ref={ref} id="garantias" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            {t('nav.guarantees')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mt-2">
            {t('guarantees.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-secondary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-secondary-foreground/20 hover:bg-secondary-foreground/15 transition-colors"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${guarantee.color} flex items-center justify-center mb-4`}>
                <guarantee.icon className="w-7 h-7 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-secondary-foreground mb-3">
                {guarantee.title}
              </h3>
              <p className="text-secondary-foreground/80 text-sm leading-relaxed">
                {guarantee.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
