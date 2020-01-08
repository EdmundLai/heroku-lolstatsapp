var axios = require('axios');

const queueTypeDict = {
  normalBlind: 430,
  normalDraft: 400,
  rankedSolo: 420,
  rankedFlex: 440
}

function handleRequest(reqObj) {
  let summName = reqObj.summName;

  let statsArrayByQueue = [];
  let returnedStatsObj = {};

  return makeSummDataRequest(summName)
  .then(data => {

    // handling summoner not found case
    if(data.hasOwnProperty("responseCode")) {
      return data;
    }

    const summonerLevel = data.summonerLevel;
    const profileIconId = data.profileIconId;
    const summName = statsArrayByQueue[0].summonerName;

    returnedStatsObj = {
      summonerName: summName,
      summonerLevel,
      profileIconId
    };

    return makeStatsRequest(summName, [queueTypeDict["rankedSolo"]])
    .then(data => {
      statsArrayByQueue.push(data);
      return makeStatsRequest(summName, [queueTypeDict["rankedFlex"]]);
    })
    .then(data => {
      statsArrayByQueue.push(data);
      return makeStatsRequest(summName, [queueTypeDict["normalBlind"]]);
    })
    .then(data => {
      statsArrayByQueue.push(data);
      return makeStatsRequest(summName, [queueTypeDict["normalDraft"]]);
    })
    .then(data => {
      statsArrayByQueue.push(data);

      returnedStatsObj.statsArrayByQueue = statsArrayByQueue;

      return returnedStatsObj;
    });
  });
}

// default number of games requested will be 5
function makeStatsRequest(playerTag, gameTypeArr) {
  return axios.get('api/stats', {
      params: {
        summonerName: playerTag,
        gameTypes: gameTypeArr,
        numRequested: 5
      }
  })
  .then(res => {
    return res.data;
  });
}

function makeSummDataRequest(playerTag) {
  return axios.get('api/getSummData', {
    params: {
      summonerName: playerTag
    }
  })
  .then(res => {
    return res.data;
  });
}

module.exports.handleRequest = handleRequest;