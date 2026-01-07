import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Parallax3DBackground from "./Parallax3DBackground";
const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <section ref={heroRef} className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden pt-24 md:pt-32" id="hero">
      {/* 3D Parallax Background */}
      <Parallax3DBackground />
      
      {/* Animated grid pattern with 3D perspective */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
      backgroundSize: '80px 80px',
      transform: `translateY(${scrollY * 0.1}px)`
    }} />
      
      {/* 3D Floating decorative elements */}
      <div className="absolute top-1/4 left-10 w-16 h-16 border border-foreground/10 rounded-2xl float-3d" style={{
      animationDelay: "0s"
    }} />
      <div className="absolute top-1/3 right-20 w-24 h-24 border border-foreground/5 rounded-full float-3d" style={{
      animationDelay: "2s"
    }} />
      <div className="absolute bottom-1/3 left-1/4 w-12 h-12 border border-foreground/10 rotate-45 float-3d" style={{
      animationDelay: "4s"
    }} />
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-foreground/[0.02] rounded-full blob-morph" />
      
      {/* Large decorative text with parallax */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" style={{
      transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0002})`
    }}>
        <span className="text-[20vw] font-display font-bold text-foreground/[0.02] select-none whitespace-nowrap">
          SOULX
        </span>
      </div>
      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center" style={{
        transform: `translateY(${scrollY * -0.2}px)`
      }}>
          
          {/* Main headline with staggered animation and 3D effect */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-medium leading-[0.95] tracking-tighter text-foreground opacity-0 animate-blur-in" style={{
          animationDelay: "0.3s"
        }}>
            <span className="inline-block hover:animate-tilt transition-transform font-sans">Crafting</span>
            <br />
            <span className="inline-block hover:animate-tilt text-primary">
              Seamless
              
            </span>
            <br />
            <span className="text-muted-foreground inline-block hover:animate-tilt">Experiences</span>
          </h1>
          
          {/* Motto */}
          <p className="mt-8 text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0 animate-slide-up-fade font-light" style={{
          animationDelay: "0.5s"
        }}>Where creativity shapes the  
 human experience<span className="font-serif bold text-foreground font"> 
 human experience</span>
          </p>
          
          {/* CTA Buttons with 3D hover */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-slide-up-fade" style={{
          animationDelay: "0.7s"
        }}>
            <a href="#projects" className="button-primary inline-flex items-center justify-center group text-lg tilt-hover">
              View Our Work
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#contact" className="button-secondary inline-flex items-center justify-center text-lg tilt-hover">
              Let's Create Together
            </a>
          </div>
          
          {/* Stats row with 3D cards */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto opacity-0 animate-slide-up-fade" style={{
          animationDelay: "0.9s"
        }}>
            <div className="text-center card-3d p-4 rounded-xl hover:bg-secondary/50 transition-colors">
              <div className="text-3xl md:text-4xl font-display font-medium text-foreground">5+</div>
              <div className="text-sm text-muted-foreground mt-1">Projects</div>
            </div>
            <div className="text-center border-x border-border card-3d p-4">
              <div className="text-3xl md:text-4xl font-display font-medium text-foreground">2+</div>
              <div className="text-sm text-muted-foreground mt-1">Years</div>
            </div>
            <div className="text-center card-3d p-4 rounded-xl hover:bg-secondary/50 transition-colors">
              <div className="text-3xl md:text-4xl font-display font-medium text-foreground">3+</div>
              <div className="text-sm text-muted-foreground mt-1">Clients</div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in flex flex-col items-center gap-2" style={{
        animationDelay: "1.2s",
        transform: `translateY(${scrollY * 0.5}px)`,
        opacity: Math.max(0, 1 - scrollY * 0.005)
      }}>
          
          
        </div>
      </div>
    </section>;
};
export default Hero;