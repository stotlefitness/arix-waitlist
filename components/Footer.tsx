export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-10 text-center">
      <p className="text-xl font-black text-white mb-1">
        Ari<span className="text-[#00ffc6]">X</span>
      </p>
      <p className="text-white/30 text-sm">
        Built for the athlete that never clocked out.
      </p>
      <p className="text-white/15 text-xs mt-6">
        © {new Date().getFullYear()} AriX. All rights reserved.
      </p>
    </footer>
  );
}
