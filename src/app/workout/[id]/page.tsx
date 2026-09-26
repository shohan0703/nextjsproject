"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useWorkout } from "@/context/WorkoutContext";
import Toast from "@/components/Toast";

type Workout = {
  id: number;
  name: string;
  image: string;
  description: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  sets: number;
  reps: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
  instructions: string[];
};

export default function WorkoutDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const {
    addToPlan,
    saveWorkout,
    isInPlan,
    isSaved,
  } = useWorkout();

  useEffect(() => {
    async function fetchWorkout() {
      try {
        const { id } = await params;

        const response = await fetch(
          `https://api.api-store.workers.dev/api/fitlog/${id}`
        );

        if (!response.ok) {
          throw new Error("Workout not found");
        }

        const data: Workout = await response.json();

        setWorkout(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load workout.");
      } finally {
        setLoading(false);
      }
    }

    fetchWorkout();
  }, [params]);

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-[1280px] px-6 py-16 sm:px-8 lg:px-6">
        <div className="grid animate-pulse gap-10 lg:grid-cols-2">
          <div className="aspect-square rounded-[8px] bg-[#202228]" />

          <div className="space-y-5">
            <div className="h-8 w-3/4 rounded bg-[#202228]" />
            <div className="h-4 w-full rounded bg-[#202228]" />
            <div className="h-4 w-5/6 rounded bg-[#202228]" />

            <div className="grid grid-cols-2 gap-3">
              <div className="h-16 rounded bg-[#202228]" />
              <div className="h-16 rounded bg-[#202228]" />
              <div className="h-16 rounded bg-[#202228]" />
              <div className="h-16 rounded bg-[#202228]" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !workout) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="text-center">
          <p className="text-sm text-red-400">
            {error || "Workout not found."}
          </p>

          <Link
            href="/"
            className="mt-5 inline-block rounded-md bg-[#ccff00] px-5 py-3 text-xs font-bold uppercase text-black"
          >
            Back to workouts
          </Link>
        </div>
      </main>
    );
  }

  function handleAddToPlan() {
    if (isInPlan(workout.id)) {
      setToast("Workout is already in today's plan");
      return;
    }

    addToPlan(workout);
    setToast("Workout added to today's plan");
  }

  function handleSaveWorkout() {
    if (isSaved(workout.id)) {
      setToast("Workout is already saved");
      return;
    }

    saveWorkout(workout);
    setToast("Workout saved for later");
  }

  return (
    <main className="mx-auto w-full max-w-[1280px] px-6 py-12 sm:px-8 lg:px-6 lg:py-16">

     
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-xs font-medium text-[#777a82] transition hover:text-white"
      >
        ← Back to workouts
      </Link>

      
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">

        
        <div className="overflow-hidden rounded-[8px] border border-[#292c32] bg-[#16181d]">
          <div className="relative aspect-square w-full bg-[#202228]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              unoptimized
              priority
              className="object-cover"
            />
          </div>
        </div>

       
        <div>

         
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#ccff00]">
            WORKOUT DETAILS
          </p>

          
          <h1 className="mt-3 text-3xl font-black uppercase tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
            {workout.name}
          </h1>

         
          <p className="mt-5 text-sm leading-6 text-[#92959d]">
            {workout.description}
          </p>

         
          <div className="mt-6 flex flex-wrap gap-2">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="rounded-[4px] bg-[#ccff00] px-3 py-1.5 text-[10px] font-bold uppercase text-black"
              >
                {group}
              </span>
            ))}
          </div>

          
          <div className="mt-8">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-white">
              KEY SPECS
            </h2>

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[8px] border border-[#292c32] bg-[#292c32] sm:grid-cols-3">

              <Spec
                label="Equipment"
                value={workout.equipment}
              />

              <Spec
                label="Difficulty"
                value={workout.difficulty}
              />

              <Spec
                label="Sets"
                value={String(workout.sets)}
              />

              <Spec
                label="Reps"
                value={workout.reps}
              />

              <Spec
                label="Duration"
                value={`${workout.duration} min`}
              />

              <Spec
                label="Calories"
                value={`${workout.caloriesBurned} kcal`}
              />

              <Spec
                label="Rating"
                value={`★ ${workout.rating}`}
              />

            </div>
          </div>

         
          <div className="mt-8">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-white">
              INSTRUCTIONS
            </h2>

            <div className="space-y-4">
              {workout.instructions.map((instruction, index) => (
                <div
                  key={index}
                  className="flex gap-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-[10px] font-bold text-black">
                    {index + 1}
                  </span>

                  <p className="pt-1 text-sm leading-6 text-[#92959d]">
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={handleAddToPlan}
              className="flex-1 rounded-md bg-[#ccff00] px-5 py-4 text-xs font-black uppercase text-black transition hover:bg-[#b9eb00]"
            >
              {isInPlan(workout.id)
                ? "✓ Added to today's plan"
                : "+ Add to today's plan"}
            </button>

           
            <button
              type="button"
              onClick={handleSaveWorkout}
              className="flex-1 rounded-md border border-[#3a3d43] px-5 py-4 text-xs font-bold uppercase text-white transition hover:border-[#ccff00] hover:text-[#ccff00]"
            >
              {isSaved(workout.id)
                ? "✓ Saved"
                : "♡ Save for later"}
            </button>

          </div>
        </div>
      </div>

      
      {toast && (
        <Toast
          message={toast}
          onClose={() => setToast("")}
        />
      )}

    </main>
  );
}

function Spec({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#16181d] p-4">
      <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#777a82]">
        {label}
      </p>

      <p className="mt-2 text-xs font-semibold text-white">
        {value}
      </p>
    </div>
  );
}