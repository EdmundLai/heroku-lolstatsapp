import React from "react";
import GamesTabSelector from "../GamesTabSelector/GamesTabSelector";
import OverviewCard from "../OverviewCard/OverviewCard";
import StatsCard from "../StatsCard/StatsCard";
import EndMessageCard from "../EndMessageCard/EndMessageCard";
import GraphContainer from "../GraphContainer/GraphContainer";
import GameAnalysisSection from "../GameAnalysisSection/GameAnalysisSection";
//import TipsCard from "../TipsCard/TipsCard";

// TipsCard is still in development

const QueueDict = {
  "430": "Normal Blind",
  "420": "Ranked Solo",
  "400": "Normal Draft",
  "440": "Ranked Flex",
};

class DynamicStatsContent extends React.Component {
  render() {
    const { statsObj, queueType, isMobile } = this.props;
    // console.log(statsObj);

    // handle error case first
    if (statsObj.responseCode === 404) {
      return <p>{`Go play some more ${QueueDict[queueType]} games!`}</p>;
    }

    // Page structure

    // GamesTabSelector - done
    // OverviewCard - done
    // MessageToPlayer
    // StatsCard - done
    // GraphCard - done
    // TurningPointsSection - done
    // TipsCard - In progress
    // EndMessageCard - done

    if (
      statsObj.hasOwnProperty("statsArray") &&
      statsObj.statsArray.length !== 0
    ) {
      const currGameObj = getCurrGameObj(statsObj, this.props.currGameID);

      // console.log(this.props.currGameID);

      // console.log(currGameObj);

      return (
        <>
          <GamesTabSelector
            statsObj={statsObj}
            handleTabChange={this.props.handleGameIDChange}
            currGameID={this.props.currGameID}
            isMobile={isMobile}
          />
          <OverviewCard currGameObj={currGameObj} isMobile={isMobile} />
          <StatsCard currGameObj={currGameObj} isMobile={isMobile} />
          <GraphContainer statsObj={currGameObj} isMobile={isMobile} />
          <GameAnalysisSection currGameObj={currGameObj} isMobile={isMobile} />
          {/* <TipsCard currGameObj={currGameObj} /> */}
          <EndMessageCard isMobile={isMobile} />
        </>
      );
    }

    return (
      <p>Something went wrong! Please contact the developers of the site.</p>
    );
  }
}

function getCurrGameObj(statsObj, currGameID) {
  for (let i = 0; i < statsObj.statsArray.length; i++) {
    const currGameObj = statsObj.statsArray[i];
    if (currGameObj.gameID === currGameID) {
      return currGameObj;
    }
  }
  // should never happen if statsObj is not undefined or null
  return null;
}

export default DynamicStatsContent;
