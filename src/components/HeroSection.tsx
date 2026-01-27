import { Phone, MessageCircle, Star, Shield, Award, Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-pool.jpg';

export function HeroSection() {
  const { t } = useLanguage();

  const whatsappNumber = '13051234567';
  const whatsappMessage = encodeURIComponent(t('whatsapp.message'));
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const badges = [
    { icon: Star, label: t('hero.badge.rating'), color: 'text-yellow-400' },
    { icon: Shield, label: t('hero.badge.licensed'), color: 'text-primary' },
    { icon: Award, label: t('hero.badge.certified'), color: 'text-primary' },
    { icon: Languages, label: t('hero.badge.spanish'), color: 'text-primary' },
  ];

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
      <div className="relative z-10 container mx-auto px-4 pt-20 md:pt-24 pb-24 md:pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-secondary-foreground mb-4 md:mb-6 leading-tight px-2">
              {t('hero.title')}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-secondary-foreground/90 mb-6 md:mb-10 max-w-2xl mx-auto px-4"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs - Smaller on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-8 md:mb-12 px-4"
          >
            <a
              href="tel:+13051234567"
              className="btn-coral inline-flex items-center justify-center gap-2 text-sm md:text-base lg:text-lg px-4 md:px-6 lg:px-8 py-3 md:py-4"
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span>{t('hero.cta.call')}</span>
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex items-center justify-center gap-2 text-sm md:text-base lg:text-lg px-4 md:px-6 lg:px-8 py-3 md:py-4"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span>{t('hero.cta.whatsapp')}</span>
            </a>
          </motion.div>

          {/* Trust Badges - 2x2 grid on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-2 md:gap-4 lg:gap-6 px-4 max-w-lg md:max-w-none mx-auto"
          >
            {badges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-1.5 md:gap-2 bg-secondary-foreground/10 backdrop-blur-sm px-2 md:px-4 py-2 rounded-full"
              >
                <badge.icon className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 ${badge.color}`} />
                <span className="text-secondary-foreground font-medium text-xs md:text-sm lg:text-base whitespace-nowrap">
                  {badge.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile to avoid overlap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
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
