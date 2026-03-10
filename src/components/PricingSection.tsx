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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider">
            {t('nav.pricing')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3">
            {t('pricing.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative rounded-2xl p-6 md:p-8 border transition-all duration-300 ${
                plan.popular
                  ? 'border-primary bg-card md:scale-105 shadow-lg'
                  : 'border-border bg-card/50 hover:border-primary/50 hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2"
                >
                  <div className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs md:text-sm font-bold shadow-lg">
                    {t('pricing.popular')}
                  </div>
                </motion.div>
              )}

              <div className="mb-6 md:mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl md:text-5xl font-bold ${plan.popular ? 'text-primary' : 'text-foreground'}`}>
                    {plan.price}
                  </span>
                  <span className="text-sm md:text-base text-muted-foreground">
                    /{t('pricing.monthly')}
                  </span>
                </div>
              </div>

              <div className="h-px bg-border mb-6 md:mb-8"></div>

              <ul className="space-y-3 md:space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-primary' : 'text-primary'}`} />
                    <span className="text-sm md:text-base text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={language === 'es' ? '#contacto' : '#contact'}
                className={`block w-full py-3 md:py-3.5 px-4 md:px-6 rounded-lg md:rounded-xl font-semibold text-center transition-all duration-300 hover:scale-105 text-sm md:text-base ${
                  plan.popular
                    ? 'bg-primary text-primary-foreground shadow-lg hover:shadow-xl'
                    : 'bg-primary/20 text-primary hover:bg-primary/30'
                }`}
              >
                {t('pricing.cta')}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
