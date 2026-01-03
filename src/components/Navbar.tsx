
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Vision', href: '#vision' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 md:py-5 transition-all duration-500",
        isScrolled 
          ? "bg-background/90 backdrop-blur-md border-b border-border" 
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <a 
          href="#" 
          className="flex items-center space-x-2"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          aria-label="SoulX"
        >
          <span className="text-2xl font-display font-semibold tracking-tight text-foreground">
            SoulX
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10">
          {navItems.map((item) => (
            <a 
              key={item.label}
              href={item.href} 
              className="nav-link text-sm tracking-wide"
              onClick={(e) => {
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

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-foreground p-2 focus:outline-none" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "fixed inset-0 z-40 bg-background flex flex-col pt-20 px-6 md:hidden transition-all duration-300 ease-in-out",
        isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        <nav className="flex flex-col space-y-6 items-center mt-8">
          {navItems.map((item) => (
            <a 
              key={item.label}
              href={item.href} 
              className="text-2xl font-display font-medium py-2 text-foreground" 
              onClick={(e) => {
                if (item.href === '#') {
                  e.preventDefault();
                  scrollToTop();
                }
                setIsMenuOpen(false);
                document.body.style.overflow = '';
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
