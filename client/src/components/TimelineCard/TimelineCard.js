import React from 'react';

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

    const timelineArr = convertFramesToTimelineObj(timelineData.frames);

    const playerTeamArr = convertParticipantArrToPlayerTeamObj(gameStats.participants);

    // console.log(timelineArr);
    // console.log(playerTeamArr);

    const currTimelineObj = timelineArr[this.state.currMin];
    const champKillsArr = currTimelineObj.CHAMPION_KILL;

    return(
      <div className="TimelineCard">
        <select value={this.state.currMin} onChange={this.handleSelectChange}>
          {Array.from(timelineArr.keys()).map(currMinute => {
            return(
              <option key={currMinute} value={currMinute}>{currMinute}</option>
            );
          })}
        </select>
        {champKillsArr.map(champKillObj => {
          let assistString = "";
          if(champKillObj.assistingParticipantIds.length > 0) {
            assistString = `with the help of players with ids ${champKillObj.assistingParticipantIds}`;
          }
          return(
            <div>
              {`Player with id ${champKillObj.killerId} killed player with id ${champKillObj.victimId} ${assistString}!`}
            </div>
          );
        })}
      </div>
    );
  }
}

function convertParticipantArrToPlayerTeamObj(participants) {
  return participants.map(({participantId, teamId, championId}) => {
    return {participantId, teamId, championId};
  });
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