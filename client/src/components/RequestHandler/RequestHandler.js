var axios = require('axios');

const queueTypeDict = {
  normalBlind: 430,
  normalDraft: 400,
  rankedSolo: 420,
  rankedFlex: 440
}

function handleRequest(reqObj) {
  let summName = reqObj.summName;
  let queueType = reqObj.queueType;

  let queueCode = queueTypeDict[queueType];

  return makeStatsRequest(summName, [queueCode])
  .catch(err => {
    console.log(err);
    throw err;
  });
}

// default number of games requested will be 10
function makeStatsRequest(playerTag, gameTypeArr) {
    return axios.get('http://localhost:5000/api/stats', {
        params: {
            summonerName: playerTag,
            gameTypes: gameTypeArr,
            numRequested: 5
        }
    })
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
        if(err.response) {
          console.log(err.response.status);
          return err.response.status;
        }
        // in case there is no response, return default value
        return [];
    });
}

module.exports.handleRequest = handleRequest;