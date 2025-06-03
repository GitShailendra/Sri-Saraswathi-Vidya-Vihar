
import Navigation from '../components/Navigation';
import HeroBanner from '../components/HeroBanner';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import AcademicsSection from '../components/AcademicsSection';
import ResultsShowcase from '../components/ResultsShowcase';
import GallerySection from '../components/GallerySection';
import TestimonialSection from '../components/TestimonialSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroBanner />
      <AboutSection />
      <FeaturesSection />
      <AcademicsSection />
      <ResultsShowcase />
      <GallerySection />
      <TestimonialSection />
      <CTASection />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
