import React from 'react';
import ChampKeys from '../../resources/ChampKeys';
import ImgHostURL from '../../resources/ImgHostUrl';
import TimeUtils from '../../utils/time';
import SwordIcon from '../../resources/sword.svg';
import './TimelineCard.css';

class TimelineCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currMin: 0
    }

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(event) {
    this.setState({
      currMin: event.target.value,
    });
  }

  render() {
    const currGameObj = this.props.currGameObj;
    const timelineData = currGameObj.timelineData;
    const gameStats = currGameObj.gameStats;
    const currPlayerId = currGameObj.playerStats.participantId;

    const timelineArr = convertFramesToTimelineObj(timelineData.frames);

    const playerTeamObj = convertParticipantArrToPlayerTeamObj(gameStats.participants);

    const currPlayerTeamId = playerTeamObj[currPlayerId].teamId;

    // console.log(timelineArr);
    // console.log("playerTeamData")
    // console.log(playerTeamObj);

    const currTimelineObj = timelineArr[this.state.currMin];
    const champKillsArr = currTimelineObj.CHAMPION_KILL;

    return(
      <div className="TimelineCard">
        <label className="MinuteSelector">
          Game Kills By Minute:  
          <select value={this.state.currMin} onChange={this.handleSelectChange}>
            {Array.from(timelineArr.keys()).map(currMinute => {
              return(
                <option key={currMinute} value={currMinute}>{currMinute}</option>
              );
            })}
          </select>
        </label>
        {champKillsArr.map(champKillObj => {
          // console.log(champKillObj);
          // let assistString = "";
          // if(champKillObj.assistingParticipantIds.length > 0) {
          //   assistString = `with the help of players with ids ${champKillObj.assistingParticipantIds}`;
          // }
          const killerChampId = playerTeamObj[champKillObj.killerId].championId;
          const victimChampId = playerTeamObj[champKillObj.victimId].championId;

          const timeStampString = TimeUtils.convertTimeStampToTimeString(champKillObj.timestamp);

          const killerImg = showChampImgFromChampId(killerChampId);
          const victimImg = showChampImgFromChampId(victimChampId); 

          const killerTeam = playerTeamObj[champKillObj.killerId].teamId === currPlayerTeamId ? "BlueTeamKill" : "RedTeamKill";
          
          return(
            // <div>
            //   {`Player with id ${champKillObj.killerId} killed player with id ${champKillObj.victimId} ${assistString}!`}
            // </div>
            <div key={timeStampString} className="KillCardContainer">
              <span className="TimestampLabel">{timeStampString} </span>
              <div className={`KillCard ${killerTeam}`}>
                {killerImg}
                <img className="SwordIcon" src={SwordIcon} alt="Sword Icon"/>
                {victimImg}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
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

function convertParticipantArrToPlayerTeamObj(participants) {

  const playerObjReduced = {}; 

  const convParticpantObj = function({participantId, teamId, championId}) {
    playerObjReduced[participantId] = {
      teamId,
      championId,
    };
  }

  for(let i = 0; i < participants.length; i++) {
    const participantData = participants[i];

    convParticpantObj(participantData);
  }

  return playerObjReduced;

  // return participants.map(({participantId, teamId, championId}) => {
  //   return {participantId, teamId, championId};
  // });
}

// pass in timelineData.frames as input
function convertFramesToTimelineObj(frames) {
  const timelineObj = frames.map((frameData) => {
    const frameObj = {
      CHAMPION_KILL: [],
      WARD_PLACED: [],
      WARD_KILL: [],
      BUILDING_KILL: [],
      ELITE_MONSTER_KILL: [],
      ITEM_PURCHASED: [],
      ITEM_SOLD: [],
      ITEM_DESTROYED: [],
      ITEM_UNDO: [],
      SKILL_LEVEL_UP: [],
    };

    const frameEvents = frameData.events;

    for(let i = 0; i < frameEvents.length; i++) {
      const frameEvent = frameEvents[i];
      if(frameObj.hasOwnProperty(frameEvent.type)) {
        frameObj[frameEvent.type].push(frameEvent);
      }
    }

    return frameObj;
  });

  return timelineObj;
}

export default TimelineCard;