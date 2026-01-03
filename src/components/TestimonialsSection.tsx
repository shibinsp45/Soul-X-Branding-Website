
import React from "react";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
}

const testimonials: TestimonialProps[] = [
  {
    content: "SoulX transformed our digital presence completely. Their attention to detail and deep understanding of user experience resulted in a 40% increase in engagement.",
    author: "Sarah Chen",
    role: "CEO, Zenith Finance"
  },
  {
    content: "Working with SoulX felt like a true partnership. They took the time to understand our brand's essence and translated it beautifully across all touchpoints.",
    author: "Michael Rodriguez",
    role: "Founder, Artisan Coffee Co."
  },
  {
    content: "The team at SoulX brings both creativity and strategic thinking to every project. Our new brand identity perfectly captures who we are and where we're headed.",
    author: "Dr. Amara Patel",
    role: "Director, Nova Architecture"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-secondary" id="testimonials">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="soulx-chip mx-auto mb-6">
            Testimonials
          </div>
          <h2 className="section-title">
            What our clients
            <span className="font-serif italic font-normal"> say</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-background p-8 rounded-2xl transition-all duration-300 hover:shadow-elegant-hover"
            >
              <blockquote className="text-foreground leading-relaxed mb-8">
                "{testimonial.content}"
              </blockquote>
              <div className="border-t border-border pt-6">
                <div className="font-display font-medium text-foreground">
                  {testimonial.author}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
