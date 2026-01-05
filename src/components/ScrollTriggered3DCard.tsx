import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollTriggered3DCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const ScrollTriggered3DCard: React.FC<ScrollTriggered3DCardProps> = ({
  children,
  className,
  delay = 0
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(card);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [delay]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0.5, y: 0.5 });
  };

  const rotateX = isHovered ? (mousePosition.y - 0.5) * -20 : 0;
  const rotateY = isHovered ? (mousePosition.x - 0.5) * 20 : 0;

  return (
    <div
      ref={cardRef}
      className={cn(
        "transition-all duration-500 cursor-pointer",
        isVisible ? "opacity-100" : "opacity-0 translate-y-8",
        className
      )}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isVisible ? 'translateY(0)' : 'translateY(30px)'}`,
        transformStyle: 'preserve-3d',
        transitionDelay: `${delay}ms`
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="relative h-full"
        style={{ transform: 'translateZ(20px)' }}
      >
        {children}
      </div>
      
      {/* Subtle shadow that moves with perspective */}
      <div 
        className="absolute inset-0 rounded-2xl bg-foreground/5 -z-10 blur-xl transition-all duration-300"
        style={{
          transform: `translateX(${(mousePosition.x - 0.5) * 10}px) translateY(${(mousePosition.y - 0.5) * 10}px) translateZ(-50px)`,
          opacity: isHovered ? 1 : 0.5
        }}
      />
    </div>
  );
};

export default ScrollTriggered3DCard;
