"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  User, Mail, Briefcase, GraduationCap,
  Code, Link, Palette, Eye,
  Plus, Trash2, Sparkles, Zap,
  MapPin, Phone, Globe, FileText,
} from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import { ToastContainer, toast } from 'react-toastify';
const PortfolioForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Basic Information
    subdomain: "",
    template: "default",

    // Personal Information
    personalInfo: {
      firstName: "",
      lastName: "",
      professionalTitle: "",
      bio: "",
      avatar: "",
      resumeUrl: ""
    },

    // Contact Information
    contact: {
      email: "",
      phone: "",
      location: "",
      website: ""
    },

    // Professional Information
    professionalDescription: "",

    // Skills
    skills: [{ name: "", level: "intermediate", category: "" }],

    // Experience
    experience: [{
      company: "",
      position: "",
      description: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      location: ""
    }],

    // Education
    education: [{
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      currentlyStudying: false,
      description: ""
    }],

    // Projects
    projects: [{
      title: "",
      description: "",
      technologies: [""],
      projectUrl: "",
      githubUrl: "",
      image: "",
      featured: false,
      startDate: "",
      endDate: "",
      currentlyWorking: false
    }],

    // Social Links
    socialLinks: [{ platform: "", url: "", icon: "" }],

    // Customization
    customization: {
      theme: {
        primaryColor: "#7332a8",
        secondaryColor: "#b266ff",
        fontFamily: "inter",
        darkMode: false
      },
      layout: "standard"
    },

    // SEO
    seo: {
      metaTitle: "",
      metaDescription: "",
      keywords: []
    }
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((path, value) => {
    setFormData(prev => {
      const keys = path.split('.');
      const lastKey = keys.pop();
      const nested = keys.reduce((obj, key) => obj[key], prev);
      nested[lastKey] = value;
      return { ...prev };
    });
  }, []);

  const handleArrayChange = useCallback((arrayPath, index, field, value) => {
    setFormData(prev => {
      const keys = arrayPath.split('.');
      const array = keys.reduce((obj, key) => obj[key], prev);
      array[index][field] = value;
      return { ...prev };
    });
  }, []);

  const handleArrayItemChange = useCallback((arrayPath, index, subField, subIndex, value) => {
    setFormData(prev => {
      const keys = arrayPath.split('.');
      const array = keys.reduce((obj, key) => obj[key], prev);
      array[index][subField][subIndex] = value;
      return { ...prev };
    });
  }, []);

  const addArrayItem = useCallback((arrayPath, defaultItem) => {
    setFormData(prev => {
      const keys = arrayPath.split('.');
      const array = keys.reduce((obj, key) => obj[key], prev);
      array.push({ ...defaultItem });
      return { ...prev };
    });
  }, []);

  const removeArrayItem = useCallback((arrayPath, index) => {
    setFormData(prev => {
      const keys = arrayPath.split('.');
      const array = keys.reduce((obj, key) => obj[key], prev);
      if (array.length > 1) {
        array.splice(index, 1);
      }
      return { ...prev };
    });
  }, []);

  const addArraySubItem = useCallback((arrayPath, index, subField, defaultValue) => {
    setFormData(prev => {
      const keys = arrayPath.split('.');
      const array = keys.reduce((obj, key) => obj[key], prev);
      array[index][subField].push(defaultValue);
      return { ...prev };
    });
  }, []);

  const removeArraySubItem = useCallback((arrayPath, index, subField, subIndex) => {
    setFormData(prev => {
      const keys = arrayPath.split('.');
      const array = keys.reduce((obj, key) => obj[key], prev);
      if (array[index][subField].length > 1) {
        array[index][subField].splice(subIndex, 1);
      }
      return { ...prev };
    });
  }, []);

  const validateStep = useCallback((step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.subdomain) newErrors.subdomain = "Subdomain is required";
        if (!formData.personalInfo.firstName) newErrors.firstName = "First name is required";
        if (!formData.personalInfo.lastName) newErrors.lastName = "Last name is required";
        if (!formData.personalInfo.professionalTitle) newErrors.professionalTitle = "Professional title is required";
        if (!formData.contact.email) newErrors.email = "Email is required";
        if (formData.subdomain && !/^[a-z0-9-]+$/.test(formData.subdomain)) {
          newErrors.subdomain = "Subdomain can only contain lowercase letters, numbers, and hyphens";
        }
        break;
      case 2:
        if (!formData.professionalDescription) newErrors.professionalDescription = "Professional description is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 6));
    }
  }, [currentStep, validateStep]);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (validateStep(6)) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/portfolios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
         toast.success('Created Successfully! Access at /v1/subdomain');
          setTimeout(() => {
            window.location.href = `/`
          }, 3000)
        } else {
          // Handle error
          console.error('Failed to create portfolio:', data.error);
          setErrors({ submit: data.error });
        }
      } catch (error) {
        console.error('Error creating portfolio:', error);
        setErrors({ submit: 'Failed to create portfolio. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  }, [formData, validateStep]);

  const steps = [
    { id: 1, name: "Basic Info", icon: User },
    { id: 2, name: "Professional", icon: Briefcase },
    { id: 3, name: "Experience", icon: GraduationCap },
    { id: 4, name: "Projects", icon: Code },
    { id: 5, name: "Social", icon: Link },
    { id: 6, name: "Customize", icon: Palette }
  ];

  // Background elements
  const backgroundElements = useMemo(() => (
    <>
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#7332a8] rounded-full opacity-10" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#b266ff] rounded-full opacity-10" />
    </>
  ), []);

  // Step 1: Basic Information
  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-[#7332a8] rounded-2xl mb-4 shadow">
          <User className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Basic Information</h2>
        <p className="text-muted-foreground">Tell us about yourself and how to reach you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <User className="w-4 h-4" />
            First Name *
          </label>
          <input
            type="text"
            value={formData.personalInfo.firstName}
            onChange={(e) => handleChange('personalInfo.firstName', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <User className="w-4 h-4" />
            Last Name *
          </label>
          <input
            type="text"
            value={formData.personalInfo.lastName}
            onChange={(e) => handleChange('personalInfo.lastName', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          Professional Title *
        </label>
        <input
          type="text"
          value={formData.personalInfo.professionalTitle}
          onChange={(e) => handleChange('personalInfo.professionalTitle', e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
          placeholder="e.g., Full Stack Developer"
        />
        {errors.professionalTitle && <p className="text-red-500 text-xs">{errors.professionalTitle}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Bio *
        </label>
        <textarea
          rows={4}
          value={formData.personalInfo.bio}
          onChange={(e) => handleChange('personalInfo.bio', e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
          placeholder="Tell us about yourself..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Portfolio Subdomain *
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={formData.subdomain}
            onChange={(e) => handleChange('subdomain', e.target.value.toLowerCase())}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
            placeholder="yourname"
          />
          <span className="text-muted-foreground whitespace-nowrap">.sharefolio.com</span>
        </div>
        {errors.subdomain && <p className="text-red-500 text-xs">{errors.subdomain}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email *
          </label>
          <input
            type="email"
            value={formData.contact.email}
            onChange={(e) => handleChange('contact.email', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Phone
          </label>
          <input
            type="tel"
            value={formData.contact.phone}
            onChange={(e) => handleChange('contact.phone', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Location
        </label>
        <input
          type="text"
          value={formData.contact.location}
          onChange={(e) => handleChange('contact.location', e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
          placeholder="Your city and country"
        />
      </div>
    </div>
  );

  // Step 2: Professional Information
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-[#7332a8] rounded-2xl mb-4 shadow">
          <Briefcase className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Professional Information</h2>
        <p className="text-muted-foreground">Describe your professional background and skills</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Professional Description *
        </label>
        <textarea
          rows={6}
          value={formData.professionalDescription}
          onChange={(e) => handleChange('professionalDescription', e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
          placeholder="Describe your professional experience, expertise, and what you bring to the table..."
        />
        {errors.professionalDescription && <p className="text-red-500 text-xs">{errors.professionalDescription}</p>}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Code className="w-4 h-4" />
            Skills
          </label>
          <Button
            type="button"
            onClick={() => addArrayItem('skills', { name: "", level: "intermediate", category: "" })}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </Button>
        </div>

        {formData.skills.map((skill, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-border rounded-xl">
            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground">Skill Name</label>
              <input
                type="text"
                value={skill.name}
                onChange={(e) => handleArrayChange('skills', index, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
                placeholder="e.g., JavaScript"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground">Level</label>
              <select
                value={skill.level}
                onChange={(e) => handleArrayChange('skills', index, 'level', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <div className="space-y-2 flex-1">
                <label className="text-xs font-medium text-foreground">Category</label>
                <input
                  type="text"
                  value={skill.category}
                  onChange={(e) => handleArrayChange('skills', index, 'category', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
                  placeholder="e.g., Programming"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeArrayItem('skills', index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 3: Experience & Education
  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-[#7332a8] rounded-2xl mb-4 shadow">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Experience & Education</h2>
        <p className="text-muted-foreground">Add your work experience and educational background</p>
      </div>

      {/* Experience Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Briefcase className="w-5 h-5" />
            Work Experience
          </h3>
          <Button
            type="button"
            onClick={() => addArrayItem('experience', {
              company: "",
              position: "",
              description: "",
              startDate: "",
              endDate: "",
              currentlyWorking: false,
              location: ""
            })}
            className="flex items-center gap-2 p-2"
          >
            <Plus className="w-4 h-4 " />
            Add Experience
          </Button>
        </div>

        {formData.experience.map((exp, index) => (
          <div key={index} className="p-6 border border-border rounded-xl space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Company *</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
                  placeholder="Company name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Position *</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => handleArrayChange('experience', index, 'position', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
                  placeholder="Job title"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <textarea
                rows={3}
                value={exp.description}
                onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
                placeholder="Describe your role and responsibilities"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Start Date</label>
                <input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">End Date</label>
                <input
                  type="date"
                  value={exp.endDate}
                  onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)}
                  disabled={exp.currentlyWorking}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground disabled:opacity-50"
                />
              </div>
              <div className="flex items-end space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={exp.currentlyWorking}
                    onChange={(e) => handleArrayChange('experience', index, 'currentlyWorking', e.target.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-sm font-medium text-foreground">Currently working here</span>
                </label>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium text-foreground">Location</label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => handleArrayChange('experience', index, 'location', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
                  placeholder="City, Country"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeArrayItem('experience', index)}
                className="ml-4"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Education
          </h3>
          <Button
            type="button"
            onClick={() => addArrayItem('education', {
              institution: "",
              degree: "",
              fieldOfStudy: "",
              startDate: "",
              endDate: "",
              currentlyStudying: false,
              description: ""
            })}
            className="flex items-center gap-2 p-2"
          >
            <Plus className="w-4 h-4 " />
            Add Education
          </Button>
        </div>

        {formData.education.map((edu, index) => (
          <div key={index} className="p-6 border border-border rounded-xl space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Institution *</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleArrayChange('education', index, 'institution', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
                  placeholder="University or school"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Degree *</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleArrayChange('education', index, 'degree', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
                  placeholder="e.g., Bachelor of Science"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Field of Study</label>
              <input
                type="text"
                value={edu.fieldOfStudy}
                onChange={(e) => handleArrayChange('education', index, 'fieldOfStudy', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
                placeholder="e.g., Computer Science"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Start Date</label>
                <input
                  type="date"
                  value={edu.startDate}
                  onChange={(e) => handleArrayChange('education', index, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">End Date</label>
                <input
                  type="date"
                  value={edu.endDate}
                  onChange={(e) => handleArrayChange('education', index, 'endDate', e.target.value)}
                  disabled={edu.currentlyStudying}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground disabled:opacity-50"
                />
              </div>
              <div className="flex items-end space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={edu.currentlyStudying}
                    onChange={(e) => handleArrayChange('education', index, 'currentlyStudying', e.target.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-sm font-medium text-foreground">Currently studying</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <textarea
                rows={3}
                value={edu.description}
                onChange={(e) => handleArrayChange('education', index, 'description', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
                placeholder="Additional information about your education"
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeArrayItem('education', index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 4: Projects
  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-[#7332a8] rounded-2xl mb-4 shadow">
          <Code className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Projects</h2>
        <p className="text-muted-foreground">Showcase your best work and projects</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Code className="w-4 h-4" />
            Projects
          </label>
          <Button
            type="button"
            onClick={() => addArrayItem('projects', {
              title: "",
              description: "",
              technologies: [""],
              projectUrl: "",
              githubUrl: "",
              image: "",
              featured: false,
              startDate: "",
              endDate: "",
              currentlyWorking: false
            })}
            className="flex items-center gap-2 p-2"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </Button>
        </div>

        {formData.projects.map((project, index) => (
          <div key={index} className="p-6 border border-border rounded-xl space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Project Title *</label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
                placeholder="Project name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Description *</label>
              <textarea
                rows={4}
                value={project.description}
                onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
                placeholder="Describe your project..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Technologies</label>
              {project.technologies.map((tech, techIndex) => (
                <div key={techIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => handleArrayItemChange('projects', index, 'technologies', techIndex, e.target.value)}
                    className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
                    placeholder="Technology used"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeArraySubItem('projects', index, 'technologies', techIndex)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addArraySubItem('projects', index, 'technologies', "")}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Technology
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Project URL</label>
                <input
                  type="url"
                  value={project.projectUrl}
                  onChange={(e) => handleArrayChange('projects', index, 'projectUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
                  placeholder="https://yourproject.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">GitHub URL</label>
                <input
                  type="url"
                  value={project.githubUrl}
                  onChange={(e) => handleArrayChange('projects', index, 'githubUrl', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
                  placeholder="https://github.com/your/repo"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Start Date</label>
                <input
                  type="date"
                  value={project.startDate}
                  onChange={(e) => handleArrayChange('projects', index, 'startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">End Date</label>
                <input
                  type="date"
                  value={project.endDate}
                  onChange={(e) => handleArrayChange('projects', index, 'endDate', e.target.value)}
                  disabled={project.currentlyWorking}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground disabled:opacity-50"
                />
              </div>
              <div className="flex items-end space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={project.currentlyWorking}
                    onChange={(e) => handleArrayChange('projects', index, 'currentlyWorking', e.target.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-sm font-medium text-foreground">Currently working</span>
                </label>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={project.featured}
                  onChange={(e) => handleArrayChange('projects', index, 'featured', e.target.checked)}
                  className="rounded border-border"
                />
                <span className="text-sm font-medium text-foreground">Featured project</span>
              </label>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeArrayItem('projects', index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 5: Social Links
  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-[#7332a8] rounded-2xl mb-4 shadow">
          <Link className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Social Links</h2>
        <p className="text-muted-foreground">Add your social media and professional profiles</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Link className="w-4 h-4" />
            Social Links
          </label>
          <Button
            type="button"
            onClick={() => addArrayItem('socialLinks', { platform: "", url: "", icon: "" })}
            className="flex items-center gap-2 p-2"
          >
            <Plus className="w-4 h-4" />
            Add Link
          </Button>
        </div>

        {formData.socialLinks.map((link, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-border rounded-xl">
            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground">Platform</label>
              <select
                value={link.platform}
                onChange={(e) => handleArrayChange('socialLinks', index, 'platform', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
              >
                <option value="">Select Platform</option>
                <option value="github">GitHub</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter</option>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="youtube">YouTube</option>
                <option value="dribbble">Dribbble</option>
                <option value="behance">Behance</option>
                <option value="medium">Medium</option>
                <option value="devto">Dev.to</option>
                <option value="stackoverflow">Stack Overflow</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-foreground">URL *</label>
              <input
                type="url"
                value={link.url}
                onChange={(e) => handleArrayChange('socialLinks', index, 'url', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
                placeholder="https://platform.com/yourusername"
              />
            </div>
            <div className="flex items-end gap-2">
              <div className="space-y-2 flex-1">
                <label className="text-xs font-medium text-foreground">Icon (optional)</label>
                <input
                  type="text"
                  value={link.icon}
                  onChange={(e) => handleArrayChange('socialLinks', index, 'icon', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
                  placeholder="Icon class or name"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeArrayItem('socialLinks', index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Step 6: Customization
  const renderStep6 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-[#7332a8] rounded-2xl mb-4 shadow">
          <Palette className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Customization</h2>
        <p className="text-muted-foreground">Primary color(background) and secondary colors(text) are for buttons </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Primary Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={formData.customization.theme.primaryColor}
              onChange={(e) => handleChange('customization.theme.primaryColor', e.target.value)}
              className="w-16 h-16 rounded-lg border border-border cursor-pointer"
            />
            <input
              type="text"
              value={formData.customization.theme.primaryColor}
              onChange={(e) => handleChange('customization.theme.primaryColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
              placeholder="#7332a8"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Secondary Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={formData.customization.theme.secondaryColor}
              onChange={(e) => handleChange('customization.theme.secondaryColor', e.target.value)}
              className="w-16 h-16 rounded-lg border border-border cursor-pointer"
            />
            <input
              type="text"
              value={formData.customization.theme.secondaryColor}
              onChange={(e) => handleChange('customization.theme.secondaryColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
              placeholder="#b266ff"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Font Family</label>
          <select
            value={formData.customization.theme.fontFamily}
            onChange={(e) => handleChange('customization.theme.fontFamily', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
          >
            <option value="inter">Inter</option>
            <option value="poppins">Poppins</option>
            <option value="roboto">Roboto</option>
            <option value="montserrat">Montserrat</option>
            <option value="open-sans">Open Sans</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Layout</label>
          <select
            value={formData.customization.layout}
            onChange={(e) => handleChange('customization.layout', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
          >
            <option value="standard">Standard</option>
            <option value="creative">Creative</option>
            <option value="minimal">Minimal</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.customization.theme.darkMode}
            onChange={(e) => handleChange('customization.theme.darkMode', e.target.checked)}
            className="rounded border-border"
          />
          <span className="text-sm font-medium text-foreground">Enable Dark Mode</span>
        </label>
      </div>

      {/* SEO Section */}
      <div className="space-y-4 pt-6 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground">SEO Settings</h3>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Meta Title</label>
          <input
            type="text"
            value={formData.seo.metaTitle}
            onChange={(e) => handleChange('seo.metaTitle', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
            placeholder="Meta title for SEO"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Meta Description</label>
          <textarea
            rows={3}
            value={formData.seo.metaDescription}
            onChange={(e) => handleChange('seo.metaDescription', e.target.value)}
            className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-[#7332a8] focus:border-transparent bg-background/70 text-foreground"
            placeholder="Meta description for SEO"
          />
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      case 6: return renderStep6();
      default: return renderStep1();
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      <ToastContainer />
      <div className="absolute inset-0 overflow-hidden -z-10">
        {backgroundElements}
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-border bg-[#7332a8]">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-medium text-white">Create Your Portfolio</span>
            <Zap className="w-4 h-4 text-white" />
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
            Build Your{" "}
            <span className="bg-gradient-to-r from-[#7332a8] via-[#b266ff] to-[#ff80ff] text-transparent bg-clip-text">
              Portfolio
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create an amazing portfolio to showcase your work and skills to the world.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= step.id
                        ? 'bg-[#7332a8] border-[#7332a8] text-white'
                        : 'border-border text-muted-foreground'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 ${currentStep > step.id ? 'bg-[#7332a8]' : 'bg-border'
                        }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <div className="relative">
          <div className="absolute -inset-1 bg-[#7332a8] rounded-3xl opacity-20" />

          <div className="relative bg-card/90 border border-border/50 rounded-2xl p-8 shadow-lg">
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {renderCurrentStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  variant="outline"
                >
                  Previous
                </Button>

                {currentStep < steps.length ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#7332a8] p-2 hover:bg-[#5a2786]"
                  >
                    Next Step
                  </Button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center justify-center gap-3 px-6 py-3 bg-[#7332a8] text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5a2786]"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Creating Portfolio...</span>
                      </>
                    ) : (
                      <>
                        <span>Create Portfolio</span>
                        <Eye className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioForm;