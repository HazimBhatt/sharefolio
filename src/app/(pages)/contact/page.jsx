"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare, Phone, MapPin, Send, Sparkles, Zap, Star, Rocket } from "lucide-react";
import { useState, useCallback, useMemo } from "react";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    message: ""
  });

  const [touched, setTouched] = useState({
    email: false,
    name: false,
    message: false
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

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
  }, []);

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

      case "name":
        if (!value) {
          error = "Name is required";
        } else if (value.length < 2) {
          error = "Name must be at least 2 characters";
        }
        break;

      case "message":
        if (!value) {
          error = "Message is required";
        } else if (value.length < 10) {
          error = "Message must be at least 10 characters";
        }
        break;

      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      email: true,
      name: true,
      message: true
    });

    // Validate all fields
    validateField("email", formData.email);
    validateField("name", formData.name);
    validateField("message", formData.message);

    // Check if form is valid
    const isFormValid = !errors.email && !errors.name && !errors.message && 
                       formData.email && formData.name && formData.message;

    if (!isFormValid) {
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    // Reset form on success
    setFormData({
      name: "",
      email: "",
      subject: "",
      phone: "",
      message: ""
    });
    setTouched({
      email: false,
      name: false,
      message: false
    });
  }, [formData, errors]);

  // Simplified background elements - removed blur effects
  const backgroundElements = useMemo(() => (
    <>
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#7332a8] rounded-full opacity-10" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#b266ff] rounded-full opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#5a2786] rounded-full opacity-5" />
    </>
  ), []);

  const contactInfo = useMemo(() => (
    <div className="w-full max-w-md">
      <div className="relative h-[500px] flex items-center justify-center">
        {/* Static Orb - removed blur */}
        <div className="absolute w-56 h-56 bg-[#7332a8] rounded-full opacity-40" />

        {/* Contact Info Cards - removed backdrop blur */}
        <div className="absolute top-20 left-8 bg-[#7332a8] p-4 rounded-2xl shadow-lg border border-white/20">
          <div className="flex items-center gap-3 text-white">
            <Mail className="w-5 h-5" />
            <div>
              <p className="font-semibold text-sm">Email Us</p>
              <p className="text-xs opacity-90">contact@sharefolio.com</p>
            </div>
          </div>
        </div>

        <div className="absolute top-40 right-12 bg-background/90 border border-border p-4 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-[#7332a8]" />
            {/* <div>
              <p className="text-sm font-medium text-foreground">Call Us</p>
              <p className="text-xs text-muted-foreground">+91 1111111111</p>
            </div> */}
          </div>
        </div>

        <div className="absolute bottom-32 left-12 bg-background/90 border border-border p-4 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#7332a8]" />
            <div>
              <p className="text-sm font-medium text-foreground">Visit Us</p>
              <p className="text-xs text-muted-foreground">Srinagar, Jammu & Kashmir, India</p>
            </div>
          </div>
        </div>

        {/* Central Content - removed backdrop blur */}
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-background/90 border border-border/50 shadow-lg mb-4">
            <Sparkles className="w-4 h-4 text-[#7332a8]" />
            <span className="font-semibold text-foreground text-sm">Get In Touch</span>
            <Zap className="w-4 h-4 text-[#7332a8]" />
          </div>
          
          <div className="text-3xl font-bold text-foreground mb-3">
            💬 📧 ✨
          </div>
          
          <p className="text-muted-foreground max-w-xs mx-auto bg-background/50 rounded-lg p-3 text-sm">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
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
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-border bg-[#7332a8]">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Contact Us</span>
            <Zap className="w-4 h-4 text-white" />
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">
              Connect
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions or want to work together? We're here to help bring your ideas to life.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-around gap-8 lg:gap-16">
          {/* Contact Form */}
          <div className="w-full max-w-2xl">
            <div className="relative">
              <div className="absolute -inset-1 bg-[#7332a8] rounded-3xl opacity-20" />
              
              <div className="relative bg-card/90 border border-border/50 rounded-2xl p-8 shadow-lg">
                {/* Form Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-[#7332a8] rounded-2xl mb-4 shadow">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Send us a Message
                  </h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you soon
                  </p>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter your full name"
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground transition-colors duration-200 ${
                            touched.name && errors.name ? 'border-red-500' : 'border-border'
                          }`}
                          required
                        />
                      </div>
                      {touched.name && errors.name && (
                        <p className="text-red-500 text-xs flex items-center gap-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address *
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
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone Field */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground transition-colors duration-200"
                        />
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Subject
                      </label>
                      <div className="relative">
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What's this about?"
                          className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground transition-colors duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Your Message *
                    </label>
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Tell us about your project or inquiry..."
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground transition-colors duration-200 resize-none ${
                          touched.message && errors.message ? 'border-red-500' : 'border-border'
                        }`}
                        required
                      />
                    </div>
                    {touched.message && errors.message && (
                      <p className="text-red-500 text-xs flex items-center gap-1">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    data-focusable
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#7332a8] text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5a2786]"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Additional Info */}
                <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          {contactInfo}
        </div>
      </div>
    </div>
  );
};

export default Contact;