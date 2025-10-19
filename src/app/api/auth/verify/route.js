import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request) {
  try {
    await dbConnect();

    // Get token from cookies
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (jwtError) {
      // Clear invalid token
      const response = NextResponse.json(
        { error: 'Invalid or expired token' },
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

    // Optional: Check if user still exists in database
    // Remove this if you want pure JWT verification without DB check
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      const response = NextResponse.json(
        { error: 'User not found' },
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

    // Return user data without password
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      tokens: user.tokens,
      subscription: user.subscription
    };

    return NextResponse.json({
      user: userResponse,
      message: 'Token verified successfully'
    });

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}