import { Star, Quote, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export function TestimonialsSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const testimonials = [
    {
      name: t('testimonials.1.name'),
      location: t('testimonials.1.location'),
      text: t('testimonials.1.text'),
      initials: 'MG',
    },
    {
      name: t('testimonials.2.name'),
      location: t('testimonials.2.location'),
      text: t('testimonials.2.text'),
      initials: 'RM',
    },
    {
      name: t('testimonials.3.name'),
      location: t('testimonials.3.location'),
      text: t('testimonials.3.text'),
      initials: 'AR',
    },
  ];

  return (
    <section ref={ref} id="testimonios" className="py-12 md:py-20 section-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider">
            {t('nav.testimonials')}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-2 md:mb-3 px-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <Users className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <span>{t('testimonials.subtitle')}</span>
          </p>
        </motion.div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="md:grid md:grid-cols-3 md:gap-8">
          {/* Mobile horizontal scroll container */}
          <div className="flex md:hidden gap-4 overflow-x-auto pb-6 snap-x snap-mandatory -mx-4 px-4 scrollbar-hide">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                onViewportEnter={() => setActiveCard(index)}
                className={`card-elevated relative flex-shrink-0 w-[280px] snap-center p-5 my-2 transition-all duration-300 ${
                  activeCard === index ? 'shadow-lg ring-2 ring-primary/20 scale-[1.02]' : ''
                }`}
              >
                <Quote className="absolute top-4 right-4 w-6 h-6 text-primary/20" />
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-secondary-foreground font-bold text-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed text-sm">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>

          {/* Desktop grid */}
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="card-elevated relative hidden md:block hover:shadow-lg hover:ring-2 hover:ring-primary/20 transition-all duration-300"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-secondary-foreground font-bold text-lg">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
