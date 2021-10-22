import ChartInfo from './ChartInfo';
import mockChart from './../mock/chart.json';

export default {
  title: 'Wigram/Chart/Info',
  component: ChartInfo,
};

export function Default() {
  return <ChartInfo chart={mockChart} />;
}
Default.parameters = {
  backgrounds: { default: 'light' },
};
