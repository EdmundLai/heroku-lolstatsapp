function convertLengthToTimeString(gameLength) {
  let numMin = Math.floor(gameLength / 60);
  let numSeconds = gameLength % 60;
  return `${numMin} min ${numSeconds} s`;
}

function convertGameDate(gameTime) {
  let date = new Date(gameTime);
  return date.toLocaleDateString();
}

module.exports.convertLengthToTimeString = convertLengthToTimeString;

module.exports.convertGameDate = convertGameDate;