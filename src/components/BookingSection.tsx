import { useState } from 'react';
import { motion } from 'framer-motion';
import { format, isWeekend, isBefore, startOfDay } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    
    return `https://wa.me/13055551234?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="booking" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            <CalendarDays className="w-4 h-4 mr-2" />
            {t('booking.badge')}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('booking.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
            <CardContent className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Calendar */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-primary" />
                    {t('booking.select.date')}
                  </h3>
                  <div className="bg-background rounded-lg border border-border p-2">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={isDateDisabled}
                      locale={dateLocale}
                      className="pointer-events-auto"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 flex items-center gap-2">
                    <span className="w-3 h-3 bg-muted rounded-full inline-block"></span>
                    {t('booking.weekend.note')}
                  </p>
                </div>

                {/* Time Slots */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    {t('booking.select.time')}
                  </h3>
                  
                  {selectedDate ? (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground mb-4">
                        {format(selectedDate, 'EEEE, d MMMM yyyy', { locale: dateLocale })}
                      </p>
                      {timeSlots.map((slot, index) => (
                        <motion.button
                          key={slot.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => setSelectedSlot(slot.id)}
                          className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 hover:scale-[1.02] ${
                            selectedSlot === slot.id
                              ? 'border-primary bg-primary/10 text-foreground'
                              : 'border-border bg-background hover:border-primary/50 text-foreground'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{t(slot.key)}</span>
                            {selectedSlot === slot.id && (
                              <Badge variant="default" className="bg-primary">
                                {t('booking.selected')}
                              </Badge>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center p-8 bg-muted/50 rounded-lg border-2 border-dashed border-border">
                      <p className="text-muted-foreground">
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
                  className="mt-8 pt-6 border-t border-border"
                >
                  <div className="text-center">
                    <p className="text-foreground mb-4">
                      <span className="font-semibold">{t('booking.confirmation.text')}</span>
                      <br />
                      <span className="text-primary font-medium">
                        {format(selectedDate, 'EEEE, d MMMM', { locale: dateLocale })} - {t(`booking.slot.${timeSlots.findIndex(s => s.id === selectedSlot) + 1}`)}
                      </span>
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="bg-[#25D366] hover:bg-[#1ea952] text-white font-semibold px-8"
                    >
                      <a href={generateWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-5 h-5 mr-2" />
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
