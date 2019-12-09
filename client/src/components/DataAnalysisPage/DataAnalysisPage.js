import React from 'react';
import TimeUtil from '../../utils/time';
import ArrayUtil from '../../utils/array';
import { Line } from 'react-chartjs-2';

import './DataAnalysisPage.css';

class DataAnalysisPage extends React.Component {
  render() {
    let dataState = this.props.dataState;
    let statsArray = dataState.currentStats;
    // console.log(statsArray);

    let graph = <></>;  

    if(statsArray.length !== 0) {
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

      graph = <Line data={csPerMinGraphData} options={chartOptions} />;
    }
    

    return(
      <div className="DataAnalysisPage">
        {graph}
      </div>
    );
  }
}

function getDataFromArray(statsArray) {
  let csPerMinArr = [];
  let gameDateArr = [];
  statsArray.forEach(gameData => {
    let csPerMin = gameData.gameStats.csPerMin;
    let gameDate = TimeUtil.convertGameDate(gameData.gameTime);
    csPerMinArr.push(csPerMin);
    gameDateArr.push(gameDate);
  });
  return {
    gameDateArr,
    csPerMinArr
  };
}

export default DataAnalysisPage;