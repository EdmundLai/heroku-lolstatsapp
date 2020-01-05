function convertLengthToTimeString(gameLength) {
  let numMin = Math.floor(gameLength / 60);
  let numSeconds = gameLength % 60;
  return `${numMin} min ${numSeconds} s`;
}

function convertGameDate(gameTime) {
  let date = new Date(gameTime);
  return date.toLocaleDateString();
}

// returns string of how long ago game took place
function getTimeAgo(gameTime) {
  const currDate = new Date();

  const timeDifference = currDate.getTime() - gameTime;

  const millisecondsAgo = timeDifference;

  const secondsAgo = millisecondsAgo / 1000;

  const minutesAgo = millisecondsAgo / (1000 * 60);

  const hoursAgo = millisecondsAgo / (1000 * 3600);

  const daysAgo = millisecondsAgo / (1000 * 3600 * 24);

  const yearsAgo = millisecondsAgo / (1000 * 3600 * 24 * 365);

  let timeUnit = "seconds";
  let finalNumber = Math.floor(secondsAgo);

  if(Math.floor(yearsAgo) > 0) {
    timeUnit = "years";
    finalNumber = Math.floor(yearsAgo);
  } else if(Math.floor(daysAgo) > 0) {
    timeUnit = "days";
    finalNumber = Math.floor(daysAgo);
  } else if(Math.floor(hoursAgo) > 0) {
    timeUnit = "hours";
    finalNumber = Math.floor(hoursAgo);
  } else if(Math.floor(minutesAgo) > 0) {
    timeUnit = "minutes";
    finalNumber = Math.floor(minutesAgo);
  }

  if(finalNumber === 1) {
    timeUnit = timeUnit.slice(0, -1);
  }

  return `${finalNumber} ${timeUnit} ago`;
}

module.exports.convertLengthToTimeString = convertLengthToTimeString;

module.exports.convertGameDate = convertGameDate;

module.exports.getTimeAgo = getTimeAgo;