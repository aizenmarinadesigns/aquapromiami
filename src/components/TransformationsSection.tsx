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

// Data: One image per card (image already contains before/after with divider)
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
    image: 'https://images.unsplash.com/photo-1600007687-98b52511c3a5?w=1200&h=500&fit=crop',
    location: 'Kendall',
    time: '3 hours',
    service: 'Mantenimiento semanal',
    price: '$250',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1576056201312-1697304da793?w=1200&h=500&fit=crop',
    location: 'Coral Gables',
    time: '8 hours',
    service: 'Recuperación de piscina verde',
    price: '$550',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&h=500&fit=crop',
    location: 'Miami Lakes',
    time: '10 hours',
    service: 'Restauración completa',
    price: '$750',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1600007687-98b52511c3a5?w=1200&h=500&fit=crop',
    location: 'Pinecrest',
    time: '5 hours',
    service: 'Mejora de equipos',
    price: '$350',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1576056201312-1697304da793?w=1200&h=500&fit=crop',
    location: 'Hialeah',
    time: '4 hours',
    service: 'Servicio semanal',
    price: '$200',
  },
];

export function TransformationsSection() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Calculate cards per view based on screen size
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 640) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const totalSlides = transformCards.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setIsAutoPlay(false);
  };

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [isAutoPlay, totalSlides]);

  // Resume autoplay after 10 seconds of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAutoPlay(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const visibleCards = transformCards.slice(currentIndex, currentIndex + cardsPerView).length === cardsPerView
    ? transformCards.slice(currentIndex, currentIndex + cardsPerView)
    : [...transformCards.slice(currentIndex), ...transformCards.slice(0, cardsPerView - (totalSlides - currentIndex))];
  const totalDots = transformCards.length;

  return (
    <section id="transformaciones" className="py-12 md:py-20 bg-background border-t border-border/30">
      <div className="container mx-auto px-4">
        {/* Header with Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-14"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-2">
            <div>
              <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider block mb-2">
                <span className="lang-es">Transformaciones</span>
                <span className="lang-en hidden">Transformations</span>
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                <span className="lang-es">Transformaciones</span>
                <span className="lang-en hidden">Transformations</span>
              </h2>
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="flex items-center justify-center w-12 h-12 bg-card shadow-md rounded-full border border-border hover:bg-muted hover:shadow-lg transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="flex items-center justify-center w-12 h-12 bg-card shadow-md rounded-full border border-border hover:bg-muted hover:shadow-lg transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <p className="text-sm md:text-base text-muted-foreground">
            <span className="lang-es">Resultados reales en piscinas de Miami.</span>
            <span className="lang-en hidden">Real results in Miami pools.</span>
          </p>
        </motion.div>

        {/* Cards Grid/Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
          {visibleCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden rounded-2xl bg-card shadow-lg border border-border hover:shadow-xl transition-shadow"
            >
              {/* Image with Before/After Badges */}
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={card.image}
                  alt={`${card.location} transformation`}
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
                    <p className="text-sm md:text-base font-semibold text-foreground">{card.location}</p>
                  </div>

                  {/* Time */}
                  <div className="flex flex-col">
                    <p className="text-xs uppercase font-semibold text-primary mb-1">
                      <span className="lang-es">Tiempo</span>
                      <span className="lang-en hidden">Time</span>
                    </p>
                    <p className="text-sm md:text-base font-semibold text-foreground">{card.time}</p>
                  </div>

                  {/* Service */}
                  <div className="flex flex-col">
                    <p className="text-xs uppercase font-semibold text-primary mb-1">
                      <span className="lang-es">Servicio</span>
                      <span className="lang-en hidden">Service</span>
                    </p>
                    <p className="text-sm md:text-base font-semibold text-foreground">{card.service}</p>
                  </div>

                  {/* Price - Highlighted */}
                  <div className="flex flex-col">
                    <p className="text-xs uppercase font-semibold text-primary mb-1">
                      <span className="lang-es">Inversión</span>
                      <span className="lang-en hidden">Investment</span>
                    </p>
                    <p className="text-sm md:text-base font-bold text-primary text-lg">{card.price}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 flex-wrap">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlay(false);
              }}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'bg-primary w-8 h-2'
                  : 'bg-muted w-2 h-2 hover:bg-muted-foreground'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
