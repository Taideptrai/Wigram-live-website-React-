/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import Banner from './Banner';

export default {
  title: 'Wigram/Article/Banner',
  component: Banner,
  argTypes: {
    onNavClick: { action: 'clicked' },
  },
  decorators: [
    (Story) => {
      const styles = css`
        height: 100%;
      `;
      return (
        <div css={styles}>
          <Story />
        </div>
      );
    },
  ],
};

const Template = (args) => <Banner {...args} />;

export const Feed = Template.bind({});
Feed.args = {
  article: {
    image: {
      id: 7,
      name: 'waterfall-chart.png',
      alternativeText: '',
      caption: '',
      width: 4300,
      height: 2419,
      formats: {
        thumbnail: {
          ext: '.png',
          url: 'https://wigram-web-assets.s3.ap-southeast-2.amazonaws.com/thumbnail_waterfall_chart_7e857647d5.png',
          hash: 'thumbnail_waterfall_chart_7e857647d5',
          mime: 'image/jpeg',
          name: 'thumbnail_waterfall-chart.png',
          path: null,
          size: 8.05,
          width: 245,
          height: 138,
        },
      },
      hash: 'waterfall_chart_7e857647d5',
      ext: '.png',
      mime: 'image/jpeg',
      size: 2371.18,
      url: 'https://wigram-web-assets.s3.ap-southeast-2.amazonaws.com/waterfall_chart_7e857647d5.png',
      previewUrl: null,
      provider: 'aws-s3',
      provider_metadata: null,
      created_at: '2021-05-20T01:15:01.675Z',
      updated_at: '2021-05-20T01:29:09.158Z',
    },
    title: 'Article Title ABC',
    description:
      'Confidence that the current rise in inflation is only transitory has risen in the last week, but China’s role has been neglected. If the current global pricing impulse is to be transitory, then Chinese prices need to fall. \n' +
      '\n',
    countries: [
      {
        id: 1,
        name: 'China',
        created_at: '2021-06-15T06:29:15.776Z',
        updated_at: '2021-06-15T06:29:15.897Z',
      },
    ],
  },
};

Feed.parameters = {
  backgrounds: { disable: true },
  layout: 'fullscreen',
};
