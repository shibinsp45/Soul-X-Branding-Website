import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import AnimatedSection from "./AnimatedSection";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image?: string;
  bgGradient: string;
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
  },
  {
    id: "fitness-tracking",
    title: "GetFit",
    category: "UX/UI Design",
    description: "Comprehensive fitness tracking application designed to motivate and guide users on their wellness journey.",
    tags: ["Mobile App", "Health Tech", "UX Research"],
    image: "/projects/fitness-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(340, 70%, 45%) 0%, hsl(320, 60%, 40%) 50%, hsl(280, 50%, 35%) 100%)",
  },
  {
    id: "happy-cart",
    title: "Happy Cart",
    category: "Brand Identity",
    description: "Vibrant and playful branding for an e-commerce shopping platform.",
    tags: ["Logo Design", "Brand Guidelines", "Visual Identity"],
    image: "/projects/happycart-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(40, 80%, 55%) 0%, hsl(30, 70%, 50%) 50%, hsl(20, 60%, 45%) 100%)",
  },
  {
    id: "nuren-ai",
    title: "Nuren AI",
    category: "Web Design",
    description: "Modern landing page design for an AI-powered platform showcasing cutting-edge technology.",
    tags: ["Landing Page", "AI/ML", "Web Design"],
    image: "/projects/nuren-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(260, 60%, 50%) 0%, hsl(280, 50%, 45%) 50%, hsl(300, 40%, 40%) 100%)",
  },
  {
    id: "trillionair",
    title: "Trillionair",
    category: "Web Design",
    description: "Premium landing page design for a luxury fintech platform with bold aesthetics.",
    tags: ["Landing Page", "Fintech", "Premium Design"],
    image: "/projects/trillionair-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(45, 90%, 50%) 0%, hsl(35, 80%, 45%) 50%, hsl(25, 70%, 40%) 100%)",
  },
  {
    id: "foodit-brand",
    title: "Foodit",
    category: "Brand Identity",
    description: "Complete brand identity system for a modern food delivery service.",
    tags: ["Logo Design", "Brand Guidelines", "Visual Identity"],
    image: "/projects/foodit-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(10, 80%, 55%) 0%, hsl(0, 70%, 50%) 50%, hsl(350, 60%, 45%) 100%)",
  },
  {
    id: "beebite",
    title: "BeeBite",
    category: "Brand Identity",
    description: "Playful and vibrant branding for a food delivery mobile app with a friendly bee mascot.",
    tags: ["Logo Design", "Brand Guidelines", "Mobile App"],
    image: "/projects/beebite-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(50, 90%, 55%) 0%, hsl(40, 80%, 50%) 50%, hsl(30, 70%, 45%) 100%)",
  },
  {
    id: "beat",
    title: "Beat Education",
    category: "Web Design",
    description: "Dynamic landing page for an entrepreneurial training platform.",
    tags: ["Landing Page", "EdTech", "Web Design"],
    image: "/projects/beat-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(220, 70%, 50%) 0%, hsl(240, 60%, 45%) 50%, hsl(260, 50%, 40%) 100%)",
  },
  {
    id: "elitepath",
    title: "ElitePath",
    category: "UX/UI Design",
    description: "Student management dashboard that streamlines academic administration.",
    tags: ["Dashboard", "EdTech", "Web App"],
    image: "/projects/elitepath-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(160, 50%, 40%) 0%, hsl(180, 45%, 35%) 50%, hsl(200, 40%, 30%) 100%)",
  },
  {
    id: "groplan",
    title: "Gro Plan",
    category: "UX/UI Design",
    description: "Smart grocery and meal planning app for managing groceries, meals, and pantry tracking.",
    tags: ["Mobile App", "Food Tech", "UX Case Study"],
    image: "/projects/groplan-cover.png",
    bgGradient: "linear-gradient(135deg, hsl(120, 50%, 45%) 0%, hsl(140, 45%, 40%) 50%, hsl(160, 40%, 35%) 100%)",
  },
];

const categories = ["All", "UX/UI Design", "Brand Identity", "Web Design"];

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const defaultGradient = "linear-gradient(135deg, hsl(220, 15%, 15%) 0%, hsl(240, 10%, 10%) 50%, hsl(260, 8%, 8%) 100%)";

  return (
    <section 
      className="py-20 md:py-28 relative overflow-hidden transition-all duration-700 ease-out min-h-screen"
      id="projects"
      style={{
        background: isHovering && activeProject ? activeProject.bgGradient : defaultGradient,
      }}
    >
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-sm md:text-base text-white/60 tracking-wider mb-4 uppercase">Our Work</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white">
              Selected <span className="font-serif italic text-white/80">Projects</span>
            </h2>
          </div>
          
          {/* Category Filter */}
          <AnimatedSection delay={200}>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button 
                  key={category} 
                  onClick={() => setActiveCategory(category)} 
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    activeCategory === category 
                      ? "bg-white text-black" 
                      : "bg-white/10 text-white hover:bg-white/20"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Main content area */}
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 min-h-[500px] md:min-h-[600px]">
          
          {/* Preview image - left side */}
          <div 
            className={cn(
              "w-full md:w-[45%] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-out",
              isHovering && activeProject 
                ? "opacity-100 translate-x-0 scale-100" 
                : "opacity-30 -translate-x-4 scale-95"
            )}
          >
            {activeProject ? (
              <img 
                src={activeProject.image} 
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-white/5 flex items-center justify-center">
                <p className="text-white/40 text-lg">Hover a project</p>
              </div>
            )}
          </div>

          {/* Names list - right side */}
          <div className="w-full md:w-[50%] flex flex-col items-end gap-1">
            {filteredProjects.map((project, index) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                onMouseEnter={() => {
                  setActiveProject(project);
                  setIsHovering(true);
                }}
                onMouseLeave={() => {
                  setIsHovering(false);
                }}
                className={cn(
                  "group text-right text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
                  "font-serif italic font-light tracking-tight",
                  "transition-all duration-500 ease-out cursor-pointer",
                  "flex items-center gap-4",
                  activeProject?.id === project.id && isHovering
                    ? "text-white scale-105 translate-x-0" 
                    : isHovering 
                      ? "text-white/25 scale-100 translate-x-4"
                      : "text-white/50 hover:text-white"
                )}
                style={{ 
                  lineHeight: "1.2",
                }}
              >
                <span className={cn(
                  "transition-all duration-300",
                  activeProject?.id === project.id && isHovering ? "opacity-100" : "opacity-0"
                )}>
                  <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" />
                </span>
                {project.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Active project info */}
        <div className={cn(
          "mt-12 transition-all duration-500",
          isHovering && activeProject ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          {activeProject && (
            <div className="max-w-xl">
              <p className="text-white/60 text-sm uppercase tracking-wider mb-2">{activeProject.category}</p>
              <p className="text-white/80 text-lg">{activeProject.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {activeProject.tags.map(tag => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;