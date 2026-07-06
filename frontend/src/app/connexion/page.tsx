import type { Metadata } from 'next';
import AuthCard from '@/components/Auth/AuthCard';
import LoginForm from '@/components/Auth/LoginForm';

export const metadata: Metadata = {
  title: 'Connexion — Kasa',
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Heureux de vous revoir"
      subtitle="Connectez-vous pour retrouver vos réservations, vos annonces et tout ce qui rend vos séjours uniques."
    >
      <LoginForm />
    </AuthCard>
  );
}
