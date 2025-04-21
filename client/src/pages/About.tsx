import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import TeamSection from "@/components/home/TeamSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import PageTransition from "@/components/PageTransition";

const About = () => {
  // Force scroll to top when this page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <PageTransition>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-neutral-800 mb-6">About GodivaTech</h1>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Empowering businesses with innovative technology solutions since 2010.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">Our Story</h2>
              <p className="text-lg text-neutral-600 mb-6">
                GodivaTech was founded in 2010 by a group of passionate technologists who believed in the power of technology to transform businesses. What began as a small software development shop has grown into a full-service technology partner trusted by companies worldwide.
              </p>
              <p className="text-lg text-neutral-600 mb-6">
                Over the years, we've expanded our services to include cloud solutions, IT consulting, cybersecurity, data analytics, and AI & machine learning, always staying at the forefront of technological innovations.
              </p>
              <p className="text-lg text-neutral-600">
                Today, we're proud to have a team of 50+ technology experts dedicated to helping our clients navigate the ever-changing digital landscape and achieve their business goals.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="GodivaTech office"
                className="rounded-lg shadow-xl w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="GodivaTech team collaboration"
                className="rounded-lg shadow-xl w-full h-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl font-bold text-neutral-800 mb-4">Our Mission & Values</h2>
              <p className="text-lg text-neutral-600 mb-6">
                Our mission is to empower businesses through innovative technology solutions that drive growth, efficiency, and competitive advantage.
              </p>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Client-Centric Approach</h3>
                <p className="text-neutral-600">
                  We put our clients' needs at the center of everything we do, focusing on delivering solutions that address their unique challenges and opportunities.
                </p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Innovation</h3>
                <p className="text-neutral-600">
                  We're constantly exploring new technologies and methodologies to ensure our clients benefit from the latest advancements in the industry.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Excellence</h3>
                <p className="text-neutral-600">
                  We're committed to delivering the highest quality solutions, maintaining rigorous standards in our work, and continuously improving our processes.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      <TeamSection />
      <TestimonialsSection />
      <CTASection />
    </PageTransition>
  );
};

export default About;
