import React from "react";

// has not been fully implemented, still work in progress
class TipsCard extends React.Component {
  render() {
    const currGameObj = this.props.currGameObj;

    const playerStats = currGameObj.playerStats;

    // const csPerMin = playerStats.csPerMin;

    const gameStats = currGameObj.gameStats;

    const participantArr = gameStats.participants;

    const playerLane = this.getPlayerLane(
      participantArr,
      playerStats.participantId
    );

    // console.log(currGameObj);

    // console.log(playerStats);

    // console.log(playerLane);

    // console.log("Players info:");

    const playersInfo = this.getAllPlayersInfo(participantArr);

    // console.log(playersInfo);

    const opposingLanerId = this.getOpposingLanerId(
      playersInfo,
      playerStats.participantId,
      playerLane
    );

    console.log(`opposingLaner id: ${opposingLanerId}`);

    return <div className="TipsCard"></div>;
  }

  getAllPlayersInfo(participantArr) {
    const allPlayersInfo = {};

    participantArr.forEach((participantObj) => {
      //console.log(participantObj);
      const timeline = participantObj.timeline;

      const participantRole = this.checkPlayerRoleFromTimeline(timeline);

      allPlayersInfo[participantObj.participantId] = {
        participantObj: participantObj,
        participantRole: participantRole,
      };
    });

    return allPlayersInfo;
  }

  // participantId is searched player id
  getOpposingLanerId(playersInfo, participantId, playerLane) {
    for (var playerId = 1; playerId <= 10; playerId++) {
      const playerInfo = playersInfo[playerId];

      if (
        playerInfo.participantRole === playerLane &&
        playerId !== participantId
      ) {
        return playerId;
      }
    }
  }

  getPlayerLane(participantArr, participantId) {
    console.log(participantArr);

    const playerObj = participantArr.filter(
      (participantObj) => participantObj.participantId === participantId
    )[0];

    // console.log(typeof playerObj);
    // console.log(playerObj);

    const timeline = playerObj.timeline;

    return this.checkPlayerRoleFromTimeline(timeline);
  }

  checkPlayerRoleFromTimeline(timeline) {
    if (timeline.role === "SOLO" && timeline.lane === "TOP") {
      return "top";
    } else if (timeline.lane === "JUNGLE") {
      return "jungle";
    } else if (timeline.role === "SOLO" && timeline.lane === "MIDDLE") {
      return "middle";
    } else if (timeline.role === "DUO_CARRY") {
      return "adc";
    } else if (timeline.role === "DUO_SUPPORT") {
      return "support";
    }

    // something wrong happened with the role assignment
    return "no role";
  }
}

export default TipsCard;
