import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ServiceSection from "@/components/home/ServiceSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import CTASection from "@/components/home/CTASection";

const Services = () => {
  return (
    <>
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Our Technology Services</h1>
            <p className="text-xl text-white/90 mb-8">
              Comprehensive solutions to help your business thrive in the digital age.
            </p>
            <Button asChild variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10">
              <Link href="/contact">Get a Free Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <ServiceSection />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-neutral-800 mb-6">
                Our Service Approach
              </h2>
              <p className="text-lg text-neutral-600 mb-6">
                At GodivaTech, we follow a systematic approach to deliver solutions that meet your specific business needs:
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold mr-4 shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">Discovery & Analysis</h3>
                    <p className="text-neutral-600">
                      We begin by understanding your business goals, challenges, and requirements through in-depth consultations and analysis.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold mr-4 shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">Strategy & Planning</h3>
                    <p className="text-neutral-600">
                      We develop a comprehensive strategy and project plan tailored to your specific needs and objectives.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold mr-4 shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">Implementation</h3>
                    <p className="text-neutral-600">
                      Our expert team executes the plan using industry best practices and cutting-edge technologies.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold mr-4 shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">Testing & Quality Assurance</h3>
                    <p className="text-neutral-600">
                      We rigorously test all solutions to ensure they meet the highest standards of quality and performance.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-bold mr-4 shrink-0">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">Deployment & Support</h3>
                    <p className="text-neutral-600">
                      We ensure smooth deployment and provide ongoing support and maintenance to keep your systems running optimally.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <img
                src="https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Service approach illustration"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">Industries We Serve</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We provide tailored technology solutions for a diverse range of industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <i className="fas fa-hospital text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Healthcare</h3>
              <p className="text-neutral-600">
                Secure, HIPAA-compliant solutions that streamline operations and enhance patient care.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <i className="fas fa-university text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Finance</h3>
              <p className="text-neutral-600">
                Robust, secure solutions that meet regulatory requirements and drive business growth.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <i className="fas fa-shopping-cart text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Retail & E-commerce</h3>
              <p className="text-neutral-600">
                Scalable platforms that deliver seamless shopping experiences and drive conversions.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <i className="fas fa-industry text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Manufacturing</h3>
              <p className="text-neutral-600">
                IoT and automation solutions that optimize production and reduce operational costs.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <i className="fas fa-graduation-cap text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Education</h3>
              <p className="text-neutral-600">
                Digital learning platforms and administrative systems that enhance educational experiences.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <i className="fas fa-truck text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Logistics & Transportation</h3>
              <p className="text-neutral-600">
                Real-time tracking and management systems that improve efficiency and visibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      <NewsletterSection />
      <CTASection />
    </>
  );
};

export default Services;
