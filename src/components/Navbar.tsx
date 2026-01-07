import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMenu();
  };

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 md:py-5 transition-all duration-500",
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a 
          href="#" 
          className="flex items-center space-x-2 z-50" 
          onClick={e => { e.preventDefault(); scrollToTop(); }} 
          aria-label="SoulX"
        >
          <span className="tracking-tight text-foreground text-3xl font-bold font-sans">Soul X</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map(item => (
            <a 
              key={item.label} 
              href={item.href} 
              className="nav-link text-sm tracking-wide"
              onClick={e => {
                if (item.href === '#') {
                  e.preventDefault();
                  scrollToTop();
                }
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right side: Theme Toggle + Mobile Menu */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-foreground p-2 focus:outline-none z-50" 
            onClick={toggleMenu} 
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay - Full Page */}
      <div 
        className={`fixed inset-0 z-40 bg-background flex flex-col md:hidden transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-foreground/5 rounded-full" />
        <div className="absolute bottom-32 right-8 w-24 h-24 border border-foreground/5 rotate-45" />
        <div className="absolute top-1/3 right-16 w-16 h-16 bg-foreground/[0.02] rounded-2xl" />
        
        {/* Close button area at top */}
        <div className="flex justify-between items-center p-6 pt-5">
          <span className="text-2xl font-bold text-foreground">Soul X</span>
          <button 
            className="text-foreground p-2 focus:outline-none hover:bg-foreground/5 rounded-full transition-colors" 
            onClick={closeMenu} 
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
        </div>
        
        {/* Centered navigation */}
        <nav className="flex-1 flex flex-col justify-center items-center space-y-8 px-8">
          {navItems.map((item, index) => (
            <a 
              key={item.label} 
              href={item.href} 
              className={`text-4xl sm:text-5xl font-display font-medium text-foreground hover:text-primary transition-all duration-300 transform ${
                isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ 
                transitionDelay: isMenuOpen ? `${index * 100 + 200}ms` : '0ms'
              }}
              onClick={e => {
                if (item.href === '#') {
                  e.preventDefault();
                  scrollToTop();
                }
                closeMenu();
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
        
        {/* Footer in mobile menu */}
        <div className={`p-8 text-center transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`} style={{ transitionDelay: isMenuOpen ? '600ms' : '0ms' }}>
          <p className="text-sm text-muted-foreground">Let's create something amazing together</p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;