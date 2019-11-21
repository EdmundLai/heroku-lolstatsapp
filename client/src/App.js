import React from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import AppFooter from './components/AppFooter/AppFooter';
import HomeForm from './components/HomeForm/HomeForm';
import LeagueStats from './components/LeagueStats/LeagueStats';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      summName: "",
      queueType: "",
      currentStats: [],
      httpCode: 200
    };

    this.updateState = this.updateState.bind(this);
  }

  // changed to handle errors as well as valid data
  updateState(httpCode, statsObj) {
    if(httpCode === 200) {
      // console.log(statsObj);
      this.setState({
        summName: statsObj.summonerName,
        queueType: statsObj.queueType,
        currentStats: statsObj.statsArray,
        httpCode: 200
      });
    } else {
      // console.log(`httpCode from updateState: ${httpCode}`);
      this.setState({
        httpCode: httpCode
      });
    }
    
  }

  render() {
    return (
      <Router>
        <div className="App">
          <AppHeader />
          <div className="App-body">
            <Switch>
              <Route path="/stats" render={(props) => <LeagueStats {...props} dataState={this.state} />} />
              <Route path="/" render={(props) => <HomeForm {...props} callback={this.updateState} />} />
            </Switch>
  
          </div>
          <AppFooter />
        </div>
      </Router>
    );
  }
  
}

export default App;
