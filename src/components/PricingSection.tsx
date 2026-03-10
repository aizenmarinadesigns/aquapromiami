import { Check } from 'lucide-react';
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
    },
    {
      name: t('pricing.premium.name'),
      price: t('pricing.premium.price'),
      features: t('pricing.premium.features').split('|'),
      popular: true,
    },
    {
      name: t('pricing.complete.name'),
      price: t('pricing.complete.price'),
      features: t('pricing.complete.features').split('|'),
      popular: false,
    },
  ];

  const sectionId = language === 'es' ? 'precios' : 'pricing';

  return (
    <section ref={ref} id={sectionId} className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Simple Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider block mb-2">
            {t('nav.pricing')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('pricing.title')}
          </h2>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative rounded-2xl transition-all duration-300 ${
                plan.popular
                  ? 'bg-primary text-white md:-mt-8 md:shadow-xl ring-2 ring-primary'
                  : 'bg-card border border-border hover:border-primary/50'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-1 rounded-full text-sm font-bold">
                  {t('pricing.popular')}
                </div>
              )}

              {/* Content */}
              <div className="p-8">
                {/* Plan Name */}
                <h3 className={`text-2xl font-bold mb-4 ${plan.popular ? 'text-white' : 'text-foreground'}`}>
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-6">
                  <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-foreground'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-muted-foreground'}`}>
                    /{t('pricing.monthly')}
                  </span>
                </div>

                {/* Divider */}
                <div className={`h-px mb-6 ${plan.popular ? 'bg-white/20' : 'bg-border'}`}></div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                      <span className={`text-sm ${plan.popular ? 'text-white/90' : 'text-foreground'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href={language === 'es' ? '#contacto' : '#contact'}
                  className={`block w-full py-3 px-6 rounded-lg font-semibold text-center transition-all duration-300 hover:scale-105 ${
                    plan.popular
                      ? 'bg-white text-primary hover:shadow-lg'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  {t('pricing.cta')}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
