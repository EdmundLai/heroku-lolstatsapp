var axios = require("axios");

const queueTypeDict = {
  normalBlind: 430,
  normalDraft: 400,
  rankedSolo: 420,
  rankedFlex: 440,
};

function handleRequest(reqObj) {
  const summNameAndTag = reqObj.summName;
  const summNameParts = summNameAndTag.split("#");

  let tagLine = "NA1";
  let summName = summNameAndTag;

  if (summNameParts.length !== 1) {
    summName = summNameParts[0];
    tagLine = summNameParts[1];
  }

  let statsArrayByQueue = [];
  let returnedStatsObj = {};

  return makeSummDataRequest(summName, tagLine).then((data) => {
    // handling summoner not found case
    if (data.hasOwnProperty("responseCode")) {
      return data;
    }

    const summonerLevel = data.summonerLevel;
    const profileIconId = data.profileIconId;
    const summonerName = data.name;

    returnedStatsObj = {
      summonerName,
      summonerLevel,
      profileIconId,
    };

    return makeStatsRequest(summName, tagLine, [queueTypeDict["rankedSolo"]])
      .then((data) => {
        statsArrayByQueue.push(data);
        return makeStatsRequest(summName, tagLine, [
          queueTypeDict["rankedFlex"],
        ]);
      })
      .then((data) => {
        statsArrayByQueue.push(data);
        return makeStatsRequest(summName, tagLine, [
          queueTypeDict["normalBlind"],
        ]);
      })
      .then((data) => {
        statsArrayByQueue.push(data);
        return makeStatsRequest(summName, tagLine, [
          queueTypeDict["normalDraft"],
        ]);
      })
      .then((data) => {
        statsArrayByQueue.push(data);

        returnedStatsObj.statsArrayByQueue = statsArrayByQueue;

        return returnedStatsObj;
      });
  });
}

// default number of games requested will be 5
function makeStatsRequest(playerTag, tagLine, gameTypeArr) {
  return axios
    .get("api/stats", {
      params: {
        summonerName: playerTag,
        tagLine: tagLine,
        gameTypes: gameTypeArr,
        numRequested: 5,
      },
    })
    .then((res) => {
      return res.data;
    });
}

function makeSummDataRequest(playerTag, tagLine) {
  return axios
    .get("api/getSummData", {
      params: {
        summonerName: playerTag,
        tagLine: tagLine,
      },
    })
    .then((res) => {
      return res.data;
    });
}

module.exports.handleRequest = handleRequest;
