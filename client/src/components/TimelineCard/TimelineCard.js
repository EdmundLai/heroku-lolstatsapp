import React from "react";
import ChampKeys from "../../resources/ChampKeys";
import { OldImgHostURL, ImgHostURL } from "../../resources/ImgHostUrl";
import TimeUtil from "../../utils/time";
import DataUtil from "../../utils/data";
import SwordIcon from "../../resources/sword.svg";
import "./TimelineCard.css";

// shows kills and neutral objectives taken in the last minute with timestamps
class TimelineCard extends React.Component {
  render() {
    const { currGameObj, goldSwingData, isMobile } = this.props;
    const currPlayerId = currGameObj.playerStats.participantId;

    const playerTeamObj = DataUtil.getPlayerTeamObjFromCurrGameObj(currGameObj);

    const currPlayerTeamId = playerTeamObj[currPlayerId].teamId;

    const currTimelineObj = DataUtil.getTimelineObjFromGameObj(
      currGameObj,
      goldSwingData
    );
    const champKillsArr = currTimelineObj.CHAMPION_KILL;

    // console.log(timelineArr);
    // console.log("playerTeamData")
    // console.log(playerTeamObj);

    // FOR LATER USE
    const objectiveKillsArr = currTimelineObj.ELITE_MONSTER_KILL;
    // const buildingKillsArr = currTimelineObj.BUILDING_KILL;

    // console.log("objectiveKillsArr:");
    // console.log(objectiveKillsArr);

    // console.log("buildingKillsArr:");
    // console.log(buildingKillsArr);

    // for testing purposes
    // console.log(timelineArr);

    return (
      <div className="TimelineCard">
        <div className="TimelineCardTitle">THE EVENTS</div>
        {champKillsArr.map((champKillObj) => {
          const victimChampId = playerTeamObj[champKillObj.victimId].championId;
          const championKillCardContainerKey =
            champKillObj.timestamp * victimChampId;
          return (
            <ChampionKillCardContainer
              key={championKillCardContainerKey}
              champKillObj={champKillObj}
              playerTeamObj={playerTeamObj}
              currPlayerTeamId={currPlayerTeamId}
              isMobile={isMobile}
            />
          );
        })}
        {objectiveKillsArr.map((objectiveKillObj) => {
          return (
            <ObjectiveKillCardContainer
              key={objectiveKillObj.timestamp}
              objectiveKillObj={objectiveKillObj}
              playerTeamObj={playerTeamObj}
              currPlayerTeamId={currPlayerTeamId}
              isMobile={isMobile}
            />
          );
        })}
      </div>
    );
  }
}

// Rectangular card showing champion kill details
function ChampionKillCardContainer(props) {
  const { champKillObj, playerTeamObj, currPlayerTeamId, isMobile } = props;

  const timeStampString = TimeUtil.convertTimeStampToTimeString(
    champKillObj.timestamp
  );

  let killerChampId = 0;

  const killCardType = isMobile ? "KillCardMobile" : "KillCard";
  const championKillImgType = isMobile
    ? "ChampionKillImgMobile"
    : "ChampionKillImg";
  const swordIconType = isMobile ? "SwordIconMobile" : "SwordIcon";
  const timestampLabelType = isMobile
    ? "TimestampLabelMobile"
    : "TimestampLabel";

  let killerImg = (
    <img
      className={championKillImgType}
      src={`${OldImgHostURL}/turreticon/turret_icon.png`}
      alt="Turret"
    />
  );

  if (typeof playerTeamObj[champKillObj.killerId] !== "undefined") {
    killerChampId = playerTeamObj[champKillObj.killerId].championId;
    killerImg = showChampImgFromChampId(killerChampId, championKillImgType);
  }

  const victimChampId = playerTeamObj[champKillObj.victimId].championId;

  const victimImg = showChampImgFromChampId(victimChampId, championKillImgType);

  // calculated using opposite team of the victim in case the killer is not a champion
  const killerTeam =
    playerTeamObj[champKillObj.victimId].teamId === currPlayerTeamId
      ? "RedTeamKill"
      : "BlueTeamKill";

  return (
    <div className="ChampionKillCardContainer">
      <span className={timestampLabelType}>{timeStampString} </span>
      <div className={`${killCardType} ${killerTeam}`}>
        {killerImg}
        <img className={swordIconType} src={SwordIcon} alt="Sword Icon" />
        {victimImg}
      </div>
    </div>
  );
}

// Rectangular card showing neutral objective kill details
function ObjectiveKillCardContainer(props) {
  const { objectiveKillObj, playerTeamObj, currPlayerTeamId, isMobile } = props;

  const timeStampString = TimeUtil.convertTimeStampToTimeString(
    objectiveKillObj.timestamp
  );

  const killerId = objectiveKillObj.killerId;

  // neutral monster despawns or killed by neutral are not valid
  if (killerId === 0) {
    return <></>;
  }

  const killerTeam =
    playerTeamObj[killerId].teamId === currPlayerTeamId
      ? "BlueTeamKill"
      : "RedTeamKill";

  const timestampLabelType = isMobile
    ? "TimestampLabelMobile"
    : "TimestampLabel";
  const killCardType = isMobile ? "KillCardMobile" : "KillCard";
  const championKillImgType = isMobile
    ? "ChampionKillImgMobile"
    : "ChampionKillImg";
  const swordIconType = isMobile ? "SwordIconMobile" : "SwordIcon";

  const killerChampId = playerTeamObj[killerId].championId;
  const killerImg = showChampImgFromChampId(killerChampId, championKillImgType);

  const monsterType = objectiveKillObj.monsterType;

  // only applies when monsterType is equal to "DRAGON"
  // monsterSubType possible types:
  // AIR_DRAGON, EARTH_DRAGON, FIRE_DRAGON, WATER_DRAGON, ELDER_DRAGON
  const monsterSubType = objectiveKillObj.monsterSubType;

  let monsterImgName = "";

  if (monsterType === "RIFTHERALD") {
    monsterImgName = "Rift_Herald";
  } else if (monsterType === "BARON_NASHOR") {
    monsterImgName = "Baron_Nashor";
  } else if (monsterType === "DRAGON") {
    monsterImgName = "Dragon";
    if (monsterSubType === "AIR_DRAGON") {
      monsterImgName = "Cloud_Drake";
    } else if (monsterSubType === "EARTH_DRAGON") {
      monsterImgName = "Mountain_Drake";
    } else if (monsterSubType === "FIRE_DRAGON") {
      monsterImgName = "Infernal_Drake";
    } else if (monsterSubType === "WATER_DRAGON") {
      monsterImgName = "Ocean_Drake";
    } else if (monsterSubType === "ELDER_DRAGON") {
      monsterImgName = "Elder_Dragon";
    }
  }

  const objectiveImg = (
    <img
      className={championKillImgType}
      src={`${OldImgHostURL}/neutral-monsters/${monsterImgName}Square.png`}
      alt={monsterImgName}
    />
  );

  return (
    <div className="ObjectiveKillCardContainer">
      <span className={timestampLabelType}>{timeStampString} </span>
      <div className={`${killCardType} ${killerTeam}`}>
        {killerImg}
        <img className={swordIconType} src={SwordIcon} alt="Sword Icon" />
        {objectiveImg}
      </div>
    </div>
  );
}

function showChampImgFromChampId(championId, classType) {
  var champion = championId;

  if (ChampKeys.hasOwnProperty(championId)) {
    champion = ChampKeys[championId];
    return (
      <img
        className={classType}
        src={`${ImgHostURL}/champion/${champion}.png`}
        alt={champion}
      />
    );
  }

  // shows if the champion cannot be found in ChampKeys
  return <img className={classType} src="" alt={champion} />;
}

export default TimelineCard;
