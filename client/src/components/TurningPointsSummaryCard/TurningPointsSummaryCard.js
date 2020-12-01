import React from "react";
import "./TurningPointsSummaryCard.css";

function TurningPointsSummaryCard(props) {
  const { currGameObj, numTurningPoints, isMobile } = props;

  const gameResult = currGameObj.playerStats.win ? "won" : "lost";
  const resultClass = currGameObj.playerStats.win
    ? "WinningTeamText"
    : "LosingTeamText";
  const conditionalText = currGameObj.playerStats.win
    ? "! There"
    : " but there";

  const turningPointsSummaryType = isMobile
    ? "TurningPointsSummaryMobile"
    : "TurningPointsSummary";

  return (
    <div className="TurningPointsSummaryCard">
      <div className={turningPointsSummaryType}>
        You <span className={resultClass}>{gameResult}</span>
        {conditionalText} were{" "}
        <span className="TurningPointsSummaryText">{`${numTurningPoints} turning points.`}</span>
      </div>
    </div>
  );
}

export default TurningPointsSummaryCard;
