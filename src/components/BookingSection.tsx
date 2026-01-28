import { useState } from 'react';
import { motion } from 'framer-motion';
import { format, isWeekend, isBefore, startOfDay } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const timeSlots = [
  { id: '8-10', key: 'booking.slot.1' },
  { id: '10-12', key: 'booking.slot.2' },
  { id: '13-15', key: 'booking.slot.3' },
  { id: '15-17', key: 'booking.slot.4' },
];

export function BookingSection() {
  const { t, language } = useLanguage();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const today = startOfDay(new Date());
  const dateLocale = language === 'es' ? es : enUS;

  const isDateDisabled = (date: Date) => {
    return isWeekend(date) || isBefore(date, today);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const generateWhatsAppLink = () => {
    if (!selectedDate || !selectedSlot) return '#';
    
    const formattedDate = format(selectedDate, 'EEEE, d MMMM yyyy', { locale: dateLocale });
    const slotText = t(`booking.slot.${timeSlots.findIndex(s => s.id === selectedSlot) + 1}`);
    
    const message = language === 'es'
      ? `Hola! Quiero reservar una cita para servicio de piscina:\n📅 Fecha: ${formattedDate}\n⏰ Horario: ${slotText}\n\nPor favor confirmen disponibilidad.`
      : `Hi! I want to book a pool service appointment:\n📅 Date: ${formattedDate}\n⏰ Time: ${slotText}\n\nPlease confirm availability.`;
    
    return `https://wa.me/34623282101?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="booking" className="py-12 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider">
            {t('booking.badge')}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-2 mb-2 md:mb-4">
            {t('booking.title')}
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            {t('booking.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="shadow-lg border-border/50">
            <CardContent className="p-4 md:p-8">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {/* Calendar */}
                <div>
                  <h3 className="text-sm md:text-lg font-semibold text-foreground mb-3 md:mb-4 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    {t('booking.select.date')}
                  </h3>
                  <div className="bg-background rounded-lg border border-border p-1 md:p-2">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={isDateDisabled}
                      locale={dateLocale}
                      className="pointer-events-auto"
                    />
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground mt-2 md:mt-3 flex items-center gap-2">
                    <span className="w-2 h-2 md:w-3 md:h-3 bg-muted rounded-full inline-block"></span>
                    {t('booking.weekend.note')}
                  </p>
                </div>

                {/* Time Slots */}
                <div>
                  <h3 className="text-sm md:text-lg font-semibold text-foreground mb-3 md:mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    {t('booking.select.time')}
                  </h3>
                  
                  {selectedDate ? (
                    <div className="space-y-2 md:space-y-3">
                      <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                        {format(selectedDate, 'EEEE, d MMMM yyyy', { locale: dateLocale })}
                      </p>
                      {timeSlots.map((slot, index) => (
                        <motion.button
                          key={slot.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => setSelectedSlot(slot.id)}
                          className={`w-full p-3 md:p-4 rounded-lg border-2 text-left transition-all duration-200 hover:scale-[1.02] ${
                            selectedSlot === slot.id
                              ? 'border-primary bg-primary/10 text-foreground'
                              : 'border-border bg-background hover:border-primary/50 text-foreground'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm md:text-base">{t(slot.key)}</span>
                            {selectedSlot === slot.id && (
                              <Badge variant="default" className="bg-primary text-xs">
                                {t('booking.selected')}
                              </Badge>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full min-h-[200px] flex items-center justify-center text-center p-4 md:p-8 bg-muted/50 rounded-lg border-2 border-dashed border-border">
                      <p className="text-muted-foreground text-sm md:text-base">
                        {t('booking.select.date.first')}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Confirmation CTA */}
              {selectedDate && selectedSlot && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-border bg-card rounded-lg"
                >
                  <div className="text-center">
                    <p className="text-foreground mb-3 md:mb-4 text-sm md:text-base">
                      <span className="font-semibold">{t('booking.confirmation.text')}</span>
                      <br />
                      <span className="text-primary font-medium">
                        {format(selectedDate, 'EEEE, d MMMM', { locale: dateLocale })} - {t(`booking.slot.${timeSlots.findIndex(s => s.id === selectedSlot) + 1}`)}
                      </span>
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="btn-whatsapp text-sm md:text-base px-6 md:px-8"
                    >
                      <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                        {t('booking.confirm')}
                      </a>
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
