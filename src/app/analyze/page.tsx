"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Loader2, Terminal, CheckCircle2, AlertTriangle, Info, Award, TrendingUp } from "lucide-react";

const ANALYSIS_PHASES = [
  { phase: "Initialization", logs: ["Initializing Swarm Evaluator v3.1...", "Loading evaluation modules...", "Acquiring repository artifacts...", "Parsing file structure..."] },
  { phase: "Code Analysis", logs: ["[Agent: Syntactical Judge] Verifying code quality...", "AST analysis complete. Clean abstraction layers.", "[Agent: Data Structures] Identifying algorithms...", "Found: O(log n) optimization", "[Agent: Data Structures] Graph traversal: optimal"] },
  { phase: "Performance", logs: ["[Agent: Performance] Evaluating runtime complexity...", "Memory allocation: efficient", "Detected efficient caching.", "Bundle impact: minimal (+4.2KB gzipped)"] },
  { phase: "Security", logs: ["[Agent: Security] Checking vulnerabilities...", "OWASP Top 10: passing", "No critical vulnerabilities found.", "Input sanitization: verified"] },
  { phase: "Creativity", logs: ["[Agent: UI/UX] Analyzing component composition...", "Accessibility: 94/100", "[Agent: Code Style] Best practices: passing", "Novel approach detected"] },
  { phase: "Synthesis", logs: ["Running pairwise comparison...", "Extracting proofs...", "Minting Knowledge Graphs...", "Generating certificates...", "Complete."] },
];

const SCORING = [
  { label: "Efficiency", value: 96, icon: TrendingUp },
  { label: "Creativity", value: 91, icon: Award },
  { label: "Problem Solving", value: 95, icon: CheckCircle2 },
  { label: "Code Quality", value: 93, icon: Terminal },
];

export default function Analyze() {
  const router = useRouter();
  const [logs, setLogs] = useState<{ text: string; severity: "info" | "positive" | "warning" }[]>([]);
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const allLogs: { text: string; severity: "info" | "positive" | "warning" }[] = [];
    ANALYSIS_PHASES.forEach((phase) => {
      phase.logs.forEach((log) => {
        const severity = log.includes("Complete") || log.includes("optimal") || log.includes("passing") || log.includes("verified") || log.includes("efficient") || log.includes("Novel") ? "positive" : "info";
        allLogs.push({ text: log, severity });
      });
    });

    let idx = 0;
    const totalLogs = allLogs.length;
    let phaseIdx = 0;
    let logInPhase = 0;

    const interval = setInterval(() => {
      if (idx < totalLogs) {
        const entry = allLogs[idx];
        if (entry) setLogs((prev) => [...prev, entry]);
        setProgress(((idx + 1) / totalLogs) * 100);
        logInPhase++;
        if (logInPhase >= ANALYSIS_PHASES[phaseIdx]?.logs.length && phaseIdx < ANALYSIS_PHASES.length - 1) {
          phaseIdx++;
          logInPhase = 0;
          setCurrentPhase(phaseIdx);
        }
        idx++;
      } else {
        clearInterval(interval);
        setShowResults(true);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-obsidian text-foreground font-mono pt-20 pb-16 px-6 flex flex-col items-center laser-grid">
      <div className="w-full max-w-3xl space-y-8">
        <div className="flex gap-2 flex-wrap">
          {ANALYSIS_PHASES.map((phase, i) => (
            <div key={phase.phase} className={`px-3 py-1.5 text-[10px] uppercase tracking-widest border transition-colors ${i < currentPhase ? "border-neon-green/30 text-neon-green bg-neon-green/5" : i === currentPhase ? "border-neon-cyan/30 text-neon-cyan bg-neon-cyan/10" : "border-border-subtle text-neutral-600"}`}>
              {i < currentPhase && <CheckCircle2 className="w-2.5 h-2.5 inline mr-1" />}
              {i === currentPhase && <Loader2 className="w-2.5 h-2.5 inline mr-1 animate-spin" />}
              {phase.phase}
            </div>
          ))}
        </div>

        <div className="w-full h-1 bg-surface border border-border-subtle relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 h-full bg-neon-cyan" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ ease: "linear" }} />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-neutral-500">Evaluation Progress</span>
          <span className="text-neon-cyan text-sm">{Math.round(progress)}%</span>
        </div>

        <div className="h-80 overflow-hidden relative border border-border-subtle bg-surface">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-obsidian/90 z-10 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-6 bg-surface border-b border-border-subtle flex items-center px-3 gap-1.5 z-20">
            <div className="w-2 h-2 rounded-full bg-neon-magenta" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-neon-green" />
            <span className="ml-2 text-[9px] text-neutral-600 uppercase tracking-widest">Swarm Evaluator</span>
          </div>
          <div className="pt-8 pb-4 px-4 space-y-2 overflow-y-auto h-full">
            {logs.filter(Boolean).map((log, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-start gap-2 text-xs">
                {log.severity === "positive" ? <CheckCircle2 className="w-3 h-3 text-neon-green mt-0.5 shrink-0" /> : <Info className="w-3 h-3 text-neutral-600 mt-0.5 shrink-0" />}
                <span className={log.severity === "positive" ? "text-neon-green" : "text-neutral-400"}>{log.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {showResults && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="border border-neon-green/30 bg-neon-green/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-neon-green" />
                <h3 className="text-lg font-bold uppercase tracking-tight">Evaluation Complete</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {SCORING.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div key={metric.label} className="bg-obsidian border border-border-subtle p-4 text-center">
                      <Icon className="w-4 h-4 text-neon-cyan mx-auto mb-2" />
                      <div className="text-2xl font-black text-neon-cyan">{metric.value}</div>
                      <div className="text-[10px] font-mono text-neutral-500 uppercase mt-1">{metric.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <button onClick={() => router.push("/portfolio")} className="w-full h-12 bg-neon-green text-obsidian font-bold uppercase tracking-widest hover:bg-neon-green/90 transition-colors">
              View Portfolio
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
}
