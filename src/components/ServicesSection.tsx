import React from "react";
import ScrollTriggered3DCard from "./ScrollTriggered3DCard";
import SectionHeading from "./SectionHeading";
const services = [{
  number: "01",
  title: "UX Research & Strategy",
  description: "Understand your users deeply. We uncover what your customers actually need—so you build products they'll love, not features they'll ignore."
}, {
  number: "02",
  title: "UI Design & Prototyping",
  description: "Interfaces that feel intuitive. We design and test before you build, reducing development costs and eliminating guesswork."
}, {
  number: "03",
  title: "Brand Identity Design",
  description: "Stand out in crowded markets. We create distinctive visual identities that make your brand memorable and trustworthy from first impression."
}, {
  number: "04",
  title: "Web Design & Development",
  description: "Websites that work as hard as you do. Fast, responsive, and built to convert visitors into customers—not just impress them."
}];
const ServicesSection = () => {
  return <section className="py-16 md:py-20 relative overflow-hidden bg-background dark:bg-transparent" id="services">
      {/* Decorative 3D elements */}
      <div className="absolute top-20 right-10 w-32 h-32 border border-foreground/5 rounded-3xl float-3d" style={{
      animationDelay: '1s'
    }} />
      <div className="absolute bottom-20 left-10 w-24 h-24 border border-foreground/5 rounded-full float-3d" style={{
      animationDelay: '3s'
    }} />
      <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-foreground/[0.01] blob-morph" />
      
      <div className="section-container relative z-10">
        <div className="max-w-3xl mb-16">
          <SectionHeading
            chip="Services"
            title="What we offer"
            subtitle="End-to-end design services to transform your ideas into impactful digital experiences."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => <ScrollTriggered3DCard key={service.number} delay={index * 100}>
              <div className="group p-8 border border-border rounded-2xl transition-all duration-500 hover:border-foreground/70 hover:shadow-[0_0_30px_rgba(255,255,255,0.15),0_0_60px_rgba(255,255,255,0.05)] h-full">
                <div className="flex items-start gap-6">
                  <span className="text-4xl font-display font-light text-muted-foreground group-hover:text-foreground transition-colors duration-300 group-hover:animate-scale-pulse">
                    {service.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium text-foreground mb-3 group-hover:translate-x-1 transition-transform font-sans">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollTriggered3DCard>)}
        </div>
      </div>
    </section>;
};
export default ServicesSection;