import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HostInfo from './HostInfo';

const meta: Meta<typeof HostInfo> = {
  title: 'Composants/HostInfo',
  component: HostInfo,
};
export default meta;

type Story = StoryObj<typeof HostInfo>;

export const AvecPhoto: Story = {
  args: {
    name: 'Nathalie Jean',
    picture:
      'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/front-end-kasa-project/profile-picture-12.jpg',
    rating: 3,
  },
};

export const SansPhoto: Story = {
  args: { name: 'Farid Zaffalone', picture: '', rating: 5 },
};
