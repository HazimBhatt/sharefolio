import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Portfolio from '@/models/portfolio.model';

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { subdomain } =await params;
    

    const portfolio = await Portfolio.findOne({ 
      subdomain,
      isPublished: true 
    }).populate('userId', 'name email');

    if (!portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found or not published' },
        { status: 404 }
      );
    }

    await Portfolio.findByIdAndUpdate(portfolio._id, {
      $inc: { views: 1 }
    });

    console.log(portfolio);
    
    return NextResponse.json({ portfolio });

  } catch (error) {
    console.error('Portfolio fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}