/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import mockThemes from 'mock/themes.json';
import ThemeSelector from 'pages/LivePage/ThemeSelector/ThemeSelector';

export default {
  title: 'Wigram/ThemeSelector',
  component: ThemeSelector,
  parameters: { backgrounds: { default: 'dark' }, layout: 'fullscreen' },
  decorators: [
    (Story) => {
      const styles = css`
        grid-column: 1/5;
        margin-top: 2rem;
        position: relative;
      `;
      return (
        <div className='grid'>
          <div css={styles}>
            <Story />
          </div>
        </div>
      );
    },
  ],
};

const Template = (args) => <ThemeSelector {...args} />;
export const Default = Template.bind({});
Default.args = {
  themes: mockThemes,
  currentThemeId: 2,
  disabledThemeIds: [],
};
