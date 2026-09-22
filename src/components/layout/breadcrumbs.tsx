import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-2 text-xs md:text-sm text-(--muted-foreground) ${className}`}
    >
      <Link
        href="/"
        className="flex items-center hover:text-(--foreground) transition-colors"
        aria-label="Home"
      >
        <Home className="w-3.5 h-3.5 mr-1" />
        <span>Home</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-3.5 h-3.5 text-(--border-color) shrink-0" />
            {isLast || !item.href ? (
              <span
                className="font-medium text-(--foreground) truncate max-w-50 md:max-w-xs"
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-(--foreground) transition-colors truncate max-w-37.5 md:max-w-xs"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
