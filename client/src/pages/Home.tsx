import React from "react";
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

const Home = () => {
  return (
    <>
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
    </>
  );
};

export default Home;
