import React, { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      // Focus the close button when menu opens
      firstFocusableRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMenuOpen]);

  // Handle Escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Focus trap
  const handleTabKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !isMenuOpen) return;
    if (e.shiftKey) {
      if (document.activeElement === firstFocusableRef.current) {
        e.preventDefault();
        lastFocusableRef.current?.focus();
      }
    } else {
      if (document.activeElement === lastFocusableRef.current) {
        e.preventDefault();
        firstFocusableRef.current?.focus();
      }
    }
  }, [isMenuOpen]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    closeMenu();
  };

  // Close menu when clicking overlay background
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeMenu();
    }
  };
  const navItems = [{
    label: 'Home',
    href: '#'
  }, {
    label: 'About',
    href: '#about'
  }, {
    label: 'Projects',
    href: '#projects'
  }, {
    label: 'Contact',
    href: '#contact'
  }];
  return <header className={cn("fixed top-0 left-0 right-0 z-50 py-4 md:py-5 transition-all duration-500", isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent")}>
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2 z-[60]" onClick={e => {
        e.preventDefault();
        scrollToTop();
      }} aria-label="SoulX">
          <span className="tracking-tight text-foreground text-3xl font-bold font-sans">Soul X</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map(item => <a key={item.label} href={item.href} className="nav-link text-sm tracking-wide" onClick={e => {
          if (item.href === '#') {
            e.preventDefault();
            scrollToTop();
          }
        }}>
              {item.label}
            </a>)}
        </nav>

        {/* Right side: Theme Toggle + Mobile Menu */}
        <div className="flex items-center gap-3 z-[60]">
          <div className={cn("transition-opacity duration-300", isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100")}>
            <ThemeToggle />
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-foreground hover:bg-foreground/5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            onClick={toggleMenu}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay - Full Page */}
      <div id="mobile-menu" ref={menuRef} className={cn("fixed inset-0 z-[55] md:hidden transition-all duration-500 ease-out", isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none")} onClick={handleOverlayClick} onKeyDown={handleTabKey} role="dialog" aria-modal="true" aria-label="Mobile navigation menu">
        {/* Dark overlay background */}
        <div className={cn("absolute inset-0 bg-background transition-opacity duration-500", isMenuOpen ? "opacity-100" : "opacity-0")} />
        
        {/* Menu content container */}
        <div className={cn("relative h-full flex flex-col transition-transform duration-500 ease-out", isMenuOpen ? "translate-y-0" : "-translate-y-8")}>
          {/* Header with close button */}
          <div className="flex justify-end items-center px-6 py-4 pt-5">
            <button ref={firstFocusableRef} className="text-foreground p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 hover:bg-foreground/5 rounded-full transition-colors" onClick={closeMenu} aria-label="Close menu">
              <X size={28} />
            </button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-32 h-32 border border-foreground/5 rounded-full pointer-events-none" />
          <div className="absolute bottom-32 right-8 w-24 h-24 border border-foreground/5 rotate-45 pointer-events-none" />
          <div className="absolute top-1/3 right-16 w-16 h-16 bg-foreground/[0.02] rounded-2xl pointer-events-none" />
          
          {/* Centered navigation */}
          <nav className="flex-1 flex flex-col justify-center items-center space-y-8 px-8">
            {navItems.map((item, index) => <a key={item.label} ref={index === navItems.length - 1 ? lastFocusableRef : undefined} href={item.href} className={cn("text-4xl sm:text-5xl font-display font-medium text-foreground hover:text-primary", "focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg px-4 py-2", "transition-all duration-500 ease-out transform", isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0")} style={{
            transitionDelay: isMenuOpen ? `${index * 80 + 150}ms` : '0ms'
          }} onClick={e => {
            if (item.href === '#') {
              e.preventDefault();
              scrollToTop();
            }
            closeMenu();
          }}>
                {item.label}
              </a>)}
          </nav>
          
          {/* Footer in mobile menu */}
          <div className={cn("p-8 text-center transition-all duration-500 ease-out", isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")} style={{
          transitionDelay: isMenuOpen ? '500ms' : '0ms'
        }}>
            <p className="text-sm text-muted-foreground">Let's create something amazing together</p>
          </div>
        </div>
      </div>
    </header>;
};
export default Navbar;