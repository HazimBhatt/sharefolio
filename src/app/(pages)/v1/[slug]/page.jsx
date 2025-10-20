'use client';

import React,{ useState, useEffect, useCallback, useRef, useMemo, lazy, Suspense } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { 
  Progress 
} from "@/components/ui/progress";
import { 
  Button 
} from "@/components/ui/button";
import { 
  Badge 
} from "@/components/ui/badge";
import { 
  Skeleton 
} from "@/components/ui/skeleton";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Github, 
  ExternalLink,
  Calendar,
  Briefcase,
  GraduationCap,
  Download,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Star,
  Code,
  Palette,
  Award,
  Zap,
  Heart,
  Rocket,
  Target,
  Users,
  TrendingUp
} from 'lucide-react';

// Lazy load heavy components
const LazyTypewriter = lazy(() => import('@/components/v1/LazyTypewriter'));
const LazyParticles = lazy(() => import('@/components/v1/LazyParticles'));

// Optimized Typewriter with performance improvements
const Typewriter = ({ text, speed = 50, className = "" }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const animationRef = useRef(null);

  useEffect(() => {
    if (currentIndex < text.length) {
      animationRef.current = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => {
        if (animationRef.current) {
          clearTimeout(animationRef.current);
        }
      };
    }
  }, [currentIndex, text, speed]);

  return <span className={className}>{displayText}</span>;
};

// Optimized Floating Particles
const FloatingParticles = () => {
  const particles = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      size: Math.random() * 3 + 1,
    }))
  , []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-primary/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 1, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Performance optimized main component
export default function PortfolioPage() {
  const params = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolio = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(`/api/portfolios/${params.slug}`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Portfolio not found');
        }
        throw new Error(`Failed to fetch portfolio: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.portfolio) {
        throw new Error('Invalid portfolio data');
      }
      
      setPortfolio(data.portfolio);
    } catch (err) {
      setError(err.name === 'AbortError' ? 'Request timeout' : err.message);
    } finally {
      setLoading(false);
    }
  }, [params.slug]);

  useEffect(() => {
    if (params.slug) {
      fetchPortfolio();
    }
  }, [params.slug, fetchPortfolio]);

  if (loading) {
    return <PortfolioLoading />;
  }

  if (error) {
    return <PortfolioNotFound error={error} />;
  }

  if (!portfolio) {
    return <PortfolioNotFound error="Portfolio not found" />;
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />}>
          <FloatingParticles />
        </Suspense>
        <PortfolioTemplate data={portfolio} />
      </div>
    </LazyMotion>
  );
}

// Enhanced Loading Component with skeleton screens
const PortfolioLoading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8 max-w-md mx-auto px-6"
      >
        {/* Animated Logo/Icon */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity }
          }}
          className="relative mx-auto w-20 h-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 rounded-full blur-md opacity-50" />
          <div className="relative w-20 h-20 border-4 border-primary/30 rounded-full flex items-center justify-center">
            <Rocket className="h-8 w-8 text-primary" />
          </div>
        </motion.div>

        {/* Animated Text */}
        <div className="space-y-4">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Skeleton className="h-8 w-48 mx-auto" />
          </motion.div>
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "60%" }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="h-2 bg-primary/20 rounded-full mx-auto overflow-hidden"
        >
          <motion.div
            animate={{ x: [-100, 100] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-1/4 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

// Enhanced Error Component
const PortfolioNotFound = ({ error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 0.6,
          type: "spring",
          stiffness: 100
        }}
        className="w-full max-w-md"
      >
        <Card className="border-2 border-destructive/20 shadow-2xl relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent" />
          
          <CardHeader className="text-center space-y-6 relative z-10">
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex justify-center"
            >
              <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
                <Sparkles className="h-10 w-10 text-destructive" />
              </div>
            </motion.div>
            
            <div className="space-y-3">
              <CardTitle className="text-2xl md:text-3xl text-destructive">
                Portfolio Not Found
              </CardTitle>
              <CardDescription className="text-base md:text-lg">
                {error || "This portfolio doesn't exist or isn't published yet."}
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="text-center space-y-4 relative z-10">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={() => window.location.href = '/'}
                className="w-full gap-2"
                variant="destructive"
                size="lg"
              >
                <ArrowRight className="h-4 w-4" />
                Back to Home
              </Button>
            </motion.div>
            
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
              className="w-full gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

// Optimized Portfolio Template
const PortfolioTemplate = React.memo(({ data }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const observerRef = useRef(null);

  // Safe data destructuring with fallbacks
  const {
    personalInfo = {},
    contact = {},
    professionalDescription = '',
    skills = [],
    experience = [],
    education = [],
    projects = [],
    socialLinks = [],
    customization = {}
  } = data;

  const theme = customization?.theme || {};
  const primaryColor = theme.primaryColor || 'hsl(var(--primary))';

  // Memoized navigation items
  const navItems = useMemo(() => {
    const items = [
      { id: 'home', label: 'Home', icon: Sparkles },
      { id: 'about', label: 'About', icon: Palette },
    ];

    if (skills?.length > 0) items.push({ id: 'skills', label: 'Skills', icon: Code });
    if (experience?.comany > 0) items.push({ id: 'experience', label: 'Experience', icon: Briefcase });
    if (education?.length > 0) items.push({ id: 'education', label: 'Education', icon: GraduationCap });
    if (projects?.length > 0) items.push({ id: 'projects', label: 'Projects', icon: Star });
    items.push({ id: 'contact', label: 'Contact', icon: Mail });

    return items;
  }, [skills, experience, education, projects]);

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      cancelAnimationFrame(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = requestAnimationFrame(() => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      
      for (const { id } of navItems) {
        const section = document.getElementById(id);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    });
  }, [navItems]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    observerRef.current = observer;
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsVisible(true);
    const scrollHandler = () => handleScroll();
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      if (scrollTimeoutRef.current) {
        cancelAnimationFrame(scrollTimeoutRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleScroll]);

  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="WebsiteMainContainer"
        >
          <Header 
            personalInfo={personalInfo}
            navItems={navItems}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            primaryColor={primaryColor}
          />
          
          <main>
            <HomeSection 
              personalInfo={personalInfo}
              contact={contact}
              resumeUrl={personalInfo?.resumeUrl}
              socialLinks={socialLinks}
            />
            
            <AboutSection 
              personalInfo={personalInfo}
              professionalDescription={professionalDescription}
              contact={contact}
            />
            
            {skills?.length > 0 && (
              <SkillsSection 
                skills={skills}
              />
            )}
            
            {experience?.length > 0 && (
              <ExperienceSection 
                experience={experience}
              />
            )}
            
            {education?.length > 0 && (
              <EducationSection 
                education={education}
              />
            )}
            
            {projects?.length > 0 && (
              <ProjectsSection 
                projects={projects}
              />
            )}
            
            <ContactSection 
              contact={contact}
              socialLinks={socialLinks}
            />
          </main>
          
          <Footer 
            personalInfo={personalInfo}
            socialLinks={socialLinks}
          />
          
          {/* Back to Top Button */}
          <BackToTop />
        </motion.div>
      )}
    </AnimatePresence>
  );
});

PortfolioTemplate.displayName = 'PortfolioTemplate';

// Enhanced Header with better performance
const Header = React.memo(({ personalInfo, navItems, activeSection, scrollToSection, primaryColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeMenu]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 poppins-regular transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-lg border-b shadow-2xl shadow-black/5' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('home')}
        >
          <Avatar className="h-9 w-9 border-2 border-primary/20 shadow-lg">
            <AvatarImage 
              src={personalInfo?.avatar} 
              alt={`${personalInfo?.firstName}'s avatar`}
              loading="eager"
            />
            <AvatarFallback className="text-sm font-bold bg-gradient-to-r from-primary to-primary/60 text-white">
              {getUserInitials(personalInfo)}
            </AvatarFallback>
          </Avatar>
          <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {personalInfo?.firstName || 'Portfolio'}
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.li 
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant={ "ghost"}
                    size="sm"
                    onClick={() => scrollToSection(item.id)}
                    className="gap-2 relative group px-4"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                    <motion.div
                      className={`absolute bottom-0 left-1/2 w-4/5 h-0.5 bg-primary rounded-full ${
                        activeSection === item.id ? 'scale-100' : 'scale-0 group-hover:scale-100'
                      }`}
                      style={{ x: '-50%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden" ref={menuRef}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMenu}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-background/50 backdrop-blur-sm border"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? '✕' : '☰'}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b shadow-lg"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                      activeSection === item.id 
                        ? 'bg-primary/10 text-primary' 
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => {
                      scrollToSection(item.id);
                      closeMenu();
                    }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
});

Header.displayName = 'Header';

// Enhanced Home Section with premium animations
const HomeSection = React.memo(({ personalInfo, contact, resumeUrl, socialLinks }) => {
  const fullName = `${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}`.trim();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [displayTitle, setDisplayTitle] = useState('');

  // Typewriter effect for professional title
  useEffect(() => {
    if (personalInfo?.professionalTitle) {
      let currentIndex = 0;
      const title = personalInfo.professionalTitle;
      
      const interval = setInterval(() => {
        if (currentIndex <= title.length) {
          setDisplayTitle(title.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [personalInfo?.professionalTitle]);

  return (
    <section id="home" className="min-h-screen flex items-center pt-16 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Section */}
          <motion.div 
            className="space-y-8 lg:space-y-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-6 lg:space-y-8">
              {/* Welcome Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex"
              >
                <Badge 
                  variant="secondary" 
                  className="px-4 py-2 text-sm font-medium backdrop-blur-sm border"
                >
                  <Sparkles className="h-3 w-3 mr-2" />
                  Welcome to my portfolio
                </Badge>
              </motion.div>

              {/* Main Heading */}
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
                  Hi, I'm{' '}
                  <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                    {personalInfo?.firstName || 'Creator'}
                  </span>
                </h1>
                
                {/* Professional Title */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <div className="text-xl lg:text-2xl text-muted-foreground font-medium min-h-[1.5em]">
                    {displayTitle}
                    <span className="animate-pulse">|</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Bio */}
              <motion.p 
                className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {personalInfo?.bio || 'Passionate creator building amazing experiences.'}
              </motion.p>
            </div>

            {/* Action Buttons */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="gap-3 group px-8"
                >
                  View My Work
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </Button>
              </motion.div>
              
              {resumeUrl && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline"
                    size="lg"
                    onClick={() => window.open(resumeUrl, '_blank')}
                    className="gap-3 px-8"
                  >
                    <Download className="h-4 w-4" />
                    Download CV
                  </Button>
                </motion.div>
              )}
            </motion.div>

            {/* Contact & Social Links */}
            {(contact?.email || contact?.location || socialLinks?.length > 0) && (
              <motion.div 
                className="flex flex-wrap gap-6 pt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                {contact?.email && (
                  <motion.a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    whileHover={{ scale: 1.05, x: 4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="h-4 w-4" />
                    {contact.email}
                  </motion.a>
                )}
                
                {contact?.location && (
                  <motion.div 
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                    whileHover={{ scale: 1.05 }}
                  >
                    <MapPin className="h-4 w-4" />
                    {contact.location}
                  </motion.div>
                )}
                
                {socialLinks?.length > 0 && (
                  <div className="flex gap-3">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm"
                        whileHover={{ scale: 1.1, rotate: 5, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6 + index * 0.1 }}
                      >
                        <Globe className="h-4 w-4" />
                      </motion.a>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Avatar Section */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative">
              {/* Animated Background Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 rounded-full blur-3xl opacity-20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Main Avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Avatar className="h-64 w-64 sm:h-80 sm:w-80 border-4 border-background shadow-2xl relative z-10">
                  <AvatarImage 
                    src={personalInfo?.avatar} 
                    alt={fullName}
                    onLoad={() => setImageLoaded(true)}
                    loading="eager"
                  />
                  <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
                    {getUserInitials(personalInfo)}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              
              {/* Availability Badge */}
              <motion.div 
                className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-20"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1 }}
              >
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">Available</span>
              </motion.div>

              {/* Floating Elements */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className={`absolute w-6 h-6 bg-primary/30 rounded-full ${
                    i === 0 ? '-top-3 -left-3' : 
                    i === 1 ? '-top-3 -right-3' : 
                    i === 2 ? '-bottom-3 -left-3' :
                    '-bottom-3 -right-3'
                  }`}
                  animate={{
                    y: [0, -15, 0],
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}

              {/* Achievement Badges */}
              <motion.div
                className="absolute -left-8 top-1/2 transform -translate-y-1/2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
              >
                <div className="bg-background/80 backdrop-blur-sm border rounded-lg p-3 shadow-lg">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-8 top-1/4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 }}
              >
                <div className="bg-background/80 backdrop-blur-sm border rounded-lg p-3 shadow-lg">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

HomeSection.displayName = 'HomeSection';

// Enhanced About Section
const AboutSection = React.memo(({ personalInfo, professionalDescription, contact }) => {
  const stats = useMemo(() => [
    { label: 'Years Experience', value: '2+', icon: Calendar },
    { label: 'Projects Completed', value: '50+', icon: Target },
    { label: 'Happy Clients', value: '30+', icon: Users },
    { label: 'Success Rate', value: '98%', icon: TrendingUp },
  ], []);

  return (
    <section id="about" className="py-20 lg:py-28 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16 lg:mb-20"
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium">
            <Palette className="h-3 w-3 mr-2" />
            About Me
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            My Journey & Passion
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover the story behind my work and what drives me forward in this ever-evolving digital landscape
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Professional Journey Card */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-background to-muted/50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16" />
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    Professional Journey
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {professionalDescription || 'Passionate about creating exceptional digital experiences that make a difference.'}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Card className="text-center border-0 shadow-lg bg-background/50 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                        <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Content - Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="sticky top-24"
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-background to-muted/50">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-muted">
                  <span className="font-medium text-foreground">Full Name</span>
                  <span className="text-muted-foreground font-semibold text-right">
                    {personalInfo?.firstName} {personalInfo?.lastName}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-muted">
                  <span className="font-medium text-foreground">Professional Title</span>
                  <Badge variant="secondary" className="font-medium">
                    {personalInfo?.professionalTitle}
                  </Badge>
                </div>
                
                {contact?.phone && (
                  <div className="flex justify-between items-center py-3 border-b border-muted">
                    <span className="font-medium text-foreground">Phone</span>
                    <a 
                      href={`tel:${contact.phone}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                )}
                
                {contact?.location && (
                  <div className="flex justify-between items-center py-3 border-b border-muted">
                    <span className="font-medium text-foreground">Location</span>
                    <span className="text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      {contact.location}
                    </span>
                  </div>
                )}
                
                {contact?.website && (
                  <div className="flex justify-between items-center py-3">
                    <span className="font-medium text-foreground">Website</span>
                    <a 
                      href={contact.website} 
                      className="text-primary hover:underline font-medium flex items-center gap-1"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Visit
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

// Enhanced Skills Section with better animations
const SkillsSection = React.memo(({ skills }) => {
  const getSkillLevel = useCallback((level) => {
    const levels = {
      beginner: { value: 25, color: 'bg-red-500' },
      intermediate: { value: 50, color: 'bg-yellow-500' },
      advanced: { value: 75, color: 'bg-blue-500' },
      expert: { value: 95, color: 'bg-green-500' }
    };
    return levels[level] || { value: 50, color: 'bg-gray-500' };
  }, []);

  const skillsByCategory = useMemo(() => {
    const categories = {};
    skills?.forEach(skill => {
      const category = skill.category || 'Other';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(skill);
    });
    return categories;
  }, [skills]);

  return (
    <section id="skills" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16 lg:mb-20"
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium">
            <Code className="h-3 w-3 mr-2" />
            Technical Skills
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Technologies and tools I use to bring innovative ideas to life
          </p>
        </motion.div>

        <div className="space-y-12 lg:space-y-16">
          {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.h3 
                className="text-2xl font-semibold flex items-center gap-4"
                whileInView={{ x: 0, opacity: 1 }}
                initial={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                {category}
              </motion.h3>
              
              <div className="grid gap-4">
                {categorySkills.map((skill, index) => {
                  const levelInfo = getSkillLevel(skill.level);
                  return (
                    <motion.div
                      key={skill._id || index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                      className="group"
                    >
                      <Card className="border-0 shadow-lg bg-background/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-lg group-hover:text-primary transition-colors">
                                {skill.name}
                              </span>
                            </div>
                            <Badge 
                              variant="secondary"
                              className={`
                                ${skill.level === 'expert' ? 'bg-green-500/10 text-green-600 border-green-200' :
                                skill.level === 'advanced' ? 'bg-blue-500/10 text-blue-600 border-blue-200' :
                                skill.level === 'intermediate' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-200' :
                                'bg-gray-500/10 text-gray-600 border-gray-200'}
                                font-medium
                              `}
                            >
                              {skill.level}
                            </Badge>
                          </div>
                          
                          <div className="relative ">
                            <Progress 
                              // value={levelInfo.value} 
                              className="h-3 bg-muted rounded-full w-full"
                            />
                            <motion.div
                              className={`absolute top-0 left-0 h-3 rounded-full ${levelInfo.color}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${levelInfo.value}%` }}
                              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = 'SkillsSection';

// Enhanced Experience Section with empty value checks
const ExperienceSection = React.memo(({ experience }) => {
  const formatDate = useCallback((date) => {
    if (!date) return 'Present';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  }, []);

  const calculateDuration = useCallback((startDate, endDate, currentlyWorking) => {
    if (!startDate) return '';
    
    const start = new Date(startDate);
    const end = currentlyWorking ? new Date() : new Date(endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    
    if (months < 12) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      return `${years} year${years !== 1 ? 's' : ''}${remainingMonths ? ` ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}` : ''}`;
    }
  }, []);

  // Filter out experiences with missing critical data
  const validExperiences = useMemo(() => 
    experience.filter(exp => exp.company && exp.position)
  , [experience]);

  if (validExperiences.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="py-20 lg:py-28 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-slate-300 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-dot-slate-800" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16 lg:mb-20"
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium">
            <Briefcase className="h-3 w-3 mr-2" />
            Work Experience
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Career Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            My professional path and key milestones that shaped my expertise
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary to-primary/20" />
          
          <div className="space-y-12">
            {validExperiences.map((exp, index) => (
              <motion.div
                key={exp._id || index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 sm:left-8 top-6 transform -translate-x-1/2 z-10">
                  <motion.div
                    className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"
                    whileHover={{ scale: 1.3 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                </div>

                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="ml-12 sm:ml-16 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-background/50 backdrop-blur-sm">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-foreground">{exp.position}</h3>
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <Briefcase className="h-4 w-4" />
                            <span className="font-semibold">{exp.company}</span>
                            {exp.location && (
                              <span className="flex items-center gap-1 text-sm bg-muted px-2 py-1 rounded-full">
                                <MapPin className="h-3 w-3" />
                                {exp.location}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}
                            </span>
                          </div>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                            {calculateDuration(exp.startDate, exp.endDate, exp.currentlyWorking)}
                          </span>
                        </div>
                      </div>
                      
                      {exp.description && (
                        <p className="text-muted-foreground leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

ExperienceSection.displayName = 'ExperienceSection';

// Enhanced Education Section
const EducationSection = React.memo(({ education }) => {
  const formatDate = useCallback((date) => {
    if (!date) return 'Present';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  }, []);

  // Filter out education with missing critical data
  const validEducation = useMemo(() => 
    education.filter(edu => edu.institution && edu.degree)
  , [education]);

  if (validEducation.length === 0) {
    return null;
  }

  return (
    <section id="education" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/30" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16 lg:mb-20"
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium">
            <GraduationCap className="h-3 w-3 mr-2" />
            Education
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Academic Background
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            My educational journey and qualifications that built my foundation
          </p>
        </motion.div>

        <div className="grid gap-6">
          {validEducation.map((edu, index) => (
            <motion.div
              key={edu._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-foreground">{edu.degree}</h3>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <GraduationCap className="h-4 w-4" />
                        <span className="font-semibold">{edu.institution}</span>
                        {edu.fieldOfStudy && (
                          <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                            {edu.fieldOfStudy}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {formatDate(edu.startDate)} - {edu.currentlyStudying ? 'Present' : formatDate(edu.endDate)}
                      </span>
                    </div>
                  </div>
                  
                  {edu.description && (
                    <p className="text-muted-foreground leading-relaxed">
                      {edu.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

EducationSection.displayName = 'EducationSection';

// Enhanced Projects Section
const ProjectsSection = React.memo(({ projects }) => {
  // Filter out projects with missing critical data
  const validProjects = useMemo(() => 
    projects.filter(project => project.title && project.description)
  , [projects]);

  if (validProjects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="py-20 lg:py-28 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16 lg:mb-20"
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium">
            <Star className="h-3 w-3 mr-2" />
            Featured Work
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Projects & Creations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A showcase of my recent work and innovative solutions that deliver real value
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {validProjects.map((project, index) => (
            <motion.div
              key={project._id || index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-background/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-1">
                      {project.title}
                    </CardTitle>
                    {project.featured && (
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    )}
                  </div>
                  <CardDescription className="line-clamp-3 leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <Badge 
                          key={techIndex} 
                          variant="outline"
                          className="text-xs bg-primary/5 border-primary/20 font-medium"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="secondary" className="text-xs font-medium">
                          +{project.technologies.length - 4}
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1"
                      >
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => window.open(project.githubUrl, '_blank')}
                          className="w-full gap-2"
                        >
                          <Github className="h-3 w-3" />
                          Code
                        </Button>
                      </motion.div>
                    )}
                    
                    {project.projectUrl && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1"
                      >
                        <Button 
                          size="sm"
                          onClick={() => window.open(project.projectUrl, '_blank')}
                          className="w-full gap-2"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Live Demo
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';

// Enhanced Contact Section
const ContactSection = React.memo(({ contact, socialLinks }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = useCallback((e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, []);

  return (
    <section id="contact" className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16 lg:mb-20"
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium">
            <Mail className="h-3 w-3 mr-2" />
            Get In Touch
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Reach out and let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {contact?.email && (
                <motion.a
                  href={`mailto:${contact.email}`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="block"
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Email</p>
                          <p className="text-muted-foreground">{contact.email}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.a>
              )}
              
              {contact?.phone && (
                <motion.a
                  href={`tel:${contact.phone}`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="block"
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-background/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Phone className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Phone</p>
                          <p className="text-muted-foreground">{contact.phone}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.a>
              )}
              
              {contact?.location && (
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="border-0 shadow-lg bg-background/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">Location</p>
                          <p className="text-muted-foreground">{contact.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>

            {socialLinks?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold text-lg mb-4 text-foreground">Follow Me</h4>
                <div className="flex gap-3">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Globe className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-background/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Send a Message</CardTitle>
                <CardDescription>
                  Interested in working together? Get in touch and let's discuss your project!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 border border-input rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="w-full px-4 py-3 border border-input rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      rows="5"
                      className="w-full px-4 py-3 border border-input rounded-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit"
                      className="w-full gap-3 group"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <motion.div
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="h-4 w-4" />
                          </motion.div>
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';

// Enhanced Footer
const Footer = React.memo(({ personalInfo, socialLinks }) => {
  const currentYear = new Date().getFullYear();
  const fullName = `${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}`.trim();

  return (
    <footer className="bg-background border-t py-12 lg:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarFallback className="text-sm font-bold bg-gradient-to-r from-primary to-primary/60 text-white">
                  {getUserInitials(personalInfo)}
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="font-bold text-lg text-foreground">{fullName}</span>
                <p className="text-sm text-muted-foreground">
                  {personalInfo?.professionalTitle}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          {socialLinks?.length > 0 && (
            <motion.div 
              className="flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm"
                >
                  <Globe className="h-4 w-4" />
                </motion.a>
              ))}
            </motion.div>
          )}
        </div>

        {/* Copyright */}
        <motion.div 
          className="border-t border-muted mt-8 pt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
            <span>© {currentYear} {fullName}. Crafted with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            </motion.span>
            <span>for the digital world.</span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

// Back to Top Component
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="h-5 w-5 transform -rotate-90" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Helper function to get user initials
const getUserInitials = (personalInfo) => {
  const { firstName, lastName } = personalInfo || {};
  return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
};

// Add missing icon component
const RefreshCw = ({ className = "h-4 w-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M23 4v6h-6M1 20v-6h6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// export default PortfolioPage;