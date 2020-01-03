import React from 'react';
import InfoCard from '../InfoCard/InfoCard';

const QueueDict = {
  "430": "Normal Blind",
  "420": "Ranked Solo",
  "400": "Normal Draft",
  "440": "Ranked Flex"
};

class GamesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      queueType: "420"
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(event) {
    this.setState({
      queueType: event.target.value
    });
  }

  render() {
    const dataState = this.props.dataState;
    const queueStatsArray = dataState.statsArrayByQueue;

    if(queueStatsArray.length === 0) {
      return <></>;
    }

    // maps queue type (for example, 420) to index in queueStatsArray
    let queueTypeDict = {
      420: 0,
      440: 1,
      430: 2,
      400: 3
    };

    const currGameStats = queueStatsArray[queueTypeDict[this.state.queueType]];

    function DynamicStatsContent(props) {
      console.log(props.dataState);
      const queueType = props.queueType;

      if(currGameStats.hasOwnProperty("queueType")) {
        return(
          <>
            <p>{QueueDict[currGameStats.queueType]}</p>
            {currGameStats.statsArray.map(statsObj => 
              <InfoCard 
                key={statsObj.gameID}
                gameInfo={statsObj}
              />
            )}
          </>
        );
      }
      if(props.currGameStats.responseCode === 404) {
        return(
          <p>{`Go play some more ${QueueDict[queueType]} games!`}</p>
        );
      }
      return(
        <p>Something went wrong! Please contact the developers of the site.</p>
      );
    } 

    return(
      <div className="GamesPage">
        <h2>{dataState.summName}</h2>
        <select value={this.state.queueType} onChange={this.handleSelectChange}>
          <option value="420">Ranked Solo Queue</option>
          <option value="440">Ranked Flex Queue</option>
          <option value="430">Normal Blind Pick</option>
          <option value="400">Normal Draft Pick</option>
        </select>
        <DynamicStatsContent queueType={this.state.queueType} currGameStats={currGameStats} />
      </div>
    );
  }
}

export default GamesPage;