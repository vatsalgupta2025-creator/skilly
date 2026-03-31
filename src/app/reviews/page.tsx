"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MessageSquare, ThumbsUp, Star, Send } from "lucide-react";
import { MOCK_REVIEWS } from "@/lib/mock-data";
import { SectionHeader, StatCard } from "@/components/UI";
import { StarRating } from "@/components/StarRating";

export default function Reviews() {
  const [filterType, setFilterType] = useState<"all" | "peer" | "mentor">("all");
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);

  const filteredReviews = useMemo(() => {
    if (filterType === "all") return MOCK_REVIEWS;
    return MOCK_REVIEWS.filter((r) => r.type === filterType);
  }, [filterType]);

  const avgRating = useMemo(() => {
    if (MOCK_REVIEWS.length === 0) return 0;
    return MOCK_REVIEWS.reduce((a, r) => a + r.rating, 0) / MOCK_REVIEWS.length;
  }, []);

  return (
    <main className="min-h-screen bg-obsidian text-foreground pt-20 pb-16 px-6 laser-grid">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="border-b-2 border-border-subtle pb-8">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-6 h-6 text-neon-green" />
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Reviews</h1>
          </div>
          <p className="font-mono text-neutral-400 max-w-2xl">Peer and mentor validation builds credibility. Every review contributes to skill confidence scores.</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total" value={MOCK_REVIEWS.length} color="neon-cyan" />
          <StatCard label="Avg Rating" value={avgRating.toFixed(1)} color="neon-green" />
          <StatCard label="Mentor" value={MOCK_REVIEWS.filter(r => r.type === "mentor").length} color="neon-magenta" />
          <StatCard label="Peer" value={MOCK_REVIEWS.filter(r => r.type === "peer").length} color="white" />
        </div>

        <div className="flex gap-2">
          {(["all", "peer", "mentor"] as const).map((type) => (
            <button key={type} onClick={() => setFilterType(type)} className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-colors ${filterType === type ? "border-neon-cyan/30 text-neon-cyan bg-neon-cyan/10" : "border-border-subtle text-neutral-500 hover:text-neutral-300"}`}>
              {type === "all" ? "All" : type === "peer" ? "Peer" : "Mentor"}
            </button>
          ))}
        </div>

        <div className="border border-border-subtle bg-surface p-6">
          <h3 className="font-mono text-xs text-neutral-500 uppercase tracking-widest mb-4">Write a Review</h3>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-neutral-500">Rating:</span>
            <StarRating rating={newRating} interactive onChange={setNewRating} size="lg" />
          </div>
          <textarea value={newReview} onChange={(e) => setNewReview(e.target.value)} placeholder="Share your assessment..." className="w-full bg-obsidian border border-border-subtle text-foreground font-mono text-sm p-4 focus:border-neon-cyan focus:outline-none resize-none h-24 placeholder:text-neutral-600" />
          <div className="flex justify-end mt-3">
            <button className="px-6 py-2 bg-neon-green text-obsidian font-mono text-xs uppercase tracking-widest hover:bg-neon-green/90 transition-colors flex items-center gap-2">
              <Send className="w-3 h-3" /> Submit
            </button>
          </div>
        </div>

        <section>
          <SectionHeader title="All Reviews" subtitle={`${filteredReviews.length} reviews`} />
          <div className="space-y-4">
            {filteredReviews.map((review, i) => (
              <motion.div key={review.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="border border-border-subtle bg-surface p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 flex items-center justify-center font-mono text-sm font-bold border ${review.type === "mentor" ? "border-neon-magenta/30 text-neon-magenta bg-neon-magenta/10" : "border-neon-cyan/30 text-neon-cyan bg-neon-cyan/10"}`}>
                      {review.reviewer.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold">{review.reviewer.name}</span>
                        <span className={`px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-widest border ${review.type === "mentor" ? "border-neon-magenta/30 text-neon-magenta" : "border-neon-cyan/30 text-neon-cyan"}`}>{review.type}</span>
                      </div>
                      <span className="font-mono text-[10px] text-neutral-600">{review.createdAt}</span>
                    </div>
                  </div>
                  <StarRating rating={review.rating} size="sm" />
                </div>
                <p className="font-mono text-sm text-neutral-300 leading-relaxed mb-4">{review.comment}</p>
                <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
                  <button className="flex items-center gap-1.5 text-neutral-500 hover:text-neon-green transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span className="font-mono text-xs">{review.helpful} helpful</span>
                  </button>
                  <span className="font-mono text-[10px] text-neutral-600">Project: {review.targetProjectId}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
