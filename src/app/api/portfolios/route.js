import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import mongoose from 'mongoose';
import Portfolio from '@/models/portfolio.model';
import User from '@/models/user.model';
import { verifyToken } from '@/lib/jwt';

export async function POST(request) {
  try {
    // Get token from cookies
    const cookieStore = await cookies();
    
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required. Please log in.' },
        { status: 401 }
      );
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      // Clear invalid token
      const response = NextResponse.json(
        { error: 'Invalid or expired token. Please log in again.' },
        { status: 401 }
      );
      
      response.cookies.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0
      });
      
      return response;
    }

    // Connect to database if not already connected
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    // Get user from token
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      // Clear token if user not found
      const response = NextResponse.json(
        { error: 'User not found. Please log in again.' },
        { status: 404 }
      );
      
      response.cookies.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0
      });
      
      return response;
    }

    // Check if user email is verified (optional - remove if you don't require email verification)
    if (!user.emailVerified) {
      return NextResponse.json(
        { error: 'Please verify your email before creating a portfolio.' },
        { status: 403 }
      );
    }

    // Check if user has tokens
    if (user.tokens < 1) {
      return NextResponse.json(
        { 
          error: 'Insufficient tokens. Please purchase more tokens to create a portfolio.',
          requiredTokens: 1,
          currentTokens: user.tokens
        },
        { status: 400 }
      );
    }

    const portfolioData = await request.json();

    // Validate required fields
    if (!portfolioData.personalInfo?.firstName || !portfolioData.personalInfo?.lastName) {
      return NextResponse.json(
        { error: 'First name and last name are required.' },
        { status: 400 }
      );
    }

    if (!portfolioData.personalInfo?.professionalTitle) {
      return NextResponse.json(
        { error: 'Professional title is required.' },
        { status: 400 }
      );
    }

    if (!portfolioData.personalInfo?.bio) {
      return NextResponse.json(
        { error: 'Bio is required.' },
        { status: 400 }
      );
    }

    if (!portfolioData.contact?.email) {
      return NextResponse.json(
        { error: 'Contact email is required.' },
        { status: 400 }
      );
    }

    // Generate subdomain if not provided
    let subdomain = portfolioData.subdomain;
    if (!subdomain) {
      const baseSubdomain = `${portfolioData.personalInfo.firstName}-${portfolioData.personalInfo.lastName}`
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      subdomain = baseSubdomain;
      let counter = 1;
      
      // Check if subdomain exists and find available one
      while (await Portfolio.findOne({ subdomain })) {
        subdomain = `${baseSubdomain}-${counter}`;
        counter++;
        
        // Prevent infinite loop
        if (counter > 100) {
          return NextResponse.json(
            { error: 'Unable to generate unique subdomain. Please try a different name.' },
            { status: 400 }
          );
        }
      }
    } else {
      // Validate provided subdomain
      subdomain = subdomain.toLowerCase().trim();
      
      // Check subdomain format
      const subdomainRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (!subdomainRegex.test(subdomain)) {
        return NextResponse.json(
          { error: 'Subdomain can only contain lowercase letters, numbers, and hyphens. It cannot start or end with a hyphen.' },
          { status: 400 }
        );
      }
      
      // Check subdomain length
      if (subdomain.length < 3 || subdomain.length > 63) {
        return NextResponse.json(
          { error: 'Subdomain must be between 3 and 63 characters long.' },
          { status: 400 }
        );
      }
      
      // Check if subdomain is already taken
      const existingPortfolio = await Portfolio.findOne({ subdomain });
      if (existingPortfolio) {
        return NextResponse.json(
          { error: 'Subdomain is already taken. Please choose a different one.' },
          { status: 400 }
        );
      }
    }

    const userPortfoliosCount = await Portfolio.countDocuments({ userId: user._id });
  
    if (userPortfoliosCount >= 100) { 
      return NextResponse.json(
        { error: 'You have reached the maximum number of portfolios allowed.' },
        { status: 400 }
      );
    }

    const portfolio = new Portfolio({
      ...portfolioData,
      userId: user._id,
      subdomain,
      isPublished: portfolioData.isPublished !== undefined ? portfolioData.isPublished : true,
      contact: {
        ...portfolioData.contact,
        email: portfolioData.contact.email || user.email 
      }
    });

    await portfolio.save();

    // Decrement user tokens
    user.tokens -= 1;
    await user.save();

    const portfolioResponse = portfolio.toObject();
    delete portfolioResponse.userId;

    return NextResponse.json(
      { 
        message: 'Portfolio created successfully', 
        portfolio: portfolioResponse,
        remainingTokens: user.tokens,
        subdomain: portfolio.subdomain
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating portfolio:', error);
    
    // Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    // MongoDB duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      if (field === 'subdomain') {
        return NextResponse.json(
          { error: 'Subdomain is already taken. Please choose a different one.' },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: 'A portfolio with these details already exists.' },
        { status: 400 }
      );
    }

    // MongoDB connection error
    if (error.name === 'MongoNetworkError' || error.name === 'MongoTimeoutError') {
      return NextResponse.json(
        { error: 'Database connection error. Please try again.' },
        { status: 503 }
      );
    }

    // General server error
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET method to fetch user's portfolios
export async function GET(request) {
  try {

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }


    const portfolios = await Portfolio.find({ userId: decoded.userId })
      .select('-userId')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      portfolios,
      count: portfolios.length
    });

  } catch (error) {
    console.error('Error fetching portfolios:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}