

# Implementation Plan: Service Booking Calendar & Photo Gallery

## Overview
Adding two new interactive sections to the pool cleaning service landing page:
1. **Service Booking Calendar** - Date and time slot selection with WhatsApp confirmation
2. **Photo Gallery** - Before/after showcase with lightbox viewer

Both sections will use the established bilingual (ES/EN) pattern, Framer Motion animations, and match the existing design system.

---

## Feature 1: Service Booking Calendar

### What Customers Can Do
- View an interactive monthly calendar
- Select an available date (weekdays only)
- Choose from 4 time slots (morning/afternoon)
- Confirm booking via WhatsApp with pre-filled details

### User Flow
```text
See Calendar -> Select Date -> See Time Slots -> Pick Time -> Confirm via WhatsApp
```

### Files to Modify/Create

| File | Action | Description |
|------|--------|-------------|
| `src/components/BookingSection.tsx` | Create | Main booking component with calendar and time slots |
| `src/contexts/LanguageContext.tsx` | Modify | Add booking-related translations |
| `src/pages/Index.tsx` | Modify | Add BookingSection after Pricing |

### Component Structure
- Uses existing shadcn/ui `Calendar` component
- Time slots displayed as clickable cards
- Responsive layout: side-by-side on desktop, stacked on mobile
- WhatsApp CTA generates pre-filled booking message

### Technical Details
- Calendar disables: past dates, weekends
- Time slots: 8-10 AM, 10 AM-12 PM, 1-3 PM, 3-5 PM
- State management: `selectedDate`, `selectedTimeSlot`
- WhatsApp message includes: date, time, service type

---

## Feature 2: Photo Gallery with Lightbox

### What Customers Can Do
- Browse a grid of before/after pool transformations
- Click any image to open full-screen lightbox
- Navigate between images using arrows or keyboard
- See image counter (e.g., "3 of 8")

### Files to Modify/Create

| File | Action | Description |
|------|--------|-------------|
| `src/components/GallerySection.tsx` | Create | Gallery grid with lightbox functionality |
| `src/contexts/LanguageContext.tsx` | Modify | Add gallery-related translations |
| `src/pages/Index.tsx` | Modify | Add GallerySection after Services |

### Component Structure
- Responsive grid: 2 columns mobile, 3-4 columns desktop
- Before/After labels as badges on images
- Lightbox built with shadcn/ui `Dialog`
- Keyboard support (arrow keys, Escape)

### Technical Details
- Uses placeholder images initially (can be replaced with real photos)
- Smooth hover zoom effect on grid items
- Dark overlay (black/80) for lightbox
- Touch-friendly navigation for mobile

---

## Translations to Add

### Booking Section (Spanish)
- Reserve Su Cita
- Seleccione una fecha y hora disponible
- Horarios disponibles
- 8:00 AM - 10:00 AM, 10:00 AM - 12:00 PM, 1:00 PM - 3:00 PM, 3:00 PM - 5:00 PM
- Confirmar Reserva por WhatsApp
- No trabajamos fines de semana

### Booking Section (English)
- Book Your Appointment
- Select an available date and time
- Available time slots
- (Same time slots as Spanish)
- Confirm Booking via WhatsApp
- We don't work weekends

### Gallery Section (Spanish/English)
- Transformaciones Reales / Real Transformations
- Antes / Before
- Despues / After
- Cerrar / Close
- de / of (for counter)

---

## Updated Page Structure

The sections will appear in this order in `Index.tsx`:

1. Hero
2. Problems
3. Services
4. **Gallery** (new) - Shows work quality after services
5. Testimonials
6. Pricing
7. **Booking** (new) - Natural flow after pricing
8. About
9. Guarantees
10. FAQ
11. Service Areas
12. Contact
13. Final CTA
14. Footer

---

## Design Specifications

### Booking Calendar
- Clean card layout with `card-elevated` class
- Primary color for selected date
- Coral accent (`bg-accent`) for confirm button
- Disabled dates shown in muted gray
- Time slot cards with hover scale effect (1.05)
- Selected slot highlighted with primary border

### Gallery Grid
- Hover zoom effect using `group-hover:scale-105`
- Before/After badges using `Badge` component
- Lightbox with dark overlay and white navigation arrows
- Smooth fade animations on open/close
- Touch swipe support on mobile

---

## Implementation Steps

1. **Add translations** to LanguageContext (20+ new translation keys)
2. **Create BookingSection.tsx**:
   - Import Calendar, Card components
   - Implement date selection with disabled weekends/past dates
   - Build time slot selector with card-style buttons
   - Generate WhatsApp booking link
   - Add Framer Motion animations matching other sections
3. **Create GallerySection.tsx**:
   - Build responsive image grid
   - Implement lightbox with Dialog component
   - Add keyboard event listeners (arrows, escape)
   - Add before/after label badges
   - Add hover effects and animations
4. **Update Index.tsx**:
   - Import new components
   - Place Gallery after Services
   - Place Booking after Pricing
5. **Test both language modes** (ES/EN switching)
6. **Verify responsive behavior** on mobile/tablet/desktop

