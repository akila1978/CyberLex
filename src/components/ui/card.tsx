import { cn } from "@/lib/utils";
import type { ReactNode, HTMLAttributes } from "react";
import Link from "next/link";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

export function Card({
  children,
  hover = true,
  padding = "md",
  className,
  ...props
}: CardProps) {
  const paddingStyles = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "bg-(--bg-surface) border border-(--border-color) rounded-xl",
        "transition-all duration-300",
        hover && "hover:border-(--border-color-hover) hover:shadow-lg",
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function CardLink({ href, children, className }: CardLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "block bg-(--bg-surface) border border-(--border-color) rounded-xl p-6",
        "transition-all duration-300",
        "hover:border-(--border-color-hover) hover:shadow-lg hover:-translate-y-0.5",
        "focus-visible:outline-2 focus-visible:outline-accent-blue",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "font-heading font-semibold text-lg text-(--text-primary)",
        className
      )}
      style={{ fontFamily: "var(--font-heading)" }}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-sm text-(--text-muted) mt-1.5 leading-relaxed", className)}>
      {children}
    </p>
  );
}
