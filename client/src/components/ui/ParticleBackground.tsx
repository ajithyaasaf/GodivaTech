import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Particle {
  element: HTMLDivElement;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  opacity: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
  minOpacity?: number;
  maxOpacity?: number;
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleCount = 50,
  colors = ['#ffffff', '#f0f0f0', '#e0e0e0', '#d0d0d0'],
  minSize = 2,
  maxSize = 6,
  minSpeed = 0.1,
  maxSpeed = 0.3,
  minOpacity = 0.05,
  maxOpacity = 0.2,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const isInitialized = useRef(false);

  // Initialize particles
  useEffect(() => {
    if (isInitialized.current || !containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      // Create particle element
      const element = document.createElement('div');
      element.classList.add('particle');
      element.style.position = 'absolute';
      element.style.borderRadius = '50%';
      element.style.pointerEvents = 'none';
      
      // Randomize particle properties
      const size = Math.random() * (maxSize - minSize) + minSize;
      const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.backgroundColor = color;
      element.style.opacity = opacity.toString();
      
      const x = Math.random() * containerWidth;
      const y = Math.random() * containerHeight;
      
      element.style.transform = `translate(${x}px, ${y}px)`;
      
      container.appendChild(element);
      
      // Create particle object
      particles.current.push({
        element,
        x,
        y,
        speedX: (Math.random() * (maxSpeed - minSpeed) + minSpeed) * (Math.random() > 0.5 ? 1 : -1),
        speedY: (Math.random() * (maxSpeed - minSpeed) + minSpeed) * (Math.random() > 0.5 ? 1 : -1),
        size,
        opacity,
      });
    }
    
    isInitialized.current = true;
  }, [colors, maxOpacity, maxSize, maxSpeed, minOpacity, minSize, minSpeed, particleCount]);

  // Animate particles
  useEffect(() => {
    if (!containerRef.current || particles.current.length === 0) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    const animate = () => {
      particles.current.forEach(particle => {
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off walls
        if (particle.x <= 0 || particle.x >= containerWidth) {
          particle.speedX *= -1;
        }
        
        if (particle.y <= 0 || particle.y >= containerHeight) {
          particle.speedY *= -1;
        }
        
        // Update element position
        gsap.set(particle.element, {
          x: particle.x,
          y: particle.y,
        });
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Cleanup particles on unmount
  useEffect(() => {
    return () => {
      if (containerRef.current) {
        const container = containerRef.current;
        particles.current.forEach(particle => {
          container.removeChild(particle.element);
        });
        particles.current = [];
      }
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      isInitialized.current = false;
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`particle-container absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    />
  );
};

export default ParticleBackground;