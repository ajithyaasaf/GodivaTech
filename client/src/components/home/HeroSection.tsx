import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { typeText, createButtonPulse } from "@/lib/animation";
import ParallaxSection from "@/components/ui/ParallaxSection";
import { useParallax } from "@/hooks/use-parallax";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const [imageRef, imageOffset] = useParallax<HTMLDivElement>(-0.15);
  const [contentRef, contentOffset] = useParallax<HTMLDivElement>(0.1);
  
  // Scroll-based animations using framer-motion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.7]);
  
  useEffect(() => {
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
    <div 
      ref={sectionRef} 
      className="relative h-[100vh] min-h-[700px] overflow-hidden flex items-center"
    >
      {/* Parallax background layer */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"
        style={{ 
          opacity: backgroundOpacity,
          y: backgroundY
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center"
          style={{ 
            opacity: 0.15,
            y: useTransform(scrollYProgress, [0, 1], ["0%", "10%"])
          }}
        />
      </motion.div>
      
      {/* Floating particles effect - independently moving */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              opacity: Math.random() * 0.3 + 0.1,
              y: useTransform(
                scrollYProgress,
                [0, 1],
                [0, Math.random() * 100 * (Math.random() > 0.5 ? 1 : -1)]
              ),
              x: useTransform(
                scrollYProgress,
                [0, 1],
                [0, Math.random() * 50 * (Math.random() > 0.5 ? 1 : -1)]
              ),
            }}
          />
        ))}
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            ref={contentRef}
            className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0"
            style={{
              y: contentOffset.y
            }}
          >
            <motion.h1 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6"
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
          </motion.div>
          
          <motion.div 
            ref={imageRef}
            className="w-full md:w-1/2 flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              y: imageOffset.y
            }}
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img 
                src="https://images.unsplash.com/photo-1581092921461-7d54dbd7fb49?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" 
                alt="Technology illustration" 
                className="rounded-lg shadow-2xl w-full max-w-md relative z-10"
              />
              
              {/* Floating decorative elements around the image */}
              <motion.div 
                className="absolute -top-5 -left-5 w-20 h-20 rounded-lg bg-blue-500 opacity-70"
                style={{
                  y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"]),
                  rotate: useTransform(scrollYProgress, [0, 1], ["0deg", "10deg"]),
                }}
              />
              <motion.div 
                className="absolute -bottom-5 -right-5 w-24 h-24 rounded-full bg-purple-600 opacity-60"
                style={{
                  y: useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]),
                  scale: useTransform(scrollYProgress, [0, 1], [1, 0.9]),
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
