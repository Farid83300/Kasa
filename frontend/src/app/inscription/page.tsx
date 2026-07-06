import type { Metadata } from 'next';
import AuthCard from '@/components/Auth/AuthCard';
import RegisterForm from '@/components/Auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Inscription — Kasa',
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Rejoignez la communauté Kasa"
      subtitle="Créez votre compte et commencez à voyager autrement : réservez des logements uniques, découvrez de nouvelles destinations et partagez vos propres lieux avec d'autres voyageurs."
    >
      <RegisterForm />
    </AuthCard>
  );
}
