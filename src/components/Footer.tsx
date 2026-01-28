import { Droplets, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t, language } = useLanguage();
  
  const servicesHref = language === 'es' ? '#servicios' : '#services';

  return (
    <footer className="bg-pool-dark text-secondary-foreground py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* Logo & About */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary flex items-center justify-center">
                <Droplets className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
              </div>
              <span className="text-lg md:text-xl font-bold">AquaPro Miami</span>
            </div>
            <p className="text-secondary-foreground/70 text-xs md:text-sm mb-4">
              {t('about.title')}
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">{t('footer.services')}</h4>
            <ul className="space-y-1.5 md:space-y-2 text-secondary-foreground/70 text-xs md:text-sm">
              <li><a href={servicesHref} className="hover:text-primary transition-colors">{t('contact.service.weekly')}</a></li>
              <li><a href={servicesHref} className="hover:text-primary transition-colors">{t('contact.service.repair')}</a></li>
              <li><a href={servicesHref} className="hover:text-primary transition-colors">{t('contact.service.recovery')}</a></li>
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">{t('footer.areas')}</h4>
            <ul className="space-y-1.5 md:space-y-2 text-secondary-foreground/70 text-xs md:text-sm">
              <li>Doral, Kendall, Coral Gables</li>
              <li>Miami Lakes, Hialeah</li>
              <li>Pinecrest, Palmetto Bay</li>
              <li>Coconut Grove, Brickell</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-3 md:mb-4 text-sm md:text-base">{t('footer.contact')}</h4>
            <ul className="space-y-2 md:space-y-3 text-secondary-foreground/70 text-xs md:text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                <a href="tel:+34623282101" className="hover:text-primary transition-colors">+34 623 282 101</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                <a href="mailto:aizen.marina.designs@gmail.com" className="hover:text-primary transition-colors break-all">aizen.marina.designs@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Miami-Dade County, FL</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright - Centered */}
        <div className="border-t border-secondary-foreground/10 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col items-center gap-3 md:gap-4 text-center">
          <p className="text-secondary-foreground/50 text-xs md:text-sm">
            © {new Date().getFullYear()} AquaPro Miami. {t('footer.rights')}
          </p>
          <div className="flex gap-4 md:gap-6 text-xs md:text-sm">
            <a href="#" className="text-secondary-foreground/50 hover:text-primary transition-colors">{t('footer.privacy')}</a>
            <span className="text-secondary-foreground/30">/</span>
            <a href="#" className="text-secondary-foreground/50 hover:text-primary transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
