import { ThumbsUp, Clock, DollarSign, UserCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

export function GuaranteesSection() {
  const { t, language } = useLanguage();

  const guarantees = [
    { icon: ThumbsUp, title: t('guarantees.1.title'), color: 'from-primary to-primary/70' },
    { icon: Clock, title: t('guarantees.2.title'), color: 'from-accent to-accent/70' },
    { icon: DollarSign, title: t('guarantees.3.title'), color: 'from-whatsapp to-whatsapp/70' },
    { icon: UserCheck, title: t('guarantees.4.title'), color: 'from-secondary to-secondary/70' },
  ];

  const sectionId = language === 'es' ? 'garantias' : 'guarantees';

  // Double the array for infinite scroll effect
  const duplicatedGuarantees = [...guarantees, ...guarantees];

  return (
    <section id={sectionId} className="py-6 md:py-8 bg-gradient-to-r from-secondary via-secondary to-secondary/95 relative overflow-hidden">
      <div className="relative">
        {/* Infinite scrolling banner */}
        <motion.div
          className="flex gap-8 md:gap-12 whitespace-nowrap"
          animate={{ x: [0, -100 + '%'] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {duplicatedGuarantees.map((guarantee, index) => (
            <div
              key={index}
              className="flex items-center gap-3 md:gap-4 flex-shrink-0 px-4 md:px-6 py-3 md:py-4 bg-secondary-foreground/10 backdrop-blur-sm rounded-full border border-secondary-foreground/20 hover:bg-secondary-foreground/15 transition-colors group"
            >
              <div className={`w-6 h-6 md:w-8 md:h-8 rounded-lg bg-gradient-to-br ${guarantee.color} flex items-center justify-center flex-shrink-0`}>
                <guarantee.icon className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 text-secondary-foreground" />
              </div>
              <span className="text-xs md:text-sm font-semibold text-secondary-foreground group-hover:text-secondary-foreground/100 transition-colors">
                {guarantee.title}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-secondary to-transparent pointer-events-none z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-secondary to-transparent pointer-events-none z-10"></div>
    </section>
  );
}
