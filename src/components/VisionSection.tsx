import React from "react";
import AnimatedSection from "./AnimatedSection";

const VisionSection = () => {
  return (
    <section className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden" id="vision">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full border border-background/10 animate-pulse-slow" />
      <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full border border-background/5" />
      
      <div className="section-container relative z-10">
        <div className="max-w-4xl">
          <AnimatedSection>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-background text-foreground tracking-wider uppercase mb-8">
              Our Vision
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <blockquote className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-medium leading-tight">
              "Design is not just what it looks like and feels like. Design is 
              <span className="font-serif italic"> how it works</span>—and more importantly, 
              <span className="font-serif italic"> how it makes people feel</span>."
            </blockquote>
          </AnimatedSection>
          
          <div className="mt-12 pt-8 border-t border-background/20">
            <AnimatedSection delay={400}>
              <p className="text-lg md:text-xl text-background/80 leading-relaxed mb-6">
                We envision a world where every digital interaction is intuitive, 
                beautiful, and meaningful. Where technology enhances human connection 
                rather than replacing it.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={500}>
              <p className="text-background/70 leading-relaxed">
                Our approach combines rigorous research with creative exploration, 
                ensuring that every solution we craft is grounded in real human needs 
                while pushing the boundaries of what's possible.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
