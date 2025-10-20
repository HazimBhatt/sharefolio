// app/pricing/page.tsx
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Check,
  Star,
  Zap,
  Crown,
  Sparkles,
  Rocket,
  Infinity as InfinityIcon,
  ArrowRight,
  Coins,
  Gem
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const PricingPage = () => {
  const [activePlan, setActivePlan] = useState(null);

  const plans = [
    {
      id: "free",
      name: "Starter",
      description: "Perfect for getting started",
      price: 0,
      originalPrice: null,
      popular: false,
      featured: false,
      buttonText: "Continue with Free",
      buttonVariant: "outline",
      tokens: 1,
      features: [
        { text: "1 Portfolio Creation Token", included: true },
        { text: "Host on Subdomain", included: true },
        { text: "Basic Templates", included: true },
        { text: "Standard Support", included: true },
        { text: "Additional Tokens", included: false },
        { text: "Premium Templates", included: false },
        { text: "Priority Support", included: false },
        { text: "Custom Branding", included: false },
      ],
      icon: Zap,
      color: "from-[#7332a8] to-[#8a3dc2]",
      bgColor: "bg-muted/30",
      borderColor: "border-border"
    },
    {
      id: "pro",
      name: "Creator",
      description: "Perfect for growing creators",
      price: 10,
      originalPrice: 15,
      popular: true,
      featured: false,
      buttonText: "Continue with Creator",
      buttonVariant: "default",
      tokens: 2,
      features: [
        { text: "2 Portfolio Creation Tokens", included: true },
        { text: "Host on Subdomain", included: true },
        { text: "All Basic Templates", included: true },
        { text: "Priority Support", included: true },
        { text: "Basic Analytics", included: true },
        { text: "Premium Templates", included: false },
        { text: "Custom Branding", included: false },
        { text: "Unlimited Tokens", included: false },
      ],
      icon: Rocket,
      color: "from-[#7332a8] to-[#8a3dc2]",
      bgColor: "bg-[#7332a8]/5",
      borderColor: "border-[#7332a8]/20"
    },
    {
      id: "enterprise",
      name: "Professional",
      description: "For unlimited portfolio needs",
      price: 40,
      originalPrice: 60,
      popular: false,
      featured: true,
      buttonText: "Continue with Professional",
      buttonVariant: "default",
      tokens: null, // null represents unlimited
      features: [
        { text: "Unlimited Portfolio Tokens", included: true },
        { text: "Host on Subdomain", included: true },
        { text: "All Premium Templates", included: true },
        { text: "24/7 Priority Support", included: true },
        { text: "Advanced Analytics", included: true },
        { text: "Custom Branding", included: true },
        { text: "Team Collaboration", included: true },
        { text: "Custom Integrations", included: true },
      ],
      icon: Crown,
      color: "from-[#7332a8] to-[#8a3dc2]",
      bgColor: "bg-[#7332a8]/5",
      borderColor: "border-[#7332a8]/20"
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 -left-32 w-96 h-96 bg-[#7332a8]/5 rounded-full" />
        <div className="absolute bottom-0 -right-32 w-96 h-96 bg-[#7332a8]/5 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-border bg-[#7332a8]/10">
            <Coins className="w-4 h-4 text-[#7332a8]" />
            <span className="text-sm font-medium text-[#7332a8]">One-Time Plans</span>
            <Gem className="w-4 h-4 text-[#7332a8]" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 px-4">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-[#7332a8] to-[#b266ff] text-transparent bg-clip-text">
              Plan
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Pay once, create forever. No subscriptions, no recurring fees.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={cn(
                  "relative rounded-3xl border-2 p-6 sm:p-8 flex flex-col h-full transition-all duration-300 hover:shadow-lg",
                  plan.borderColor,
                  plan.bgColor,
                  plan.popular && "scale-105 shadow-lg border-[#7332a8]/30"
                )}
                onMouseEnter={() => setActivePlan(plan.id)}
                onMouseLeave={() => setActivePlan(null)}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#7332a8] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                      <Star className="w-4 h-4 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Featured Badge */}
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#7332a8] text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                      <Crown className="w-4 h-4 fill-current" />
                      Best Value
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    <div className={cn("p-3 rounded-2xl bg-gradient-to-r", plan.color)}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>

                {/* Tokens Display */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
                      <Coins className="w-4 h-4 text-[#7332a8]" />
                      <span className="text-sm font-medium">
                        {plan.tokens === null ? (
                          <span className="flex items-center gap-1">
                            <InfinityIcon className="w-4 h-4" />
                            Unlimited Tokens
                          </span>
                        ) : (
                          `${plan.tokens} Portfolio Token${plan.tokens > 1 ? 's' : ''}`
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-center gap-2">
                    {plan.price === 0 ? (
                      <span className="text-4xl sm:text-5xl font-bold text-foreground">
                        Free
                      </span>
                    ) : (
                      <>
                        <span className="text-4xl sm:text-5xl font-bold text-foreground">
                          ${plan.price}
                        </span>
                        {plan.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">
                            ${plan.originalPrice}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    One-time payment
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mb-8">
                  <Button
                    className={cn(
                      "w-full py-3 text-base font-medium transition-all duration-200",
                      (plan.popular || plan.featured) && "bg-[#7332a8] hover:bg-[#6332a8]"
                    )}
                    variant={plan.buttonVariant}
                    size="lg"
                    asChild
                  >
                    <Link href={`/checkout?plan=${plan.id}`}>
                      {plan.buttonText}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>

                {/* Features */}
                <div className="space-y-4 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-start gap-3"
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                        feature.included
                          ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                          : "bg-muted text-muted-foreground"
                      )}>
                        <Check className={cn(
                          "w-3 h-3",
                          !feature.included && "opacity-0"
                        )} />
                      </div>
                      <span
                        className={cn(
                          "text-sm",
                          feature.included
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Some QandA related to Premium Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 sm:mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">
                Frequently Asked Questions
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Accordion-style FAQ with keyboard support */}
            <FAQAccordion />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;

function FAQAccordion() {
  const faqs = [
    {
      question: "What are Portfolio Creation Tokens?",
      answer:
        "Tokens are credits used to create and publish portfolios. Each plan includes a set number of tokens that never expire.",
    },
    {
      question: "Can I upgrade my plan later?",
      answer:
        "Yes! You can purchase additional tokens anytime from your dashboard. Upgrades are instant and one-time payments.",
    },
    {
      question: "Do I own my portfolios?",
      answer:
        "Absolutely. Once created, your portfolios are yours forever. You can export, modify, or host them anywhere.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and other secure payment methods through our checkout.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes! Start with our free Starter plan to create one portfolio and explore all features before upgrading.",
    },
    {
      question: "What if I need more tokens?",
      answer:
        "You can buy additional tokens individually or upgrade to a higher plan. Contact support for custom enterprise needs.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useRef(null);

  function toggle(i) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <div ref={containerRef} className="space-y-4">
      {faqs.map((f, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card/50">
          <button
            data-focusable
            aria-expanded={openIndex === i}
            onClick={() => toggle(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                const next = (i + 1) % faqs.length;
                containerRef.current?.querySelectorAll("button")[next]?.focus();
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                const prev = (i - 1 + faqs.length) % faqs.length;
                containerRef.current?.querySelectorAll("button")[prev]?.focus();
              }
              if (e.key === "Enter" || e.key === " ") toggle(i);
            }}
            className="w-full text-left p-6 flex items-center justify-between gap-4"
          >
            <span className="text-lg font-medium text-foreground">{f.question}</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${openIndex === i ? "rotate-180" : "rotate-0"}`}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="px-6 pb-6 text-muted-foreground"
              >
                {f.answer}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}