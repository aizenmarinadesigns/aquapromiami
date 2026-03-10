import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TransformCard {
  id: number;
  image: string;
  location: string;
  time: string;
  service: string;
  price: string;
}

// Real transformation images - before/after
const transformCards: TransformCard[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&h=500&fit=crop',
    location: 'Key Biscayne',
    time: '6 hours',
    service: 'Limpieza con ácido',
    price: '$450',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1576056201312-1697304da793?w=1200&h=500&fit=crop',
    location: 'Coral Gables',
    time: '8 hours',
    service: 'Recuperación de piscina verde',
    price: '$550',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600007687-98b52511c3a5?w=1200&h=500&fit=crop',
    location: 'Miami Beach',
    time: '4 hours',
    service: 'Mantenimiento semanal',
    price: '$250',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&h=500&fit=crop',
    location: 'Kendall',
    time: '5 hours',
    service: 'Limpieza profunda',
    price: '$400',
  },
];

export function TransformationsSection() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + transformCards.length) % transformCards.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % transformCards.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const currentCard = transformCards[currentIndex];

  return (
    <section id="transformaciones" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider block mb-2">
            <span className="lang-es">Transformaciones</span>
            <span className="lang-en hidden">Transformations</span>
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            <span className="lang-es">Transformaciones</span>
            <span className="lang-en hidden">Transformations</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            <span className="lang-es">Resultados reales en piscinas de Miami.</span>
            <span className="lang-en hidden">Real results in Miami pools.</span>
          </p>
        </motion.div>

        {/* Single Card Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-8"
        >
          <div className="overflow-hidden rounded-2xl bg-card shadow-lg border border-border">
            {/* Image with Before/After Badges */}
            <div className="relative aspect-video overflow-hidden bg-muted">
              <motion.img
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={currentCard.image}
                alt={`${currentCard.location} transformation`}
                className="w-full h-full object-cover"
              />

              {/* Before Badge - Left */}
              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs md:text-sm font-bold">
                <span className="lang-es">ANTES</span>
                <span className="lang-en hidden">BEFORE</span>
              </Badge>

              {/* After Badge - Right */}
              <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs md:text-sm font-bold">
                <span className="lang-es">DESPUÉS</span>
                <span className="lang-en hidden">AFTER</span>
              </Badge>
            </div>

            {/* Card Info - Grid Layout */}
            <div className="p-5 md:p-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Location */}
                <div className="flex flex-col">
                  <p className="text-xs uppercase font-semibold text-primary mb-1">
                    <span className="lang-es">Ubicación</span>
                    <span className="lang-en hidden">Location</span>
                  </p>
                  <p className="text-sm md:text-base font-semibold text-foreground">{currentCard.location}</p>
                </div>

                {/* Time */}
                <div className="flex flex-col">
                  <p className="text-xs uppercase font-semibold text-primary mb-1">
                    <span className="lang-es">Tiempo</span>
                    <span className="lang-en hidden">Time</span>
                  </p>
                  <p className="text-sm md:text-base font-semibold text-foreground">{currentCard.time}</p>
                </div>

                {/* Service */}
                <div className="flex flex-col">
                  <p className="text-xs uppercase font-semibold text-primary mb-1">
                    <span className="lang-es">Servicio</span>
                    <span className="lang-en hidden">Service</span>
                  </p>
                  <p className="text-sm md:text-base font-semibold text-foreground">{currentCard.service}</p>
                </div>

                {/* Price - Highlighted */}
                <div className="flex flex-col">
                  <p className="text-xs uppercase font-semibold text-primary mb-1">
                    <span className="lang-es">Inversión</span>
                    <span className="lang-en hidden">Investment</span>
                  </p>
                  <p className="text-sm md:text-base font-bold text-primary text-lg">{currentCard.price}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls - Below Image */}
          <div className="flex items-center justify-between mt-6 md:mt-8 gap-4">
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              className="flex items-center justify-center w-12 h-12 bg-card shadow-md rounded-full border border-border hover:bg-muted hover:shadow-lg transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Counter/Dots */}
            <div className="flex gap-2 justify-center flex-1">
              {transformCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'bg-primary w-8 h-2'
                      : 'bg-muted w-2 h-2 hover:bg-muted-foreground'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="flex items-center justify-center w-12 h-12 bg-card shadow-md rounded-full border border-border hover:bg-muted hover:shadow-lg transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
