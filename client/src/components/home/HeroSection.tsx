import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { typeText, createParticleBackground, createButtonPulse } from "@/lib/animation";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    if (sectionRef.current) {
      createParticleBackground(sectionRef, 40);
    }
    
    if (subtitleRef.current) {
      setTimeout(() => {
        typeText(
          subtitleRef,
          "Transforming ideas into powerful digital solutions that drive growth and efficiency for forward-thinking companies.",
          30,
          800
        );
      }, 500);
    }
    
    if (ctaButtonRef.current) {
      createButtonPulse(ctaButtonRef);
    }
  }, []);
  
  return (
    <section ref={sectionRef} className="relative bg-gradient-to-r from-primary to-secondary py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] opacity-10 bg-cover bg-center"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <motion.h1 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            >
              Empowering Your Future with Innovative Tech
            </motion.h1>
            <p 
              ref={subtitleRef} 
              className="text-xl text-white/90 mb-8 max-w-lg min-h-[4rem]"
              style={{ visibility: 'hidden' }}
            >
              {/* Text will be filled in by typing effect */}
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Button 
                ref={ctaButtonRef}
                asChild 
                size="lg" 
                className="bg-white text-primary hover:bg-neutral-100 hover:scale-105 transition-transform duration-300"
              >
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="bg-transparent border-2 border-white text-white hover:bg-white/10"
              >
                <Link href="/services">Discover Solutions</Link>
              </Button>
            </motion.div>
          </div>
          <motion.div 
            className="w-full md:w-1/2 flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.img 
              src="https://images.unsplash.com/photo-1581092921461-7d54dbd7fb49?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" 
              alt="Technology illustration" 
              className="rounded-lg shadow-2xl w-full max-w-md"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
