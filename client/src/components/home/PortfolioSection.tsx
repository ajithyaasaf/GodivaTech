import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ChevronRightIcon } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link?: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="bg-neutral-50 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
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
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-neutral-200 text-neutral-700 text-xs font-medium px-2.5 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        <Link
          href={project.link || "/portfolio"}
          className="text-primary font-medium hover:text-primary/90 transition duration-150 flex items-center"
        >
          View Case Study <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

const PortfolioSection = () => {
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
    }
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">Featured Projects</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Explore some of our recent work and see how we've helped our clients achieve their goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            className="bg-white border border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Link href="/portfolio">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
