import React from "react";
import DataUtil from "../../utils/data";
import ChampKeys from "../../resources/ChampKeys";
import { ImgHostSplashURL } from "../../resources/ImgHostUrl";
import "./TurningPointsSplash.css";

function TurningPointSplash(props) {
  const { turningPointIndex, currGameObj, goldSwingData, isMobile } = props;

  // console.log(currGameObj.timelineData);

  const currTimelineObj = DataUtil.getTimelineObjFromGameObj(
    currGameObj,
    goldSwingData
  );

  const playerTeamObj = DataUtil.getPlayerTeamObjFromCurrGameObj(currGameObj);

  const playerId = currGameObj.playerStats.participantId;

  const playerTeamId = playerTeamObj[playerId].teamId;

  // console.log("playerTeamId:");
  // console.log(playerTeamId);

  const startingMinute = goldSwingData.startingMinute;

  const champKillsArr = currTimelineObj.CHAMPION_KILL;
  const objectiveKillsArr = currTimelineObj.ELITE_MONSTER_KILL;
  const buildingKillsArr = currTimelineObj.BUILDING_KILL;

  const goldSwingTeamId = goldSwingData.goldDiffDelta > 0 ? 100 : 200;

  // console.log(champKillsArr);
  // console.log(objectiveKillsArr);
  // console.log(buildingKillsArr);

  const numKillsObj = getNumKillsFromEachTeamByMinute(
    champKillsArr,
    playerTeamObj
  );

  // console.log(numKillsObj);

  const champion = getChampionForMVPOnGoldSwingTeam(
    champKillsArr,
    playerTeamObj,
    goldSwingTeamId
  );

  const statsCardStyle = {
    backgroundImage: `url(${ImgHostSplashURL}/champion/splash/${champion}_0.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  // team that had the favorable gold swing
  const goldSwingWinTeam =
    goldSwingTeamId === playerTeamId ? "your team" : "the enemy team";
  const teamTextType =
    goldSwingTeamId === playerTeamId ? "AllyTeamText" : "EnemyTeamText";

  let killOutputString = "";

  if (numKillsObj[goldSwingTeamId] !== 0) {
    if (numKillsObj[goldSwingTeamId] === 1) {
      killOutputString = `killed ${numKillsObj[goldSwingTeamId]} champion`;
    } else {
      killOutputString = `killed ${numKillsObj[goldSwingTeamId]} champions`;
    }
  }

  const numObjectivesObj = getObjectivesTakenByMinute(
    objectiveKillsArr,
    playerTeamObj
  );

  const objectivesTakenOutputString = createObjectivesTakenString(
    numObjectivesObj,
    goldSwingTeamId
  );

  const numBuildingKillsObj = getBuildingKillsByMinute(
    buildingKillsArr,
    playerTeamObj
  );

  const buildingKillsOutputString = createBuildingKillsOutputString(
    numBuildingKillsObj,
    goldSwingTeamId
  );

  const eventsSummary = formatStringsWithAnd([
    killOutputString,
    objectivesTakenOutputString,
    buildingKillsOutputString,
  ]);

  // mobile styling classes
  const turningPointSplashContentType = isMobile
    ? "TurningPointSplashContentMobile"
    : "TurningPointSplashContent";
  const turningPointSplashBodyType = isMobile
    ? "TurningPointSplashBodyMobile"
    : "TurningPointSplashBody";
  const turningPointSplashType = isMobile
    ? "TurningPointSplashMobile"
    : "TurningPointSplash";

  return (
    <div className="TurningPointSplashBackground" style={statsCardStyle}>
      <div className={turningPointSplashType}>
        <div className={turningPointSplashContentType}>
          <div className="TurningPointSplashTitle">
            Turning Point # {turningPointIndex + 1}
          </div>
          <div className={turningPointSplashBodyType}>
            {`At ${startingMinute} min, ${goldSwingWinTeam} `}
            <span className={teamTextType}>{eventsSummary}</span>
            {", jumping ahead "}
            <span className="TurningPointsGoldText">{`${getGoldStringFromGoldSwingData(
              goldSwingData
            )} gold.`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// gets champion name for player that killed most players on team that had the favorable gold swing
// if no players are found, or if champKillsArr is empty, pick a random player on goldSwingTeam
// TODO: Improve algorithm to take into account neutral objective kills and towers taken
function getChampionForMVPOnGoldSwingTeam(
  champKillsArr,
  playerTeamObj,
  goldSwingTeamId
) {
  const killerDict = {};

  for (let i = 0; i < champKillsArr.length; i++) {
    const killerId = champKillsArr[i].killerId;

    if (playerTeamObj.hasOwnProperty(killerId)) {
      if (playerTeamObj[killerId].teamId === goldSwingTeamId) {
        if (killerDict.hasOwnProperty(killerId)) {
          killerDict[killerId] += 1;
        } else {
          killerDict[killerId] = 0;
        }
      }
    }
  }

  const killerArr = [];

  if (Object.keys(killerDict).length > 0) {
    for (const killerId in killerDict) {
      killerArr.push([killerId, killerDict[killerId]]);
    }

    const mvpId = killerArr.sort(sortByValueDesc)[0][0];

    const mvpChampionId = playerTeamObj[mvpId].championId;

    return ChampKeys[mvpChampionId];

    function sortByValueDesc(a, b) {
      return b[1] - a[1];
    }
  } else {
    // DON'T DO RANDOM INT BECAUSE IT WILL CHANGE THE PLAYER ON PAGE UPDATE

    // player 1 and player 6 are lucky player random MVPS ¯\_(ツ)_/¯

    const mvpId = goldSwingTeamId === 100 ? 1 : 6;

    const mvpChampionId = playerTeamObj[mvpId].championId;

    return ChampKeys[mvpChampionId];
  }
}

// only supports strings with length 1-3
function formatStringsWithAnd(stringArr) {
  const filteredStringArr = stringArr.filter((string) => string.length > 0);

  // console.log(filteredStringArr);

  if (filteredStringArr.length === 1) {
    return filteredStringArr[0];
  } else if (filteredStringArr.length === 2) {
    return filteredStringArr[0] + " and " + filteredStringArr[1];
  } else if (filteredStringArr.length === 3) {
    return (
      filteredStringArr[0] +
      ", " +
      filteredStringArr[1] +
      ", and " +
      filteredStringArr[2]
    );
  }

  return "";
}

function createObjectivesTakenString(numObjectivesObj, killerTeamId) {
  const objectivesArr = [];

  if (numObjectivesObj[killerTeamId].total === 0) {
    return "";
  }

  if (numObjectivesObj[killerTeamId].RIFTHERALD === 1) {
    objectivesArr.push("Rift Herald");
  }

  if (numObjectivesObj[killerTeamId].DRAGON === 1) {
    objectivesArr.push("Dragon");
  }

  if (numObjectivesObj[killerTeamId].BARON_NASHOR === 1) {
    objectivesArr.push("Baron Nashor");
  }

  const outputString = "took " + formatStringsWithAnd(objectivesArr);

  return outputString;
}

function createBuildingKillsOutputString(numBuildingKillsObj, goldSwingTeamId) {
  let buildingKillsOutputString = "";

  const teamBuildingKillsObj = numBuildingKillsObj[goldSwingTeamId];

  if (
    teamBuildingKillsObj.TOWER_BUILDING !== 0 ||
    teamBuildingKillsObj.INHIBITOR_BUILDING !== 0
  ) {
    let towerOutputString;
    if (teamBuildingKillsObj.TOWER_BUILDING === 0) {
      towerOutputString = "";
    } else if (teamBuildingKillsObj.TOWER_BUILDING === 1) {
      towerOutputString = `${teamBuildingKillsObj.TOWER_BUILDING} tower`;
    } else {
      towerOutputString = `${teamBuildingKillsObj.TOWER_BUILDING} towers`;
    }

    let inhibitorOutputString;

    if (teamBuildingKillsObj.INHIBITOR_BUILDING === 0) {
      inhibitorOutputString = "";
    } else if (teamBuildingKillsObj.INHIBITOR_BUILDING === 1) {
      inhibitorOutputString = `${teamBuildingKillsObj.INHIBITOR_BUILDING} inhibitor`;
    } else {
      inhibitorOutputString = `${teamBuildingKillsObj.INHIBITOR_BUILDING} inhibitors`;
    }

    const gameObjectiveString = formatStringsWithAnd([
      towerOutputString,
      inhibitorOutputString,
    ]);

    buildingKillsOutputString = `destroyed ${gameObjectiveString}`;
  }

  return buildingKillsOutputString;
}

function getBuildingKillsByMinute(buildingKillsArr, playerTeamObj) {
  const numBuildingKillsObj = {
    100: {
      TOWER_BUILDING: 0,
      INHIBITOR_BUILDING: 0,
    },
    200: {
      TOWER_BUILDING: 0,
      INHIBITOR_BUILDING: 0,
    },
  };

  for (let i = 0; i < buildingKillsArr.length; i++) {
    const buildingKillObj = buildingKillsArr[i];

    const killerTeamId = buildingKillObj.teamId === 100 ? 200 : 100;

    numBuildingKillsObj[killerTeamId][buildingKillObj.buildingType] += 1;
  }

  return numBuildingKillsObj;
}

// processing objectiveKillsArr to get objectives killed by each team
// at the chosen minute
function getObjectivesTakenByMinute(objectiveKillsArr, playerTeamObj) {
  const numObjectivesObj = {
    100: {
      total: 0,
      RIFTHERALD: 0,
      DRAGON: 0,
      BARON_NASHOR: 0,
    },
    200: {
      total: 0,
      RIFTHERALD: 0,
      DRAGON: 0,
      BARON_NASHOR: 0,
    },
  };

  for (let i = 0; i < objectiveKillsArr.length; i++) {
    const objectiveKill = objectiveKillsArr[i];

    const killerId = objectiveKill.killerId;

    if (killerId !== 0) {
      const killerTeamId = playerTeamObj[killerId].teamId;

      if (numObjectivesObj.hasOwnProperty(killerTeamId)) {
        numObjectivesObj[killerTeamId].total += 1;
        numObjectivesObj[killerTeamId][objectiveKill.monsterType] += 1;
      }
    }
  }

  return numObjectivesObj;
}

function getNumKillsFromEachTeamByMinute(champKillsArr, playerTeamObj) {
  const numKillsObj = {
    100: 0,
    200: 0,
  };

  // console.log(champKillsArr);

  for (let i = 0; i < champKillsArr.length; i++) {
    const killerId = champKillsArr[i].killerId;

    if (playerTeamObj.hasOwnProperty(killerId)) {
      const killerTeamId = playerTeamObj[killerId].teamId;
      numKillsObj[killerTeamId] += 1;
    }
  }

  return numKillsObj;
}

function getGoldStringFromGoldSwingData(goldSwingData) {
  const goldNumString =
    Math.round(Math.abs(goldSwingData.goldDiffDelta) / 100) / 10 + "k";
  return goldNumString;
}

export default TurningPointSplash;
