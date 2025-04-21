import React, { ReactNode, useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BackToTopButton from "./ui/BackToTopButton";
import ParticleBackground from "./ui/ParticleBackground";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [showParticles, setShowParticles] = useState(false);
  
  // Wait for the page to load before showing particles to improve performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowParticles(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="font-sans text-neutral-700 antialiased bg-neutral-50 relative">
      {/* Subtle particle effect in the background */}
      {showParticles && (
        <ParticleBackground 
          particleCount={30}
          colors={['#3b82f6', '#4f46e5', '#8b5cf6']}
          minOpacity={0.02}
          maxOpacity={0.08}
          className="z-0 fixed"
        />
      )}
      
      <div className="relative z-10">
        <Header />
        <main>{children}</main>
        <Footer />
        <BackToTopButton />
      </div>
    </div>
  );
};

export default Layout;
