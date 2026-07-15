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
    teach: "bg-primary/10 text-primary border-primary/20",
    learn: "bg-accent/10 text-accent border-accent/20",
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
