import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, id, type = "text", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-xs font-semibold uppercase tracking-wider text-(--muted-foreground) mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          className={cn(
            "w-full px-3.5 py-2.5 rounded-lg border bg-(--card-bg) text-(--foreground) placeholder:text-(--muted-foreground)/60 text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed",
            error ? "border-red-500 focus:ring-red-500" : "border-(--border-color)",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
