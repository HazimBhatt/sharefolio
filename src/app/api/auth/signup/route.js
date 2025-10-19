import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/user.model';

export async function POST(request) {
  try {
    await dbConnect();

    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 409 }
      );
    }

 
    const hashedPassword = await bcrypt.hash(password, 12);


    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      tokens: 1 
    });


    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      tokens: user.tokens,
      subscription: user.subscription
    };

    return NextResponse.json(
      { 
        message: 'User created successfully', 
        user: userResponse 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}