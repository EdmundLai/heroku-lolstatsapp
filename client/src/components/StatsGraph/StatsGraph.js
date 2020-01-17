import React from 'react';
import { Line } from 'react-chartjs-2';
import ArrayUtil from '../../utils/array';
import './StatsGraph.css';

class StatsGraph extends React.Component {

  render() {

    let timeline = this.props.statsObj.timelineData.playerTimelineData;
    // console.log(this.props.statsObj.timelineData);
    // console.log(timeline);
    let gameStats = this.props.statsObj.playerStats;
    let gameLength = this.props.statsObj.gameLength;
    let dataForGraphs = processTimelineData(timeline);    

    let avgXpPerMin = calculateAvgXpPerMin(timeline, gameLength);

    let deltasData = calculateDeltasPerMin(dataForGraphs);

    // let xpData = {
    //   labels: dataForGraphs.time,
    //   datasets: [{
    //     label: "Experience",
    //     fill: false,
    //     backgroundColor: 'rgb(255, 99, 132)',
    //     borderColor: 'rgb(255, 99, 132)',
    //     data: dataForGraphs.xp,
    //   }]
    // }

    // let goldData = {
    //   labels: dataForGraphs.time,
    //   datasets: [{
    //     label: "Total Gold",
    //     fill: false,
    //     backgroundColor: 'rgb(255, 99, 132)',
    //     borderColor: 'rgb(255, 99, 132)',
    //     data: dataForGraphs.totalGold,
    //   }]
    // }

    let gpmAvgArray = ArrayUtil.fillArray(deltasData.timeDeltas.length, gameStats.goldPerMin);
    let xppmAvgArray = ArrayUtil.fillArray(deltasData.timeDeltas.length, avgXpPerMin);

    let xpDeltaData = {
      labels: deltasData.timeDeltas,
      datasets: [{
        label: "Experience Per Min",
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: deltasData.xpDeltas,
      },
      {
        label: "Experience Per Minute Average",
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(0, 191, 255)',
        data: xppmAvgArray,
        borderDash: [10,5],
        pointRadius: 0,
        pointHitRadius: 0,
      }
    ]
    }

    let goldDeltaData = {
      labels: deltasData.timeDeltas,
      datasets: [{
        label: "Gold Per Min",
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: deltasData.goldDeltas,
      },
      {
        label: "Gold Per Minute Average",
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(0, 191, 255)',
        data: gpmAvgArray,
        borderDash: [10,5],
        pointRadius: 0,
        pointHitRadius: 0,
      }
      ]
    }

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

    const goldChartOptions = {
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
            labelString: 'Gold Gained',
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

    const expChartOptions = {
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
            labelString: 'Exp Gained',
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

    let displayedGraph;

    if(this.props.type === "gold") {
      displayedGraph = <Line data={goldDeltaData} options={goldChartOptions}/>
    } else {
      displayedGraph = <Line data={xpDeltaData} options={expChartOptions}/>
    }
    
    return(
      <div className="StatsGraph">
        {displayedGraph}
      </div>
    );
  }
}

function processTimelineData(data) {
  let time = [];
  let totalGold = [];
  let xp = [];
  let totalFrames = Object.keys(data).length;
  for(let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
    time.push(`${frameIndex} mins`);
    let currFrame = data[frameIndex];
    totalGold.push(currFrame.totalGold);
    xp.push(currFrame.xp);
  }

  let graphData = {
    time,
    totalGold,
    xp
  };

  return graphData;
}

function calculateAvgXpPerMin(data, gameLength) {
  let dataLength = Object.keys(data).length;

  let avgXpPerMin = data[dataLength - 1].xp / (gameLength / 60);

  return avgXpPerMin;
}

function calculateDeltasPerMin(graphData) {
  let time = graphData.time;
  let xpData = graphData.xp;
  let goldData = graphData.totalGold;

  let timeDeltas = [];
  let xpDeltas = [];
  let goldDeltas = [];

  for(let i = 0; i < time.length - 1; i++) {
    let xpDeltaPerMin = xpData[i + 1] - xpData[i];
    let goldDeltaPerMin = goldData[i + 1] - goldData[i];

    timeDeltas.push(i);
    xpDeltas.push(xpDeltaPerMin);
    goldDeltas.push(goldDeltaPerMin);
  }

  let deltaData = {
    timeDeltas,
    xpDeltas,
    goldDeltas
  };

  return deltaData;
}

export default StatsGraph;