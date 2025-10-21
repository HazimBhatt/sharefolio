"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink, ArrowRight, Briefcase, Rocket, Code2, Palette } from "lucide-react";
import CountUp from "react-countup";
import Marquee from "react-fast-marquee";

// Client-only particles
const Particles = dynamic(() => import("react-tsparticles").then(m => m.default), { ssr: false });

const loadParticles = async (engine) => {
    const { loadSlim } = await import("tsparticles-slim");
    await loadSlim(engine);
};

const fmtDate = (v) => {
    try {
        if (!v) return "";
        const d = typeof v === "string" ? new Date(v) : v;
        if (isNaN(d)) return "";
        return d.toLocaleDateString(undefined, { month: "short", year: "numeric" });
    } catch { return ""; }
};
const range = (s, e, current) => {
    const a = fmtDate(s);
    const b = current ? "Present" : fmtDate(e);
    return a && b ? `${a} — ${b}` : (a || b || "");
};

// Demo dataset for quick testing at /v2/fabulous
const getDemo = () => ({
    template: "v2",
    subdomain: "fabulous",
    personalInfo: {
        firstName: "Ava",
        lastName: "Stone",
        professionalTitle: "Senior Frontend Engineer",
        bio: "I craft performant, accessible web experiences and design systems.",
        avatar: "https://avatars.githubusercontent.com/u/14101776?v=4",
        resumeUrl: "https://example.com/resume.pdf",
        location: "Remote",
        website: "https://example.com",
    },
    contact: {
        email: "ava@example.com",
        phone: "+1 555-0123",
        github: "https://github.com/",
        linkedin: "https://www.linkedin.com/",
        location: "Remote",
    },
    skills: [
        { name: "React", level: "expert", category: "Frontend" },
        { name: "Next.js", level: "expert", category: "Frontend" },
        { name: "TypeScript", level: "advanced", category: "Language" },
        { name: "Tailwind CSS", level: "advanced", category: "UI" },
        { name: "Node.js", level: "intermediate", category: "Backend" },
        { name: "Framer Motion", level: "advanced", category: "UI" },
    ],
    highlights: [
        { label: "Years", value: "6+" },
        { label: "Projects", value: "24" },
        { label: "Clients", value: "12" },
    ],
    projects: [
        {
            title: "Design System Platform",
            description: "Component library, tokens, and docs powering multiple apps.",
            technologies: ["React", "TS", "Storybook"],
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
            projectUrl: "https://example.com/ds",
            githubUrl: "https://github.com/",
            featured: true,
        },
        {
            title: "E‑commerce UI Revamp",
            description: "A11y-first, CLS-friendly, +18% conversion uplift.",
            technologies: ["Next.js", "Tailwind", "Framer"],
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
            projectUrl: "https://example.com/shop",
            githubUrl: "https://github.com/",
            featured: true,
        },
    ],
    experience: [
        { company: "Nimbus", position: "Senior FE Engineer", startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 3)), currentlyWorking: true, description: "Led platform UI, performance and accessibility.", location: "Remote" },
        { company: "Atlas", position: "Frontend Engineer", startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 5)), endDate: new Date(new Date().setFullYear(new Date().getFullYear() - 3)), description: "Built design systems and marketing experiences.", location: "NYC" },
    ],
    education: [
        { institution: "Tech University", degree: "B.Sc. CS", fieldOfStudy: "Software Engineering", startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 9)), endDate: new Date(new Date().setFullYear(new Date().getFullYear() - 5)) },
    ],
    testimonials: [
        { name: "Samir Khan", role: "PM, Nimbus", quote: "Ava delivers top‑tier frontend and elevates teams." },
        { name: "Dev Patel", role: "Lead Eng, Atlas", quote: "From DX to UX, her impact is measurable." },
    ],
    customization: { theme: { primaryColor: "#7c3aed", secondaryColor: "#06b6d4" } },
});

const levelPct = (level) => ({ beginner: 25, intermediate: 50, advanced: 75, expert: 92 }[(level || "").toLowerCase()] ?? 60);

export default function V2PortfolioPage() {
    const params = useParams();
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reducedMotion, setReducedMotion] = useState(false);

    const particlesOptions = useMemo(() => ({
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { repulse: { distance: 80, duration: 0.3 } },
        },
        particles: {
            number: { value: 160, density: { enable: true, area: 1400 } },
            color: { value: ["#60a5fa", "#a78bfa", "#22d3ee"] },
            shape: { type: ["circle", "triangle"] },
            move: { enable: true, speed: 0.25, outModes: { default: "out" } },
            opacity: { value: { min: 0.15, max: 0.55 }, animation: { enable: true, speed: 0.4, minimumValue: 0.15 } },
            size: { value: { min: 0.6, max: 2.2 }, animation: { enable: true, speed: 0.9, minimumValue: 0.6 } },
            links: { enable: true, distance: 130, opacity: 0.18, width: 1, color: "#dd0b0bff" },
        },
        detectRetina: true,
    }), []);

    const fetchPortfolio = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            if (params.slug === "fabulous") {
                setPortfolio(getDemo());
                return;
            }
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);
            const res = await fetch(`/api/portfolios/${params.slug}`, { signal: controller.signal });
            clearTimeout(timeoutId);
            if (!res.ok) throw new Error(res.status === 404 ? "Portfolio not found" : `Error ${res.status}`);
            const data = await res.json();
            if (!data.portfolio) throw new Error("Invalid portfolio data");
            setPortfolio(data.portfolio);
        } catch (e) {
            setError(e?.message || "Failed to load portfolio");
        } finally {
            setLoading(false);
        }
    }, [params.slug]);

    useEffect(() => { if (params.slug) fetchPortfolio(); }, [params.slug, fetchPortfolio]);

    // Respect prefers-reduced-motion
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const m = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handler = () => setReducedMotion(!!m.matches);
        handler();
        try { m.addEventListener('change', handler); } catch { m.addListener(handler); }
        return () => { try { m.removeEventListener('change', handler); } catch { m.removeListener(handler); } };
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-10 w-10 border-b-2 border-primary rounded-full" /></div>
    );
    if (error) return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <Card className="max-w-md w-full"><CardHeader><CardTitle>Error</CardTitle><CardDescription>{error}</CardDescription></CardHeader></Card>
        </div>
    );
    if (!portfolio) return null;

    const { personalInfo = {}, contact = {}, skills = [], projects = [], experience = [], education = [], testimonials = [] } = portfolio;
    const fullName = personalInfo.name || [personalInfo.firstName, personalInfo.lastName].filter(Boolean).join(" ").trim();
    const title = personalInfo.title || personalInfo.professionalTitle || "";
    const primary = portfolio.customization?.theme?.primaryColor || "#7c3aed";
    const secondary = portfolio.customization?.theme?.secondaryColor || "#06b6d4";

    // Group skills by category
    const grouped = skills.reduce((acc, s) => {
        const cat = typeof s === "object" && s?.category ? s.category : "General";
        const label = typeof s === "string" ? s : (s?.name || "");
        if (!label) return acc;
        (acc[cat] ||= []).push(s);
        return acc;
    }, {});

    const services = portfolio.services || [
        { title: "Frontend Engineering", description: "React, Next.js, TypeScript, performance, a11y, design systems.", icon: Code2 },
        { title: "UI/UX & Motion", description: "Tailwind, shadcn/ui, micro‑interactions, motion design.", icon: Palette },
        { title: "Product Acceleration", description: "Rapid prototyping, DX improvements, scalable component APIs.", icon: Rocket },
    ];

    const splitInHalf = (arr = []) => {
        const mid = Math.ceil(arr.length / 2);
        return [arr.slice(0, mid), arr.slice(mid)];
    };

    // Subtle, balanced tilt wrapper for tiles/cards
    const TiltItem = ({ idx = 0, children }) => {
        const angle = useMemo(() => (reducedMotion ? 0 : (idx % 2 === 0 ? -0.4 : 0.4)), [idx, reducedMotion]);
        return (
            <motion.div
                className="will-change-transform h-full"
                style={{ rotateZ: angle, transformOrigin: "center" }}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                whileHover={reducedMotion ? undefined : { rotateZ: 5.6, transition: { duration: 0.2 } }}
            >
                {children}
            </motion.div>
        );
    };

    // Two-page book spread with subtle per-spread tilt, center spine, and page numbers
    const BookSpread = ({ id, left, right, index = 0 }) => {
        const stableTilt = useMemo(() => {
            if (!id) return 0;
            const s = String(id);
            let h = 0;
            for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
            return ((h % 1000) / 1000) * 1.2 - 0.6; // [-0.6°, +0.6°]
        }, [id]);
        const leftNumber = index * 2 + 1;
        const rightNumber = leftNumber + 1;
        return (
            <section id={id} className="relative">
                <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tr from-transparent via-transparent to-black/0" />
                {/* Center spine */}
                <div className="pointer-events-none absolute inset-y-6 left-1/2 w-px -translate-x-1/2 bg-border/70" />
                <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        className="relative rounded-2xl border bg-card text-card-foreground shadow-2xl overflow-hidden"
                        style={{ rotateZ: reducedMotion ? 0 : stableTilt, transformOrigin: "center" }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        whileHover={reducedMotion ? undefined : { rotateZ: 0, transition: { duration: 0.2 } }}
                    >
                        <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-black/10 to-transparent" aria-hidden />
                        {/* subtle paper grain overlay */}
                        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(0,0,0,0.05) 0.5px, transparent 0.5px)", backgroundSize: "8px 8px", opacity: 0.06 }} aria-hidden />
                        {/* page number */}
                        <div className="pointer-events-none absolute bottom-3 left-5 text-[11px] text-muted-foreground/70 select-none tracking-wide">{leftNumber}</div>
                        {left}
                    </motion.div>
                    <motion.div
                        className="relative rounded-2xl border bg-card text-card-foreground shadow-2xl overflow-hidden"
                        style={{ rotateZ: reducedMotion ? 0 : -stableTilt, transformOrigin: "center" }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        whileHover={reducedMotion ? undefined : { rotateZ: 0, transition: { duration: 0.2 } }}
                    >
                        <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/10 to-transparent" aria-hidden />
                        {/* subtle paper grain overlay */}
                        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(rgba(0,0,0,0.05) 0.5px, transparent 0.5px)", backgroundSize: "8px 8px", opacity: 0.06 }} aria-hidden />
                        {/* page number */}
                        <div className="pointer-events-none absolute bottom-3 right-5 text-[11px] text-muted-foreground/70 select-none tracking-wide">{rightNumber}</div>
                        {right}
                    </motion.div>
                </div>
            </section>
        );
    };

    return (
        <div className="relative min-h-screen bg-background">
            {/* Tiled background layer */}
            <div
                className="absolute inset-0 -z-20"
                style={{
                    backgroundImage: "radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                }}
            />
            {/* Particles background */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                {!reducedMotion && <Particles id="v2-particles" init={loadParticles} options={particlesOptions} />}
            </div>

            <main className="max-w-7xl mx-auto px-6 py-20 space-y-24 [perspective:1200px]">
                {/* Cover Page */}
                <BookSpread
                    id="home"
                    index={0}
                    left={(
                        <div className="space-y-6 p-8 md:p-12">
                            <p className="uppercase tracking-widest text-xs text-muted-foreground">Portfolio</p>
                            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(90deg, ${primary}, ${secondary})` }}>{fullName || "Your Name"}</span>
                            </h1>
                            {title && <p className="text-xl text-muted-foreground">{title}</p>}
                            {personalInfo.bio && <p className="text-muted-foreground max-w-prose">{personalInfo.bio}</p>}
                            <div className="flex flex-wrap gap-3">
                                {personalInfo.resumeUrl && (
                                    <Button asChild><a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">Download Resume <ArrowRight className="h-4 w-4 ml-2" /></a></Button>
                                )}
                                {contact.github && (
                                    <Button variant="outline" asChild><a href={contact.github} target="_blank" rel="noopener noreferrer"><Github className="h-4 w-4 mr-2" />GitHub</a></Button>
                                )}
                                {contact.linkedin && (
                                    <Button variant="outline" asChild><a href={contact.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="h-4 w-4 mr-2" />LinkedIn</a></Button>
                                )}
                            </div>
                        </div>
                    )}
                    right={(
                        <div className="relative p-8 md:p-12">
                            <div className="grid grid-cols-2 gap-4">
                                {projects.slice(0, 2).map((p, i) => (
                                    <TiltItem key={i} idx={i}>
                                        <div className="relative rounded-2xl overflow-hidden border transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl h-full">
                                            {p?.image && <Image src={p.image} alt={p.title} width={800} height={600} className="object-cover w-full h-56" />}
                                            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-white">
                                                <div className="text-sm font-medium">{p.title}</div>
                                            </div>
                                        </div>
                                    </TiltItem>
                                ))}
                            </div>
                            {skills.length > 0 && (
                                <div className="mt-6 rounded-xl border p-3">
                                    <Marquee gradient={false} speed={40} pauseOnHover>
                                        <div className="flex items-center gap-6">
                                            {skills.map((s, i) => {
                                                const label = typeof s === 'string' ? s : (s?.name || '');
                                                return label ? <span key={i} className="text-sm text-muted-foreground">{label}</span> : null;
                                            })}
                                        </div>
                                    </Marquee>
                                </div>
                            )}
                        </div>
                    )}
                />

                {/* About Page */}
                <BookSpread
                    id="about"
                    index={1}
                    left={(
                        <div className="p-8 md:p-12 space-y-6">
                            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl border">
                                <Image src={personalInfo.avatar || "https://avatars.githubusercontent.com/u/14101776?v=4"} alt={fullName || "Avatar"} fill className="object-cover" />
                            </div>
                            <div className="grid sm:grid-cols-3 gap-4">
                                {(portfolio.highlights || []).map((h, i) => {
                                    const digits = parseInt(String(h.value).replace(/\D/g, ''), 10);
                                    const suffix = String(h.value).replace(/\d/g, '');
                                    return (
                                        <TiltItem key={i} idx={i}>
                                            <Card className="h-full">
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="text-3xl">
                                                        {Number.isFinite(digits) ? <><CountUp end={digits} duration={1.2} />{suffix}</> : h.value}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="pt-0"><p className="text-sm text-muted-foreground">{h.label}</p></CardContent>
                                            </Card>
                                        </TiltItem>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    right={(
                        <div className="p-8 md:p-12 space-y-6">
                            <h2 className="text-2xl font-semibold">About</h2>
                            {personalInfo.bio && <p className="text-muted-foreground leading-relaxed">{personalInfo.bio}</p>}
                            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                {personalInfo.location && (<span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{personalInfo.location}</span>)}
                                {personalInfo.website && (<a className="inline-flex items-center gap-1 hover:underline" href={personalInfo.website} target="_blank" rel="noopener noreferrer"><Globe className="h-3 w-3" />Website</a>)}
                            </div>
                        </div>
                    )}
                />

                {/* Services (new) */}
                <BookSpread
                    id="services"
                    index={2}
                    left={(
                        <div className="p-8 md:p-12 space-y-6">
                            <h2 className="text-2xl font-semibold">Services</h2>
                            <div className="space-y-4">
                                {services.slice(0, Math.ceil(services.length / 2)).map((s, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <s.icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                                        <div>
                                            <div className="font-medium">{s.title}</div>
                                            <div className="text-sm text-muted-foreground">{s.description}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    right={(
                        <div className="p-8 md:p-12 space-y-6">
                            <h2 className="text-2xl font-semibold">More</h2>
                            <div className="space-y-4">
                                {services.slice(Math.ceil(services.length / 2)).map((s, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <s.icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                                        <div>
                                            <div className="font-medium">{s.title}</div>
                                            <div className="text-sm text-muted-foreground">{s.description}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                />

                {/* Skills */}
                {Object.keys(grouped).length > 0 && (() => {
                    const entries = Object.entries(grouped);
                    const [leftCats, rightCats] = splitInHalf(entries);
                    return (
                        <BookSpread
                            id="skills"
                            index={3}
                            left={(
                                <div className="p-8 md:p-12 space-y-6">
                                    <h2 className="text-2xl font-semibold">Skills</h2>
                                    <div className="grid gap-6">
                                        {leftCats.map(([cat, list], i) => (
                                            <TiltItem key={cat} idx={i}>
                                                <Card className="p-5 h-full">
                                                    <div className="text-sm text-muted-foreground mb-3">{cat}</div>
                                                    <div className="space-y-3">
                                                        {list.map((s, i) => {
                                                            const label = typeof s === "string" ? s : (s?.name || "");
                                                            const pct = levelPct(typeof s === "object" ? s.level : undefined);
                                                            if (!label) return null;
                                                            return (
                                                                <div key={s?._id || `${cat}-${i}`}>
                                                                    <div className="flex items-center justify-between mb-1">
                                                                        <span className="text-sm font-medium">{label}</span>
                                                                        <span className="text-xs text-muted-foreground">{pct}%</span>
                                                                    </div>
                                                                    <Progress value={pct} />
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </Card>
                                            </TiltItem>
                                        ))}
                                    </div>
                                </div>
                            )}
                            right={(
                                <div className="p-8 md:p-12 space-y-6">
                                    <h2 className="text-2xl font-semibold opacity-0 select-none">Skills</h2>
                                    <div className="grid gap-6">
                                        {rightCats.map(([cat, list], i) => (
                                            <TiltItem key={cat} idx={i}>
                                                <Card className="p-5 h-full">
                                                    <div className="text-sm text-muted-foreground mb-3">{cat}</div>
                                                    <div className="space-y-3">
                                                        {list.map((s, i) => {
                                                            const label = typeof s === "string" ? s : (s?.name || "");
                                                            const pct = levelPct(typeof s === "object" ? s.level : undefined);
                                                            if (!label) return null;
                                                            return (
                                                                <div key={s?._id || `${cat}-${i}`}>
                                                                    <div className="flex items-center justify-between mb-1">
                                                                        <span className="text-sm font-medium">{label}</span>
                                                                        <span className="text-xs text-muted-foreground">{pct}%</span>
                                                                    </div>
                                                                    <Progress value={pct} />
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </Card>
                                            </TiltItem>
                                        ))}
                                    </div>
                                </div>
                            )}
                        />
                    );
                })()}

                {/* Featured Projects */}
                {projects.length > 0 && (() => {
                    const [leftProj, rightProj] = splitInHalf(projects);
                    const renderList = (list) => (
                        <div className="grid gap-6">
                            {list.map((p, i) => (
                                <TiltItem key={i} idx={i}>
                                    <Card className="overflow-hidden h-full">
                                        {p?.image && (
                                            <div className="relative h-56 w-full">
                                                <Image src={p.image} alt={p.title} fill className="object-cover" />
                                            </div>
                                        )}
                                        <div className="p-5 space-y-3">
                                            <div className="flex items-start justify-between gap-3">
                                                <h3 className="text-lg font-medium">{p.title}</h3>
                                                <div className="flex gap-2">
                                                    {p.projectUrl && (
                                                        <Button size="sm" variant="outline" asChild><a href={p.projectUrl} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" /></a></Button>
                                                    )}
                                                    {p.githubUrl && (
                                                        <Button size="sm" variant="outline" asChild><a href={p.githubUrl} target="_blank" rel="noopener noreferrer"><Github className="h-4 w-4" /></a></Button>
                                                    )}
                                                </div>
                                            </div>
                                            {p.description && <p className="text-sm text-muted-foreground">{p.description}</p>}
                                            {p.technologies?.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {p.technologies.map((t, j) => <Badge key={j} variant="outline" className="text-xs">{typeof t === "string" ? t : String(t)}</Badge>)}
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                </TiltItem>
                            ))}
                        </div>
                    );
                    return (
                        <BookSpread
                            id="projects"
                            index={4}
                            left={(
                                <div className="p-8 md:p-12 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-semibold">Featured Projects</h2>
                                        <span className="text-sm text-muted-foreground">{projects.length} projects</span>
                                    </div>
                                    {renderList(leftProj)}
                                </div>
                            )}
                            right={(
                                <div className="p-8 md:p-12 space-y-6">
                                    <h2 className="text-2xl font-semibold opacity-0 select-none">Featured Projects</h2>
                                    {renderList(rightProj)}
                                </div>
                            )}
                        />
                    );
                })()}

                {/* Experience */}
                {experience.length > 0 && (() => {
                    const [leftExp, rightExp] = splitInHalf(experience);
                    const renderExp = (list) => (
                        <div className="space-y-6 relative">
                            <div className="absolute left-3 top-0 bottom-0 w-px bg-border" aria-hidden />
                            {list.map((e, i) => (
                                <div key={i} className="relative pl-8">
                                    <span className="absolute left-0 top-2 h-3 w-3 rounded-full" style={{ backgroundColor: primary }} />
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="font-medium flex items-center gap-2"><Briefcase className="h-4 w-4" />{e.position}</div>
                                            <p className="text-sm text-muted-foreground">{e.company}</p>
                                        </div>
                                        <span className="text-xs text-muted-foreground whitespace-nowrap">{range(e.startDate, e.endDate, e.currentlyWorking)}</span>
                                    </div>
                                    {e.location && <p className="text-xs text-muted-foreground mt-1">{e.location}</p>}
                                    {e.description && <p className="text-sm mt-3 leading-relaxed">{e.description}</p>}
                                </div>
                            ))}
                        </div>
                    );
                    return (
                        <BookSpread
                            id="experience"
                            index={5}
                            left={(
                                <div className="p-8 md:p-12 space-y-6">
                                    <h2 className="text-2xl font-semibold">Experience</h2>
                                    {renderExp(leftExp)}
                                </div>
                            )}
                            right={(
                                <div className="p-8 md:p-12 space-y-6">
                                    <h2 className="text-2xl font-semibold opacity-0 select-none">Experience</h2>
                                    {renderExp(rightExp)}
                                </div>
                            )}
                        />
                    );
                })()}

                {/* Testimonials */}
                {testimonials.length > 0 && (() => {
                    const [leftT, rightT] = splitInHalf(testimonials);
                    const renderT = (list) => (
                        <div className="grid gap-6">
                            {list.map((t, i) => (
                                <TiltItem key={i} idx={i}>
                                    <Card className="h-full">
                                        <CardHeader>
                                            <CardTitle className="text-base">{t.name}</CardTitle>
                                            <CardDescription>{t.role}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm leading-relaxed">“{t.quote}”</p>
                                        </CardContent>
                                    </Card>
                                </TiltItem>
                            ))}
                        </div>
                    );
                    return (
                        <BookSpread
                            id="testimonials"
                            index={6}
                            left={(
                                <div className="p-8 md:p-12 space-y-6">
                                    <h2 className="text-2xl font-semibold">Testimonials</h2>
                                    {renderT(leftT)}
                                </div>
                            )}
                            right={(
                                <div className="p-8 md:p-12 space-y-6">
                                    <h2 className="text-2xl font-semibold opacity-0 select-none">Testimonials</h2>
                                    {renderT(rightT)}
                                </div>
                            )}
                        />
                    );
                })()}

                {/* Contact */}
                {(contact.email || contact.phone) && (
                    <BookSpread
                        id="contact"
                        index={7}
                        left={(
                            <div className="p-12 space-y-6">
                                <h2 className="text-2xl font-semibold">Get In Touch</h2>
                                <div className="flex flex-wrap gap-4">
                                    {contact.email && (
                                        <Button asChild><Link href={`mailto:${contact.email}`}><Mail className="h-4 w-4 mr-2" />Email</Link></Button>
                                    )}
                                    {contact.phone && (
                                        <Button variant="outline" asChild><Link href={`tel:${contact.phone}`}><Phone className="h-4 w-4 mr-2" />Call</Link></Button>
                                    )}
                                </div>
                            </div>
                        )}
                        right={(
                            <div className="p-12 space-y-6">
                                <h2 className="text-2xl font-semibold">Links</h2>
                                <div className="flex flex-wrap gap-3">
                                    {contact.github && (
                                        <Button variant="outline" asChild><a href={contact.github} target="_blank" rel="noopener noreferrer"><Github className="h-4 w-4 mr-2" />GitHub</a></Button>
                                    )}
                                    {contact.linkedin && (
                                        <Button variant="outline" asChild><a href={contact.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="h-4 w-4 mr-2" />LinkedIn</a></Button>
                                    )}
                                    {personalInfo.website && (
                                        <Button variant="outline" asChild><a href={personalInfo.website} target="_blank" rel="noopener noreferrer"><Globe className="h-4 w-4 mr-2" />Website</a></Button>
                                    )}
                                </div>
                            </div>
                        )}
                    />
                )}
            </main>
        </div>
    );
}
