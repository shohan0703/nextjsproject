"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useWorkout } from "@/context/WorkoutContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  const { plan, saved } = useWorkout();

  
  const isWorkoutActive =
    pathname === "/" || pathname.startsWith("/library");

  const isMyPlanActive =
    pathname.startsWith("/my-plan");

  return (
    <header className="sticky top-0 z-50 border-b border-[#24262b] bg-[#0d0e10]/95 backdrop-blur">

      <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-6 sm:px-8 lg:px-6">

        

        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/assets/logo.png"
            alt="FitLog"
            width={30}
            height={30}
            className="h-[30px] w-[30px] object-contain"
          />

          <span className="text-[18px] font-black tracking-[-0.04em] text-white">
            FITLOG
          </span>
        </Link>

     

        <nav className="hidden items-center gap-2 md:flex">

         

          <Link
            href="/"
            className={`rounded-full px-5 py-2.5 text-[11px] font-bold transition ${
              isWorkoutActive
                ? "bg-[#ccff00] text-black"
                : "text-[#777a82] hover:bg-[#181a1f] hover:text-white"
            }`}
          >
            Workouts
          </Link>

          

          <Link
            href="/my-plan"
            className={`rounded-full px-5 py-2.5 text-[11px] font-bold transition ${
              isMyPlanActive
                ? "bg-[#ccff00] text-black"
                : "text-[#777a82] hover:bg-[#181a1f] hover:text-white"
            }`}
          >
            My Plan
          </Link>

        </nav>

       

        <div className="hidden items-center gap-5 md:flex">

          

          <Link
            href="/my-plan"
            className={`flex items-center gap-2 text-[11px] font-medium transition ${
              isMyPlanActive
                ? "text-white"
                : "text-[#777a82] hover:text-white"
            }`}
          >
            <span>Plan</span>

            <span
              className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[9px] font-black ${
                isMyPlanActive
                  ? "bg-[#ccff00] text-black"
                  : "bg-[#24262b] text-[#777a82]"
              }`}
            >
              {plan.length}
            </span>
          </Link>

          

          <Link
            href="/my-plan"
            className={`flex items-center gap-2 text-[11px] font-medium transition ${
              isMyPlanActive
                ? "text-white"
                : "text-[#777a82] hover:text-white"
            }`}
          >
            <span>Saved</span>

            <span
              className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[9px] font-black ${
                isMyPlanActive
                  ? "bg-[#ccff00] text-black"
                  : "bg-[#24262b] text-[#777a82]"
              }`}
            >
              {saved.length}
            </span>
          </Link>

        </div>

    

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((current) => !current)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-[#292c32] text-white md:hidden"
        >
          {menuOpen ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M5 5L15 15M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M3 6H17M3 10H17M3 14H17"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>

      </div>

      

      {menuOpen && (
        <div className="border-t border-[#24262b] bg-[#0d0e10] px-6 py-4 md:hidden">

          <nav className="flex flex-col gap-2">

           

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`rounded-md px-4 py-3 text-xs font-bold uppercase tracking-[0.06em] ${
                isWorkoutActive
                  ? "bg-[#ccff00] text-black"
                  : "text-[#777a82] hover:bg-[#181a1f] hover:text-white"
              }`}
            >
              Workouts
            </Link>

            

            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-between rounded-md px-4 py-3 text-xs font-bold uppercase tracking-[0.06em] ${
                isMyPlanActive
                  ? "bg-[#ccff00] text-black"
                  : "text-[#777a82] hover:bg-[#181a1f] hover:text-white"
              }`}
            >
              <span>My Plan</span>

              <span
                className={`rounded-full px-2 py-1 text-[9px] font-black ${
                  isMyPlanActive
                    ? "bg-black text-[#ccff00]"
                    : "bg-[#24262b] text-[#777a82]"
                }`}
              >
                {plan.length}
              </span>
            </Link>

           

            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className={`flex items-center justify-between rounded-md px-4 py-3 text-xs font-bold uppercase tracking-[0.06em] ${
                isMyPlanActive
                  ? "text-white"
                  : "text-[#777a82]"
              }`}
            >
              <span>Saved</span>

              <span
                className={`rounded-full px-2 py-1 text-[9px] font-black ${
                  isMyPlanActive
                    ? "bg-[#ccff00] text-black"
                    : "bg-[#24262b] text-[#777a82]"
                }`}
              >
                {saved.length}
              </span>
            </Link>

          </nav>

        </div>
      )}

    </header>
  );
}