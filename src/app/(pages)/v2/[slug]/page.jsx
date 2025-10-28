"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram, 
  ExternalLink, ArrowRight, Briefcase, GraduationCap, Calendar, User, Star
} from "lucide-react";
import CountUp from "react-countup";

// Client-only particles (optional, kept but disabled by default for sleekness)
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

// Icon mapping for social links
const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  website: Globe,
};

const getSocialIcon = (platform) => {
  const normalizedPlatform = platform?.toLowerCase();
  return socialIcons[normalizedPlatform] || Globe;
};

// Enhanced demo dataset with all fields
const getDemo = () => ({
  template: "v2",
  subdomain: "fabulous",
  personalInfo: {
    firstName: "Ava",
    lastName: "Stone",
    professionalTitle: "Senior Frontend Engineer",
    bio: "I craft performant, accessible web experiences and design systems with over 6 years of experience in modern web technologies.",
    avatar: "https://avatars.githubusercontent.com/u/14101776?v=4",
    resumeUrl: "https://example.com/resume.pdf",
    location: "San Francisco, CA",
    website: "https://avastone.dev",
  },
  contact: {
    email: "hello@avastone.dev",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://avastone.dev",
  },
  socialLinks: [
    { platform: "github", url: "https://github.com/avastone", icon: "github" },
    { platform: "linkedin", url: "https://linkedin.com/in/avastone", icon: "linkedin" },
    { platform: "twitter", url: "https://twitter.com/avastone", icon: "twitter" },
  ],
  skills: [
    { name: "React", level: "expert", category: "Frontend" },
    { name: "Next.js", level: "expert", category: "Frontend" },
    { name: "TypeScript", level: "advanced", category: "Language" },
    { name: "Tailwind CSS", level: "advanced", category: "UI" },
    { name: "Node.js", level: "intermediate", category: "Backend" },
    { name: "Framer Motion", level: "advanced", category: "Animation" },
    { name: "GraphQL", level: "intermediate", category: "Backend" },
    { name: "AWS", level: "intermediate", category: "DevOps" },
  ],
  highlights: [
    { label: "Years Experience", value: "6+" },
    { label: "Projects Completed", value: "50+" },
    { label: "Happy Clients", value: "32" },
  ],
  projects: [
    {
      title: "Design System Platform",
      description: "Enterprise-grade component library with comprehensive documentation and design tokens used across multiple applications.",
      technologies: ["React", "TypeScript", "Storybook", "Tailwind"],
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop",
      projectUrl: "https://design-system.example.com",
      githubUrl: "https://github.com/avastone/design-system",
      featured: true,
    },
    {
      title: "E-commerce Platform",
      description: "High-performance e-commerce solution with optimized Core Web Vitals and seamless user experience.",
      technologies: ["Next.js", "Stripe", "Sanity CMS", "Vercel"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
      projectUrl: "https://store.example.com",
      githubUrl: "https://github.com/avastone/ecommerce",
      featured: true,
    },
    {
      title: "AI Dashboard",
      description: "Real-time analytics dashboard with AI-powered insights and interactive data visualizations.",
      technologies: ["React", "D3.js", "FastAPI", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      projectUrl: "https://dashboard.example.com",
      githubUrl: "https://github.com/avastone/ai-dashboard",
      featured: true,
    },
  ],
  experience: [
    { 
      company: "TechCorp Inc", 
      position: "Senior Frontend Engineer", 
      startDate: new Date("2022-03-01"), 
      currentlyWorking: true, 
      description: "Lead frontend development for customer-facing applications. Mentor junior developers and establish coding standards.",
      location: "San Francisco, CA" 
    },
    { 
      company: "StartupXYZ", 
      position: "Frontend Developer", 
      startDate: new Date("2020-01-15"), 
      endDate: new Date("2022-02-28"), 
      description: "Built responsive web applications and collaborated with design team to implement pixel-perfect UIs.",
      location: "Remote" 
    },
    { 
      company: "DigitalAgency", 
      position: "Web Developer", 
      startDate: new Date("2018-06-01"), 
      endDate: new Date("2019-12-31"), 
      description: "Developed websites and web applications for various clients using modern JavaScript frameworks.",
      location: "New York, NY" 
    },
  ],
  education: [
    { 
      institution: "Stanford University", 
      degree: "Master of Science", 
      fieldOfStudy: "Computer Science", 
      startDate: new Date("2016-09-01"), 
      endDate: new Date("2018-05-31"),
      description: "Specialized in Human-Computer Interaction and Web Technologies." 
    },
    { 
      institution: "MIT", 
      degree: "Bachelor of Science", 
      fieldOfStudy: "Software Engineering", 
      startDate: new Date("2012-09-01"), 
      endDate: new Date("2016-05-31"),
      description: "Graduated Summa Cum Laude with focus on frontend architectures." 
    },
  ],
  services: [
    { 
      title: "Frontend Development", 
      description: "Modern React applications with TypeScript, Next.js, and optimal performance.",
      icon: User 
    },
    { 
      title: "UI/UX Design", 
      description: "Beautiful, accessible interfaces with seamless user experiences and micro-interactions.",
      icon: User 
    },
    { 
      title: "Technical Consulting", 
      description: "Architecture reviews, performance optimization, and team mentoring.",
      icon: User 
    },
  ],
  customization: { 
    theme: { 
      primaryColor: "#7c3aed", 
      secondaryColor: "#06b6d4",
      fontFamily: "inter" 
    } 
  },
});

const levelPct = (level) => ({ 
  beginner: 30, 
  intermediate: 60, 
  advanced: 80, 
  expert: 95 
}[level?.toLowerCase()] || 50);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function V2PortfolioPage() {
  const params = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolio = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      if (params.slug === "fabulous") {
        setTimeout(() => setPortfolio(getDemo()), 800);
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

  useEffect(() => { 
    if (params.slug) fetchPortfolio(); 
  }, [params.slug, fetchPortfolio]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div 
        className="text-center space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"
        />
        <p className="text-muted-foreground">Loading portfolio...</p>
      </motion.div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-destructive">Error</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={fetchPortfolio}>Retry</Button>
        </CardContent>
      </Card>
    </div>
  );

  if (!portfolio) return null;

  const { 
    personalInfo = {}, 
    contact = {}, 
    skills = [], 
    projects = [], 
    experience = [], 
    education = [], 
    socialLinks = [],
    services = [],
    highlights = [],
    professionalDescription,
    customization = {}
  } = portfolio;

  const fullName = personalInfo.name || [personalInfo.firstName, personalInfo.lastName].filter(Boolean).join(" ").trim();
  const title = personalInfo.title || personalInfo.professionalTitle || "";
  const bio = personalInfo.bio || professionalDescription || "";
  const primary = customization?.theme?.primaryColor || "#7c3aed";
  const secondary = customization?.theme?.secondaryColor || "#06b6d4";

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill?.category || "Other Skills";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  // Icon components for services (simplified)
  const iconComponents = { User, Briefcase, GraduationCap };
  const enhancedServices = services.map((service, index) => ({
    ...service,
    icon: iconComponents[index % iconComponents.length] || User
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-7xl mx-auto px-4 py-20 space-y-24">
        {/* Hero Section */}
        <motion.section 
          className="grid lg:grid-cols-2 gap-12 items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <Badge variant="outline">Welcome</Badge>
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {fullName}
            </h1>
            {title && <p className="text-2xl font-medium text-muted-foreground">{title}</p>}
            {bio && <p className="text-lg text-muted-foreground leading-relaxed">{bio}</p>}
            <div className="flex flex-wrap gap-4 items-center">
              {personalInfo.resumeUrl && (
                <Button asChild size="lg" className="rounded-full">
                  <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
                    Download Resume <ArrowRight className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              )}
              {socialLinks.length > 0 && (
                <div className="flex gap-2">
                  {socialLinks.map((link, index) => {
                    const Icon = getSocialIcon(link.platform);
                    return (
                      <Button key={index} variant="outline" size="icon" asChild className="rounded-full h-12 w-12">
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          <Icon className="h-5 w-5" />
                        </a>
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-6 lg:text-right">
            {personalInfo.avatar && (
              <Avatar className="w-48 h-48 mx-auto lg:mx-0">
                <AvatarImage src={personalInfo.avatar} />
                <AvatarFallback className="w-48 h-48 text-4xl bg-gradient-to-r from-primary to-secondary">
                  {fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            )}
            {highlights.length > 0 && (
              <div className="grid grid-cols-3 gap-4 pt-4">
                {highlights.map((h, i) => (
                  <Card key={i} className="text-center">
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold">
                        {h.value.includes('+') ? h.value : <CountUp end={parseInt(h.value)} duration={2} />}
                      </div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">{h.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        </motion.section>

        {/* About Section */}
        <motion.section variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center">About Me</motion.h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div variants={itemVariants}>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{bio}</p>
              <div className="space-y-4">
                {(personalInfo.location || contact.location) && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-primary" />
                    {personalInfo.location || contact.location}
                  </div>
                )}
                {contact.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href={`mailto:${contact.email}`} className="hover:text-foreground">{contact.email}</a>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="h-5 w-5 text-primary" />
                    {contact.phone}
                  </div>
                )}
                {(personalInfo.website || contact.website) && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-primary" />
                    <a href={personalInfo.website || contact.website} className="hover:text-foreground">{personalInfo.website || contact.website}</a>
                  </div>
                )}
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="justify-self-center md:justify-self-end">
              {personalInfo.avatar ? (
                <Image src={personalInfo.avatar} alt={fullName} width={300} height={300} className="rounded-2xl" />
              ) : (
                <div className="w-64 h-64 bg-muted rounded-2xl flex items-center justify-center">
                  <User className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          </div>
        </motion.section>

        {/* Projects Section */}
        {projects.length > 0 && (
          <motion.section variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <Badge variant="outline">Featured Work</Badge>
              <h2 className="text-4xl font-bold">Projects</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                    {project.image && (
                      <div className="relative h-48">
                        <Image src={project.image} alt={project.title} fill className="object-cover" />
                        {project.featured && (
                          <Badge className="absolute top-2 right-2">Featured</Badge>
                        )}
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    {project.technologies?.length > 0 && (
                      <CardContent className="pt-0">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, tIndex) => (
                            <Badge key={tIndex} variant="secondary">{tech}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    )}
                    <CardFooter className="flex justify-between">
                      {project.projectUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">Live</a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">Code</a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <motion.section variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center">Skills</motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Object.entries(groupedSkills).map(([category, categorySkills], cIndex) => (
                <motion.div key={category} variants={itemVariants}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{category}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {categorySkills.map((skill, sIndex) => {
                        const skillName = skill.name || skill;
                        const skillLevel = skill.level || 'intermediate';
                        return (
                          <div key={sIndex} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{skillName}</span>
                              <span className="capitalize text-muted-foreground">{skillLevel}</span>
                            </div>
                            <Progress value={levelPct(skillLevel)} className="h-2" />
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Experience Section */}
        {experience.length > 0 && (
          <motion.section variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center">Experience</motion.h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div key={index} variants={itemVariants} className="group">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h3 className="text-xl font-semibold">{exp.position}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {range(exp.startDate, exp.endDate, exp.currentlyWorking)}
                        </div>
                      </div>
                      <p className="font-medium">{exp.company}</p>
                      {exp.location && <p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-4 w-4" />{exp.location}</p>}
                      <p className="text-muted-foreground">{exp.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <motion.section variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center">Education</motion.h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h3 className="text-xl font-semibold">{edu.degree} in {edu.fieldOfStudy}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {range(edu.startDate, edu.endDate)}
                        </div>
                      </div>
                      <p className="font-medium">{edu.institution}</p>
                      <p className="text-muted-foreground">{edu.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Services Section */}
        {services.length > 0 && (
          <motion.section variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center">Services</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {enhancedServices.map((service, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="text-center hover:shadow-md transition-shadow">
                    <CardHeader>
                      <service.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                      <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Contact Section */}
        <motion.section variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 text-center">
          <motion.div variants={itemVariants} className="space-y-4">
            <Badge variant="outline">Let's Connect</Badge>
            <h2 className="text-4xl font-bold">Get In Touch</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Interested in working together? Reach out via email or social media.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-md mx-auto">
            {contact.email && (
              <motion.div variants={itemVariants}>
                <Button asChild size="lg" className="w-full rounded-full">
                  <a href={`mailto:${contact.email}`}>
                    <Mail className="h-5 w-5 mr-2" />
                    Send Email
                  </a>
                </Button>
              </motion.div>
            )}
            {contact.phone && (
              <motion.div variants={itemVariants}>
                <Button variant="outline" size="lg" className="w-full rounded-full" asChild>
                  <a href={`tel:${contact.phone}`}>
                    <Phone className="h-5 w-5 mr-2" />
                    Call Me
                  </a>
                </Button>
              </motion.div>
            )}
          </div>
          {socialLinks.length > 0 && (
            <motion.div variants={itemVariants} className="flex justify-center gap-4 pt-8">
              {socialLinks.map((link, index) => {
                const Icon = getSocialIcon(link.platform);
                return (
                  <Button key={index} variant="outline" size="icon" asChild className="rounded-full h-12 w-12">
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <Icon className="h-5 w-5" />
                    </a>
                  </Button>
                );
              })}
            </motion.div>
          )}
        </motion.section>
      </main>

      <footer className="border-t border-border/20 mt-20 py-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {fullName}. All rights reserved.</p>
      </footer>
    </div>
  );
}