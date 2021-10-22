import Chart from './Chart';
import mockChart from 'mock/chart.json';

export default {
  title: 'Wigram/Chart/Chart',
  component: Chart,
};

export const Default = () => <Chart chart={mockChart}></Chart>;
Default.parameters = {
  backgrounds: { default: 'light' },
};
