import React from 'react';
import { Line } from 'react-chartjs-2';
import ArrayUtil from '../../utils/array';
import './StatsGraph.css';

class StatsGraph extends React.Component {

  render() {

    const timeline = this.props.statsObj.timelineData.playerTimelineData;
    // console.log(this.props.statsObj.timelineData);
    // console.log(timeline);
    const gameStats = this.props.statsObj.playerStats;
    const gameLength = this.props.statsObj.gameLength;
    const dataForGraphs = processTimelineData(timeline);    

    const avgXpPerMin = calculateAvgXpPerMin(timeline, gameLength);

    const deltasData = calculateDeltasPerMin(dataForGraphs);

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

    const gpmAvgArray = ArrayUtil.fillArray(deltasData.timeDeltas.length, gameStats.goldPerMin);
    const xppmAvgArray = ArrayUtil.fillArray(deltasData.timeDeltas.length, avgXpPerMin);

    const xpDeltaData = {
      labels: deltasData.timeDeltas,
      datasets: [
        createNormalDataSet("Experience Per Min", deltasData.xpDeltas),
        createAverageDataSet("Experience Per Minute Average", xppmAvgArray)
      ],
    }

    const goldDeltaData = {
      labels: deltasData.timeDeltas,
      datasets: [
        createNormalDataSet("Gold Per Min", deltasData.goldDeltas),
        createAverageDataSet("Gold Per Minute Average",gpmAvgArray)
      ],
    }

    const goldChartOptions = createChartOptions("Gold Per Min");
    const expChartOptions = createChartOptions("EXP Per Min");

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

function processTimelineData(data) {
  const time = [];
  const totalGold = [];
  const xp = [];
  const totalFrames = Object.keys(data).length;
  for(let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
    time.push(`${frameIndex} mins`);
    let currFrame = data[frameIndex];
    totalGold.push(currFrame.totalGold);
    xp.push(currFrame.xp);
  }

  const graphData = {
    time,
    totalGold,
    xp
  };

  return graphData;
}

function calculateAvgXpPerMin(data, gameLength) {
  const dataLength = Object.keys(data).length;

  return data[dataLength - 1].xp / (gameLength / 60);
}

function calculateDeltasPerMin(graphData) {
  const time = graphData.time;
  const xpData = graphData.xp;
  const goldData = graphData.totalGold;

  const timeDeltas = [];
  const xpDeltas = [];
  const goldDeltas = [];

  for(let i = 0; i < time.length - 1; i++) {
    const xpDeltaPerMin = xpData[i + 1] - xpData[i];
    const goldDeltaPerMin = goldData[i + 1] - goldData[i];

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