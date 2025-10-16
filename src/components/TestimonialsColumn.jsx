'use client'
import React,{ useState, useRef, useCallback, useMemo } from 'react'
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion'
import { ChevronDown, Quote, Sparkles, Star } from 'lucide-react'
import { Button } from './ui/button'


const testimonialsData = [
  {
    id: 'testimonial1',
    name: 'John Doe',
    company: 'Tech Corp',
    role: 'Senior Developer',
    text: 'Sharefolio made it incredibly easy to create and host my portfolio. The templates are beautiful and the subdomain feature is fantastic!',
    rating: 5,
  },
  {
    id: 'testimonial2', 
    name: 'Sarah ',
    company: 'Design Studio',
    role: 'UI/UX Designer',
    text: 'As a designer, I appreciate how Sharefolio showcases my work. The customization options are perfect for creative professionals.',
    rating: 5,
  },
  {
    id: 'testimonial3',
    name: 'Mike Johnson',
    company: 'Freelance Developer',
    role: 'Full-stack Developer',
    text: 'The free subdomain hosting saved me so much time and money. My portfolio was live in minutes!',
    rating: 4,
  },
  {
    id: 'testimonial4',
    name: 'Emily Chen',
    company: 'Startup Founder',
    role: 'Product Manager',
    text: 'Our team uses Sharefolio to showcase our projects. The collaborative features are excellent.',
    rating: 5,
  }
]


const faqData = [
  {
    id: 'faq1',
    question: 'How do I get started?',
    answer: 'Simply sign up for an account, choose a template that fits your style, and start customizing your portfolio. You can have your portfolio live on a free subdomain in under 10 minutes.'
  },
  {
    id: 'faq2',
    question: 'Is Sharefolio really free?',
    answer: 'Yes! Sharefolio offers free portfolio hosting on subdomains. We believe everyone should have access to beautiful portfolio hosting without financial barriers.'
  },
  {
    id: 'faq3',
    question: 'Can I use my own domain?',
    answer: 'Absolutely! While we provide free subdomains, you can also connect your custom domain for a more professional look. Custom domain support is available in our premium plans.'
  },
  {
    id: 'faq4',
    question: 'What templates are available?',
    answer: 'We offer a variety of templates designed for different professions - developers, designers, photographers, writers, and more. All templates are fully customizable to match your brand.'
  }
]




const SmallWrap = ({ children, id, className = '' }) => {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}
    >
      {children}
    </section>
  )
}

const cn = (...classes) => classes.filter(Boolean).join(' ')

// Memoized Rating Stars Component
const RatingStars = ({ rating }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating 
              ? 'fill-yellow-400 text-yellow-400' 
              : 'fill-muted text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  )
}

// Optimized Testimonials Column with reduced animations
const TestimonialsColumn = React.memo(({ testimonials, isInView, className }) => {
  const controls = useAnimation()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Memoized testimonial change handler
  const handleDotClick = useCallback((index) => {
    setCurrentIndex(index)
  }, [])

  // Optimized auto-rotation with cleanup
  React.useEffect(() => {
    if (!isInView) return
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isInView, testimonials.length])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className={className}>
      <div className="relative h-[400px] overflow-hidden rounded-xl border bg-card shadow-sm">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 p-6 flex flex-col justify-center"
          >
            <div className="flex justify-start mb-4">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Quote className="h-5 w-5" />
              </div>
            </div>
            
            <p className="text-base text-card-foreground/90 leading-relaxed mb-4 font-medium">
              {currentTestimonial.text}
            </p>
            
            <div className="mb-6">
              <RatingStars rating={currentTestimonial.rating} />
            </div>
            
            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold text-base shadow-sm">
                {currentTestimonial.name[0]}
              </div>
              <div className="flex flex-col">
                <div className="font-semibold text-card-foreground">
                  {currentTestimonial.name}
                </div>
                <div className="text-muted-foreground text-sm">
                  {currentTestimonial.role}
                </div>
                <div className="text-primary text-sm font-medium">
                  {currentTestimonial.company}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary scale-110' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
})

// Memoized FAQ Section
const FaqSection = React.memo(() => {
  const [openItem, setOpenItem] = useState('faq1')

  const handleToggle = useCallback((id) => {
    setOpenItem(prev => prev === id ? null : id)
  }, [])

  return (
    <div className="space-y-2">
      {faqData.map((item) => (
        <FaqItem
          key={item.id}
          id={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={openItem === item.id}
          onToggle={handleToggle}
        />
      ))}
    </div>
  )
})

// Optimized FAQ Item with reduced animations
const FaqItem = React.memo(({ id, question, answer, isOpen, onToggle }) => {
  const handleClick = useCallback(() => {
    onToggle(id)
  }, [id, onToggle])

  return (
    <div className={cn(
      'border rounded-lg bg-card/50 transition-all duration-200 hover:shadow-sm',
      isOpen && 'shadow-sm border-primary/20 bg-card'
    )}>
      <Button
        variant="ghost"
        onClick={handleClick}
        className="h-auto w-full justify-between px-4 py-4 text-left hover:bg-accent/30 rounded-lg"
      >
        <h3 className={cn(
          'text-sm font-medium pr-6 transition-colors',
          isOpen ? 'text-primary' : 'text-card-foreground'
        )}>
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'flex-shrink-0 transition-colors p-1 rounded-full',
            isOpen ? 'text-primary bg-primary/10' : 'text-muted-foreground'
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <p className="text-muted-foreground leading-relaxed text-sm">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

// Main Component with performance optimizations
const TestimonialsAndFaq = () => {
  const sectionRef = useRef(null)
  const testimonialsRef = useRef(null)
  
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const isTestimonialsInView = useInView(testimonialsRef, { once: true, margin: '-50px' })

  // Memoized testimonials data
  const memoizedTestimonials = useMemo(() => testimonialsData, [])

  return (
    <div 
      ref={sectionRef}
      className="w-full bg-background overflow-x-hidden py-16 md:py-24"
    >
      <SmallWrap className="relative">
        {/* Simplified background decoration */}
        <div className="absolute top-20 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl"></div>
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center relative"
        >
          <div className="inline-flex text-white items-center bg-[#7332a8] gap-2 px-4 py-2 mb-4 text-sm font-medium rounded-full ">
            <Sparkles className="w-3 h-3" />
            <span>FROM OUR USERS</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl mb-4">
            Loved by{' '}
            <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text relative after:absolute after:inset-0 after:bg-gradient-to-r sm:after:from-black/40 sm:dark:after:from-white/40 after:to-transparent after:skew-x-12 after:animate-pulse">
              Creators Worldwide
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
            Join thousands of professionals who trust Sharefolio to showcase their work and grow their careers
          </p>
        </motion.div>

        {/* Combined Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
          {/* Testimonials */}
          <div ref={testimonialsRef} className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isSectionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold tracking-tight sm:text-2xl mb-2">
                  What Our{' '}
                  <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text relative after:absolute after:inset-0 after:bg-gradient-to-r sm:after:from-black/40 sm:dark:after:from-white/40 after:to-transparent after:skew-x-12 after:animate-pulse">
                    Users
                  </span>{' '}
                  Say
                </h3>
                <p className="text-muted-foreground text-sm">
                  Real stories from creators who transformed their online presence with Sharefolio
                </p>
              </div>
              <TestimonialsColumn
                testimonials={memoizedTestimonials}
                isInView={isTestimonialsInView}
                className="w-full"
              />
            </motion.div>
          </div>

          {/* FAQ */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isSectionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold tracking-tight sm:text-2xl mb-2">
                  Frequently Asked{' '}
                  <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text relative after:absolute after:inset-0 after:bg-gradient-to-r sm:after:from-black/40 sm:dark:after:from-white/40 after:to-transparent after:skew-x-12 after:animate-pulse">
                    Questions
                  </span>
                </h3>
                <p className="text-muted-foreground text-sm">
                  Everything you need to know about Sharefolio and how to get started
                </p>
              </div>
              <FaqSection />
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/10"
              >
                <p className="text-sm text-muted-foreground mb-2">
                  Still have questions?
                </p>
                <Button variant="primary" data-focusable className="w-full p-3 cursor-pointer">
                  Contact Support
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </SmallWrap>
    </div>
  )
}

export default React.memo(TestimonialsAndFaq)