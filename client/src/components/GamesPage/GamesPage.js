import React from 'react';
import DynamicStatsContent from '../DynamicStatsContent/DynamicStatsContent';
import './GamesPage.css';

class GamesPage extends React.Component {
  render() {
    // maps queue type (for example, 420) to index in queueStatsArray
    const queueTypeDict = {
      420: 0,
      440: 1,
      430: 2,
      400: 3
    };

    const dataState = this.props.dataState;
    const queueStatsArray = dataState.statsArrayByQueue;

    if(queueStatsArray.length === 0) {
      return <></>;
    }

    const statsObj = queueStatsArray[queueTypeDict[dataState.queueType]];

    return(
      <div className="GamesPage">
        <SummonerTopBar dataState={dataState} />
        <SelectSection queueType={dataState.queueType} handleSelectChange={this.props.handleSelectChange} />
        <DynamicStatsContent 
        queueType={dataState.queueType} 
        statsObj={statsObj} 
        handleGameIDChange={this.props.handleGameIDChange}
        currGameID={this.props.currGameID}
        />
        <EndMessageCard />
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

function EndMessageCard(props) {
  return(
    <div className="EndMessageCard">
      <div className="EncouragementMessage">
        Good luck on your next game!
      </div>
      <div className="RedirectTop">
        <a href="#top">
          BACK TO TOP
        </a>
      </div>
    </div>
  );
}

export default GamesPage;