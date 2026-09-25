import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0d0e10] px-6 py-10 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-black">
            FITLOG
          </h1>

          <p className="mt-2 text-zinc-400">
            Workout Library
          </p>
        </div>
      </main>
    </>
  );
}
