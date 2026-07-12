import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Tag from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Composants/Tag',
  component: Tag,
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const Equipement: Story = { args: { label: 'WIFI' } };
export const Categorie: Story = { args: { label: 'Night Life' } };
