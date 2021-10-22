/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import Quote from './Quote';

export default {
  title: 'Wigram/Article/Quote',
  component: Quote,
  parameters: {
    backgrounds: { default: 'light' },
  },
  decorators: [
    (Story) => {
      const styles = css`
        grid-column: 1/4;
        margin-top: 2rem;
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

const Template = (args) => <Quote>{args.text}</Quote>;

export const NoHeader = Template.bind({});
NoHeader.args = {
  text: 'This points to the largest official foreign asset accumulation since 2007',
};

export const WithHeader = Template.bind({});
WithHeader.args = {
  text: '3.5% GDP / Expected current account surplus in 2021',
};
