import {TRANSLATE_TYPE, getDefauldCoordinates} from './data.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { sendData } from './api.js';
import { resetMap, makeInitialization} from './map.js';


const adForm = document.querySelector('.ad-form');
const housingTypeSelect = adForm.querySelector('#type');
const priceInput = adForm.querySelector('#price');
const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');
const mapFilters = document.querySelector('.map__filters');
const address = adForm.querySelector('#address');
const roomNumberSelect = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const capacityOptions = capacity.querySelectorAll('option');

// меняет количество гостей на 1 при загрузке страницы и блокирует остальные
document.addEventListener('DOMContentLoaded', function() {
  if (roomNumberSelect.value === '1') {
    capacityOptions[0].setAttribute('selected', 'selected');
    capacityOptions[1].setAttribute('disabled', 'disabled');
    capacityOptions[2].setAttribute('disabled', 'disabled');
    capacityOptions[3].setAttribute('disabled', 'disabled');
  }
});

const roomCapacityHandler = () => {
  roomNumberSelect.addEventListener('change', (evt) => {
    switch(evt.target.value) {
      case '1':
        capacityOptions.forEach(option => {
          if (option.value !== '1') {
            option.setAttribute('disabled', 'disabled')
          } else {
            option.removeAttribute('disabled');
          }
          if (((option.value === '1'))) {
            option.setAttribute('selected', 'selected')
          } else {
            option.removeAttribute('selected')
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
          if (((option.value === '2'))) {
            option.setAttribute('selected', 'selected')
          } else {
            option.removeAttribute('selected')
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
          if (((option.value === '3'))) {
            option.setAttribute('selected', 'selected')
          } else {
            option.removeAttribute('selected')
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
          if (((option.value === '0'))) {
            option.setAttribute('selected', 'selected')
          } else {
            option.removeAttribute('selected')
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
  priceInput.min = TRANSLATE_TYPE[housingTypeSelect.value].minPrice;
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

mapFiltersDisabled();

const adFormDisabled = () => {
  adForm.classList.add('ad-form--disabled');

  for (let i = 0; i < adForm.children.length; i++) {
    adForm.children[i].setAttribute('disabled', 'disabled');
  }
};

adFormDisabled();


const enableForms = () => {
  mapFilters.classList.remove('map__filters--disabled');

  for (let i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].removeAttribute('disabled');
  }

  adForm.classList.remove('ad-form--disabled');

  for (let i = 0; i < adForm.children.length; i++) {
    adForm.children[i].removeAttribute('disabled');
  }
};

enableForms(); /*проверить*/


// Вспомогательная функция для записи координат по движению главной метки

const setCoordinates = (coordinates) => {
  address.setAttribute('readonly','readonly');
  address.value = `${  coordinates().lat.toFixed(5)  }, ${  coordinates().lng.toFixed(5)}`;
};

setCoordinates(getDefauldCoordinates);

makeInitialization(); /*проверить*/



const validation = (adForm) => {
  const removeError = (input) => {
    const parent = input.parentNode;

    if(parent.classList.contains('error-input')) {
      parent.querySelector('.error-label').remove();
      parent.classList.remove('error-input');
    }
  }
  const createError = (input, text) => {
    const parent = input.parentNode;
    const errorLabel = document.createElement('label');
    errorLabel.classList.add('error-label');
    errorLabel.textContent = text;
    parent.classList.add('error-input');
    parent.append(errorLabel);
  }

  let result = true;


  adForm.querySelectorAll('input').forEach(input => {
    setTimeout(() => {
      removeError(input);
    }, 5000);


    if (input.dataset.minLength) {
      if (input.value.length < input.dataset.minLength) {
        removeError(input);
        createError(input, `Минимальное количество символов ${input.dataset.minLength}, нужно еще ${input.dataset.minLength - input.value.length} символов`);
        result = false
      }
    }

    if (input.dataset.maxLength) {
      if (input.value.length > input.dataset.maxLength) {
        removeError(input);
        createError(input, `Максимальное количество символов ${input.dataset.maxLength}`);
        result = false
      }
    }

    if (input.dataset.required == 'true') {
      if (input.value == '') {
        removeError(input);
        createError(input, 'Поле не заполнено');
        result = false
      }
    }
  });

  return result
}

const formValidation = () => {
  adForm.addEventListener('input', function(evt){
    if (validation(this) == false) {
      evt.preventDefault()
    }
  });
  adForm.addEventListener('submit', function(evt){
    if (validation(this) == false) {
      evt.preventDefault()
    }
  });
};

formValidation();

// Функция отправки данных формы на сервер

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => {
      showSuccessMessage();
      resetMap();
      adForm.reset();
      setCoordinates(getDefauldCoordinates);
    },
    () => showErrorMessage(),
    new FormData(evt.target),
  );
});

// Обрабочик кнопки cброса данных формы и карты

const resetButton = document.querySelector('.ad-form__reset');
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetMap();
  adForm.reset();
  setCoordinates(getDefauldCoordinates);
});


export {mapFiltersDisabled, enableForms, adFormDisabled,  setCoordinates}
