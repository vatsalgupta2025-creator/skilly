"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Award, Brain, Layout, Server, Palette, CheckCircle2, ExternalLink } from "lucide-react";
import { MOCK_BADGES, SKILL_CATEGORIES, CATEGORY_COLORS } from "@/lib/mock-data";
import { SectionHeader, FilterBar, StatCard } from "@/components/UI";
import { LevelBadge } from "@/components/Badges";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  brain: Brain, layout: Layout, server: Server, palette: Palette,
};

export default function Badges() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBadges = useMemo(() => {
    return MOCK_BADGES.filter((badge) => {
      const matchesSearch = badge.name.toLowerCase().includes(searchQuery.toLowerCase()) || badge.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || badge.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const levelCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    MOCK_BADGES.forEach((b) => { counts[b.level] = (counts[b.level] || 0) + 1; });
    return counts;
  }, []);

  return (
    <main className="min-h-screen bg-obsidian text-foreground pt-20 pb-16 px-6 laser-grid">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="border-b-2 border-border-subtle pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-neon-cyan" />
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Skill Badges</h1>
          </div>
          <p className="font-mono text-neutral-400 max-w-2xl">Micro-credentials earned through demonstrated skill. Each badge represents verified capability.</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard label="Total" value={MOCK_BADGES.length} color="neon-cyan" />
          <StatCard label="Master" value={levelCounts["Master"] || 0} color="yellow-400" />
          <StatCard label="Expert" value={levelCounts["Expert"] || 0} color="neon-magenta" />
          <StatCard label="Advanced" value={levelCounts["Advanced"] || 0} color="neon-green" />
          <StatCard label="Intermediate" value={levelCounts["Intermediate"] || 0} color="white" />
        </div>

        <FilterBar searchQuery={searchQuery} onSearchChange={setSearchQuery} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} categories={SKILL_CATEGORIES} />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBadges.map((badge, i) => {
            const Icon = ICON_MAP[badge.icon] || Award;
            const color = CATEGORY_COLORS[badge.category] || "neon-cyan";
            return (
              <motion.div key={badge.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="group relative border border-border-subtle bg-surface p-6 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 opacity-5 group-hover:opacity-15 transition-opacity blur-3xl" style={{ backgroundColor: `var(--color-${color})` }} />
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 border bg-obsidian flex items-center justify-center" style={{ borderColor: `var(--color-${color})33`, color: `var(--color-${color})` }}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <LevelBadge level={badge.level} />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-tight mb-2">{badge.name}</h3>
                <p className="font-mono text-xs text-neutral-400 leading-relaxed mb-4">{badge.description}</p>
                <div className="bg-obsidian border border-border-subtle p-3 mb-4">
                  <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Criteria</span>
                  <p className="font-mono text-xs text-neutral-300 mt-1">{badge.criteria}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neon-green" />
                    <span className="font-mono text-xs text-neutral-500">{badge.verificationCount} verifications</span>
                  </div>
                  <span className="font-mono text-xs text-neutral-600">{badge.earnedAt}</span>
                </div>
                <button className="mt-4 w-full py-2 border border-border-subtle text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-neon-cyan hover:border-neon-cyan/30 transition-colors flex items-center justify-center gap-2">
                  <ExternalLink className="w-3 h-3" /> Share Badge
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
