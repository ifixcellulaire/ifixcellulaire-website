import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import ReviewsSection from "@/components/ReviewsSection";
// import MarketplaceSection from "@/components/MarketplaceSection";
import BookingSection from "@/components/BookingSection";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Navbar />
    <HeroSection />
    <ServicesSection />
    <GallerySection />
    <ReviewsSection />
    {/* <MarketplaceSection /> */}
    <BookingSection />
    <Footer />
  </>
);

export default Index;
