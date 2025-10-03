import type { Meta, StoryObj } from '@storybook/react-vite';
import { DynIcon } from './DynIcon';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { IconDictionaryProvider } from '../../providers/IconDictionaryProvider';

const meta: Meta<typeof DynIcon> = {
  title: 'Components/DynIcon',
  component: DynIcon,
  decorators: [
    (S) => (
      <ThemeProvider initialTheme="light">
        <IconDictionaryProvider>
          <S />
        </IconDictionaryProvider>
      </ThemeProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof DynIcon>;
export const Playground: Story = { args: {} };
