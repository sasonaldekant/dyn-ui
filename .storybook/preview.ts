import type { Preview } from '@storybook/react-vite'
import 'dyn-ui-react/styles/dyn-ui.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;