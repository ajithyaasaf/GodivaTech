import React, { useRef } from "react";
import { Link } from "wouter";
import { ChevronRight, Code, Cloud, Users, Shield, BarChart, BrainCircuit } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAnimateOnScroll, slideInUpVariants } from "@/hooks/use-animation";
import ParallaxSection from "@/components/ui/ParallaxSection";

// Icon mapping for string-based icons from API
const iconMap: Record<string, React.ElementType> = {
  code: Code,
  cloud: Cloud,
  users: Users,
  shield: Shield,
  "bar-chart": BarChart,
  brain: BrainCircuit,
};

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
          {Icon && <Icon className="text-2xl text-primary h-6 w-6" />}
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
  icon?: React.ElementType | string;
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

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Create different parallax effects for background elements
  const leftCircleY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const rightCircleY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [0, 1, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.2, 1], ["50px", "0px", "0px"]);
  
  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8ee 100%)"
      }}
    >
      {/* Decorative background elements with parallax effect */}
      <motion.div 
        className="absolute top-20 -left-32 w-64 h-64 rounded-full bg-primary/5"
        style={{ y: leftCircleY }}
      />
      <motion.div 
        className="absolute bottom-20 -right-32 w-96 h-96 rounded-full bg-secondary/5"
        style={{ y: rightCircleY }}
      />
      <motion.div 
        className="absolute top-40 right-10 w-20 h-20 rounded-lg rotate-12 bg-primary/5"
        style={{ 
          rotate: useTransform(scrollYProgress, [0, 1], ["12deg", "45deg"]),
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.2])
        }}
      />
      <motion.div 
        className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-secondary/5"
        style={{ 
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
          x: useTransform(scrollYProgress, [0, 1], ["0px", "100px"])
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          style={{ 
            opacity: titleOpacity,
            y: titleY 
          }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4"
            whileInView={{ 
              opacity: [0, 1],
              y: [-20, 0] 
            }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Services
          </motion.h2>
          <motion.p 
            className="text-lg text-neutral-600 max-w-2xl mx-auto"
            whileInView={{ 
              opacity: [0, 1]
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We offer comprehensive technology solutions to help your business thrive in the digital landscape.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service: ServiceType, index: number) => {
            // Handle both string and component icons
            const iconComponent: React.ElementType = typeof service.icon === 'string' 
              ? iconMap[service.icon] || Code
              : service.icon || Code;
              
            return (
              <motion.div
                key={service.id || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 * index,
                  ease: "easeOut"
                }}
              >
                <ServiceCard 
                  icon={iconComponent}
                  title={service.title}
                  description={service.description}
                  slug={service.slug}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
