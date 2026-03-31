"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Brain,
  Award,
  Users,
  MessageSquare,
  BarChart3,
  Target,
  Cpu,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/portfolio", label: "Portfolio", icon: LayoutDashboard },
  { href: "/analyze", label: "Evaluate", icon: Brain },
  { href: "/badges", label: "Badges", icon: Award },
  { href: "/challenges", label: "Challenges", icon: Target },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/reviews", label: "Reviews", icon: MessageSquare },
  { href: "/recruiter", label: "Recruiter", icon: Users },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-mono text-lg tracking-tighter uppercase">
          <Cpu className="w-5 h-5 text-neon-cyan" />
          <span className="hidden sm:inline">Skilly</span>
        </Link>

        <div className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors",
                  isActive
                    ? "text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/30"
                    : "text-neutral-500 hover:text-neutral-300 border border-transparent"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
