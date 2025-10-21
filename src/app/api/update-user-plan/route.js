import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/user.model';
import { verifyToken } from '@/lib/jwt';


function getTokenFromRequest(request) {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;
  
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(cookie => {
      const [name, ...value] = cookie.trim().split('=');
      return [name, value.join('=')];
    })
  );
  
  return cookies.token || null;
}


const FREE_PLAN_CONFIG = {
  tokens: 1,
  subscriptionType: 'free'
};

export async function POST(request) {
  try {
    await dbConnect();
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    let userId;
    try {
      const decoded = verifyToken(token);
      userId = decoded.userId || decoded.id;
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { planId, isUpgrade = false } = await request.json();

    if (planId !== 'free') {
      return NextResponse.json(
        { error: 'This route only handles free plan activation' },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user already has free plan active
    if (user.subscription.type === 'free' && user.subscription.isActive) {
      return NextResponse.json({
        success: true,
        message: 'Free plan is already active',
        plan: 'free',
        tokens: user.tokens
      });
    }

    // Start transaction
    const session = await User.startSession();
    session.startTransaction();

    try {
      // Update user to free plan
      const updateData = {
        'subscription.type': FREE_PLAN_CONFIG.subscriptionType,
        'subscription.isActive': true,
        'subscription.expiresAt': null
      };

      // For free plan, ensure user has at least 1 token
      if (!isUpgrade || user.tokens < FREE_PLAN_CONFIG.tokens) {
        updateData.tokens = Math.max(user.tokens, FREE_PLAN_CONFIG.tokens);
      }

      await User.findByIdAndUpdate(
        userId,
        updateData,
        { session }
      );

      // Add to payment history for tracking (free plan)
      const paymentRecord = {
        amount: 0,
        currency: 'INR',
        paymentMethod: 'free',
        transactionId: `free_${Date.now()}`,
        status: 'completed',
        date: new Date(),
        tokensPurchased: FREE_PLAN_CONFIG.tokens
      };

      await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            paymentHistory: paymentRecord
          }
        },
        { session }
      );

      // Commit transaction
      await session.commitTransaction();

      // Fetch updated user
      const updatedUser = await User.findById(userId);

      return NextResponse.json({
        success: true,
        message: 'Free plan activated successfully',
        plan: FREE_PLAN_CONFIG.subscriptionType,
        tokens: updatedUser?.tokens
      });

    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }

  } catch (error) {
    console.error('Error updating user plan:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('Invalid token')) {
        return NextResponse.json(
          { error: 'Authentication failed' },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to activate free plan. Please try again.' },
      { status: 500 }
    );
  }
}