// Graph Utility functions
// - Used primarily to set Chart.JS graph options

function createNormalDataSet(label, data) {
  return {
    label,
    fill: false,
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data,
  };
}

function createAverageDataSet(label, data) {
  return {
    label,
    fill: false,
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(0, 191, 255)',
    data,
    borderDash: [10,5],
    pointRadius: 0,
    pointHitRadius: 0,
  }
}

function createChartOptions(label) {
  const gridLineOptions = {
    display: true,
    drawOnChartArea: false,
    drawTicks: false,
    color: 'white',
  };

  const yAxesTickOptions = {
    padding: 10,
    fontSize: 16,
    stepSize: 500,
  }

  const xAxesTickOptions = {
    padding: 10,
    fontSize: 16,
  }

  const timeScaleOptions = {
    display: true,
    labelString: 'Time (min)',
    fontSize: 16,
  };

  return {
    hover: {
      mode: 'nearest'
    },
    legend: {
      position: 'bottom'
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: label,
          fontSize: 16,
        },
        gridLines: gridLineOptions,
        ticks: yAxesTickOptions,
      }],
      xAxes: [{
        scaleLabel: timeScaleOptions,
        gridLines: gridLineOptions,
        ticks: xAxesTickOptions,
      }],
    }
  }
}

module.exports.createNormalDataSet = createNormalDataSet;

module.exports.createAverageDataSet = createAverageDataSet;

module.exports.createChartOptions = createChartOptions;