"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export function StarRating({ rating, maxRating = 5, size = "md", interactive = false, onChange, className }: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  const sizeClasses = { sm: "w-3 h-3", md: "w-4 h-4", lg: "w-5 h-5" };

  return (
    <div className={cn("flex gap-0.5", className)}>
      {Array.from({ length: maxRating }).map((_, i) => {
        const filled = interactive ? i < (hovered || rating) : i < rating;
        return (
          <Star
            key={i}
            className={cn(
              sizeClasses[size],
              filled ? "fill-neon-cyan text-neon-cyan" : "fill-none text-neutral-600",
              interactive && "cursor-pointer transition-colors"
            )}
            onClick={() => interactive && onChange?.(i + 1)}
            onMouseEnter={() => interactive && setHovered(i + 1)}
            onMouseLeave={() => interactive && setHovered(0)}
          />
        );
      })}
    </div>
  );
}
