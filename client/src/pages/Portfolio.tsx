import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CTASection from "@/components/home/CTASection";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link?: string;
}

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  // Default projects in case API doesn't return data
  const defaultProjects = [
    {
      id: 1,
      title: "E-Commerce Platform Redesign",
      description: "Completely redesigned the online shopping experience for a leading retailer, resulting in a 40% increase in conversions.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Software Development",
      technologies: ["React", "Node.js", "AWS"]
    },
    {
      id: 2,
      title: "Healthcare Data Migration",
      description: "Migrated a healthcare provider's legacy systems to a secure cloud infrastructure, improving performance by 60%.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Cloud Solutions",
      technologies: ["Azure", "Kubernetes", "HIPAA"]
    },
    {
      id: 3,
      title: "Predictive Maintenance System",
      description: "Developed an AI-powered system for a manufacturing company that predicts equipment failures before they occur.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "AI & Machine Learning",
      technologies: ["Python", "TensorFlow", "IoT"]
    },
    {
      id: 4,
      title: "Financial Services Mobile App",
      description: "Created a secure mobile banking application with advanced features like biometric authentication and real-time notifications.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Software Development",
      technologies: ["React Native", "Node.js", "MongoDB"]
    },
    {
      id: 5,
      title: "Enterprise Resource Planning System",
      description: "Designed and implemented a custom ERP solution that integrated all departments and streamlined business processes.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Software Development",
      technologies: ["Java", "Spring Boot", "PostgreSQL"]
    },
    {
      id: 6,
      title: "Cybersecurity Infrastructure Upgrade",
      description: "Strengthened a financial institution's security posture with advanced threat detection and prevention systems.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Cybersecurity",
      technologies: ["Palo Alto", "Splunk", "AWS Security"]
    }
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;
  
  // Get unique categories from projects
  const categories = ['All', ...new Set(displayProjects.map(project => project.category))];
  
  // Filter projects by category
  const filteredProjects = activeFilter 
    ? displayProjects.filter(project => project.category === activeFilter) 
    : displayProjects;

  return (
    <>
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Our Project Portfolio</h1>
            <p className="text-xl text-white/90">
              Explore our successful projects and see how we've helped businesses across various industries achieve their goals through innovative technology solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveFilter(category === 'All' ? null : category)}
                className={`py-2 px-6 rounded-full text-sm font-medium transition duration-150 ${
                  (category === 'All' && activeFilter === null) || category === activeFilter
                    ? "bg-primary text-white"
                    : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-neutral-50 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {project.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-neutral-800 mb-2">{project.title}</h3>
                  <p className="text-neutral-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-neutral-200 text-neutral-700 text-xs font-medium px-2.5 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link || "#"}
                    className="text-primary font-medium hover:text-primary/90 transition duration-150 flex items-center"
                  >
                    View Case Study <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">Our Project Methodology</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We follow a proven approach to ensure successful project delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Discovery</h3>
              <p className="text-neutral-600">
                We thoroughly analyze your requirements, goals, and challenges to define the project scope.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Planning</h3>
              <p className="text-neutral-600">
                We create a detailed project plan with timelines, milestones, and resource allocation.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Execution</h3>
              <p className="text-neutral-600">
                Our expert team develops the solution, with regular updates and feedback sessions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-xl font-bold text-primary">4</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Delivery & Support</h3>
              <p className="text-neutral-600">
                We deploy the solution and provide ongoing support to ensure long-term success.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Portfolio;
