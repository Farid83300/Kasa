import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PropertyCard from './PropertyCard';
import { FavoritesProvider } from '@/context/FavoritesContext';

const meta: Meta<typeof PropertyCard> = {
  title: 'Composants/PropertyCard',
  component: PropertyCard,
  // FavoriteButton (enfant de PropertyCard) dépend du Context des favoris
  decorators: [
    (Story) => (
      <FavoritesProvider>
        <Story />
      </FavoritesProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof PropertyCard>;

export const Default: Story = {
  args: {
    property: {
      id: 'c67ab8a7',
      slug: 'appartement-cosy',
      title: 'Appartement cosy',
      description: 'Votre maison loin de chez vous.',
      cover:
        'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-1.jpg',
      location: 'Ile de France - Paris 17e',
      price_per_night: 182,
      rating_avg: 5,
      ratings_count: 0,
      host: { id: 1, name: 'Nathalie Jean', picture: '' },
    },
  },
};
