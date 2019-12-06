import React from 'react';
import time from '../../utils/time';
import { Line } from 'react-chartjs-2';

import './DataAnalysisPage.css';

class DataAnalysisPage extends React.Component {
  render() {
    let dataState = this.props.dataState;
    let statsArray = dataState.currentStats;
    // console.log(statsArray);

    function getDataFromArray(statsArray) {
      let csPerMinArr = [];
      let gameDateArr = [];
      statsArray.forEach(gameData => {
        let csPerMin = gameData.gameStats.csPerMin;
        let gameDate = time.convertGameDate(gameData.gameTime);
        csPerMinArr.push(csPerMin);
        gameDateArr.push(gameDate);
      });
      return {
        gameDateArr,
        csPerMinArr
      };
    }

    let csPerMinData = getDataFromArray(statsArray);
    console.log(csPerMinData);

    let csPerMinGraphData = {
      labels: csPerMinData.gameDateArr,
      datasets: [{
        label: "CS per Min Avg by Game",
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: csPerMinData.csPerMinArr
      }]
    }

    let chartOptions = {
      hover: {
        mode: 'nearest'
      }
    }

    return(
      <div className="DataAnalysisPage">
        <Line data={csPerMinGraphData} options={chartOptions} />
        {/* <p>
          Hello world from DataAnalysisPage!
        </p> */}
      </div>
    );
  }
}

export default DataAnalysisPage;