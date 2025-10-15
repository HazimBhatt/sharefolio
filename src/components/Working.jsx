'use client';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, ArrowBigRight, UserCircle, PencilIcon, GlobeLock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Working() {
const steps = [
//   {
//     title: "Log In or Sign Up",
//     description: "Access your dashboard instantly by signing in with your social account or email.",
//     icon: UserCircle,
//     accent: "text-green-500"
//   },
  {
    title: "Answer Simple Prompts",
    description: "Fill in a few quick details about your work, skills, and style preferences—takes less than 2 minutes.",
    icon: PencilIcon,
    accent: "text-blue-500"
  },
  {
    title: "Generate Your Portfolio",
    description: "Click 'Generate' and let our AI build a stunning, personalized portfolio for you.",
    icon: Sparkles,
    accent: "text-purple-500"
  },
  {
    title: "Go Live Instantly",
    description: "Your portfolio is published with a live subdomain URL—ready to share and impress.",
    icon: GlobeLock,
    accent: "text-primary"
  }
];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <section className="w-full py-10 px-3 md:px-10 md:py-22 bg-background overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center bg-[#7332a8] gap-2 px-4 py-2 mb-4 text-sm font-medium rounded-full text-foreground"
          >
            <Sparkles className="w-4 h-4 text-primary " />
            <span>EFFORTLESS PROCESS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-3xl md:text-4xl md:leading-16 lg:text-5xl font-bold"
          >
            Your work deserves the spotlight.   <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text relative after:absolute after:inset-0 after:bg-gradient-to-r sm:after:from-black/40 sm:dark:after:from-white/40 after:to-transparent after:skew-x-12 after:animate-pulse">We make it effortless</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Effortless design meets professional impact—your portfolio, your way.
          </motion.p>
        </div>


        <div className="relative hidden md:block">
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-border z-0" />

          <motion.div
            className="grid grid-cols-3 gap-8 relative z-10"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
          >
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={item}
                  className="group"
                >
                  <div className="relative h-full bg-background border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                    <div className="flex flex-col h-full">
                      <div className="absolute top-0 left-6 -translate-y-1/2 w-10 h-10 rounded-full bg-background border flex items-center justify-center">
                        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                          {index + 1}
                        </div>
                      </div>

                      <div className="flex flex-col items-center text-center">
                        <div className={`mb-6 w-14 h-14 rounded-lg flex items-center justify-center ${step.accent.replace('text', 'bg')}/10`}>
                          <Icon className={`w-6 h-6 ${step.accent}`} />
                        </div>

                        <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                        <p className="text-muted-foreground mb-6">{step.description}</p>

                        <div className="mt-auto w-full">
                          <div className="flex items-center justify-center text-sm font-medium text-primary">
                            <Link href={"/about"} className="mr-2">Learn more</Link>
                            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        <div className="md:hidden">
          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${step.accent.replace('text', 'bg')}/10`}>
                      <Icon className={`w-5 h-5 ${step.accent}`} />
                    </div>
                    {index < steps.length - 1 && (
                      <div className="flex-1 w-1 h-16 bg-border mt-2"></div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full inline-block mb-3">
                      Step {index + 1}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="mt-20 text-center"
        >
          <Link href={"/generate"}>
            <Button size="lg" className="px-8 text-white cursor-pointer py-6 text-base">
              Create One For You  <ArrowBigRight />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}