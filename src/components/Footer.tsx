import { Droplets, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-pool-dark text-secondary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Droplets className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">AquaPro Miami</span>
            </div>
            <p className="text-secondary-foreground/70 text-sm mb-4">
              {t('about.title')}
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2 text-secondary-foreground/70 text-sm">
              <li><a href="#servicios" className="hover:text-primary transition-colors">{t('contact.service.weekly')}</a></li>
              <li><a href="#servicios" className="hover:text-primary transition-colors">{t('contact.service.repair')}</a></li>
              <li><a href="#servicios" className="hover:text-primary transition-colors">{t('contact.service.recovery')}</a></li>
            </ul>
          </div>

          {/* Areas */}
          <div>
            <h4 className="font-bold mb-4">{t('footer.areas')}</h4>
            <ul className="space-y-2 text-secondary-foreground/70 text-sm">
              <li>Doral, Kendall, Coral Gables</li>
              <li>Miami Lakes, Hialeah</li>
              <li>Pinecrest, Palmetto Bay</li>
              <li>Coconut Grove, Brickell</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3 text-secondary-foreground/70 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+13051234567" className="hover:text-primary transition-colors">(305) 123-4567</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:info@aquapromiami.com" className="hover:text-primary transition-colors">info@aquapromiami.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Miami-Dade County, FL</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary-foreground/50 text-sm">
            © {new Date().getFullYear()} AquaPro Miami. {t('footer.rights')}
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-secondary-foreground/50 hover:text-primary transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="text-secondary-foreground/50 hover:text-primary transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
