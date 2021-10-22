export const SERIES_COLOURS = {
  Green: '#4AA842',
  Black: '#000000',
  Blue: '#6AB3C4',
  Yellow: '#6AB3C4',
  Red: '#D89C43',
  Purple: '#C46A90',
};

// Unpack all the relevant fields from Strapi chart object that is passed in
export const chartConfig = ({ series, time_markers, bands }) => {
  const seriesColours = series.map((s) => SERIES_COLOURS[s.colour]);
  // console.log('seriesColours', seriesColours);
  return {
    type: 'timeseries',
    renderAt: 'container',
    width: '100%',
    height: '75%',

    events: {
      renderComplete: function (ev) {
        manualChartOverrides(ev);
      },
    },
    dataSource: {
      // Hide the legend (we will build our own)
      legend: {
        enabled: '0',
      },
      extensions: {
        // Hide the (top left) date range shortcuts (1Y | 6M | 3M)
        standardRangeSelector: {
          enabled: '0',
        },
        // Hide the (top right) custom date range selector
        customRangeSelector: {
          enabled: '0',
        },
      },
      // Hide the time navigator shown under the chart
      navigator: {
        enabled: false,
      },
      dataMarker: [addSeriesTimeMarker()],
      chart: {
        theme: 'gammel',
        // Disable client-side export
        exportEnabled: 0,
        paletteColors: seriesColours,
      },
      yAxis: [
        {
          plot: {
            value: 'Value',
            type: 'line',
            connectnulldata: true,
            style: {
              plot: {
                //opacity: 0.2,
              },
            },
          },
          format: {
            prefix: '',
          },
          title: 'YOY%',
          series: 'Id',
        },
      ],
      xAxis: {
        timemarker: [
          ...time_markers.map((tm) => addTimeMarkers(tm)),
          ...bands.map((band) => addTimeBands(band)),
        ],
      },
    },
  };
};

function addTimeMarkers({ id, date_of_event, text }) {
  // TODO: Insert {br} to add line breaks for 'text'
  return {
    start: date_of_event,
    label: text,
    timeFormat: '%Y-%m-%d',
    type: 'full',
    style: {
      'marker-line': {
        fill: '#f7f7f7',
        'fill-opacity': 1,
        stroke: 1,
        'stroke-width': 1,
        'stroke-dasharray': 10,
      },
    },
  };
}

function addTimeBands({ id, from_date, to_date, text }) {
  // TODO: Insert {br} to add line breaks for 'text'
  return {
    start: from_date,
    end: to_date,
    label: text,
    timeFormat: '%Y-%m-%d',
    type: 'full',
    style: {
      marker: {
        fill: '#c5fbbe',
      },
    },
  };
}

// TODO: Not yet implemented in Strapi API
function addSeriesTimeMarker() {
  return {};
  // return {
  //   series: '5',
  //   time: '2021-04-30',
  //   timeFormat: '%Y-%m-%d',
  //   identifier: 'H',
  //   tooltext:
  //     'As a part of credit control program, under the leadership of Paul Volcker, the Fed tightened the money supply, allowing the federal fund rates to approach 20 percent.',
  // };
}

function manualChartOverrides(ev) {
  const containerElement = ev.sender.container;
  setYAxisStyle(containerElement, 2, '#222222');
  setXAxisStyle(containerElement, 2, '#222222');
}

function setYAxisStyle(containerElement, width, color) {
  // The closest parent class name is something like 'raphael-group-88-canvas-tropo',
  // however the number portion seems to change sometimes, like 'raphael-group-229-canvas-tropo'.
  // Instead we query for class name ending in "canvas-tropo" ('$' indicates 'ending with').
  const canvasElement = containerElement.querySelectorAll(
    '[class$="canvas-tropo"]'
  )[0]; // Only fetch the first entry.
  const pathElement = canvasElement.querySelectorAll('path')[0];
  pathElement.setAttribute('stroke-width', width.toString());
  pathElement.setAttribute('stroke', color); // 'stroke' attr stores the colour
}

function setXAxisStyle(containerElement, width, color) {
  const canvasElement = containerElement.querySelectorAll(
    '[class$="canvas-tropo"]'
  )[0];
  const pathElement = canvasElement.querySelectorAll('path')[3];
  pathElement.setAttribute('stroke-width', width.toString());
  pathElement.setAttribute('stroke', color);
}
