import React from 'react';
import { Redirect } from 'react-router-dom';
import RequestHandler from '../RequestHandler/RequestHandler';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import './HomePage.css';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      goToStats: false,
      statsLoading: false
    };

    this.goToStats = this.goToStats.bind(this);
    this.toggleStatsLoading = this.toggleStatsLoading.bind(this);

  }

  goToStats() {
    this.setState({
      goToStats: true
    });
  }

  toggleStatsLoading() {
    const loadingStatus = this.state.statsLoading;
    this.setState({
      statsLoading: !loadingStatus
    });
  }

  render() {
    if(this.state.goToStats) {
      return(
        <Redirect to="/stats" />
      );
    } else if(this.state.statsLoading) {
      return(
        <LoadingAnimation />
      );
    } else {
      return (
        <div className="HomePage">
          <SummNameForm callback={this.props.callback} loadingCallback={this.toggleStatsLoading} goToStatsCallback={this.goToStats}/>

          {/* <SearchBar /> */}
          
          {/* <div className="FormHint">
            <p>
              Don't have a summoner name? Try using the name <b>TitaniumGod</b> to see what the app does!
            </p>
          </div> */}
        </div>
      );
    }
    
  }
}

class SummNameForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      summName: "",
      queueType: "rankedSolo",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    console.log(this.state);

    RequestHandler.handleRequest(this.state)
    .then(data => {
      if(data.hasOwnProperty("summonerName")) {
        this.props.callback(200, data);
      } else {
        this.props.callback(data.responseCode, data);
      }
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      this.props.loadingCallback();
      this.props.goToStatsCallback();
    });

    this.props.loadingCallback();

    event.preventDefault();
  }

  render() {
    return(
      <form className="HomeForm" onSubmit={this.handleSubmit}>
        <div className="InputBoxes">
          <label id="NameBox">
            <div id="NameLabel">Summoner Name:</div>
            <input
            type="text"
            name="summName"
            value={this.state.summName}
            onChange={this.handleChange}
            required
            />
          </label>

          <div className="queue-selector">
            <div className="queue-selector-title">
              Queue Type:
            </div>
            
            <div className="queueOptions">
              <label>
                <input
                type="radio"
                name="queueType"
                value="rankedSolo"
                onChange={this.handleChange}
                defaultChecked
                />
                Ranked Solo/Duo
              </label>

              <label>
                <input
                type="radio"
                name="queueType"
                value="normalBlind"
                onChange={this.handleChange}
                />
                Normal Blind Pick
              </label>

              <label>
                <input
                type="radio"
                name="queueType"
                value="normalDraft"
                onChange={this.handleChange}
                />
                Normal Draft Pick
              </label>

              <label>
                <input
                type="radio"
                name="queueType"
                value="rankedFlex"
                onChange={this.handleChange}
                />
                Ranked Flex Pick
              </label>
            </div>
            
          </div>

          <input id="DataSubmitButton" type="submit" value="Submit" />
        </div>
        
      </form>
    );
  }
}

// class SearchBar extends React.Component {

//   render() {
//     return (
//       <div className="SearchBar">

//       </div>
//     );
//   }
// }

export default HomePage;
