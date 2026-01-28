import { useState, useEffect } from 'react';
import { Menu, X, Droplets } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: language === 'es' ? '#servicios' : '#services', label: t('nav.services') },
    { href: language === 'es' ? '#testimonios' : '#testimonials', label: t('nav.testimonials') },
    { href: language === 'es' ? '#precios' : '#pricing', label: t('nav.pricing') },
    { href: language === 'es' ? '#garantias' : '#guarantees', label: t('nav.guarantees') },
    { href: language === 'es' ? '#contacto' : '#contact', label: t('nav.contact') },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-card/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 md:gap-2 text-base md:text-xl font-bold hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
              <Droplets className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
            </div>
            <span className={`truncate max-w-[120px] md:max-w-none ${isScrolled ? 'text-foreground' : 'text-secondary-foreground'}`}>
              AquaPro Miami
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors hover:text-primary ${
                  isScrolled ? 'text-foreground' : 'text-secondary-foreground'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Language Switcher + Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Language Toggle - No flags, smaller on mobile */}
            <div className="flex items-center bg-muted rounded-full p-0.5 md:p-1">
              <button
                onClick={() => setLanguage('es')}
                className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-medium transition-all ${
                  language === 'es'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-medium transition-all ${
                  language === 'en'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
             onClick={(e) => {
  e.preventDefault(); // Evita que el navegador salte de golpe
  const targetId = link.href.replace('#', ''); // Quita el '#' para buscar el ID
  const element = document.getElementById(targetId); // Busca la sección
  
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' }); // Hace el scroll suave
  }
  
  setIsMobileMenuOpen(false); // Cierra el menú después de iniciar el movimiento
}}
              className={`lg:hidden p-2 rounded-lg ${
                isScrolled ? 'text-foreground' : 'text-secondary-foreground'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Menu className="w-5 h-5 md:w-6 md:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border"
          >
            <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2.5 px-4 rounded-lg text-foreground font-medium hover:bg-muted transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
