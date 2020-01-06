import React from 'react';
import InfoCard from '../InfoCard/InfoCard';
import TimeUtil from '../../utils/time';
import ChampKeys from '../../resources/ChampKeys';
import './DynamicStatsContent.css';

const QueueDict = {
  "430": "Normal Blind",
  "420": "Ranked Solo",
  "400": "Normal Draft",
  "440": "Ranked Flex"
};

class DynamicStatsContent extends React.Component {
  render() {
    const statsObj = this.props.statsObj;
    const queueType = this.props.queueType;
    // console.log(statsObj);

    const currGameObj = getCurrGameObj(statsObj, this.props.currGameID);

    // Page structure

    // GamesTabSelector
    // OverviewCard
    // MessageToPlayer
    // StatsCard
    // GraphCard
    // TurningPointsSection
    // TipsCard
    // GoodLuckMessage

    if(statsObj.hasOwnProperty("queueType")) {
      return(
        <>
          <GamesTabSelector statsObj={statsObj} handleTabChange={this.props.handleTabChange} currGameID={this.props.currGameID}/>
          
          {/* <InfoCard gameInfo={currGameObj} /> */}
        </>
      );
    }
    if(statsObj.responseCode === 404) {
      return(
        <p>{`Go play some more ${QueueDict[queueType]} games!`}</p>
      );
    }
    return(
      <p>Something went wrong! Please contact the developers of the site.</p>
    );
  }
} 

class GamesTabSelector extends React.Component {
  render() {
    const statsObj = this.props.statsObj;

    return(
      <div className="GamesTabSelector">
        {statsObj.statsArray.map(gameData => {
          return(
            <GameTab 
              key={gameData.gameID} 
              gameID={gameData.gameID} 
              championID={gameData.championID} 
              gameTime={gameData.gameTime}
              handleTabChange={this.props.handleTabChange}
              currGameID={this.props.currGameID} 
            />
          );
        })}
      </div>
    );
  }
}

class GameTab extends React.Component {
  constructor(props) {
    super(props);

    this.handleTabSelected = this.handleTabSelected.bind(this);
  }

  handleTabSelected() {
    this.props.handleTabChange(this.props.gameID);
  }

  render() {
    const championID = this.props.championID;
    const gameTime = this.props.gameTime;

    const tabSelected = this.props.currGameID === this.props.gameID ? "CurrentTab" : "";

    let champion = championID;

    if(ChampKeys.hasOwnProperty(championID)) {
      champion = ChampKeys[championID];
    }

    let champImg = <></>;

    if(typeof champion === "string") {
      champImg = <img className="TabImage" src={require(`../../resources/champion/${champion}.png`)} alt={champion} />;
    }

    return(
      <div className={`GameTab ${tabSelected}`} onClick={this.handleTabSelected}>
        <div className="TabTime">{`${TimeUtil.getTimeAgo(gameTime)}`}</div>
        {champImg}
      </div>
    );
  }
}

function getCurrGameObj(statsObj, currGameID) {
  for(let i = 0; i < statsObj.statsArray.length; i++) {
    const currGameObj = statsObj.statsArray[i];
    if(currGameObj.gameID === currGameID) {
      return currGameObj;
    }
  }
  // should never happen if statsObj is not undefined or null
  return null;
}

export default DynamicStatsContent;