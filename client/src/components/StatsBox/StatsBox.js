import React from "react";
import "./StatsBox.css";

class StatsBox extends React.Component {
  render() {
    let stats = this.props.stats;
    let isMobile = this.props.isMobile;

    if (isMobile) {
      return (
        <div className="StatsBoxMobile">
          <GeneralStats stats={stats} />
          <GoldStats stats={stats} />
          <DamageStats stats={stats} />
          <VisionStats stats={stats} />
        </div>
      );
    } else {
      return (
        <div className="StatsBox">
          <GeneralStats stats={stats} />
          <GoldStats stats={stats} />
          <DamageStats stats={stats} />
          <VisionStats stats={stats} />
        </div>
      );
    }
  }
}

class GeneralStats extends React.Component {
  render() {
    let stats = this.props.stats;
    return (
      <ul className="GeneralStats">
        <div className="StatsHeader">Game Info</div>
        <li>{stats.win ? "Victory" : "Defeat"}</li>
        <li>
          KDA: {stats.kills}/{stats.deaths}/{stats.assists}
        </li>
      </ul>
    );
  }
}

class GoldStats extends React.Component {
  render() {
    let stats = this.props.stats;
    return (
      <ul className="GoldStats">
        <div className="StatsHeader">Gold Stats</div>
        <li>CS/min: {stats.csPerMin}</li>
        <li>Gold/min: {stats.goldPerMin}</li>
        <li>Total Gold: {stats.goldEarned}</li>
      </ul>
    );
  }
}

class DamageStats extends React.Component {
  render() {
    let stats = this.props.stats;
    return (
      <ul className="DamageStats">
        <div className="StatsHeader">Damage Stats</div>
        <li>Total Damage: {stats.totalDamageDealt}</li>
        <li>Champion Damage: {stats.totalDamageDealtToChampions}</li>
      </ul>
    );
  }
}

class VisionStats extends React.Component {
  render() {
    let stats = this.props.stats;
    return (
      <ul className="VisionStats">
        <div className="StatsHeader">Vision Stats</div>
        <li>Vision Score: {stats.visionScore}</li>
      </ul>
    );
  }
}

export default StatsBox;
