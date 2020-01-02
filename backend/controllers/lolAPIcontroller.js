const RequestMaker = require('../../RequestMaker/RequestMaker');
const API_TOKEN = require('../token');


// need to get query parameters from request and use them in
// requestMaker call
module.exports.getStats = function getStats(req, res) {
    const playerTag = req.query.summonerName;
    const gameTypes = req.query.gameTypes;
    const numGames = req.query.numRequested;

    if (this.requestMaker === undefined) {
        this.requestMaker = new RequestMaker(API_TOKEN);
    }

    // console.log(`tag: ${playerTag}`);
    // console.log(`types: ${gameTypes}`);
    // console.log(`number requested: ${numGames}`);

    this.requestMaker.getStats(playerTag, gameTypes, numGames)
    .then(data => {
        // console.log(data);
        res.send(data);
        // if(isNaN(data)) {
        //     res.send(data);
        // } else {
        //     res.sendStatus(data);
        // }
    })
    .catch(err => {
        console.log("error message from lolAPIcontroller");
        console.log(err);
        // res.sendStatus(err.response.status);
    });
};
