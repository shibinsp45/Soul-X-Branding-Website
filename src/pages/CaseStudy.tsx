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
}

const caseStudies: Record<string, CaseStudyData> = {
  "zenith-finance": {
    id: "zenith-finance",
    title: "Zenith Finance",
    category: "UX/UI Design",
    client: "Zenith Finance",
    year: "2024",
    duration: "4 months",
    overview: "Complete redesign of a fintech platform focusing on accessibility and user trust. We transformed a complex financial tool into an intuitive experience that users love.",
    challenge: "The existing platform suffered from low user engagement and high abandonment rates. Users found the interface confusing, and trust indicators were poorly communicated. The mobile experience was particularly problematic.",
    solution: "We conducted extensive user research to understand pain points, then redesigned the entire experience with a focus on clarity, trust, and accessibility. New features included simplified navigation, clear visual hierarchies, and comprehensive onboarding flows.",
    results: [
      "40% increase in user engagement",
      "65% reduction in support tickets",
      "92% user satisfaction score",
      "3x faster task completion"
    ],
    tags: ["Mobile App", "Web Platform", "Design System"],
    nextProject: "artisan-coffee",
    prevProject: "bloom-botanicals"
  },
  "artisan-coffee": {
    id: "artisan-coffee",
    title: "Artisan Coffee Co.",
    category: "Brand Identity",
    client: "Artisan Coffee Co.",
    year: "2024",
    duration: "3 months",
    overview: "Crafting a warm, artisanal brand identity for a specialty coffee roaster. The brand needed to convey quality, craftsmanship, and approachability.",
    challenge: "The client was launching a new specialty coffee brand and needed a complete visual identity that would stand out in a crowded market while communicating their commitment to quality and sustainability.",
    solution: "We developed a comprehensive brand identity including logo, packaging, signage, and digital presence. The design language emphasizes handcrafted quality through custom typography and warm, earthy colors.",
    results: [
      "Successful launch in 15 retail locations",
      "Featured in 3 design publications",
      "200% increase in social media following",
      "Strong brand recognition within first quarter"
    ],
    tags: ["Logo Design", "Packaging", "Brand Guidelines"],
    nextProject: "mindful-app",
    prevProject: "zenith-finance"
  },
  "mindful-app": {
    id: "mindful-app",
    title: "Mindful",
    category: "Web Design",
    client: "Mindful Wellness",
    year: "2024",
    duration: "5 months",
    overview: "Designing a serene digital experience for a meditation and wellness app. The design needed to embody calmness and encourage daily practice.",
    challenge: "Creating a digital product for wellness presented unique challenges—how do you design an app that encourages users to disconnect? The interface needed to be functional yet peaceful.",
    solution: "We created a minimalist design language with gentle animations, soothing color palettes, and intuitive navigation. The experience guides users naturally through their wellness journey without overwhelming them.",
    results: [
      "4.8 star rating on app stores",
      "85% daily active user retention",
      "Featured in Apple's 'Apps We Love'",
      "1M+ downloads in first year"
    ],
    tags: ["Website", "App Design", "Illustration"],
    nextProject: "nova-architecture",
    prevProject: "artisan-coffee"
  },
  "nova-architecture": {
    id: "nova-architecture",
    title: "Nova Architecture",
    category: "Brand Identity",
    client: "Nova Architecture Studio",
    year: "2023",
    duration: "4 months",
    overview: "Modern, sophisticated branding for an innovative architecture firm. The identity reflects their bold, contemporary approach to design.",
    challenge: "Nova needed a brand identity that communicated innovation and precision while maintaining warmth and approachability. Their previous branding felt dated and didn't reflect their award-winning work.",
    solution: "We developed a geometric visual language inspired by architectural forms. The identity system is flexible enough for various applications while maintaining strong recognition.",
    results: [
      "30% increase in RFP responses",
      "Brand recognized at design awards",
      "Improved recruitment of top talent",
      "Client satisfaction score of 95%"
    ],
    tags: ["Visual Identity", "Website", "Print Design"],
    nextProject: "healthtrack",
    prevProject: "mindful-app"
  },
  "healthtrack": {
    id: "healthtrack",
    title: "HealthTrack",
    category: "UX/UI Design",
    client: "HealthTrack Systems",
    year: "2023",
    duration: "6 months",
    overview: "User-centered design for a healthcare management platform. The system needed to work seamlessly for patients, providers, and administrators.",
    challenge: "Healthcare software is notoriously complex. We needed to create an interface that different user types could navigate easily while maintaining compliance with strict healthcare regulations.",
    solution: "Through extensive research with healthcare professionals and patients, we designed role-specific dashboards and streamlined workflows. Accessibility was paramount throughout the design process.",
    results: [
      "50% reduction in onboarding time",
      "WCAG 2.1 AA compliance achieved",
      "Deployed across 200+ clinics",
      "Patient satisfaction up 45%"
    ],
    tags: ["UX Research", "Prototyping", "Testing"],
    nextProject: "bloom-botanicals",
    prevProject: "nova-architecture"
  },
  "bloom-botanicals": {
    id: "bloom-botanicals",
    title: "Bloom Botanicals",
    category: "Web Design",
    client: "Bloom Botanicals",
    year: "2023",
    duration: "3 months",
    overview: "E-commerce experience that brings the beauty of plants to digital. The design celebrates nature while driving conversions.",
    challenge: "Selling plants online is challenging—customers can't touch or smell the products. The website needed to create an immersive experience that would build confidence in purchasing living products online.",
    solution: "We created a visually rich e-commerce experience with detailed product photography, care guides integrated into the shopping flow, and a personalized plant recommendation quiz.",
    results: [
      "150% increase in conversion rate",
      "Average order value up 35%",
      "Cart abandonment reduced by 40%",
      "Return rate below industry average"
    ],
    tags: ["E-commerce", "Photography", "Brand"],
    nextProject: "zenith-finance",
    prevProject: "healthtrack"
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
              <span className="text-[15vw] md:text-[10vw] font-serif italic text-foreground/10 group-hover:scale-110 transition-transform duration-700">
                {study.title.charAt(0)}
              </span>
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
