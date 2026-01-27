import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Images } from 'lucide-react';
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

export function GallerySection() {
  const { t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setShowAfter(false);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
    setShowAfter(false);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
    setShowAfter(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') closeLightbox();
      if (e.key === ' ') {
        e.preventDefault();
        setShowAfter((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, goToPrevious, goToNext]);

  const currentItem = galleryItems[currentIndex];

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            <Images className="w-4 h-4 mr-2" />
            {t('gallery.badge')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('gallery.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="relative overflow-hidden rounded-xl shadow-md border border-border">
                {/* Before Image */}
                <div className="relative aspect-[4/3]">
                  <img
                    src={item.before}
                    alt={`${item.title} - Before`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Labels */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-destructive text-destructive-foreground text-xs">
                      {t('gallery.before')}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      {t('gallery.after')}
                    </Badge>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-background/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                      <p className="text-sm font-medium text-foreground">{t('gallery.click.view')}</p>
                    </div>
                  </div>
                </div>
                
                {/* Title */}
                <div className="p-3 bg-card">
                  <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Dialog */}
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-4xl w-full p-0 bg-black/95 border-none">
            <div className="relative">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
                onClick={closeLightbox}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Image Container */}
              <div className="relative aspect-[4/3] md:aspect-[16/10]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${currentIndex}-${showAfter ? 'after' : 'before'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={showAfter ? currentItem.after : currentItem.before}
                    alt={currentItem.title}
                    className="w-full h-full object-contain"
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 h-12 w-12"
                  onClick={goToNext}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </div>

              {/* Controls */}
              <div className="p-4 bg-black/80">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button
                      variant={!showAfter ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setShowAfter(false)}
                      className={!showAfter ? 'bg-destructive hover:bg-destructive/90' : 'border-white/30 text-white hover:bg-white/10'}
                    >
                      {t('gallery.before')}
                    </Button>
                    <Button
                      variant={showAfter ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setShowAfter(true)}
                      className={showAfter ? 'bg-primary hover:bg-primary/90' : 'border-white/30 text-white hover:bg-white/10'}
                    >
                      {t('gallery.after')}
                    </Button>
                  </div>
                  <div className="text-white/70 text-sm">
                    {currentIndex + 1} {t('gallery.of')} {galleryItems.length}
                  </div>
                </div>
                <p className="text-white mt-2 font-medium">{currentItem.title}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
