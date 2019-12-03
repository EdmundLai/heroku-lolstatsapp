import React from 'react';
import ChampKeys from '../../resources/ChampKeys';
import StatsGraph from '../StatsGraph/StatsGraph';
import StatsBox from '../StatsBox/StatsBox';
import ChampionBar from '../ChampionBar/ChampionBar';
import TimeBox from '../TimeBox/TimeBox';
import './InfoCard.css';

class InfoCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "gold",
      windowWidth: window.innerWidth
    }

    this.setTabToGold = this.setTabToGold.bind(this);
    this.setTabToExp = this.setTabToExp.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize() {
    this.setState({
      windowWidth: window.innerWidth
    });
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

  render(){
    let statsObj = this.props.gameInfo;
    let stats = statsObj.gameStats;
    // console.log(statsObj);

    let champion = ChampKeys[statsObj.championID];
    let isMobile = this.state.windowWidth < 900 ? true : false;
    
    if(isMobile) {
      return (
        <div className="InfoBarMobile">
          <ChampionBar champion={champion} />

          <TimeBox statsObj={statsObj} />

          <StatsBox stats={stats} isMobile={isMobile} />
        </div>
      );

    } else {
      return(
        <div className="InfoCard">
          <div className="InfoBar">
            <ChampionBar champion={champion} />

            <TimeBox statsObj={statsObj} />

            <StatsBox stats={stats} />

          </div>
  
          <div className="GraphContainer">
            <div className="TabList">
              <ul>
                <li>
                  <a href="/#" onClick={this.setTabToGold}>Gold Graph</a>
                </li>
                <li>
                  <a href="/#" onClick={this.setTabToExp}>Experience Graph</a>
                </li>
              </ul>
            </div>
            <StatsGraph statsObj={statsObj} type={this.state.activeTab}/>
          </div>

        </div>
      );
    }
    
  };
}

export default InfoCard;