import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 pt-10 sm:px-8 lg:px-6">
      <div
        className="
          relative
          h-[620px]
          overflow-hidden
          rounded-[12px]
          border
          border-[#292c32]
          bg-[#16181d]

          sm:h-[560px]
          md:h-[500px]
          lg:h-[450px]
        "
      >
        <div
          className="
            relative
            z-10
            flex
            h-full
            w-full
            flex-col
            justify-start
            px-7
            pt-12

            sm:px-10
            sm:pt-14

            md:justify-center
            md:px-12
            md:pt-0

            lg:w-[70%]
            lg:px-[56px]
          "
        >
          <p
            className="
              mb-6
              text-[11px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-[#ccff00]
            "
          >
            WORKOUT LIBRARY
          </p>

          <h1
            className="
              max-w-[600px]
              text-[40px]
              font-black
              uppercase
              leading-[0.94]
              tracking-[-0.035em]
              text-white

              sm:text-[46px]

              md:text-[52px]

              lg:text-[58px]
            "
          >
            Train with intent. Log
            <br />
            every set.
          </h1>

          <p
            className="
              mt-6
              max-w-[550px]
              text-[14px]
              leading-[1.65]
              text-[#92959d]

              sm:text-[15px]
            "
          >
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="
              mt-7
              flex
              w-fit
              items-center
              justify-center
              rounded-[5px]
              bg-[#ccff00]
              px-6
              py-3
              text-[11px]
              font-black
              uppercase
              tracking-wide
              text-black
              transition
              duration-200
              hover:bg-[#d8ff4d]
            "
          >
            BROWSE WORKOUTS
          </Link>
        </div>

        <div
          className="
            absolute
            bottom-[-5px]
            left-1/2
            h-[220px]
            w-[220px]
            -translate-x-1/2

            sm:h-[260px]
            sm:w-[260px]

            md:bottom-[15px]
            md:left-auto
            md:right-[30px]
            md:h-[300px]
            md:w-[300px]
            md:translate-x-0

            lg:bottom-[28px]
            lg:right-[55px]
            lg:h-[334px]
            lg:w-[334px]
          "
        >
          <Image
            src="/assets/banner.png"
            alt="Workout illustration"
            fill
            priority
            sizes="(max-width: 640px) 220px, (max-width: 768px) 260px, (max-width: 1024px) 300px, 334px"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
