"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface HeroProps {
  totalCount: number;
  schoolCount: number;
}

function AnimatedCounter({
  target,
  duration = 1800,
}: {
  target: number;
  duration?: number;
}) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current || target === 0) return;
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);

  return <>{value.toLocaleString()}</>;
}

export default function Hero({ totalCount, schoolCount }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#00ffc6 1px, transparent 1px), linear-gradient(90deg, #00ffc6 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#00ffc6]/5 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 text-center max-w-3xl"
      >
        <p className="text-[#00ffc6] text-sm font-semibold tracking-widest uppercase mb-6">
          For former college athletes
        </p>

        <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight text-white mb-6">
          The team is
          <br />
          still in you.
        </h1>

        <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10">
          You had coaches. Teammates. Schedules. Now you have AriX —
          the accountability system built for athletes who haven&apos;t stopped competing.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#waitlist"
            className="px-8 py-3.5 rounded-lg bg-[#00ffc6] text-black font-bold text-sm tracking-wide hover:bg-[#00ffc6]/90 transition-colors"
          >
            Join the Waitlist
          </a>
          <a
            href="#features"
            className="px-8 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white/80 font-medium text-sm tracking-wide hover:bg-white/10 transition-colors"
          >
            See How It Works
          </a>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-12">
          <div className="text-center">
            <p className="text-3xl font-black text-white font-mono tabular-nums">
              <AnimatedCounter target={totalCount} />
            </p>
            <p className="text-white/40 text-xs font-medium tracking-widest uppercase mt-1">
              Athletes waiting
            </p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <p className="text-3xl font-black text-white font-mono tabular-nums">
              <AnimatedCounter target={schoolCount} />
            </p>
            <p className="text-white/40 text-xs font-medium tracking-widest uppercase mt-1">
              Schools represented
            </p>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/20 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
