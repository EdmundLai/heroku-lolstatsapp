import React from 'react';
import ChampKeys from '../../resources/ChampKeys';
import StatsGraph from '../StatsGraph/StatsGraph';
import './InfoCard.css';

class InfoCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "gold"
    }

    this.setTabToGold = this.setTabToGold.bind(this);
    this.setTabToExp = this.setTabToExp.bind(this);
  }

  setTabToGold(event) {
    this.setState({
      activeTab: "gold"
    });

    event.preventDefault();

  }

  setTabToExp(event) {
    this.setState({
      activeTab: "exp"
    });

    event.preventDefault();
  }

  render(){
    let statsObj = this.props.gameInfo;
    let stats = statsObj.gameStats;
    // console.log(statsObj);

    let champion = ChampKeys[statsObj.championID];
    return(
      <div className="InfoCard">
        <div className="InfoBar">
          <div className="ChampionBar">
            <p id="ChampionName">{champion}</p>
            <img id="ChampionImg" src={require(`../../resources/champion/${champion}.png`)} alt={champion}></img>
          </div>
          
          <div className="StatsContainer">
            <div className="StatsBox">
              <ul>
                <div className="StatsHeader">Game Info</div>
                <li>
                  {stats.win ? "Victory" : "Defeat"}
                </li>
                <li>
                  KDA: {stats.kills}/{stats.deaths}/{stats.assists}
                </li>
              </ul>
              <ul>
                <div className="StatsHeader">Gold Stats</div>
                <li>
                  CS/min: {stats.csPerMin}
                </li>
                <li>
                  Gold/min: {stats.goldPerMin}
                </li>
                <li>
                  Total Gold: {stats.goldEarned}
                </li>
              </ul>
              <ul>
                <div className="StatsHeader">Damage Stats</div>
                <li>
                  Total Damage: {stats.totalDamageDealt}
                </li>
                <li>
                  Champion Damage: {stats.totalDamageDealtToChampions}
                </li>
              </ul>

              <ul>
                <div className="StatsHeader">Vision Stats</div>
                <li>
                  Vision Score: {stats.visionScore}
                </li>
              </ul>
            </div>
            
          </div>
        </div>

        <div className="GraphContainer">
          <div className="TabList">
            <ul>
              <li>
                <a href="/#" onClick={this.setTabToGold}>Gold Graph</a>
              </li>
              <li>
                <a href="/#" onClick={this.setTabToExp}>Experience Graph</a>
              </li>
            </ul>
          </div>
          <StatsGraph statsObj={statsObj} type={this.state.activeTab}/>
        </div>
        

      </div>
    );
  };
}

export default InfoCard;