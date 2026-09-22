import { Scale } from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface DisclaimerProps {
  variant?: "inline" | "banner" | "compact";
  className?: string;
}

export function Disclaimer({ variant = "inline", className }: DisclaimerProps) {
  if (variant === "compact") {
    return (
      <p className={cn("text-xs text-(--text-dim) leading-relaxed", className)}>
        {siteConfig.disclaimer}
      </p>
    );
  }

  if (variant === "banner") {
    return (
      <div
        className={cn(
          "bg-(--bg-surface) border border-(--border-color) rounded-xl p-4",
          className
        )}
        role="note"
        aria-label="Legal disclaimer"
      >
        <div className="flex items-start gap-3">
          <Scale className="w-4 h-4 text-(--text-dim) mt-0.5 shrink-0" />
          <p className="text-xs text-(--text-dim) leading-relaxed">
            {siteConfig.disclaimer}
          </p>
        </div>
      </div>
    );
  }

  return (
    <aside
      className={cn(
        "border-t border-(--border-color) pt-6 mt-8",
        className
      )}
      role="note"
      aria-label="Legal disclaimer"
    >
      <div className="flex items-start gap-3">
        <Scale className="w-4 h-4 text-(--text-dim) mt-1 shrink-0" />
        <div>
          <h4 className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider mb-1.5">
            Legal Disclaimer
          </h4>
          <p className="text-xs text-(--text-dim) leading-relaxed max-w-3xl">
            {siteConfig.disclaimer}
          </p>
        </div>
      </div>
    </aside>
  );
}
