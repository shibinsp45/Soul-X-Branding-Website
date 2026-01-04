import React from "react";
import AnimatedSection from "./AnimatedSection";

const services = [
  {
    number: "01",
    title: "UX Research & Strategy",
    description: "Deep user research, persona development, and strategic planning to ensure every design decision is backed by insights."
  },
  {
    number: "02",
    title: "UI Design & Prototyping",
    description: "Beautiful, functional interfaces with interactive prototypes that bring concepts to life before development."
  },
  {
    number: "03",
    title: "Brand Identity Design",
    description: "Comprehensive visual identities including logos, color systems, typography, and brand guidelines."
  },
  {
    number: "04",
    title: "Web Design & Development",
    description: "Responsive, performant websites that perfectly express your brand and convert visitors into customers."
  }
];

const ServicesSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background" id="services">
      <div className="section-container">
        <AnimatedSection>
          <div className="max-w-3xl mb-16">
            <div className="soulx-chip mb-6">
              Services
            </div>
            <h2 className="section-title mb-6">
              What we
              <span className="font-serif italic font-normal"> offer</span>
            </h2>
            <p className="section-subtitle mt-0">
              End-to-end design services to transform your ideas into impactful digital experiences.
            </p>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <AnimatedSection 
              key={service.number}
              animation="fade-up"
              delay={index * 100}
            >
              <div className="group p-8 border border-border rounded-2xl transition-all duration-500 hover:border-foreground hover:bg-secondary hover:-translate-y-1">
                <div className="flex items-start gap-6">
                  <span className="text-4xl font-display font-light text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {service.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-display font-medium text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
