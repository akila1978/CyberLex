"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Shield,
  Lock,
  Database,
  FileSearch,
  MessageCircle,
  Terminal,
  CreditCard,
  Brain,
  Copyright,
  CheckCircle,
  Scale,
  ShieldCheck,
  Wallet,
  Users,
  Building,
  Cloud,
  Globe,
} from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";
import { navigation } from "@/config/site";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Lock,
  Database,
  FileSearch,
  MessageCircle,
  Terminal,
  CreditCard,
  Brain,
  Copyright,
  CheckCircle,
  Scale,
  ShieldCheck,
  Wallet,
  Users,
  Building,
  Cloud,
  Globe,
};

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Adjust menu state on route change during render (React 19 recommended pattern)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setMegaMenuOpen(false);
  }

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mega menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node) &&
        megaMenuTriggerRef.current &&
        !megaMenuTriggerRef.current.contains(event.target as Node)
      ) {
        setMegaMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mega menu on Escape
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setMegaMenuOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const topicsItem = navigation.main.find((item) => item.label === "Topics");

  return (
    <>
      {/* Skip Navigation */}
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-(--nav-bg) backdrop-blur-xl border-b border-(--nav-border) shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            className="flex items-center justify-between h-16 lg:h-18"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              aria-label="CyberLex — Home"
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                {/* Shield + Scales icon */}
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  className="w-8 h-8"
                  aria-hidden="true"
                >
                  <path
                    d="M16 2L4 8v8c0 7.2 5.1 13.9 12 16 6.9-2.1 12-8.8 12-16V8L16 2z"
                    fill="url(#shield-gradient)"
                    opacity="0.15"
                  />
                  <path
                    d="M16 2L4 8v8c0 7.2 5.1 13.9 12 16 6.9-2.1 12-8.8 12-16V8L16 2z"
                    stroke="url(#shield-gradient)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <circle cx="16" cy="13" r="2" fill="#27B7FF" />
                  <line
                    x1="16"
                    y1="15"
                    x2="16"
                    y2="22"
                    stroke="#27B7FF"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="11"
                    y1="18"
                    x2="21"
                    y2="18"
                    stroke="#27B7FF"
                    strokeWidth="1.5"
                  />
                  <circle cx="11" cy="18" r="1" fill="#675CFF" />
                  <circle cx="21" cy="18" r="1" fill="#675CFF" />
                  <defs>
                    <linearGradient
                      id="shield-gradient"
                      x1="4"
                      y1="2"
                      x2="28"
                      y2="26"
                    >
                      <stop stopColor="#27B7FF" />
                      <stop offset="1" stopColor="#675CFF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span
                className="text-xl font-bold tracking-tight text-(--text-primary) group-hover:text-accent-blue transition-colors"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                CyberLex
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.main.map((item) => {
                if ("megaMenu" in item && item.megaMenu) {
                  return (
                    <div key={item.label} className="relative">
                      <button
                        ref={megaMenuTriggerRef}
                        onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                        className={cn(
                          "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                          megaMenuOpen || pathname.startsWith("/topics")
                            ? "text-accent-blue bg-accent-blue/10"
                            : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-surface)"
                        )}
                        aria-expanded={megaMenuOpen}
                        aria-haspopup="true"
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "w-3.5 h-3.5 transition-transform duration-200",
                            megaMenuOpen && "rotate-180"
                          )}
                        />
                      </button>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      pathname === item.href
                        ? "text-accent-blue bg-accent-blue/10"
                        : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-surface)"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Link
                href="/search"
                className="p-2 rounded-lg text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-surface) transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </Link>

              <ThemeToggle />

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-surface) transition-colors"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* Mega Menu */}
        {megaMenuOpen && topicsItem && "children" in topicsItem && (
          <div
            ref={megaMenuRef}
            className="hidden lg:block absolute left-0 right-0 top-full bg-(--bg-secondary) border-b border-(--border-color) shadow-xl animate-slide-down"
            role="menu"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-4 gap-4">
                {topicsItem.children.map((topic) => {
                  const IconComponent =
                    "icon" in topic ? iconMap[topic.icon] : null;
                  return (
                    <Link
                      key={topic.href}
                      href={topic.href}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-(--bg-surface) transition-colors group"
                      role="menuitem"
                      onClick={() => setMegaMenuOpen(false)}
                    >
                      {IconComponent && (
                        <div className="w-9 h-9 rounded-lg bg-(--bg-surface) flex items-center justify-center group-hover:bg-accent-blue/10 transition-colors">
                          <IconComponent className="w-4.5 h-4.5 text-(--text-muted) group-hover:text-accent-blue transition-colors" />
                        </div>
                      )}
                      <span className="text-sm font-medium text-(--text-secondary) group-hover:text-(--text-primary) transition-colors">
                        {topic.label}
                      </span>
                    </Link>
                  );
                })}
              </div>
              <div className="mt-6 pt-4 border-t border-(--border-color)">
                <Link
                  href="/topics"
                  className="text-sm font-medium text-accent-blue hover:text-accent-blue/80 transition-colors"
                  onClick={() => setMegaMenuOpen(false)}
                >
                  View all topics →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-(--bg-primary) z-40 overflow-y-auto">
            <div className="px-4 py-6 space-y-1">
              {navigation.main.map((item) => {
                if ("megaMenu" in item && item.megaMenu && "children" in item) {
                  return (
                    <div key={item.label}>
                      <div className="px-4 py-3 text-sm font-semibold text-(--text-muted) uppercase tracking-wider">
                        {item.label}
                      </div>
                      <div className="ml-4 space-y-0.5">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block px-4 py-2.5 text-sm rounded-lg transition-colors",
                              pathname === child.href
                                ? "text-accent-blue bg-accent-blue/10"
                                : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-surface)"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                      pathname === item.href
                        ? "text-accent-blue bg-accent-blue/10"
                        : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-surface)"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
