import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ScrollTriggered3DCard from "./ScrollTriggered3DCard";
import SectionHeading from "./SectionHeading";
import AnimatedSection from "./AnimatedSection";
interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image?: string;
}
const projects: Project[] = [{
  id: "fudit",
  title: "Fudit",
  category: "UX/UI Design",
  description: "AI-powered food delivery app that revolutionizes how users discover and order meals.",
  tags: ["Mobile App", "AI/ML", "Food Tech"],
  image: "/projects/fudit-cover.png"
}, {
  id: "fitness-tracking",
  title: "Fitness Tracking App",
  category: "UX/UI Design",
  description: "Comprehensive fitness tracking application designed to motivate and guide users on their wellness journey.",
  tags: ["Mobile App", "Health Tech", "UX Research"],
  image: "/projects/fitness-cover.png"
}, {
  id: "happy-cart",
  title: "Happy Cart",
  category: "Brand Identity",
  description: "Vibrant and playful branding for an e-commerce shopping platform.",
  tags: ["Logo Design", "Brand Guidelines", "Visual Identity"],
  image: "/projects/happycart-cover.png"
}, {
  id: "nuren-ai",
  title: "Nuren AI",
  category: "Web Design",
  description: "Modern landing page design for an AI-powered platform showcasing cutting-edge technology.",
  tags: ["Landing Page", "AI/ML", "Web Design"],
  image: "/projects/nuren-cover.png"
}, {
  id: "trillionair",
  title: "Trillionair",
  category: "Web Design",
  description: "Premium landing page design for a luxury fintech platform with bold aesthetics.",
  tags: ["Landing Page", "Fintech", "Premium Design"],
  image: "/projects/trillionair-cover.png"
}, {
  id: "foodit-brand",
  title: "Foodit",
  category: "Brand Identity",
  description: "Complete brand identity system for a modern food delivery service.",
  tags: ["Logo Design", "Brand Guidelines", "Visual Identity"],
  image: "/projects/foodit-cover.png"
}, {
  id: "beebite",
  title: "BeeBite",
  category: "Brand Identity",
  description: "Playful and vibrant branding for a food delivery mobile app with a friendly bee mascot.",
  tags: ["Logo Design", "Brand Guidelines", "Mobile App"],
  image: "/projects/beebite-cover.png"
}, {
  id: "beat",
  title: "Beat Education",
  category: "Web Design",
  description: "Dynamic landing page for an entrepreneurial training platform that transforms students into startup founders through hands-on venture building.",
  tags: ["Landing Page", "EdTech", "Web Design"],
  image: "/projects/beat-cover.png"
}, {
  id: "elitepath",
  title: "ElitePath",
  category: "UX/UI Design",
  description: "Student management dashboard that streamlines academic administration and enhances learning experiences.",
  tags: ["Dashboard", "EdTech", "Web App"],
  image: "/projects/elitepath-cover.png"
}];
const categories = ["All", "UX/UI Design", "Brand Identity", "Web Design"];
const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const filteredProjects = activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory);
  return <section ref={sectionRef} className="py-16 md:py-20 bg-secondary relative overflow-hidden" id="projects">
      
      <div className="section-container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeading
            chip="Our Work"
            title="Selected"
            titleAccent="Projects"
          />
          
          {/* Category Filter with 3D effect */}
          <AnimatedSection delay={200}>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => <button key={category} onClick={() => setActiveCategory(category)} className={cn("px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 tilt-hover", activeCategory === category ? "bg-foreground text-background" : "bg-background text-foreground hover:bg-foreground/10")}>
                  {category}
                </button>)}
            </div>
          </AnimatedSection>
        </div>
        
        {/* Projects Grid with 3D cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2 sm:px-0">
          {filteredProjects.map((project, index) => <ScrollTriggered3DCard key={project.id} delay={index * 100}>
              <Link to={`/project/${project.id}`} className="group block bg-card rounded-2xl overflow-hidden transition-all duration-500 h-full glow-effect max-w-sm mx-auto md:max-w-none border border-border/50">
                {/* Project Image */}
                <div className="aspect-[4/3] relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-muted/80 via-muted to-muted/60">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/10 transition-colors duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-7xl font-serif italic text-foreground/10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    </>
                  )}
                  {/* Hover overlay with arrow */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 rotate-0 group-hover:rotate-45 transition-all duration-500">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="p-6">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 group-hover:tracking-widest transition-all duration-300">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-display font-medium text-foreground mb-3 group-hover:translate-x-1 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => <span key={tag} className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground micro-interaction" style={{
                  transitionDelay: `${tagIndex * 50}ms`
                }}>
                        {tag}
                      </span>)}
                  </div>
                </div>
              </Link>
            </ScrollTriggered3DCard>)}
        </div>
      </div>
    </section>;
};
export default ProjectsSection;