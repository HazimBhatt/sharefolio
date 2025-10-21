// app/api/verify-payment/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import User from '@/models/user.model';
import { verifyToken } from '@/lib/jwt';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Plan configuration
const PLAN_CONFIG = {
  free: { tokens: 1, subscriptionType: 'free' },
  pro: { tokens: 2, subscriptionType: 'premium' },
  enterprise: { tokens: null, subscriptionType: 'pro' }
};

// Helper function to get token from cookies
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

export async function POST(request) {
  try {
    await dbConnect();

    // Get token from cookies
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
      console.log("Decoded user ID:", userId);
    } catch (error) {
      console.log("Token verification error:", error);
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { paymentId, orderId, planId, couponCode, isUpgrade, amount, signature } = await request.json();

    // Validate required fields
    if (!paymentId || !orderId || !planId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify payment signature
    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(paymentId);

    if (payment.status !== 'captured') {
      return NextResponse.json(
        { error: 'Payment not captured' },
        { status: 400 }
      );
    }

    // Verify payment amount matches
    const expectedAmount = Math.round(amount * 100); // Convert to paise
    if (payment.amount !== expectedAmount) {
      return NextResponse.json(
        { error: 'Payment amount mismatch' },
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

    // Validate plan
    const planConfig = PLAN_CONFIG[planId];
    if (!planConfig) {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      );
    }

    // Check if user already has this plan (prevent duplicate upgrades)
    if (user.subscription.type === planConfig.subscriptionType && user.subscription.isActive) {
      return NextResponse.json(
        { error: 'User already has this plan' },
        { status: 400 }
      );
    }

    // Start transaction - update user plan and payment history
    const session = await User.startSession();
    session.startTransaction();

    try {
      // Update user subscription
      const updateData = {
        'subscription.type': planConfig.subscriptionType,
        'subscription.isActive': true,
        'subscription.expiresAt': null // Lifetime access
      };

      // Add tokens based on plan (only if not unlimited)
      if (planConfig.tokens !== null) {
        if (isUpgrade) {
          // For upgrades, add the difference in tokens
          const currentTokens = user.tokens;
          const newTokens = planConfig.tokens;
          updateData.tokens = Math.max(currentTokens, newTokens); // Take the higher value
        } else {
          // For new purchases, set to plan tokens
          updateData.tokens = planConfig.tokens;
        }
      } else {
        // For unlimited plan, set a very high number or handle differently
        updateData.tokens = 999999;
      }

      await User.findByIdAndUpdate(
        userId,
        updateData,
        { session }
      );

      // Add to payment history
      const paymentRecord = {
        amount: amount,
        currency: 'INR', // Razorpay uses INR
        paymentMethod: 'razorpay',
        transactionId: paymentId,
        status: 'completed',
        date: new Date(),
        tokensPurchased: planConfig.tokens || 0
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
        paymentId,
        orderId,
        planUpdated: true,
        plan: planConfig.subscriptionType,
        tokens: updatedUser?.tokens,
        message: `Successfully upgraded to ${planId} plan`
      });

    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }

  } catch (error) {
    console.error('Error verifying payment:', error);
    
    // Specific error handling
    if (error instanceof Error) {
      if (error.message.includes('Invalid token')) {
        return NextResponse.json(
          { error: 'Authentication failed' },
          { status: 401 }
        );
      }
      if (error.message.includes('Payment not captured')) {
        return NextResponse.json(
          { error: 'Payment was not successful' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Payment verification failed. Please contact support.' },
      { status: 500 }
    );
  }
}