import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function POST(request: Request) {
  try {
    // Read the refreshToken from cookies
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = Object.fromEntries(
      cookieHeader.split('; ').map(c => c.split('='))
    );
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      return NextResponse.json({ success: false, message: 'No refresh token' }, { status: 401 });
    }

    // Call the backend to refresh
    const response = await fetch(`${API_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      // If refresh fails, clear the cookie
      const res = NextResponse.json(data, { status: response.status || 401 });
      res.cookies.delete('refreshToken');
      return res;
    }

    const { accessToken, refreshToken: newRefreshToken, user } = data.data;

    const res = NextResponse.json({ accessToken, user }, { status: 200 });

    res.cookies.set({
      name: 'refreshToken',
      value: newRefreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
