import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image?: string;
  bgGradient: string;
}
const projects: Project[] = [{
  id: "fudit",
  title: "Fudit",
  category: "UX/UI Design",
  description: "Redesigned the entire ordering experience. Result: 35% faster checkout flow and 28% increase in repeat orders.",
  tags: ["End-to-End UX", "Mobile App"],
  image: "/projects/fudit-cover.png",
  bgGradient: "linear-gradient(135deg, hsl(200, 60%, 50%) 0%, hsl(180, 50%, 40%) 50%, hsl(220, 40%, 35%) 100%)"
}, {
  id: "fitness-tracking",
  title: "GetFit",
  category: "UX/UI Design",
  description: "Created a motivating fitness experience from scratch. Result: 4.8 star rating and 60% user retention at 30 days.",
  tags: ["UX Research", "UI Design"],
  image: "/projects/fitness-cover.png",
  bgGradient: "linear-gradient(135deg, hsl(340, 70%, 45%) 0%, hsl(320, 60%, 40%) 50%, hsl(280, 50%, 35%) 100%)"
}, {
  id: "happy-cart",
  title: "Happy Cart",
  category: "Brand Identity",
  description: "Built a distinctive brand that stands out in crowded e-commerce. Result: 45% increase in brand recall.",
  tags: ["Logo", "Brand System"],
  image: "/projects/happycart-cover.png",
  bgGradient: "linear-gradient(135deg, hsl(40, 80%, 55%) 0%, hsl(30, 70%, 50%) 50%, hsl(20, 60%, 45%) 100%)"
}, {
  id: "nuren-ai",
  title: "Nuren AI",
  category: "Web Design",
  description: "Designed a landing page that explains complex AI simply. Result: 3x increase in demo requests.",
  tags: ["Web Design", "Copywriting"],
  image: "/projects/nuren-cover.png",
  bgGradient: "linear-gradient(135deg, hsl(260, 60%, 50%) 0%, hsl(280, 50%, 45%) 50%, hsl(300, 40%, 40%) 100%)"
}, {
  id: "trillionair",
  title: "Trillionair",
  category: "Web Design",
  description: "Created a premium fintech presence that builds instant trust. Result: 52% lift in qualified leads.",
  tags: ["Web Design", "Brand Strategy"],
  image: "/projects/trillionair-cover.png",
  bgGradient: "linear-gradient(135deg, hsl(45, 90%, 50%) 0%, hsl(35, 80%, 45%) 50%, hsl(25, 70%, 40%) 100%)"
}, {
  id: "foodit-brand",
  title: "Foodit",
  category: "Brand Identity",
  description: "Developed a complete visual identity for launch. Result: Secured seed funding within 3 months.",
  tags: ["Brand Identity", "Guidelines"],
  image: "/projects/foodit-cover.png",
  bgGradient: "linear-gradient(135deg, hsl(10, 80%, 55%) 0%, hsl(0, 70%, 50%) 50%, hsl(350, 60%, 45%) 100%)"
}, {
  id: "beebite",
  title: "BeeBite",
  category: "Brand Identity",
  description: "Created a memorable character-driven brand. Result: 89% positive brand sentiment in user testing.",
  tags: ["Brand Identity", "Mascot Design"],
  image: "/projects/beebite-cover.png",
  bgGradient: "linear-gradient(135deg, hsl(50, 90%, 55%) 0%, hsl(40, 80%, 50%) 50%, hsl(30, 70%, 45%) 100%)"
}, {
  id: "beat",
  title: "Beat Education",
  category: "Web Design",
  description: "Designed a high-converting landing page for course sales. Result: 67% increase in enrollment.",
  tags: ["Web Design", "Conversion"],
  image: "/projects/beat-cover.png",
  bgGradient: "linear-gradient(135deg, hsl(220, 70%, 50%) 0%, hsl(240, 60%, 45%) 50%, hsl(260, 50%, 40%) 100%)"
}, {
  id: "elitepath",
  title: "ElitePath",
  category: "UX/UI Design",
  description: "Simplified complex admin workflows into an intuitive dashboard. Result: 40% reduction in support tickets.",
  tags: ["Dashboard UX", "Web App"],
  image: "/projects/elitepath-cover.png",
  bgGradient: "linear-gradient(135deg, hsl(160, 50%, 40%) 0%, hsl(180, 45%, 35%) 50%, hsl(200, 40%, 30%) 100%)"
}, {
  id: "groplan",
  title: "Gro Plan",
  category: "UX/UI Design",
  description: "Designed a meal planning app people actually use daily. Result: Featured in App Store's Food & Drink.",
  tags: ["UX Research", "Mobile App"],
  image: "/projects/groplan-cover.png",
  bgGradient: "linear-gradient(135deg, hsl(120, 50%, 45%) 0%, hsl(140, 45%, 40%) 50%, hsl(160, 40%, 35%) 100%)"
}];
const categories = ["All", "UX/UI Design", "Brand Identity", "Web Design"];
const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const filteredProjects = activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory);
  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);
  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();
  return <section className="py-20 md:py-28 relative overflow-hidden bg-background" id="projects">
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-sm md:text-base text-muted-foreground tracking-wider mb-4 uppercase">Our Work</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground">
              Selected <span className="font-serif italic text-foreground/80">Projects</span>
            </h2>
          </div>
          
          {/* Category Filter */}
          <AnimatedSection delay={200}>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => <button key={category} onClick={() => setActiveCategory(category)} className={cn("px-4 py-2 rounded-full text-sm font-medium transition-all duration-300", activeCategory === category ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80")}>
                  {category}
                </button>)}
            </div>
          </AnimatedSection>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel setApi={setApi} opts={{
          align: "start",
          loop: true
        }} className="w-full">
            <CarouselContent className="-ml-4 md:-ml-6">
              {filteredProjects.map(project => <CarouselItem key={project.id} className="pl-4 md:pl-6 basis-full sm:basis-1/2 lg:basis-1/3">
                  <Link to={`/project/${project.id}`} className="group block">
                    {/* Project Title at Top */}
                    <div className="mb-4">
                      <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider mb-1">
                        {project.category}
                      </p>
                      <h3 className="text-xl md:text-2xl italic text-foreground text-center font-mono">
                        {project.title}
                      </h3>
                    </div>

                    {/* Flip Card Container */}
                    <div className="perspective-1000">
                      <div className="relative aspect-[4/5] transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                        {/* Front Side - Image */}
                        <div className="absolute inset-0 rounded-3xl overflow-hidden [backface-visibility:hidden]">
                          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                        
                        {/* Back Side - View Project */}
                        <div className="absolute inset-0 rounded-3xl overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center p-6 text-center" style={{
                      background: project.bgGradient
                    }}>
                          <div className="flex items-center gap-2 text-white font-medium text-lg">
                            <span>View Project</span>
                            <ArrowUpRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Caption at Bottom */}
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 2).map(tag => <span key={tag} className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                            {tag}
                          </span>)}
                      </div>
                    </div>
                  </Link>
                </CarouselItem>)}
            </CarouselContent>
          </Carousel>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button onClick={scrollPrev} className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors" aria-label="Previous slide">
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots indicator */}
            <div className="flex items-center gap-2">
              {filteredProjects.map((_, index) => <button key={index} onClick={() => api?.scrollTo(index)} className={cn("w-2 h-2 rounded-full transition-all duration-300", current === index ? "bg-foreground w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50")} aria-label={`Go to slide ${index + 1}`} />)}
            </div>

            <button onClick={scrollNext} className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors" aria-label="Next slide">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>;
};
export default ProjectsSection;