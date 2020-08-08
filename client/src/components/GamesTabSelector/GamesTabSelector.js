import React from "react";
import TimeUtil from "../../utils/time";
import ChampKeys from "../../resources/ChampKeys";
import { ImgHostURL } from "../../resources/ImgHostUrl";
import "./GamesTabSelector.css";

class GamesTabSelector extends React.Component {
  render() {
    const statsObj = this.props.statsObj;
    const isMobile = this.props.isMobile;

    return (
      <div className="GamesTabSelector">
        {statsObj.statsArray.map((gameData) => {
          return (
            <GameTab
              key={gameData.gameID}
              gameID={gameData.gameID}
              championID={gameData.championID}
              gameTime={gameData.gameTime}
              handleTabChange={this.props.handleTabChange}
              currGameID={this.props.currGameID}
              isMobile={isMobile}
            />
          );
        })}
      </div>
    );
  }
}

class GameTab extends React.Component {
  constructor(props) {
    super(props);

    this.handleTabSelected = this.handleTabSelected.bind(this);
  }

  handleTabSelected() {
    this.props.handleTabChange(this.props.gameID);
  }

  render() {
    const championID = this.props.championID;
    const gameTime = this.props.gameTime;
    const isMobile = this.props.isMobile;

    const tabSelected =
      this.props.currGameID === this.props.gameID ? "CurrentTab" : "NormalTab";

    let champion = championID;

    if (ChampKeys.hasOwnProperty(championID)) {
      champion = ChampKeys[championID];
    }

    let champImg = <></>;

    let tabType = "GameTab";
    let tabImageType = "TabImage";
    let tabTimeType = "TabTime";

    if (isMobile) {
      tabType = "GameTabMobile";
      tabImageType = "TabImageMobile";
      tabTimeType = "TabTimeMobile";
    }

    if (typeof champion === "string") {
      champImg = (
        <img
          className={tabImageType}
          src={`${ImgHostURL}/champion/${champion}.png`}
          alt={champion}
        />
      );
    }

    return (
      <div
        className={`${tabType} ${tabSelected}`}
        onClick={this.handleTabSelected}
      >
        <div className={tabTimeType}>{`${TimeUtil.getTimeAgo(gameTime)}`}</div>
        {champImg}
      </div>
    );
  }
}

export default GamesTabSelector;
