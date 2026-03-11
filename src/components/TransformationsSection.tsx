import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRef, useEffect, useState } from 'react';

interface TransformCard {
  id: number;
  imageBefore: string;
  imageAfter: string;
  location: string;
  time: string;
  service: string;
  price: string;
}

const transformCards: TransformCard[] = [
  {
    id: 1,
    imageBefore: '/aquapromiami/antes-despues/construccion-pileta.png',
    imageAfter: '/aquapromiami/antes-despues/pileta-renovada.png',
    location: 'Kendall',
    time: '6 horas',
    service: 'Limpieza profunda',
    price: '$350',
  },
  {
    id: 2,
    imageBefore: '/aquapromiami/antes-despues/analisis-ph-pileta.png',
    imageAfter: '/aquapromiami/antes-despues/pileta-latino.png',
    location: 'Coral Gables',
    time: '3 días',
    service: 'Renovación Diamond Brite',
    price: '$4,200',
  },
  {
    id: 3,
    imageBefore: '/aquapromiami/antes-despues/latino-pileta.png',
    imageAfter: '/aquapromiami/antes-despues/4-limpieza-acido-key-biscayne.png',
    location: 'Key Biscayne',
    time: '1 día',
    service: 'Lavado con ácido',
    price: '$550',
  },
  {
    id: 4,
    imageBefore: '/aquapromiami/antes-despues/mantenimiento-de-equipos.png',
    imageAfter: '/aquapromiami/antes-despues/mantenimiento-equipo-2.png',
    location: 'Hialeah',
    time: '2 horas',
    service: 'Mantenimiento',
    price: '$350',
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
        {/* Header with Arrows */}
        <div className="flex items-start justify-between gap-8 mb-12">
          <div className="flex-1">
            <div className="inline-block px-3 py-1 text-primary rounded-full text-xs md:text-sm font-semibold mb-3">
              <span className="lang-es">RESULTADOS REALES</span>
              <span className="lang-en hidden">REAL RESULTS</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              <span className="lang-es">Antes & Después</span>
              <span className="lang-en hidden">Before & After</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              <span className="lang-es">Transformaciones reales en Miami-Dade. Ver para creer.</span>
              <span className="lang-en hidden">Real transformations in Miami-Dade. See to believe.</span>
            </p>
          </div>

          {/* Top Right Arrows */}
          <div className="flex gap-3 flex-shrink-0">
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
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"
        >
          {getVisibleCards().map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl transition-shadow"
            >
              {/* Image Container - 30/70 Before/After ratio */}
              <div className="grid grid-cols-10 gap-0 bg-gray-100">
                {/* Before Image - 30% */}
                <div className="col-span-3 relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={card.imageBefore}
                    alt={`${card.location} antes`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute left-2 top-2 bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-bold uppercase">
                    <span className="lang-es">Antes</span>
                    <span className="lang-en hidden">Before</span>
                  </div>
                </div>

                {/* After Image - 70% */}
                <div className="col-span-7 relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={card.imageAfter}
                    alt={`${card.location} después`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute right-2 top-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold uppercase">
                    <span className="lang-es">Después</span>
                    <span className="lang-en hidden">After</span>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-8 mb-4">
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

                <div className="grid grid-cols-2 gap-8">
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
