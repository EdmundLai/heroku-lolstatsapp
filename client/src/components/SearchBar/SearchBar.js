import React from 'react';
import RequestHandler from '../RequestHandler/RequestHandler';
import SearchIcon from '../../resources/search-icon.svg';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import { Redirect, withRouter } from 'react-router-dom';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      summName: "",
      loading: false,
      goToStats: false,
      windowWidth: window.innerWidth,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.value;

    this.setState({
      summName: value
    });
  }

  handleWindowResize() {
    this.setState({
      windowWidth: window.innerWidth
    });
  }

  handleSubmit(event) {
    console.log(this.state);

    RequestHandler.handleRequest(this.state)
    .then(data => {
      // console.log(data);
      if(data.hasOwnProperty("summonerName")) {
        this.props.updateAppState(200, data);
      } else {
        this.props.updateAppState(data.responseCode, data);
      }
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      this.setState({
        loading: false,
        goToStats: true,
      });
    });

    this.setState({
      loading: true
    });

    event.preventDefault();
  }

  render() {
    const inHeader = this.props.inHeader;
    const currentPathName = this.props.location.pathname;

    let isMobile = this.state.windowWidth < 500 ? true : false;

    let currentPageIsStats = (currentPathName === "/stats");
    
    let SearchBarContent = <></>

    let loadingContent = <></>

    if(this.state.loading && !(isMobile && inHeader)) {
      loadingContent = <LoadingAnimation />;
    }

    if(this.state.loading && !inHeader) {
      SearchBarContent = loadingContent;
    } else {
      let headerType = inHeader ? "SearchBarMobileHeader" : "SearchBarMobileNoHeader";
      if(isMobile) {
        SearchBarContent = 
        <div className={`SearchBarMobile ${headerType}`}>
          <form className="SearchForm" onSubmit={this.handleSubmit}>
            <input className="SearchBarInput InputMobile" type="text" value={this.state.summName} onChange={this.handleChange} placeholder="Username..." required/>
            <input className="SearchSubmit" type="submit" value="Go!"/>
          </form> 
        </div>;
      } else {
        SearchBarContent = 
        <>
          <div className="SearchBar">
            <img className="SearchIcon" src={SearchIcon} alt="Search Icon"/>
            <form className="SearchForm" onSubmit={this.handleSubmit}>
              <input className="SearchBarInput" type="text" value={this.state.summName} onChange={this.handleChange} placeholder="Summoner name..." required/>
              <input className="SearchSubmit" type="submit" value="Go!"/>
            </form> 
          </div>
          {loadingContent}
        </>
      }
      
    }
    if(this.state.goToStats && !currentPageIsStats) {
      return (
        <Redirect to="/stats" />
      );
    }
    return (
      <>
        {SearchBarContent}
      </>
    );
  }
}

export default withRouter(SearchBar);