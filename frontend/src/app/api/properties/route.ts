import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decodeToken } from '@/lib/jwt';

const API_ROOT = process.env.NEXT_PUBLIC_API_URL;

/** Proxy de création de propriété — ajoute le host_id depuis le token, forward au backend */
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('kasa_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Authentification requise' }, { status: 401 });
  }

  const decoded = decodeToken(token);
  if (!decoded) {
    return NextResponse.json({ error: 'Session invalide' }, { status: 401 });
  }

  const body = await request.json();

  const res = await fetch(`${API_ROOT}/properties`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ ...body, host_id: decoded.id }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: data.error ?? 'Erreur lors de la création' },
      { status: res.status }
    );
  }

  return NextResponse.json(data, { status: 201 });
}
