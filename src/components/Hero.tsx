import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

// Generate stable star positions (created once at module level to prevent re-render flicker)
const stars = [...Array(150)].map((_, i) => ({
  id: i,
  size: Math.random() * 3 + 1.5,
  left: Math.random() * 100,
  top: Math.random() * 80,
  opacity: Math.random() * 0.7 + 0.3,
  delay: Math.random() * 4,
  duration: 2 + Math.random() * 3,
}));

// Space horizon background with planet silhouette and glow
const SpaceHorizonBackground = () => (
  <div className="absolute inset-0 overflow-hidden dark:block hidden">
    {/* Twinkling animation keyframes */}
    <style>{`
      @keyframes twinkle {
        0%, 100% { opacity: var(--star-opacity); }
        50% { opacity: calc(var(--star-opacity) * 0.3); }
      }
    `}</style>
    
    {/* Dark space background */}
    <div className="absolute inset-0 bg-transparent" />
    
    {/* Subtle twinkling stars */}
    <div className="absolute inset-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size + 'px',
            height: star.size + 'px',
            left: star.left + '%',
            top: star.top + '%',
            '--star-opacity': star.opacity,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          } as React.CSSProperties}
        />
      ))}
    </div>
    
  </div>
);

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
  return <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 md:pt-32 bg-background dark:bg-transparent" id="hero">
      {/* Space horizon background for dark mode */}
      <SpaceHorizonBackground />

      
      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center" style={{
        transform: `translateY(${scrollY * -0.2}px)`
      }}>
          
          {/* Main headline with staggered animation and 3D effect */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-medium leading-[0.95] tracking-tighter text-foreground opacity-0 animate-blur-in" style={{
          animationDelay: "0.3s"
        }}>
            <span className="inline-block hover:animate-tilt transition-transform font-sans">Design</span>
            <br />
            <span className="inline-block hover:animate-tilt text-primary">
              That Feels
            </span>
            <br />
            <span className="text-foreground/70 inline-block hover:animate-tilt">Human</span>
          </h1>
          
          {/* Subheadline */}
          <p className="mt-10 text-xl md:text-2xl lg:text-3xl text-foreground/80 max-w-2xl mx-auto leading-relaxed opacity-0 animate-slide-up-fade font-normal tracking-wide" style={{
          animationDelay: "0.5s"
        }}>
            Beautiful design that people love,
            <br />
            businesses trust, and results prove.
          </p>
          
          {/* CTA Buttons with 3D hover */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-slide-up-fade" style={{
          animationDelay: "0.7s"
        }}>
            <a href="#projects" className="button-primary inline-flex items-center justify-center group text-lg tilt-hover">
              See How We Think
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#contact" className="button-secondary inline-flex items-center justify-center text-lg tilt-hover">
              View Case Studies
            </a>
          </div>
          
          {/* Stats row with 3D cards */}
          <div className="mt-12 md:mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto opacity-0 animate-slide-up-fade" style={{
          animationDelay: "0.9s"
        }}>
            <div className="text-center card-3d p-4 rounded-xl hover:bg-secondary/50 transition-colors">
              <div className="text-3xl md:text-4xl font-display font-medium text-foreground">10+</div>
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