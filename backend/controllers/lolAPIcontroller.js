const RequestMaker = require('../../RequestMaker/RequestMaker');

const API_TOKEN = process.env.API_TOKEN;

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
        });
    }

    getSummonerData(req, res) {
        const playerTag = req.query.summonerName;

        this.requestMaker.getLOLSummonerData(playerTag)
        .then(data => {
            res.send(data);
        });
    }
}

module.exports = LoLAPIcontroller;
