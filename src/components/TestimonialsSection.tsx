import { Star, Quote, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export function TestimonialsSection() {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState(0);

  const baseTestimonials = [
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
    {
      name: 'Carlos L.',
      location: 'Homestead, FL',
      text: 'El mejor servicio que encontré en Miami. Profesionales, puntuales y responsables. Mi piscina brilla todo el año.',
      initials: 'CL',
    },
    {
      name: 'Patricia O.',
      location: 'Miami Beach, FL',
      text: 'No sé cómo estaba antes sin ellos. Siempre disponibles y resuelven cualquier problema rápidamente.',
      initials: 'PO',
    },
    {
      name: 'Diego F.',
      location: 'Westchester, FL',
      text: 'Llevan 3 años manteniendo mi piscina. El mismo técnico, siempre perfecto, sin cambios de precio. 100% recomendados.',
      initials: 'DF',
    },
    {
      name: 'Verónica S.',
      location: 'Palmetto, FL',
      text: 'Pasé por 2 compañías antes. Estas personas sí saben lo que hacen. Mi familia disfruta la piscina ahora.',
      initials: 'VS',
    },
    {
      name: 'Miguel A.',
      location: 'Pinecrest, FL',
      text: 'Increíble servicio al cliente. No cobran extras por emergencias. Confiable 100%.',
      initials: 'MA',
    },
    {
      name: 'Lucia R.',
      location: 'Aventura, FL',
      text: 'Mis nietos disfrutan la piscina gracias a ellos. Limpia, segura y siempre en perfecto estado.',
      initials: 'LR',
    },
    {
      name: 'Fernando G.',
      location: 'Wynwood, FL',
      text: 'Profesionales de verdad. Resolvieron un problema que otros no pudieron. Muy satisfecho con su trabajo.',
      initials: 'FG',
    },
  ];

  const sectionId = language === 'es' ? 'testimonios' : 'testimonials';

  // Duplicate for infinite loop
  const testimonials = [...baseTestimonials, ...baseTestimonials];
  const cardWidth = 320;
  const gapWidth = 32;
  const itemWidth = cardWidth + gapWidth;
  const singleSetWidth = baseTestimonials.length * itemWidth;

  // Continuous scrolling
  useEffect(() => {
    if (isHovered || !isInView) return;

    const scrollInterval = setInterval(() => {
      setPosition((prev) => {
        const newPos = prev + itemWidth;
        if (newPos >= singleSetWidth) {
          return 0;
        }
        return newPos;
      });
    }, 4000);

    return () => clearInterval(scrollInterval);
  }, [isHovered, isInView, singleSetWidth, itemWidth]);

  return (
    <section ref={ref} id={sectionId} className="py-12 md:py-20 section-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-secondary font-semibold text-xs md:text-sm uppercase tracking-wider">
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

        {/* Infinite Carousel */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="flex gap-8"
            animate={{ x: -position }}
            transition={{
              type: 'tween',
              ease: 'linear',
              duration: 0.8,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80"
              >
                <motion.div
                  className="card-elevated relative p-8 h-80 flex flex-col transition-shadow duration-300 hover:shadow-lg"
                  whileHover={{ y: -2 }}
                >
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-secondary/20" />

                  <div className="flex items-center gap-4 mb-6 flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold text-lg flex-shrink-0">
                      {testimonial.initials}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-foreground text-base truncate">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground truncate">{testimonial.location}</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4 flex-shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-base flex-1 overflow-hidden">
                    "{testimonial.text}"
                  </p>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
