"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Code, FileText, PenTool, ArrowRight, Brain, Award, Target, BarChart3, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FEATURES = [
  { icon: Upload, title: "Dynamic Portfolios", desc: "Upload projects. Categorized by skill. Timeline-based growth.", href: "/portfolio" },
  { icon: Brain, title: "AI Evaluation", desc: "Code quality, efficiency, creativity, and problem-solving analysis.", href: "/analyze" },
  { icon: Award, title: "Skill Badges", desc: "Earn micro-credentials based on demonstrated, verified skills.", href: "/badges" },
  { icon: Target, title: "Challenges", desc: "Real-world tasks that verify skills. Build. Solve. Prove.", href: "/challenges" },
  { icon: BarChart3, title: "Analytics", desc: "Track growth, identify strengths, get personalized recommendations.", href: "/analytics" },
  { icon: Users, title: "Recruiter View", desc: "Search candidates by skills, not grades. Filter by verified achievements.", href: "/recruiter" },
];

export default function Home() {
  const [isHovering, setIsHovering] = useState(false);
  const router = useRouter();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
    router.push("/analyze");
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-obsidian text-foreground laser-grid flex flex-col items-center">
      <nav className="absolute top-0 w-full p-6 md:p-8 flex justify-between items-center z-10">
        <div className="font-mono text-xl tracking-tighter uppercase flex items-center gap-2">
          <div className="w-4 h-4 bg-neon-cyan" />
          Skilly
        </div>
        <div className="flex items-center gap-4">
          <Link href="/portfolio" className="font-mono text-xs text-neutral-500 uppercase tracking-widest hover:text-neon-cyan transition-colors">Portfolio</Link>
          <Link href="/challenges" className="font-mono text-xs text-neutral-500 uppercase tracking-widest hover:text-neon-cyan transition-colors">Challenges</Link>
          <Link href="/recruiter" className="px-4 py-2 bg-neon-green text-obsidian font-mono text-xs uppercase tracking-widest hover:bg-neon-green/90 transition-colors">For Recruiters</Link>
        </div>
      </nav>

      <div className="z-10 w-full max-w-6xl flex flex-col gap-20 pt-32 pb-20 px-6">
        <div className="space-y-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
            Prove Without <br/>
            <span className="text-neutral-600 line-through decoration-neon-cyan decoration-4">Grades</span> <br/>
            <span className="text-neon-green">Evidence.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-neutral-400 max-w-2xl font-mono">
            Upload your raw work. Our AI swarm evaluates, verifies, and mints your undeniably proven skills. No GPA required.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          onDragOver={(e) => { e.preventDefault(); setIsHovering(true); }}
          onDragLeave={() => setIsHovering(false)}
          onDrop={handleDrop}
          onClick={() => router.push("/analyze")}
          className={`relative w-full h-64 md:h-72 rounded-none border-2 border-dashed flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 glass-panel ${isHovering ? "border-neon-green bg-neon-green/5 scale-[1.01]" : "border-border-subtle hover:border-neutral-500"}`}
        >
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-cyan -translate-x-1 -translate-y-1" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-cyan translate-x-1 -translate-y-1" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-cyan -translate-x-1 translate-y-1" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-cyan translate-x-1 translate-y-1" />
          <motion.div animate={{ y: isHovering ? -8 : 0 }} className="p-4 rounded-full bg-surface border border-border-subtle">
            <Upload className={`w-8 h-8 ${isHovering ? "text-neon-green" : "text-neutral-500"}`} />
          </motion.div>
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold uppercase tracking-tight">Drop Artifacts Here</h3>
            <p className="font-mono text-neutral-500 text-xs">GitHub Repos, PDF Reports, Design Files, Code Projects</p>
          </div>
          <div className="flex gap-4 opacity-40">
            <Code className="w-4 h-4" />
            <FileText className="w-4 h-4" />
            <PenTool className="w-4 h-4" />
          </div>
        </motion.div>

        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold uppercase tracking-tighter">Platform Features</h2>
            <div className="h-px bg-border-subtle flex-grow" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
                  <Link href={feature.href} className="group block border border-border-subtle bg-surface p-6 hover:border-neutral-600 transition-all duration-200 h-full">
                    <Icon className="w-5 h-5 text-neon-cyan mb-4" />
                    <h3 className="text-lg font-bold uppercase tracking-tight mb-2">{feature.title}</h3>
                    <p className="font-mono text-xs text-neutral-400 leading-relaxed mb-4">{feature.desc}</p>
                    <div className="flex items-center gap-1 text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="font-mono text-xs uppercase tracking-widest">Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        <div className="border border-border-subtle bg-surface p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Skills Verified", value: "2,400+" },
            { label: "Projects Evaluated", value: "890" },
            { label: "Active Students", value: "1,200+" },
            { label: "Recruiter Partners", value: "45" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-black text-neon-cyan tracking-tighter">{stat.value}</div>
              <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button onClick={() => router.push("/analyze")} className="px-8 py-3 bg-neon-green text-obsidian font-bold uppercase tracking-widest hover:bg-neon-green/90 transition-colors flex items-center gap-2">
            Start Evaluation <ArrowRight className="w-4 h-4" />
          </button>
          <Link href="/portfolio" className="px-8 py-3 border border-border-subtle text-foreground font-mono text-sm uppercase tracking-widest hover:border-neutral-500 transition-colors">
            View Demo Portfolio
          </Link>
        </div>

        <footer className="border-t border-border-subtle pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-sm text-neutral-600 flex items-center gap-2">
            <div className="w-3 h-3 bg-neon-cyan" />
            Skilly. Proof of Skill System.
          </div>
          <div className="font-mono text-xs text-neutral-700">
            Decentralized evaluation &middot; Verified credentials &middot; Skill-first hiring
          </div>
        </footer>
      </div>
    </main>
  );
}
