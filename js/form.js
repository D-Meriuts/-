import {TRANSLATE_TYPE} from './data.js';

const adForm = document.querySelector('.ad-form');
const housingTypeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');
// const roomNumber = adForm.querySelector('#room_number')

housingTypeSelect.addEventListener('change', () => {
  priceInput.min = TRANSLATE_TYPE[housingTypeSelect.value].minPrice;
  priceInput.placeholder = TRANSLATE_TYPE[housingTypeSelect.value].minPrice;
});

timeInSelect.addEventListener('change', () => {
  timeOutSelect.value = timeInSelect.value;
});

timeOutSelect.addEventListener('change', () => {
  timeInSelect.value = timeOutSelect.value;
});
