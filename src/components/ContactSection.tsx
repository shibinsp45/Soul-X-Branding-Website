
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
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

  return (
    <section className="py-24 md:py-32 bg-background" id="contact">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Info */}
          <div>
            <div className="soulx-chip mb-6">
              Get in Touch
            </div>
            <h2 className="section-title mb-6">
              Let's create
              <br />
              <span className="font-serif italic font-normal">together</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              Have a project in mind? We'd love to hear about it. 
              Reach out and let's explore how we can bring your vision to life.
            </p>
            
            <div className="space-y-6">
              <div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                  Email
                </div>
                <a 
                  href="mailto:hello@soulx.design" 
                  className="text-lg font-display text-foreground hover:underline"
                >
                  hello@soulx.design
                </a>
              </div>
              <div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                  Follow Us
                </div>
                <div className="flex gap-4">
                  <a href="#" className="text-foreground hover:text-muted-foreground transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="text-foreground hover:text-muted-foreground transition-colors">
                    LinkedIn
                  </a>
                  <a href="#" className="text-foreground hover:text-muted-foreground transition-colors">
                    Dribbble
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:border-foreground transition-colors"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:border-foreground transition-colors"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="projectType" className="block text-sm text-muted-foreground mb-2">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:border-foreground transition-colors appearance-none"
                >
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
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:outline-none focus:border-foreground transition-colors resize-none"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="button-primary w-full inline-flex items-center justify-center group"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
