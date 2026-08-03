import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image?: string;
}

const projects: Project[] = [
  {
    id: "fudit",
    title: "Fudit",
    category: "UX/UI Design",
    description: "Redesigned the entire ordering experience with 35% faster checkout and higher conversion.",
    tags: ["End-to-End UX", "Mobile App"],
    image: "/projects/fudit-cover.png",
  },
  {
    id: "fitness-tracking",
    title: "GetFit",
    category: "UX/UI Design",
    description: "Created a motivating fitness experience from scratch that keeps users coming back.",
    tags: ["UX Research", "UI Design"],
    image: "/projects/fitness-cover.png",
  },
  {
    id: "happy-cart",
    title: "Happy Cart",
    category: "Brand Identity",
    description: "Built a distinctive brand that stands out in crowded e-commerce and builds trust.",
    tags: ["Logo", "Brand System"],
    image: "/projects/happycart-cover.png",
  },
  {
    id: "nuren-ai",
    title: "Nuren AI",
    category: "Web Design",
    description: "Designed a landing page that explains complex AI simply and converts visitors.",
    tags: ["Web Design", "Copywriting"],
    image: "/projects/nuren-cover.png",
  },
  {
    id: "trillionair",
    title: "Trillionair",
    category: "Web Design",
    description: "Created a premium fintech presence that builds instant trust with investors.",
    tags: ["Web Design", "Brand Strategy"],
    image: "/projects/trillionair-cover.png",
  },
  {
    id: "foodit-brand",
    title: "Foodit",
    category: "Brand Identity",
    description: "Developed a complete visual identity for a food startup ready for launch.",
    tags: ["Brand Identity", "Guidelines"],
    image: "/projects/foodit-cover.png",
  },
  {
    id: "beebite",
    title: "BeeBite",
    category: "Brand Identity",
    description: "Created a memorable character-driven brand that resonates with younger audiences.",
    tags: ["Brand Identity", "Mascot Design"],
    image: "/projects/beebite-cover.png",
  },
  {
    id: "beat",
    title: "Beat Education",
    category: "Web Design",
    description: "Designed a high-converting landing page for course sales and lead generation.",
    tags: ["Web Design", "Conversion"],
    image: "/projects/beat-cover.png",
  },
  {
    id: "elitepath",
    title: "ElitePath",
    category: "UX/UI Design",
    description: "Simplified complex admin workflows into an intuitive dashboard used daily.",
    tags: ["Dashboard UX", "Web App"],
    image: "/projects/elitepath-cover.png",
  },
  {
    id: "groplan",
    title: "Gro Plan",
    category: "UX/UI Design",
    description: "Designed a meal planning app people actually use daily to eat healthier.",
    tags: ["UX Research", "Mobile App"],
    image: "/projects/groplan-cover.png",
  },
];

const categories = ["All", "UX/UI Design", "Brand Identity", "Web Design"];

const INITIAL_COUNT = 3;

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Link
      to={`/project/${project.id}`}
      className="group flex flex-col h-full bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-elegant-hover hover:-translate-y-1"
    >
      <div className="relative overflow-hidden aspect-[4/3] shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {project.category}
          </span>
          <ArrowUpRight className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <h3 className="font-sans font-medium text-foreground text-lg leading-tight">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed mt-2 line-clamp-2 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_COUNT);
  const hasMore = filteredProjects.length > INITIAL_COUNT;

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-background dark:bg-transparent" id="projects">
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-12">
          <AnimatedSection>
            <SectionHeading
              chip="Selected Work"
              title="Projects that"
              titleAccent="drive results"
              subtitle="A curated collection of product, brand, and web experiences built for real businesses."
              alignment="left"
            />
          </AnimatedSection>
        </div>

        {/* Category Filter */}
        <AnimatedSection delay={100}>
          <div className="flex gap-2 mb-8 md:mb-10 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setShowAll(false);
                }}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 border",
                  activeCategory === category
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {displayedProjects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 100}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>

        {/* Empty State */}
        {displayedProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No projects found in this category yet.</p>
          </div>
        )}

        {/* View All / Show Less */}
        {hasMore && (
          <AnimatedSection delay={200}>
            <div className="flex justify-center mt-10 md:mt-14">
              <button
                onClick={() => setShowAll(!showAll)}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:border-foreground/40 hover:bg-foreground hover:text-background transition-all duration-300"
              >
                {showAll ? "Show Less" : "View All Projects"}
                <ArrowRight className={cn("w-4 h-4 transition-transform duration-300", showAll && "rotate-180")} />
              </button>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
