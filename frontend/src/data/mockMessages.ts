export interface Message {
  id: string;
  sender: 'user' | 'host';
  content: string;
  timestamp: string;
  date?: string; // affiché comme séparateur au-dessus du message si présent
}

export interface Conversation {
  id: string;
  hostName: string;
  preview: string;
  timestamp: string;
  unread: boolean;
  messages: Message[];
}

/**
 * Données statiques de démonstration — aucune API de messagerie n'existe
 * côté backend (README confirmé), cette page reste donc mockée par design.
 */
export const mockConversations: Conversation[] = Array.from({ length: 8 }).map((_, index) => ({
  id: `conv-${index}`,
  hostName: 'Utilisateur',
  preview: 'Bonjour, votre appartement est-il disp...',
  timestamp: '11:04 am',
  unread: index < 3,
  messages: [
    {
      id: `${index}-1`,
      sender: 'host',
      content:
        'Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?',
      timestamp: '11:04pm',
    },
    {
      id: `${index}-2`,
      sender: 'host',
      content:
        'Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?',
      timestamp: '11:04pm',
    },
    {
      id: `${index}-3`,
      sender: 'user',
      content:
        'Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?',
      timestamp: '11:04pm',
    },
    {
      id: `${index}-4`,
      sender: 'host',
      content:
        'Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?',
      timestamp: '11:04pm',
      date: '03 Septembre 2025',
    },
    {
      id: `${index}-5`,
      sender: 'user',
      content:
        'Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?',
      timestamp: '11:04pm',
    },
    {
      id: `${index}-6`,
      sender: 'host',
      content:
        'Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?',
      timestamp: '11:04pm',
    },
  ],
}));
