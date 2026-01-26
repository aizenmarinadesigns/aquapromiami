
# Implementation Plan: Service Booking Calendar & Photo Gallery

## Overview
This plan adds two new sections to the pool cleaning service landing page:
1. **Service Booking Calendar** - An interactive calendar where customers can select available time slots
2. **Photo Gallery** - A before/after showcase with lightbox functionality

Both sections will follow the existing bilingual (ES/EN) pattern, use Framer Motion animations, and match the established design system.

---

## Feature 1: Service Booking Calendar

### What It Does
Customers can:
- View a calendar showing the current month
- Select a date to see available time slots
- Pick a time slot (morning/afternoon windows)
- See their selection confirmed
- Proceed to contact or WhatsApp with pre-filled booking info

### User Experience
1. User sees the calendar section with today's date highlighted
2. Clicking a date reveals available time slots (8am-10am, 10am-12pm, 1pm-3pm, 3pm-5pm)
3. Weekends and past dates are disabled
4. Selected slot shows confirmation with option to contact via WhatsApp or phone

### Files to Create/Modify
| File | Action | Purpose |
|------|--------|---------|
| `src/components/BookingSection.tsx` | Create | Main booking calendar component |
| `src/contexts/LanguageContext.tsx` | Modify | Add booking-related translations |
| `src/pages/Index.tsx` | Modify | Add BookingSection to the page |

### Technical Approach
- Use the existing `Calendar` component from shadcn/ui
- Create time slot selection with radio buttons styled as cards
- Store selected date/time in component state
- Generate WhatsApp link with pre-filled booking details
- Disable unavailable dates (past dates, weekends)

---

## Feature 2: Photo Gallery with Lightbox

### What It Does
- Display a grid of before/after pool transformation images
- Interactive lightbox for full-screen viewing
- Navigation between images in lightbox
- Keyboard support (arrow keys, escape to close)

### User Experience
1. User sees a responsive grid of before/after image pairs
2. Clicking any image opens a lightbox overlay
3. In lightbox: navigation arrows, close button, image counter
4. Can navigate with keyboard or touch gestures on mobile

### Files to Create/Modify
| File | Action | Purpose |
|------|--------|---------|
| `src/components/GallerySection.tsx` | Create | Gallery grid and lightbox component |
| `src/contexts/LanguageContext.tsx` | Modify | Add gallery-related translations |
| `src/pages/Index.tsx` | Modify | Add GallerySection to the page |

### Technical Approach
- Use existing Dialog component from shadcn/ui as lightbox base
- Create responsive image grid (2 cols mobile, 3-4 cols desktop)
- Each gallery item shows before/after with subtle label overlay
- Lightbox includes:
  - Full-screen image view
  - Previous/Next navigation
  - Close button
  - Image counter (e.g., "3 of 8")
  - Keyboard event listeners

---

## Translations to Add

### Spanish (ES)
```
booking.title: "Reserve Su Cita"
booking.subtitle: "Seleccione una fecha y hora disponible"
booking.select.date: "Seleccione una fecha"
booking.select.time: "Horarios disponibles"
booking.morning.1: "8:00 AM - 10:00 AM"
booking.morning.2: "10:00 AM - 12:00 PM"
booking.afternoon.1: "1:00 PM - 3:00 PM"
booking.afternoon.2: "3:00 PM - 5:00 PM"
booking.confirm: "Confirmar Reserva por WhatsApp"
booking.selected: "Ha seleccionado"
booking.unavailable: "No disponible"
booking.weekend: "No trabajamos fines de semana"

gallery.title: "Transformaciones Reales"
gallery.subtitle: "Vea el antes y después de nuestro trabajo"
gallery.before: "Antes"
gallery.after: "Después"
gallery.close: "Cerrar"
gallery.of: "de"
```

### English (EN)
```
booking.title: "Book Your Appointment"
booking.subtitle: "Select an available date and time"
booking.select.date: "Select a date"
booking.select.time: "Available time slots"
booking.morning.1: "8:00 AM - 10:00 AM"
booking.morning.2: "10:00 AM - 12:00 PM"
booking.afternoon.1: "1:00 PM - 3:00 PM"
booking.afternoon.2: "3:00 PM - 5:00 PM"
booking.confirm: "Confirm Booking via WhatsApp"
booking.selected: "You selected"
booking.unavailable: "Not available"
booking.weekend: "We don't work weekends"

gallery.title: "Real Transformations"
gallery.subtitle: "See the before and after of our work"
gallery.before: "Before"
gallery.after: "After"
gallery.close: "Close"
gallery.of: "of"
```

---

## Page Structure Update

The sections will be added to `Index.tsx` in this order:
1. Hero
2. Problems
3. Services
4. **Gallery** (new) - Shows work quality after describing services
5. Testimonials
6. Pricing
7. **Booking** (new) - Natural flow after seeing pricing
8. About
9. Guarantees
10. FAQ
11. Service Areas
12. Contact
13. Final CTA
14. Footer

---

## Design Details

### Booking Calendar
- Clean card layout with calendar on left, time slots on right (desktop)
- Stack vertically on mobile
- Primary color for selected date
- Coral accent for "Confirm" CTA
- Disabled dates in muted gray
- Smooth hover transitions on time slots

### Gallery
- Masonry-style grid with hover zoom effect
- Before/After labels as small badges on images
- Lightbox with dark overlay (black/80)
- Smooth fade-in animations
- Touch-friendly on mobile (swipe to navigate)

---

## Implementation Checklist

1. Add all translations to LanguageContext
2. Create BookingSection.tsx with:
   - Calendar integration
   - Time slot selection
   - WhatsApp booking link generation
   - Responsive layout
3. Create GallerySection.tsx with:
   - Image grid with placeholder images
   - Lightbox functionality using Dialog
   - Keyboard navigation
   - Before/After labels
4. Update Index.tsx to include new sections
5. Test bilingual switching
6. Verify responsive behavior
