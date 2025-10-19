"use client";

import { useState, useMemo, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  Eye, 
  Rocket, 
  Sparkles, 
  Zap,
  Code,
  PenTool,
  Camera,
  BookOpen,
  Briefcase,
  GraduationCap,
  Users,
  Layout,
  Star,
  ArrowRight,
  Palette,
  X,
  Maximize2,
  Image as ImageIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Lazy load heavy components
const TemplateModal = lazy(() => import('./TemplateModal'));
const TemplateCard = lazy(() => import('./TemplateCard'));

// Memoized static data - frozen to prevent mutations
const CATEGORIES = Object.freeze([
  { id: "all", name: "All Templates", icon: Layout, count: 15 },
  { id: "developers", name: "Web Developers", icon: Code, count: 3 },
  { id: "designers", name: "Designers", icon: PenTool, count: 2 },
  { id: "photographers", name: "Photographers", icon: Camera, count: 2 },
  { id: "writers", name: "Writers & Bloggers", icon: BookOpen, count: 2 },
  { id: "freelancers", name: "Freelancers", icon: Briefcase, count: 2 },
  { id: "students", name: "Students", icon: GraduationCap, count: 3 },
  { id: "marketers", name: "Marketers", icon: Users, count: 2 },
]);

const PROFESSION_HIGHLIGHTS = Object.freeze({
  developers: "Perfect for showcasing code projects and technical skills",
  designers: "Ideal for visual portfolios and creative work presentation",
  photographers: "Best for stunning image galleries and visual storytelling",
  writers: "Optimized for content-focused layouts and writing samples",
  freelancers: "Designed for service providers and client attraction",
  students: "Tailored for academic achievements and project showcases",
  marketers: "Built for campaign displays and marketing results"
});

const TEMPLATES_DATA = Object.freeze([
  {
    id: "v1/create",
    name: "Code Pro",
    description: "Clean, code-focused portfolio with project showcases and GitHub integration",
    category: "developers",
    image: "/templates/dev-1.jpg",
    featured: true,
    popular: true,
    tags: ["React", "GitHub", "Projects", "Code"],
    rating: 4.9,
    layout: "modern",
    colorScheme: "dark"
  },
  {
    id: "dev-2",
    name: "Full Stack",
    description: "Comprehensive portfolio showcasing full-stack projects and technical skills",
    category: "developers",
    image: "/templates/dev-1.jpg",
    featured: false,
    popular: true,
    tags: ["Full Stack", "API", "Database", "Backend"],
    rating: 4.8,
    layout: "minimal",
    colorScheme: "light"
  },
  {
    id: "design-1",
    name: "Creative Pro",
    description: "Visually stunning portfolio for designers and creatives",
    category: "designers",
    image: "/templates/dev-1.jpg",
    featured: true,
    popular: false,
    tags: ["Visual", "Creative", "Gallery", "Modern"],
    rating: 4.7,
    layout: "grid",
    colorScheme: "light"
  },
  {
    id: "photo-1",
    name: "Gallery Pro",
    description: "Perfect for photographers with focus on image galleries",
    category: "photographers",
    image: "/templates/dev-1.jpg",
    featured: false,
    popular: true,
    tags: ["Gallery", "Images", "Portfolio", "Visual"],
    rating: 4.8,
    layout: "masonry",
    colorScheme: "dark"
  }
]);

// Optimized static components
const BackgroundElements = () => (
  <>
    <div className="absolute top-0 -left-32 w-96 h-96 bg-[#7332a8] rounded-full opacity-10" />
    <div className="absolute bottom-0 -right-32 w-96 h-96 bg-[#b266ff] rounded-full opacity-10" />
  </>
);

// Search and Filter Section - Memoized
const SearchAndFilterSection = ({ 
  searchQuery, 
  setSearchQuery, 
  viewMode, 
  setViewMode, 
  sortBy, 
  setSortBy,
  isFilterOpen 
}) => {
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, [setSearchQuery]);

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, [setSortBy]);

  const handleViewModeChange = useCallback((mode) => {
    setViewMode(mode);
  }, [setViewMode]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-8 sm:mb-12"
    >
      <div className={`${isFilterOpen ? 'block' : 'hidden'} block space-y-4 lg:space-y-0 lg:flex lg:flex-row lg:gap-6 lg:items-center lg:justify-between`}>
        {/* Search Bar */}
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 sm:py-3 border border-border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground transition-colors duration-200 text-sm sm:text-base"
          />
        </div>

        {/* View Mode Toggle and Sort */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-background/70 border border-border rounded-lg p-1">
            <button
              onClick={() => handleViewModeChange("mock")}
              className={`px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 ${
                viewMode === "mock" 
                  ? "bg-[#7332a8] text-white" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Mock
            </button>
            <button
              onClick={() => handleViewModeChange("image")}
              className={`px-2 sm:px-3 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 ${
                viewMode === "image" 
                  ? "bg-[#7332a8] text-white" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Image
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="px-2 sm:px-3 py-1 sm:py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground text-sm sm:text-base"
            >
              <option value="popular">Popular</option>
              <option value="rating">Rating</option>
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Categories Section - Memoized
const CategoriesSection = ({ selectedCategory, handleCategorySelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-8 sm:mb-12"
    >
      <div className="flex overflow-x-auto pb-2 gap-2 sm:gap-3 sm:flex-wrap sm:justify-center hide-scrollbar">
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border transition-all duration-200 whitespace-nowrap ${
                selectedCategory === category.id
                  ? "bg-[#7332a8] text-white border-[#7332a8]"
                  : "bg-background/70 border-border text-foreground hover:border-[#7332a8]/50"
              }`}
            >
              <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-medium text-sm sm:text-base">{category.name}</span>
              <span className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${
                selectedCategory === category.id
                  ? "bg-white/20 text-white"
                  : "bg-muted text-muted-foreground"
              }`}>
                {category.count}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};

// Profession Highlight - Memoized
const ProfessionHighlight = ({ selectedCategory }) => {
  if (selectedCategory === "all") return null;

  const getCategoryIcon = useCallback((category) => {
    const categoryMap = {
      developers: Code,
      designers: PenTool,
      photographers: Camera,
      writers: BookOpen,
      freelancers: Briefcase,
      students: GraduationCap,
      marketers: Users,
    };
    return categoryMap[category] || Layout;
  }, []);

  const Icon = getCategoryIcon(selectedCategory);
  const categoryName = CATEGORIES.find(cat => cat.id === selectedCategory)?.name;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mb-6 sm:mb-8"
    >
      <div className="bg-gradient-to-r from-[#7332a8]/10 to-[#b266ff]/10 border border-[#7332a8]/20 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 bg-[#7332a8] rounded-xl">
            <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
              {categoryName} Templates
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              {PROFESSION_HIGHLIGHTS[selectedCategory]}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Loading fallback with better performance
const LoadingFallback = () => (
  <div className="min-h-screen pt-20 flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7332a8]"></div>
  </div>
);

// Empty state component
const EmptyState = ({ onClearFilters }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="text-center py-12 sm:py-16"
  >
    <div className="text-muted-foreground text-base sm:text-lg mb-4">
      No templates found matching your criteria.
    </div>
    <Button
      onClick={onClearFilters}
      variant="secondary"
      size="sm"
    >
      Clear Filters
    </Button>
  </motion.div>
);

// Main component
const TemplatesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("mock");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Memoized templates data
  const templates = useMemo(() => TEMPLATES_DATA, []);

  // Optimized filter and sort with proper dependencies
  const filteredTemplates = useMemo(() => {
    let filtered = templates.filter(template => {
      const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
      
      if (!searchQuery.trim()) return matchesCategory;
      
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        template.name.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query) ||
        template.tags.some(tag => tag.toLowerCase().includes(query));
      
      return matchesCategory && matchesSearch;
    });

    // Efficient sorting
    switch (sortBy) {
      case "popular":
        return filtered.sort((a, b) => {
          const popularDiff = (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
          return popularDiff !== 0 ? popularDiff : b.rating - a.rating;
        });
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "featured":
        return filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      case "newest":
        return [...filtered].reverse();
      default:
        return filtered;
    }
  }, [templates, selectedCategory, searchQuery, sortBy]);

  // Optimized event handlers
  const handleCategorySelect = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
    setIsFilterOpen(false);
  }, []);

  const handleImageClick = useCallback((template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    // Use setTimeout to avoid state update during render
    setTimeout(() => setSelectedTemplate(null), 300);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedCategory("all");
    setSearchQuery("");
    setIsFilterOpen(false);
  }, []);

  // Function to get category icon
  const getCategoryIcon = useCallback((category) => {
    const categoryMap = {
      developers: Code,
      designers: PenTool,
      photographers: Camera,
      writers: BookOpen,
      freelancers: Briefcase,
      students: GraduationCap,
      marketers: Users,
    };
    return categoryMap[category] || Layout;
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 poppins-regular lg:px-8 bg-background overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <BackgroundElements />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-border bg-[#7332a8]">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Explore Templates</span>
            <Zap className="w-4 h-4 text-white" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 px-4">
            Find Your Perfect{" "}
            <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">
              Portfolio Template
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Choose from professionally designed templates and launch your portfolio in minutes
          </p>
        </motion.div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <Button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center gap-2"
            variant="outline"
          >
            <Filter className="w-4 h-4" />
            Filters & Search
          </Button>
        </div>

        {/* Search and Filter Section */}
        <SearchAndFilterSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
          sortBy={sortBy}
          setSortBy={setSortBy}
          isFilterOpen={isFilterOpen}
        />

        {/* Categories */}
        <CategoriesSection
          selectedCategory={selectedCategory}
          handleCategorySelect={handleCategorySelect}
        />

        {/* Profession Highlight Banner */}
        <ProfessionHighlight selectedCategory={selectedCategory} />

        {/* Templates Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12 sm:mb-16"
        >
          <AnimatePresence mode="wait">
            {filteredTemplates.length === 0 ? (
              <EmptyState onClearFilters={handleClearFilters} />
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
              >
                <Suspense fallback={
                  <div className="col-span-full text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7332a8] mx-auto"></div>
                  </div>
                }>
                  {filteredTemplates.map((template, index) => (
                    <TemplateCard
                      key={`${template.id}-${index}`}
                      template={template}
                      index={index}
                      viewMode={viewMode}
                      setViewMode={setViewMode}
                      handleImageClick={handleImageClick}
                      getCategoryIcon={getCategoryIcon}
                    />
                  ))}
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-6 sm:p-8 border border-border">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Can't find what you're{" "}
              <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">
                looking for?
              </span>
            </h3>
            <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base max-w-2xl mx-auto">
              Start from scratch, contact us for custom template solutions.
            </p>
            <div className="flex gap-3 flex-col sm:flex-row justify-center">
              <Button
                size="sm"
                variant="secondary"
                className="flex items-center gap-2"
                asChild
              >
                <Link href="/contact" prefetch={false}>
                  Contact Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                size="sm"
                className="flex items-center gap-2"
                style={{ backgroundColor: '#7332a8' }}
                asChild
              >
                <Link href="/contact" prefetch={false}>
                  Request Custom
                  <Sparkles className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Image Modal */}
      <Suspense fallback={null}>
        <AnimatePresence>
          {isModalOpen && (
            <TemplateModal
              selectedTemplate={selectedTemplate}
              closeModal={closeModal}
            />
          )}
        </AnimatePresence>
      </Suspense>

      {/* Add CSS for hiding scrollbar and smooth scrlling */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
        }
        
        /* Optimize animation performance */
        .transform-gpu {
          transform: translateZ(0);
        }
        
        /* Reduce layout shifts */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default TemplatesPage;