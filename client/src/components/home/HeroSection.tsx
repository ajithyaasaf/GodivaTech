import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary to-secondary py-20 md:py-28">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] opacity-10 bg-cover bg-center"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Innovative Technology Solutions for Your Business
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-lg">
              Transforming ideas into powerful digital solutions that drive growth and efficiency for forward-thinking companies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-neutral-100">
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img 
              src="https://images.unsplash.com/photo-1581092921461-7d54dbd7fb49?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" 
              alt="Technology illustration" 
              className="rounded-lg shadow-2xl animate-float w-full max-w-md" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
