"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Contact, ExternalLink, Rocket, Terminal } from 'lucide-react';
import Image from 'next/image';

const Templates = () => {
  // Static template data
  const templates = [
    {
      id: "1",
      name: "Modern Portfolio",
      description: "Clean and professional portfolio template perfect for designers and developers.",
      category: "Portfolio",
      image: "/templates.jpg",
      demoUrl: "#",
      createUrl: "#"
    },
    {
      id: "2",
      name: "Business Profile",
      description: "Corporate template ideal for businesses and professional services.",
      category: "Business",
      image: "/templates.jpg",
      demoUrl: "#",
      createUrl: "#"
    },
    {
      id: "3",
      name: "Creative Showcase",
      description: "Vibrant template for artists and creatives to display their work.",
      category: "Creative",
      image: "/templates.jpg",
      demoUrl: "#",
      createUrl: "#"
    },
    {
      id: "4",
      name: "Minimal Resume",
      description: "Elegant resume template that focuses on your content and experience.",
      category: "Resume",
      image: "/templates.jpg",
      demoUrl: "#",
      createUrl: "#"
    },
    {
      id: "5",
      name: "E-commerce Store",
      description: "Perfect template for online stores and product showcases.",
      category: "Business",
      image: "/templates.jpg",
      demoUrl: "#",
      createUrl: "#"
    },
    {
      id: "6",
      name: "Blog Platform",
      description: "Content-focused template for writers and bloggers.",
      category: "Blog",
      image: "/templates.jpg",
      demoUrl: "#",
      createUrl: "#"
    }
  ];

  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const animationRef = useRef(0);
  const positionRef = useRef(0);
  const speedRef = useRef(0.5);
  const gap = 32;

  // Intersection Observer
  useEffect(() => {
    if (!containerRef.current || templates.length === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [templates]);

  // Animation logic
  useEffect(() => {
    if (!isVisible || !trackRef.current || templates.length === 0) {
      cancelAnimationFrame(animationRef.current);
      return;
    }

    const animate = () => {
      if (!trackRef.current) return;
      
      positionRef.current -= speedRef.current;
      
      if (-positionRef.current >= trackRef.current.scrollWidth / 2) {
        positionRef.current = 0;
      }
      
      trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isVisible, templates]);

  const cardWidth = 400 + gap;

  const navigate = (direction) => {
    if (!trackRef.current || templates.length === 0) return;
    
    const newPosition = direction === 'next' 
      ? positionRef.current - cardWidth
      : positionRef.current + cardWidth;
    
    if (-newPosition >= trackRef.current.scrollWidth / 2) {
      positionRef.current = 0;
    } else if (newPosition > 0) {
      positionRef.current = -trackRef.current.scrollWidth / 2 + cardWidth;
    } else {
      positionRef.current = newPosition;
    }
    
    trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
  };

  // Skeleton loader
  const renderSkeleton = () => (
    <div className="flex gap-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="w-[400px] flex-shrink-0">
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 h-full flex flex-col animate-pulse">
            <div className="relative overflow-hidden bg-gray-300 rounded-xl h-48 mb-4" />
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-3 bg-gray-300 rounded w-1/2" />
            </div>
            <div className="flex gap-3 mt-auto">
              <div className="h-10 bg-gray-300 rounded flex-1" />
              <div className="h-10 bg-gray-300 rounded flex-1" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[3%] [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Choose Your  <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/20 after:to-transparent after:skew-x-12 after:animate-pulse">
           Perfect Template
          </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start with professionally designed templates and customize to match your style
          </p>
        </motion.div>

        {/* Templates Carousel */}
        <div 
          ref={containerRef}
          className="relative overflow-hidden py-6"
        >
          {templates.length === 0 ? (
            renderSkeleton()
          ) : (
            <>
              {/* Fade effect on sides */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
              
              <div 
                ref={trackRef}
                className="flex gap-8"
                style={{ width: 'max-content' }}
              >
                {[...templates, ...templates].map((template, index) => (
                  <motion.div 
                    key={`${template.id}-${index}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="w-[400px] flex-shrink-0 relative group"
                  >
                    {/* Card with gradient border */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-2xl blur-sm -z-10" />
                    
                    {/* Template Card */}
                    <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] h-full flex flex-col">
                      {/* Image */}
                      <div className="relative overflow-hidden bg-gray-100">
                        <Image
                          src={template.image}
                          alt={template.name}
                          height={120}
                          width={120}
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <span 
                            className="px-3 py-1 text-xs font-medium text-white rounded-full"
                            style={{ backgroundColor: '#7332a8' }}
                          >
                            {template.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-semibold mb-2 text-foreground">
                          {template.name}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2 flex-grow">
                          {template.description}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-auto">
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={template.demoUrl}
                            className="flex items-center justify-center gap-2 flex-1 px-4 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-200"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Demo
                          </motion.a>
                          
                          <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href={template.createUrl}
                            className="flex items-center justify-center gap-2 flex-1 px-4 py-3 text-white rounded-lg font-medium transition-all duration-200"
                            style={{ backgroundColor: '#7332a8' }}
                          >
                            <Rocket className="w-4 h-4" />
                            Make Yours
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-bold mb-4">Can't find what you're <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/20 after:to-transparent after:skew-x-12 after:animate-pulse ">
            Looking For?
          </span></h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Start from scratch or contact us for custom template solutions tailored to your needs.
            </p>
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border flex items-center gap-3 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-200"
              >
               Premium Templates <Terminal size={15}/>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 flex items-center gap-3 text-white rounded-lg font-medium transition-all duration-200"
                style={{ backgroundColor: '#7332a8' }}
              >
                Contact Us <Contact size={15}/>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Templates;