"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  onClose: () => void;
};

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <div className="flex items-center gap-3 rounded-md border border-[#3a3d43] bg-[#16181d] px-5 py-4 shadow-2xl">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ccff00] text-xs font-black text-black">
          ✓
        </span>

        <p className="text-xs font-semibold text-white">
          {message}
        </p>
      </div>
    </div>
  );
}