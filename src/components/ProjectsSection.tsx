
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Zenith Finance",
    category: "UX/UI Design",
    description: "Complete redesign of a fintech platform focusing on accessibility and user trust.",
    tags: ["Mobile App", "Web Platform", "Design System"]
  },
  {
    id: 2,
    title: "Artisan Coffee Co.",
    category: "Brand Identity",
    description: "Crafting a warm, artisanal brand identity for a specialty coffee roaster.",
    tags: ["Logo Design", "Packaging", "Brand Guidelines"]
  },
  {
    id: 3,
    title: "Mindful",
    category: "Web Design",
    description: "Designing a serene digital experience for a meditation and wellness app.",
    tags: ["Website", "App Design", "Illustration"]
  },
  {
    id: 4,
    title: "Nova Architecture",
    category: "Brand Identity",
    description: "Modern, sophisticated branding for an innovative architecture firm.",
    tags: ["Visual Identity", "Website", "Print Design"]
  },
  {
    id: 5,
    title: "HealthTrack",
    category: "UX/UI Design",
    description: "User-centered design for a healthcare management platform.",
    tags: ["UX Research", "Prototyping", "Testing"]
  },
  {
    id: 6,
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
          
          {/* Category Filter */}
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
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <article 
              key={project.id}
              className="group bg-background rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-elegant-hover hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image Placeholder */}
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-serif italic text-foreground/10">
                    {project.id.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
              
              {/* Project Info */}
              <div className="p-6">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  {project.category}
                </div>
                <h3 className="text-xl font-display font-medium text-foreground mb-3">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
