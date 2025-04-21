import React from "react";
import { Helmet } from "react-helmet";
import ContactSection from "@/components/home/ContactSection";
import MapSection from "@/components/home/MapSection";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | GodivaTech</title>
        <meta 
          name="description" 
          content="Contact GodivaTech to discuss your technology needs. Our team of experts is ready to help you transform your business with innovative software solutions, IT consulting, and cloud services." 
        />
        <meta name="keywords" content="contact GodivaTech, technology consulting, IT support, software development services" />
      </Helmet>

      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-white/90">
              Have questions or ready to start your project? Contact our team today to discuss how we can help you achieve your business goals.
            </p>
          </div>
        </div>
      </section>

      <ContactSection />
      <MapSection />
    </>
  );
};

export default Contact;
