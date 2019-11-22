import React from 'react';
import { Redirect } from 'react-router-dom';
import RequestHandler from '../RequestHandler/RequestHandler';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import './HomeForm.css';

class HomeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      summName: "",
      queueType: "normalBlind",
      goToStats: false,
      statsLoading: false
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
      if(isNaN(data)) {
        this.props.callback(200, data);
      } else {
        this.props.callback(data);
      }
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      this.setState({
        statsLoading: false,
        goToStats: true
      });
    });

    this.setState({
      statsLoading: true
    });

    event.preventDefault();
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
                  value="normalBlind"
                  onChange={this.handleChange}
                  defaultChecked
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
                  value="rankedSolo"
                  onChange={this.handleChange}
                  />
                  Ranked Solo/Duo
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
          </div>
  
          <input id="DataSubmitButton" type="submit" value="Submit" />
        </form>
      );
    }
    
  }
}

export default HomeForm;
