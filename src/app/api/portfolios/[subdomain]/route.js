import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Portfolio from '@/models/portfolio.model';

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { subdomain } = await params;
  
    
    const portfolio = await Portfolio.findOne({ 
      subdomain,
      isPublished: true 
    })
    .populate('userId', 'name email')
    .select('+services +socialLinks +highlights');

    if (!portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found or not published' },
        { status: 404 }
      );
    }

    await Portfolio.findByIdAndUpdate(portfolio._id, {
      $inc: { views: 1 }
    });

    // Transform the data to include all necessary fields
    const portfolioData = portfolio.toObject ? portfolio.toObject() : portfolio;
    
    // Ensure services and socialLinks are properly formatted
    if (!portfolioData.services) {
      portfolioData.services = [];
    }
    
    if (!portfolioData.socialLinks) {
      portfolioData.socialLinks = [];
    }
    
    if (!portfolioData.highlights) {
      portfolioData.highlights = [];
    }

    return NextResponse.json({ portfolio: portfolioData });

  } catch (error) {
    console.error('Portfolio fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}