import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./HomePage.css";

class HomePage extends React.Component {
  render() {
    return (
      <div className="HomePage">
        <h1>LoLSA.gg</h1>
        <SearchBar updateAppState={this.props.updateAppState} />
      </div>
    );
  }
}

export default HomePage;
