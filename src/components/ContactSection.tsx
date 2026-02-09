import React, { useState, useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import ScrollTriggered3DCard from "./ScrollTriggered3DCard";
import SectionHeading from "./SectionHeading";
import AnimatedSection from "./AnimatedSection";
const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours."
      });
      setFormData({
        name: "",
        email: "",
        projectType: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1000);
  };
  return <section ref={sectionRef} className="py-16 md:py-20 bg-background dark:bg-transparent relative overflow-hidden" id="contact">
      {/* Parallax decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-foreground/[0.02] rounded-full blur-3xl" style={{
      transform: `translateY(${scrollProgress * 100}px)`
    }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-foreground/[0.02] rounded-full blur-2xl" style={{
      transform: `translateY(${scrollProgress * -80}px)`
    }} />
      
      {/* 3D floating shapes */}
      <div className="absolute top-32 right-20 w-20 h-20 border border-foreground/5 rounded-2xl float-3d" />
      <div className="absolute bottom-20 left-1/4 w-16 h-16 border border-foreground/5 rounded-full float-3d" style={{
      animationDelay: '3s'
    }} />
      <div className="absolute top-1/2 left-10 w-28 h-28 bg-foreground/[0.01] blob-morph" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Info */}
          <div>
            <SectionHeading
              chip="Start a Conversation"
              title="Ready to build"
              titleAccent="something great?"
              className="mb-6"
            />
            
            <AnimatedSection delay={200}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-12">
                Tell us about your project and we'll get back to you within 24 hours with 
                honest feedback on how we can help—or if we're the right fit.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <div className="space-y-6">
                <ScrollTriggered3DCard delay={400}>
                  <div className="p-4 rounded-xl bg-secondary/30 glow-effect">
                    <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                      Email
                    </div>
                    <a href="mailto:hello@soulx.design" className="text-lg font-display text-foreground hover:underline">
                      hello@soulx.design
                    </a>
                  </div>
                </ScrollTriggered3DCard>
                <ScrollTriggered3DCard delay={500}>
                  <div className="p-4 rounded-xl bg-secondary/30 glow-effect">
                    <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                      Follow Us
                    </div>
                    <div className="flex gap-4">
                      <a href="#" className="text-foreground hover:text-muted-foreground transition-colors tilt-hover">
                        Twitter
                      </a>
                      <a href="#" className="text-foreground hover:text-muted-foreground transition-colors tilt-hover">
                        LinkedIn
                      </a>
                      <a href="#" className="text-foreground hover:text-muted-foreground transition-colors tilt-hover">
                        Dribbble
                      </a>
                    </div>
                  </div>
                </ScrollTriggered3DCard>
              </div>
            </AnimatedSection>
          </div>
          
          {/* Right column - Form with 3D effect */}
          <ScrollTriggered3DCard delay={200}>
            <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-secondary/30 glow-effect">
              <div>
                <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">
                  Name *
                </label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all duration-300" required />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                  Email *
                </label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all duration-300" required />
              </div>
              
              <div>
                <label htmlFor="projectType" className="block text-sm text-muted-foreground mb-2">
                  Project Type
                </label>
                <select id="projectType" name="projectType" value={formData.projectType} onChange={handleChange} className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all duration-300 appearance-none cursor-pointer">
                  <option value="">Select a project type</option>
                  <option value="ux-ui">UX/UI Design</option>
                  <option value="branding">Brand Identity</option>
                  <option value="web">Web Design</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">
                  Message *
                </label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all duration-300 resize-none" required />
              </div>
              
              <button type="submit" disabled={isSubmitting} className="button-primary w-full inline-flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed tilt-hover">
                {isSubmitting ? <>
                    <span className="animate-pulse">Sending...</span>
                  </> : <>
                    Let's Talk
                    <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </>}
              </button>
            </form>
          </ScrollTriggered3DCard>
        </div>
      </div>
    </section>;
};
export default ContactSection;