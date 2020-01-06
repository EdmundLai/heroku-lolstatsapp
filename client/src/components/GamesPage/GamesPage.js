import React from 'react';
import DynamicStatsContent from '../DynamicStatsContent/DynamicStatsContent';
import './GamesPage.css';

// maps queue type (for example, 420) to index in queueStatsArray
const queueTypeDict = {
  420: 0,
  440: 1,
  430: 2,
  400: 3
};

class GamesPage extends React.Component {
  constructor(props) {
    super(props);

    let currID = 0;
    if(this.props.dataState.statsArrayByQueue.length !== 0) {
      currID = this.props.dataState.statsArrayByQueue[0].statsArray[0].gameID;
    }

    this.state = {
      queueType: "420",
      currGameID: currID,
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleSelectChange(event) {
    const queueIndex = queueTypeDict[event.target.value];
    this.setState({
      queueType: event.target.value,
      currGameID: this.props.dataState.statsArrayByQueue[queueIndex].statsArray[0].gameID,
    });
  }

  handleTabChange(gameID) {

    this.setState({
      currGameID: gameID
    });
  }

  render() {
    const dataState = this.props.dataState;
    const queueStatsArray = dataState.statsArrayByQueue;

    if(queueStatsArray.length === 0) {
      return <></>;
    }

    const statsObj = queueStatsArray[queueTypeDict[this.state.queueType]];

    return(
      <div className="GamesPage">
        <SummonerTopBar dataState={dataState} />
        <SelectSection queueType={this.state.queueType} handleSelectChange={this.handleSelectChange} />
        <DynamicStatsContent 
        queueType={this.state.queueType} 
        statsObj={statsObj} 
        handleTabChange={this.handleTabChange}
        currGameID={this.state.currGameID}
        />
      </div>
    );
  }
}

function SelectSection(props) {
  return(
    <div className="SelectSection">
      <div className="SelectDescription">Queue Type: </div>
      <select value={props.queueType} onChange={props.handleSelectChange}>
        <option value="420">Ranked Solo</option>
        <option value="440">Ranked Flex</option>
        <option value="430">Normal Blind</option>
        <option value="400">Normal Draft</option>
      </select>
    </div>
  );
}

function SummonerTopBar(props) {
  const dataState = props.dataState;

  return(
    <div className="SummonerTopBar">
      <img className="ProfileIconImg" src={require(`../../resources/profileicon/${dataState.profileIconId}.png`)} alt="Profile Icon" />
      <div className="SummonerText">
        <div className="SummonerSubHeading">{`LEVEL ${dataState.summonerLevel}`}</div>
        <div className="SummonerHeading">{dataState.summName}</div>
      </div>
    </div>
  );
}

export default GamesPage;