import './../src/global.scss'; // load in our custom app styles (shared)
import { css } from '@emotion/react';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'dark',
  },
};

const storyWrapper = css`
  height: 100%;
`;

export const decorators = [
  (Story) => (
    <div css={storyWrapper}>
      <Story />
    </div>
  ),
];
