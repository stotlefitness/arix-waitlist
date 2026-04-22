"use client";

import { motion } from "framer-motion";

interface SchoolCount {
  school: string;
  count: number;
}

interface SchoolLeaderboardProps {
  schools: SchoolCount[];
}

const MEDALS = ["🥇", "🥈", "🥉"];

export default function SchoolLeaderboard({ schools }: SchoolLeaderboardProps) {
  const maxCount = schools[0]?.count ?? 1;

  return (
    <section className="px-6 py-24 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-[#00ffc6] text-xs font-semibold tracking-widest uppercase mb-3">
          School Standings
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
          Which school shows up first?
        </h2>
        <p className="text-white/50 text-base mb-10">
          Athletes are representing. Get your school on the board.
        </p>

        {schools.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-white/40 text-sm">
              No schools on the board yet. Be the first.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {schools.map((entry, i) => (
              <motion.div
                key={entry.school}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="rounded-2xl border border-white/10 bg-[#121218] p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-lg w-7 text-center">
                      {i < 3 ? MEDALS[i] : (
                        <span className="text-white/30 text-sm font-mono">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      )}
                    </span>
                    <span className="text-white font-semibold text-sm">
                      {entry.school}
                    </span>
                  </div>
                  <span className="text-[#00ffc6] font-black font-mono text-sm">
                    {entry.count}{" "}
                    <span className="text-white/30 font-normal">
                      {entry.count === 1 ? "athlete" : "athletes"}
                    </span>
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[#00ffc6]"
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${(entry.count / maxCount) * 100}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 + 0.2, duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <p className="text-white/25 text-xs text-center mt-6">
          Rankings update in real time as athletes join
        </p>
      </motion.div>
    </section>
  );
}
