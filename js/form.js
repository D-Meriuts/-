import {TRANSLATE_TYPE} from './data.js';

const adForm = document.querySelector('.ad-form');
const housingTypeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');
const mapFilters = document.querySelector('.map__filters');
const address = adForm.querySelector('#address');
const roomNumberSelect = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const roomCapacityHandler = () => {
  const capacityOptions = capacity.querySelectorAll('option');

  roomNumberSelect.addEventListener('change', (evt) => {
    switch(evt.target.value) {
      case '1':
        capacityOptions.forEach(option => {
          if (option.value !== '1') {
            option.setAttribute('disabled', 'disabled')
          } else {
            option.removeAttribute('disabled');
          }
        });
        break;
      case '2':
        capacityOptions.forEach(option => {
          if ((option.value !== '1') && (option.value !== '2')) {
            option.setAttribute('disabled', 'disabled')
          } else {
            option.removeAttribute('disabled');
          }
        });
        break;
      case '3':
        capacityOptions.forEach(option => {
          if ((option.value !== '1') && (option.value !== '2') && (option.value !== '3')) {
            option.setAttribute('disabled', 'disabled')
          } else {
            option.removeAttribute('disabled');
          }
        });
        break;
      case '100':
        capacityOptions.forEach(option => {
          if ((option.value !== '0')) {
            option.setAttribute('disabled', 'disabled')
          } else {
            option.removeAttribute('disabled');
          }
        });
        break;
    }
  })
};
roomCapacityHandler();

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
