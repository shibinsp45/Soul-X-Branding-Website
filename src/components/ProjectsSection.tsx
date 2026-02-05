import React, { useState, useRef } from "react";
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
  size?: "small" | "medium" | "large";
}

const projects: Project[] = [
  {
    id: "fudit",
    title: "Fudit",
    category: "UX/UI Design",
    description: "AI-powered food delivery app that revolutionizes how users discover and order meals.",
    tags: ["Mobile App", "AI/ML", "Food Tech"],
    image: "/projects/fudit-cover.png",
    size: "medium"
  },
  {
    id: "fitness-tracking",
    title: "Fitness Tracking App",
    category: "UX/UI Design",
    description: "Comprehensive fitness tracking application designed to motivate and guide users on their wellness journey.",
    tags: ["Mobile App", "Health Tech", "UX Research"],
    image: "/projects/fitness-cover.png",
    size: "large"
  },
  {
    id: "happy-cart",
    title: "Happy Cart",
    category: "Brand Identity",
    description: "Vibrant and playful branding for an e-commerce shopping platform.",
    tags: ["Logo Design", "Brand Guidelines", "Visual Identity"],
    image: "/projects/happycart-cover.png",
    size: "medium"
  },
  {
    id: "nuren-ai",
    title: "Nuren AI",
    category: "Web Design",
    description: "Modern landing page design for an AI-powered platform showcasing cutting-edge technology.",
    tags: ["Landing Page", "AI/ML", "Web Design"],
    image: "/projects/nuren-cover.png",
    size: "small"
  },
  {
    id: "trillionair",
    title: "Trillionair",
    category: "Web Design",
    description: "Premium landing page design for a luxury fintech platform with bold aesthetics.",
    tags: ["Landing Page", "Fintech", "Premium Design"],
    image: "/projects/trillionair-cover.png",
    size: "large"
  },
  {
    id: "foodit-brand",
    title: "Foodit",
    category: "Brand Identity",
    description: "Complete brand identity system for a modern food delivery service.",
    tags: ["Logo Design", "Brand Guidelines", "Visual Identity"],
    image: "/projects/foodit-cover.png",
    size: "medium"
  },
  {
    id: "beebite",
    title: "BeeBite",
    category: "Brand Identity",
    description: "Playful and vibrant branding for a food delivery mobile app with a friendly bee mascot.",
    tags: ["Logo Design", "Brand Guidelines", "Mobile App"],
    image: "/projects/beebite-cover.png",
    size: "small"
  },
  {
    id: "beat",
    title: "Beat Education",
    category: "Web Design",
    description: "Dynamic landing page for an entrepreneurial training platform.",
    tags: ["Landing Page", "EdTech", "Web Design"],
    image: "/projects/beat-cover.png",
    size: "medium"
  },
  {
    id: "elitepath",
    title: "ElitePath",
    category: "UX/UI Design",
    description: "Student management dashboard that streamlines academic administration.",
    tags: ["Dashboard", "EdTech", "Web App"],
    image: "/projects/elitepath-cover.png",
    size: "large"
  },
  {
    id: "groplan",
    title: "Gro Plan",
    category: "UX/UI Design",
    description: "Smart grocery and meal planning app for managing groceries, meals, and pantry tracking.",
    tags: ["Mobile App", "Food Tech", "UX Case Study"],
    image: "/projects/groplan-cover.png",
    size: "medium"
  }
];

const categories = ["All", "UX/UI Design", "Brand Identity", "Web Design"];

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section 
      ref={sectionRef} 
      className="py-16 md:py-20 bg-background relative overflow-hidden" 
      id="projects"
    >
      <div className="section-container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeading
            chip="Our Work"
            title="Selected"
            titleAccent="Projects"
          />
          
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
                      ? "bg-foreground text-background" 
                      : "bg-secondary text-foreground hover:bg-foreground/10"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {filteredProjects.map((project, index) => {
            // Determine grid span based on size and position for visual variety
            const getGridClasses = () => {
              if (project.size === "large") {
                return "col-span-2 row-span-2";
              }
              if (project.size === "medium") {
                return index % 5 === 0 ? "col-span-2 row-span-1" : "col-span-1 row-span-1";
              }
              return "col-span-1 row-span-1";
            };

            // Apply depth blur effect - center items are focused, outer items blurred
            const getBlurClass = () => {
              const centerIndex = Math.floor(filteredProjects.length / 2);
              const distance = Math.abs(index - centerIndex);
              if (distance === 0) return "";
              if (distance === 1) return "md:blur-[0.5px]";
              if (distance >= 2) return "md:blur-[1px] md:hover:blur-0";
              return "";
            };

            return (
              <AnimatedSection 
                key={project.id} 
                delay={index * 80}
                className={cn(getGridClasses())}
              >
                <Link 
                  to={`/project/${project.id}`} 
                  className={cn(
                    "group relative block w-full h-full rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500",
                    getBlurClass(),
                    "hover:scale-[1.02] hover:z-10 hover:shadow-2xl hover:shadow-foreground/10"
                  )}
                >
                  {/* Project Image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-muted/60">
                    {project.image && (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {project.category}
                    </div>
                    <h3 className="text-lg md:text-xl font-display font-medium text-foreground">
                      {project.title}
                    </h3>
                  </div>
                  
                  {/* Arrow Icon */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;