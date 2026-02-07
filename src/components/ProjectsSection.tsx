import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image?: string;
  bgGradient: string;
  accentColor: string;
}

const projects: Project[] = [
  {
    id: "fudit",
    title: "Fudit",
    category: "UX/UI Design",
    description: "AI-powered food delivery app that revolutionizes how users discover and order meals.",
    tags: ["Mobile App", "AI/ML", "Food Tech"],
    image: "/projects/fudit-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(200, 60%, 50%) 0%, hsl(180, 50%, 40%) 50%, hsl(220, 40%, 35%) 100%)",
    accentColor: "hsl(200, 60%, 50%)",
  },
  {
    id: "fitness-tracking",
    title: "GetFit",
    category: "UX/UI Design",
    description: "Comprehensive fitness tracking application designed to motivate and guide users on their wellness journey.",
    tags: ["Mobile App", "Health Tech", "UX Research"],
    image: "/projects/fitness-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(340, 70%, 45%) 0%, hsl(320, 60%, 40%) 50%, hsl(280, 50%, 35%) 100%)",
    accentColor: "hsl(280, 50%, 45%)",
  },
  {
    id: "happy-cart",
    title: "Happy Cart",
    category: "Brand Identity",
    description: "Vibrant and playful branding for an e-commerce shopping platform.",
    tags: ["Logo Design", "Brand Guidelines", "Visual Identity"],
    image: "/projects/happycart-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(40, 80%, 55%) 0%, hsl(30, 70%, 50%) 50%, hsl(20, 60%, 45%) 100%)",
    accentColor: "hsl(25, 70%, 50%)",
  },
  {
    id: "nuren-ai",
    title: "Nuren AI",
    category: "Web Design",
    description: "Modern landing page design for an AI-powered platform showcasing cutting-edge technology.",
    tags: ["Landing Page", "AI/ML", "Web Design"],
    image: "/projects/nuren-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(260, 60%, 50%) 0%, hsl(280, 50%, 45%) 50%, hsl(300, 40%, 40%) 100%)",
    accentColor: "hsl(270, 55%, 50%)",
  },
  {
    id: "trillionair",
    title: "Trillionair",
    category: "Web Design",
    description: "Premium landing page design for a luxury fintech platform with bold aesthetics.",
    tags: ["Landing Page", "Fintech", "Premium Design"],
    image: "/projects/trillionair-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(45, 90%, 50%) 0%, hsl(35, 80%, 45%) 50%, hsl(25, 70%, 40%) 100%)",
    accentColor: "hsl(40, 85%, 50%)",
  },
  {
    id: "foodit-brand",
    title: "Foodit",
    category: "Brand Identity",
    description: "Complete brand identity system for a modern food delivery service.",
    tags: ["Logo Design", "Brand Guidelines", "Visual Identity"],
    image: "/projects/foodit-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(10, 80%, 55%) 0%, hsl(0, 70%, 50%) 50%, hsl(350, 60%, 45%) 100%)",
    accentColor: "hsl(5, 75%, 52%)",
  },
  {
    id: "beebite",
    title: "BeeBite",
    category: "Brand Identity",
    description: "Playful and vibrant branding for a food delivery mobile app with a friendly bee mascot.",
    tags: ["Logo Design", "Brand Guidelines", "Mobile App"],
    image: "/projects/beebite-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(50, 90%, 55%) 0%, hsl(40, 80%, 50%) 50%, hsl(30, 70%, 45%) 100%)",
    accentColor: "hsl(45, 85%, 52%)",
  },
  {
    id: "beat",
    title: "Beat Education",
    category: "Web Design",
    description: "Dynamic landing page for an entrepreneurial training platform.",
    tags: ["Landing Page", "EdTech", "Web Design"],
    image: "/projects/beat-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(220, 70%, 50%) 0%, hsl(240, 60%, 45%) 50%, hsl(260, 50%, 40%) 100%)",
    accentColor: "hsl(230, 65%, 50%)",
  },
  {
    id: "elitepath",
    title: "ElitePath",
    category: "UX/UI Design",
    description: "Student management dashboard that streamlines academic administration.",
    tags: ["Dashboard", "EdTech", "Web App"],
    image: "/projects/elitepath-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(160, 50%, 40%) 0%, hsl(180, 45%, 35%) 50%, hsl(200, 40%, 30%) 100%)",
    accentColor: "hsl(170, 48%, 38%)",
  },
  {
    id: "groplan",
    title: "Gro Plan",
    category: "UX/UI Design",
    description: "Smart grocery and meal planning app for managing groceries, meals, and pantry tracking.",
    tags: ["Mobile App", "Food Tech", "UX Case Study"],
    image: "/projects/groplan-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(120, 50%, 45%) 0%, hsl(140, 45%, 40%) 50%, hsl(160, 40%, 35%) 100%)",
    accentColor: "hsl(130, 48%, 42%)",
  },
];

const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Show 2 projects at a time
  const visibleProjects = projects.slice(currentIndex, currentIndex + 2);
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex + 2 < projects.length;

  const goBack = () => {
    if (canGoBack) setCurrentIndex(prev => Math.max(0, prev - 2));
  };

  const goForward = () => {
    if (canGoForward) setCurrentIndex(prev => Math.min(projects.length - 2, prev + 2));
  };

  const selectProject = (index: number) => {
    // Ensure we show 2 projects starting from the selected one
    const newIndex = Math.min(index, projects.length - 2);
    setCurrentIndex(Math.max(0, newIndex));
  };

  return (
    <section 
      className="py-20 md:py-28 relative overflow-hidden transition-colors duration-700"
      style={{ 
        background: `linear-gradient(135deg, hsl(180, 25%, 35%) 0%, hsl(190, 30%, 30%) 100%)`
      }}
      id="projects"
    >
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="text-sm md:text-base text-white/60 tracking-wider mb-4 uppercase">Our Work</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white">
              Selected <span className="font-serif italic text-white/80">Projects</span>
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button 
              onClick={goBack}
              disabled={!canGoBack}
              className={cn(
                "w-12 h-12 rounded-full border border-white/30 flex items-center justify-center transition-all",
                canGoBack ? "hover:bg-white/10 text-white" : "opacity-30 cursor-not-allowed text-white/50"
              )}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={goForward}
              disabled={!canGoForward}
              className={cn(
                "w-12 h-12 rounded-full border border-white/30 flex items-center justify-center transition-all",
                canGoForward ? "hover:bg-white/10 text-white" : "opacity-30 cursor-not-allowed text-white/50"
              )}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Project Tabs - Scrollable */}
        <div className="relative mb-10">
          <div 
            ref={tabsRef}
            className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {projects.map((project, index) => {
              const isActive = index >= currentIndex && index < currentIndex + 2;
              return (
                <button
                  key={project.id}
                  onClick={() => selectProject(index)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-3 rounded-lg whitespace-nowrap transition-all duration-300 font-serif italic text-lg",
                    isActive 
                      ? "text-white" 
                      : "text-white/60 hover:text-white/80"
                  )}
                  style={{
                    background: isActive ? project.accentColor : 'transparent',
                  }}
                >
                  <ArrowUpRight className="w-4 h-4" />
                  {project.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid - 2 at a time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visibleProjects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 150}>
              <Link to={`/project/${project.id}`} className="group block">
                {/* Image Card */}
                <div 
                  className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-4 p-4"
                  style={{ background: project.bgGradient }}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
                
                {/* Description Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-2">
                    {project.category}
                  </p>
                  <p className="text-white/90 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 bg-white/10 rounded-full text-white/70 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: Math.ceil(projects.length / 2) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i * 2)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                currentIndex === i * 2 
                  ? "w-8 bg-white" 
                  : "bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;