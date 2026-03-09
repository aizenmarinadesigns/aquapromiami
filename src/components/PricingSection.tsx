import { Check, Sparkles, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function PricingSection() {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const plans = [
    {
      name: t('pricing.basic.name'),
      price: t('pricing.basic.price'),
      features: t('pricing.basic.features').split('|'),
      popular: false,
      icon: '💧',
    },
    {
      name: t('pricing.premium.name'),
      price: t('pricing.premium.price'),
      features: t('pricing.premium.features').split('|'),
      popular: true,
      icon: '⭐',
    },
    {
      name: t('pricing.complete.name'),
      price: t('pricing.complete.price'),
      features: t('pricing.complete.features').split('|'),
      popular: false,
      icon: '👑',
    },
  ];

  const sectionId = language === 'es' ? 'precios' : 'pricing';

  return (
    <section ref={ref} id={sectionId} className="py-12 md:py-24 section-textured relative overflow-hidden border-t border-border/30">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-accent font-bold text-xs md:text-sm uppercase tracking-widest inline-block mb-3 md:mb-4">
            {t('nav.pricing')}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('pricing.subtitle') || 'Planes diseñados para cada necesidad. Sin sorpresas, sin costos ocultos.'}
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-12 md:mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={!plan.popular ? { y: -10, transition: { duration: 0.3 } } : undefined}
              className={`relative rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 ${
                plan.popular
                  ? 'md:scale-110 md:z-10 shadow-2xl'
                  : 'shadow-lg hover:shadow-xl'
              }`}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-secondary via-secondary/95 to-secondary/80'
                    : 'bg-gradient-to-br from-card to-card/50'
                }`}
              ></div>

              {/* Border accent for popular */}
              {plan.popular && (
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl border-2 border-accent/30 pointer-events-none"></div>
              )}

              {/* Popular badge */}
              {plan.popular && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
                >
                  <div className="flex items-center gap-2 bg-gradient-to-r from-accent to-accent/80 text-accent-foreground px-4 md:px-6 py-2 rounded-full font-bold text-xs md:text-sm shadow-lg">
                    <Zap className="w-4 h-4" />
                    {t('pricing.popular')}
                  </div>
                </motion.div>
              )}

              {/* Content */}
              <div className="relative p-6 md:p-10 flex flex-col h-full">
                {/* Icon and Name */}
                <div className="mb-6 md:mb-8">
                  <div className={`text-4xl md:text-5xl mb-3 ${plan.popular ? 'opacity-100' : 'opacity-80'}`}>
                    {plan.icon}
                  </div>
                  <h3
                    className={`text-xl md:text-2xl font-bold mb-2 ${
                      plan.popular ? 'text-secondary-foreground' : 'text-foreground'
                    }`}
                  >
                    {plan.name}
                  </h3>
                </div>

                {/* Price */}
                <div className="mb-6 md:mb-8">
                  <div
                    className={`flex items-baseline gap-1 ${
                      plan.popular ? 'text-secondary-foreground' : 'text-foreground'
                    }`}
                  >
                    <span className="text-4xl md:text-6xl font-black">{plan.price}</span>
                    <span
                      className={`text-base md:text-lg ${
                        plan.popular ? 'opacity-80' : 'text-muted-foreground'
                      }`}
                    >
                      /{t('pricing.monthly')}
                    </span>
                  </div>
                  {!plan.popular && (
                    <p className="text-xs md:text-sm text-muted-foreground mt-2">
                      {language === 'es'
                        ? 'Facturación mensual'
                        : 'Monthly billing'}
                    </p>
                  )}
                </div>

                {/* Divider */}
                <div
                  className={`h-px mb-6 md:mb-8 ${
                    plan.popular ? 'bg-secondary-foreground/20' : 'bg-border'
                  }`}
                ></div>

                {/* Features - Takes remaining space */}
                <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check
                        className={`w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-0.5 ${
                          plan.popular ? 'text-primary' : 'text-accent'
                        }`}
                      />
                      <span
                        className={`text-sm md:text-base leading-relaxed ${
                          plan.popular
                            ? 'text-secondary-foreground/90'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.a
                  href={language === 'es' ? '#contacto' : '#contact'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`block w-full py-3 md:py-4 px-4 md:px-6 rounded-xl md:rounded-2xl font-bold text-center transition-all duration-300 text-sm md:text-base ${
                    plan.popular
                      ? 'bg-accent text-accent-foreground shadow-lg hover:shadow-xl'
                      : 'bg-gradient-to-r from-primary/80 to-primary text-primary-foreground hover:shadow-lg'
                  }`}
                >
                  {t('pricing.cta')}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value Proposition Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 rounded-2xl md:rounded-3xl p-6 md:p-10 text-center backdrop-blur-sm">
            <h4 className="text-lg md:text-2xl font-bold text-foreground mb-3">
              {t('pricing.calculator.title')}
            </h4>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {t('pricing.calculator.text')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
