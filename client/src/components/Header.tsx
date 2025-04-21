import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Box, MenuIcon, XIcon } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              <span className="flex items-center gap-2">
                <Box className="rotate-45 text-accent h-6 w-6" />
                GodivaTech
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={toggleMenu}
              className="text-neutral-700 hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium hover:text-primary transition duration-150 ${
                isActive("/") ? "text-primary" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`font-medium hover:text-primary transition duration-150 ${
                isActive("/about") ? "text-primary" : ""
              }`}
            >
              About
            </Link>
            <Link
              href="/services"
              className={`font-medium hover:text-primary transition duration-150 ${
                isActive("/services") ? "text-primary" : ""
              }`}
            >
              Services
            </Link>
            <Link
              href="/portfolio"
              className={`font-medium hover:text-primary transition duration-150 ${
                isActive("/portfolio") ? "text-primary" : ""
              }`}
            >
              Portfolio
            </Link>
            <Link
              href="/blog"
              className={`font-medium hover:text-primary transition duration-150 ${
                isActive("/blog") ? "text-primary" : ""
              }`}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`font-medium hover:text-primary transition duration-150 ${
                isActive("/contact") ? "text-primary" : ""
              }`}
            >
              Contact
            </Link>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/contact">Get Started</Link>
            </Button>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-4 space-y-1 bg-white">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-md font-medium ${
                  isActive("/")
                    ? "text-primary"
                    : "hover:bg-neutral-100"
                }`}
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`block px-3 py-2 rounded-md font-medium ${
                  isActive("/about")
                    ? "text-primary"
                    : "hover:bg-neutral-100"
                }`}
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                href="/services"
                className={`block px-3 py-2 rounded-md font-medium ${
                  isActive("/services")
                    ? "text-primary"
                    : "hover:bg-neutral-100"
                }`}
                onClick={toggleMenu}
              >
                Services
              </Link>
              <Link
                href="/portfolio"
                className={`block px-3 py-2 rounded-md font-medium ${
                  isActive("/portfolio")
                    ? "text-primary"
                    : "hover:bg-neutral-100"
                }`}
                onClick={toggleMenu}
              >
                Portfolio
              </Link>
              <Link
                href="/blog"
                className={`block px-3 py-2 rounded-md font-medium ${
                  isActive("/blog")
                    ? "text-primary"
                    : "hover:bg-neutral-100"
                }`}
                onClick={toggleMenu}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className={`block px-3 py-2 rounded-md font-medium ${
                  isActive("/contact")
                    ? "text-primary"
                    : "hover:bg-neutral-100"
                }`}
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-md text-white bg-primary font-medium"
                onClick={toggleMenu}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
