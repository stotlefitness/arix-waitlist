"use client";

import { useState, useTransition, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { joinWaitlist } from "@/app/actions";
import { SCHOOLS } from "@/lib/schools";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [schoolQuery, setSchoolQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    position?: number;
    alreadyJoined?: boolean;
    error?: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredSchools = schoolQuery.length > 0
    ? SCHOOLS.filter((s) =>
        s.toLowerCase().includes(schoolQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  const handleSchoolSelect = (s: string) => {
    setSchool(s);
    setSchoolQuery(s);
    setShowDropdown(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!school) return;
    startTransition(async () => {
      const res = await joinWaitlist(email, school);
      setResult(res);
    });
  };

  const shareText = result?.position
    ? `I'm #${result.position} on the AriX waitlist — accountability built for former college athletes. Join the list:`
    : "";

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "https://arix.app";

  if (result?.success) {
    return (
      <section id="waitlist" className="px-6 py-24 max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-[#00ffc6]/30 bg-[#00ffc6]/5 p-8 text-center"
        >
          <div className="text-5xl font-black text-[#00ffc6] font-mono mb-2">
            #{result.position}
          </div>
          <p className="text-white font-bold text-lg mb-1">
            {result.alreadyJoined
              ? "You're already on the list."
              : "You're in."}
          </p>
          <p className="text-white/50 text-sm mb-8">
            {result.alreadyJoined
              ? `Still holding spot #${result.position}.`
              : `Your position on the AriX waitlist. Bring your team.`}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-white/10 border border-white/10 text-white text-sm font-medium hover:bg-white/15 transition-colors flex items-center justify-center gap-2"
            >
              <span>Share on X</span>
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(shareUrl)}
              className="px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Copy Link
            </button>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="px-6 py-24 max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-[#00ffc6] text-xs font-semibold tracking-widest uppercase mb-3 text-center">
          Early Access
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-3">
          Secure your spot.
        </h2>
        <p className="text-white/50 text-base text-center mb-10">
          Get first access when we launch. Put your school on the board.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/50 text-xs font-medium tracking-wide uppercase mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#121218] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00ffc6]/50 transition-colors"
            />
          </div>

          <div className="relative">
            <label className="block text-white/50 text-xs font-medium tracking-wide uppercase mb-2">
              School
            </label>
            <input
              type="text"
              required
              value={schoolQuery}
              onChange={(e) => {
                setSchoolQuery(e.target.value);
                setSchool("");
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              placeholder="Search your school..."
              className="w-full bg-[#121218] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00ffc6]/50 transition-colors"
              autoComplete="off"
            />
            <AnimatePresence>
              {showDropdown && filteredSchools.length > 0 && (
                <motion.div
                  ref={dropdownRef}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-1 z-20 rounded-xl border border-white/10 bg-[#121218] shadow-2xl overflow-hidden"
                >
                  {filteredSchools.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onMouseDown={() => handleSchoolSelect(s)}
                      className="w-full text-left px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {result?.error && (
            <p className="text-red-400 text-sm">{result.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending || !school}
            className="w-full py-3.5 rounded-lg bg-[#00ffc6] text-black font-bold text-sm tracking-wide hover:bg-[#00ffc6]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isPending ? "Joining..." : "Join the Waitlist"}
          </button>

          <p className="text-white/25 text-xs text-center">
            No spam. Just a heads-up when we launch.
          </p>
        </form>
      </motion.div>
    </section>
  );
}
