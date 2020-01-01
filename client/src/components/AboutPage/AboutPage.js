import React from 'react';
import './AboutPage.css';

class AboutPage extends React.Component {
  render() {
    return(
      <div className="AboutPage">
        <div className="AboutDescription">
          <p>LOL Stats Analysis was built by Edmund Lai and Josh Yao to address the need for impartial, statistics-based post game analysis of League of Legends games.</p>
          <p>We felt that there was more that could be done with the publicly available data provided by Riot Games through their API, and wanted to create a tool to help players improve their game.</p>
          <p>We hope that it can help players learn from both their wins and losses and become better with every game they play!</p>
        </div>
      </div>
    );
  }
}

export default AboutPage;