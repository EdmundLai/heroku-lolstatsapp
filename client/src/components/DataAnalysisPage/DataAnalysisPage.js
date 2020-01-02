import React from 'react';
import TimeUtil from '../../utils/time';
import ArrayUtil from '../../utils/array';
import { Line, Scatter } from 'react-chartjs-2';

import './DataAnalysisPage.css';

class DataAnalysisPage extends React.Component {
  render() {
    let dataState = this.props.dataState;
    console.log(dataState);
    let statsArray = dataState.currentStats;
    // console.log(statsArray);

    let lineGraphContainer = <></>;
    let scatterContainer = <></>;
    let goldDiffContainer = <></>;

    if(statsArray.length !== 0) {
      const lineGraph = createCSLineGraph(statsArray);

      lineGraphContainer = 
        <div className="CSLineGraph">
          <h2>CS Per Minute Average for last 5 games</h2>
          {lineGraph}
        </div>;
    }

    // testing for analyzeTimelineData
    if(statsArray.length !== 0) {
      const firstGameData = statsArray[0];

      const killScatterPlot = createKillMap(firstGameData);

      scatterContainer = 
        <div className="ScatterContainer">
          <h2>Kill Map</h2>
          <div className="ScatterPlotContainer">
            {killScatterPlot}
          </div>
        </div>;
    }

    if(statsArray.length !== 0) {
      const firstGameData = statsArray[0];

      // const teamsData = getTeamsData(firstGameData);
      // console.log(teamsData);

      const teamGoldData = getTeamGoldData(firstGameData);

      console.log(teamGoldData);

      let timeArr = [];
      let goldDiffArr = [];

      for(let minute = 0; minute < teamGoldData.goldDiff.length; minute++) {
        timeArr.push(minute);
        goldDiffArr.push(teamGoldData.goldDiff[minute]);
      }

      let goldDiffDataset = {
        labels: timeArr,
        datasets: [{
          label: "Gold difference",
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: goldDiffArr
        }]
      }

      const lineOptions = {
        responsive: true,
      }

      goldDiffContainer = 
      <div className="GoldDiffContainer">
        <h2>Gold Difference</h2>
        <Line data={goldDiffDataset} options={lineOptions}/>
      </div>;
    }

    return(
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
  statsArray.forEach(gameData => {
    let csPerMin = gameData.playerStats.csPerMin;
    let gameDate = TimeUtil.convertGameDate(gameData.gameTime);
    csPerMinArr.push(csPerMin);
    gameDateArr.push(gameDate);
  });
  return {
    gameDateArr,
    csPerMinArr
  };
}

// analyze timeline data for one game
function analyzeTimelineData(gameStats) {
  const timelineData = gameStats.timelineData.frames;
  // console.log("timelineData: ");
  // console.log(timelineData);
  let gameKillEvents = [];

  for(let i = 0; i < timelineData.length; i++) {
    let frameObj = timelineData[i];
    let gameEvents = frameObj.events;
    let lastMinKills = [];
    for(let j = 0; j < gameEvents.length; j++) {
      let gameEvent = gameEvents[j];
      if(gameEvent.type === "CHAMPION_KILL") {
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

  let avgCSArr = ArrayUtil.fillArray(csPerMinData.csPerMinArr.length, avgCSPerMin);
  // console.log(avgCSArr);
  // console.log(csPerMinData);

  let csPerMinGraphData = {
    labels: csPerMinData.gameDateArr,
    datasets: [{
      label: "CS per Min Avg by Game",
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: csPerMinData.csPerMinArr
    },
    {
      label: "CS Per Min Average of Last 5 games",
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(0, 191, 255)',
      data: avgCSArr,
      borderDash: [10,5],
      pointRadius: 0,
      pointHitRadius: 0,
    }
  ]
  }

  let chartOptions = {
    hover: {
      mode: 'nearest'
    }
  }

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
        pointBackgroundColor: 'rgb(0, 191, 255)',
      }
    ]
  }

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }],
    },
  };

  return <Scatter data={killsGraphData} options={scatterOptions} />;
}

// returns team data from gameData
function getTeamsData(gameData) {
  const gameStats = gameData.gameStats;
  const participantArray = gameStats.participants;
  const teamArray = gameStats.teams;

  let teamsData = {
    blue: {},
    red: {},
  };

  let blueData = {};
  let redData = {};

  let firstTeamIsBlue = false;

  const firstTeam = teamArray[0];

  if(firstTeam.teamId === 100) {
    firstTeamIsBlue = true;
  }

  if(firstTeam.win === "Win") {
    blueData.win = (firstTeamIsBlue ? true : false);
    redData.win = (firstTeamIsBlue ? false : true);
  } else {
    blueData.win = (firstTeamIsBlue ? false : true);
    redData.win = (firstTeamIsBlue ? true : false);
  }

  let bluePlayerArr = [];
  let redPlayerArr = [];

  participantArray.forEach(participantData => {
    if(participantData.teamId === 100) {
      bluePlayerArr.push(participantData);
    } else {
      redPlayerArr.push(participantData);
    }
  });

  blueData.playerArr = bluePlayerArr;
  redData.playerArr = redPlayerArr;

  teamsData.blue = blueData;
  teamsData.red = redData;

  return teamsData;
}

function getTeamGoldData(gameData) {
  let gameFrames = gameData.timelineData.frames;

  let teamGoldData = {
    blueTotalGold: [],
    redTotalGold: [],
    goldDiff: [],
  }

  gameFrames.forEach(currentFrame => {
    let participantFrames = currentFrame.participantFrames;

    let blueGoldAtCurrFrame = 0;
    let redGoldAtCurrFrame = 0;

    Object.values(participantFrames).forEach(playerFrame => {
      if(playerFrame.participantId >= 1 && playerFrame.participantId <= 5) {
        blueGoldAtCurrFrame += playerFrame.totalGold;
      } else {
        redGoldAtCurrFrame += playerFrame.totalGold;
      }
    });

    let currGoldDifference = blueGoldAtCurrFrame - redGoldAtCurrFrame;

    teamGoldData.blueTotalGold.push(blueGoldAtCurrFrame);
    teamGoldData.redTotalGold.push(redGoldAtCurrFrame);
    teamGoldData.goldDiff.push(currGoldDifference);
  });

  return teamGoldData;
}

function make1DArrayFrom2DArray(array2D) {
  const reducer = (totalArray, currentVal) => totalArray.concat(currentVal);

  return array2D.reduce(reducer, []);
}

function getPositionDataFromFlatEventArray(eventArray) {
  return eventArray.map(event => event.position);
}

export default DataAnalysisPage;