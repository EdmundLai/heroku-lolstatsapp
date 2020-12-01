import React from "react";
import TimeUtil from "../../utils/time";
import ArrayUtil from "../../utils/array";
import { Line, Scatter } from "react-chartjs-2";
import GoldDiffContainer from "../GoldDiffContainer/GoldDiffContainer";

import "./DataAnalysisPage.css";

// currently not in use (experimental page used for testing new features)
// currently broken due to changes in data state configuration in App.js
class DataAnalysisPage extends React.Component {
  render() {
    let dataState = this.props.dataState;
    console.log(dataState);
    let statsArray = dataState.currentStats;
    // console.log(statsArray);

    let lineGraphContainer = <></>;
    let scatterContainer = <></>;
    let goldDiffContainer = <></>;

    if (statsArray.length !== 0) {
      const lineGraph = createCSLineGraph(statsArray);

      lineGraphContainer = (
        <div className="CSLineGraph">
          <h2>CS Per Minute Average for last 5 games</h2>
          {lineGraph}
        </div>
      );
    }

    // testing for analyzeTimelineData
    if (statsArray.length !== 0) {
      const firstGameData = statsArray[0];

      const killScatterPlot = createKillMap(firstGameData);

      scatterContainer = (
        <div className="ScatterContainer">
          <h2>Kill Map</h2>
          <div className="ScatterPlotContainer">{killScatterPlot}</div>
        </div>
      );
    }

    if (statsArray.length !== 0) {
      const firstGameData = statsArray[0];

      // const teamsData = getTeamsData(firstGameData);
      // console.log(teamsData);

      goldDiffContainer = <GoldDiffContainer gameData={firstGameData} />;
    }

    return (
      <div className="DataAnalysisPage">
        {lineGraphContainer}
        {scatterContainer}
        {goldDiffContainer}
      </div>
    );
  }
}

function getDataFromArray(statsArray) {
  let csPerMinArr = [];
  let gameDateArr = [];
  statsArray.forEach((gameData) => {
    let csPerMin = gameData.playerStats.csPerMin;
    let gameDate = TimeUtil.convertGameDate(gameData.gameTime);
    csPerMinArr.push(csPerMin);
    gameDateArr.push(gameDate);
  });
  return {
    gameDateArr,
    csPerMinArr,
  };
}

// analyze timeline data for one game
function analyzeTimelineData(gameStats) {
  const timelineData = gameStats.timelineData.frames;
  // console.log("timelineData: ");
  // console.log(timelineData);
  let gameKillEvents = [];

  for (let i = 0; i < timelineData.length; i++) {
    let frameObj = timelineData[i];
    let gameEvents = frameObj.events;
    let lastMinKills = [];
    for (let j = 0; j < gameEvents.length; j++) {
      let gameEvent = gameEvents[j];
      if (gameEvent.type === "CHAMPION_KILL") {
        lastMinKills.push(gameEvent);
      }
    }
    gameKillEvents.push(lastMinKills);
  }

  return gameKillEvents;
}

function createCSLineGraph(statsArray) {
  let csPerMinData = getDataFromArray(statsArray);

  let avgCSPerMin = ArrayUtil.calculateAvgFromArray(csPerMinData.csPerMinArr);
  // console.log(avgCSPerMin);

  let avgCSArr = ArrayUtil.fillArray(
    csPerMinData.csPerMinArr.length,
    avgCSPerMin
  );
  // console.log(avgCSArr);
  // console.log(csPerMinData);

  let csPerMinGraphData = {
    labels: csPerMinData.gameDateArr,
    datasets: [
      {
        label: "CS per Min Avg by Game",
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: csPerMinData.csPerMinArr,
      },
      {
        label: "CS Per Min Average of Last 5 games",
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(0, 191, 255)",
        data: avgCSArr,
        borderDash: [10, 5],
        pointRadius: 0,
        pointHitRadius: 0,
      },
    ],
  };

  let chartOptions = {
    hover: {
      mode: "nearest",
    },
  };

  return <Line data={csPerMinGraphData} options={chartOptions} />;
}

function createKillMap(gameData) {
  const killEvents = analyzeTimelineData(gameData);
  const flatKillEvents = make1DArrayFrom2DArray(killEvents);

  const killPositionsArray = getPositionDataFromFlatEventArray(flatKillEvents);

  const killsGraphData = {
    datasets: [
      {
        data: killPositionsArray,
        pointRadius: 10,
        pointHoverRadius: 15,
        pointBackgroundColor: "rgb(0, 191, 255)",
      },
    ],
  };

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
  };

  return <Scatter data={killsGraphData} options={scatterOptions} />;
}

function make1DArrayFrom2DArray(array2D) {
  const reducer = (totalArray, currentVal) => totalArray.concat(currentVal);

  return array2D.reduce(reducer, []);
}

function getPositionDataFromFlatEventArray(eventArray) {
  return eventArray.map((event) => event.position);
}

export default DataAnalysisPage;
