import Link from "next/link"
import { Button } from "./ui/button"
import { LogIn } from "lucide-react"
import Image from "next/image"


const Hero = () => {
  return (
    <div className="hero-section w-[90%] pt-20 poppins-regular mx-auto min-h-screen flex flex-col md:flex-row items-center justify-around">
      <div className="left-side-hero flex gap-5 flex-col">
        <h1 className="text-4xl sm:text-5xl font-semibold poppins-semibold leading-snug">
          Your Dream{" "}
          <span
            className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-white/20 after:to-transparent after:skew-x-12 after:animate-pulse"
          >
            Portfolio.
          </span>
          <br />
          Ready in Minutes
        </h1>

        <p className="w-96 poppins-regular text-sm text-justify">Your work deserves the spotlight. Let&#39;s create a stunning, professional portfolio that helps you stand out and land more opportunities.</p>
        <Link href={"/signup"}>
          <Button variant={"primary"} className="cursor-pointer flex items-center justify-around w-96  px-4 py-2 h-12">SIgn Up with your Social Accounts <Image src={"/google.svg"} height={25} width={25} alt="google icon" /></Button>
        </Link>
        <Link href={"/templates"}>
          <Button variant={"secondary"} className="cursor-pointer flex items-center justify-around w-96  px-4 py-2 h-12">Explore Templates For Portfolio <Image src={"/explore.svg"} height={30} width={30} alt="explore icon" /></Button>
        </Link>
        <div className="hero-bottom-info text-xs poppins-regular flex items-center justify-center gap-4">
          <Image src={"/rocket.svg"} height={30} width={30} alt="rocket icon" />
          <p>Free For Initial Users</p>

        </div>
      </div>
      <div className="right-side-hero">
        <Image src={"/hero.jpeg"} className="rounded-md" alt="hero image" width={800} height={600} />
      </div>
    </div>
  )
}

export default Hero