import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import mongoose from 'mongoose';
import Portfolio from '@/models/portfolio.model';
import User from '@/models/user.model';
import { verifyToken } from '@/lib/jwt';

export async function DELETE(request, { params }) {
  try {
    const { id } =await params;
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

    // Find portfolio and verify ownership
    const portfolio = await Portfolio.findOne({ 
      _id: id, 
      userId: decoded.userId 
    });

    if (!portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found or access denied' },
        { status: 404 }
      );
    }

    // Delete portfolio
    await Portfolio.findByIdAndDelete(id);

    // Refund token to user 
    await User.findByIdAndUpdate(decoded.userId, {
      $inc: { tokens: 1 }
    });

    return NextResponse.json({
      message: 'Portfolio deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting portfolio:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}