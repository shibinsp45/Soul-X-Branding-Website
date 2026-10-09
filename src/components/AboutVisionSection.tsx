import React, { useEffect, useRef, useState } from "react";
import AnimatedSection from "./AnimatedSection";
import ScrollTriggered3DCard from "./ScrollTriggered3DCard";
const AboutVisionSection = () => {
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
  const values = [{
    title: "Human-First Thinking",
    description: "We start with people, not pixels. Every decision is grounded in real user behavior and genuine business needs."
  }, {
    title: "Strategic, Not Just Pretty",
    description: "Design without strategy is just decoration. We solve problems first, then make them beautiful."
  }, {
    title: "Partnership, Not Projects",
    description: "We invest in your success. You get a dedicated team that cares about outcomes, not just deliverables."
  }];
  return <section ref={sectionRef} className="py-16 md:py-24 relative overflow-hidden bg-background dark:bg-transparent" id="about">
      <div className="section-container relative z-10">
        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mb-12 md:mb-16">
          <div>
            <AnimatedSection>
              <div className="soulx-chip mb-6 micro-interaction">
                Why SoulX
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={100}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans font-medium tracking-tight text-foreground mb-6">
                Design that drives
                <br />
                real results
              </h2>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                We're a small, focused team of designers and strategists who 
                obsess over the details that matter. No layers of account managers. 
                No templated solutions. Just direct collaboration with people who 
                genuinely care about your product.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <p className="text-muted-foreground leading-relaxed">
                Every brand we build and every interface we design starts with 
                one question: how will this make someone's life better?
              </p>
            </AnimatedSection>
          </div>
          
          {/* Values with 3D cards */}
          <div className="space-y-4 md:space-y-6">
            {values.map((value, index) => <ScrollTriggered3DCard key={value.title} delay={400 + index * 100}>
                <div className="border border-border bg-card rounded-lg p-5 sm:p-6 transition-colors duration-300 hover:border-foreground/30">
                   <h3 className="text-lg md:text-xl font-medium mb-2 text-foreground font-sans">
                    {value.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </ScrollTriggered3DCard>)}
          </div>
        </div>

        {/* Vision Content - 3D Dark Section */}
        <div className="border-t border-border pt-10 md:pt-12 relative">
          <div className="max-w-4xl relative z-10">
            <AnimatedSection>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-secondary text-muted-foreground mb-6">
                Our Vision
              </div>
            </AnimatedSection>
            
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <AnimatedSection delay={400}>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  We envision a world where every digital interaction is intuitive, 
                  beautiful, and meaningful. Where technology enhances human connection 
                  rather than replacing it.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={500}>
                <p className="text-muted-foreground leading-relaxed">
                  Our approach combines rigorous research with creative exploration, 
                  ensuring that every solution we craft is grounded in real human needs 
                  while pushing the boundaries of what's possible.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutVisionSection;