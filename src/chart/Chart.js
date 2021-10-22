/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react/macro';
import FusionCharts from 'fusioncharts';
import TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.gammel';
import ExcelExport from 'fusioncharts/fusioncharts.excelexport';
import ReactFC from 'react-fusioncharts';
import ChartInfo from './ChartInfo';
import { chartConfig } from './chartConfig';
import { useEffect, useRef, useState } from 'react';

ReactFC.fcRoot(FusionCharts, ExcelExport, TimeSeries, FusionTheme);

// 'chart' object from Strapi API
const Chart = ({ chart }) => {
  const [config, setConfig] = useState(chartConfig(chart));
  const chartWrapperRef = useRef(null);

  // DEBUG
  // useEffect(() => {
  //   console.log('config is', config);
  // }, [config]);

  // Runs after initial render
  useEffect(() => {
    const BASE_URL = 'https://api-dev.wigram.net:8443/';
    const fetchOptions = {
      headers: new Headers({
        WCA_API_KEY: 'this!sATemporaryApiKeyToTest',
        'Content-Type': 'application/json',
      }),
    };

    const chartSeriesUrls = chart.series
      .filter((s) => s.api_path?.length > 0) // Only include if it has a value set
      .map((s) => fetch(BASE_URL + s.api_path, fetchOptions));

    // Each series can have it's own endpoint.
    // Fetch each endpoint in parallel (using Promise.all)
    if (chartSeriesUrls.length > 0) {
      Promise.all(chartSeriesUrls)
        .then(function (responses) {
          return Promise.all(
            responses.map(function (response) {
              return response.json();
            })
          );
        })
        .then(function (responses) {
          // Flatten the array of data sets, and then convert to a format Fusion charts expects
          let allSeriesData = responses.flatMap((data) => formattedData(data));

          const schema = [
            {
              name: 'Id',
              type: 'string', // Seems it need to be string, number doesn't work!
            },
            {
              name: 'Time',
              type: 'date',
              format: '%Y-%m-%d',
            },
            {
              name: 'Value',
              type: 'number',
            },
          ];

          setConfig({
            ...config,
            dataSource: {
              ...config.dataSource,
              data: new FusionCharts.DataStore().createDataTable(
                allSeriesData,
                schema
              ),
            },
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, []);

  // https://www.fusioncharts.com/dev/fusiontime/fusiontime-attributes#date-time-format
  function formattedData(seriesData) {
    // API now returns date like, date: [2016, 2, 8] but we want date: "2021-05-03"
    const withFormattedDate = seriesData.map((obj) => ({
      ...obj,
      date: `${obj.date[0]}-${obj.date[1]
        .toString()
        .padStart(2, '0')}-${obj.date[2].toString().padStart(2, '0')}`,
    }));

    // Example Input: { "seriesId": 4, "date": "2021-05-03", "value": 72.0 }
    // Example Output: { '4', "2021-05-03", 72.0 }
    return withFormattedDate.map((d) => [
      d.seriesId.toString(), // Series identifier can not be a number
      d.date,
      d.value,
    ]);
  }

  const wrapperCss = css`
    display: flex;
    height: 100%;
    .chart {
      flex: 1 1 auto;
      text-align: center;

      .chart-title {
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }
      .chart-subtitle {
        color: #4aa842;
        margin-bottom: 1rem;
      }
    }
    .chart-info {
      padding-top: 110px; // Approx height of title + subtitle
      flex: 0 0 auto;
    }
  `;

  // Disable mouse wheel event on chart
  // Seems there is no configuration for this in FusionCharts itself so the event needs to be
  // captured by the chart wrapper. Note, true is set as last param of addEventListener which
  // allows the event to be "captured" rather than waiting for event to bubble up.
  // I tried using the FusionCharts canvasWheel event, however it doesn't seem the event can be canceled using this approach.
  useEffect(() => {
    const chartWrapper = chartWrapperRef.current;
    function cancelMouseWheelEvent(e) {
      e.stopPropagation();
    }
    chartWrapper.addEventListener('wheel', cancelMouseWheelEvent, true);
    return () => {
      chartWrapper.removeEventListener('wheel', cancelMouseWheelEvent, true);
    };
  }, []);

  return (
    <div css={wrapperCss} ref={chartWrapperRef}>
      <div className='chart'>
        {config.dataSource.data ? (
          <>
            <h2 className='chart-title'>{chart.Title}</h2>
            <div className='chart-subtitle'>{chart.Subtitle}</div>
            <ReactFC {...config} />
          </>
        ) : (
          'loading...'
        )}
      </div>
      <div className='chart-info'>
        <ChartInfo chart={chart}></ChartInfo>
      </div>
    </div>
  );
};

export default Chart;
