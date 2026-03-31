"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Target, Lightbulb, Activity, Zap } from "lucide-react";
import { MOCK_ANALYTICS } from "@/lib/mock-data";
import { SectionHeader, StatCard, ProgressBar } from "@/components/UI";
import { BarChart, Heatmap } from "@/components/Charts";

export default function Analytics() {
  const { skillGrowth, strengths, weaknesses, recommendations, totalProjects, totalSkills, averageScore, weeklyActivity } = MOCK_ANALYTICS;
  const uniqueSkills = [...new Set(skillGrowth.map((d) => d.skill))];
  const weeklyLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const latestScores = uniqueSkills.map((skill) => {
    const points = skillGrowth.filter((d) => d.skill === skill);
    const latest = points[points.length - 1];
    const colors: Record<string, string> = { Frontend: "neon-green", Backend: "neon-magenta", ML: "neon-cyan", DSA: "white", Security: "neon-magenta" };
    return { label: skill, value: latest?.score || 0, color: colors[skill] || "neon-cyan" };
  });

  const radarData = [
    { label: "Efficiency", value: 96 }, { label: "Creativity", value: 91 },
    { label: "Problem Solving", value: 95 }, { label: "Code Quality", value: 93 },
    { label: "Security", value: 88 }, { label: "Design", value: 85 },
  ];

  return (
    <main className="min-h-screen bg-obsidian text-foreground pt-20 pb-16 px-6 laser-grid">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="border-b-2 border-border-subtle pb-8">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-6 h-6 text-neon-green" />
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Analytics</h1>
          </div>
          <p className="font-mono text-neutral-400 max-w-2xl">Track your skill trajectory. Identify strengths, address weaknesses, and follow data-driven recommendations.</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Skills" value={totalSkills} color="neon-cyan" icon={<Target className="w-4 h-4" />} />
          <StatCard label="Projects" value={totalProjects} color="neon-green" icon={<Activity className="w-4 h-4" />} />
          <StatCard label="Avg Score" value={`${averageScore}%`} color="neon-magenta" icon={<TrendingUp className="w-4 h-4" />} />
          <StatCard label="This Week" value={weeklyActivity.reduce((a, b) => a + b, 0)} color="white" icon={<Zap className="w-4 h-4" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Skill Growth */}
          <div className="border border-border-subtle bg-surface p-6">
            <h3 className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-6">Skill Growth Over Time</h3>
            <div className="space-y-4">
              {uniqueSkills.map((skill) => {
                const points = skillGrowth.filter((d) => d.skill === skill);
                const colors: Record<string, string> = { Frontend: "neon-green", Backend: "neon-magenta", ML: "neon-cyan", DSA: "white", Security: "neon-magenta" };
                const color = colors[skill] || "neon-cyan";
                return (
                  <div key={skill}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-neutral-400">{skill}</span>
                      <span className={`font-mono text-xs font-bold text-${color}`}>{points[points.length - 1]?.score || 0}%</span>
                    </div>
                    <ProgressBar value={points[points.length - 1]?.score || 0} color={color} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Radar - simplified as bar chart since SVG sizing is complex */}
          <div className="border border-border-subtle bg-surface p-6">
            <h3 className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-6">Capability Profile</h3>
            <div className="space-y-3">
              {radarData.map((d) => (
                <div key={d.label}>
                  <div className="flex justify-between mb-1">
                    <span className="font-mono text-xs text-neutral-400">{d.label}</span>
                    <span className="font-mono text-xs text-neon-cyan">{d.value}%</span>
                  </div>
                  <ProgressBar value={d.value} color="neon-cyan" showLabel={false} />
                </div>
              ))}
            </div>
          </div>

          {/* Bar chart */}
          <div className="border border-border-subtle bg-surface p-6">
            <h3 className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-6">Current Skill Levels</h3>
            <BarChart data={latestScores} maxValue={100} />
          </div>

          {/* Activity */}
          <div className="border border-border-subtle bg-surface p-6">
            <h3 className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-6">Weekly Activity</h3>
            <Heatmap data={weeklyActivity} labels={weeklyLabels} className="mb-4" />
            <div className="flex gap-2 mt-6">
              {weeklyActivity.map((value, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-obsidian border border-border-subtle" style={{ height: `${value * 12}px` }}>
                    <div className="w-full h-full bg-neon-cyan/40" />
                  </div>
                  <span className="font-mono text-[9px] text-neutral-600">{weeklyLabels[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-neon-green/20 bg-neon-green/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-neon-green" />
              <h3 className="font-mono text-sm uppercase tracking-widest text-neon-green">Strengths</h3>
            </div>
            <div className="space-y-2">
              {strengths.map((s, i) => (
                <div key={i} className="flex items-center gap-2 py-2 px-3 bg-obsidian border border-border-subtle">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                  <span className="font-mono text-xs text-neutral-300">{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-neon-magenta/20 bg-neon-magenta/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-neon-magenta" />
              <h3 className="font-mono text-sm uppercase tracking-widest text-neon-magenta">Growth Areas</h3>
            </div>
            <div className="space-y-2">
              {weaknesses.map((w, i) => (
                <div key={i} className="flex items-center gap-2 py-2 px-3 bg-obsidian border border-border-subtle">
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-magenta" />
                  <span className="font-mono text-xs text-neutral-300">{w}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="border border-border-subtle bg-surface p-6">
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <h3 className="font-mono text-sm uppercase tracking-widest">Personalized Recommendations</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-obsidian border border-border-subtle p-4">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs text-neon-cyan font-bold mt-0.5">0{i + 1}</span>
                  <p className="font-mono text-xs text-neutral-300 leading-relaxed">{rec}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
