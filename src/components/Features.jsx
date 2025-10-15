'use client';
import { motion, useInView } from 'framer-motion';
import {
    Sparkles,
    Paintbrush,
    Code,
    Camera,
    BookOpen,
    Briefcase,
    GraduationCap,
    Megaphone,
    Lightbulb
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRef } from 'react';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Features() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    // const router = useRouter();

 const professions = [
  {
    title: "Designers",
    icon: Paintbrush,
    color: "text-pink-500",
    description: "Showcase your creative work with sleek, visual-first portfolio templates."
  },
  {
    title: "Web Developers",
    icon: Code,
    color: "text-blue-500",
    description: "Highlight your projects, GitHub repos, and tech stack with clean layouts."
  },
  {
    title: "Photographers",
    icon: Camera,
    color: "text-purple-500",
    description: "Display your photo galleries in stunning, high-resolution formats."
  },
  {
    title: "Writers & Bloggers",
    icon: BookOpen,
    color: "text-yellow-500",
    description: "Share your voice with content-focused templates built for storytelling."
  },
  {
    title: "Freelancers",
    icon: Briefcase,
    color: "text-green-500",
    description: "Present your services, testimonials, and past work to attract new clients."
  },
  {
    title: "Students",
    icon: GraduationCap,
    color: "text-cyan-500",
    description: "Create academic portfolios to showcase projects, achievements, and resumes."
  },
  {
    title: "Marketers",
    icon: Megaphone,
    color: "text-red-500",
    description: "Promote campaigns, case studies, and brand work with conversion-ready layouts."
  },
  {
    title: "Consultants",
    icon: Lightbulb,
    color: "text-orange-500",
    description: "Build trust with polished portfolios that highlight your expertise and results."
  }
];


    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15 } }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section ref={containerRef} className="w-full py-10 px-3 md:px-10 bg-background" id="features">
            <div className="container mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        className="inline-flex text-white items-center bg-[#7332a8] gap-2 px-4 py-2 mb-4 text-sm font-medium rounded-full "
                    >
                        <Sparkles className="w-4 h-4 text-white" />
                        <span>POWERFUL FEATURES</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl md:leading-16 lg:text-5xl font-bold"
                    >
                        Build Stunning Portfolios <br />
                        <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text relative after:absolute after:inset-0 after:bg-gradient-to-r sm:after:from-black/40 sm:dark:after:from-white/40 after:to-transparent after:skew-x-12 after:animate-pulse">
                          for  Top Professions
                        </span>
                    </motion.h2>


                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-lg text-muted-foreground"
                    >
                        Our comprehensive toolset gives you the competitive edge to stand out in crowded marketplaces
                    </motion.p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={container}
                    initial="hidden"
                    animate={isInView ? "show" : "hidden"}
                >
                    {professions.map(({ title, icon: Icon, color, description }, index) => (
                        <motion.div key={index} variants={item} data-focusable className="w-full">
                            <Card
                                className="h-full cursor-pointer border shadow-sm hover:shadow-md transition-all">
                                <CardHeader className="flex flex-row justify-between items-start pb-3">
                                    <Link href={"/about"}><CardTitle className="text-lg font-bold">{title}</CardTitle></Link>
                                    <div className={`p-2 rounded-lg ${color.replace('text', 'bg')}/10`}>
                                        <Icon className={`w-6 h-6 ${color}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">{description}</CardDescription>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}