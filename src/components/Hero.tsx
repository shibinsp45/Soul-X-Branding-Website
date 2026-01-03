
import React from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section 
      className="min-h-[90vh] flex items-center justify-center bg-background relative overflow-hidden py-32"
      id="hero"
    >
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div 
            className="soulx-chip mb-6 opacity-0 animate-fade-in" 
            style={{ animationDelay: "0.1s" }}
          >
            UX Design & Branding Agency
          </div>
          
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-medium leading-[1.1] tracking-tight text-foreground opacity-0 animate-fade-in" 
            style={{ animationDelay: "0.3s" }}
          >
            Crafting Seamless
            <br />
            <span className="font-serif italic font-normal">Experiences</span>
          </h1>
          
          <p 
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in" 
            style={{ animationDelay: "0.5s" }}
          >
            Where creativity shapes the human experience. We design digital products 
            and brand identities that resonate deeply with your audience.
          </p>
          
          <div 
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in" 
            style={{ animationDelay: "0.7s" }}
          >
            <a 
              href="#projects" 
              className="button-primary inline-flex items-center justify-center group"
            >
              View Our Work
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a 
              href="#contact" 
              className="button-secondary inline-flex items-center justify-center"
            >
              Let's Talk
            </a>
          </div>
        </div>
        
        {/* Decorative element */}
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in"
          style={{ animationDelay: "1s" }}
        >
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-foreground/20 to-foreground/40" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
