import type { Metadata } from 'next';
import AddPropertyForm from '@/components/AddProperty/AddPropertyForm';

export const metadata: Metadata = {
  title: 'Ajouter une propriété — Kasa',
};

export default function AddPropertyPage() {
  return (
    <div className="px-4 md:px-8 max-w-1440 mx-auto pb-16">
      <AddPropertyForm />
    </div>
  );
}
