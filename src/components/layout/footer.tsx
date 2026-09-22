import Link from "next/link";
import { navigation, siteConfig } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-(--border-color) bg-(--bg-secondary)"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Explore */}
            <div>
              <h3
                className="text-sm font-semibold text-(--text-primary) uppercase tracking-wider mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Explore
              </h3>
              <ul className="space-y-3">
                {navigation.footer.explore.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learn */}
            <div>
              <h3
                className="text-sm font-semibold text-(--text-primary) uppercase tracking-wider mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Learn
              </h3>
              <ul className="space-y-3">
                {navigation.footer.learn.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div>
              <h3
                className="text-sm font-semibold text-(--text-primary) uppercase tracking-wider mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                About
              </h3>
              <ul className="space-y-3">
                {navigation.footer.about.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3
                className="text-sm font-semibold text-(--text-primary) uppercase tracking-wider mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Legal
              </h3>
              <ul className="space-y-3">
                {navigation.footer.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="py-6 border-t border-(--border-color)">
          <p className="text-xs text-(--text-dim) leading-relaxed max-w-4xl">
            {siteConfig.disclaimer}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 border-t border-(--border-color) flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            {/* Logo mark */}
            <svg
              viewBox="0 0 32 32"
              fill="none"
              className="w-6 h-6 opacity-60"
              aria-hidden="true"
            >
              <path
                d="M16 2L4 8v8c0 7.2 5.1 13.9 12 16 6.9-2.1 12-8.8 12-16V8L16 2z"
                stroke="url(#footer-gradient)"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="16" cy="13" r="2" fill="#27B7FF" />
              <line x1="16" y1="15" x2="16" y2="22" stroke="#27B7FF" strokeWidth="1.5" />
              <line x1="11" y1="18" x2="21" y2="18" stroke="#27B7FF" strokeWidth="1.5" />
              <defs>
                <linearGradient id="footer-gradient" x1="4" y1="2" x2="28" y2="26">
                  <stop stopColor="#27B7FF" />
                  <stop offset="1" stopColor="#675CFF" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-sm text-(--text-dim)">
              © {currentYear} CyberLex. All rights reserved.
            </span>
          </div>

          <p className="text-xs text-(--text-dim) text-center sm:text-right">
            Educational platform — not a substitute for professional legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
