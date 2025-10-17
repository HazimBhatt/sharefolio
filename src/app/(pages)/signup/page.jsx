"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Rocket, Sparkles, Star, Zap, Check, X } from "lucide-react";
import { useState, useCallback, useMemo } from "react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Validation states
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false
  });

  // Password requirements
  const passwordRequirements = {
    minLength: formData.password.length >= 8,
    hasUpperCase: /[A-Z]/.test(formData.password),
    hasLowerCase: /[a-z]/.test(formData.password),
    hasNumber: /\d/.test(formData.password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password),
  };

  const isPasswordStrong = Object.values(passwordRequirements).every(Boolean);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate on change after first touch
    if (touched[name]) {
      validateField(name, value);
    }
  }, [touched]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, value);
  }, [formData.password]);

  const validateField = useCallback((name, value) => {
    let error = "";

    switch (name) {
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (!isPasswordStrong) {
          error = "Password does not meet requirements";
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password";
        } else if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;

      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, [formData.password, isPasswordStrong]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      email: true,
      password: true,
      confirmPassword: true
    });

    // Validate all fields
    validateField("email", formData.email);
    validateField("password", formData.password);
    validateField("confirmPassword", formData.confirmPassword);

    // Check if form is valid
    const isFormValid = !errors.email && !errors.password && !errors.confirmPassword &&
                       formData.email && formData.password && formData.confirmPassword &&
                       formData.password === formData.confirmPassword && isPasswordStrong;

    if (!isFormValid) {
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  }, [formData, errors, isPasswordStrong]);

  const togglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const toggleConfirmPassword = useCallback(() => {
    setShowConfirmPassword(prev => !prev);
  }, []);

  // Simplified background elements - removed blur effects
  const backgroundElements = useMemo(() => (
    <>
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#7332a8] rounded-full opacity-10" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#b266ff] rounded-full opacity-10" />
    </>
  ), []);

  const visualSection = useMemo(() => (
    <div className="w-full max-w-2xl">
      <div className="relative h-[500px] flex items-center justify-center">
        {/* Static Orb - removed blur */}
        <div className="absolute w-56 h-56 bg-[#7332a8] rounded-full opacity-40" />

        {/* Static Cards - removed backdrop blur */}
        <div className="absolute top-16 left-16 bg-[#7332a8] p-3 rounded-2xl shadow-lg border border-white/20">
          <div className="flex items-center gap-2 text-white">
            <Star className="w-5 h-5" fill="currentColor" />
            <div>
              <p className="font-semibold text-sm">Premium</p>
              <p className="text-xs opacity-90">Features</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-16 right-16 bg-background/90 border border-border p-3 rounded-2xl shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-sm font-medium text-foreground">Secure & Fast</span>
          </div>
        </div>

        {/* Central Content - removed backdrop blur */}
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-background/90 border border-border/50 shadow-lg mb-4">
            <Sparkles className="w-4 h-4 text-[#7332a8]" />
            <span className="font-semibold text-foreground text-sm">Start Your Journey</span>
            <Zap className="w-4 h-4 text-[#7332a8]" />
          </div>

          <div className="text-3xl font-bold text-foreground mb-3">
            ✨ 🚀 💫
          </div>

          <p className="text-muted-foreground max-w-xs mx-auto bg-background/50 rounded-lg p-3 text-sm">
            Join thousands of creators building amazing portfolios
          </p>
        </div>
      </div>
    </div>
  ), []);

  const PasswordRequirement = ({ met, text }) => (
    <div className={`flex items-center gap-2 text-xs transition-colors duration-200 ${
      met ? 'text-green-600' : 'text-muted-foreground'
    }`}>
      {met ? (
        <Check className="w-3 h-3" />
      ) : (
        <X className="w-3 h-3" />
      )}
      {text}
    </div>
  );

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
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-border bg-[#7332a8]">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Get Started!</span>
            <Zap className="w-4 h-4 text-white" />
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
            Start Your{" "}
            <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">
              Journey
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create your account and build your stunning portfolio today
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-around gap-8 lg:gap-16">
          {/* Sign Up Form */}
          <div className="w-full max-w-md">
            <div className="relative">
              <div className="absolute -inset-1 bg-[#7332a8] rounded-3xl opacity-20" />

              <div className="relative bg-card/90 border border-border/50 rounded-2xl p-6 shadow-lg">
                {/* Form Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-[#7332a8] rounded-2xl mb-3 shadow">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Create Account
                  </h2>
                  <p className="text-muted-foreground">
                    Join us and start building your portfolio
                  </p>
                </div>

                {/* Sign Up Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground transition-colors duration-200"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your email"
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground transition-colors duration-200 ${
                          touched.email && errors.email ? 'border-red-500' : 'border-border'
                        }`}
                        required
                      />
                    </div>
                    {touched.email && errors.email && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <X className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
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
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Create a strong password"
                        className={`w-full px-4 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground transition-colors duration-200 ${
                          touched.password && errors.password ? 'border-red-500' : 'border-border'
                        }`}
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

                    {/* Password Requirements */}
                    {formData.password && (
                      <div className="space-y-2 p-3 bg-background/70 rounded-lg border border-border/50">
                        <p className="text-xs font-medium text-foreground">Password Requirements:</p>
                        <div className="grid grid-cols-2 gap-1">
                          <PasswordRequirement
                            met={passwordRequirements.minLength}
                            text="At least 8 characters"
                          />
                          <PasswordRequirement
                            met={passwordRequirements.hasUpperCase}
                            text="One uppercase letter"
                          />
                          <PasswordRequirement
                            met={passwordRequirements.hasLowerCase}
                            text="One lowercase letter"
                          />
                          <PasswordRequirement
                            met={passwordRequirements.hasNumber}
                            text="One number"
                          />
                          <PasswordRequirement
                            met={passwordRequirements.hasSpecialChar}
                            text="One special character"
                          />
                        </div>
                      </div>
                    )}

                    {touched.password && errors.password && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <X className="w-3 h-3" />
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Confirm your password"
                        className={`w-full px-4 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground transition-colors duration-200 ${
                          touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-border'
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        <X className="w-3 h-3" />
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Terms and Conditions */}
                  <label className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-[#7332a8] border-border rounded focus:ring-[#7332a8] bg-background/70 mt-1"
                      required
                    />
                    <span className="text-sm text-muted-foreground">
                      I agree to the{" "}
                      <Link href="/terms" className="text-[#7332a8] hover:text-[#5a2786]">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#7332a8] hover:text-[#5a2786]">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>

                  {/* Sign Up Btn */}
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
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <Rocket className="w-5 h-5" />
                        <span>Launch Your Journey</span>
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
                    <span className="px-3 bg-card text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                {/* Social Sign Up */}
                <Button
                  variant="secondary"
                   data-focusable
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 h-12 border border-border/50 hover:border-[#7332a8]/50 transition-all duration-200 bg-background/70"
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

                {/* Login Link */}
                <div className="text-center mt-6">
                  <p className="text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                     data-focusable
                      href="/login"
                      className="text-[#7332a8] p-2 hover:text-[#5a2786] font-medium transition-colors duration-200"
                    >
                      Sign in here
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

export default SignUp;
