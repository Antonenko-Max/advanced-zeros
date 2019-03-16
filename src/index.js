module.exports = function getZerosCount(number, base) {
  // your implementation
  const findAllDenominators = (base) => {
    let denominators = {};
    denominators.values = [];
    denominators.counts = [];
    for (let i = 2; i <= base; i++)
    {
      if (base % i == 0 && !denominators.values.some(e => i % e == 0)) {
        denominators.values.push(i);
      }
    }
  
    for (i in denominators.values) {
      denominators.counts[i] = 0;
      let remainder = base;
      while (true) {
        if (remainder % denominators.values[i] != 0) 
          break;
        denominators.counts[i]++;
        remainder /= denominators.values[i];
      }
    }
    return denominators;
  }
  
  const findCriticalDenominator = (denominators, base) => {
    weights = [];
    let accuracy = 1000;
    for (i in denominators.values) {
      weights[i] = 0;
      let count = Math.log(accuracy) / Math.log(denominators.values[i]);
      let current = accuracy;
      for (let j = 0; j < count; j++) {
        weights[i] += current / denominators.values[i];
        current /= denominators.values[i];
      }
      weights[i] = Math.floor(weights[i] / denominators.counts[i]);
    }
    let minWeight = Math.min.apply(null, weights);
    let index = 0;
    for (i in weights)
      if (minWeight == weights[i]) index = i;
    let denominator = denominators.values[index];
    let count = denominators.counts[index];
    return { value: denominator, count: count };
  }
  
  const calcZeroCount = (number, denominator, powerOfDenominator) => {
    let count = 0;
    for (let i = 2; i <= number; i++) {
      let current = i;
      while (true) {
        if (current % denominator == 0) {
          count++;
          current /= denominator;
          continue;
        }
        break;
      }
    }
    return Math.floor(count/powerOfDenominator);
  }
  
  let denominators = findAllDenominators(base);

  let denominator = findCriticalDenominator(denominators);

  return calcZeroCount(number, denominator.value, denominator.count);
}



