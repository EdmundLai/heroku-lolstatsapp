import React from 'react';
import ChampKeys from '../../resources/ChampKeys';
import ImgHostURL from '../../resources/ImgHostUrl';

import './StatsCard.css';

class StatsCard extends React.Component {
  render() {

    const currGameObj = this.props.currGameObj;
    const championID = currGameObj.championID;
    const stats = currGameObj.playerStats;

    let champion = championID;

    if(ChampKeys.hasOwnProperty(championID)) {
      champion = ChampKeys[championID];
    }
    
    const statsCardStyle = {
      backgroundImage: `url(${ImgHostURL}/splash/${champion}_0.jpg)`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    };

    return(
      <div className="StatsCardBackground" style={statsCardStyle}>
        <div className="StatsCard">
          <div className="StatsCardDetails">
            <div className="StatsDetailsHeading">
              YOUR STATS
            </div>
            <div className="StatsDetailsMain">
              <div className="DamageStats">
                <StatContainer heading="DAMAGE TO CHAMPIONS" value={stats.totalDamageDealtToChampions}/>
                <StatContainer heading="DAMAGE TO OBJECTIVES" value={stats.damageDealtToObjectives} />
              </div>
              <div className="UtilityStats">
                <StatContainer heading="VISION SCORE" value={stats.visionScore} />
                <StatContainer heading="CROWD CONTROL SCORE" value={stats.timeCCingOthers} />
              </div>
            </div>
            <div className="StatsDetailsGold">
              <div className="GoldSubheading">
                TOTAL GOLD EARNED
              </div>
              <div className="GoldStat">
                {stats.goldEarned}
              </div>
              <div className="GoldSubheading">
                CS PER MINUTE
              </div>
              <div className="GoldStat">
                {stats.csPerMin}
              </div>
            </div>
          </div>
        </div>
        </div>
    );
  }
}

function StatContainer(props) {
  return(
    <div className="StatContainer">
      <div className="StatSubheading">
        {props.heading}
      </div>
      <div className="StatValue">
        {props.value}
      </div>
    </div>
  );
}

export default StatsCard;