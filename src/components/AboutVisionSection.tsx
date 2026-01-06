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
    title: "Empathy",
    description: "We deeply understand user needs and emotions, crafting solutions that truly resonate."
  }, {
    title: "Innovation",
    description: "Pushing creative boundaries while maintaining functionality and purpose."
  }, {
    title: "Craftsmanship",
    description: "Every pixel, every interaction is meticulously designed with intention."
  }];
  return <section ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden" id="about">
      {/* Enhanced parallax background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-foreground/[0.02] blur-3xl" style={{
        transform: `translateY(${scrollProgress * 100}px) scale(${1 + scrollProgress * 0.2})`
      }} />
        <div className="absolute bottom-40 left-10 w-96 h-96 rounded-full bg-foreground/[0.03] blur-3xl" style={{
        transform: `translateY(${scrollProgress * -80}px)`
      }} />
        {/* 3D floating shapes */}
        <div className="absolute top-32 left-1/4 w-20 h-20 border border-foreground/5 rounded-2xl float-3d" style={{
        animationDelay: '0s'
      }} />
        <div className="absolute bottom-1/4 right-1/3 w-16 h-16 border border-foreground/5 rounded-full float-3d" style={{
        animationDelay: '3s'
      }} />
        <div className="absolute top-1/2 right-10 w-24 h-24 bg-foreground/[0.01] blob-morph" />
      </div>

      <div className="section-container relative z-10">
        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-24">
          <div>
            <AnimatedSection>
              <div className="soulx-chip mb-6 micro-interaction">
                About Us
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={100}>
              <h2 className="section-title mb-8 font-sans">We believe design is deeply human
              <br />
                <span className="font-serif italic font-normal"></span>
              </h2>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                SoulX is a design and branding agency focused on creating meaningful 
                digital experiences. We blend strategy, creativity, and technology to 
                help brands connect with their audience on a profound level.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <p className="text-muted-foreground leading-relaxed">
                Founded on the principle that great design serves people first, 
                we approach every project with curiosity, empathy, and an unwavering 
                commitment to excellence.
              </p>
            </AnimatedSection>
          </div>
          
          {/* Values with 3D cards */}
          <div className="space-y-8">
            {values.map((value, index) => <ScrollTriggered3DCard key={value.title} delay={400 + index * 100}>
                <div className="border-l-2 border-foreground pl-6 py-4 hover:border-foreground/50 transition-all duration-300 hover:pl-8 bg-secondary/30 rounded-r-xl glow-effect">
                  <h3 className="text-xl font-medium mb-2 text-foreground font-sans">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </ScrollTriggered3DCard>)}
          </div>
        </div>

        {/* Vision Content - 3D Dark Section */}
        <div className="bg-foreground text-background rounded-3xl p-8 md:p-16 relative overflow-hidden card-3d" style={{
        transform: `perspective(2000px) rotateX(${(0.5 - scrollProgress) * 5}deg)`,
        transition: 'transform 0.3s ease-out'
      }}>
          {/* Decorative 3D elements */}
          <div className="absolute top-10 right-10 w-32 h-32 rounded-full border border-background/10 float-3d" />
          <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full border border-background/5 float-3d" style={{
          animationDelay: '2s'
        }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-background/[0.02] blob-morph pointer-events-none" />
          
          <div className="max-w-4xl relative z-10">
            <AnimatedSection>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-background text-foreground tracking-wider uppercase mb-8 micro-interaction tilt-hover">
                Our Vision
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <blockquote className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display font-medium leading-tight mb-12">Design is not just what it looks like and feels like how it works and more importantly how makes the people feel" how it works—and more import<span className="italic font-sans"> how it works</span>—and more importantly, 
                <span className="font-serif italic"> how it makes people feel</span>."
              </blockquote>
            </AnimatedSection>
            
            <div className="pt-8 border-t border-background/20">
              <AnimatedSection delay={400}>
                <p className="text-lg md:text-xl text-background/80 leading-relaxed mb-6">
                  We envision a world where every digital interaction is intuitive, 
                  beautiful, and meaningful. Where technology enhances human connection 
                  rather than replacing it.
                </p>
              </AnimatedSection>
              
              <AnimatedSection delay={500}>
                <p className="text-background/70 leading-relaxed">
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