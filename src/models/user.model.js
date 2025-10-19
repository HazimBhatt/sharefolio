import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  tokens: {
    type: Number,
    default: 1
  },
  paymentHistory: [{
    amount: Number,
    currency: {
      type: String,
      default: 'USD'
    },
    paymentMethod: String,
    transactionId: String,
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    date: {
      type: Date,
      default: Date.now
    },
    tokensPurchased: {
      type: Number,
      default: 0
    }
  }],
  subscription: {
    type: {
      type: String,
      enum: ['free', 'premium', 'pro'],
      default: 'free'
    },
    expiresAt: Date,
    isActive: {
      type: Boolean,
      default: false
    }
  },
  emailVerified: {
    type: Boolean,
    default: true
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ email: 1 });
// userSchema.index({ 'subscription.isActive': 1 });

export default mongoose.models.User || mongoose.model('User', userSchema);