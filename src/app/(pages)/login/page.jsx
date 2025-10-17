"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Rocket, Sparkles, Star, Zap } from "lucide-react";
import { useState, useCallback, useMemo } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  }, []);

  const togglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  // Memoized background elements to prevent re-renders
  const backgroundElements = useMemo(() => (
    <>
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#7332a8] rounded-full blur-[120px] opacity-20" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#b266ff] rounded-full blur-[120px] opacity-20" />
    </>
  ), []);

  const visualSection = useMemo(() => (
    <div className="w-full max-w-2xl">
      <div className="relative h-[500px] flex items-center justify-center">
        {/* Static Orb */}
        <div className="absolute w-56 h-56 bg-[#7332a8] rounded-full blur-xl opacity-60" />

        {/* Static Cards */}
        <div className="absolute top-16 left-16 bg-[#7332a8] p-3 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20">
          <div className="flex items-center gap-2 text-white">
            <Star className="w-5 h-5" fill="currentColor" />
            <div>
              <p className="font-semibold text-sm">Premium</p>
              <p className="text-xs opacity-90">Portfolios</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-16 right-16 bg-background/80 backdrop-blur-sm border border-border p-3 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-sm font-medium text-foreground">Secure & Fast</span>
          </div>
        </div>

        {/* Central Content */}
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/50 shadow-2xl mb-4">
            <Sparkles className="w-4 h-4 text-[#7332a8]" />
            <span className="font-semibold text-foreground text-sm">Your Dream Portfolio Awaits</span>
            <Zap className="w-4 h-4 text-[#7332a8]" />
          </div>
          
          <div className="text-3xl font-bold text-foreground mb-3">
            ✨ 🚀 💫
          </div>
          
          <p className="text-muted-foreground max-w-xs mx-auto backdrop-blur-sm bg-background/30 rounded-lg p-3 text-sm">
            Create stunning portfolios that captivate and inspire
          </p>
        </div>
      </div>
    </div>
  ), []);

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 poppins-regular lg:px-8 bg-background overflow-hidden">

      <div className="absolute inset-0 overflow-hidden -z-10">
        {backgroundElements}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-border backdrop-blur-sm bg-[#7332a8]">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium  text-white">Welcome Back!</span>
            <Zap className="w-4 h-4 text-white" />
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
            Continue Your{" "}
            <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text relative after:absolute after:inset-0 after:bg-gradient-to-r sm:after:from-black/40 sm:dark:after:from-white/40 after:to-transparent after:skew-x-12 after:animate-pulse">
              Journey
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access your stunning portfolio and continue creating magic
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-around gap-8 lg:gap-16">
          {/* Login Form */}
          <div className="w-full max-w-md">
            <div className="relative">
              <div className="absolute -inset-1 bg-[#7332a8] rounded-3xl blur opacity-30" />
              
              <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 shadow-2xl">
                {/* Form Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-[#7332a8] rounded-2xl mb-3 shadow-lg">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Welcome Back!
                  </h2>
                  <p className="text-muted-foreground">
                    Sign in to continue your portfolio journey
                  </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                       data-focusable
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/50 text-foreground transition-colors duration-200 backdrop-blur-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                         data-focusable
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full px-4 pr-12 py-3 border border-border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/50 text-foreground transition-colors duration-200 backdrop-blur-sm"
                        required
                      />
                      <button
                        type="button"
                        
                        onClick={togglePassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgt Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-[#7332a8] border-border rounded focus:ring-[#7332a8] bg-background/50"
                      />
                      <span className="text-sm text-muted-foreground">Remember me</span>
                    </label>
                    <Link
                      href="/forgot-password"
                       data-focusable
                      className="text-sm p-2 text-[#7332a8] hover:text-[#5a2786] transition-colors duration-200"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Login Btn */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                     data-focusable
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#7332a8] text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5a2786]"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <Rocket className="w-5 h-5" />
                        <span>Launch Your Portfolio</span>
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border/50" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-card text-muted-foreground backdrop-blur-sm">Or continue with</span>
                  </div>
                </div>

                {/* Social Login */}
                <Button
                  variant="secondary"
                   data-focusable
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 h-12 border border-border/50 hover:border-[#7332a8]/50 transition-all duration-200 backdrop-blur-sm bg-background/50"
                >
                  <img 
                    src="/google.svg" 
                    alt="Google" 
                    className="w-5 h-5"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = e.target.nextElementSibling;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div className="w-6 h-6 bg-gradient-to-br from-[#4285F4] via-[#34A853] to-[#FBBC05] rounded-full items-center justify-center hidden">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  Continue with Google
                </Button>

                {/* Sign Up continue*/}
                <div className="text-center mt-6">
                  <p className="text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                       data-focusable
                      className="text-[#7332a8] p-2 hover:text-[#5a2786] font-medium transition-colors duration-200"
                    >
                      Create one now
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Section - Memoized */}
          {visualSection}
        </div>
      </div>
    </div>
  );
};

export default Login;