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

  // Get first 3 projects for the horizontal tabs
  const tabProjects = filteredProjects.slice(0, 3);
  // Get first 2 projects for the large preview cards
  const cardProjects = filteredProjects.slice(0, 2);

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

        {/* Horizontal project tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {tabProjects.map((project) => (
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
                "group flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                "font-serif italic text-2xl md:text-3xl",
                activeProject?.id === project.id && isHovering
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              )}
              style={{
                background: activeProject?.id === project.id && isHovering 
                  ? project.bgGradient.replace('135deg', '90deg')
                  : 'rgba(255,255,255,0.05)',
              }}
            >
              <ArrowUpRight className={cn(
                "w-5 h-5 transition-transform duration-300",
                activeProject?.id === project.id && isHovering ? "rotate-0" : "-rotate-45"
              )} />
              {project.title}
            </Link>
          ))}
        </div>

        {/* Two-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cardProjects.map((project) => (
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
              className="group"
            >
              {/* Image card */}
              <div 
                className={cn(
                  "aspect-[4/3] rounded-2xl overflow-hidden mb-4 transition-all duration-500",
                  "border-2 border-white/10 hover:border-white/30",
                  activeProject?.id === project.id && isHovering
                    ? "scale-[1.02] shadow-2xl"
                    : "scale-100"
                )}
                style={{
                  background: project.bgGradient,
                }}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover rounded-xl m-auto p-4"
                />
              </div>
              
              {/* Description card */}
              <div className="p-4 rounded-xl bg-white/5 backdrop-blur-sm">
                <p className="text-white/50 text-xs uppercase tracking-wider mb-2">
                  {project.category}
                </p>
                <p className="text-white/80 text-sm mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all projects link */}
        <div className="mt-12 text-center">
          <Link 
            to="/projects"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-lg"
          >
            View all projects
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;