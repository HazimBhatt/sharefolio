import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Layout, Palette, Star, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

// Small placeholder image for better loading
const blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlRlbXBsYXRlIFByZXZpZXc8L3RleHQ+PC9zdmc+';

const TemplateModal = memo(({ selectedTemplate, closeModal }) => {
  if (!selectedTemplate) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 sm:p-4 transform-gpu"
      onClick={closeModal}
      style={{ willChange: 'opacity' }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative bg-background rounded-2xl max-w-4xl w-full max-h-full overflow-hidden transform-gpu"
        onClick={(e) => e.stopPropagation()}
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">
              {selectedTemplate.name}
            </h3>
            <p className="text-muted-foreground text-sm">
              {selectedTemplate.description}
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-1 sm:p-2 hover:bg-muted rounded-lg transition-colors duration-200 transform-gpu"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto">
          <div className="relative w-full h-48 sm:h-96 bg-muted rounded-lg overflow-hidden transform-gpu">
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              {selectedTemplate?.image ? (
                <Image 
                  src={selectedTemplate.image} 
                  alt={selectedTemplate.name} 
                  width={1751}
                  height={915}
                  className="object-cover transform-gpu"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  loading="eager"
                />
              ) : (
                <div className="text-center">
                  <ImageIcon className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 text-muted-foreground" />
                  <div className="text-base sm:text-lg font-medium text-muted-foreground">
                    {selectedTemplate.name} Template Preview
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Template Details */}
          <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Template Features</h4>
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Layout className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                  <span>Layout: <span className="capitalize">{selectedTemplate.layout}</span></span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Palette className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                  <span>Color Scheme: <span className="capitalize">{selectedTemplate.colorScheme}</span></span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                  <span>Rating: {selectedTemplate.rating}/5</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Tags</h4>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {selectedTemplate.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 sm:px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full transform-gpu"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex gap-2 sm:gap-3 p-4 sm:p-6 border-t border-border">
          <Button
            variant="secondary"
            className="flex-1 text-sm p-2 transform-gpu"
            onClick={closeModal}
          >
            Close
          </Button>
          <Button
            className="flex-1 text-sm p-2 transform-gpu"
            style={{ backgroundColor: '#7332a8' }}
            asChild
          >
            <Link href={`/create/${selectedTemplate.id}`} prefetch={false}>
              Use This Template
            </Link>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
});

TemplateModal.displayName = 'TemplateModal';

export default TemplateModal;