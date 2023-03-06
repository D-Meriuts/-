const functions = {

  // добавляет ведущий 0 к числу
  addZeros: function (n, needLength) {
    needLength = needLength || 2;
    n = String(n);
    while (n.length < needLength) {
      n = '0' + n;
    }
    return n
  },

  // Случайное  целое число
  // и
    // Случайное число с плавающей точкой с указанием количества цифр после запятой
  getRandomNumber: function (min, max, AFTERCOMMA = 0) {
    if (min < 0 || max < 0) {
      return -1;
    }
    if (min > max) {
      [min, max] = [max, min];
    }
    if (AFTERCOMMA === 0) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return Number.parseFloat((Math.random() * (max - min) + min).toFixed(AFTERCOMMA));
  },

    // getRandomNumber(1, 2, 3);
    // console.log(getRandomNumber(1, 2, 3))


  // Случайный элемент массива
  getRandomElementArray: function (array) {
    return array[getRandomNumber(0, array.length - 1)];
  },

  // Перетасовать массив
  shuffleArray: function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },

  // Новый массив из другого массива
  getRandomElementsArray: function (array) {
    return shuffleArray(array).slice(0, getRandomNumber(1, array.length));
  },

}

export const addZeros = functions.addZeros;
export const getRandomNumber = functions.getRandomNumber;
export const getRandomElementArray = functions.getRandomElementArray;
export const shuffleArray = functions.shuffleArray;
export const getRandomElementsArray = functions.getRandomElementsArray;
