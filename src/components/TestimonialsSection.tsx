import { Star, Quote, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export function TestimonialsSection() {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);

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

  const sectionId = language === 'es' ? 'testimonios' : 'testimonials';

  // Duplicate testimonials for infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section ref={ref} id={sectionId} className="py-12 md:py-20 section-light relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider">
            {t('nav.testimonials')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <Users className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
            <span>{t('testimonials.subtitle')}</span>
          </p>
        </motion.div>

        {/* Desktop Infinite Carousel */}
        <div className="hidden md:block relative">
          <motion.div
            className="flex gap-6 lg:gap-8"
            animate={{ x: isHovered ? 0 : [0, -33.33 + '%'] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
              paused: isHovered,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="card-elevated relative flex-shrink-0 w-full md:w-1/3 lg:w-[calc(33.333%-1.25rem)] p-6 lg:p-8 hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg flex-shrink-0">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-base">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed text-base">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* Mobile Grid */}
        <div className="md:hidden grid grid-cols-1 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-elevated relative p-5 hover:shadow-lg transition-all duration-300"
            >
              <Quote className="absolute top-3 right-3 w-6 h-6 text-primary/20" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-base flex-shrink-0">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex gap-0.5 mb-3">
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
      </div>
    </section>
  );
}
