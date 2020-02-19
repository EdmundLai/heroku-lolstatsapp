import React from 'react';
import DataUtil from '../../utils/data';

function GameAnalysisSection(props) {
  const currGameObj = props.currGameObj;

  const goldSwings = DataUtil.getGoldSwings(currGameObj);

  const top3GoldSwings = DataUtil.getTopNGoldSwings(goldSwings, 3);

  return(
    <div className="GameAnalysisSection">
      {top3GoldSwings.map(goldSwingData => {
        return(
          <div key={goldSwingData.endingMinute} className="GoldSwingData">
            {`Gold change of ${goldSwingData.goldDiffDelta} in minute ${goldSwingData.startingMinute}`}
          </div>
        );
      })}
    </div>
  );
}

export default GameAnalysisSection;