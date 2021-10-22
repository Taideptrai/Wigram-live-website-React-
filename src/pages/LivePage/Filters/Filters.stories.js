/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import Filters from 'pages/LivePage/Filters/Filters';

export default {
  title: 'Wigram/Filters',
  component: Filters,
  parameters: { backgrounds: { default: 'dark' }, layout: 'fullscreen' },
  decorators: [
    (Story) => {
      const styles = css`
        grid-column: 1/4;
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

const Template = (args) => <Filters {...args} />;
const [filtersData, columnFiltersApplied] = loadInputData();
export const Default = Template.bind({});
Default.args = {
  filtersData: filtersData,
  columnFiltersApplied: columnFiltersApplied,
  onCancel: () => {},
  onApply: () => {},
};

function loadInputData() {
  const filtersData = {
    themes: [
      {
        id: 2,
        name: 'Inflation',
        created_at: '2021-05-20T01:15:39.900Z',
        updated_at: '2021-06-21T04:24:58.482Z',
        order: 1,
      },
      {
        id: 7,
        name: 'Activity/Output',
        created_at: '2021-06-16T01:32:26.565Z',
        updated_at: '2021-06-21T04:25:10.623Z',
        order: 2,
      },
      {
        id: 1,
        name: 'COVID-19',
        created_at: '2021-05-20T01:15:31.432Z',
        updated_at: '2021-06-21T04:44:10.002Z',
        order: 3,
      },
      {
        id: 4,
        name: 'Policy',
        created_at: '2021-06-15T06:30:56.262Z',
        updated_at: '2021-06-21T04:25:28.421Z',
        order: 4,
      },
      {
        id: 5,
        name: 'Financial Risk',
        created_at: '2021-06-16T01:27:55.250Z',
        updated_at: '2021-06-21T04:25:34.871Z',
        order: 5,
      },
    ],
    countries: [
      {
        id: 1,
        name: 'China',
        created_at: '2021-06-15T06:29:15.776Z',
        updated_at: '2021-06-15T06:29:15.897Z',
      },
      {
        id: 2,
        name: 'AU',
        created_at: '2021-06-15T06:29:23.967Z',
        updated_at: '2021-06-15T06:29:24.259Z',
      },
      {
        id: 3,
        name: 'NZ',
        created_at: '2021-06-15T06:29:46.817Z',
        updated_at: '2021-06-15T06:29:47.008Z',
      },
      {
        id: 4,
        name: 'Korea',
        created_at: '2021-06-16T01:50:15.510Z',
        updated_at: '2021-06-16T01:50:15.515Z',
      },
      {
        id: 5,
        name: 'India',
        created_at: '2021-06-16T01:50:22.098Z',
        updated_at: '2021-06-16T01:50:22.102Z',
      },
      {
        id: 6,
        name: 'Thailand',
        created_at: '2021-06-16T01:50:29.805Z',
        updated_at: '2021-06-16T01:50:29.810Z',
      },
      {
        id: 7,
        name: 'USA',
        created_at: '2021-06-16T01:50:38.698Z',
        updated_at: '2021-06-16T01:50:38.703Z',
      },
      {
        id: 8,
        name: 'Japan',
        created_at: '2021-06-16T01:50:50.827Z',
        updated_at: '2021-06-16T01:50:50.833Z',
      },
      {
        id: 9,
        name: 'Taiwan',
        created_at: '2021-06-17T02:37:50.450Z',
        updated_at: '2021-06-17T02:37:50.456Z',
      },
      {
        id: 10,
        name: 'Indonesia',
        created_at: '2021-06-18T04:02:41.228Z',
        updated_at: '2021-06-18T04:02:41.232Z',
      },
      {
        id: 11,
        name: 'UK',
        created_at: '2021-06-18T05:51:35.361Z',
        updated_at: '2021-06-18T05:51:35.365Z',
      },
    ],
    analysis: ['Longform', 'Shortform', 'News', 'Data points', 'Articles'],
  };

  const columnFiltersApplied = {
    themeId: 2,
    countries: [1, 2, 3, 4, 5, 6, 8, 9, 11],
    analysis: ['Longform', 'Shortform', 'News'],
  };

  return [filtersData, columnFiltersApplied];
}
