import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import QuickAccess from "@/components/QuickAccess";
import HowItWorks from "@/components/HowItWorks";
import TrendingTribes from "@/components/TrendingTribes";
import FreshArt from "@/components/FreshArt";
import CreatorCTA from "@/components/CreatorCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <QuickAccess />
        <TrendingTribes />
        <HowItWorks />
        <FreshArt />
        <CreatorCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
