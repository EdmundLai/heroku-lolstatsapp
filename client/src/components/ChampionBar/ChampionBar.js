import React from "react";
import { ImgHostURL } from "../../resources/ImgHostUrl";
import "./ChampionBar.css";

class ChampionBar extends React.Component {
  render() {
    let champion = this.props.champion;
    // console.log(champion);
    let champName = champion;
    let champImg = <></>;
    if (typeof champion === "string") {
      champName = champion.match(/[A-Z][a-z]+/g).join(" ");
      champImg = (
        <img
          id="ChampionImg"
          src={`${ImgHostURL}/champion/${champion}.png`}
          alt={champion}
        />
      );
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
