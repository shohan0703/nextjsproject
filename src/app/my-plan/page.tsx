"use client";

import Image from "next/image";
import Link from "next/link";
import { useWorkout } from "@/context/WorkoutContext";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
  } = useWorkout();

  return (
    <main className="mx-auto w-full max-w-[1280px] px-6 py-12 sm:px-8 lg:px-6 lg:py-16">

      
      <div className="mb-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#ccff00]">
          YOUR WORKOUTS
        </p>

        <h1 className="mt-2 text-3xl font-black uppercase tracking-[-0.03em] text-white sm:text-4xl">
          MY PLAN
        </h1>

        <p className="mt-2 text-sm text-[#777a82]">
          Your selected workouts for today.
        </p>
      </div>

     
      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-[8px] border border-[#292c32] bg-[#16181d] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#777a82]">
            Plan
          </p>

          <p className="mt-2 text-2xl font-black text-[#ccff00]">
            {plan.length}
          </p>
        </div>

        <div className="rounded-[8px] border border-[#292c32] bg-[#16181d] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#777a82]">
            Saved
          </p>

          <p className="mt-2 text-2xl font-black text-white">
            {saved.length}
          </p>
        </div>

        <div className="rounded-[8px] border border-[#292c32] bg-[#16181d] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#777a82]">
            Total Minutes
          </p>

          <p className="mt-2 text-2xl font-black text-white">
            {plan.reduce((total, workout) => total + workout.duration, 0)}
          </p>
        </div>
      </div>

     
      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-black uppercase text-white">
            TODAY&apos;S PLAN
          </h2>

          <span className="text-xs text-[#777a82]">
            {plan.length} workout{plan.length !== 1 ? "s" : ""}
          </span>
        </div>

        {plan.length === 0 ? (
          <div className="rounded-[8px] border border-dashed border-[#292c32] bg-[#16181d] px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#202228] text-xl">
              +
            </div>

            <h3 className="mt-5 text-sm font-bold uppercase text-white">
              Your plan is empty
            </h3>

            <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-[#777a82]">
              Add workouts from the library to build your workout plan.
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-md bg-[#ccff00] px-5 py-3 text-xs font-black uppercase text-black transition hover:bg-[#b9eb00]"
            >
              Browse workouts
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {plan.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                onRemove={() => removeFromPlan(workout.id)}
              />
            ))}
          </div>
        )}
      </section>

     
      <section className="mt-16">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-black uppercase text-white">
            SAVED FOR LATER
          </h2>

          <span className="text-xs text-[#777a82]">
            {saved.length} saved
          </span>
        </div>

        {saved.length === 0 ? (
          <div className="rounded-[8px] border border-dashed border-[#292c32] bg-[#16181d] px-6 py-12 text-center">
            <p className="text-sm text-[#777a82]">
              No saved workouts yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                onRemove={() => removeFromSaved(workout.id)}
                saved
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function WorkoutCard({
  workout,
  onRemove,
  saved = false,
}: {
  workout: {
    id: number;
    name: string;
    image: string;
    muscleGroups: string[];
    equipment: string;
    duration: number;
    caloriesBurned: number;
    rating: number;
  };
  onRemove: () => void;
  saved?: boolean;
}) {
  return (
    <article className="overflow-hidden rounded-[8px] border border-[#292c32] bg-[#16181d]">
      <Link href={`/workout/${workout.id}`}>
        <div className="relative aspect-[16/9] overflow-hidden bg-[#202228]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            unoptimized
            className="object-cover transition duration-300 hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-[4px] bg-[#ccff00] px-2 py-1 text-[9px] font-bold uppercase text-black"
            >
              {group}
            </span>
          ))}
        </div>

        <Link href={`/workout/${workout.id}`}>
          <h3 className="text-base font-bold uppercase text-white hover:text-[#ccff00]">
            {workout.name}
          </h3>
        </Link>

        <p className="mt-2 text-[10px] text-[#777a82]">
          {workout.equipment}
        </p>

        <div className="mt-4 flex items-center gap-3 text-[10px] text-[#777a82]">
          <span>⏱ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span>★ {workout.rating}</span>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="mt-5 w-full rounded-md border border-[#3a3d43] px-4 py-3 text-[10px] font-bold uppercase text-[#92959d] transition hover:border-red-500 hover:text-red-400"
        >
          {saved ? "Remove from saved" : "Remove from plan"}
        </button>
      </div>
    </article>
  );
}