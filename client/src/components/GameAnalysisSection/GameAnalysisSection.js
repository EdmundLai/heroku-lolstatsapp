import React from "react";
import TimelineCard from "../TimelineCard/TimelineCard";
import TurningPointsSummaryCard from "../TurningPointsSummaryCard/TurningPointsSummaryCard";
import TurningPointSplash from "../TurningPointsSplash/TurningPointsSplash";
import KillContributorsCard from "../KillContributorsCard/KillContributorsCard";
import DataUtil from "../../utils/data";

import "./GameAnalysisSection.css";

function GameAnalysisSection(props) {
  const { currGameObj, isMobile } = props;

  // console.log(currGameObj);

  const turningPoints = DataUtil.getTurningPoints(currGameObj);

  return (
    <div className="GameAnalysisSection">
      <TurningPointsSummaryCard
        currGameObj={currGameObj}
        numTurningPoints={turningPoints.length}
        isMobile={isMobile}
      />
      {turningPoints.map((goldSwingData, index) => {
        return (
          <GoldSwingData
            key={goldSwingData.startingMinute}
            currGameObj={currGameObj}
            goldSwingData={goldSwingData}
            index={index}
            isMobile={isMobile}
          />
        );
      })}
    </div>
  );
}

function GoldSwingData(props) {
  const { currGameObj, isMobile, index, goldSwingData } = props;

  return (
    <div className="GoldSwingData">
      <TurningPointSplash
        currGameObj={currGameObj}
        turningPointIndex={index}
        goldSwingData={goldSwingData}
        isMobile={isMobile}
      />
      <TimelineCard
        currGameObj={currGameObj}
        goldSwingData={goldSwingData}
        isMobile={isMobile}
      />
      <KillContributorsCard
        currGameObj={currGameObj}
        goldSwingData={goldSwingData}
        isMobile={isMobile}
      />
    </div>
  );
}

export default GameAnalysisSection;
