import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#292c32] bg-[#0d0e10]">
  <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 py-6 sm:px-8 lg:px-6">
   
    <div className="flex items-center gap-2">
      <Image
        src="/assets/logo.png"
        alt="FITLOG"
        width={28}
        height={24}
        className="h-auto w-[28px] object-contain"
      />
      <span className="text-[13px] font-bold tracking-[-0.02em] text-white">
        FITLOG
      </span>
    </div>

  
    <p className="text-right text-[11px] text-[#777a82]">
      © 2026 FitLog — Workout Library. Train hard, log honest.
    </p>
  </div>
</footer>
  );
}