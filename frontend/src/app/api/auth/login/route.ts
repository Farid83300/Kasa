import { NextResponse } from 'next/server';
import { loginOnBackend } from '@/lib/backend/auth';

const COOKIE_NAME = 'kasa_token';

/** Route Handler — proxy vers le backend, pose le token en cookie httpOnly */
export async function POST(request: Request) {
  const payload = await request.json();

  try {
    const { token, user } = await loginOnBackend(payload);

    const response = NextResponse.json({ user });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur serveur';
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
