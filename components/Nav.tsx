import Image from "next/image";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0b0b10]/70 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-black p-2 border border-white/10 shadow-lg shadow-black/30">
            <Image
              src="/arix-logo.png"
              alt="AriX"
              width={36}
              height={36}
              priority
            />
          </div>
          <span className="text-sm font-black tracking-widest text-white/80 uppercase">
            Ari<span className="text-[#00ffc6]">X</span>
          </span>
        </div>

        <span className="text-[11px] font-semibold tracking-widest text-[#00ffc6] border border-[#00ffc6]/25 bg-[#00ffc6]/5 px-3 py-1.5 rounded-full uppercase">
          Coming Soon
        </span>
      </div>
    </nav>
  );
}
