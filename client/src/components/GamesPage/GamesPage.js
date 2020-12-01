import React from "react";
import DynamicStatsContent from "../DynamicStatsContent/DynamicStatsContent";
import { ImgHostURL } from "../../resources/ImgHostUrl";

import "./GamesPage.css";

class GamesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
    };

    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
  }

  handleWindowResize() {
    this.setState({
      windowWidth: window.innerWidth,
    });
  }

  render() {
    // maps queue type (for example, 420) to index in queueStatsArray
    const queueTypeDict = {
      420: 0,
      440: 1,
      430: 2,
      400: 3,
    };

    const dataState = this.props.dataState;
    const queueStatsArray = dataState.statsArrayByQueue;

    if (queueStatsArray.length === 0) {
      return <></>;
    }

    const statsObj = queueStatsArray[queueTypeDict[dataState.queueType]];

    let isMobile = this.state.windowWidth < 1100 ? true : false;

    return (
      <div className="GamesPage">
        <SummonerTopBar dataState={dataState} isMobile={isMobile} />
        <SelectSection
          queueType={dataState.queueType}
          handleSelectChange={this.props.handleSelectChange}
          isMobile={isMobile}
        />
        <DynamicStatsContent
          queueType={dataState.queueType}
          statsObj={statsObj}
          handleGameIDChange={this.props.handleGameIDChange}
          currGameID={this.props.currGameID}
          isMobile={isMobile}
        />
      </div>
    );
  }
}

function SelectSection(props) {
  const isMobile = props.isMobile;

  let selectSectionType = "SelectSection";

  if (isMobile) {
    selectSectionType = "SelectSectionMobile";
  }

  return (
    <div className={selectSectionType}>
      <div className="SelectDescription">Queue Type: </div>
      <select value={props.queueType} onChange={props.handleSelectChange}>
        <option value="420">Ranked Solo</option>
        <option value="440">Ranked Flex</option>
        <option value="430">Normal Blind</option>
        <option value="400">Normal Draft</option>
      </select>
    </div>
  );
}

function SummonerTopBar(props) {
  const dataState = props.dataState;
  const isMobile = props.isMobile;

  if (isMobile) {
    return (
      <div className="SummonerTopBar">
        <div className="SummonerText">
          <div className="SummonerSubHeading">{`LEVEL ${dataState.summonerLevel}`}</div>
          <div className="SummonerHeading">{dataState.summName}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="SummonerTopBar">
      <img
        className="ProfileIconImg"
        src={`${ImgHostURL}/profileicon/${dataState.profileIconId}.png`}
        alt="Profile Icon"
      />
      <div className="SummonerText">
        <div className="SummonerSubHeading">{`LEVEL ${dataState.summonerLevel}`}</div>
        <div className="SummonerHeading">{dataState.summName}</div>
      </div>
    </div>
  );
}

export default GamesPage;
