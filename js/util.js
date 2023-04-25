const ALERT_SHOW_TIME = 5000;


// добавляет ведущий 0 к числу
const addZeros = (n, needLength) => {
  needLength = needLength || 2;
  n = String(n);
  while (n.length < needLength) {
    n = '0' + n;
  }
  return n
};

// Случайное  целое число и Случайное число с плавающей точкой с указанием количества цифр после запятой
const getRandomNumber = (min, max, AFTERCOMMA = 0) => {
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
};

// Случайный элемент массива
const getRandomElementArray = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

// Перетасовать массив
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Новый массив из другого массива
const getRandomElementsArray = (array) => {
  return shuffleArray(array).slice(0, getRandomNumber(1, array.length));
};

const getAddress = ({lat, lng}) => {
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`
};

// Функция вызова сообщения в случае ошибки fetch()
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Обработчик нажатия ESC
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';



export {addZeros, getRandomElementArray, getRandomNumber, getRandomElementsArray, getAddress, showAlert, isEscEvent}
