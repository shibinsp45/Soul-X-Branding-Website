import React, { useEffect, useRef, useState } from "react";
import ScrollTriggered3DCard from "./ScrollTriggered3DCard";
import SectionHeading from "./SectionHeading";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
}

const testimonials: TestimonialProps[] = [
  {
    content: "SoulX transformed our digital presence completely. Their attention to detail and deep understanding of user experience resulted in a 40% increase in engagement.",
    author: "Sarah Chen",
    role: "CEO, Zenith Finance"
  },
  {
    content: "Working with SoulX felt like a true partnership. They took the time to understand our brand's essence and translated it beautifully across all touchpoints.",
    author: "Michael Rodriguez",
    role: "Founder, Artisan Coffee Co."
  },
  {
    content: "The team at SoulX brings both creativity and strategic thinking to every project. Our new brand identity perfectly captures who we are and where we're headed.",
    author: "Dr. Amara Patel",
    role: "Director, Nova Architecture"
  }
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-secondary relative overflow-hidden" id="testimonials">
      {/* Parallax decorative elements */}
      <div 
        className="absolute top-0 left-1/4 w-64 h-64 bg-foreground/[0.02] rounded-full blur-3xl" 
        style={{ transform: `translateY(${scrollProgress * 80}px)` }} 
      />
      <div 
        className="absolute bottom-0 right-1/4 w-48 h-48 bg-foreground/[0.02] rounded-full blur-2xl" 
        style={{ transform: `translateY(${scrollProgress * -60}px)` }} 
      />
      
      {/* 3D floating shapes */}
      <div className="absolute top-20 right-20 w-16 h-16 border border-foreground/5 rounded-2xl float-3d" />
      <div className="absolute bottom-32 left-16 w-20 h-20 border border-foreground/5 rounded-full float-3d" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-foreground/[0.01] blob-morph" />

      <div className="section-container relative z-10">
        <div className="mb-16">
          <SectionHeading
            chip="Testimonials"
            title="What our clients"
            titleAccent="say"
            alignment="center"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollTriggered3DCard key={index} delay={index * 150}>
              <div className="bg-background p-8 rounded-2xl h-full flex flex-col glow-effect">
                <blockquote className="text-foreground leading-relaxed mb-8 flex-grow">
                  "{testimonial.content}"
                </blockquote>
                <div className="border-t border-border pt-6">
                  <div className="font-display font-medium text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </ScrollTriggered3DCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
