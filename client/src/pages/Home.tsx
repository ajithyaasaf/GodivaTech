import React, { useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import TrustedBySection from "@/components/home/TrustedBySection";
import ServiceSection from "@/components/home/ServiceSection";
import AboutSection from "@/components/home/AboutSection";
import TeamSection from "@/components/home/TeamSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogSection from "@/components/home/BlogSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import CTASection from "@/components/home/CTASection";
import ContactSection from "@/components/home/ContactSection";
import MapSection from "@/components/home/MapSection";
import PageTransition from "@/components/PageTransition";

const Home = () => {
  // Force smooth scroll to top when this page loads
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <PageTransition>
      <HeroSection />
      <TrustedBySection />
      <ServiceSection />
      <AboutSection />
      <TeamSection />
      <PortfolioSection />
      <TestimonialsSection />
      <BlogSection />
      <NewsletterSection />
      <CTASection />
      <ContactSection />
      <MapSection />
    </PageTransition>
  );
};

export default Home;
