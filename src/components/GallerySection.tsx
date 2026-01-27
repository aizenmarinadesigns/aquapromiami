import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Images, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface GalleryItem {
  id: number;
  before: string;
  after: string;
  title: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    before: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=600&h=400&fit=crop',
    after: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=600&h=400&fit=crop',
    title: 'Pool Recovery - Doral',
  },
  {
    id: 2,
    before: 'https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=600&h=400&fit=crop',
    after: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=600&h=400&fit=crop',
    title: 'Weekly Maintenance - Kendall',
  },
  {
    id: 3,
    before: 'https://images.unsplash.com/photo-1599309329365-0a9ed45a1da3?w=600&h=400&fit=crop',
    after: 'https://images.unsplash.com/photo-1519449556851-5720b33024e7?w=600&h=400&fit=crop',
    title: 'Green Pool Fix - Coral Gables',
  },
  {
    id: 4,
    before: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?w=600&h=400&fit=crop',
    after: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
    title: 'Full Restoration - Miami Lakes',
  },
  {
    id: 5,
    before: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?w=600&h=400&fit=crop',
    after: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&h=400&fit=crop',
    title: 'Equipment Upgrade - Pinecrest',
  },
  {
    id: 6,
    before: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=600&h=400&fit=crop',
    after: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=600&h=400&fit=crop',
    title: 'Weekly Service - Hialeah',
  },
];

function BeforeAfterCard({ item, t }: { item: GalleryItem; t: (key: string) => string }) {
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
    <div className="overflow-hidden rounded-xl shadow-md border border-border bg-card">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] cursor-ew-resize select-none overflow-hidden"
        onMouseDown={() => setIsDragging(true)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Background) */}
        <img
          src={item.after}
          alt={`${item.title} - After`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        
        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={item.before}
            alt={`${item.title} - Before`}
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
            <ChevronLeft className="w-3 h-3 text-muted-foreground -mr-0.5" />
            <ChevronRight className="w-3 h-3 text-muted-foreground -ml-0.5" />
          </div>
        </div>

        {/* Labels */}
        <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-[10px] md:text-xs pointer-events-none">
          {t('gallery.before')}
        </Badge>
        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] md:text-xs pointer-events-none">
          {t('gallery.after')}
        </Badge>
      </div>
      
      {/* Title */}
      <div className="p-2 md:p-3 bg-card">
        <p className="text-xs md:text-sm font-medium text-foreground truncate">{item.title}</p>
      </div>
    </div>
  );
}

export function GallerySection() {
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 300;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="gallery" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider">
            {t('gallery.badge')}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-2 md:mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            {t('gallery.subtitle')}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons - Desktop only */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 bg-card shadow-lg rounded-full border border-border transition-opacity ${
              canScrollLeft ? 'opacity-100 hover:bg-muted' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 bg-card shadow-lg rounded-full border border-border transition-opacity ${
              canScrollRight ? 'opacity-100 hover:bg-muted' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-[280px] md:w-[350px] lg:w-[400px] snap-center"
              >
                <BeforeAfterCard item={item} t={t} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll hint for mobile */}
        <p className="text-center text-xs text-muted-foreground mt-2 md:hidden">
          ← {t('gallery.badge')} →
        </p>
      </div>
    </section>
  );
}
