import type { Metadata } from 'next';
import MessagesView from '@/components/Messages/MessagesView';

export const metadata: Metadata = {
  title: 'Messagerie — Kasa',
};

export default function MessagesPage() {
  return (
    <div className="px-4 md:px-8 max-w-1440 mx-auto pb-16">
      <MessagesView />
    </div>
  );
}
