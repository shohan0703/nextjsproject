"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#0d0e10]">
      <nav className="relative mx-auto max-w-[1280px] px-6 sm:px-8 lg:px-6">

       
        <div className="flex h-20 items-center justify-between">

         
          <div className="flex items-center gap-3">

           
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[#292c31] text-white md:hidden"
            >
              {menuOpen ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 6L18 18" />
                  <path d="M18 6L6 18" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 6H20" />
                  <path d="M4 12H20" />
                  <path d="M4 18H20" />
                </svg>
              )}
            </button>

         
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <Image
                src="/assets/logo.png"
                alt="FitLog"
                width={28}
                height={28}
                priority
                className="h-7 w-7 object-contain"
              />

              <span className="text-[19px] font-black tracking-tight text-white">
                FITLOG
              </span>
            </Link>

          </div>

        
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">

            <Link
              href="/"
              className="rounded-full bg-[#16220d] px-5 py-2 text-xs font-semibold text-[#ccff00]"
            >
              Workouts
            </Link>

            <Link
              href="/my-plan"
              className="rounded-full px-5 py-2 text-xs font-medium text-[#92959d] transition hover:text-white"
            >
              My Plan
            </Link>

          </div>

          
          <div className="hidden items-center gap-5 md:flex">

            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-xs text-[#92959d]"
            >
              <span>Plan</span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[10px] font-bold text-black">
                0
              </span>
            </Link>

            <Link
              href="/my-plan"
              className="flex items-center gap-2 text-xs text-[#92959d]"
            >
              <span>Saved</span>

              <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#3a3d43] px-1.5 text-[10px] text-[#92959d]">
                0
              </span>
            </Link>

          </div>

         
          <div className="w-9 md:hidden" />

        </div>

       
        {menuOpen && (
          <div className="border-t border-[#25272c] py-5 md:hidden">

            <div className="flex flex-col gap-2">

              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="rounded-md bg-[#16220d] px-4 py-3 text-sm font-semibold text-[#ccff00]"
              >
                Workouts
              </Link>

              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-4 py-3 text-sm font-medium text-[#92959d] hover:bg-[#16181d] hover:text-white"
              >
                My Plan
              </Link>

            </div>

            <div className="mt-4 flex items-center gap-4 border-t border-[#25272c] pt-4">

              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-xs text-[#92959d]"
              >
                <span>Plan</span>

                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[10px] font-bold text-black">
                  0
                </span>
              </Link>

              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-xs text-[#92959d]"
              >
                <span>Saved</span>

                <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#3a3d43] px-1.5 text-[10px]">
                  0
                </span>
              </Link>

            </div>

          </div>
        )}

      </nav>
    </header>
  );
}