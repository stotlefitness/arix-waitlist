export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0b0b10]/80 backdrop-blur-md">
      <span className="text-xl font-black tracking-tight text-white">
        Ari<span className="text-[#00ffc6]">X</span>
      </span>
      <span className="text-xs font-semibold tracking-widest text-[#00ffc6] border border-[#00ffc6]/30 bg-[#00ffc6]/5 px-3 py-1 rounded-full uppercase">
        Coming Soon
      </span>
    </nav>
  );
}
