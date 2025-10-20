import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Layout,
  Star,
  Palette,
  Maximize2,
  Image as ImageIcon,
  Zap,
  Rocket,
  Eye
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

// Small placeholder image for bettr loading
const blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlRlbXBsYXRlIFByZXZpZXc8L3RleHQ+PC9zdmc+';

const TemplateCard = memo(({ 
  template, 
  index, 
  viewMode, 
  setViewMode, 
  handleImageClick, 
  getCategoryIcon 
}) => {
  const CategoryIcon = getCategoryIcon(template.category);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group transform-gpu"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Template Card */}
      <div className="relative bg-card border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] h-full flex flex-col transform-gpu">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex gap-1 sm:gap-2">
          {template.featured && (
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-yellow-500 text-white text-xs font-medium rounded-full flex items-center gap-1 transform-gpu">
              <Star className="w-2 h-2 sm:w-3 sm:h-3" />
              Featured
            </span>
          )}
          {template.popular && (
            <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-500 text-white text-xs font-medium rounded-full flex items-center gap-1 transform-gpu">
              <Zap className="w-2 h-2 sm:w-3 sm:h-3" />
              Popular
            </span>
          )}
        </div>

        {/* Profession Badge */}
        <div className="absolute top-2 right-2 z-10">
          <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/90 text-black text-xs font-medium rounded-full flex items-center gap-1 backdrop-blur-sm transform-gpu">
            <CategoryIcon className="w-2 h-2 sm:w-3 sm:h-3" />
            <span className="hidden sm:inline">
              {template.category}
            </span>
          </span>
        </div>

        {/* Template Preview */}
        <div className="relative overflow-hidden">
          {viewMode === "mock" ? (
            <div className="bg-gradient-to-br from-[#7332a8] to-[#b266ff] transform-gpu">
              <div className="w-full h-40 sm:h-48 flex flex-col">
                {/* Mock Browser Header */}
                <div className="flex items-center gap-1 sm:gap-2 p-2 sm:p-3 bg-black/20">
                  <div className="flex gap-0.5 sm:gap-1">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-white/10 rounded px-1 sm:px-2 py-0.5 sm:py-1">
                    <div className="text-white/80 text-xs truncate">
                      yourname.sharefolio.com
                    </div>
                  </div>
                </div>
                
                {/* Simplified Mock Content */}
                <div className="flex-1 p-2 sm:p-4">
                  <div className="bg-white/10 rounded-lg p-2 sm:p-3 h-full">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <CategoryIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-xs sm:text-sm">{template.name}</div>
                        <div className="text-white/70 text-xs hidden sm:block">
                          {template.description.split(' ').slice(0, 3).join(' ')}...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Image View
            <div 
              className="relative w-full h-40 sm:h-48 bg-muted cursor-pointer group/image transform-gpu"
              onClick={() => handleImageClick(template)}
            >
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                {template?.image ? (
                  <Image 
                    src={template.image} 
                    alt={template.name}
                    fill
                    className="object-cover transform-gpu"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <ImageIcon className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 text-muted-foreground" />
                    <div className="text-xs sm:text-sm font-medium">{template.name}</div>
                    <div className="text-xs opacity-70 hidden sm:block">Click to view</div>
                  </div>
                )}
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-all duration-200 flex items-center justify-center transform-gpu">
                <div className="opacity-0 group-hover/image:opacity-100 transition-all duration-200 transform translate-y-2 group-hover/image:translate-y-0">
                  <Maximize2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </div>
            </div>
          )}

          {/* View Mode Toggle Button */}
          <button
            onClick={() => setViewMode(viewMode === "mock" ? "image" : "mock")}
            className="absolute bottom-2 right-2 bg-black/50 text-white p-1 sm:p-2 rounded-full backdrop-blur-sm hover:bg-black/70 transition-all duration-200 z-10 transform-gpu"
            title={`Switch to ${viewMode === "mock" ? "image" : "mock"} view`}
          >
            {viewMode === "mock" ? (
              <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            ) : (
              <Layout className="w-3 h-3 sm:w-4 sm:h-4" />
            )}
          </button>
        </div>

        {/* Template Content */}
        <div className="p-4 sm:p-6 flex flex-col flex-grow">
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">
              {template.name}
            </h3>
            <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
              <span>{template.rating}</span>
            </div>
          </div>

          <p className="text-muted-foreground mb-3 sm:mb-4 line-clamp-2 flex-grow text-sm sm:text-base">
            {template.description}
          </p>

          {/* Template Features */}
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Layout className="w-3 h-3" />
              <span className="capitalize hidden sm:inline">{template.layout}</span>
            </div>
            <div className="flex items-center gap-1">
              <Palette className="w-3 h-3" />
              <span className="capitalize hidden sm:inline">{template.colorScheme}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
            {template.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-muted text-muted-foreground text-xs rounded-md transform-gpu"
              >
                {tag}
              </span>
            ))}
            {template.tags.length > 3 && (
              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-muted text-muted-foreground text-xs rounded-md transform-gpu">
                +{template.tags.length - 3}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 sm:gap-3 mt-auto">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-1 sm:gap-2 flex-1 px-2 sm:px-4 py-1.5 sm:py-3 text-xs sm:text-sm transform-gpu"
              asChild
            >
              <Link href={`/${template?.demo}`} prefetch={false}>
                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">View Demo</span>
                <span className="sm:hidden">Demo</span>
              </Link>
            </Button>
            
            <Button
              className="flex items-center justify-center gap-1 sm:gap-2 flex-1 px-2 sm:px-4 py-1.5 sm:py-3 text-xs sm:text-sm transform-gpu"
              style={{ backgroundColor: '#7332a8' }}
              asChild
            >
              <Link href={`/${template.id}`} prefetch={false}>
                <Rocket className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Use Template</span>
                <span className="sm:hidden">Use</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

TemplateCard.displayName = 'TemplateCard';

export default TemplateCard;