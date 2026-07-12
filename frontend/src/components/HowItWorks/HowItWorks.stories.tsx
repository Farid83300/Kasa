import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HowItWorks from './HowItWorks';

const meta: Meta<typeof HowItWorks> = {
  title: 'Composants/HowItWorks',
  component: HowItWorks,
};
export default meta;

export const Default: StoryObj<typeof HowItWorks> = {};
