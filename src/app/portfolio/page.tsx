"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, ShieldCheck, Code, FileText, PenTool, Calendar, CheckCircle2, Clock, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { MOCK_PROJECTS, MOCK_SKILLS, SKILL_CATEGORIES } from "@/lib/mock-data";
import { SectionHeader, StatCard, FilterBar, ProgressBar } from "@/components/UI";
import { SkillBadge, LevelBadge } from "@/components/Badges";

export default function Portfolio() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [view, setView] = useState<"skills" | "projects" | "timeline">("skills");
  const [githubProjects, setGithubProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/users/vatsalgupta2025-creator/repos")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const formattedRepos = data.map((repo) => ({
            id: `GH-${repo.id}`,
            title: repo.name.replace(/-/g, ' '),
            description: repo.description || "No description provided.",
            category: repo.language || "Open Source",
            skills: repo.topics && repo.topics.length > 0 ? repo.topics : [(repo.language || "Code")],
            uploadedAt: repo.created_at ? repo.created_at.split('T')[0] : "2026-03-31",
            status: "verified",
            files: [],
            evaluation: null,
            html_url: repo.html_url
          }));
          setGithubProjects(formattedRepos);
        }
      })
      .catch(console.error);
  }, []);

  const filteredSkills = useMemo(() => {
    return MOCK_SKILLS.filter((skill) => {
      const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || skill.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const filteredProjects = useMemo(() => {
    const allProjects = [...githubProjects, ...MOCK_PROJECTS];
    return allProjects.filter((project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (project.description || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, githubProjects]);

  const sortedTimeline = useMemo(() => {
    return [...MOCK_SKILLS].sort((a, b) => new Date(b.verifiedAt).getTime() - new Date(a.verifiedAt).getTime());
  }, []);

  const handleExport = () => {
    const data = JSON.stringify({ skills: filteredSkills, projects: filteredProjects }, null, 2);
    const uri = "data:application/json;charset=utf-8," + encodeURIComponent(data);
    const link = document.createElement("a");
    link.setAttribute("href", uri);
    link.setAttribute("download", "skilly-portfolio.json");
    link.click();
  };

  return (
    <main className="min-h-screen bg-obsidian text-foreground pt-20 pb-16 px-6 laser-grid">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-border-subtle pb-8 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="px-2 py-1 bg-neon-cyan/20 text-neon-cyan text-xs font-mono uppercase border border-neon-cyan/50 tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" />
                Verified Identity
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-2">VATSAL GUPTA</h1>
            <p className="font-mono text-neutral-400 text-sm">
              Identity hash: 0x8a92f...c32 &middot; Proofs Minted: {MOCK_SKILLS.length} &middot; Projects: {MOCK_PROJECTS.length}
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleExport} className="h-10 px-5 bg-surface border border-border-subtle text-foreground font-mono text-xs uppercase tracking-widest hover:border-neon-cyan transition-colors flex items-center gap-2">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <button className="h-10 px-5 bg-neon-green text-obsidian font-mono text-xs uppercase tracking-widest hover:bg-neon-green/90 transition-colors flex items-center gap-2">
              <ArrowUpRight className="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Verified Skills" value={MOCK_SKILLS.length} color="neon-cyan" />
          <StatCard label="Projects" value={MOCK_PROJECTS.length} color="neon-green" />
          <StatCard label="Avg Score" value={`${Math.round(MOCK_SKILLS.reduce((a, s) => a + s.confidence, 0) / MOCK_SKILLS.length)}%`} color="neon-magenta" />
          <StatCard label="Badges" value={8} color="white" />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex gap-1 border border-border-subtle">
            {(["skills", "projects", "timeline"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)} className={`px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${view === v ? "bg-neon-cyan/10 text-neon-cyan" : "text-neutral-500 hover:text-neutral-300"}`}>
                {v}
              </button>
            ))}
          </div>
          <FilterBar searchQuery={searchQuery} onSearchChange={setSearchQuery} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} categories={SKILL_CATEGORIES} />
        </div>

        {view === "skills" && (
          <section>
            <SectionHeader title="Verified Capabilities Index" subtitle={`${filteredSkills.length} skills verified`} />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredSkills.map((skill, i) => (
                <motion.div key={skill.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`group relative border border-border-subtle bg-surface p-5 hover:border-${skill.color} transition-all duration-300 flex flex-col`}>
                  <div className={`absolute -top-10 -right-10 w-24 h-24 bg-${skill.color} opacity-5 blur-3xl group-hover:opacity-15 transition-opacity`} />
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-mono text-xs text-neutral-500">{skill.id}</span>
                    <LevelBadge level={skill.level} />
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-tight mb-1 z-10">{skill.name}</h3>
                  <span className="font-mono text-xs text-neutral-500 uppercase mb-4 z-10">{skill.category}</span>
                  <div className="mt-auto space-y-3 z-10 border-t border-border-subtle pt-3">
                    <p className="font-mono text-xs text-neutral-400 leading-relaxed">
                      <span className="text-neon-cyan">AGENT:</span> {skill.evidence}
                    </p>
                    <div className="bg-obsidian border border-border-subtle p-2.5 font-mono text-[11px] text-neutral-300 relative overflow-x-auto">
                      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${skill.color}`} />
                      <pre className="pl-2 whitespace-pre-wrap">{skill.snippet}</pre>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-neutral-500">Confidence</span>
                      <span className={`font-mono text-sm font-bold text-${skill.color}`}>{skill.confidence}%</span>
                    </div>
                    <ProgressBar value={skill.confidence} color={skill.color} />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {view === "projects" && (
          <section>
            <SectionHeader title="Project Portfolio" subtitle={`${filteredProjects.length} projects submitted`} />
            <div className="space-y-4">
              {filteredProjects.map((project, i) => (
                <motion.div key={project.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="border border-border-subtle bg-surface">
                  <div className="p-5 cursor-pointer flex items-start justify-between gap-4" onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-xs text-neutral-500">{project.id}</span>
                        {project.status === "verified" ? (
                          <span className="flex items-center gap-1 text-[10px] font-mono uppercase text-neon-green"><CheckCircle2 className="w-3 h-3" /> Verified</span>
                        ) : project.status === "analyzing" ? (
                          <span className="flex items-center gap-1 text-[10px] font-mono uppercase text-neon-cyan"><Loader2 className="w-3 h-3 animate-spin" /> Analyzing</span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] font-mono uppercase text-neutral-500"><Clock className="w-3 h-3" /> Pending</span>
                        )}
                        <span className="px-1.5 py-0.5 border border-border-subtle text-[10px] font-mono uppercase text-neutral-400">{project.category}</span>
                      </div>
                      <h3 className="text-xl font-bold uppercase tracking-tight mb-1">{project.title}</h3>
                      <p className="font-mono text-sm text-neutral-400">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {project.evaluation && (
                        <div className="text-right">
                          <span className="font-mono text-2xl font-black text-neon-cyan">{project.evaluation.overallScore}</span>
                          <span className="font-mono text-xs text-neutral-500">/100</span>
                        </div>
                      )}
                      {expandedProject === project.id ? <ChevronUp className="w-4 h-4 text-neutral-500" /> : <ChevronDown className="w-4 h-4 text-neutral-500" />}
                    </div>
                  </div>
                  {expandedProject === project.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="border-t border-border-subtle p-5 space-y-6">
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill: string) => (
                          <SkillBadge key={skill} name={skill} level={project.category} size="sm" showLevel={false} />
                        ))}
                      </div>
                      {project.html_url && (
                        <div className="pt-2">
                          <a href={project.html_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 h-8 px-4 bg-surface border border-border-subtle text-foreground font-mono text-[10px] uppercase tracking-widest hover:border-neon-cyan transition-colors">
                            <Code className="w-3 h-3" /> View Repository
                          </a>
                        </div>
                      )}
                      <div>
                        <h4 className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-3">Files</h4>
                        <div className="space-y-2">
                          {project.files?.map((file: any) => (
                            <div key={file.name} className="flex items-center gap-3 py-2 px-3 bg-obsidian border border-border-subtle">
                              {file.type === "code" ? <Code className="w-3.5 h-3.5 text-neon-cyan" /> : file.type === "document" ? <FileText className="w-3.5 h-3.5 text-neon-green" /> : <PenTool className="w-3.5 h-3.5 text-neon-magenta" />}
                              <span className="font-mono text-xs text-neutral-300 flex-1">{file.name}</span>
                              {file.language && <span className="font-mono text-[10px] text-neutral-500">{file.language}</span>}
                              <span className="font-mono text-[10px] text-neutral-600">{file.size}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {project.evaluation && (
                        <div>
                          <h4 className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-3">Evaluation</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                            {[
                              { label: "Efficiency", value: project.evaluation.efficiency, color: "neon-cyan" },
                              { label: "Creativity", value: project.evaluation.creativity, color: "neon-green" },
                              { label: "Problem Solving", value: project.evaluation.problemSolving, color: "neon-magenta" },
                              { label: "Code Quality", value: project.evaluation.codeQuality, color: "white" },
                            ].map((m) => (
                              <div key={m.label} className="bg-obsidian border border-border-subtle p-3">
                                <span className="font-mono text-[10px] text-neutral-500 uppercase">{m.label}</span>
                                <div className={`text-xl font-black text-${m.color} mt-1`}>{m.value}%</div>
                              </div>
                            ))}
                          </div>
                          <div className="space-y-2">
                            {project.evaluation.feedback.map((fb: any, j: number) => (
                              <div key={j} className={`flex gap-3 py-2 px-3 bg-obsidian border-l-2 ${fb.severity === "positive" ? "border-l-neon-green" : "border-l-yellow-500"} border border-border-subtle`}>
                                <span className="font-mono text-[10px] text-neon-cyan uppercase whitespace-nowrap">{fb.agent}</span>
                                <span className="font-mono text-xs text-neutral-400">{fb.finding}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {view === "timeline" && (
          <section>
            <SectionHeader title="Growth Timeline" subtitle="Chronological skill verification" />
            <div className="relative pl-8 border-l border-border-subtle space-y-8">
              {sortedTimeline.map((skill, i) => (
                <motion.div key={skill.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="relative">
                  <div className={`absolute -left-[25px] w-4 h-4 rounded-full bg-${skill.color} border-2 border-obsidian`} />
                  <div className="border border-border-subtle bg-surface p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-neutral-500 flex items-center gap-2"><Calendar className="w-3 h-3" /> {skill.verifiedAt}</span>
                      <LevelBadge level={skill.level} />
                    </div>
                    <h3 className="text-lg font-bold uppercase tracking-tight mb-1">{skill.name}</h3>
                    <span className="font-mono text-xs text-neutral-500 uppercase">{skill.category}</span>
                    <p className="font-mono text-xs text-neutral-400 mt-3">{skill.evidence}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
