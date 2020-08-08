import React from 'react';

class TipsCard extends React.Component {

  render() {
    const currGameObj = this.props.currGameObj;

    const playerStats = currGameObj.playerStats;

    // const csPerMin = playerStats.csPerMin;

    const gameStats = currGameObj.gameStats;

    const participantArr = gameStats.participants;

    const playerLane = this.getPlayerLane(participantArr, playerStats.participantId);
    
    console.log(currGameObj);

    console.log(playerStats);

    console.log(playerLane);

    return(
      
      <div className="TipsCard">

      </div>
    );
  }

  // getPlayerAndLaneOpponentObjs (participantArr, playerStats) {
  //   const participantId = playerStats.participantId;


  // }

  getPlayerLane(participantArr, participantId) {
    const playerObj = participantArr.filter(participantObj => participantObj.participantId === participantId)[0];

    // console.log(typeof playerObj);
    // console.log(playerObj);

    const timeline = playerObj.timeline;

    if(timeline.role === "SOLO" && timeline.lane === "TOP") {
      return "top";
    } else if(timeline.lane === "JUNGLE") {
      return "jungle";
    } else if(timeline.role === "SOLO" && timeline.lane === "MIDDLE") {
      return "middle";
    } else if(timeline.role === "DUO_CARRY" && timeline.lane === "BOTTOM") {
      return "adc";
    } else if(timeline.role === "DUO_SUPPORT" && timeline.lane === "BOTTOM") {
      return "support";
    }

    // something wrong happened with the role assignment
    return null;
      
  }
}

export default TipsCard;