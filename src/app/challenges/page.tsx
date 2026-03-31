"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Target, Clock, Users, CheckCircle2, Lock, Play, Trophy, Zap, ArrowRight } from "lucide-react";
import { MOCK_CHALLENGES, SKILL_CATEGORIES } from "@/lib/mock-data";
import { SectionHeader, FilterBar, StatCard, ProgressBar } from "@/components/UI";
import { LevelBadge } from "@/components/Badges";

export default function Challenges() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);

  const filteredChallenges = useMemo(() => {
    return MOCK_CHALLENGES.filter((challenge) => {
      const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) || challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || challenge.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const completed = MOCK_CHALLENGES.filter((c) => c.status === "completed").length;

  const selectedChallengeData = useMemo(() => {
    if (!selectedChallenge) return null;
    return MOCK_CHALLENGES.find((c) => c.id === selectedChallenge);
  }, [selectedChallenge]);

  const statusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="w-4 h-4 text-neon-green" />;
      case "in_progress": return <Play className="w-4 h-4 text-neon-cyan" />;
      case "locked": return <Lock className="w-4 h-4 text-neutral-600" />;
      default: return <Target className="w-4 h-4 text-neutral-400" />;
    }
  };

  return (
    <main className="min-h-screen bg-obsidian text-foreground pt-20 pb-16 px-6 laser-grid">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="border-b-2 border-border-subtle pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-neon-magenta" />
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Challenges</h1>
          </div>
          <p className="font-mono text-neutral-400 max-w-2xl">Real-world tasks that verify your skills. Complete challenges to earn verified credentials.</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Completed" value={completed} color="neon-green" icon={<CheckCircle2 className="w-4 h-4" />} />
          <StatCard label="In Progress" value={MOCK_CHALLENGES.filter(c => c.status === "in_progress").length} color="neon-cyan" icon={<Play className="w-4 h-4" />} />
          <StatCard label="Available" value={MOCK_CHALLENGES.filter(c => c.status === "available").length} color="white" icon={<Target className="w-4 h-4" />} />
          <StatCard label="Total" value={MOCK_CHALLENGES.length} color="neon-magenta" icon={<Trophy className="w-4 h-4" />} />
        </div>

        <FilterBar searchQuery={searchQuery} onSearchChange={setSearchQuery} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} categories={SKILL_CATEGORIES} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <SectionHeader title="Challenges" subtitle={`${filteredChallenges.length} challenges`} />
            {filteredChallenges.map((challenge, i) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => challenge.status !== "locked" && setSelectedChallenge(challenge.id)}
                className={`border bg-surface p-5 transition-all duration-200 ${challenge.status === "locked" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${selectedChallenge === challenge.id ? "border-neon-cyan" : "border-border-subtle hover:border-neutral-600"}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {statusIcon(challenge.status)}
                    <div>
                      <h3 className="text-lg font-bold uppercase tracking-tight">{challenge.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <LevelBadge level={challenge.difficulty} />
                        <span className="px-1.5 py-0.5 border border-border-subtle text-[10px] font-mono uppercase text-neutral-400">{challenge.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-mono text-xs">{challenge.timeLimit}</span>
                  </div>
                </div>
                <p className="font-mono text-xs text-neutral-400 leading-relaxed mb-4">{challenge.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {challenge.skillsVerified.map((skill) => (
                    <span key={skill} className="px-2 py-0.5 border border-neon-cyan/20 text-[10px] font-mono text-neon-cyan uppercase">{skill}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-neutral-500" />
                      <span className="font-mono text-xs text-neutral-500">{challenge.submissions}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-neutral-500" />
                      <span className="font-mono text-xs text-neutral-500">{challenge.completionRate}% pass</span>
                    </div>
                  </div>
                  {challenge.status !== "locked" && <ArrowRight className="w-4 h-4 text-neutral-500" />}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            <SectionHeader title="Details" />
            {selectedChallengeData ? (
              <motion.div key={selectedChallengeData.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="border border-border-subtle bg-surface p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {statusIcon(selectedChallengeData.status)}
                    <span className={`font-mono text-xs uppercase tracking-widest ${selectedChallengeData.status === "completed" ? "text-neon-green" : selectedChallengeData.status === "in_progress" ? "text-neon-cyan" : "text-neutral-400"}`}>
                      {selectedChallengeData.status.replace("_", " ")}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-2">{selectedChallengeData.title}</h3>
                  <p className="font-mono text-sm text-neutral-400 mb-6">{selectedChallengeData.description}</p>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-neutral-500">Difficulty</span>
                      <LevelBadge level={selectedChallengeData.difficulty} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-neutral-500">Time Limit</span>
                      <span className="font-mono text-sm text-neutral-300">{selectedChallengeData.timeLimit}</span>
                    </div>
                    <div>
                      <span className="font-mono text-xs text-neutral-500 block mb-2">Pass Rate</span>
                      <ProgressBar value={selectedChallengeData.completionRate} color={selectedChallengeData.completionRate > 60 ? "neon-green" : selectedChallengeData.completionRate > 40 ? "neon-cyan" : "neon-magenta"} />
                    </div>
                  </div>
                  <h4 className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-3">Skills Verified</h4>
                  <div className="space-y-2 mb-6">
                    {selectedChallengeData.skillsVerified.map((skill) => (
                      <div key={skill} className="flex items-center gap-2 py-2 px-3 bg-obsidian border border-border-subtle">
                        <Zap className="w-3.5 h-3.5 text-neon-cyan" />
                        <span className="font-mono text-xs text-neutral-300">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {selectedChallengeData.status === "available" && (
                  <button className="w-full py-3 bg-neon-cyan text-obsidian font-bold uppercase tracking-widest hover:bg-neon-cyan/90 transition-colors flex items-center justify-center gap-2">
                    <Play className="w-4 h-4" /> Start Challenge
                  </button>
                )}
                {selectedChallengeData.status === "completed" && (
                  <div className="border border-neon-green/30 bg-neon-green/5 p-4 text-center">
                    <CheckCircle2 className="w-6 h-6 text-neon-green mx-auto mb-2" />
                    <span className="font-mono text-sm text-neon-green uppercase tracking-widest">Completed</span>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="border border-border-subtle bg-surface p-8 text-center">
                <Target className="w-10 h-10 text-neutral-700 mx-auto mb-3" />
                <p className="font-mono text-sm text-neutral-500">Select a challenge to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
