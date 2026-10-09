import React from "react";
import { Button } from "@/components/ui/button";
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
          className="absolute rounded-full bg-foreground"
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

const Hero = () => (
  <section className="relative overflow-hidden bg-background dark:bg-transparent pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24" id="hero">
    <SpaceHorizonBackground />
    <div className="section-container relative z-10 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-[32px] sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.12] text-foreground animate-blur-in">
          <span className="block">Crafting Design</span>
          <span className="block">That Feels <span className="text-muted-foreground">Human</span></span>
        </h1>
        <p className="mt-6 sm:mt-8 text-base md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Beautiful design that people love, businesses trust, and results prove.
        </p>
        <div className="mt-7 sm:mt-9 flex items-center justify-center gap-2 sm:gap-3">
          <Button asChild variant="pill" className="h-10 px-3 sm:px-5 text-xs sm:text-sm group">
            <a href="#projects">See How We Think <ArrowRight className="transition-transform group-hover:translate-x-1" /></a>
          </Button>
          <Button asChild variant="pill-outline" className="h-10 px-3 sm:px-5 text-xs sm:text-sm">
            <a href="#projects">Case Studies</a>
          </Button>
        </div>
        <div className="mt-10 sm:mt-12 grid grid-cols-3 max-w-sm mx-auto divide-x divide-border">
          {[['10+', 'Projects'], ['2+', 'Years'], ['3+', 'Clients']].map(([value, label]) => (
            <div key={label} className="px-3 py-1">
              <div className="text-2xl md:text-3xl font-medium text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
export default Hero;
