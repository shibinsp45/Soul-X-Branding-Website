
import React from "react";

const VisionSection = () => {
  return (
    <section className="py-24 md:py-32 bg-foreground text-background" id="vision">
      <div className="section-container">
        <div className="max-w-4xl">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-background text-foreground tracking-wider uppercase mb-8 opacity-0 animate-fade-in">
            Our Vision
          </div>
          
          <blockquote 
            className="text-3xl md:text-4xl lg:text-5xl font-display font-medium leading-tight opacity-0 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            "Design is not just what it looks like and feels like. Design is 
            <span className="font-serif italic"> how it works</span>—and more importantly, 
            <span className="font-serif italic"> how it makes people feel</span>."
          </blockquote>
          
          <div className="mt-12 pt-8 border-t border-background/20">
            <p 
              className="text-lg md:text-xl text-background/80 leading-relaxed mb-6 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              We envision a world where every digital interaction is intuitive, 
              beautiful, and meaningful. Where technology enhances human connection 
              rather than replacing it.
            </p>
            
            <p 
              className="text-background/70 leading-relaxed opacity-0 animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              Our approach combines rigorous research with creative exploration, 
              ensuring that every solution we craft is grounded in real human needs 
              while pushing the boundaries of what's possible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
