// Data manipulation utility functions
// - used primarily for transforming datasets to be used by Chart.JS graphs

function getTeamGoldData(gameData) {
  let gameFrames = gameData.timelineData.frames;

  let teamGoldData = {
    blueTotalGold: [],
    redTotalGold: [],
    goldDiff: [],
  }

  gameFrames.forEach(currentFrame => {
    let participantFrames = currentFrame.participantFrames;

    let blueGoldAtCurrFrame = 0;
    let redGoldAtCurrFrame = 0;

    Object.values(participantFrames).forEach(playerFrame => {
      if(playerFrame.participantId >= 1 && playerFrame.participantId <= 5) {
        blueGoldAtCurrFrame += playerFrame.totalGold;
      } else {
        redGoldAtCurrFrame += playerFrame.totalGold;
      }
    });

    let currGoldDifference = blueGoldAtCurrFrame - redGoldAtCurrFrame;

    teamGoldData.blueTotalGold.push(blueGoldAtCurrFrame);
    teamGoldData.redTotalGold.push(redGoldAtCurrFrame);
    teamGoldData.goldDiff.push(currGoldDifference);
  });

  return teamGoldData;
}

// calculating average EXP per minute gained for current player
function calculateAvgXpPerMin(playerTimelineData, gameLength) {
  const dataLength = Object.keys(playerTimelineData).length;

  return playerTimelineData[dataLength - 1].xp / (gameLength / 60);
}

// calculating change in EXP and gold gained every minute of game for current player
function calculateDeltasPerMin(graphData) {
  const time = graphData.time;
  const xpData = graphData.xp;
  const goldData = graphData.totalGold;

  const timeDeltas = [];
  const xpDeltas = [];
  const goldDeltas = [];

  for(let i = 0; i < time.length - 1; i++) {
    const xpDeltaPerMin = xpData[i + 1] - xpData[i];
    const goldDeltaPerMin = goldData[i + 1] - goldData[i];

    timeDeltas.push(i);
    xpDeltas.push(xpDeltaPerMin);
    goldDeltas.push(goldDeltaPerMin);
  }

  const deltaData = {
    timeDeltas,
    xpDeltas,
    goldDeltas
  };

  return deltaData;
}

// processing player timeline data for use in graphs
function processTimelineData(playerTimelineData) {
  const time = [];
  const totalGold = [];
  const xp = [];
  const totalFrames = Object.keys(playerTimelineData).length;
  for(let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
    time.push(`${frameIndex} mins`);
    let currFrame = playerTimelineData[frameIndex];
    totalGold.push(currFrame.totalGold);
    xp.push(currFrame.xp);
  }

  const graphData = {
    time,
    totalGold,
    xp
  };

  return graphData;
}

module.exports.getTeamGoldData = getTeamGoldData;

module.exports.calculateAvgXpPerMin = calculateAvgXpPerMin;

module.exports.calculateDeltasPerMin = calculateDeltasPerMin;

module.exports.processTimelineData = processTimelineData;