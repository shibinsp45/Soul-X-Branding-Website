
import React from "react";

const Footer = () => {
  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="section-container py-0">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8">
            <span className="text-2xl font-display font-semibold">SoulX</span>
            <p className="text-background/60 text-sm hidden md:block">
              Crafting seamless experiences
            </p>
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#about" className="text-background/60 hover:text-background text-sm transition-colors">
              About
            </a>
            <a href="#projects" className="text-background/60 hover:text-background text-sm transition-colors">
              Projects
            </a>
            <a href="#contact" className="text-background/60 hover:text-background text-sm transition-colors">
              Contact
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/40 text-sm">
            © 2024 SoulX. All rights reserved.
          </p>
          <p className="text-background/40 text-sm">
            Built with{" "}
            <a 
              href="https://lovable.dev" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-background/60 hover:text-background transition-colors"
            >
              Lovable
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
