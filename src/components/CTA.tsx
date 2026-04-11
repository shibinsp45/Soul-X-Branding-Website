import React from "react";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionHeading from "./SectionHeading";

const CTA = () => {
  return (
    <section className="py-12 md:py-16 bg-background dark:bg-transparent relative" id="get-access">
      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto bg-secondary border border-border rounded-2xl p-6 sm:p-8 md:p-12 text-center">
          <AnimatedSection>
            <SectionHeading
              chip="Limited Availability"
              title="Be Among the First to"
              titleAccent="Experience Atlas"
              alignment="center"
              className="mb-4"
            />
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-xl mx-auto leading-relaxed">
              We're accepting a limited number of early adopters. Submit your application today to secure your place in the future of robotics.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a href="#contact" className="button-primary group flex items-center justify-center">
                Request Early Access
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#" className="button-secondary text-center">
                Join Waitlist
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default CTA;
