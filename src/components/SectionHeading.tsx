import React from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
interface SectionHeadingProps {
  chip?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  className?: string;
  alignment?: "left" | "center";
}
const SectionHeading: React.FC<SectionHeadingProps> = ({
  chip,
  title,
  titleAccent,
  subtitle,
  className,
  alignment = "left"
}) => {
  const {
    ref: chipRef,
    isVisible: chipVisible
  } = useScrollAnimation({
    threshold: 0.1
  });
  const {
    ref: titleRef,
    isVisible: titleVisible
  } = useScrollAnimation({
    threshold: 0.1
  });
  const {
    ref: subtitleRef,
    isVisible: subtitleVisible
  } = useScrollAnimation({
    threshold: 0.1
  });
  return <div className={cn(alignment === "center" && "text-center", className)}>
      {chip && <div ref={chipRef} className={cn("soulx-chip mb-6 micro-interaction transition-all duration-700 ease-out", alignment === "center" && "mx-auto", chipVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
          {chip}
        </div>}
      
      <h2 ref={titleRef} className={cn("text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground tracking-tight transition-all duration-700 ease-out", subtitle ? "mb-6" : "", titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6")} style={{
      transitionDelay: "100ms"
    }}>
        {title}
        {titleAccent && <>
            {" "}
            <span className="font-normal font-sans">{titleAccent}</span>
          </>}
      </h2>
      
      {subtitle && <p ref={subtitleRef} className={cn("section-subtitle mt-0 transition-all duration-700 ease-out", subtitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")} style={{
      transitionDelay: "200ms"
    }}>
          {subtitle}
        </p>}
    </div>;
};
export default SectionHeading;