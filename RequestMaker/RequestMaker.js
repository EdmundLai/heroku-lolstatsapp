const axios = require("axios");
const RateLimiter = require("limiter").RateLimiter;

// class that all calls to League of Legends APIs are made through
// DONE: Convert all axios requests to na1.api.riotgames.com to use RateLimiter
class RequestMaker {
    constructor(apiToken) {
        this.limiter1 = new RateLimiter(90, 120000);
        this.limiter2 = new RateLimiter(18, 1000);
        this.apiToken = apiToken;
        this.gameType = {
            400: "Draft Pick",
            420: "Ranked Solo/Duo",
            430: "Blind Pick",
            440: "Ranked Flex",
            450: "ARAM",
            460: "Twisted Treeline 3v3",
        };
        this.errorLog = {
            responseCode: undefined,
            method: "",
        };
    }

    // removing tokens from first limiter to adhere to 100 requests per 2 minutes
    removeTokenLimiter1() {
        return new Promise((resolve) => {
            this.limiter1.removeTokens(1, resolve);
        });
    }

    // removing tokens from second limiter to adhere to 20 requests per second
    removeTokenLimiter2() {
        return new Promise((resolve) => {
            this.limiter2.removeTokens(1, resolve);
        });
    }

    // combining removeTokenLimiter calls to make sure each request adheres to both rate limits
    removeToken() {
        return Promise.all([this.removeTokenLimiter1(), this.removeTokenLimiter2()]);
    }

    getLOLSummonerData(summonerName) {
        return this.removeToken()
        .then(() => {
            return axios({
                url: `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
                method: "get",
                headers: {
                    "X-Riot-Token": this.apiToken,
                },
            });
        })
        .then(res => {
            const data = res.data;
            const dataObj = {
                summonerLevel: data.summonerLevel,
                profileIconId: data.profileIconId,
            };

            return dataObj;
        })
        .catch(err => {
            // console.log(err);
            console.log("error in getLOLSummonerData");
            this.errorLog.responseCode = err.response.status;
            this.errorLog.method = "getLOLSummonerData";
            throw err;
        });
    }

    getLOLAccountID(summonerName) {
        return this.removeToken()
        .then(() => {
            return axios({
                url: `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
                method: "get",
                headers: {
                    "X-Riot-Token": this.apiToken,
                },
            });
        })
        .then(res => {
            const data = res.data;
            const accountID = data.accountId;
            return accountID;
        })
        .catch(err => {
            // console.log(err);
            console.log("error in getLOLAccountID");
            this.errorLog.responseCode = err.response.status;
            this.errorLog.method = "getLOLAccountID";

            // console.log(err.response.status);
            throw err;
        });
    }

    // common queue types:
    // 400: Draft Pick
    // 420: Ranked Solo/Duo
    // 430: Blind Pick
    // 440: Ranked Flex
    // 450: ARAM
    // 460: Twisted Treeline 3v3

    getMatchList(summonerID, queueTypes) {
        let requestURL = null;
        requestURL = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${summonerID}`;

        if (queueTypes !== undefined) {
            if (typeof (queueTypes) === "number") {
                requestURL += `?queue=${queueTypes}`;
            } else if (typeof (queueTypes) === "object") {
                for (let i = 0; i < queueTypes.length; i++) {
                    const queueType = queueTypes[i];
                    if (isNaN(queueType)) {
                        console.log("queueType is not a number.");
                        return null;
                    }
                    if (i === 0) {
                        requestURL += `?queue=${queueType}`;
                    } else {
                        requestURL += `&queue=${queueType}`;
                    }
                }
            } else {
                return null;
            }
        }

        return this.removeToken()
        .then(() => {
            return axios({
                url: requestURL,
                method: "get",
                headers: {
                    "X-Riot-Token": this.apiToken,
                },
            });
        })
        .then(res => {
            const data = res.data.matches;
            // console.log(data);
            return data;
        })
        .catch(err => {
            console.log("error in getMatchList");
            this.errorLog.responseCode = err.response.status;
            this.errorLog.method = "getMatchList";
            // console.log(err);
            // if(err.response) {
            //     console.log(err.response);
            // }
            throw err;
        });
    }

    // tested and works!
    getTimelineData(gameID, participantId) {
        return this.removeToken()
        .then(() => {
            return axios({
                url: `https://na1.api.riotgames.com/lol/match/v4/timelines/by-match/${gameID}`,
                method: "get",
                headers: {
                    "X-Riot-Token": this.apiToken,
                },
            });
        })
        .then(res => {
            const data = res.data;
            // console.log(data);
            const dataframes = data.frames;

            const totalFrames = Object.keys(dataframes).length;

            let correctPlayerIndex = null;

            const playerTimelineData = {};

            for (let currFrame = 0; currFrame < totalFrames; currFrame++) {
                const frameObj = dataframes[currFrame];

                // frameObj also contains the property "events", which is an array of game events
                // such as purchasing/selling item, objective taken, or champion killed in the
                // last minute of play

                // using participantFrames for now
                const participantFrames = frameObj.participantFrames;

                if (correctPlayerIndex === null) {
                    for (let index = 1; index <= 10; index++) {
                        if (participantFrames[index].participantId == participantId) {
                            // break out of loop if participantId is found
                            correctPlayerIndex = index;
                            break;
                        }
                    }
                }

                playerTimelineData[currFrame] = participantFrames[correctPlayerIndex];
                // playerTimelineData[currFrame].events = frameObj.events;
            }

            const allTimelineData = data;

            allTimelineData.playerTimelineData = playerTimelineData;

            return allTimelineData;
        })
        .catch(err => {
            console.log("error in getTimelineData");
            this.errorLog.responseCode = err.response.status;
            this.errorLog.method = "getTimelineData";
            // console.log(err);
            // console.log(err.response.status);
            throw err;
        });
    }

    getStatsByGame(gameID, championID) {
        return this.removeToken()
        .then(() => {
            return axios({
                url: `https://na1.api.riotgames.com/lol/match/v4/matches/${gameID}`,
                method: "get",
                headers: {
                    "X-Riot-Token": this.apiToken,
                },
            });
        })
        .then(res => {
            const data = res.data;
            const gameTime = data.gameCreation;
            const playerDataArr = data.participants;
            const gameLength = data.gameDuration;
            const queueId = data.queueId;
            let startingGold;

            // startingGold values based on map
            if (queueId === 450) {
                startingGold = 1400;
            } else if (queueId === 460 || queueId === 470) {
                startingGold = 850;
            } else {
                startingGold = 500;
            }

            // console.log(startingGold);

            function getPlayerStats() {
                for (let i = 0; i < playerDataArr.length; i++) {
                    const playerData = playerDataArr[i];
                    if (playerData.championId === championID) {
                        return playerData.stats;
                    }
                }

                // should never happen
                console.log("Champion ID not found!");
                return null;
            }

            const fullStats = getPlayerStats();

            function processStats({
                participantId, win, kills, assists, deaths, visionScore, totalMinionsKilled,
                totalDamageDealt, totalDamageDealtToChampions, goldEarned,
            }) {
                return {
                    participantId,
                    win,
                    kills,
                    assists,
                    deaths,
                    visionScore,
                    totalMinionsKilled,
                    totalDamageDealt,
                    totalDamageDealtToChampions,
                    goldEarned,
                };
            }

            const playerStats = processStats(fullStats);

            function calculateExtraStats(stats, gameLen) {
                const gameLenInMin = gameLen / 60;
                let csPerMin = stats.totalMinionsKilled / gameLenInMin;
                let goldPerMin = (stats.goldEarned - startingGold) / gameLenInMin;

                csPerMin = parseFloat(csPerMin.toFixed(1));
                goldPerMin = parseFloat(goldPerMin.toFixed(1));

                return {
                    csPerMin, goldPerMin,
                };
            }

            const extraStats = calculateExtraStats(playerStats, gameLength);

            playerStats.csPerMin = extraStats.csPerMin;
            playerStats.goldPerMin = extraStats.goldPerMin;

            const gameStats = data;

            const gameInfo = {
                gameID,
                championID,
                gameLength,
                gameTime,
                gameStats,
                playerStats,
            };
            return gameInfo;
        })
        // .then(data => {
        //     console.log(data);
        // })
        .catch(err => {
            console.log("error in getStatsByGame");
            this.errorLog.responseCode = err.response.status;
            this.errorLog.method = "getStatsByGame";
            // console.log(err);
            // console.log(err.response.status);
            throw err;
        });
    }

    // returns array of stats per game if call is successful
    // returns http status code if any calls failed along the way
    getStats(summonerName, queueType, numGames) {
        if (isNaN(numGames)) {
            console.log("Please request a numeric value for numGames.");
            return null;
        }
        if (numGames < 1) {
            console.log("Please request numGames of at least 1.");
            return null;
        }
        const maxNumGames = 20;
        let numGamesRetrieved = numGames > maxNumGames ? maxNumGames : numGames;
        console.log(`numGamesRetrieved: ${numGamesRetrieved}`);
        return this.getLOLAccountID(summonerName)
        .then(id => {
            // console.log(id);
            return this.getMatchList(id, queueType)
            .then(matchList => {
                // uses object destructuring
                const gameInfoArr = matchList.map(({ gameId, champion }) => {
                    return { gameId, champion };
                });
                // for debugging purposes
                // console.log(gameInfoArr);
                return gameInfoArr;
            })
            .then(gameInfoArr => {
                if (numGamesRetrieved > gameInfoArr.length) {
                    numGamesRetrieved = gameInfoArr.length;
                }

                const gamesRetrieved = gameInfoArr.slice(0, numGamesRetrieved);

                return Promise.all(gamesRetrieved.map(gameInfo => {
                    return this.getStatsByGame(gameInfo.gameId, gameInfo.champion)
                    .then(gameData => {
                        const stats = gameData.playerStats;
                        const participantId = stats.participantId;
                        const gameID = gameData.gameID;

                        return this.getTimelineData(gameID, participantId)
                        .then(timelineData => {
                            gameData.timelineData = timelineData;
                            return gameData;
                        })
                        .catch(err => {
                            throw err;
                        });
                    })
                    .catch(err => {
                        throw err;
                    });
                }))
                // used for debugging
                // .then(data => {
                //     console.log(data);
                // })
                .catch(err => {
                    console.log("some error occurred in promise all");
                    throw err;
                });
            })
            .then(statsArray => {
                const statsObj = {
                    summonerName,
                    queueType,
                    statsArray,
                };

                return statsObj;
            })
            .catch(err => {
                throw err;
            });
        })
        .catch(err => {
            console.log("error message from RequestMaker");
            console.log(`error response code: ${this.errorLog.responseCode}`);
            // console.log(`error occurred in method: ${this.errorLog.method}`);
            return this.errorLog;
        });
    }
}

// getting champion data from latest patch
// function getDDragonChampKeys() {
//     return axios.get("http://ddragon.leagueoflegends.com/cdn/9.23.1/data/en_US/championFull.json")
//     .then(res => {
//         const champFullData = res.data;
//         const keys = champFullData.keys;
//         return keys;
//     })
//     .catch(err => {
//         console.log(err);
//         throw err;
//     });
// }

// getting queue type data to convert queueID numbers to real queue types
// function getQueueType(queueID) {
//     return axios.get("http://static.developer.riotgames.com/docs/lol/queues.json")
//     .then(res => {
//         const dataArray = res.data;
//         for (let i = 0; i < dataArray.length; i++) {
//             const dataObj = dataArray[i];
//             if (dataObj.queueId === queueID) {
//                 return dataObj.description;
//             }
//         }
//         console.log(`queueID ${queueID} not found.`);
//         return null;
//     })
//     .catch(err => {
//         console.log(err);
//         throw err;
//     });
// }

module.exports = RequestMaker;
