import React from "react";
import GamesPage from "../GamesPage/GamesPage";
import ErrorPage from "../ErrorPage/ErrorPage";
// import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

class LeagueStats extends React.Component {
  render() {
    const dataState = this.props.dataState;
    const currGameID = dataState.currGameID;
    const responseCode = dataState.httpCode;
    let StatsContent = <></>;

    if (responseCode === 200) {
      StatsContent = (
        <GamesPage
          dataState={dataState}
          currGameID={currGameID}
          handleGameIDChange={this.props.handleGameIDChange}
          handleSelectChange={this.props.handleSelectChange}
        />
      );
    } else {
      StatsContent = (
        <ErrorPage code={responseCode} errorLog={dataState.errorLog} />
      );
    }

    return <>{StatsContent}</>;
  }
}

export default LeagueStats;
