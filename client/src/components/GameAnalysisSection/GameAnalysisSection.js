import React from 'react';
import TimelineCard from '../TimelineCard/TimelineCard';
import DataUtil from '../../utils/data';

function GameAnalysisSection(props) {
  const currGameObj = props.currGameObj;

  const turningPoints = DataUtil.getTurningPoints(currGameObj);

  return(
    <div className="GameAnalysisSection">
      {/* Analysis Overview Card - TODO */}
      {turningPoints.map(goldSwingData => {
        return(
          <div key={goldSwingData.startingMinute} className="GoldSwingData">
            {`Gold change of ${goldSwingData.goldDiffDelta} in minute ${goldSwingData.startingMinute}`}
            <TimelineCard currGameObj={currGameObj} endingMin={goldSwingData.startingMinute + 1} />
          </div>
        );
      })}
    </div>
  );
}

export default GameAnalysisSection;