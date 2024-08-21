function getMinMax(str) {
  let result = {};
  const arr = str
    .split(' ')
    .filter(item => isFinite(item))
    .sort( (a, b) => a - b );

  result.min = +arr.shift();
  result.max = +arr.pop();

  return result;
}
