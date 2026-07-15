import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  variant?: "teach" | "learn" | "neutral";
  className?: string;
}

export function SkillBadge({
  children,
  variant = "neutral",
  className,
}: Props) {
  const styles = {
    teach: "bg-primary-glow/10 text-primary-glow border-primary-glow/20",
    learn: "bg-destructive/10 text-destructive border-destructive/20",
    neutral: "bg-muted text-muted-foreground border-border",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}