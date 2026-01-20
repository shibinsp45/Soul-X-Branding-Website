import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

interface CaseStudyData {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  duration: string;
  overview: string;
  challenge: string;
  solution: string;
  results: string[];
  tags: string[];
  nextProject?: string;
  prevProject?: string;
  image?: string;
}

const caseStudies: Record<string, CaseStudyData> = {
  "fudit": {
    id: "fudit",
    title: "Fudit",
    category: "UX/UI Design",
    client: "Fudit Inc.",
    year: "2024",
    duration: "5 months",
    overview: "AI-powered food delivery app that revolutionizes how users discover and order meals through intelligent recommendations and seamless ordering experience.",
    challenge: "Users faced decision fatigue when ordering food online. With thousands of options available, choosing the right meal became overwhelming. The existing food delivery landscape lacked personalization and smart recommendations.",
    solution: "We designed an AI-driven recommendation engine that learns user preferences, dietary restrictions, and ordering patterns. The intuitive interface guides users through a personalized food discovery journey with smart filters and mood-based suggestions.",
    results: [
      "45% faster ordering process",
      "3x increase in repeat orders",
      "92% user satisfaction rate",
      "Featured in App Store"
    ],
    tags: ["Mobile App", "AI/ML", "Food Tech", "UX Research"],
    nextProject: "fitness-tracking",
    prevProject: "elitepath",
    image: "/projects/fudit-cover.png"
  },
  "fitness-tracking": {
    id: "fitness-tracking",
    title: "Fitness Tracking App",
    category: "UX/UI Design",
    client: "FitLife Studios",
    year: "2024",
    duration: "6 months",
    overview: "Comprehensive fitness tracking application designed to motivate and guide users on their wellness journey with personalized workout plans and progress visualization.",
    challenge: "Most fitness apps overwhelm users with complex metrics and generic workout plans. Users often abandon apps within the first week due to lack of personalization and motivation.",
    solution: "We created a user-centered fitness experience with adaptive workout plans, intuitive progress tracking, and gamification elements. The design emphasizes celebration of small wins and builds sustainable habits.",
    results: [
      "78% user retention after 30 days",
      "4.9 star app rating",
      "50% increase in workout completion",
      "1M+ active users"
    ],
    tags: ["Mobile App", "Health Tech", "UX Research", "Gamification"],
    nextProject: "happy-cart",
    prevProject: "fudit",
    image: "/projects/fitness-cover.png"
  },
  "happy-cart": {
    id: "happy-cart",
    title: "Happy Cart",
    category: "Brand Identity",
    client: "Happy Cart E-commerce",
    year: "2024",
    duration: "3 months",
    overview: "Vibrant and playful branding for an e-commerce shopping platform that brings joy to online shopping through delightful visual experiences.",
    challenge: "The e-commerce market is saturated with similar-looking brands. Happy Cart needed a distinctive identity that would resonate with younger audiences while maintaining trust and professionalism.",
    solution: "We developed a cheerful brand identity with a custom mascot, vibrant color palette, and playful typography. The design system extends across packaging, digital touchpoints, and marketing materials.",
    results: [
      "Brand recognition up 200%",
      "35% increase in engagement",
      "Featured in Behance galleries",
      "Successful launch in 3 markets"
    ],
    tags: ["Logo Design", "Brand Guidelines", "Visual Identity", "Packaging"],
    nextProject: "nuren-ai",
    prevProject: "fitness-tracking",
    image: "/projects/happycart-cover.png"
  },
  "nuren-ai": {
    id: "nuren-ai",
    title: "Nuren AI",
    category: "Web Design",
    client: "Nuren Technologies",
    year: "2024",
    duration: "2 months",
    overview: "Modern landing page design for an AI-powered platform showcasing cutting-edge technology with elegant visuals and clear value propositions.",
    challenge: "AI products often struggle to communicate complex technology in an accessible way. Nuren needed a landing page that would demystify their AI capabilities while building trust with potential users.",
    solution: "We designed a sleek, modern landing page with animated visualizations that explain AI concepts intuitively. The design balances technical credibility with approachable language and clear CTAs.",
    results: [
      "65% increase in conversions",
      "Average time on page: 4 min",
      "40% reduction in bounce rate",
      "Successfully raised Series A"
    ],
    tags: ["Landing Page", "AI/ML", "Web Design", "Motion Design"],
    nextProject: "trillionair",
    prevProject: "happy-cart",
    image: "/projects/nuren-cover.png"
  },
  "trillionair": {
    id: "trillionair",
    title: "Trillionair",
    category: "Web Design",
    client: "Trillionair Finance",
    year: "2024",
    duration: "3 months",
    overview: "Premium landing page design for a luxury fintech platform with bold aesthetics that communicate exclusivity and financial sophistication.",
    challenge: "High-net-worth individuals expect digital experiences that match their lifestyle. Trillionair needed a web presence that exuded luxury, trust, and financial expertise.",
    solution: "We crafted an immersive landing experience with premium animations, sophisticated typography, and a dark, elegant color scheme. Every interaction reinforces the brand's exclusive positioning.",
    results: [
      "300% increase in qualified leads",
      "Featured in Awwwards",
      "Average account size up 45%",
      "Industry recognition awards"
    ],
    tags: ["Landing Page", "Fintech", "Premium Design", "Animation"],
    nextProject: "foodit-brand",
    prevProject: "nuren-ai",
    image: "/projects/trillionair-cover.png"
  },
  "foodit-brand": {
    id: "foodit-brand",
    title: "Foodit",
    category: "Brand Identity",
    client: "Foodit Delivery",
    year: "2024",
    duration: "4 months",
    overview: "Complete brand identity system for a modern food delivery service that balances appetite appeal with technological innovation.",
    challenge: "Food delivery services often look generic or overly tech-focused. Foodit needed a brand that would feel fresh, appetizing, and memorable while conveying reliability and speed.",
    solution: "We created a mouth-watering brand identity with custom illustrations, a warm color palette, and typography that feels both modern and approachable. The system works seamlessly across app, packaging, and marketing.",
    results: [
      "Brand recall up 180%",
      "Social engagement doubled",
      "Successful market expansion",
      "Design awards recognition"
    ],
    tags: ["Logo Design", "Brand Guidelines", "Visual Identity", "Illustration"],
    nextProject: "beat",
    prevProject: "trillionair",
    image: "/projects/foodit-cover.png"
  },
  "beat": {
    id: "beat",
    title: "Beat",
    category: "Web Design",
    client: "Beat Music",
    year: "2024",
    duration: "2 months",
    overview: "Modern landing page for a music streaming platform featuring vibrant purple aesthetics and dynamic interactions that capture the energy of music.",
    challenge: "The music streaming market is crowded with established players. Beat needed a landing page that would stand out, convey the energy of music, and convert visitors into subscribers.",
    solution: "We designed a bold, immersive landing experience with dynamic animations, a striking purple color palette, and interactive elements that respond to user engagement. The design captures the rhythm and energy of music.",
    results: [
      "150% increase in signups",
      "Average session time: 5 min",
      "Social shares up 300%",
      "Featured on design blogs"
    ],
    tags: ["Landing Page", "Music Tech", "Web Design", "Animation"],
    nextProject: "elitepath",
    prevProject: "foodit-brand",
    image: "/projects/beat-cover.png"
  },
  "elitepath": {
    id: "elitepath",
    title: "ElitePath",
    category: "UX/UI Design",
    client: "ElitePath Education",
    year: "2024",
    duration: "4 months",
    overview: "Student management dashboard that streamlines academic administration and enhances learning experiences through intuitive design and powerful analytics.",
    challenge: "Educational institutions struggle with fragmented systems for managing students, courses, and performance tracking. Administrators and students alike face confusion navigating multiple platforms.",
    solution: "We designed a unified dashboard that centralizes student management, course scheduling, performance analytics, and communication tools. The clean, intuitive interface reduces administrative overhead while empowering students.",
    results: [
      "60% reduction in admin time",
      "95% user adoption rate",
      "40% improvement in grades",
      "Deployed in 50+ institutions"
    ],
    tags: ["Dashboard", "EdTech", "Web App", "Data Visualization"],
    nextProject: "fudit",
    prevProject: "beat",
    image: "/projects/elitepath-cover.png"
  }
};

const CaseStudy = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const study = projectId ? caseStudies[projectId] : null;

  if (!study) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-medium mb-4">Project Not Found</h1>
          <Link to="/#projects" className="button-primary inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Parallax */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        {/* Parallax background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-foreground/[0.02] blur-3xl parallax-slow" />
          <div className="absolute bottom-40 left-10 w-96 h-96 rounded-full bg-foreground/[0.03] blur-3xl parallax-fast" />
        </div>
        
        <div className="section-container relative z-10">
          <AnimatedSection>
            <Link 
              to="/#projects" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 micro-interaction"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <div className="soulx-chip mb-6 micro-interaction">{study.category}</div>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-medium tracking-tight text-foreground mb-8">
              {study.title}
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={300}>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
              {study.overview}
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={400}>
            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-border">
              <div className="micro-interaction">
                <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Client</div>
                <div className="font-display font-medium">{study.client}</div>
              </div>
              <div className="micro-interaction">
                <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Year</div>
                <div className="font-display font-medium">{study.year}</div>
              </div>
              <div className="micro-interaction">
                <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Duration</div>
                <div className="font-display font-medium">{study.duration}</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Project Image with Scale Animation */}
      <section className="py-8">
        <div className="section-container">
          <AnimatedSection animation="scale">
            <div className="aspect-[16/9] bg-gradient-to-br from-secondary to-muted rounded-2xl flex items-center justify-center overflow-hidden group glow-effect">
              {study.image ? (
                <img 
                  src={study.image} 
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <span className="text-[15vw] md:text-[10vw] font-serif italic text-foreground/10 group-hover:scale-110 transition-transform duration-700">
                  {study.title.charAt(0)}
                </span>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Process Section - New */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-display font-medium mb-12 text-center">
              Our <span className="font-serif italic">Process</span>
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {['Discovery', 'Strategy', 'Design', 'Delivery'].map((phase, index) => (
              <AnimatedSection key={phase} animation="fade-up" delay={index * 100}>
                <div className="text-center p-6 bg-secondary/50 rounded-2xl micro-interaction hover:bg-secondary transition-colors">
                  <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center mx-auto mb-4 font-display font-medium">
                    {index + 1}
                  </div>
                  <h3 className="font-display font-medium text-lg">{phase}</h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* Challenge & Solution with Parallax */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -right-20 top-1/2 w-40 h-40 border border-foreground/5 rounded-full parallax-reverse" />
        </div>
        
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimatedSection animation="fade-right" delay={100}>
              <div className="bg-secondary/30 rounded-2xl p-8 md:p-10 micro-interaction hover:bg-secondary/50 transition-colors">
                <div className="w-16 h-16 rounded-2xl bg-foreground text-background flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-medium mb-6">
                  The <span className="font-serif italic">Challenge</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {study.challenge}
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-left" delay={200}>
              <div className="bg-foreground text-background rounded-2xl p-8 md:p-10 micro-interaction">
                <div className="w-16 h-16 rounded-2xl bg-background text-foreground flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-medium mb-6">
                  Our <span className="font-serif italic">Solution</span>
                </h2>
                <p className="text-background/80 leading-relaxed text-lg">
                  {study.solution}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Results with Counter Animation */}
      <section className="py-16 md:py-24 bg-foreground text-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full border border-background/10 animate-spin-slow" />
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full border border-background/5 animate-float" />
        
        <div className="section-container relative z-10">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-display font-medium mb-4 text-center">
              The <span className="font-serif italic">Results</span>
            </h2>
            <p className="text-background/60 text-center mb-12 max-w-xl mx-auto">
              Measurable outcomes that demonstrate the impact of our work
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {study.results.map((result, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <div className="text-center p-8 border border-background/10 rounded-2xl micro-interaction hover:border-background/30 transition-colors hover:bg-background/5">
                  <p className="text-lg font-display">{result}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Key Deliverables - New Section */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-display font-medium mb-12 text-center">
              Key <span className="font-serif italic">Deliverables</span>
            </h2>
          </AnimatedSection>
          
          <div className="flex flex-wrap gap-4 justify-center">
            {study.tags.map((tag, index) => (
              <AnimatedSection key={tag} delay={index * 50}>
                <span 
                  className="px-6 py-3 rounded-full bg-secondary text-foreground text-sm font-medium micro-interaction hover:bg-foreground hover:text-background transition-colors cursor-default"
                >
                  {tag}
                </span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Placeholder - New Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="section-container">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <svg className="w-12 h-12 mx-auto mb-6 text-foreground/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              <blockquote className="text-xl md:text-2xl font-display font-medium mb-6 text-foreground">
                "Working with SoulX was a transformative experience. They truly understood our vision and delivered beyond expectations."
              </blockquote>
              <cite className="text-muted-foreground not-italic">
                — {study.client} Team
              </cite>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Navigation with Hover Effects */}
      <section className="py-12 border-t border-border">
        <div className="section-container">
          <div className="flex justify-between items-center">
            {study.prevProject ? (
              <Link 
                to={`/project/${study.prevProject}`}
                className="group inline-flex items-center text-muted-foreground hover:text-foreground transition-all duration-300 micro-interaction"
              >
                <ArrowLeft className="w-5 h-5 mr-3 transition-transform group-hover:-translate-x-2" />
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Previous</div>
                  <div className="font-display font-medium text-foreground">
                    {caseStudies[study.prevProject]?.title}
                  </div>
                </div>
              </Link>
            ) : <div />}
            
            {study.nextProject && (
              <Link 
                to={`/project/${study.nextProject}`}
                className="group inline-flex items-center text-right text-muted-foreground hover:text-foreground transition-all duration-300 micro-interaction"
              >
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Next</div>
                  <div className="font-display font-medium text-foreground">
                    {caseStudies[study.nextProject]?.title}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-2" />
              </Link>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CaseStudy;
