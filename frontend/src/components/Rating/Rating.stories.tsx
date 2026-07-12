import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Rating from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'Composants/Rating',
  component: Rating,
};
export default meta;

type Story = StoryObj<typeof Rating>;

export const NoteMax: Story = { args: { value: 5 } };
export const NoteMoyenne: Story = { args: { value: 3 } };
export const NoteBasse: Story = { args: { value: 1 } };
