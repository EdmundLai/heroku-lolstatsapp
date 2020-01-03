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
    let firstGameStats = this.props.dataState.statsArrayByQueue[0];
    // console.log(firstGameStats);
    if(typeof firstGameStats  === "undefined") {
      return <></>;
    }

    if(!Array.isArray(firstGameStats.statsArray)) {
      console.log("statsArray is not an array!");
      return <></>;
    }
    return(
      <>
        <h2>{dataState.summName}</h2>
        <p>{QueueDict[firstGameStats.queueType]}</p>
        {firstGameStats.statsArray.map(statsObj => 
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