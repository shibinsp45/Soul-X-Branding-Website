import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (!isMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isMenuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const scrollToSection = (href: string) => {
    if (href === "#") {
      scrollToTop();
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - navHeight, behavior: "smooth" });
    }

    setIsMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 md:py-5 transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center space-x-2"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          aria-label="SoulX"
        >
          <span className="tracking-tight text-foreground text-3xl font-bold font-sans">
            Soul X
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link text-sm tracking-wide"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right side: Theme Toggle + Mobile Menu */}
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "transition-opacity duration-300",
              isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
          >
            <ThemeToggle />
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-foreground hover:bg-foreground/5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Open menu</span>
            <span className="relative w-6 h-5 flex flex-col justify-between">
              <span className="block h-0.5 w-6 bg-foreground rounded-full" />
              <span className="block h-0.5 w-6 bg-foreground rounded-full" />
              <span className="block h-0.5 w-6 bg-foreground rounded-full" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu (full screen) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[100] md:hidden bg-background"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="container max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 pt-4">
              <a
                href="#"
                className="flex items-center space-x-2"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
                aria-label="SoulX"
              >
                <span className="tracking-tight text-foreground text-3xl font-bold font-sans">
                  Soul X
                </span>
              </a>

              <button
                type="button"
                className="p-2 rounded-lg border border-border bg-background hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-foreground" />
              </button>
            </div>

            <motion.nav
              className="h-[calc(100dvh-80px)] flex flex-col items-center justify-center gap-8 px-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="text-4xl sm:text-5xl font-display font-medium text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg px-4 py-2 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 + index * 0.05, ease: "easeOut" }}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
