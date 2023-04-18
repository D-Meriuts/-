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

  // Генерирует адрес
  getAddress: function ({lat, lng}) {
    return `${lat.toFixed(5)}, ${lng.toFixed(5)}`
  },

  // Проверка нажатия на Esc
  // isEscEvent: function (evt) {
  //   return evt.key === 'Escape' || evt.key === 'Esc';
  // },

  // Закрытие ПопАпа
  // closePopup: function () {
  //   if (document.querySelector('.success')) {
  //     document.querySelector('.success').remove();
  //   }
  //   if (document.querySelector('.error')) {
  //     document.querySelector('.error').remove();
  //   }
  //   document.removeEventListener('keydown', onPopupEscKeydown);
  //   document.removeEventListener('keydown', onPopupClick);
  // },

  // onPopupEscKeydown: function (evt) {
  //   if (isEscEvent(evt)) {
  //     evt.preventDefault();
  //     closePopup();
  //   }
  // },

  // onPopupClick: function () {
  //   closePopup();
  // },

  // показывает сообщение об успешной отправке формы
  // showSuccessMessage: function () {
  //   const successTemplate = document.querySelector('#success').content.querySelector('.success');
  // const successMessage = successTemplate.cloneNode(true);
  // successMessage.style.zIndex = 1000;
  // document.querySelector('main').append(successMessage);
  // document.addEventListener('keydown', onPopupEscKeydown);
  // document.addEventListener('click', onPopupClick);
  // },

  // показывает сообщение об ошибке отправки формы
  // showErrorMessage: function (message) {
  //   const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  // const errorMessage = errorTemplate.cloneNode(true);
  // errorMessage.style.zIndex = 1000;
  // if (message) {
  //   errorMessage.querySelector('p').textContent = message;
  // }
  // document.querySelector('main').append(errorMessage);
  // document.addEventListener('keydown', onPopupEscKeydown);
  // document.addEventListener('click', closePopup);
  // },

}

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const closePopup = () => {
  if (document.querySelector('.success')) {
    document.querySelector('.success').remove();
  }
  if (document.querySelector('.error')) {
    document.querySelector('.error').remove();
  }
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('keydown', onPopupClick);
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

const onPopupClick = () => {
  closePopup();
};

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successTemplate.cloneNode(true);
  successMessage.style.zIndex = 1000;
  document.querySelector('main').append(successMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onPopupClick);
};

const showErrorMessage = (message) => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorTemplate.cloneNode(true);
  errorMessage.style.zIndex = 1000;
  if (message) {
    errorMessage.querySelector('p').textContent = message;
  }
  document.querySelector('main').append(errorMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', closePopup);
};

export const addZeros = functions.addZeros;
export const getRandomNumber = functions.getRandomNumber;
export const getRandomElementArray = functions.getRandomElementArray;
export const shuffleArray = functions.shuffleArray;
export const getRandomElementsArray = functions.getRandomElementsArray;
export const getAddress = functions.getAddress;
// export const isEscEvent = functions.isEscEvent;
// export const closePopup = functions.closePopup;
// export const showSuccessMessage = functions.showSuccessMessage;
// export const showErrorMessage = functions.showErrorMessage;

export {

  showSuccessMessage,
  showErrorMessage
};
