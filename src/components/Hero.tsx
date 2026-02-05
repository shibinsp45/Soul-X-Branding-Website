import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

interface FlowItem {
  id: string;
  name: string;
  image: string;
  bgGradient: string;
}

const flowItems: FlowItem[] = [
  {
    id: "fudit",
    name: "Fudit",
    image: "/projects/fudit-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(200, 60%, 50%) 0%, hsl(180, 50%, 40%) 50%, hsl(220, 40%, 35%) 100%)",
  },
  {
    id: "fitness",
    name: "GetFit",
    image: "/projects/fitness-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(340, 70%, 45%) 0%, hsl(320, 60%, 40%) 50%, hsl(280, 50%, 35%) 100%)",
  },
  {
    id: "nuren",
    name: "Nuren AI",
    image: "/projects/nuren-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(260, 60%, 50%) 0%, hsl(280, 50%, 45%) 50%, hsl(300, 40%, 40%) 100%)",
  },
  {
    id: "elitepath",
    name: "ElitePath",
    image: "/projects/elitepath-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(160, 50%, 40%) 0%, hsl(180, 45%, 35%) 50%, hsl(200, 40%, 30%) 100%)",
  },
  {
    id: "groplan",
    name: "Gro Plan",
    image: "/projects/groplan-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(40, 70%, 50%) 0%, hsl(30, 60%, 45%) 50%, hsl(20, 50%, 40%) 100%)",
  },
];

const Hero = () => {
  const [activeItem, setActiveItem] = useState<FlowItem | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const defaultGradient = "linear-gradient(135deg, hsl(220, 20%, 20%) 0%, hsl(240, 15%, 15%) 50%, hsl(260, 10%, 10%) 100%)";

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative overflow-hidden transition-all duration-700 ease-out"
      id="hero"
      style={{
        background: isHovering && activeItem ? activeItem.bgGradient : defaultGradient,
      }}
    >
      {/* Gradient overlay for smooth blending */}
      <div 
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top tagline */}
        <p className="text-center text-sm md:text-base text-white/70 tracking-wider mb-12 md:mb-16 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          See how we craft digital experiences
        </p>

        {/* Main content area */}
        <div className="relative flex items-center justify-center min-h-[400px] md:min-h-[500px]">
          
          {/* Preview image - positioned left */}
          <div 
            className={`absolute left-0 md:left-[5%] lg:left-[10%] w-[280px] md:w-[350px] lg:w-[400px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ease-out ${
              isHovering && activeItem ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-8 scale-95"
            }`}
          >
            {activeItem && (
              <img 
                src={activeItem.image} 
                alt={activeItem.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Names list - right aligned */}
          <div className="relative ml-auto md:mr-[5%] lg:mr-[10%] flex flex-col items-end gap-0">
            {flowItems.map((item, index) => (
              <button
                key={item.id}
                onMouseEnter={() => {
                  setActiveItem(item);
                  setIsHovering(true);
                }}
                onMouseLeave={() => {
                  setIsHovering(false);
                }}
                className={`
                  text-right text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 
                  font-serif italic font-light tracking-tight
                  transition-all duration-500 ease-out cursor-pointer
                  opacity-0 animate-fade-in
                  ${activeItem?.id === item.id && isHovering
                    ? "text-white scale-105 translate-x-0" 
                    : isHovering 
                      ? "text-white/30 scale-100 translate-x-4"
                      : "text-white/60 hover:text-white"
                  }
                `}
                style={{ 
                  animationDelay: `${0.3 + index * 0.1}s`,
                  lineHeight: "1.1",
                }}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-20 flex justify-center opacity-0 animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <a 
            href="#projects" 
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          >
            <span className="text-lg font-medium">Explore All Projects</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-12 md:mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: "1s" }}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-display font-medium text-white">10+</div>
            <div className="text-sm text-white/60 mt-1">Projects</div>
          </div>
          <div className="text-center border-x border-white/20">
            <div className="text-3xl md:text-4xl font-display font-medium text-white">2+</div>
            <div className="text-sm text-white/60 mt-1">Years</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-display font-medium text-white">3+</div>
            <div className="text-sm text-white/60 mt-1">Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;