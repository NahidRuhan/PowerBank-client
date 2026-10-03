import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json({ success: false, message: 'No refresh token provided' }, { status: 400 });
    }

    const res = NextResponse.json({ success: true }, { status: 200 });

    res.cookies.set({
      name: 'refreshToken',
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return res;
  } catch  {
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
