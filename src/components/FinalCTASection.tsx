import { Phone, MessageCircle, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function FinalCTASection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const whatsappNumber = '13051234567';
  const whatsappMessage = encodeURIComponent(t('whatsapp.message'));
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section ref={ref} className="py-12 md:py-20 bg-gradient-to-br from-secondary via-secondary to-primary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary-foreground mb-4 md:mb-6 px-4">
            {t('final.title')}
          </h2>
          <p className="text-base md:text-xl text-secondary-foreground/90 mb-6 md:mb-10 px-4">
            {t('final.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8 px-4">
            <a
              href="tel:+13051234567"
              className="btn-coral inline-flex items-center justify-center gap-2 text-sm md:text-lg px-4 md:px-8 py-3 md:py-4"
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span>{t('final.cta.call')}</span>
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex items-center justify-center gap-2 text-sm md:text-lg px-4 md:px-8 py-3 md:py-4"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span>{t('final.cta.whatsapp')}</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-secondary-foreground/80 text-sm md:text-base">
            <Users className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <span>{t('testimonials.subtitle')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
