
import React from "react";

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
            <div className="soulx-chip mb-6 opacity-0 animate-fade-in">
              About Us
            </div>
            
            <h2 className="section-title mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              We believe design is
              <br />
              <span className="font-serif italic font-normal">deeply human</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              SoulX is a design and branding agency focused on creating meaningful 
              digital experiences. We blend strategy, creativity, and technology to 
              help brands connect with their audience on a profound level.
            </p>
            
            <p className="text-muted-foreground leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              Founded on the principle that great design serves people first, 
              we approach every project with curiosity, empathy, and an unwavering 
              commitment to excellence.
            </p>
          </div>
          
          {/* Right column - Values */}
          <div className="space-y-8">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="border-l-2 border-foreground pl-6 py-2 opacity-0 animate-fade-in"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <h3 className="text-xl font-display font-medium mb-2 text-foreground">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
