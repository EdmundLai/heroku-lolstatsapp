import React from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import AppFooter from './components/AppFooter/AppFooter';
import HomePage from './components/HomePage/HomePage';
import AboutPage from './components/AboutPage/AboutPage';
import LeagueStats from './components/LeagueStats/LeagueStats';
// import InDepthStats from './components/InDepthStats/InDepthStats';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import LoadingAnimation from './components/LoadingAnimation/LoadingAnimation';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      summName: "",
      statsArrayByQueue: [],
      httpCode: 200,
      errorLog: {},
      currGameID: 0
    };

    this.updateState = this.updateState.bind(this);
    this.handleGameIDChange = this.handleGameIDChange.bind(this);
  }

  // changed to handle errors as well as valid data
  updateState(httpCode, data) {
    console.log(data);
    if(httpCode === 200) {
      let statsObj = data;
      this.setState({
        summName: statsObj.summonerName,
        statsArrayByQueue: statsObj.statsArrayByQueue,
        summonerLevel: statsObj.summonerLevel,
        profileIconId: statsObj.profileIconId,
        httpCode: 200,
        currGameID: statsObj.statsArrayByQueue[0].statsArray[0].gameID,
      });
    } else {
      // console.log(`httpCode from updateState: ${httpCode}`);
      this.setState({
        httpCode: httpCode,
        errorLog: data
      });
    }
    
  }

  handleGameIDChange(gameID) {
    this.setState({
      currGameID: gameID
    });
  }


  render() {
    return (
      <Router>
        <div className="App">
          <AppHeader updateAppState={this.updateState} />
          <div className="App-body">
            <Switch>
              <Route path="/stats" render={(props) => <LeagueStats {...props} 
                dataState={this.state} 
                updateAppState={this.updateState}
                handleGameIDChange={this.handleGameIDChange}
              />} />
              <Route path="/about"><AboutPage/></Route>
              <Route exact path="/" render={(props) => <HomePage {...props} 
                updateAppState={this.updateState}
              />} />
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
