import {TRANSLATE_TYPE} from './data.js';

const adForm = document.querySelector('.ad-form');
const housingTypeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');
// const roomNumber = adForm.querySelector('#room_number');
const mapFilters = document.querySelector('.map__filters');
const address = adForm.querySelector('#address');

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


const mapFiltersDisabled = () => {
  mapFilters.classList.add('map__filters--disabled');

  for (let i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].setAttribute('disabled', 'disabled');
  }

};

const adFormDisabled = () => {
  adForm.classList.add('ad-form--disabled');

  for (let i = 0; i < adForm.children.length; i++) {
    adForm.children[i].setAttribute('disabled', 'disabled');
  }

};

const addformAndMapFiltersEnabled = () => {
  mapFilters.classList.remove('map__filters--disabled');

  for (let i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].removeAttribute('disabled');
  }

  adForm.classList.remove('ad-form--disabled');

  for (let i = 0; i < adForm.children.length; i++) {
    adForm.children[i].removeAttribute('disabled');
  }

};

address.setAttribute('readonly', 'readonly');


export {mapFiltersDisabled, adFormDisabled, addformAndMapFiltersEnabled, address}
