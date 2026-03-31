"use client";

import { cn } from "@/lib/utils";

interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  maxValue?: number;
  className?: string;
}

export function BarChart({ data, maxValue = 100, className }: BarChartProps) {
  return (
    <div className={cn("flex items-end gap-2 h-40", className)}>
      {data.map((item, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full flex flex-col justify-end h-32">
            <div
              className={cn("w-full transition-all duration-500", `bg-${item.color || "neon-cyan"}`)}
              style={{ height: `${(item.value / maxValue) * 100}%`, opacity: 0.8 }}
            />
          </div>
          <span className="font-mono text-[9px] text-neutral-500 text-center truncate w-full">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

interface HeatmapProps {
  data: number[];
  labels: string[];
  className?: string;
}

export function Heatmap({ data, labels, className }: HeatmapProps) {
  const max = Math.max(...data);

  return (
    <div className={cn("flex gap-1", className)}>
      {data.map((value, i) => {
        const intensity = max > 0 ? value / max : 0;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full aspect-square border border-border-subtle transition-colors"
              style={{
                backgroundColor: `rgba(0, 240, 255, ${intensity * 0.6})`,
              }}
              title={`${labels[i]}: ${value}`}
            />
            <span className="font-mono text-[8px] text-neutral-600">{labels[i]}</span>
          </div>
        );
      })}
    </div>
  );
}
