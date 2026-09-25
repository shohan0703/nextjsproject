"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
};

function WorkoutSkeleton() {
  return (
    <article className="overflow-hidden rounded-[8px] border border-[#292c32] bg-[#16181d]">
    
      <div className="aspect-[16/9] w-full animate-pulse bg-[#202228]" />

     
      <div className="p-4">
       
        <div className="mb-3 flex gap-2">
          <div className="h-5 w-14 animate-pulse rounded-[4px] bg-[#292c32]" />
          <div className="h-5 w-14 animate-pulse rounded-[4px] bg-[#292c32]" />
        </div>

       
        <div className="h-5 w-3/4 animate-pulse rounded bg-[#292c32]" />

      
        <div className="mt-3 flex gap-3">
          <div className="h-3 w-24 animate-pulse rounded bg-[#292c32]" />
          <div className="h-3 w-16 animate-pulse rounded bg-[#292c32]" />
        </div>
      </div>
    </article>
  );
}

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data: Workout[] = await response.json();

        setWorkouts(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load workouts. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, []);

  return (
    <section
      id="library"
      className="mx-auto w-full max-w-[1280px] px-6 py-16 sm:px-8 lg:px-6"
    >
     
      <div className="mb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#ccff00]">
          WORKOUTS
        </p>

        <h2 className="mt-2 text-[32px] font-black uppercase tracking-[-0.03em] text-white sm:text-[38px]">
          THE LIBRARY
        </h2>

        <p className="mt-2 text-sm text-[#777a82]">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      
      {loading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 12 }).map((_, index) => (
            <WorkoutSkeleton key={index} />
          ))}
        </div>
      )}

     
      {!loading && error && (
        <div className="rounded-[8px] border border-[#292c32] bg-[#16181d] px-6 py-12 text-center">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

     
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <Link
              key={workout.id}
              href={`/workout/${workout.id}`}
              className="group block"
            >
              <article className="overflow-hidden rounded-[8px] border border-[#292c32] bg-[#16181d] transition duration-200 hover:-translate-y-1 hover:border-[#ccff00]">
                
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#202228]">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    unoptimized
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

               
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

                 
                  <h3 className="text-base font-bold uppercase text-white">
                    {workout.name}
                  </h3>

                 
                  <div className="mt-3 flex items-center gap-3 text-[10px] text-[#777a82]">
                    <span>{workout.equipment}</span>
                  </div>

                 
                  <div className="mt-4 flex items-center gap-4 text-[10px] text-[#777a82]">
                    <span>⏱ {workout.duration} min</span>

                    <span>🔥 {workout.caloriesBurned} kcal</span>

                    <span>★ {workout.rating}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}