import React from 'react';
import ChampKeys from '../../resources/ChampKeys';
import ImgHostURL from '../../resources/ImgHostUrl';
import TimeUtil from '../../utils/time';
import DataUtil from '../../utils/data';
import SwordIcon from '../../resources/sword.svg';
import './TimelineCard.css';

// FOUND BUG: Minute Selected option value in dropdown menu does not reset to
// default value of 0 when game selected is changed or queue type is changed.
// STATUS: TimelineCard reworked without dropdown menu which was causing the issue
class TimelineCard extends React.Component {
  render() {
    const { currGameObj, goldSwingData } = this.props;
    const currPlayerId = currGameObj.playerStats.participantId;

    const playerTeamObj = DataUtil.getPlayerTeamObjFromCurrGameObj(currGameObj);

    const currPlayerTeamId = playerTeamObj[currPlayerId].teamId;

    const currTimelineObj = DataUtil.getTimelineObjFromGameObj(currGameObj, goldSwingData);
    const champKillsArr = currTimelineObj.CHAMPION_KILL;

    // console.log(timelineArr);
    // console.log("playerTeamData")
    // console.log(playerTeamObj);

    // FOR LATER USE
    // const objectiveKillsArr = currTimelineObj.ELITE_MONSTER_KILL;
    // const buildingKillsArr = currTimelineObj.BUILDING_KILL;

    // console.log("objectiveKillsArr:");
    // console.log(objectiveKillsArr);

    // console.log("buildingKillsArr:");
    // console.log(buildingKillsArr);

    // for testing purposes
    // console.log(timelineArr);

    return(
      <div className="TimelineCard">
        <div className="TimelineCardTitle">THE EVENTS</div>
        {champKillsArr.map(champKillObj => {
          const victimChampId = playerTeamObj[champKillObj.victimId].championId;
          const killCardContainerKey = champKillObj.timestamp * victimChampId;
          return(
            <KillCardContainer 
            key={killCardContainerKey} 
            champKillObj={champKillObj} 
            playerTeamObj={playerTeamObj}
            currPlayerTeamId={currPlayerTeamId} 
            />
          );
        })}
      </div>
    );
  }
}

function KillCardContainer(props) {
  const champKillObj = props.champKillObj;
  const playerTeamObj = props.playerTeamObj;
  const currPlayerTeamId = props.currPlayerTeamId;

  const timeStampString = TimeUtil.convertTimeStampToTimeString(champKillObj.timestamp);

  // BUG TO BE FIXED - if player suicides into nexus or tower it breaks the site because
  // playerTeamObj[champKillObj.killerId] ends up being undefined. killerId in this situation
  // is 0 (seen so far)
  // BUG HAS BEEN FIXED
  let killerChampId = 0;
  let killerImg = <img className="ChampionKillImg" src={`${ImgHostURL}/turreticon/turret_icon.png`} alt="Turret" />;

  if(typeof playerTeamObj[champKillObj.killerId] !== 'undefined') {
    killerChampId = playerTeamObj[champKillObj.killerId].championId;
    killerImg = showChampImgFromChampId(killerChampId);
  }
  
  const victimChampId = playerTeamObj[champKillObj.victimId].championId;
  
  const victimImg = showChampImgFromChampId(victimChampId);

  // calculated using opposite team of the victim in case the killer is not a champion
  const killerTeam = playerTeamObj[champKillObj.victimId].teamId === currPlayerTeamId ? "RedTeamKill" : "BlueTeamKill";
  
  return(
    <div className="KillCardContainer">
      <span className="TimestampLabel">{timeStampString} </span>
      <div className={`KillCard ${killerTeam}`}>
        {killerImg}
        <img className="SwordIcon" src={SwordIcon} alt="Sword Icon"/>
        {victimImg}
      </div>
    </div>
  );
}

function showChampImgFromChampId(championId) {
  var champion = championId;

  if(ChampKeys.hasOwnProperty(championId)) {
    champion = ChampKeys[championId];
    return <img className="ChampionKillImg" src={`${ImgHostURL}/champion/${champion}.png`} alt={champion} />;
  }

  // shows if the champion cannot be found in ChampKeys
  return <img className="ChampionKillImg" src="" alt={champion} />;
}

export default TimelineCard;