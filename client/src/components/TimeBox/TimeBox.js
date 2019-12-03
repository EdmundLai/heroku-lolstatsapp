import React from 'react';
import './TimeBox.css';

class TimeBox extends React.Component {
  render() {
    let gameDuration = convertLengthToTimeString(this.props.statsObj.gameLength);
    let gameDate = convertGameDate(this.props.statsObj.gameTime);

    return(
      <div className="TimeBox">
        <ul>
          <li>
            {gameDuration}
          </li>
          <li>
            {gameDate}
          </li>
        </ul>
      </div>
    );
    
  }
}

function convertLengthToTimeString(gameLength) {
  let numMin = Math.floor(gameLength / 60);
  let numSeconds = gameLength % 60;
  return `${numMin} min ${numSeconds} s`;
}

function convertGameDate(gameTime) {
  let date = new Date(gameTime);
  return date.toLocaleDateString();
}

export default TimeBox;