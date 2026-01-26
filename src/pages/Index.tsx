import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ProblemsSection } from '@/components/ProblemsSection';
import { ServicesSection } from '@/components/ServicesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { PricingSection } from '@/components/PricingSection';
import { AboutSection } from '@/components/AboutSection';
import { GuaranteesSection } from '@/components/GuaranteesSection';
import { FAQSection } from '@/components/FAQSection';
import { ServiceAreasSection } from '@/components/ServiceAreasSection';
import { ContactSection } from '@/components/ContactSection';
import { FinalCTASection } from '@/components/FinalCTASection';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <ProblemsSection />
          <ServicesSection />
          <TestimonialsSection />
          <PricingSection />
          <AboutSection />
          <GuaranteesSection />
          <FAQSection />
          <ServiceAreasSection />
          <ContactSection />
          <FinalCTASection />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
};

export default Index;
