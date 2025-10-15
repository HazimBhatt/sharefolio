'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion'
import { ChevronDown, Quote, Sparkles, Star } from 'lucide-react'

// Testimonials data with actual content
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
    name: 'Sarah Wilson',
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

// FAQ data
const faqData = [
  {
    id: 'faq1',
    question: 'How do I get started with Sharefolio?',
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

// Enhanced button component with shadcn-like variants
const Button = ({ 
  variant = 'ghost', 
  className = '', 
  onClick, 
  children,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2',
    ghost: 'hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2',
  }
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

// Enhanced container with better spacing
const SmallWrap = ({ children, id, className = '' }) => {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-6xl px-6 sm:px-8 ${className}`}
    >
    
      {children}
    </section>
  )
}
const cn = (...classes) => classes.filter(Boolean).join(' ')

// Rating Stars Component
const RatingStars = ({ rating }) => {
  return (
    <div className="flex gap-1">
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

// Enhanced Testimonials Column with better design
const TestimonialsColumn = (props) => {
  const controls = useAnimation()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (props.isInView) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % props.testimonials.length)
      }, 5000) // Change testimonial every 5 seconds

      return () => clearInterval(interval)
    }
  }, [props.isInView, props.testimonials.length])

  useEffect(() => {
    if (props.isInView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" }
      })
    } else {
      controls.stop()
    }
  }, [props.isInView, controls, currentIndex])

  const currentTestimonial = props.testimonials[currentIndex]

  return (
    <div className={props.className} >
      <div className="relative h-[420px] sm:h-[480px] overflow-hidden rounded-2xl bg-gradient-to-br from-card to-card/80 border shadow-sm">
      
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 p-8 flex flex-col justify-center"
          >
            {/* Quote Icon */}
            <div className="flex justify-start mb-6">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Quote className="h-6 w-6" />
              </div>
            </div>
            
            {/* Testimonial Text */}
            <p className="text-lg sm:text-xl text-card-foreground/90 leading-relaxed mb-6 font-medium">
              {currentTestimonial.text}
            </p>
            
            {/* Rating */}
            <div className="mb-8">
              <RatingStars rating={currentTestimonial.rating} />
            </div>
            
            {/* Author Info */}
            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-semibold text-lg shadow-sm">
                {currentTestimonial.name[0]}
              </div>
              <div className="flex flex-col">
                <div className="font-semibold text-card-foreground text-lg">
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
        
        {/* Enhanced Dots indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {props.testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary scale-110' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Enhanced FAQ Section Component
const FaqSection = () => {
  return (
    <div className="space-y-3">
      {faqData.map((item, index) => (
        <FaqItem
          key={item.id}
          question={item.question}
          answer={item.answer}
          index={index}
        />
      ))}
    </div>
  )
}

const FaqItem = ({
  question,
  answer,
  index
}) => {
  const [isOpen, setIsOpen] = useState(index === 0) // First item open by default

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={cn(
        'border rounded-xl bg-card/50 backdrop-blur-sm transition-all duration-200 hover:shadow-sm',
        isOpen && 'shadow-sm border-primary/20 bg-card'
      )}
    >
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="h-auto w-full justify-between px-6 py-5 text-left hover:bg-accent/30 rounded-xl"
      >
        <h3
          className={cn(
            'text-base font-semibold pr-8 transition-colors',
            isOpen ? 'text-primary' : 'text-card-foreground'
          )}
        >
          {question}
        </h3>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
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
            animate={{
              height: 'auto',
              opacity: 1,
              transition: { duration: 0.3, ease: 'easeOut' }
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: 0.2, ease: 'easeIn' }
            }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5">
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground leading-relaxed"
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Main Combined Component with enhanced design
const TestimonialsAndFaq = () => {
  const sectionRef = useRef(null)
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-50px' })
  const testimonialsRef = useRef(null)
  const isTestimonialsInView = useInView(testimonialsRef, { margin: '-50px' })

  return (
    <div className="w-full bg-gradient-to-b from-background to-muted/20 py-20 md:py-32" ref={sectionRef}>
      <SmallWrap className="relative">
        {/* Background decoration */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center relative"
        >
            <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center bg-[#7332a8] gap-2 px-4 py-2 mb-7 text-sm font-medium rounded-full text-white "
          >
            <Sparkles className="w-4 h-4 text-primary " />
            <span>FROM OUR USERS</span>
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
            Loved by <span className='bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-black/40 dark:after:from-white/40 after:to-transparent after:skew-x-12 after:animate-pulse'> Creators Worldwide</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Join thousands of professionals who trust Sharefolio to showcase their work and grow their careers
          </p>
        </motion.div>

        {/* Combined Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative">
          {/* Testimonials - Left Side */}
          <div ref={testimonialsRef} className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl mb-3">
                  What Our <span className='bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-black/40 dark:after:from-white/40 after:to-transparent after:skew-x-12 after:animate-pulse'>Users</span> Say
                </h3>
                <p className="text-muted-foreground">
                  Real stories from creators who transformed their online presence with Sharefolio
                </p>
              </div>
              <TestimonialsColumn
                testimonials={testimonialsData}
                isInView={isTestimonialsInView}
                className="w-full"
              />
            </motion.div>
          </div>

          {/* FAQ - Right Side */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl mb-3">
                  Frequently Asked <span className='bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-black/40 dark:after:from-white/40 after:to-transparent after:skew-x-12 after:animate-pulse'>Questions</span>
                </h3>
                <p className="text-muted-foreground">
                  Everything you need to know about Sharefolio and how to get started with your perfect portfolio.
                </p>
              </div>
              <FaqSection />
              
              {/* Additional CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/10"
              >
                <p className="text-sm text-muted-foreground mb-3">
                  Still have questions?
                </p>
                <Button variant="primary"  data-focusable className="bg-[#7332a8] w-full p-3 hover:bg-[#7332a8]/90 cursor-pointer text-white">
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

export default TestimonialsAndFaq