import { Check, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function PricingSection() {
  const { t } = useLanguage();
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

  return (
    <section ref={ref} id="precios" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            {t('nav.pricing')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            {t('pricing.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-gradient-to-b from-secondary to-secondary/90 text-secondary-foreground scale-105 shadow-2xl'
                  : 'bg-card border border-border shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    {t('pricing.popular')}
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? '' : 'text-foreground'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-5xl font-bold ${plan.popular ? '' : 'text-foreground'}`}>
                    {plan.price}
                  </span>
                  <span className={plan.popular ? 'opacity-80' : 'text-muted-foreground'}>
                    /{t('pricing.monthly')}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-primary' : 'text-primary'}`} />
                    <span className={plan.popular ? 'opacity-90' : 'text-muted-foreground'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className={`block w-full py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300 hover:scale-105 ${
                  plan.popular
                    ? 'bg-accent text-accent-foreground shadow-lg hover:shadow-xl'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                {t('pricing.cta')}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Value Calculator Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 max-w-2xl mx-auto text-center bg-pool-light rounded-2xl p-8"
        >
          <h4 className="text-xl font-bold text-foreground mb-2">
            {t('pricing.calculator.title')}
          </h4>
          <p className="text-muted-foreground">
            {t('pricing.calculator.text')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
