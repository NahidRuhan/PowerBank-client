import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function POST(request: Request) {
  try {
    // We forward the auth header if provided, but the critical part is clearing the cookie
    const authHeader = request.headers.get('Authorization');
    
    if (authHeader) {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
      });
    }

    const res = NextResponse.json({ success: true }, { status: 200 });
    res.cookies.delete('refreshToken');
    return res;
  } catch (error: unknown) {
    // Even if backend fails, clear the local cookie to force logout
    const res = NextResponse.json({ success: true }, { status: 200 });
    res.cookies.delete('refreshToken');
    return res;
  }
}
