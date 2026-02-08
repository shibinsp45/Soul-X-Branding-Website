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
    content: "We came to SoulX with a confusing product and left with a brand our users actually understand. Our conversion rate jumped 47% in the first month after launch. They didn't just make things pretty—they made our business work better.",
    author: "Sarah Chen",
    role: "CEO, Zenith Finance"
  },
  {
    content: "Most agencies give you a logo and disappear. SoulX gave us a complete identity we could actually use—and walked us through exactly how to apply it. Six months later, customers still tell us our packaging is what made them try us.",
    author: "Michael Rodriguez",
    role: "Founder, Artisan Coffee Co."
  },
  {
    content: "I was skeptical about hiring a small studio, but that's exactly what made SoulX great. No junior designers learning on our dime. Every meeting was with the people actually doing the work. Our new website cut our sales cycle in half.",
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
    <section ref={sectionRef} className="py-16 md:py-20 bg-secondary relative overflow-hidden" id="testimonials">
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
