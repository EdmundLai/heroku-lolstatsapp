import React from 'react';
import './AppFooter.css'

class AppFooter extends React.Component {
  render(){
    return(
      <footer className="App-footer">
        <div className="Legal-footnote">
          League of Legends Stats App isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends.
          League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. 
          League of Legends © Riot Games, Inc.
        </div>

        <div className="Creator-note">
        Built by Edmund Lai
        </div>
      </footer>
    );
  }
}

export default AppFooter;