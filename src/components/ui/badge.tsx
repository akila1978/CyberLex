import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/* ============================================================
   Legal Instrument Badge
   e.g. LAW, REGULATION, TREATY, FRAMEWORK, STANDARD, etc.
   ============================================================ */

type InstrumentType =
  | "LAW"
  | "REGULATION"
  | "DIRECTIVE"
  | "TREATY"
  | "BILL"
  | "PROPOSED_LAW"
  | "GUIDANCE"
  | "STANDARD"
  | "FRAMEWORK"
  | "CASE_LAW"
  | "POLICY";

const instrumentColors: Record<InstrumentType, string> = {
  LAW: "bg-blue-600/20 text-blue-400 border-blue-500/30",
  REGULATION: "bg-indigo-600/20 text-indigo-400 border-indigo-500/30",
  DIRECTIVE: "bg-violet-600/20 text-violet-400 border-violet-500/30",
  TREATY: "bg-emerald-600/20 text-emerald-400 border-emerald-500/30",
  BILL: "bg-yellow-600/20 text-yellow-400 border-yellow-500/30",
  PROPOSED_LAW: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  GUIDANCE: "bg-sky-500/20 text-sky-400 border-sky-500/30",
  STANDARD: "bg-teal-500/20 text-teal-400 border-teal-500/30",
  FRAMEWORK: "bg-cyan-600/20 text-cyan-400 border-cyan-500/30",
  CASE_LAW: "bg-amber-600/20 text-amber-400 border-amber-500/30",
  POLICY: "bg-slate-500/20 text-slate-400 border-slate-500/30",
};

const instrumentLabels: Record<InstrumentType, string> = {
  LAW: "Law",
  REGULATION: "Regulation",
  DIRECTIVE: "Directive",
  TREATY: "Treaty",
  BILL: "Bill",
  PROPOSED_LAW: "Proposed Law",
  GUIDANCE: "Guidance",
  STANDARD: "Standard",
  FRAMEWORK: "Framework",
  CASE_LAW: "Case Law",
  POLICY: "Policy",
};

export function InstrumentBadge({
  type,
  instrument,
  size = "md",
  className,
}: {
  type?: InstrumentType;
  instrument?: InstrumentType;
  size?: "sm" | "md";
  className?: string;
}) {
  const resolvedType = (type || instrument || "LAW") as InstrumentType;
  return (
    <span
      className={cn(
        "inline-flex items-center font-bold uppercase tracking-wider border rounded-md",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-xs",
        instrumentColors[resolvedType],
        className
      )}
    >
      {instrumentLabels[resolvedType]}
    </span>
  );
}

export const LegalInstrumentBadge = InstrumentBadge;

/* ============================================================
   Status Badge
   ============================================================ */

type StatusType =
  | "CURRENT"
  | "AMENDED"
  | "REPEALED"
  | "PROPOSED"
  | "AWAITING_COMMENCEMENT"
  | "UNDER_REVIEW"
  | "ARCHIVED"
  | "DRAFT";

const statusColors: Record<StatusType, string> = {
  CURRENT: "bg-green-500/15 text-green-400 border-green-500/25",
  AMENDED: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
  REPEALED: "bg-red-500/15 text-red-400 border-red-500/25",
  PROPOSED: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  AWAITING_COMMENCEMENT: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  UNDER_REVIEW: "bg-purple-500/15 text-purple-400 border-purple-500/25",
  ARCHIVED: "bg-gray-500/15 text-gray-400 border-gray-500/25",
  DRAFT: "bg-amber-500/15 text-amber-400 border-amber-500/25",
};

const statusLabels: Record<StatusType, string> = {
  CURRENT: "Current",
  AMENDED: "Amended",
  REPEALED: "Repealed",
  PROPOSED: "Proposed",
  AWAITING_COMMENCEMENT: "Awaiting Commencement",
  UNDER_REVIEW: "Under Review",
  ARCHIVED: "Archived",
  DRAFT: "Draft",
};

export function StatusBadge({
  status,
  size = "md",
  className,
}: {
  status: StatusType;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border rounded-full font-semibold",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-xs",
        statusColors[status],
        className
      )}
    >
      <span
        className={cn(
          "rounded-full mr-1.5",
          size === "sm" ? "w-1 h-1" : "w-1.5 h-1.5",
          {
            "bg-green-400": status === "CURRENT",
            "bg-yellow-400": status === "AMENDED",
            "bg-red-400": status === "REPEALED",
            "bg-orange-400": status === "PROPOSED",
            "bg-blue-400": status === "AWAITING_COMMENCEMENT",
            "bg-purple-400": status === "UNDER_REVIEW",
            "bg-gray-400": status === "ARCHIVED",
            "bg-amber-400": status === "DRAFT",
          }
        )}
      />
      {statusLabels[status]}
    </span>
  );
}

/* ============================================================
   Source Quality Badge
   ============================================================ */

type SourceQuality =
  | "PRIMARY"
  | "OFFICIAL_REGULATOR"
  | "INTERNATIONAL_ORG"
  | "ACADEMIC"
  | "SECONDARY";

const sourceIcons: Record<SourceQuality, string> = {
  PRIMARY: "✦",
  OFFICIAL_REGULATOR: "◆",
  INTERNATIONAL_ORG: "◇",
  ACADEMIC: "○",
  SECONDARY: "·",
};

const sourceLabels: Record<SourceQuality, string> = {
  PRIMARY: "Primary Source",
  OFFICIAL_REGULATOR: "Official Regulator",
  INTERNATIONAL_ORG: "International Organization",
  ACADEMIC: "Academic Source",
  SECONDARY: "Secondary Source",
};

const sourceColors: Record<SourceQuality, string> = {
  PRIMARY: "text-accent-blue",
  OFFICIAL_REGULATOR: "text-emerald-400",
  INTERNATIONAL_ORG: "text-accent-purple",
  ACADEMIC: "text-amber-400",
  SECONDARY: "text-(--text-muted)",
};

export function SourceBadge({
  quality,
  className,
}: {
  quality: SourceQuality;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium",
        sourceColors[quality],
        className
      )}
    >
      <span>{sourceIcons[quality]}</span>
      {sourceLabels[quality]}
    </span>
  );
}

/* ============================================================
   Generic Badge
   ============================================================ */

type BadgeVariant = "default" | "info" | "success" | "warning" | "error";

const badgeVariantStyles: Record<BadgeVariant, string> = {
  default: "bg-(--bg-surface) text-(--text-secondary) border-(--border-color)",
  info: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  success: "bg-green-500/15 text-green-400 border-green-500/25",
  warning: "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
  error: "bg-red-500/15 text-red-400 border-red-500/25",
};

export function Badge({
  variant = "default",
  children,
  className,
}: {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-medium border rounded-full",
        badgeVariantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
