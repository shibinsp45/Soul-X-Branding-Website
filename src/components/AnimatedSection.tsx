import React from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-left" | "fade-right" | "scale" | "none";
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  animation = "fade-up",
  delay = 0,
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const animationClasses = {
    "fade-up": isVisible 
      ? "opacity-100 translate-y-0" 
      : "opacity-0 translate-y-8",
    "fade-left": isVisible 
      ? "opacity-100 translate-x-0" 
      : "opacity-0 -translate-x-8",
    "fade-right": isVisible 
      ? "opacity-100 translate-x-0" 
      : "opacity-0 translate-x-8",
    "scale": isVisible 
      ? "opacity-100 scale-100" 
      : "opacity-0 scale-95",
    "none": "",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        animationClasses[animation],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
