import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import About from "../components/About";

function Hero() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <HeroSection />
      <Features />
      <About />
    </div>
  );
}

export default Hero;