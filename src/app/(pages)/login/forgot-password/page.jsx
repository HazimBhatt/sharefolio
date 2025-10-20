"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, Rocket, Sparkles, Star, Zap, X, Lock, Key, ArrowLeft } from 'lucide-react';
import { useState, useCallback, useMemo } from "react";

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
    submit: ""
  });

  const [touched, setTouched] = useState({
    email: false,
    otp: false,
    newPassword: false,
    confirmPassword: false
  });

  const [countdown, setCountdown] = useState(0);
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
    
    // Clear submit error when any field changes
    if (errors.submit) {
      setErrors(prev => ({
        ...prev,
        submit: ""
      }));
    }
  }, [errors]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, value);
  }, [formData.newPassword, formData.confirmPassword]);

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

      case "otp":
        if (!value) {
          error = "OTP is required";
        } else if (!/^\d{6}$/.test(value)) {
          error = "OTP must be 6 digits";
        }
        break;

      case "newPassword":
        if (!value) {
          error = "New password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password";
        } else if (value !== formData.newPassword) {
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
  }, [formData.newPassword]);

  // Start countdown timer
  const startCountdown = useCallback(() => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Send OTP to email
  const handleSendOtp = useCallback(async (e) => {
    e.preventDefault();
    
    setTouched({ email: true });
    validateField("email", formData.email);

    if (!formData.email || errors.email) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      setOtpSent(true);
      startCountdown();
      setCurrentStep(2);
      
    } catch (error) {
      console.error('Send OTP error:', error);
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Failed to send OTP. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  }, [formData.email, errors.email, startCountdown]);

  // Verify OTP
  const handleVerifyOtp = useCallback(async (e) => {
    e.preventDefault();
    
    setTouched({ otp: true });
    validateField("otp", formData.otp);

    if (!formData.otp || errors.otp) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid OTP');
      }

      setCurrentStep(3);
      
    } catch (error) {
      console.error('Verify OTP error:', error);
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Invalid OTP. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  }, [formData.email, formData.otp, errors.otp]);

  // Reset password
  const handleResetPassword = useCallback(async (e) => {
    e.preventDefault();
    
    setTouched({
      newPassword: true,
      confirmPassword: true
    });

    validateField("newPassword", formData.newPassword);
    validateField("confirmPassword", formData.confirmPassword);

    if (!formData.newPassword || !formData.confirmPassword || errors.newPassword || errors.confirmPassword) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to reset password');
      }

      // Redirect to login page with success message
      window.location.href = '/login?message=Password reset successfully';
      
    } catch (error) {
      console.error('Reset password error:', error);
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Failed to reset password. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  }, [formData.email, formData.otp, formData.newPassword, formData.confirmPassword, errors.newPassword, errors.confirmPassword]);

  // Resend OTP
  const handleResendOtp = useCallback(async () => {
    if (countdown > 0) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to resend OTP');
      }

      startCountdown();
      
    } catch (error) {
      console.error('Resend OTP error:', error);
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Failed to resend OTP. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  }, [formData.email, countdown, startCountdown]);

  const togglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  // Simplified background elements
  const backgroundElements = useMemo(() => (
    <>
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#7332a8] rounded-full opacity-10" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#b266ff] rounded-full opacity-10" />
    </>
  ), []);

  const visualSection = useMemo(() => (
    <div className="w-full max-w-2xl">
      <div className="relative h-[500px] flex items-center justify-center">
        {/* Static Orb */}
        <div className="absolute w-56 h-56 bg-[#7332a8] rounded-full opacity-40" />

        {/* Static Cards */}
        <div className="absolute top-16 left-16 bg-[#7332a8] p-3 rounded-2xl shadow-lg border border-white/20">
          <div className="flex items-center gap-2 text-white">
            <Star className="w-5 h-5" fill="currentColor" />
            <div>
              <p className="font-semibold text-sm">Secure</p>
              <p className="text-xs opacity-90">Recovery</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-16 right-16 bg-background/90 border border-border p-3 rounded-2xl shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-sm font-medium text-foreground">Protected</span>
          </div>
        </div>

        {/* Central Content */}
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-background/90 border border-border/50 shadow-lg mb-4">
            <Sparkles className="w-4 h-4 text-[#7332a8]" />
            <span className="font-semibold text-foreground text-sm">
              {currentStep === 1 && "Reset Your Password"}
              {currentStep === 2 && "Verify Your Identity"}
              {currentStep === 3 && "Create New Password"}
            </span>
            <Zap className="w-4 h-4 text-[#7332a8]" />
          </div>
          
          <div className="text-3xl font-bold text-foreground mb-3">
            {currentStep === 1 && "🔐"}
            {currentStep === 2 && "📧"}
            {currentStep === 3 && "🔄"}
          </div>
          
          <p className="text-muted-foreground max-w-xs mx-auto bg-background/50 rounded-lg p-3 text-sm">
            {currentStep === 1 && "Enter your email to receive a verification code"}
            {currentStep === 2 && "Check your email and enter the 6-digit code"}
            {currentStep === 3 && "Create a strong new password for your account"}
          </p>
        </div>
      </div>
    </div>
  ), [currentStep]);

  // Step 1: Email Input
  const renderEmailStep = () => (
    <form onSubmit={handleSendOtp} className="space-y-5">
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
            onBlur={handleBlur}
            placeholder="Enter your email address"
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
            <span>Sending OTP...</span>
          </>
        ) : (
          <>
            <Key className="w-5 h-5" />
            <span>Send Verification Code</span>
          </>
        )}
      </motion.button>
    </form>
  );

  // Step 2: OTP Verification
  const renderOtpStep = () => (
    <form onSubmit={handleVerifyOtp} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="otp" className="text-sm font-medium text-foreground flex items-center gap-2">
          <Key className="w-4 h-4" />
          Verification Code
        </label>
        <div className="relative">
          <input
            data-focusable
            id="otp"
            name="otp"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength="6"
            value={formData.otp}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter 6-digit code"
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground transition-colors duration-200 text-center text-lg tracking-widest ${
              touched.otp && errors.otp ? 'border-red-500' : 'border-border'
            }`}
            required
          />
        </div>
        {touched.otp && errors.otp && (
          <p className="text-red-500 text-xs flex items-center gap-1">
            <X className="w-3 h-3" />
            {errors.otp}
          </p>
        )}
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={countdown > 0 || isLoading}
          className="text-sm text-[#7332a8] hover:text-[#5a2786] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {countdown > 0 ? `Resend code in ${countdown}s` : 'Resend code'}
        </button>
      </div>

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
            <span>Verifying...</span>
          </>
        ) : (
          <>
            <Key className="w-5 h-5" />
            <span>Verify Code</span>
          </>
        )}
      </motion.button>
    </form>
  );

  // Step 3: New Password
  const renderNewPasswordStep = () => (
    <form onSubmit={handleResetPassword} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="newPassword" className="text-sm font-medium text-foreground flex items-center gap-2">
          <Lock className="w-4 h-4" />
          New Password
        </label>
        <div className="relative">
          <input
            data-focusable
            id="newPassword"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter new password"
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground transition-colors duration-200 ${
              touched.newPassword && errors.newPassword ? 'border-red-500' : 'border-border'
            }`}
            required
          />
        </div>
        {touched.newPassword && errors.newPassword && (
          <p className="text-red-500 text-xs flex items-center gap-1">
            <X className="w-3 h-3" />
            {errors.newPassword}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground flex items-center gap-2">
          <Lock className="w-4 h-4" />
          Confirm Password
        </label>
        <div className="relative">
          <input
            data-focusable
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Confirm new password"
            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground transition-colors duration-200 ${
              touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-border'
            }`}
            required
          />
        </div>
        {touched.confirmPassword && errors.confirmPassword && (
          <p className="text-red-500 text-xs flex items-center gap-1">
            <X className="w-3 h-3" />
            {errors.confirmPassword}
          </p>
        )}
      </div>

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
            <span>Resetting Password...</span>
          </>
        ) : (
          <>
            <Rocket className="w-5 h-5" />
            <span>Reset Password</span>
          </>
        )}
      </motion.button>
    </form>
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
            <span className="text-sm font-medium text-white">
              {currentStep === 1 && "Password Recovery"}
              {currentStep === 2 && "Verify Identity"}
              {currentStep === 3 && "New Password"}
            </span>
            <Zap className="w-4 h-4 text-white" />
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
            Reset Your{" "}
            <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">
              Password
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {currentStep === 1 && "Enter your email to start the password reset process"}
            {currentStep === 2 && "Enter the verification code sent to your email"}
            {currentStep === 3 && "Create a strong new password for your account"}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-around gap-8 lg:gap-16">
          {/* Forgot Password Form */}
          <div className="w-full max-w-md">
            <div className="relative">
              <div className="absolute -inset-1 bg-[#7332a8] rounded-3xl opacity-20" />
              
              <div className="relative bg-card/90 border border-border/50 rounded-2xl p-6 shadow-lg">
                {/* Back Button */}
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="flex items-center gap-2 text-sm text-[#7332a8] hover:text-[#5a2786] transition-colors duration-200 mb-4"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                )}

                {/* Progress Steps */}
                <div className="flex justify-center mb-6">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                            currentStep >= step
                              ? 'bg-[#7332a8] text-white'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {step}
                        </div>
                        {step < 3 && (
                          <div
                            className={`w-8 h-0.5 mx-2 transition-all duration-300 ${
                              currentStep > step ? 'bg-[#7332a8]' : 'bg-muted'
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-[#7332a8] rounded-2xl mb-3 shadow">
                    <Key className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {currentStep === 1 && "Find Your Account"}
                    {currentStep === 2 && "Enter Verification Code"}
                    {currentStep === 3 && "Create New Password"}
                  </h2>
                  <p className="text-muted-foreground">
                    {currentStep === 1 && "We'll send a verification code to your email"}
                    {currentStep === 2 && `Code sent to ${formData.email}`}
                    {currentStep === 3 && "Enter your new password below"}
                  </p>
                </div>

                {/* Display submit error */}
                {errors.submit && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl flex items-center gap-2">
                    <X className="w-4 h-4" />
                    <span className="text-sm">{errors.submit}</span>
                  </div>
                )}

                {/* Render Current Step */}
                {currentStep === 1 && renderEmailStep()}
                {currentStep === 2 && renderOtpStep()}
                {currentStep === 3 && renderNewPasswordStep()}

                {/* Back to Login */}
                <div className="text-center mt-6">
                  <p className="text-muted-foreground">
                    Remember your password?{" "}
                    <Link
                      href="/login"
                      data-focusable
                      className="text-[#7332a8] p-2 hover:text-[#5a2786] font-medium transition-colors duration-200"
                    >
                      Back to Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Section */}
          {visualSection}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;