import React from 'react';
import DataAnalysisPage from '../DataAnalysisPage/DataAnalysisPage';
import ErrorPage from '../ErrorPage/ErrorPage';

class InDepthStats extends React.Component {
  render() {
    let dataState = this.props.dataState;
    let responseCode = dataState.httpCode;
    let StatsContent = <></>;

    if(responseCode === 200) {
      StatsContent = <DataAnalysisPage dataState={dataState}/>
    } else {
      StatsContent = <ErrorPage code={responseCode} errorLog={dataState.errorLog} />
    }

    return(
      <div className="InDepthStats">
        {StatsContent}
      </div>
    );
  }
}



export default InDepthStats;