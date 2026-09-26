
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-[1280px] flex-col items-center justify-center px-6 py-12 text-center sm:px-8 lg:px-6">
      
      <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#ccff00]">
        404 ERROR
      </p>

      <h1 className="mt-2 text-4xl font-black uppercase tracking-[-0.04em] text-white sm:text-6xl">
        PAGE NOT FOUND
      </h1>

      <p className="mt-3 max-w-md text-sm leading-6 text-[#777a82]">
        The page you are looking for doesn&apos;t exist or has been moved. Check the URL or head back to the dashboard.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-md bg-[#ccff00] px-6 py-3 text-[10px] font-black uppercase tracking-[0.08em] text-black transition hover:bg-[#d8ff33]"
        >
          Back to Home
        </Link>
        
        <Link
          href="/library"
          className="rounded-md border border-[#3a3d43] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.08em] text-white transition hover:border-white"
        >
          Browse Workouts
        </Link>
      </div>

    </main>
  );
}