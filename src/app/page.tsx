import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0d0e10] text-white">
        <Hero />

        <WorkoutLibrary />
      </main>
      <Footer />
    </>
  );
}