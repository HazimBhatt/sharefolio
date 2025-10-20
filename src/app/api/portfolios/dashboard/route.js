import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import mongoose from 'mongoose';
import Portfolio from '@/models/portfolio.model';
import { verifyToken } from '@/lib/jwt';

export async function GET(request) {
  try {
    // Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Connect to database
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    // Get user's portfolios
    const portfolios = await Portfolio.find({ userId: decoded.userId })
      .select('-userId -__v')
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