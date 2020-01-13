import React from 'react';
import './EndMessageCard.css';

function EndMessageCard(props) {
  const isMobile = props.isMobile;

  let endMessageCardType = "EndMessageCard";
  let encouragementMessageType = "EncouragementMessage";
  let redirectTopType = "RedirectTop";

  if(isMobile) {
    endMessageCardType = "EndMessageCardMobile";
    encouragementMessageType = "EncouragementMessageMobile";
    redirectTopType = "RedirectTopMobile";
  }

  return(
    <div className={endMessageCardType}>
      <div className={encouragementMessageType}>
        Good luck on your next game!
      </div>
      <div className={redirectTopType}>
        <a href="#top">
          BACK TO TOP
        </a>
      </div>
    </div>
  );
}

export default EndMessageCard;