import React from "react";
import { Link } from "wouter";
import { ChevronRightIcon, CodeIcon, CloudIcon, UsersIcon, ShieldIcon, BarChartIcon, BrainCircuitIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const ServiceCard = ({ icon: Icon, title, description, slug }: { 
  icon: React.ElementType, 
  title: string, 
  description: string,
  slug: string
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
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
          Learn More <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

const ServiceSection = () => {
  const { data: services = [] } = useQuery({
    queryKey: ['/api/services'],
  });

  // Use predefined services if API doesn't return data
  const defaultServices = [
    {
      id: 1,
      title: "Software Development",
      description: "Custom software solutions tailored to your business needs, from web applications to mobile apps and enterprise systems.",
      icon: CodeIcon,
      slug: "software-development"
    },
    {
      id: 2,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure, migration services, and managed cloud solutions to optimize your business operations.",
      icon: CloudIcon,
      slug: "cloud-solutions"
    },
    {
      id: 3,
      title: "IT Consulting",
      description: "Strategic technology advisory services to help you make informed decisions and maximize your IT investments.",
      icon: UsersIcon,
      slug: "it-consulting"
    },
    {
      id: 4,
      title: "Cybersecurity",
      description: "Comprehensive security assessments, implementation, and monitoring to protect your business from evolving threats.",
      icon: ShieldIcon,
      slug: "cybersecurity"
    },
    {
      id: 5,
      title: "Data Analytics",
      description: "Turn your data into actionable insights with our advanced analytics, business intelligence, and data visualization solutions.",
      icon: BarChartIcon,
      slug: "data-analytics"
    },
    {
      id: 6,
      title: "AI & Machine Learning",
      description: "Cutting-edge AI solutions that automate processes, predict trends, and enhance decision-making for your business.",
      icon: BrainCircuitIcon,
      slug: "ai-machine-learning"
    }
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <section id="services" className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">Our Services</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            We offer comprehensive technology solutions to help your business thrive in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service, index) => (
            <ServiceCard 
              key={service.id || index}
              icon={service.icon || CodeIcon}
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
