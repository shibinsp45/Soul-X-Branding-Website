import React from "react";
import AnimatedSection from "./AnimatedSection";

const AboutVisionSection = () => {
  const values = [
    {
      title: "Empathy",
      description: "We deeply understand user needs and emotions, crafting solutions that truly resonate."
    },
    {
      title: "Innovation",
      description: "Pushing creative boundaries while maintaining functionality and purpose."
    },
    {
      title: "Craftsmanship",
      description: "Every pixel, every interaction is meticulously designed with intention."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden" id="about">
      {/* Parallax background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-foreground/[0.02] blur-3xl parallax-slow"
        />
        <div 
          className="absolute bottom-40 left-10 w-96 h-96 rounded-full bg-foreground/[0.03] blur-3xl parallax-fast"
        />
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
              <h2 className="section-title mb-8">
                We believe design is
                <br />
                <span className="font-serif italic font-normal">deeply human</span>
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
          
          {/* Values */}
          <div className="space-y-8">
            {values.map((value, index) => (
              <AnimatedSection 
                key={value.title}
                animation="fade-left"
                delay={400 + index * 100}
              >
                <div className="border-l-2 border-foreground pl-6 py-2 hover:border-foreground/50 transition-all duration-300 micro-interaction hover:pl-8">
                  <h3 className="text-xl font-display font-medium mb-2 text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Vision Content - Dark Section */}
        <div className="bg-foreground text-background rounded-3xl p-8 md:p-16 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 w-32 h-32 rounded-full border border-background/10 animate-pulse-slow" />
          <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full border border-background/5" />
          
          <div className="max-w-4xl relative z-10">
            <AnimatedSection>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium bg-background text-foreground tracking-wider uppercase mb-8 micro-interaction">
                Our Vision
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <blockquote className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-display font-medium leading-tight mb-12">
                "Design is not just what it looks like and feels like. Design is 
                <span className="font-serif italic"> how it works</span>—and more importantly, 
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
    </section>
  );
};

export default AboutVisionSection;
