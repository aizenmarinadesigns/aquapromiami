import { useState, useRef, useEffect } from 'react';
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

// Card 1 — Doral
const transformCards: TransformCard[] = [
  {
    id: 1,
    before: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=600&h=400&fit=crop',
    after: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=600&h=400&fit=crop',
    location: 'Doral',
    time: '6 hours',
    service: 'Pool Recovery',
    price: '$450',
  },
  // Card 2 — Kendall
  {
    id: 2,
    before: 'https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=600&h=400&fit=crop',
    after: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&h=400&fit=crop',
    location: 'Kendall',
    time: '3 hours',
    service: 'Weekly Maintenance',
    price: '$250',
  },
  // Card 3 — Coral Gables
  {
    id: 3,
    before: 'https://images.unsplash.com/photo-1599309329365-0a9ed45a1da3?w=600&h=400&fit=crop',
    after: 'https://images.unsplash.com/photo-1519449556851-5720b33024e7?w=600&h=400&fit=crop',
    location: 'Coral Gables',
    time: '8 hours',
    service: 'Green Pool Fix',
    price: '$550',
  },
  // Card 4 — Miami Lakes
  {
    id: 4,
    before: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?w=600&h=400&fit=crop',
    after: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
    location: 'Miami Lakes',
    time: '10 hours',
    service: 'Full Restoration',
    price: '$750',
  },
  // Card 5 — Pinecrest
  {
    id: 5,
    before: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?w=600&h=400&fit=crop',
    after: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop',
    location: 'Pinecrest',
    time: '5 hours',
    service: 'Equipment Upgrade',
    price: '$350',
  },
  // Card 6 — Hialeah
  {
    id: 6,
    before: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=600&h=400&fit=crop',
    after: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=600&h=400&fit=crop',
    location: 'Hialeah',
    time: '4 hours',
    service: 'Weekly Service',
    price: '$200',
  },
];

interface BeforeAfterSliderProps {
  card: TransformCard;
}

function BeforeAfterSlider({ card }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] cursor-ew-resize select-none overflow-hidden rounded-lg"
      onMouseDown={() => setIsDragging(true)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Background) */}
      <img
        src={card.after}
        alt="After"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={card.before}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <ChevronLeft className="w-3 h-3 text-gray-700 -mr-0.5" />
          <ChevronRight className="w-3 h-3 text-gray-700 -ml-0.5" />
        </div>
      </div>

      {/* Badges */}
      <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-[10px] md:text-xs pointer-events-none">
        <span className="lang-es">ANTES</span>
        <span className="lang-en hidden">BEFORE</span>
      </Badge>
      <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground text-[10px] md:text-xs pointer-events-none">
        <span className="lang-es">DESPUÉS</span>
        <span className="lang-en hidden">AFTER</span>
      </Badge>
    </div>
  );
}

export function TransformationsSection() {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const totalDots = Math.ceil(transformCards.length / cardsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalDots) % totalDots);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalDots);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [totalDots]);

  // Handle swipe
  const handleTouchStart = useRef(0);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const diff = handleTouchStart.current - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const visibleCards = transformCards.slice(
    currentIndex * cardsPerView,
    currentIndex * cardsPerView + cardsPerView
  );

  return (
    <section id="transformaciones" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="text-accent font-semibold text-xs md:text-sm uppercase tracking-wider">
            <span className="lang-es">GALERÍA</span>
            <span className="lang-en hidden">GALLERY</span>
          </span>
          <div className="flex items-center justify-center gap-4 mt-2 mb-2 md:mb-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              <span className="lang-es">Transformaciones Reales</span>
              <span className="lang-en hidden">Real Transformations</span>
            </h2>

            {/* Navigation Arrows - Desktop only */}
            <div className="hidden md:flex gap-2">
              <button
                onClick={handlePrev}
                className="flex items-center justify-center w-10 h-10 bg-card shadow-lg rounded-full border border-border hover:bg-muted transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="flex items-center justify-center w-10 h-10 bg-card shadow-lg rounded-full border border-border hover:bg-muted transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            <span className="lang-es">Vea el antes y después de nuestro trabajo profesional</span>
            <span className="lang-en hidden">See the before and after of our professional work</span>
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 touch-pan-y"
          onTouchStart={(e) => (handleTouchStart.current = e.touches[0].clientX)}
          onTouchEnd={handleTouchEnd}
        >
          {visibleCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-xl bg-card shadow-md border border-border hover:shadow-lg transition-shadow"
            >
              <BeforeAfterSlider card={card} />

              {/* Card Details Grid */}
              <div className="p-4 md:p-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Location */}
                  <div>
                    <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">
                      <span className="lang-es">Ubicación</span>
                      <span className="lang-en hidden">Location</span>
                    </p>
                    <p className="text-sm md:text-base font-medium text-foreground">{card.location}</p>
                  </div>

                  {/* Time */}
                  <div>
                    <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">
                      <span className="lang-es">Tiempo</span>
                      <span className="lang-en hidden">Time</span>
                    </p>
                    <p className="text-sm md:text-base font-medium text-foreground">{card.time}</p>
                  </div>

                  {/* Service */}
                  <div>
                    <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">
                      <span className="lang-es">Servicio</span>
                      <span className="lang-en hidden">Service</span>
                    </p>
                    <p className="text-sm md:text-base font-medium text-foreground">{card.service}</p>
                  </div>

                  {/* Price */}
                  <div>
                    <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">
                      <span className="lang-es">Inversión</span>
                      <span className="lang-en hidden">Investment</span>
                    </p>
                    <p className="text-sm md:text-base font-bold text-accent">{card.price}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-accent w-8' : 'bg-muted'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-6 md:hidden">
          <button
            onClick={handlePrev}
            className="flex items-center justify-center w-10 h-10 bg-card shadow-lg rounded-full border border-border hover:bg-muted transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="flex items-center justify-center w-10 h-10 bg-card shadow-lg rounded-full border border-border hover:bg-muted transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Scroll hint for mobile */}
        <p className="text-center text-xs text-muted-foreground mt-4 md:hidden">
          ← <span className="lang-es">Desliza</span><span className="lang-en hidden">Swipe</span> →
        </p>
      </div>
    </section>
  );
}
