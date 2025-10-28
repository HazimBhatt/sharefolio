import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: [String],
  projectUrl: String,
  githubUrl: String,
  image: String,
  featured: {
    type: Boolean,
    default: false
  },
  startDate: Date,
  endDate: Date,
  currentlyWorking: {
    type: Boolean,
    default: false
  }
});

const socialLinkSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  icon: String
});

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subdomain: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  template: {
    type: String,
    required: true,
    default: 'v1',
    enum: ['v1', 'v2', 'v3', 'default']
  },
  // Personal Information
  personalInfo: {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    professionalTitle: {
      type: String,
      required: true,
      trim: true
    },
    bio: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      validate: {
        validator: function(v) {
          // Allow empty string or valid URL
          return v === '' || /^https?:\/\/.+\..+/.test(v);
        },
        message: 'Avatar must be a valid URL'
      }
    },
    resumeUrl: {
      type: String,
      validate: {
        validator: function(v) {
          // Allow empty string or valid URL
          return v === '' || /^https?:\/\/.+\..+/.test(v);
        },
        message: 'Resume URL must be a valid URL'
      }
    }
  },
  // Contact Information
  contact: {
    email: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Email must be a valid email address'
      }
    },
    phone: {
      type: String,
      validate: {
        validator: function(v) {
          return v === '' || /^[\+]?[1-9][\d]{0,15}$/.test(v.replace(/[\s\-\(\)]/g, ''));
        },
        message: 'Phone must be a valid phone number'
      }
    },
    location: String,
    website: {
      type: String,
      validate: {
        validator: function(v) {
          return v === '' || /^https?:\/\/.+\..+/.test(v);
        },
        message: 'Website must be a valid URL'
      }
    }
  },
  // Professional Information
  professionalDescription: {
    type: String,
    required: true
  },
  skills: [{
    name: {
      type: String,
      required: true
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: 'intermediate'
    },
    category: String
  }],
  experience: [{
    company: {
      type: String,
    },
    position: {
      type: String,
    },
    description: String,
    startDate: Date,
    endDate: Date,
    currentlyWorking: {
      type: Boolean,
      default: false
    },
    location: String
  }],
  // Education
  education: [{
    institution: {
      type: String,
      required: true
    },
    degree: {
      type: String,
      required: true
    },
    fieldOfStudy: String,
    startDate: Date,
    endDate: Date,
    currentlyStudying: {
      type: Boolean,
      default: false
    },
    description: String
  }],
  // Projects
  projects: [projectSchema],
  // Social Links
  socialLinks: [socialLinkSchema],
  // Customization
  customization: {
    theme: {
      primaryColor: {
        type: String,
        default: '#7332a8'
      },
      secondaryColor: {
        type: String,
        default: '#b266ff'
      },
      fontFamily: {
        type: String,
        default: 'inter'
      },
    },
    layout: {
      type: String,
      enum: ['standard', 'creative', 'minimal'],
      default: 'standard'
    }
  },
 
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },

  isPublished: {
    type: Boolean,
    default: true
  },
  lastPublished: Date,
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
portfolioSchema.index({ userId: 1 });
portfolioSchema.index({ subdomain: 1 });
portfolioSchema.index({ isPublished: 1 });
portfolioSchema.index({ template: 1 });
portfolioSchema.index({ 'personalInfo.avatar': 1 });

// Virtual for full name
portfolioSchema.virtual('personalInfo.fullName').get(function() {
  return `${this.personalInfo.firstName} ${this.personalInfo.lastName}`;
});

// Method to check if portfolio has avatar
portfolioSchema.methods.hasAvatar = function() {
  return !!this.personalInfo.avatar && this.personalInfo.avatar.trim() !== '';
};

// Method to check if portfolio has resume
portfolioSchema.methods.hasResume = function() {
  return !!this.personalInfo.resumeUrl && this.personalInfo.resumeUrl.trim() !== '';
};

export default mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);