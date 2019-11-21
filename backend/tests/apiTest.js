var axios = require('axios');

function makeStatsRequest(playerTag, gameTypeArr, numGames) {
    axios.get('http://localhost:5000/api/stats', {
        params: {
            summonerName: playerTag,
            gameTypes: gameTypeArr,
            numRequested: numGames
        }
    })
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    });
}

makeStatsRequest("TitaniumGod", [400], 10);