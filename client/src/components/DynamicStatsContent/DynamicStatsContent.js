import React from 'react';
import GamesTabSelector from '../GamesTabSelector/GamesTabSelector';
import OverviewCard from '../OverviewCard/OverviewCard';
import InfoCard from '../InfoCard/InfoCard';

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

    // console.log(currGameObj);

    // Page structure

    // GamesTabSelector - done
    // OverviewCard - done
    // MessageToPlayer
    // StatsCard
    // GraphCard
    // TurningPointsSection
    // TipsCard
    // GoodLuckMessage

    if(statsObj.hasOwnProperty("queueType") && currGameObj !== null) {
      return(
        <>
          <GamesTabSelector statsObj={statsObj} handleTabChange={this.props.handleTabChange} currGameID={this.props.currGameID}/>
          <OverviewCard currGameObj={currGameObj} />
          
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