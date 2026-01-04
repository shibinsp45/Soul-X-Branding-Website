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
}

const projects: Project[] = [
  {
    id: "zenith-finance",
    title: "Zenith Finance",
    category: "UX/UI Design",
    description: "Complete redesign of a fintech platform focusing on accessibility and user trust.",
    tags: ["Mobile App", "Web Platform", "Design System"]
  },
  {
    id: "artisan-coffee",
    title: "Artisan Coffee Co.",
    category: "Brand Identity",
    description: "Crafting a warm, artisanal brand identity for a specialty coffee roaster.",
    tags: ["Logo Design", "Packaging", "Brand Guidelines"]
  },
  {
    id: "mindful-app",
    title: "Mindful",
    category: "Web Design",
    description: "Designing a serene digital experience for a meditation and wellness app.",
    tags: ["Website", "App Design", "Illustration"]
  },
  {
    id: "nova-architecture",
    title: "Nova Architecture",
    category: "Brand Identity",
    description: "Modern, sophisticated branding for an innovative architecture firm.",
    tags: ["Visual Identity", "Website", "Print Design"]
  },
  {
    id: "healthtrack",
    title: "HealthTrack",
    category: "UX/UI Design",
    description: "User-centered design for a healthcare management platform.",
    tags: ["UX Research", "Prototyping", "Testing"]
  },
  {
    id: "bloom-botanicals",
    title: "Bloom Botanicals",
    category: "Web Design",
    description: "E-commerce experience that brings the beauty of plants to digital.",
    tags: ["E-commerce", "Photography", "Brand"]
  }
];

const categories = ["All", "UX/UI Design", "Brand Identity", "Web Design"];

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section className="py-24 md:py-32 bg-secondary" id="projects">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <AnimatedSection>
            <div>
              <div className="soulx-chip mb-6">
                Our Work
              </div>
              <h2 className="section-title">
                Selected
                <br />
                <span className="font-serif italic font-normal">Projects</span>
              </h2>
            </div>
          </AnimatedSection>
          
          {/* Category Filter */}
          <AnimatedSection delay={200}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    activeCategory === category
                      ? "bg-foreground text-background"
                      : "bg-background text-foreground hover:bg-foreground/10"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 100} animation="scale">
              <Link 
                to={`/project/${project.id}`}
                className="group block bg-background rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-elegant-hover hover:-translate-y-2"
              >
                {/* Project Image Placeholder */}
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/10 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl font-serif italic text-foreground/10 group-hover:scale-110 transition-transform duration-500">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                  {/* Hover overlay with arrow */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="p-6">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-xl font-display font-medium text-foreground mb-3 group-hover:text-foreground/80 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-secondary text-muted-foreground"
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
      </div>
    </section>
  );
};

export default ProjectsSection;
