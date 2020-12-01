import React from "react";
import ChampKeys from "../../resources/ChampKeys";
import StatsBox from "../StatsBox/StatsBox";
import ChampionBar from "../ChampionBar/ChampionBar";
import TimeBox from "../TimeBox/TimeBox";
import GraphContainer from "../GraphContainer/GraphContainer";

import "./InfoCard.css";

class InfoCard extends React.Component {
  render() {
    let statsObj = this.props.currGameObj;
    let stats = statsObj.playerStats;
    // console.log(statsObj);

    let champion = statsObj.championID;

    if (ChampKeys.hasOwnProperty(statsObj.championID)) {
      champion = ChampKeys[statsObj.championID];
    }
    // console.log(champion);
    const isMobile = this.props.isMobile;

    if (isMobile) {
      return (
        <div className="InfoBarMobile">
          <ChampionBar champion={champion} />

          <TimeBox statsObj={statsObj} />

          <StatsBox stats={stats} isMobile={isMobile} />
        </div>
      );
    } else {
      return (
        <div className="InfoCard">
          <div className="InfoBar">
            <ChampionBar champion={champion} />

            <TimeBox statsObj={statsObj} />

            <StatsBox stats={stats} />
          </div>

          <GraphContainer statsObj={statsObj} />
        </div>
      );
    }
  }
}

export default InfoCard;
