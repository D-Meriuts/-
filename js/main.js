const getRandomItnegralNumber = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min +1)) + min;
};

getRandomItnegralNumber(1, 10)
// console.log(getRandomItnegralNumber(1, 10))

const getRandomIntDigits = (min, max, digits) => {
  if (min < 0 || max < 0) {
    return -1;
    // return console.log('Введите другие значения');
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  return (Math.floor(Math.random() * (max - min +1)) + min).toFixed(digits);
}
getRandomIntDigits(10, 22, 4);
// console.log(getRandomIntDigits(10, 22, 4))
