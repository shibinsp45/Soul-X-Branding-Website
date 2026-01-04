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
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="section-container">
          <AnimatedSection>
            <Link 
              to="/#projects" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </AnimatedSection>
          
          <AnimatedSection delay={100}>
            <div className="soulx-chip mb-6">{study.category}</div>
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
              <div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Client</div>
                <div className="font-display font-medium">{study.client}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Year</div>
                <div className="font-display font-medium">{study.year}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Duration</div>
                <div className="font-display font-medium">{study.duration}</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Project Image Placeholder */}
      <section className="py-8">
        <div className="section-container">
          <AnimatedSection animation="scale">
            <div className="aspect-[16/9] bg-secondary rounded-2xl flex items-center justify-center">
              <span className="text-8xl font-serif italic text-foreground/10">
                {study.title.charAt(0)}
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Challenge & Solution */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimatedSection animation="fade-right" delay={100}>
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-medium mb-6">
                  The <span className="font-serif italic">Challenge</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {study.challenge}
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-left" delay={200}>
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-medium mb-6">
                  Our <span className="font-serif italic">Solution</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {study.solution}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Results */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="section-container">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl font-display font-medium mb-12 text-center">
              The <span className="font-serif italic">Results</span>
            </h2>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {study.results.map((result, index) => (
              <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
                <div className="text-center p-6">
                  <p className="text-lg font-display">{result}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* Tags */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <AnimatedSection>
            <div className="flex flex-wrap gap-3 justify-center">
              {study.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-4 py-2 rounded-full bg-secondary text-foreground text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Navigation */}
      <section className="py-8 border-t border-border">
        <div className="section-container">
          <div className="flex justify-between items-center">
            {study.prevProject ? (
              <Link 
                to={`/project/${study.prevProject}`}
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Project
              </Link>
            ) : <div />}
            
            {study.nextProject && (
              <Link 
                to={`/project/${study.nextProject}`}
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
              >
                Next Project
                <ArrowRight className="w-4 h-4 ml-2" />
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
