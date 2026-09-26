"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useWorkout } from "@/context/WorkoutContext";
import Toast from "@/components/Toast";

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
  description?: string;
  instructions?: string[];
};

type Tab = "plan" | "saved";

type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
  } = useWorkout();

  const [activeTab, setActiveTab] = useState<Tab>("plan");
  const [completed, setCompleted] = useState<number[]>([]);
  const [toast, setToast] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  
  const activeWorkouts =
    activeTab === "plan" ? plan : saved;


  const sortedWorkouts = [...activeWorkouts].sort(
    (a, b) => {
      if (sortBy === "duration") {
        return b.duration - a.duration;
      }

      if (sortBy === "calories") {
        return b.caloriesBurned - a.caloriesBurned;
      }

      return b.rating - a.rating;
    }
  );

  

  const totalMinutes = activeWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = activeWorkouts.reduce(
    (total, workout) =>
      total + workout.caloriesBurned,
    0
  );

  const totalWorkouts = activeWorkouts.length;



  const toggleCompleted = (id: number) => {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };



  const handleRemoveFromPlan = (id: number) => {
    removeFromPlan(id);

    setToast(
      "Workout removed from today's plan"
    );

    setCompleted((current) =>
      current.filter((item) => item !== id)
    );
  };

 

  const handleRemoveFromSaved = (id: number) => {
    removeFromSaved(id);

    setToast("Workout removed from saved");
  };

  return (
    <main className="mx-auto w-full max-w-[1280px] px-6 py-12 sm:px-8 lg:px-6 lg:py-16">

     

      <div className="mb-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#ccff00]">
          YOUR WORKOUTS
        </p>

        <h1 className="mt-2 text-3xl font-black uppercase tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
          MY PLAN
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-[#777a82]">
          Manage your workouts, track your progress,
          and keep your favorite exercises ready for later.
        </p>
      </div>

      

      <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3">

        <MetricCard
          label={
            activeTab === "plan"
              ? "TODAY'S WORKOUTS"
              : "SAVED WORKOUTS"
          }
          value={totalWorkouts}
        />

        <MetricCard
          label="TOTAL MINUTES"
          value={totalMinutes}
        />

        <MetricCard
          label="TOTAL CALORIES"
          value={totalCalories}
        />

      </div>

     

      <div className="mb-6 border-b border-[#292c32]">
        <div className="flex gap-8 overflow-x-auto">

          

          <button
            onClick={() => setActiveTab("plan")}
            className={`relative whitespace-nowrap pb-4 text-xs font-bold uppercase tracking-[0.08em] transition ${
              activeTab === "plan"
                ? "text-[#ccff00]"
                : "text-[#777a82] hover:text-white"
            }`}
          >
            TODAY&apos;S PLAN

            <span
              className={`ml-2 rounded-full px-2 py-0.5 text-[10px] ${
                activeTab === "plan"
                  ? "bg-[#ccff00] text-black"
                  : "bg-[#24262b] text-[#8b8e95]"
              }`}
            >
              {plan.length}
            </span>

            {activeTab === "plan" && (
              <span className="absolute bottom-[-1px] left-0 h-[2px] w-full bg-[#ccff00]" />
            )}
          </button>

          

          <button
            onClick={() => setActiveTab("saved")}
            className={`relative whitespace-nowrap pb-4 text-xs font-bold uppercase tracking-[0.08em] transition ${
              activeTab === "saved"
                ? "text-[#ccff00]"
                : "text-[#777a82] hover:text-white"
            }`}
          >
            SAVED FOR LATER

            <span
              className={`ml-2 rounded-full px-2 py-0.5 text-[10px] ${
                activeTab === "saved"
                  ? "bg-[#ccff00] text-black"
                  : "bg-[#24262b] text-[#8b8e95]"
              }`}
            >
              {saved.length}
            </span>

            {activeTab === "saved" && (
              <span className="absolute bottom-[-1px] left-0 h-[2px] w-full bg-[#ccff00]" />
            )}
          </button>

        </div>
      </div>

     

      <div className="mb-8 flex justify-end">
        <div className="flex items-center gap-3">

          <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#777a82]">
            Sort By
          </span>

          <div className="relative">

            <select
              value={sortBy}
              onChange={(event) =>
                setSortBy(
                  event.target.value as SortOption
                )
              }
              className="appearance-none rounded-md border border-[#292c32] bg-[#131519] py-2.5 pl-4 pr-10 text-[10px] font-bold uppercase tracking-[0.08em] text-white outline-none transition hover:border-[#55585f] focus:border-[#ccff00]"
            >
              <option value="duration">
                Duration
              </option>

              <option value="calories">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>
            </select>

            

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#777a82]">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

          </div>
        </div>
      </div>

     

      {activeTab === "plan" && (
        <section>

          {plan.length === 0 ? (
            <EmptyState
              title="YOUR PLAN IS EMPTY"
              description="Add workouts from the library to build your plan for today."
              buttonText="BROWSE WORKOUTS"
            />
          ) : (
            <>
              <div className="mb-5">

                <h2 className="text-lg font-black uppercase tracking-[-0.02em] text-white">
                  TODAY&apos;S PLAN
                </h2>

                <p className="mt-1 text-xs text-[#777a82]">
                  {plan.length}{" "}
                  {plan.length === 1
                    ? "workout"
                    : "workouts"}{" "}
                  planned for today.
                </p>

              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                {sortedWorkouts.map((workout) => (
                  <PlanWorkoutCard
                    key={workout.id}
                    workout={workout}
                    completed={completed.includes(
                      workout.id
                    )}
                    onToggleComplete={() =>
                      toggleCompleted(workout.id)
                    }
                    onRemove={() =>
                      handleRemoveFromPlan(
                        workout.id
                      )
                    }
                  />
                ))}

              </div>
            </>
          )}

        </section>
      )}

     

      {activeTab === "saved" && (
        <section>

          {saved.length === 0 ? (
            <EmptyState
              title="NO SAVED WORKOUTS"
              description="Save workouts from the library and they will appear here."
              buttonText="BROWSE WORKOUTS"
            />
          ) : (
            <>
              <div className="mb-5">

                <h2 className="text-lg font-black uppercase tracking-[-0.02em] text-white">
                  SAVED FOR LATER
                </h2>

                <p className="mt-1 text-xs text-[#777a82]">
                  {saved.length}{" "}
                  {saved.length === 1
                    ? "workout"
                    : "workouts"}{" "}
                  saved.
                </p>

              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                {sortedWorkouts.map((workout) => (
                  <SavedWorkoutCard
                    key={workout.id}
                    workout={workout}
                    onRemove={() =>
                      handleRemoveFromSaved(
                        workout.id
                      )
                    }
                  />
                ))}

              </div>
            </>
          )}

        </section>
      )}

     

      {toast && (
        <Toast
          message={toast}
          onClose={() => setToast("")}
        />
      )}

    </main>
  );
}



function MetricCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-lg border border-[#292c32] bg-[#131519] px-5 py-5">

      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#777a82]">
        {label}
      </p>

      <p className="mt-2 text-3xl font-black tracking-[-0.03em] text-white">
        {value}
      </p>

    </div>
  );
}



function PlanWorkoutCard({
  workout,
  completed,
  onToggleComplete,
  onRemove,
}: {
  workout: Workout;
  completed: boolean;
  onToggleComplete: () => void;
  onRemove: () => void;
}) {
  return (
    <article
      className={`relative overflow-hidden rounded-lg border bg-[#131519] transition ${
        completed
          ? "border-[#3c4d0a] opacity-70"
          : "border-[#292c32] hover:border-[#3a3d43]"
      }`}
    >

      

      <button
        onClick={onRemove}
        aria-label={`Remove ${workout.name}`}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#3a3d43] bg-[#0d0e10]/90 text-lg leading-none text-[#999da5] transition hover:border-red-500 hover:bg-red-500 hover:text-white"
      >
        ×
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr]">

       

        <div className="relative h-52 sm:h-full sm:min-h-[230px]">

          <Image
            src={workout.image}
            alt={workout.name}
            fill
            unoptimized
            className={`object-cover transition ${
              completed ? "grayscale" : ""
            }`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {completed && (
            <div className="absolute left-3 top-3 rounded-full bg-[#ccff00] px-3 py-1 text-[9px] font-black uppercase tracking-[0.08em] text-black">
              Completed
            </div>
          )}

        </div>

       

        <div className="flex flex-col justify-between p-5">

          <div>

            

            <div className="mb-3 flex flex-wrap gap-2">

              {workout.muscleGroups
                ?.slice(0, 2)
                .map((muscle) => (
                  <span
                    key={muscle}
                    className="rounded-full border border-[#363940] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.06em] text-[#a3a6ad]"
                  >
                    {muscle}
                  </span>
                ))}

            </div>

           

            <h3
              className={`pr-8 text-xl font-black uppercase tracking-[-0.03em] ${
                completed
                  ? "text-[#777a82] line-through"
                  : "text-white"
              }`}
            >
              {workout.name}
            </h3>

            <p className="mt-2 text-xs text-[#777a82]">
              {workout.equipment} ·{" "}
              {workout.difficulty}
            </p>

           

            <div className="mt-5 grid grid-cols-2 gap-3">

              <MiniStat
                label="TIME"
                value={`${workout.duration} MIN`}
              />

              <MiniStat
                label="CALORIES"
                value={`${workout.caloriesBurned} KCAL`}
              />

            </div>

          </div>

          

          <div className="mt-6 flex flex-wrap gap-2">

            <Link
              href={`/workout/${workout.id}`}
              className="rounded-md border border-[#3a3d43] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white transition hover:border-white"
            >
              View Details
            </Link>

            <button
              onClick={onToggleComplete}
              className={`rounded-md px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] transition ${
                completed
                  ? "border border-[#ccff00] bg-transparent text-[#ccff00] hover:bg-[#ccff00] hover:text-black"
                  : "bg-[#ccff00] text-black hover:bg-[#d8ff33]"
              }`}
            >
              {completed ? "Undo" : "Mark as Done"}
            </button>

          </div>

        </div>

      </div>
    </article>
  );
}



function SavedWorkoutCard({
  workout,
  onRemove,
}: {
  workout: Workout;
  onRemove: () => void;
}) {
  return (
    <article className="relative overflow-hidden rounded-lg border border-[#292c32] bg-[#131519] transition hover:border-[#3a3d43]">

     

      <button
        onClick={onRemove}
        aria-label={`Remove ${workout.name} from saved`}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[#3a3d43] bg-[#0d0e10]/90 text-lg leading-none text-[#999da5] transition hover:border-red-500 hover:bg-red-500 hover:text-white"
      >
        ×
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr]">

       

        <div className="relative h-52 sm:h-full sm:min-h-[210px]">

          <Image
            src={workout.image}
            alt={workout.name}
            fill
            unoptimized
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        </div>

        

        <div className="flex flex-col justify-between p-5">

          <div>

           

            <div className="mb-3 flex flex-wrap gap-2">

              {workout.muscleGroups
                ?.slice(0, 2)
                .map((muscle) => (
                  <span
                    key={muscle}
                    className="rounded-full border border-[#363940] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.06em] text-[#a3a6ad]"
                  >
                    {muscle}
                  </span>
                ))}

            </div>

            

            <h3 className="pr-8 text-xl font-black uppercase tracking-[-0.03em] text-white">
              {workout.name}
            </h3>

            <p className="mt-2 text-xs text-[#777a82]">
              {workout.equipment} ·{" "}
              {workout.difficulty}
            </p>

          

            <div className="mt-5 grid grid-cols-2 gap-3">

              <MiniStat
                label="TIME"
                value={`${workout.duration} MIN`}
              />

              <MiniStat
                label="CALORIES"
                value={`${workout.caloriesBurned} KCAL`}
              />

            </div>

          </div>

         

          <div className="mt-6">

            <Link
              href={`/workout/${workout.id}`}
              className="inline-flex rounded-md border border-[#3a3d43] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white transition hover:border-white"
            >
              View Details
            </Link>

          </div>

        </div>

      </div>
    </article>
  );
}



function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-[#292c32] bg-[#0f1013] px-3 py-2.5">

      <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-[#666970]">
        {label}
      </p>

      <p className="mt-1 text-xs font-bold text-white">
        {value}
      </p>

    </div>
  );
}



function EmptyState({
  title,
  description,
  buttonText,
}: {
  title: string;
  description: string;
  buttonText: string;
}) {
  return (
    <div className="flex min-h-[330px] flex-col items-center justify-center rounded-lg border border-dashed border-[#292c32] bg-[#111216] px-6 text-center">

      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#292c32] bg-[#181a1f] text-xl text-[#777a82]">
        +
      </div>

      <h3 className="mt-5 text-lg font-black uppercase tracking-[-0.02em] text-white">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-xs leading-5 text-[#777a82]">
        {description}
      </p>

      <Link
        href="/library"
        className="mt-6 rounded-md bg-[#ccff00] px-5 py-3 text-[10px] font-black uppercase tracking-[0.08em] text-black transition hover:bg-[#d8ff33]"
      >
        {buttonText}
      </Link>

    </div>
  );
}