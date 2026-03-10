import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRef, useEffect, useState } from 'react';

interface TransformCard {
  id: number;
  image: string;
  location: string;
  time: string;
  service: string;
  price: string;
}

const transformCards: TransformCard[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop',
    location: 'Kendall',
    time: '6 horas',
    service: 'Limpieza profunda',
    price: '$350',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1576056201312-1697304da793?w=800&h=600&fit=crop',
    location: 'Coral Gables',
    time: '3 días',
    service: 'Renovación Diamond Brite',
    price: '$4,200',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600007687-98b52511c3a5?w=800&h=600&fit=crop',
    location: 'Key Biscayne',
    time: '1 día',
    service: 'Lavado con ácido',
    price: '$550',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop',
    location: 'Hialeah',
    time: '4 días',
    service: 'Renovación Diamond Brite',
    price: '$5,800',
  },
];

export function TransformationsSection() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < cardsPerView; i++) {
      const index = (currentIndex + i) % transformCards.length;
      cards.push(transformCards[index]);
    }
    return cards;
  };

  return (
    <section id="transformaciones" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 bg-blue-100 text-primary rounded-full text-xs md:text-sm font-semibold mb-3">
            <span className="lang-es">RESULTADOS REALES</span>
            <span className="lang-en hidden">REAL RESULTS</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="lang-es">Antes & Después</span>
            <span className="lang-en hidden">Before & After</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            <span className="lang-es">Mira nuestros trabajos en todo Miami</span>
            <span className="lang-en hidden">See our work throughout Miami</span>
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-center mb-8">
          <button
            onClick={handlePrev}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-300 hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-gray-300 hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Carousel */}
        <div className="mb-6">
          <div
            ref={containerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {getVisibleCards().map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-shadow"
              >
                {/* Image */}
                <div className="relative h-64 md:h-80 overflow-hidden bg-gray-100">
                  <img
                    src={card.image}
                    alt={card.location}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                        <span className="lang-es">Ubicación</span>
                        <span className="lang-en hidden">Location</span>
                      </p>
                      <p className="text-sm font-bold text-foreground">{card.location}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                        <span className="lang-es">Tiempo</span>
                        <span className="lang-en hidden">Time</span>
                      </p>
                      <p className="text-sm font-bold text-foreground">{card.time}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                        <span className="lang-es">Servicio</span>
                        <span className="lang-en hidden">Service</span>
                      </p>
                      <p className="text-sm font-bold text-foreground">{card.service}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                        <span className="lang-es">Inversión</span>
                        <span className="lang-en hidden">Investment</span>
                      </p>
                      <p className="text-sm font-bold text-blue-500">{card.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {transformCards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'bg-blue-500 w-8 h-2'
                  : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
