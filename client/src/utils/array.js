// fill array with length arrLen with val
function fillArray(arrLen, val) {
  let outputArr = [];
  for(let i = 0; i < arrLen; i++) {
    outputArr.push(val);
  }

  return outputArr;
}

function calculateAvgFromArray(array) {
  let avg = array.reduce((acc, curr) => acc + curr) / array.length;
  return parseFloat(avg.toFixed(1));
}

module.exports.fillArray = fillArray;

module.exports.calculateAvgFromArray = calculateAvgFromArray;
