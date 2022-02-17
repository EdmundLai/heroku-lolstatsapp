import React from "react";
import AppHeader from "./components/AppHeader/AppHeader";
import AppFooter from "./components/AppFooter/AppFooter";
import HomePage from "./components/HomePage/HomePage";
import AboutPage from "./components/AboutPage/AboutPage";
import LeagueStats from "./components/LeagueStats/LeagueStats";
// import InDepthStats from './components/InDepthStats/InDepthStats';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import LoadingAnimation from './components/LoadingAnimation/LoadingAnimation';

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      summName: "",
      statsArrayByQueue: [],
      httpCode: 200,
      errorLog: {},
      currGameID: 0,
      queueType: "420",
    };

    this.updateState = this.updateState.bind(this);
    this.handleGameIDChange = this.handleGameIDChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  // changed to handle errors as well as valid data
  updateState(httpCode, data) {
    // console.log(data);
    if (httpCode === 200) {
      let statsObj = data;
      let newGameID = null;

      // handling case where RequestMaker cannot get data from default queue type
      if (
        typeof statsObj.statsArrayByQueue[0].statsArray !== "undefined" ||
        typeof statsObj.statsArrayByQueue[0].statsArray[0] !== "undefined"
      ) {
        newGameID = statsObj.statsArrayByQueue[0].statsArray[0].gameID;
      }
      this.setState({
        summName: statsObj.summonerName,
        statsArrayByQueue: statsObj.statsArrayByQueue,
        summonerLevel: statsObj.summonerLevel,
        profileIconId: statsObj.profileIconId,
        httpCode: 200,
        currGameID: newGameID,
        queueType: "420",
      });
    } else {
      // console.log(`httpCode from updateState: ${httpCode}`);
      this.setState({
        httpCode: httpCode,
        errorLog: data,
      });
    }
  }

  handleSelectChange(event) {
    // maps queue type (for example, 420) to index in queueStatsArray
    const queueTypeDict = {
      420: 0,
      440: 1,
      430: 2,
      400: 3,
    };

    const queueIndex = queueTypeDict[event.target.value];
    this.setState({
      queueType: event.target.value,
    });

    const statsArray = this.state.statsArrayByQueue[queueIndex].statsArray;

    if (typeof statsArray !== "undefined") {
      const queueDefaultGameID =
        this.state.statsArrayByQueue[queueIndex].statsArray[0].gameID;

      this.handleGameIDChange(queueDefaultGameID);
    }
  }

  handleGameIDChange(gameID) {
    this.setState({
      currGameID: gameID,
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <AppHeader updateAppState={this.updateState} />
          <div className="App-body">
            <Switch>
              <Route
                path="/stats"
                render={(props) => (
                  <LeagueStats
                    {...props}
                    dataState={this.state}
                    updateAppState={this.updateState}
                    handleGameIDChange={this.handleGameIDChange}
                    handleSelectChange={this.handleSelectChange}
                  />
                )}
              />
              <Route path="/about">
                <AboutPage />
              </Route>
              <Route
                exact
                path="/"
                render={(props) => (
                  <HomePage {...props} updateAppState={this.updateState} />
                )}
              />
              {/* <Route path="/stats_indepth" render={(props) => <InDepthStats {...props} dataState={this.state} />} /> */}
            </Switch>
          </div>
          <AppFooter />
        </div>
      </Router>
    );
  }
}

export default App;
