import React from 'react';
import './ChampionBar.css';

class ChampionBar extends React.Component {
  render() {
    let champion = this.props.champion;
    // console.log(champion);
    let champName = champion;
    let champImg = <></>;
    if(typeof champion === "string") {
      champName = champion.match(/[A-Z][a-z]+/g).join(" ");
      champImg = <img id="ChampionImg" src={require(`../../resources/champion/${champion}.png`)} alt={champion}></img>;
    }

    return (
      <div className="ChampionBar">
        <p id="ChampionName">{champName}</p>
        {champImg}
      </div>
    );
  }
}

export default ChampionBar;