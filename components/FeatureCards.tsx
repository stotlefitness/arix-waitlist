"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    label: "Report In",
    headline: "30 seconds. Every morning.",
    body: "Log yesterday's session — duration, intensity, modality. That's it. The streak builds itself.",
    stat: "30s",
    statLabel: "avg check-in time",
  },
  {
    label: "Team Standings",
    headline: "Seasonal rosters. One locker room.",
    body: "Join a team each season, lock in like a real roster, and compete in weekly standings. Team feeds, assists, and real accountability.",
    stat: "12wk",
    statLabel: "per season",
  },
  {
    label: "CI Score",
    headline: "One number. No fluff.",
    body: "Your weekly Consistency Index: 0–100. Built from sessions completed, recovery, and streak health. Earned, not inflated.",
    stat: "0–100",
    statLabel: "weekly CI score",
  },
];

export default function FeatureCards() {
  return (
    <section id="features" className="px-6 py-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="text-[#00ffc6] text-xs font-semibold tracking-widest uppercase mb-3">
          How it works
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white">
          Built for athletes. Not wellness apps.
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="rounded-2xl border border-white/10 p-6 bg-[#121218] shadow-xl shadow-black/20 flex flex-col gap-4"
          >
            <span className="text-[#00ffc6] text-xs font-semibold tracking-widest uppercase">
              {f.label}
            </span>
            <h3 className="text-xl font-black text-white leading-tight">
              {f.headline}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed flex-1">
              {f.body}
            </p>
            <div className="border-t border-white/5 pt-4 flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#00ffc6] font-mono">
                {f.stat}
              </span>
              <span className="text-white/30 text-xs">{f.statLabel}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
