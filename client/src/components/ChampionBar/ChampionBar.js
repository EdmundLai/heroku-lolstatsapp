import React from 'react';
import './ChampionBar.css';

class ChampionBar extends React.Component {
  render() {
    let champion = this.props.champion;
    let champName = champion.match(/[A-Z][a-z]+/g).join(" ");

    return (
      <div className="ChampionBar">
        <p id="ChampionName">{champName}</p>
        <img id="ChampionImg" src={require(`../../resources/champion/${champion}.png`)} alt={champion}></img>
      </div>
    );
  }
}

export default ChampionBar;