"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
// import { motion } from "framer-motion";
import { useTheme } from "next-themes";
const Hero = () => {
  const {theme } = useTheme()
  return (
    <div className="hero-section w-[90%] pt-20 mx-auto min-h-screen flex flex-col md:flex-row items-center justify-around poppins-regular">
      <div className="left-side-hero flex gap-5 flex-col text-center md:text-left">
        <h1 className=" text-4xl sm:text-5xl font-semibold leading-snug">
          Your Dream{" "}
          <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-black/40 dark:after:from-white/40 after:to-transparent after:skew-x-12 after:animate-pulse ">
            Portfolio.
          </span>
          <br />
          Ready in Minutes
        </h1>

        <p className="w-80 md:w-96 text-sm text-justify md:p-3">
          Your work deserves the spotlight. Let&#39;s create a stunning,
          professional portfolio that helps you stand out and land more
          opportunities.
        </p>

        <Link href="/signup">
          <Button
            variant="primary"
            className="cursor-pointer flex items-center justify-around w-full px-4 py-2 h-12"
          >
            Sign Up with your Social Accounts
            <Image src="/google.svg" height={25} width={25} alt="google icon" />
          </Button>
        </Link>

        <Link href="/templates">
          <Button
            data-focusable
            variant="secondary"
            className="cursor-pointer flex items-center justify-around w-full px-4 py-2 h-12"
          >
            Explore Templates For Portfolio
            <Image src="/explore.svg" height={30} width={30} alt="explore icon" />
          </Button>
        </Link>
      </div>

      <div className="right-side-hero">
       {
        theme=="light"?( <Image
          src="/hero-light.png"
          className="rounded-md object-cover"
          alt="hero image"
          width={800}
          height={600}
          priority
        />): <Image
          src="/hero-dark.png"
          className="rounded-md object-cover"
          alt="hero image"
          width={800}
          height={600}
          priority
        />
       }
      </div>
    </div>
  );
};

export default Hero;
