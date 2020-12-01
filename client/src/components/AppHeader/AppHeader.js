import React from "react";
import { withRouter, Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./AppHeader.css";

class AppHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
    };

    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
  }

  handleWindowResize() {
    this.setState({
      windowWidth: window.innerWidth,
    });
  }

  render() {
    const currentPathName = this.props.location.pathname;
    // console.log(currentPathName);

    let isMobile = this.state.windowWidth < 500 ? true : false;

    if (currentPathName === "/") {
      return (
        <header className="App-header header-home">
          <NavMenu />
        </header>
      );
    }

    const headerTitleClass = isMobile
      ? "HeaderTitle HeaderMobile"
      : "HeaderTitle";

    const headerId = isMobile ? "top" : "";

    return (
      <header className="App-header header-other">
        <div className="HeaderLeftSection">
          <h1 className={headerTitleClass} id={headerId}>
            <Link to="/">LolSA.gg</Link>
          </h1>
          <SearchBar updateAppState={this.props.updateAppState} inHeader />
        </div>
      </header>
    );
  }
}

function NavMenu() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default withRouter(AppHeader);
