import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  level: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  showLevel?: boolean;
}

export function SkillBadge({ name, level, color = "neon-cyan", size = "md", showLevel = true }: SkillBadgeProps) {
  const sizeClasses = {
    sm: "text-[10px] px-1.5 py-0.5",
    md: "text-xs px-2 py-1",
    lg: "text-sm px-3 py-1.5",
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 border font-mono uppercase tracking-widest",
      sizeClasses[size],
      `border-${color}/30 text-${color} bg-${color}/5`
    )}>
      <div className={cn("w-1.5 h-1.5 rounded-full", `bg-${color}`)} />
      <span>{name}</span>
      {showLevel && <span className="text-neutral-500">// {level}</span>}
    </div>
  );
}

interface LevelBadgeProps {
  level: string;
  className?: string;
}

export function LevelBadge({ level, className }: LevelBadgeProps) {
  const levelColors: Record<string, string> = {
    Beginner: "border-neutral-500/30 text-neutral-400 bg-neutral-500/5",
    Intermediate: "border-neon-cyan/30 text-neon-cyan bg-neon-cyan/5",
    Advanced: "border-neon-green/30 text-neon-green bg-neon-green/5",
    Expert: "border-neon-magenta/30 text-neon-magenta bg-neon-magenta/5",
    Master: "border-yellow-400/30 text-yellow-400 bg-yellow-400/5",
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 border font-mono text-[10px] uppercase tracking-widest font-bold",
      levelColors[level] || levelColors.Beginner,
      className
    )}>
      {level}
    </span>
  );
}
