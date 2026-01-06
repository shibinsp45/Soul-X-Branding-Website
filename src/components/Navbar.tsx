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

      {/* Mobile Navigation Overlay */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-background/98 backdrop-blur-sm flex flex-col pt-24 px-6 md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen 
            ? "opacity-100 visible" 
            : "opacity-0 invisible pointer-events-none"
        )}
      >
        <nav className="flex flex-col space-y-6 items-center mt-8">
          {navItems.map(item => (
            <a 
              key={item.label} 
              href={item.href} 
              className="text-2xl font-display font-medium py-2 text-foreground hover:text-foreground/70 transition-colors"
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
      </div>
    </header>
  );
};

export default Navbar;