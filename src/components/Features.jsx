'use client';
import { motion, useInView } from 'framer-motion';
import {
    Sparkles, LayoutTemplate, BarChart, Zap,
    ShieldCheck, Languages, Smartphone, RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRef } from 'react';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Features() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    // const router = useRouter();

    const features = [
        { title: "AI-Powered Generation", icon: Sparkles, color: "text-purple-500", description: "Advanced AI technology crafts personalized, context-aware proposals that resonate with clients." },
        { title: "Professional Templates", icon: LayoutTemplate, color: "text-blue-500", description: "Access 50+ industry-specific templates designed by hiring experts across various fields." },
        { title: "Success Prediction", icon: BarChart, color: "text-green-500", description: "AI analyzes your proposal and predicts your chances of winning the project." },
        { title: "One-Click Optimization", icon: Zap, color: "text-yellow-500", description: "Instantly improve existing proposals with our optimization engine for better results." },
        { title: "Enterprise Security", icon: ShieldCheck, color: "text-red-500", description: "top-grade encryption ensures your data and client information remain completely private." },
        { title: "Multi-Language Support", icon: Languages, color: "text-cyan-500", description: "Generate proposals in 15+ languages with native-level fluency and cultural adaptation." },
        { title: "Mobile Optimization", icon: Smartphone, color: "text-pink-500", description: "Full mobile experience with native apps for iOS and Android to create proposals on-the-go." },
        { title: "Continuous Updates", icon: RefreshCw, color: "text-orange-500", description: "Regular feature updates and template expansions based on market trends and user feedback." }
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
                        className="inline-flex items-center bg-[#7332a8] gap-2 px-4 py-2 mb-4 text-sm font-medium rounded-full "
                    >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span>POWERFUL FEATURES</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold"
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
                    {features.map(({ title, icon: Icon, color, description }, index) => (
                        <motion.div key={index} variants={item} className="w-full">
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