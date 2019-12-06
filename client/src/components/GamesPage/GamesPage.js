import React from 'react';
import InfoCard from '../InfoCard/InfoCard';

const QueueDict = {
  "430": "Normal Blind Pick",
  "420": "Ranked Solo Queue",
  "400": "Normal Draft Pick",
  "440": "Ranked Flex Queue"
};

class GamesPage extends React.Component {
  render() {
    let dataState = this.props.dataState;
    return(
      <>
        <h2>{dataState.summName}</h2>
        <p>{QueueDict[dataState.queueType]}</p>
        {dataState.currentStats.map(statsObj => 
          <InfoCard 
          key={statsObj.gameID}
          gameInfo={statsObj}
          />
        )}
      </>
    );
  }
}

export default GamesPage;