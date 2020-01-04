const RequestMaker = require('../../RequestMaker/RequestMaker');
const API_TOKEN = require('../token');

class LoLAPIcontroller {
    constructor() {
        this.requestMaker = new RequestMaker(API_TOKEN);
    }

    getStats(req, res) {
        const playerTag = req.query.summonerName;
        const gameTypes = req.query.gameTypes;
        const numGames = req.query.numRequested;

        // console.log(`tag: ${playerTag}`);
        // console.log(`types: ${gameTypes}`);
        // console.log(`number requested: ${numGames}`);

        // need to get query parameters from request and use them in
        // requestMaker call
        this.requestMaker.getStats(playerTag, gameTypes, numGames)
        .then(data => {
            // console.log(data);
            res.send(data);
        })
        .catch(err => {
            console.log("error message from LoLAPIcontroller getStats");
            console.log(err);
        });
    }

    getSummonerData(req, res) {
        const playerTag = req.query.summonerName;

        this.requestMaker.getLOLSummonerData(playerTag)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log("error message from LoLAPIcontroller getStats");
            console.log(err);
        });
    }
}

module.exports = LoLAPIcontroller;
