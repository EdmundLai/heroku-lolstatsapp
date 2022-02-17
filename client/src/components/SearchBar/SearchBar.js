import React from "react";
import RequestHandler from "../RequestHandler/RequestHandler";
import SearchIcon from "../../resources/search-icon.svg";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { Redirect, withRouter } from "react-router-dom";
import "./SearchBar.css";

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

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
  }

  handleChange(event) {
    let target = event.target;
    let value = target.value;

    this.setState({
      summName: value,
    });
  }

  handleWindowResize() {
    this.setState({
      windowWidth: window.innerWidth,
    });
  }

  handleSubmit(event) {
    // console.log(this.state);

    RequestHandler.handleRequest(this.state)
      .then((data) => {
        // console.log("inside then of handleSubmit");
        console.log(data);
        if (data.hasOwnProperty("summonerName")) {
          this.props.updateAppState(200, data);
        } else {
          this.props.updateAppState(data.responseCode, data);
        }
      })
      .catch((err) => {
        console.log("inside catch of handleSubmit");
        console.log(err);
      })
      .finally(() => {
        this.setState({
          loading: false,
          goToStats: true,
        });
      });

    this.setState({
      loading: true,
    });

    event.preventDefault();
  }

  render() {
    const inHeader = this.props.inHeader;
    const currentPathName = this.props.location.pathname;

    const isMobile = this.state.windowWidth < 500 ? true : false;

    const currentPageIsStats = currentPathName === "/stats";

    let SearchBarContent = <></>;

    let inputClassType = isMobile
      ? "SearchBarInput InputMobile"
      : "SearchBarInput";

    const IconSection = (
      <div className="SearchBarIconContainer">
        <img className="SearchIconMobile" src={SearchIcon} alt="Search Icon" />
      </div>
    );

    const SearchForm = (
      <form className="SearchForm" onSubmit={this.handleSubmit}>
        <input
          className={inputClassType}
          type="text"
          value={this.state.summName}
          onChange={this.handleChange}
          placeholder="Username..."
          required
        />
        <input className="SearchSubmit" type="submit" value="Go!" />
      </form>
    );

    if (this.state.loading) {
      SearchBarContent = <LoadingAnimation />;
    } else {
      const headerType = inHeader
        ? "SearchBarMobileHeader"
        : "SearchBarMobileNoHeader";

      const IconSectionMobile = isMobile && inHeader ? <></> : IconSection;

      const searchBarClassName = isMobile
        ? `SearchBarMobile ${headerType}`
        : "SearchBar";

      SearchBarContent = (
        <div className={searchBarClassName}>
          {IconSectionMobile}
          {SearchForm}
        </div>
      );
    }
    if (this.state.goToStats && !currentPageIsStats) {
      return <Redirect to="/stats" />;
    }
    return SearchBarContent;
  }
}

export default withRouter(SearchBar);
