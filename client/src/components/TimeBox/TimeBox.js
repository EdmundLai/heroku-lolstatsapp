import React from "react";
import time from "../../utils/time";
import "./TimeBox.css";

class TimeBox extends React.Component {
  render() {
    let gameDuration = time.convertLengthToTimeString(
      this.props.statsObj.gameLength
    );
    let gameDate = time.convertGameDate(this.props.statsObj.gameTime);

    return (
      <div className="TimeBox">
        <ul>
          <li>{gameDuration}</li>
          <li>{gameDate}</li>
        </ul>
      </div>
    );
  }
}

export default TimeBox;
