import React from 'react';
import GamesPage from '../GamesPage/GamesPage';
import ErrorPage from '../ErrorPage/ErrorPage';
// import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

class LeagueStats extends React.Component {
  render() {
    let dataState = this.props.dataState;
    let responseCode = dataState.httpCode;
    let StatsContent = <></>;

    if(responseCode === 200) {
      StatsContent = <GamesPage dataState={dataState} />
    } else {
      StatsContent = <ErrorPage code={responseCode} errorLog={dataState.errorLog} />
    }

    return(
      <>
        {StatsContent}
      </>
    );
  }
}

export default LeagueStats;