import React from "react";
import { ArrowRight, ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section 
      className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden"
      id="hero"
    >
      {/* Animated grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />
      
      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 rounded-full bg-foreground/20 animate-float" />
      <div className="absolute top-1/3 right-20 w-3 h-3 rounded-full bg-foreground/10 animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 rounded-full bg-foreground/15 animate-float" style={{ animationDelay: "2s" }} />
      
      {/* Large decorative text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[20vw] font-display font-bold text-foreground/[0.02] select-none whitespace-nowrap">
          SOULX
        </span>
      </div>
      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Animated chip */}
          <div 
            className="soulx-chip mb-8 opacity-0 animate-fade-in" 
            style={{ animationDelay: "0.1s" }}
          >
            <span className="inline-block animate-pulse-slow">●</span>
            <span className="ml-2">UX Design & Branding Agency</span>
          </div>
          
          {/* Main headline with staggered animation */}
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-medium leading-[0.95] tracking-tighter text-foreground opacity-0 animate-fade-in" 
            style={{ animationDelay: "0.3s" }}
          >
            Crafting
            <br />
            <span className="font-serif italic font-normal relative">
              Seamless
              <svg 
                className="absolute -bottom-2 left-0 w-full h-4 text-foreground/20"
                viewBox="0 0 200 20" 
                preserveAspectRatio="none"
              >
                <path 
                  d="M0 10 Q50 0 100 10 T200 10" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none"
                  className="animate-draw-line"
                  style={{ strokeDasharray: 300, strokeDashoffset: 300, animation: "drawPath 1s ease-out 1s forwards" }}
                />
              </svg>
            </span>
            <br />
            <span className="text-muted-foreground">Experiences</span>
          </h1>
          
          {/* Motto */}
          <p 
            className="mt-8 text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in font-light" 
            style={{ animationDelay: "0.5s" }}
          >
            Where creativity shapes the
            <span className="font-serif italic text-foreground"> human experience</span>
          </p>
          
          {/* CTA Buttons */}
          <div 
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in" 
            style={{ animationDelay: "0.7s" }}
          >
            <a 
              href="#projects" 
              className="button-primary inline-flex items-center justify-center group text-lg"
            >
              View Our Work
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a 
              href="#contact" 
              className="button-secondary inline-flex items-center justify-center text-lg"
            >
              Let's Create Together
            </a>
          </div>
          
          {/* Stats row */}
          <div 
            className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto opacity-0 animate-fade-in"
            style={{ animationDelay: "0.9s" }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-medium text-foreground">50+</div>
              <div className="text-sm text-muted-foreground mt-1">Projects</div>
            </div>
            <div className="text-center border-x border-border">
              <div className="text-3xl md:text-4xl font-display font-medium text-foreground">8+</div>
              <div className="text-sm text-muted-foreground mt-1">Years</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-display font-medium text-foreground">30+</div>
              <div className="text-sm text-muted-foreground mt-1">Clients</div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in flex flex-col items-center gap-2"
          style={{ animationDelay: "1.2s" }}
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4 text-muted-foreground animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
