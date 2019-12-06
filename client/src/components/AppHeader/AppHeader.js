import React from 'react';
import { Link } from 'react-router-dom';
import './AppHeader.css';

class AppHeader extends React.Component {
  render() {
    let statsLink = <></>;
    // let statsLink2 = <></>;
    if(this.props.showStats) {
      statsLink = <Link to="/stats">Stats</Link>;
      // statsLink2 = <Link to="/stats_indepth">More Stats</Link>;
    }

    return(
      <header className="App-header">
        <h1>League of Legends Stats App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {statsLink}
            </li>
            <li>
              {/* {statsLink2} */}
              <Link to="/stats_indepth">More Stats</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default AppHeader;
