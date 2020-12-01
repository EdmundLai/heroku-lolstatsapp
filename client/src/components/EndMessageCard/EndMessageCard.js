import React from "react";
import "./EndMessageCard.css";

function EndMessageCard(props) {
  const isMobile = props.isMobile;

  const endMessageCardType = isMobile
    ? "EndMessageCardMobile"
    : "EndMessageCard";
  const encouragementMessageType = isMobile
    ? "EncouragementMessageMobile"
    : "EncouragementMessage";
  const redirectTopType = isMobile ? "RedirectTopMobile" : "RedirectTop";

  return (
    <div className={endMessageCardType}>
      <div className={encouragementMessageType}>
        Good luck on your next game!
      </div>
      <div className={redirectTopType}>
        <a href="#top">BACK TO TOP</a>
      </div>
    </div>
  );
}

export default EndMessageCard;
