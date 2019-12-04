var RequestMaker = require('../../RequestMaker/RequestMaker');
var API_Token = require('../token');


// need to get query parameters from request and use them in 
// requestMaker call
module.exports.getStats = function(req, res) {
    let playerTag = req.query.summonerName;
    let gameTypes = req.query.gameTypes;
    let numGames = req.query.numRequested;

    if(this.requestMaker == undefined) {
        this.requestMaker = new RequestMaker(API_Token);
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
}


