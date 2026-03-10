import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TransformCard {
  id: number;
  before: string;
  after: string;
  location: string;
  time: string;
  service: string;
  price: string;
}

const transformCards: TransformCard[] = [
  {
    id: 1,
    before: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&h=400&fit=crop',
    after: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&h=400&fit=crop&brightness=1.2',
    location: 'Kendall',
    time: '6 hours',
    service: 'Limpieza profunda',
    price: '$350',
  },
  {
    id: 2,
    before: 'https://images.unsplash.com/photo-1576056201312-1697304da793?w=600&h=400&fit=crop',
    after: 'https://images.unsplash.com/photo-1576056201312-1697304da793?w=600&h=400&fit=crop&brightness=1.2',
    location: 'Coral Gables',
    time: '3 days',
    service: 'Renovación Diamond Brite',
    price: '$4,200',
  },
  {
    id: 3,
    before: 'https://images.unsplash.com/photo-1600007687-98b52511c3a5?w=600&h=400&fit=crop',
    after: 'https://images.unsplash.com/photo-1600007687-98b52511c3a5?w=600&h=400&fit=crop&brightness=1.2',
    location: 'Key Biscayne',
    time: '1 day',
    service: 'Lavado con ácido',
    price: '$550',
  },
  {
    id: 4,
    before: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&h=400&fit=crop',
    after: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&h=400&fit=crop&brightness=1.2',
    location: 'Miami Lakes',
    time: '5 hours',
    service: 'Servicio semanal',
    price: '$250',
  },
];

export function TransformationsSection() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

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

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + transformCards.length) % transformCards.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % transformCards.length);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < cardsPerView; i++) {
      const index = (currentIndex + i) % transformCards.length;
      cards.push(transformCards[index]);
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  return (
    <section id="transformaciones" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-14"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-4">
            <div>
              <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider block mb-2">
                <span className="lang-es">Resultados Reales</span>
                <span className="lang-en hidden">Real Results</span>
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                <span className="lang-es">Antes & Después</span>
                <span className="lang-en hidden">Before & After</span>
              </h2>
            </div>

            {/* Navigation Arrows - Top Right */}
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
            <span className="lang-es">Transformaciones reales en Miami-Dade. Ver para creer.</span>
            <span className="lang-en hidden">Real transformations in Miami-Dade. See to believe.</span>
          </p>
        </motion.div>

        {/* Carousel Cards */}
        <div className="mb-8 md:mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleCards.map((card, index) => (
              <motion.div
                key={`${currentIndex}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="overflow-hidden rounded-2xl bg-card shadow-lg border border-border"
              >
                {/* Before/After Images Side by Side */}
                <div className="flex h-64 md:h-72 overflow-hidden bg-muted">
                  {/* Before Image */}
                  <div className="relative flex-1">
                    <img
                      src={card.before}
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold">
                      <span className="lang-es">ANTES</span>
                      <span className="lang-en hidden">BEFORE</span>
                    </Badge>
                  </div>

                  {/* Divider */}
                  <div className="w-1 bg-white/30"></div>

                  {/* After Image */}
                  <div className="relative flex-1">
                    <img
                      src={card.after}
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold">
                      <span className="lang-es">DESPUÉS</span>
                      <span className="lang-en hidden">AFTER</span>
                    </Badge>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="p-5 md:p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs uppercase font-semibold text-primary mb-1">
                        <span className="lang-es">Ubicación</span>
                        <span className="lang-en hidden">Location</span>
                      </p>
                      <p className="text-sm font-bold text-foreground">{card.location}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase font-semibold text-primary mb-1">
                        <span className="lang-es">Tiempo</span>
                        <span className="lang-en hidden">Time</span>
                      </p>
                      <p className="text-sm font-bold text-foreground">{card.time}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs uppercase font-semibold text-primary mb-1">
                        <span className="lang-es">Servicio</span>
                        <span className="lang-en hidden">Service</span>
                      </p>
                      <p className="text-sm font-bold text-foreground">{card.service}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase font-semibold text-primary mb-1">
                        <span className="lang-es">Inversión</span>
                        <span className="lang-en hidden">Investment</span>
                      </p>
                      <p className="text-sm font-bold text-primary">{card.price}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: transformCards.length }).map((_, index) => (
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
      </div>
    </section>
  );
}
