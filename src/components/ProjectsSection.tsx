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
}
const projects: Project[] = [{
  id: "zenith-finance",
  title: "Zenith Finance",
  category: "UX/UI Design",
  description: "Complete redesign of a fintech platform focusing on accessibility and user trust.",
  tags: ["Mobile App", "Web Platform", "Design System"]
}, {
  id: "artisan-coffee",
  title: "Artisan Coffee Co.",
  category: "Brand Identity",
  description: "Crafting a warm, artisanal brand identity for a specialty coffee roaster.",
  tags: ["Logo Design", "Packaging", "Brand Guidelines"]
}, {
  id: "mindful-app",
  title: "Mindful",
  category: "Web Design",
  description: "Designing a serene digital experience for a meditation and wellness app.",
  tags: ["Website", "App Design", "Illustration"]
}, {
  id: "nova-architecture",
  title: "Nova Architecture",
  category: "Brand Identity",
  description: "Modern, sophisticated branding for an innovative architecture firm.",
  tags: ["Visual Identity", "Website", "Print Design"]
}, {
  id: "healthtrack",
  title: "HealthTrack",
  category: "UX/UI Design",
  description: "User-centered design for a healthcare management platform.",
  tags: ["UX Research", "Prototyping", "Testing"]
}, {
  id: "bloom-botanicals",
  title: "Bloom Botanicals",
  category: "Web Design",
  description: "E-commerce experience that brings the beauty of plants to digital.",
  tags: ["E-commerce", "Photography", "Brand"]
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
      {/* Parallax decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-foreground/[0.02] rounded-full blur-3xl" style={{
      transform: `translateY(${scrollProgress * 100}px)`
    }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-foreground/[0.02] rounded-full blur-2xl" style={{
      transform: `translateY(${scrollProgress * -50}px)`
    }} />
      
      {/* 3D floating shapes */}
      <div className="absolute top-32 left-10 w-20 h-20 border border-foreground/5 rounded-2xl float-3d" style={{
      animationDelay: '0s'
    }} />
      <div className="absolute top-1/2 right-20 w-16 h-16 border border-foreground/5 rounded-full float-3d" style={{
      animationDelay: '2s'
    }} />
      <div className="absolute bottom-32 left-1/3 w-24 h-24 bg-foreground/[0.01] blob-morph" />

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => <ScrollTriggered3DCard key={project.id} delay={index * 100}>
              <Link to={`/project/${project.id}`} className="group block bg-background rounded-2xl overflow-hidden transition-all duration-500 h-full glow-effect">
                {/* Project Image Placeholder with parallax */}
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/10 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center" style={{
                transform: `scale(${1 + scrollProgress * 0.1})`
              }}>
                    <span className="text-7xl font-serif italic text-foreground/10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                  {/* Hover overlay with 3D arrow */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300 flex items-center justify-center">
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