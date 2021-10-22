import Plot from 'react-plotly.js';
import { useEffect, useState } from 'react';

function PlotlyChart({ id }) {
  const [chartConfig, setChartConfig] = useState(null);

  useEffect(() => {
    fetchChartConfig();
  }, []);

  const fetchChartConfig = async () => {
    // We need to call Strapi to retrieve the api path
    const response = await fetch(
      `${process.env.REACT_APP_STRAPI_URL}/charts/${id}`
    );
    const strapiData = await response.json();

    // Fetch API data
    if (strapiData.api_path) {
      const response = await fetch(
        process.env.REACT_APP_API_URL + strapiData.api_path,
        {
          headers: {
            'Content-Type': 'application/json',
            WCA_API_KEY: 'this!sATemporaryApiKeyToTest',
          },
        }
      );
      let data = await response.json();
      console.log('chart data', data);

      // Make charts responsive
      data.layout = {
        responsive: true,
        autosize: true,
      };
      data.useResizeHandler = true;
      data.style = { width: '100vw', height: '100%' };

      setChartConfig(data);
    } else {
      console.error('No API path has been set for this chart');
    }
  };

  if (chartConfig === null) {
    return <div>loading...</div>;
  }

  // https://community.plotly.com/t/react-plotly-responsive-chart-not-working/47547
  return <Plot {...chartConfig} />;
}

export default PlotlyChart;
