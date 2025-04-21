import React from "react";
import { Link } from "wouter";
import { ChevronRight, Code, Cloud, Users, Shield, BarChart, BrainCircuit } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useAnimateOnScroll, slideInUpVariants } from "@/hooks/use-animation";

const ServiceCard = ({ icon: Icon, title, description, slug }: { 
  icon: React.ElementType, 
  title: string, 
  description: string,
  slug: string
}) => {
  const [ref, controls] = useAnimateOnScroll(0.1);
  
  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={slideInUpVariants}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
    >
      <div className="p-8">
        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
          <Icon className="text-2xl text-primary h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-neutral-800 mb-3">{title}</h3>
        <p className="text-neutral-600 mb-6">
          {description}
        </p>
        <Link 
          href={`/services/${slug}`} 
          className="text-primary font-medium hover:text-primary/90 transition duration-150 flex items-center"
        >
          Learn More <ChevronRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  );
};

interface ServiceType {
  id: number;
  title: string;
  description: string;
  icon?: React.ElementType;
  slug: string;
}

const ServiceSection = () => {
  const { data: services = [] } = useQuery<ServiceType[]>({
    queryKey: ['/api/services'],
  });

  // Use predefined services if API doesn't return data
  const defaultServices: ServiceType[] = [
    {
      id: 1,
      title: "Software Development",
      description: "Custom software solutions tailored to your business needs, from web applications to mobile apps and enterprise systems.",
      icon: Code,
      slug: "software-development"
    },
    {
      id: 2,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure, migration services, and managed cloud solutions to optimize your business operations.",
      icon: Cloud,
      slug: "cloud-solutions"
    },
    {
      id: 3,
      title: "IT Consulting",
      description: "Strategic technology advisory services to help you make informed decisions and maximize your IT investments.",
      icon: Users,
      slug: "it-consulting"
    },
    {
      id: 4,
      title: "Cybersecurity",
      description: "Comprehensive security assessments, implementation, and monitoring to protect your business from evolving threats.",
      icon: Shield,
      slug: "cybersecurity"
    },
    {
      id: 5,
      title: "Data Analytics",
      description: "Turn your data into actionable insights with our advanced analytics, business intelligence, and data visualization solutions.",
      icon: BarChart,
      slug: "data-analytics"
    },
    {
      id: 6,
      title: "AI & Machine Learning",
      description: "Cutting-edge AI solutions that automate processes, predict trends, and enhance decision-making for your business.",
      icon: BrainCircuit,
      slug: "ai-machine-learning"
    }
  ];

  const displayServices: ServiceType[] = services.length > 0 ? services : defaultServices;

  return (
    <section id="services" className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-neutral-800 mb-4"
          >
            Our Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-neutral-600 max-w-2xl mx-auto"
          >
            We offer comprehensive technology solutions to help your business thrive in the digital landscape.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service: ServiceType, index: number) => (
            <ServiceCard 
              key={service.id || index}
              icon={service.icon || Code}
              title={service.title}
              description={service.description}
              slug={service.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
