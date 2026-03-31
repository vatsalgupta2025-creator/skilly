import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold uppercase tracking-tighter">{title}</h2>
        {subtitle && <p className="text-neutral-500 font-mono text-sm mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-4">
        {action}
        <div className="h-px bg-border-subtle w-24 hidden md:block" />
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  color?: string;
  className?: string;
}

export function StatCard({ label, value, icon, color = "neon-cyan", className }: StatCardProps) {
  return (
    <div className={cn("border border-border-subtle bg-surface p-5 flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">{label}</span>
        {icon && <span className="text-neutral-500">{icon}</span>}
      </div>
      <span className={cn("text-3xl font-black tracking-tighter", `text-${color}`)}>{value}</span>
    </div>
  );
}

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({ value, max = 100, color = "neon-cyan", showLabel = true, className }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex-1 h-1.5 bg-surface border border-border-subtle overflow-hidden">
        <div
          className={cn("h-full transition-all duration-500", `bg-${color}`)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="font-mono text-xs text-neutral-500 w-10 text-right">{Math.round(percentage)}%</span>
      )}
    </div>
  );
}

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: readonly string[];
  selectedLevel?: string;
  onLevelChange?: (level: string) => void;
  levels?: readonly string[];
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  selectedLevel,
  onLevelChange,
  levels,
}: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 bg-surface border border-border-subtle text-foreground font-mono text-sm focus:border-neon-cyan focus:outline-none placeholder:text-neutral-600"
        />
      </div>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 bg-surface border border-border-subtle text-foreground font-mono text-sm focus:border-neon-cyan focus:outline-none"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>
        ))}
      </select>
      {levels && onLevelChange && (
        <select
          value={selectedLevel}
          onChange={(e) => onLevelChange(e.target.value)}
          className="px-4 py-2 bg-surface border border-border-subtle text-foreground font-mono text-sm focus:border-neon-cyan focus:outline-none"
        >
          {levels.map((lvl) => (
            <option key={lvl} value={lvl}>{lvl === "All" ? "All Levels" : lvl}</option>
          ))}
        </select>
      )}
    </div>
  );
}
