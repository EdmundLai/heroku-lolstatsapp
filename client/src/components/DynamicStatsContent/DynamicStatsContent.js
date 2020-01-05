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

    if(statsObj.hasOwnProperty("queueType")) {
      return(
        <>
          <GamesTabSelector statsObj={statsObj}/>
          {/* {statsObj.statsArray.map(statsObj => 
            <InfoCard 
              key={statsObj.gameID}
              gameInfo={statsObj}
            />
          )} */}
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
            <GameTab key={gameData.gameID} championID={gameData.championID} gameTime={gameData.gameTime} />
          );
        })}
      </div>
    );
  }
}

class GameTab extends React.Component {
  render() {
    const championID = this.props.championID;
    const gameTime = this.props.gameTime;

    let champion = championID;

    if(ChampKeys.hasOwnProperty(championID)) {
      champion = ChampKeys[championID];
    }

    let champImg = <></>;

    if(typeof champion === "string") {
      champImg = <img className="TabImage" src={require(`../../resources/champion/${champion}.png`)} alt={champion} />;
    }

    return(
      <div className="GameTab">
        <div className="TabTime">{`${TimeUtil.getTimeAgo(gameTime)}`}</div>
        {champImg}
      </div>
    );
  }
}

export default DynamicStatsContent;