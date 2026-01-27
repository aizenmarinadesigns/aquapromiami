import { useState } from 'react';
import { Phone, MessageCircle, Mail, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const cities = [
  'Doral', 'Kendall', 'Coral Gables', 'Miami Lakes', 'Hialeah',
  'Sweetwater', 'Pinecrest', 'Coconut Grove', 'Miami Springs', 'Homestead',
  'Fontainebleau', 'Palmetto Bay', 'Brickell', 'Opa-Locka', 'Cutler Bay',
  'Tamiami', 'Key Biscayne', 'Miami Beach', 'North Miami', 'Westchester'
];

export function ContactSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    service: 'weekly',
    message: '',
  });

  const whatsappNumber = '13051234567';
  const whatsappMessage = encodeURIComponent(t('whatsapp.message'));
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', email: '', city: '', service: 'weekly', message: '' });
    }, 5000);
  };

  return (
    <section ref={ref} id="contacto" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider">
            {t('nav.contact')}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-2">
            {t('contact.title')}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isSubmitted ? (
              <div className="card-elevated text-center py-8 md:py-12">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-whatsapp/10 flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-whatsapp" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                  {t('contact.success')}
                </h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-elevated space-y-4 md:space-y-5 p-4 md:p-6">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">
                    {t('contact.name')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">
                    {t('contact.phone')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">
                    {t('contact.city')} *
                  </label>
                  <select
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm md:text-base"
                  >
                    <option value="">--</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">
                    {t('contact.service')} *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'weekly', label: t('contact.service.weekly') },
                      { value: 'repair', label: t('contact.service.repair') },
                      { value: 'recovery', label: t('contact.service.recovery') },
                      { value: 'other', label: t('contact.service.other') },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center justify-center px-2 md:px-4 py-2 rounded-lg border cursor-pointer transition-all text-xs md:text-sm ${
                          formData.service === option.value
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-input bg-background text-foreground hover:border-primary/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="service"
                          value={option.value}
                          checked={formData.service === option.value}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="sr-only"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-foreground mb-1.5 md:mb-2">
                    {t('contact.message')}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none text-sm md:text-base"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-coral flex items-center justify-center gap-2 disabled:opacity-70 text-sm md:text-base py-3 md:py-4"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 md:w-5 md:h-5" />
                      {t('contact.submit')}
                    </>
                  )}
                </button>

                <p className="text-[10px] md:text-xs text-muted-foreground text-center">
                  🔒 {t('contact.privacy')}
                </p>
              </form>
            )}
          </motion.div>

          {/* Alternative Contact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6">
              {t('contact.alt.title')}
            </h3>

            <div className="space-y-3 md:space-y-4">
              <a
                href="tel:+13051234567"
                className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-foreground text-sm md:text-base">(305) 123-4567</p>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">{t('hero.cta.call')}</p>
                </div>
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-card rounded-xl border border-border hover:border-whatsapp/50 transition-colors group"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-whatsapp/10 flex items-center justify-center group-hover:bg-whatsapp/20 transition-colors flex-shrink-0">
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-whatsapp" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-foreground text-sm md:text-base">WhatsApp</p>
                  <p className="text-xs md:text-sm text-muted-foreground truncate">{t('hero.cta.whatsapp')}</p>
                </div>
              </a>

              <a
                href="mailto:info@aquapromiami.com"
                className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-foreground text-sm md:text-base break-all">info@aquapromiami.com</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Email</p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
