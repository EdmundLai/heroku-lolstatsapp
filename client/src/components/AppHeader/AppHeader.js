import React from 'react';
import { Link } from 'react-router-dom';
import './AppHeader.css';

class AppHeader extends React.Component {
  render() {
    let statsLink = <></>;
    if(this.props.showStats) {
      statsLink = <Link to="/stats">Stats</Link>;
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
          </ul>
        </nav>
      </header>
    );
  }
}

export default AppHeader;
