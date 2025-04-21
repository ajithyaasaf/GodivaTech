import React from "react";
import { useQuery } from "@tanstack/react-query";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  image: string;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 relative">
      <div className="text-primary text-5xl absolute -top-4 -left-2">"</div>
      <p className="text-neutral-600 mb-6 relative z-10">
        {testimonial.content}
      </p>
      <div className="flex items-center">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <p className="font-semibold text-neutral-800">{testimonial.name}</p>
          <p className="text-neutral-500">{testimonial.position}, {testimonial.company}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  // Default testimonials in case API doesn't return data
  const defaultTestimonials = [
    {
      id: 1,
      name: "Jennifer Miller",
      position: "Marketing Director",
      company: "Axon Enterprises",
      content: "GodivaTech transformed our digital presence with a new website and custom CRM integration. Their team was professional, responsive, and delivered a solution that exceeded our expectations.",
      image: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      id: 2,
      name: "Robert Thompson",
      position: "CTO",
      company: "HealthFirst",
      content: "Working with GodivaTech on our cloud migration was a game-changer. They made a complex process seamless and helped us achieve significant cost savings while improving performance.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Maria Sanchez",
      position: "Operations Manager",
      company: "Global Logistics",
      content: "The custom software GodivaTech developed for our logistics operations has increased efficiency by 35%. Their ongoing support and continuous improvements have made them a valuable partner.",
      image: "https://randomuser.me/api/portraits/women/28.jpg"
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-neutral-800 mb-4">What Our Clients Say</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with GodivaTech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
