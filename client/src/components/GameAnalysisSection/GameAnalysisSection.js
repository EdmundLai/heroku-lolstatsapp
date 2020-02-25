import React from 'react';
import TimelineCard from '../TimelineCard/TimelineCard';
import DataUtil from '../../utils/data';
import ImgHostURL from '../../resources/ImgHostUrl';
import ChampKeys from '../../resources/ChampKeys';

import './GameAnalysisSection.css';

function GameAnalysisSection(props) {
  const currGameObj = props.currGameObj;

  // console.log(currGameObj);

  const turningPoints = DataUtil.getTurningPoints(currGameObj);

  return(
    <div className="GameAnalysisSection">
      {/* Analysis Overview Card - TODO */}
      <TurningPointsSummaryCard currGameObj={currGameObj} numTurningPoints={turningPoints.length} />
      {turningPoints.map((goldSwingData, index) => {
        return(
          <div key={goldSwingData.startingMinute} className="GoldSwingData">
            <TurningPointSplash currGameObj={currGameObj} turningPointIndex={index} goldSwingData={goldSwingData} />
            <TimelineCard currGameObj={currGameObj} goldSwingData={goldSwingData} />
          </div>
        );
      })}
    </div>
  );
}

function TurningPointsSummaryCard(props) {
  const currGameObj = props.currGameObj;
  const numTurningPoints = props.numTurningPoints;

  const gameResult = currGameObj.playerStats.win ? "won" : "lost";
  const resultClass = currGameObj.playerStats.win ? "WinningTeamText" : "LosingTeamText";
  const conditionalText = currGameObj.playerStats.win ? "! There" : " but there";

  return(
    <div className="TurningPointsSummaryCard">
        <div className="TurningPointsSummary">
          You <span className={resultClass}>{gameResult}</span>{conditionalText} were <span className="TurningPointsText">{`${numTurningPoints} turning points.`}</span>
        </div>
    </div>
  );
}

function TurningPointSplash(props) {
  const { turningPointIndex, currGameObj, goldSwingData } = props;

  const currTimelineObj = DataUtil.getTimelineObjFromGameObj(currGameObj, goldSwingData);

  const playerTeamObj = DataUtil.getPlayerTeamObjFromCurrGameObj(currGameObj);

  const playerId = currGameObj.playerStats.participantId;

  const playerTeamId = playerTeamObj[playerId].teamId;

  // console.log("playerTeamId:");
  // console.log(playerTeamId);
  
  const startingMinute = goldSwingData.startingMinute;

  const champKillsArr = currTimelineObj.CHAMPION_KILL;
  const objectiveKillsArr = currTimelineObj.ELITE_MONSTER_KILL;
  // const buildingKillsArr = currTimelineObj.BUILDING_KILL;

  const goldSwingTeamId = goldSwingData.goldDiffDelta > 0 ? 100 : 200;

  // console.log(champKillsArr);
  // console.log(objectiveKillsArr);
  // console.log(buildingKillsArr);

  const numKillsObj = getNumKillsFromEachTeamByMinute(champKillsArr, playerTeamObj);

  // console.log(numKillsObj);

  const champion = getChampionForMVPOnGoldSwingTeam(champKillsArr, playerTeamObj, goldSwingTeamId);

  const statsCardStyle = {
    backgroundImage: `url(${ImgHostURL}/splash/${champion}_0.jpg)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  // team that had the favorable gold swing
  const goldSwingWinTeam = goldSwingTeamId === playerTeamId ? "your team" : "the enemy team";
  const teamTextType = goldSwingTeamId === playerTeamId ? "AllyTeamText" : "EnemyTeamText";

  const killOutputString = `killed ${numKillsObj[goldSwingTeamId]} champions`;

  const numObjectivesObj = getObjectivesTakenByMinute(objectiveKillsArr, playerTeamObj);

  const objectivesTakenOutputString = createObjectivesTakenString(numObjectivesObj, goldSwingTeamId);

  const eventsSummary = formatStringsWithAnd([killOutputString, objectivesTakenOutputString]);

  return(
    <div className="TurningPointSplashBackground" style={statsCardStyle}>
      <div className="TurningPointSplash">
        <div className="TurningPointSplashContent">
          <div className="TurningPointSplashTitle">
            Turning Point # {turningPointIndex + 1}
          </div>
          <div className="TurningPointSplashBody">
            {`At ${startingMinute} min, ${goldSwingWinTeam} `} 
            <span className={teamTextType}>{eventsSummary}</span>
            {", jumping ahead "} 
            <span className="TurningPointsText">{`${getGoldStringFromGoldSwingData(goldSwingData)} gold.`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// gets champion name for player that killed most players on team that had the favorable gold swing
// if no players are found, or if champKillsArr is empty, pick a random player on goldSwingTeam
function getChampionForMVPOnGoldSwingTeam(champKillsArr, playerTeamObj, goldSwingTeamId) {
  const killerDict = {};

  for(let i = 0; i < champKillsArr.length; i++) {
    const killerId = champKillsArr[i].killerId;

    if(playerTeamObj[killerId].teamId === goldSwingTeamId) {
      if(killerDict.hasOwnProperty(killerId)) {
        killerDict[killerId] += 1;
      } else {
        killerDict[killerId] = 0;
      }
    }
  }

  const killerArr = [];

  if(Object.keys(killerDict).length > 0) {
    for(const killerId in killerDict) {
      killerArr.push([killerId, killerDict[killerId]])
    }

    const mvpId = killerArr.sort(sortByValueDesc)[0][0];

    const mvpChampionId = playerTeamObj[mvpId].championId;

    return ChampKeys[mvpChampionId];

    function sortByValueDesc(a, b) {
      return b[1] - a[1];
    }
  }

  function getRandomIntInclusive(min, max) {
    const roundedMin = Math.ceil(min);
    const roundedMax = Math.floor(max);
    return Math.floor(Math.random() * (roundedMax - roundedMin + 1));
  }

  const mvpId = goldSwingTeamId === 100 ? getRandomIntInclusive(1, 5) : getRandomIntInclusive(6, 10);

  const mvpChampionId = playerTeamObj[mvpId].championId;

  return ChampKeys[mvpChampionId];
}

// only supports strings with length 1-3
function formatStringsWithAnd(stringArr) {
  const filteredStringArr = stringArr.filter(string => string.length > 0);

  // console.log(filteredStringArr);

  if(filteredStringArr.length === 1) {
    return filteredStringArr[0];
  } else if(filteredStringArr.length === 2) {
    return filteredStringArr[0] + " and " + filteredStringArr[1];
  } else if(filteredStringArr.length === 3) {
    return filteredStringArr[0] + ", " + filteredStringArr[1] + ", and " + filteredStringArr[2];
  }

  return "";
}

function createObjectivesTakenString(numObjectivesObj, killerTeamId) {
  const objectivesArr = [];

  if(numObjectivesObj[killerTeamId].total === 0) {
    return "";
  }

  if(numObjectivesObj[killerTeamId].RIFTHERALD === 1) {
    objectivesArr.push("Rift Herald");
  }

  if(numObjectivesObj[killerTeamId].DRAGON === 1) {
    objectivesArr.push("Dragon");
  }

  if(numObjectivesObj[killerTeamId].BARON_NASHOR === 1) {
    objectivesArr.push("Baron Nashor");
  };

  const outputString = "took " + formatStringsWithAnd(objectivesArr);

  return outputString;
}

// processing objectiveKillsArr to get objectives killed by each team
// at the chosen minute
function getObjectivesTakenByMinute(objectiveKillsArr, playerTeamObj) {
  const numObjectivesObj = {
    100: {
      total: 0,
      RIFTHERALD: 0,
      DRAGON: 0,
      BARON_NASHOR: 0
    },
    200: {
      total: 0,
      RIFTHERALD: 0,
      DRAGON: 0,
      BARON_NASHOR: 0
    },
  }

  for(let i = 0; i < objectiveKillsArr.length; i++) {
    const objectiveKill = objectiveKillsArr[i];

    const killerTeamId = playerTeamObj[objectiveKill.killerId].teamId;

    if(numObjectivesObj.hasOwnProperty(killerTeamId)) {
      numObjectivesObj[killerTeamId].total += 1;
      numObjectivesObj[killerTeamId][objectiveKill.monsterType] += 1;
    }
  }

  return numObjectivesObj;

}

function getNumKillsFromEachTeamByMinute(champKillsArr, playerTeamObj) {
  const numKillsObj = {
    100: 0,
    200: 0,
  };

  for(let i = 0; i < champKillsArr.length; i++) {
    const killerId = champKillsArr[i].killerId;


    const killerTeamId = playerTeamObj[killerId].teamId;

    if(numKillsObj.hasOwnProperty(killerTeamId)) {
      numKillsObj[killerTeamId] += 1;
    }
  }

  return numKillsObj;
}

function getGoldStringFromGoldSwingData(goldSwingData) {
  const goldNumString = (Math.round(Math.abs(goldSwingData.goldDiffDelta) / 100) / 10) + "k";
  return goldNumString;
}


export default GameAnalysisSection;