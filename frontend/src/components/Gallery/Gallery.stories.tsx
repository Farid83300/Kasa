import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Gallery from './Gallery';

const meta: Meta<typeof Gallery> = {
  title: 'Composants/Gallery',
  component: Gallery,
};
export default meta;

type Story = StoryObj<typeof Gallery>;

const images = [
  'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-1.jpg',
  'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-2.jpg',
  'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/accommodation-20-3.jpg',
];

/** Cas normal — plusieurs images, flèches de navigation visibles */
export const PlusieursImages: Story = {
  args: { images, alt: 'Appartement cosy' },
};

/** Point de vigilance backlog — une seule image, aucune flèche affichée */
export const UneSeuleImage: Story = {
  args: { images: [images[0]], alt: 'Studio' },
};
