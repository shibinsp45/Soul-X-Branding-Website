import React, { useState, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { Send, Mail, Twitter, Linkedin, Dribbble } from "lucide-react";
import SectionHeading from "./SectionHeading";
import AnimatedSection from "./AnimatedSection";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Behance SVG icon (not in lucide)
const BehanceIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M7.5 11c1.38 0 2.5-1.12 2.5-2.5S8.88 6 7.5 6H3v5h4.5zm0 2H3v5h4.5c1.38 0 2.5-1.12 2.5-2.5S8.88 13 7.5 13zM21 8h-6V6.5h6V8zm-3 4.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5c1.38 0 2.57-.8 3.15-1.95h-1.79c-.35.37-.84.6-1.36.6-.97 0-1.75-.78-1.75-1.75h5.1c.04-.23.1-.52.1-.9 0-1.93-1.57-3.5-3.45-3.5zm-1.75 2.75c.14-.83.86-1.4 1.75-1.4s1.61.57 1.75 1.4h-3.5z" />
  </svg>
);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
      setFormData({ name: "", email: "", projectType: "", message: "" });
      setIsSubmitting(false);
      setOpen(false);
    }, 1000);
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "mailto:hello@soulx.design", label: "Email" },
    { icon: Dribbble, href: "#", label: "Dribbble" },
    { icon: BehanceIcon, href: "#", label: "Behance" },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 bg-background dark:bg-transparent relative overflow-hidden"
      id="contact"
    >
      <div className="section-container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <SectionHeading
            chip="Start a Conversation"
            title="Ready to build"
            titleAccent="something great?"
            className="mb-6"
            alignment="center"
          />

          <AnimatedSection delay={200}>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Tell us about your project and we'll get back to you within 24 hours with
              honest feedback on how we can help.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="button-primary inline-flex items-center justify-center group text-lg tilt-hover">
                  Let's Talk
                  <Send className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-sans font-normal">
                    Let's Talk
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-5 mt-4">
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
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all duration-300"
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
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all duration-300"
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
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all duration-300 appearance-none cursor-pointer"
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
                      rows={4}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-all duration-300 resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button-primary w-full inline-flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed tilt-hover"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">Sending...</span>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </button>
                </form>
              </DialogContent>
            </Dialog>
          </AnimatedSection>

          {/* Social icons */}
          <AnimatedSection delay={400}>
            <div className="flex items-center justify-center gap-6 mt-12">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-foreground/40 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-medium">{label}</span>
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
