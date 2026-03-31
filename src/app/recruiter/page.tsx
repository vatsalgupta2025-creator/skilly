"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Users, ArrowUpRight, CheckCircle2, Shield, Award } from "lucide-react";
import { MOCK_USERS, SKILL_CATEGORIES, SKILL_LEVELS } from "@/lib/mock-data";
import { SectionHeader, FilterBar, StatCard } from "@/components/UI";
import { LevelBadge, SkillBadge } from "@/components/Badges";

export default function Recruiter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const students = useMemo(() => MOCK_USERS.filter((u) => u.role === "student"), []);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.handle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || student.skills.some((s) => s.category === selectedCategory);
      const matchesLevel = selectedLevel === "All" || student.skills.some((s) => s.level === selectedLevel);
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, selectedCategory, selectedLevel, students]);

  const selectedUserData = useMemo(() => {
    if (!selectedUser) return null;
    return MOCK_USERS.find((u) => u.id === selectedUser);
  }, [selectedUser]);

  return (
    <main className="min-h-screen bg-obsidian text-foreground pt-20 pb-16 px-6 laser-grid">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="border-b-2 border-border-subtle pb-8">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-neon-magenta" />
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Recruiter View</h1>
          </div>
          <p className="font-mono text-neutral-400 max-w-2xl">Discover talent by verified skills, not GPA. Search candidates by demonstrated capabilities and peer-validated achievements.</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Candidates" value={filteredStudents.length} color="neon-cyan" />
          <StatCard label="Total Skills" value={filteredStudents.reduce((a, s) => a + s.skills.length, 0)} color="neon-green" />
          <StatCard label="Projects" value={filteredStudents.reduce((a, s) => a + s.projects, 0)} color="neon-magenta" />
          <StatCard label="Verified" value={filteredStudents.reduce((a, s) => a + s.verifiedAchievements, 0)} color="white" />
        </div>

        <FilterBar searchQuery={searchQuery} onSearchChange={setSearchQuery} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} categories={SKILL_CATEGORIES} selectedLevel={selectedLevel} onLevelChange={setSelectedLevel} levels={SKILL_LEVELS} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <SectionHeader title="Candidates" subtitle={`${filteredStudents.length} matching`} />
            {filteredStudents.map((student, i) => (
              <motion.div key={student.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} onClick={() => setSelectedUser(student.id)} className={`border bg-surface p-5 cursor-pointer transition-all duration-200 ${selectedUser === student.id ? "border-neon-cyan" : "border-border-subtle hover:border-neutral-600"}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center font-mono text-xl font-bold text-neon-cyan">{student.avatar}</div>
                    <div>
                      <h3 className="text-lg font-bold uppercase tracking-tight">{student.name}</h3>
                      <span className="font-mono text-xs text-neutral-500">@{student.handle}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-neon-green" />
                    <span className="font-mono text-xs text-neon-green">{student.verifiedAchievements} verified</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {student.skills.slice(0, 4).map((skill) => (
                    <SkillBadge key={skill.id} name={skill.name} level={skill.level} size="sm" />
                  ))}
                  {student.skills.length > 4 && <span className="px-2 py-0.5 text-[10px] font-mono text-neutral-500 border border-border-subtle">+{student.skills.length - 4}</span>}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
                  <div className="flex gap-4">
                    <span className="font-mono text-xs text-neutral-500">{student.projects} projects</span>
                    <span className="font-mono text-xs text-neutral-500">{student.badges.length} badges</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            <SectionHeader title="Profile" />
            {selectedUserData ? (
              <motion.div key={selectedUserData.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="border border-border-subtle bg-surface p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center font-mono text-2xl font-bold text-neon-cyan">{selectedUserData.avatar}</div>
                    <div>
                      <h3 className="text-xl font-bold uppercase tracking-tight">{selectedUserData.name}</h3>
                      <span className="font-mono text-sm text-neutral-500">@{selectedUserData.handle}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-neon-green" />
                        <span className="font-mono text-xs text-neon-green">{selectedUserData.verifiedAchievements} verified</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-obsidian border border-border-subtle p-3 text-center">
                      <div className="text-xl font-black text-neon-cyan">{selectedUserData.skills.length}</div>
                      <div className="text-[10px] font-mono text-neutral-500 uppercase">Skills</div>
                    </div>
                    <div className="bg-obsidian border border-border-subtle p-3 text-center">
                      <div className="text-xl font-black text-neon-green">{selectedUserData.projects}</div>
                      <div className="text-[10px] font-mono text-neutral-500 uppercase">Projects</div>
                    </div>
                    <div className="bg-obsidian border border-border-subtle p-3 text-center">
                      <div className="text-xl font-black text-neon-magenta">{selectedUserData.badges.length}</div>
                      <div className="text-[10px] font-mono text-neutral-500 uppercase">Badges</div>
                    </div>
                  </div>
                  <h4 className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-3">Skills</h4>
                  <div className="space-y-3">
                    {selectedUserData.skills.map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <LevelBadge level={skill.level} className="text-[8px]" />
                          <span className="font-mono text-xs text-neutral-300">{skill.name}</span>
                        </div>
                        <span className="font-mono text-xs text-neutral-500">{skill.confidence}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                {selectedUserData.badges.length > 0 && (
                  <div className="border border-border-subtle bg-surface p-6">
                    <h4 className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-3">Badges</h4>
                    <div className="space-y-2">
                      {selectedUserData.badges.map((badge) => (
                        <div key={badge.id} className="flex items-center justify-between py-2 px-3 bg-obsidian border border-border-subtle">
                          <div className="flex items-center gap-2">
                            <Award className="w-3.5 h-3.5 text-neon-cyan" />
                            <span className="font-mono text-xs text-neutral-300">{badge.name}</span>
                          </div>
                          <LevelBadge level={badge.level} className="text-[8px]" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <button className="w-full py-3 bg-neon-magenta text-obsidian font-bold uppercase tracking-widest hover:bg-neon-magenta/90 transition-colors text-sm">Contact Candidate</button>
              </motion.div>
            ) : (
              <div className="border border-border-subtle bg-surface p-8 text-center">
                <Users className="w-10 h-10 text-neutral-700 mx-auto mb-3" />
                <p className="font-mono text-sm text-neutral-500">Select a candidate to view profile</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
