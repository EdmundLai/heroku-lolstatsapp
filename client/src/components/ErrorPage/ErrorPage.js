import React from 'react';

const errorDict = {
  "400": "Bad Request",
  "401": "Unauthorized",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method not Allowed",
  "415": "Unsupported Media Type",
  "429": "Rate Limit Exceeded",
  "500": "League Server Error",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout"
}

class ErrorPage extends React.Component {
  render() {
    let errorMessage;

    if(this.props.code === 404) {
      if(this.props.errorLog.method === "getLOLAccountID") {
        errorMessage = "Summoner not found! Maybe try searching for a different username?";
      } else if(this.props.errorLog.method === "getMatchList") {
        errorMessage = "No games found for this queue type!";
      } else {
        errorMessage = `Error found in method: ${this.props.errorLog.method}`;
      }
      return(
        <>
          <p>{errorMessage}</p>
        </>
      );
    } else {
      if(errorDict.hasOwnProperty(this.props.code)) {
        errorMessage = errorDict[this.props.code];
      } else {
        errorMessage = "Unknown Error";
      }
      return(
        <>
          <p>Error: {this.props.code}</p>
          <p>{errorMessage}</p>
          <p>Please contact the developers of the site.</p>
        </>
      );
    }
    
  }
}

export default ErrorPage;