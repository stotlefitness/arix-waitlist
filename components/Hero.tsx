"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const SchoolMap = dynamic(() => import("@/components/SchoolMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full rounded-2xl border border-white/10 bg-[#0e0e14] h-[360px] md:h-[450px] flex items-center justify-center">
      <p className="text-white/30 text-sm">Loading map…</p>
    </div>
  ),
});

interface SchoolCount {
  school: string;
  count: number;
}

interface HeroProps {
  totalCount: number;
  schools: SchoolCount[];
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

export default function Hero({ totalCount, schools }: HeroProps) {
  const schoolCount = schools.length;
  return (
    <section className="relative pt-24 pb-16 px-6 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#00ffc6 1px, transparent 1px), linear-gradient(90deg, #00ffc6 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#00ffc6]/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <p className="text-[#00ffc6] text-xs font-semibold tracking-widest uppercase mb-5">
            For former athletes
          </p>
          <h1 className="text-5xl md:text-7xl font-black leading-[0.92] tracking-tight text-white mb-5">
            The team
            <br />
            after the team.
          </h1>
          <p className="text-white/55 text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
            You had structure. You had teammates. AriX brings it back —
            accountability built for athletes who never stopped competing.
          </p>
        </motion.div>

        {/* Map — the main visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-8"
        >
          <SchoolMap schools={schools} />
        </motion.div>

        {/* Stats + CTAs below map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center gap-8"
        >
          <p className="text-center max-w-md">
            <span className="text-4xl font-black text-white font-mono tabular-nums">
              <AnimatedCounter target={totalCount} />
            </span>
            <span className="block text-white/55 text-base md:text-lg mt-2 leading-snug">
              athletes from {schoolCount} schools signed up for AriX
            </span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#waitlist"
              className="px-8 py-3.5 rounded-lg bg-[#00ffc6] text-black font-bold text-sm tracking-wide hover:bg-[#00ffc6]/90 transition-colors"
            >
              Join the Waitlist
            </a>
            <a
              href="#features"
              className="px-8 py-3.5 rounded-lg bg-white/5 border border-white/10 text-white/75 font-medium text-sm tracking-wide hover:bg-white/10 transition-colors"
            >
              See How It Works
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
