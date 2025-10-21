import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'USD', planId, couponCode, isUpgrade } = await request.json();

    // Validate amount
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Create order
    const options = {
      amount: Math.round(amount), 
      currency,
      receipt: `receipt_${planId}_${Date.now()}`,
      notes: {
        planId,
        couponCode: couponCode || 'none',
        isUpgrade: isUpgrade.toString()
      }
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt
      }
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}