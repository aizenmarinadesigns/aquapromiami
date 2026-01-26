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
    <section ref={ref} className="py-20 bg-gradient-to-br from-secondary via-secondary to-primary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-6">
            {t('final.title')}
          </h2>
          <p className="text-xl text-secondary-foreground/90 mb-10">
            {t('final.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="tel:+13051234567"
              className="btn-coral inline-flex items-center justify-center gap-3 text-lg"
            >
              <Phone className="w-5 h-5" />
              {t('final.cta.call')}
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex items-center justify-center gap-3 text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              {t('final.cta.whatsapp')}
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-secondary-foreground/80">
            <Users className="w-5 h-5" />
            <span>{t('testimonials.subtitle')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
