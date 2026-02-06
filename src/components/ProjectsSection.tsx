import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
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
];

const defaultGradient = "linear-gradient(135deg, hsl(220, 15%, 8%) 0%, hsl(240, 10%, 6%) 50%, hsl(260, 8%, 4%) 100%)";

const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  return (
    <section 
      className="py-24 md:py-32 relative overflow-hidden transition-all duration-700 ease-out min-h-screen flex items-center"
      id="projects"
      style={{
        background: isHovering && activeProject ? activeProject.bgGradient : defaultGradient,
      }}
    >
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      <div className="section-container relative z-10 w-full">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <p className="text-sm md:text-base text-white/60 tracking-wider mb-4 uppercase">Our Work</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white">
            Selected <span className="font-serif italic text-white/80">Projects</span>
          </h2>
        </AnimatedSection>

        {/* Centered project titles */}
        <div className="flex flex-col items-center justify-center gap-2 md:gap-3">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="perspective-1000"
              style={{ perspective: "1000px" }}
              onMouseEnter={() => {
                setActiveProject(project);
                setIsHovering(true);
                setFlippedCard(project.id);
              }}
              onMouseLeave={() => {
                setIsHovering(false);
                setFlippedCard(null);
              }}
            >
              <div
                className={cn(
                  "relative transition-transform duration-700 cursor-pointer",
                  flippedCard === project.id ? "[transform:rotateX(180deg)]" : ""
                )}
                style={{ 
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Front - Title */}
                <div 
                  className="backface-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <span
                    className={cn(
                      "block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl",
                      "font-serif italic font-light tracking-tight",
                      "transition-all duration-500 ease-out",
                      activeProject?.id === project.id && isHovering
                        ? "text-white scale-105" 
                        : isHovering 
                          ? "text-white/20"
                          : "text-white/50 hover:text-white/70"
                    )}
                    style={{ 
                      lineHeight: "1.15",
                    }}
                  >
                    {project.title}
                  </span>
                </div>

                {/* Back - Project Link Card */}
                <div 
                  className="absolute inset-0 backface-hidden flex items-center justify-center"
                  style={{ 
                    backfaceVisibility: "hidden",
                    transform: "rotateX(180deg)",
                  }}
                >
                  <Link
                    to={`/project/${project.id}`}
                    className={cn(
                      "flex items-center gap-3 px-6 py-3 md:px-8 md:py-4",
                      "bg-white/10 backdrop-blur-md rounded-full",
                      "border border-white/20",
                      "text-white font-medium text-lg md:text-xl",
                      "hover:bg-white/20 hover:border-white/40",
                      "transition-all duration-300 group"
                    )}
                  >
                    <span>View {project.title}</span>
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Active project info */}
        <div className={cn(
          "mt-16 text-center transition-all duration-500",
          isHovering && activeProject ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          {activeProject && (
            <div className="max-w-xl mx-auto">
              <p className="text-white/60 text-sm uppercase tracking-wider mb-2">{activeProject.category}</p>
              <p className="text-white/80 text-lg">{activeProject.description}</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
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