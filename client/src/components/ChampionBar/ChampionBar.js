import React from 'react';
import './ChampionBar.css';

class ChampionBar extends React.Component {
  render() {
    let champion = this.props.champion;
    return (
      <div className="ChampionBar">
        <p id="ChampionName">{champion}</p>
        <img id="ChampionImg" src={require(`../../resources/champion/${champion}.png`)} alt={champion}></img>
      </div>
    );
  }
}

export default ChampionBar;