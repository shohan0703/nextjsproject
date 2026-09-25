import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0d0e10] text-white">

        <Hero />

        <section
          id="library"
          className="mx-auto max-w-[1280px] px-6 py-16 sm:px-8 lg:px-6"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#ccff00]">
            WORKOUTS
          </p>

          <h2 className="mt-2 text-3xl font-black uppercase">
            The Library
          </h2>

          <p className="mt-2 text-sm text-[#777a82]">
            Twelve lifts covering every major muscle group.
          </p>
        </section>

      </main>
    </>
  );
}