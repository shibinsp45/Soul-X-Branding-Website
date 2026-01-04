import React from "react";
import AnimatedSection from "./AnimatedSection";

const AboutSection = () => {
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
    <section className="py-24 md:py-32 bg-background" id="about">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left column - Main content */}
          <div>
            <AnimatedSection>
              <div className="soulx-chip mb-6">
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
          
          {/* Right column - Values */}
          <div className="space-y-8">
            {values.map((value, index) => (
              <AnimatedSection 
                key={value.title}
                animation="fade-left"
                delay={400 + index * 100}
              >
                <div className="border-l-2 border-foreground pl-6 py-2 hover:border-foreground/50 transition-colors duration-300">
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
      </div>
    </section>
  );
};

export default AboutSection;
