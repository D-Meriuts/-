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

  // Случайное число
  getRandomItnegralNumber: function (min, max) {
    if (min < 0 || max < 0) {
      return -1;
    }
    if (max < min) {
      [min, max] = [max, min];
    }
    return Math.floor(Math.random() * (max - min +1)) + min;
  },

  // Случайное число с плавающей точкой с указанием количества цифр после запятой
  getRandomItnegralNumberDigits: function (min, max, digits) {
    if (min < 0 || max < 0) {
      return -1;
    }
    if (max < min) {
      [min, max] = [max, min];
    }
    return (Math.floor(Math.random() * (max - min +1)) + min).toFixed(digits);
  },

  // Случайный элемент массива
  getRandomElementArr: function (array) {
    return array[getRandomItnegralNumber(0, array.length - 1)];
  },
}

export const addZeros = functions.addZeros;
export const getRandomItnegralNumber = functions.getRandomItnegralNumber;
export const getRandomItnegralNumberDigits = functions.getRandomItnegralNumberDigits;
export const getRandomElementArr = functions.getRandomElementArr;
