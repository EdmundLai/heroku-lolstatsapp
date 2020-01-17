import React from 'react';
import StatsGraph from '../StatsGraph/StatsGraph';
import './GraphContainer.css';

class GraphContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "gold",
    }

    this.setTabToGold = this.setTabToGold.bind(this);
    this.setTabToExp = this.setTabToExp.bind(this);
  }

  setTabToGold(event) {
    if(this.state.activeTab !== "gold") {
      this.setState({
        activeTab: "gold"
      });
    }

    event.preventDefault();

  }

  setTabToExp(event) {
    if(this.state.activeTab !== "exp") {
      this.setState({
        activeTab: "exp"
      });
    }

    event.preventDefault();
  }

  render() {
    const GoldTabActive = this.state.activeTab === "gold" ? "ActiveTab" : "";
    const ExpTabActive = this.state.activeTab === "exp" ? "ActiveTab" : "";

    return(
      <div className="GraphContainer">
        <div className="TabList">
          <ul>
            <li>
              <a className={GoldTabActive} href="/#" onClick={this.setTabToGold}>Gold Graph</a>
            </li>
            <li>
              <a className={ExpTabActive} href="/#" onClick={this.setTabToExp}>Experience Graph</a>
            </li>
          </ul>
        </div>
        <StatsGraph statsObj={this.props.statsObj} type={this.state.activeTab}/>
      </div>
    );
  }
}

export default GraphContainer;