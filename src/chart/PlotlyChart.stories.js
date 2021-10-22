import PlotlyChart from './PlotlyChart';

export default {
  title: 'Wigram/Chart/Plotly',
  component: PlotlyChart,
};

export function Default() {
  return <PlotlyChart id={324} />;
}
Default.parameters = {
  backgrounds: { default: 'light' },
};
