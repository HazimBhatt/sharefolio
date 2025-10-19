'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useParams } from 'next/navigation';
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
  Palette
} from 'lucide-react';

export default function PortfolioPage() {
  const params = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolio = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/portfolios/${params.slug}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Portfolio not found');
        }
        throw new Error('Failed to fetch portfolio');
      }
      
      const data = await response.json();
      setPortfolio(data.portfolio);
    } catch (err) {
      setError(err.message);
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
    <div className="min-h-screen bg-background">
      <PortfolioTemplate data={portfolio} />
    </div>
  );
}

// Loading Component
function PortfolioLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-48 mx-auto" />
          <Skeleton className="h-4 w-32 mx-auto" />
        </div>
      </div>
    </div>
  );
}

// Not Found Component
function PortfolioNotFound({ error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Portfolio Not Found</CardTitle>
          <CardDescription className="text-lg">
            {error || "This portfolio doesn't exist or isn't published yet."}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button 
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Main Portfolio Template
function PortfolioTemplate({ data }) {
  const [activeSection, setActiveSection] = useState('home');
  const scrollTimeoutRef = useRef(null);

  const {
    personalInfo,
    contact,
    professionalDescription,
    skills,
    experience,
    education,
    projects,
    socialLinks,
    customization
  } = data;

  const theme = customization?.theme || {};
  const primaryColor = theme.primaryColor || 'hsl(var(--primary))';
  const secondaryColor = theme.secondaryColor || 'hsl(var(--secondary))';

  const navItems = useMemo(() => [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'about', label: 'About', icon: Palette },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Star },
    { id: 'contact', label: 'Contact', icon: Mail },
  ], []);

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

  useEffect(() => {
    const scrollHandler = () => handleScroll();
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      if (scrollTimeoutRef.current) {
        cancelAnimationFrame(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getUserInitials = () => {
    const { firstName, lastName } = personalInfo;
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  const getSkillLevel = (level) => {
    const levels = {
      beginner: 25,
      intermediate: 50,
      advanced: 75,
      expert: 95
    };
    return levels[level] || 50;
  };

  const formatDate = (date) => {
    if (!date) return 'Present';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="WebsiteMainContainer">
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
          resumeUrl={personalInfo.resumeUrl}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
        <AboutSection 
          personalInfo={personalInfo}
          professionalDescription={professionalDescription}
        />
        <SkillsSection 
          skills={skills}
          getSkillLevel={getSkillLevel}
        />
        <ExperienceSection 
          experience={experience}
          formatDate={formatDate}
        />
        <ProjectsSection 
          projects={projects}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
        <ContactSection 
          contact={contact}
          socialLinks={socialLinks}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      </main>
      <Footer 
        personalInfo={personalInfo}
        socialLinks={socialLinks}
      />
    </div>
  );
}

// Header Component
function Header({ personalInfo, navItems, activeSection, scrollToSection, primaryColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6 sm:px-8">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border">
            <AvatarImage src={personalInfo.avatar} alt={personalInfo.firstName} />
            <AvatarFallback className="text-sm font-medium">
              {getUserInitials(personalInfo)}
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold text-lg">{personalInfo.firstName}</span>
        </div>

        <nav className="hidden md:block">
          <ul className="flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <Button
                    variant={activeSection === item.id ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => scrollToSection(item.id)}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="px-3"
          >
            {isOpen ? '✕' : '☰'}
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="px-6 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start gap-3"
                  onClick={() => {
                    scrollToSection(item.id);
                    closeMenu();
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

// Home Section Component
function HomeSection({ personalInfo, contact, resumeUrl, primaryColor, secondaryColor }) {
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;

  return (
    <section id="home" className="min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto w-full px-6 sm:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="px-3 py-1 text-sm">
                Welcome to my portfolio
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {personalInfo.firstName}
                </span>
              </h1>
              <p className="text-xl text-muted-foreground font-medium">
                {personalInfo.professionalTitle}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                {personalInfo.bio}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="gap-2"
              >
                View My Work
                <ArrowRight className="h-4 w-4" />
              </Button>
              
              {resumeUrl && (
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => window.open(resumeUrl, '_blank')}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </Button>
              )}
            </div>

            {contact && (
              <div className="flex flex-wrap gap-6 pt-4">
                {contact.email && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {contact.email}
                  </div>
                )}
                {contact.location && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {contact.location}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <Avatar className="h-64 w-64 sm:h-80 sm:w-80 border-8 border-background shadow-2xl">
                <AvatarImage src={personalInfo.avatar} alt={fullName} />
                <AvatarFallback className="text-4xl font-bold bg-muted">
                  {getUserInitials(personalInfo)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// About Section Component
function AboutSection({ personalInfo, professionalDescription }) {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            About Me
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            My Story & Passion
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn more about my journey, values, and what drives me
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Professional Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {professionalDescription}
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary">2+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">Full Name</span>
                <span className="text-muted-foreground">
                  {personalInfo.firstName} {personalInfo.lastName}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">Title</span>
                <span className="text-muted-foreground">{personalInfo.professionalTitle}</span>
              </div>
              {personalInfo.contact?.phone && (
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Phone</span>
                  <span className="text-muted-foreground">{personalInfo.contact.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Location</span>
                  <span className="text-muted-foreground">{personalInfo.location}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Skills Section Component
function SkillsSection({ skills, getSkillLevel }) {
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

  if (!skills?.length) return null;

  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Skills & Expertise
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Technical Proficiencies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and competencies
          </p>
        </div>

        <div className="space-y-12">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Code className="h-5 w-5" />
                {category}
              </h3>
              <div className="grid gap-4">
                {categorySkills.map((skill, index) => (
                  <Card key={skill._id || index}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold">{skill.name}</span>
                        <Badge variant="secondary">
                          {skill.level}
                        </Badge>
                      </div>
                      <Progress 
                        value={getSkillLevel(skill.level)} 
                        className="h-2"
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Experience Section Component
function ExperienceSection({ experience, formatDate }) {
  if (!experience?.length) return null;

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Career Journey
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Professional Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My career path and professional growth over the years
          </p>
        </div>

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <Card key={exp._id || index} className="relative">
              <div className="absolute left-8 top-6 bottom-6 w-0.5 bg-border" />
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-4 h-4 rounded-full bg-primary mt-1" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-xl font-semibold">{exp.position}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {formatDate(exp.startDate)} - {exp.currentlyWorking ? 'Present' : formatDate(exp.endDate)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-lg text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      {exp.company}
                      {exp.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                    {exp.description && (
                      <p className="text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Projects Section Component
function ProjectsSection({ projects, primaryColor, secondaryColor }) {
  if (!projects?.length) return null;

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Portfolio
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and creative solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={project._id || index} 
              className="group hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px]"
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center justify-between">
                  {project.title}
                  {project.featured && (
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  )}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {project.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="outline"
                        className="text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
                
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                      className="flex-1 gap-2"
                    >
                      <Github className="h-3 w-3" />
                      Code
                    </Button>
                  )}
                  
                  {project.projectUrl && (
                    <Button 
                      size="sm"
                      onClick={() => window.open(project.projectUrl, '_blank')}
                      className="flex-1 gap-2"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section Component
function ContactSection({ contact, socialLinks, primaryColor, secondaryColor }) {
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Get In Touch
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? Reach out and let's create something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-6">
              {contact?.email && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-muted-foreground">{contact.email}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {contact?.phone && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">Phone</p>
                        <p className="text-muted-foreground">{contact.phone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {contact?.location && (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">Location</p>
                        <p className="text-muted-foreground">{contact.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {socialLinks?.length > 0 && (
              <div>
                <h4 className="font-semibold mb-4">Follow Me</h4>
                <div className="flex gap-3">
                  {socialLinks.map((link, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      onClick={() => window.open(link.url, '_blank')}
                      className="w-12 h-12"
                    >
                      <Globe className="h-5 w-5" />
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                Interested in working together? Get in touch!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <textarea
                    placeholder="Your Message"
                    rows="5"
                    className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    required
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full gap-2"
                >
                  Send Message
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer({ personalInfo, socialLinks }) {
  const currentYear = new Date().getFullYear();
  const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`;

  return (
    <footer className="bg-background border-t py-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-sm">
                  {getUserInitials(personalInfo)}
                </AvatarFallback>
              </Avatar>
              <span className="font-semibold text-lg">{fullName}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {personalInfo.professionalTitle}
            </p>
          </div>

          {socialLinks?.length > 0 && (
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(link.url, '_blank')}
                  className="w-10 h-10"
                >
                  <Globe className="h-4 w-4" />
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Helper function to get user initials
function getUserInitials(personalInfo) {
  const { firstName, lastName } = personalInfo;
  return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
}