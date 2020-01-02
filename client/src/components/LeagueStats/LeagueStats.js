import React from 'react';
import GamesPage from '../GamesPage/GamesPage';
import ErrorPage from '../ErrorPage/ErrorPage';
// import { withRouter } from 'react-router-dom';
// import SearchBar from '../SearchBar/SearchBar';
// import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

import './LeagueStats.css';

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
      <div className="LeagueStats">
        {/* <SearchBar updateAppState={this.props.updateAppState} loadingCallback={this.toggleStatsLoading} goToStatsCallback={this.goToStats}/> */}
        {StatsContent}
      </div>
    );
  }
}

export default LeagueStats;