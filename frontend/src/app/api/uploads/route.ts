import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_ROOT = process.env.NEXT_PUBLIC_API_URL;

/** Proxy d'upload d'image — transmet le fichier au backend avec le token en Bearer */
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get('kasa_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Authentification requise' }, { status: 401 });
  }

  const formData = await request.formData();

  const res = await fetch(`${API_ROOT}/uploads/image`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: data.error ?? "Erreur lors de l'upload" },
      { status: res.status }
    );
  }

  return NextResponse.json(data);
}
