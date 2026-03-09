import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

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
    description: "Redesigned the entire ordering experience with 35% faster checkout.",
    tags: ["End-to-End UX", "Mobile App"],
    image: "/projects/fudit-cover.png",
  },
  {
    id: "fitness-tracking",
    title: "GetFit",
    category: "UX/UI Design",
    description: "Created a motivating fitness experience from scratch.",
    tags: ["UX Research", "UI Design"],
    image: "/projects/fitness-cover.png",
  },
  {
    id: "happy-cart",
    title: "Happy Cart",
    category: "Brand Identity",
    description: "Built a distinctive brand that stands out in crowded e-commerce.",
    tags: ["Logo", "Brand System"],
    image: "/projects/happycart-cover.png",
  },
  {
    id: "nuren-ai",
    title: "Nuren AI",
    category: "Web Design",
    description: "Designed a landing page that explains complex AI simply.",
    tags: ["Web Design", "Copywriting"],
    image: "/projects/nuren-cover.png",
  },
  {
    id: "trillionair",
    title: "Trillionair",
    category: "Web Design",
    description: "Created a premium fintech presence that builds instant trust.",
    tags: ["Web Design", "Brand Strategy"],
    image: "/projects/trillionair-cover.png",
  },
  {
    id: "foodit-brand",
    title: "Foodit",
    category: "Brand Identity",
    description: "Developed a complete visual identity for launch.",
    tags: ["Brand Identity", "Guidelines"],
    image: "/projects/foodit-cover.png",
  },
  {
    id: "beebite",
    title: "BeeBite",
    category: "Brand Identity",
    description: "Created a memorable character-driven brand.",
    tags: ["Brand Identity", "Mascot Design"],
    image: "/projects/beebite-cover.png",
  },
  {
    id: "beat",
    title: "Beat Education",
    category: "Web Design",
    description: "Designed a high-converting landing page for course sales.",
    tags: ["Web Design", "Conversion"],
    image: "/projects/beat-cover.png",
  },
  {
    id: "elitepath",
    title: "ElitePath",
    category: "UX/UI Design",
    description: "Simplified complex admin workflows into an intuitive dashboard.",
    tags: ["Dashboard UX", "Web App"],
    image: "/projects/elitepath-cover.png",
  },
  {
    id: "groplan",
    title: "Gro Plan",
    category: "UX/UI Design",
    description: "Designed a meal planning app people actually use daily.",
    tags: ["UX Research", "Mobile App"],
    image: "/projects/groplan-cover.png",
  },
];

const VISIBLE_COUNT = 3;

const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, VISIBLE_COUNT);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-background dark:bg-transparent" id="projects">
      <div className="section-container relative z-10">
        {/* Header */}
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground text-center mb-14">
            Discover
          </h2>
        </AnimatedSection>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {displayedProjects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 100}>
              <Link
                to={`/project/${project.id}`}
                className="group block relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden"
              >
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex items-end justify-between">
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
                      {project.category}
                    </p>
                    <h3 className="text-white text-base md:text-lg font-medium leading-tight">
                      {project.title}
                    </h3>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform duration-300 shrink-0" />
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* View All / Show Less */}
        {projects.length > VISIBLE_COUNT && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 rounded-full border border-border text-foreground text-sm font-medium hover:bg-muted transition-colors"
            >
              {showAll ? "Show Less" : `View All Projects (${projects.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;