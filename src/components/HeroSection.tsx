import { Phone, MessageCircle, Star, Shield, Award, Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-pool.jpg';

export function HeroSection() {
  const { t, language } = useLanguage();

  const whatsappNumber = '13051234567';
  const whatsappMessage = encodeURIComponent(t('whatsapp.message'));
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-primary/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground mb-6 leading-tight">
              {t('hero.title')}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-secondary-foreground/90 mb-10 max-w-2xl mx-auto"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <a
              href="tel:+13051234567"
              className="btn-coral inline-flex items-center justify-center gap-3 text-lg"
            >
              <Phone className="w-5 h-5" />
              {t('hero.cta.call')}
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex items-center justify-center gap-3 text-lg"
            >
              <MessageCircle className="w-5 h-5" />
              {t('hero.cta.whatsapp')}
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6"
          >
            {[
              { icon: Star, label: t('hero.badge.rating'), color: 'text-yellow-400' },
              { icon: Shield, label: t('hero.badge.licensed'), color: 'text-primary' },
              { icon: Award, label: t('hero.badge.certified'), color: 'text-primary' },
              { icon: Languages, label: t('hero.badge.spanish'), color: 'text-primary' },
            ].map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-secondary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <badge.icon className={`w-5 h-5 ${badge.color}`} />
                <span className="text-secondary-foreground font-medium text-sm md:text-base">
                  {badge.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-secondary-foreground/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-3 bg-secondary-foreground/70 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
