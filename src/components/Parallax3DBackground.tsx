import React, { useEffect, useRef } from "react";

interface Parallax3DBackgroundProps {
  className?: string;
}

const Parallax3DBackground: React.FC<Parallax3DBackgroundProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;
      
      container.style.setProperty('--mouse-x', `${xPercent * 20}px`);
      container.style.setProperty('--mouse-y', `${yPercent * 20}px`);
      container.style.setProperty('--rotate-x', `${yPercent * -5}deg`);
      container.style.setProperty('--rotate-y', `${xPercent * 5}deg`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* 3D Grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(500px) rotateX(60deg) translateY(-50%)',
          transformOrigin: 'center bottom',
        }}
      />

      {/* Floating 3D shapes */}
      <div 
        className="absolute top-1/4 left-1/4 w-32 h-32 border border-foreground/5 rounded-2xl float-3d"
        style={{ 
          transform: `translate3d(var(--mouse-x, 0), var(--mouse-y, 0), 50px) rotateX(var(--rotate-x, 0deg)) rotateY(var(--rotate-y, 0deg))`,
          animationDelay: '0s'
        }}
      />
      
      <div 
        className="absolute top-1/3 right-1/4 w-24 h-24 border border-foreground/5 rounded-full float-3d"
        style={{ 
          transform: `translate3d(calc(var(--mouse-x, 0) * -0.5), calc(var(--mouse-y, 0) * -0.5), 100px)`,
          animationDelay: '2s'
        }}
      />

      <div 
        className="absolute bottom-1/4 left-1/3 w-20 h-20 border border-foreground/5 float-3d"
        style={{ 
          transform: `translate3d(calc(var(--mouse-x, 0) * 0.7), calc(var(--mouse-y, 0) * 0.7), 30px) rotate(45deg)`,
          animationDelay: '4s'
        }}
      />

      {/* Morphing blob */}
      <div 
        className="absolute top-1/2 right-1/3 w-40 h-40 bg-foreground/[0.02] blob-morph"
        style={{ animationDelay: '1s' }}
      />

      {/* Particles */}
      <div className="particle particle-1 top-20 left-20 w-2 h-2 bg-foreground/10" />
      <div className="particle particle-2 top-40 right-32 w-1.5 h-1.5 bg-foreground/15" />
      <div className="particle particle-3 bottom-32 left-1/2 w-1 h-1 bg-foreground/20" />
      <div className="particle particle-1 top-1/2 left-10 w-2.5 h-2.5 bg-foreground/5" style={{ animationDelay: '5s' }} />
      <div className="particle particle-2 bottom-20 right-20 w-1.5 h-1.5 bg-foreground/10" style={{ animationDelay: '3s' }} />

      {/* Glowing orbs */}
      <div 
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full orb-glow"
        style={{ animationDelay: '0s' }}
      />
      <div 
        className="absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full orb-glow"
        style={{ animationDelay: '2s' }}
      />
    </div>
  );
};

export default Parallax3DBackground;
