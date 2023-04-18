import {TRANSLATE_TYPE, sendData} from './data.js';
import {showErrorMessage, showSuccessMessage} from './util.js';
import { resetAddress } from './map.js';


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
const resetButton = adForm.querySelector('.ad-form__reset');

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

const adFormDisabled = () => {
  adForm.classList.add('ad-form--disabled');

  for (let i = 0; i < adForm.children.length; i++) {
    adForm.children[i].setAttribute('disabled', 'disabled');
  }

};


const addFormAndMapFiltersEnabled = () => {
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

const setAddresInputValue = (value) => {
  address.value = value;
};

const validation = (form) => {

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

  form.querySelectorAll('input').forEach(input => {
    removeError(input);


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

    if (input.dataset.min) {
      if (input.value < TRANSLATE_TYPE[housingTypeSelect.value].minPrice) {
        removeError(input);
        createError(input, 'Значение ниже минимального');
        result = false
      }
    }
  });

  return result
}

const onSubmitFormValidation = () => {
  adForm.addEventListener('submit', function(evt){
    if (validation(this) == false) {
      evt.preventDefault()
    }
  })
};

onSubmitFormValidation();

const onSubmitAdForm = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};

const resetAdForm = () => {
  adForm.reset();
  resetAddress();
};

resetAdForm();

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetAdForm();
})

onSubmitAdForm(() => {
  showSuccessMessage();
  resetAdForm();
}, showErrorMessage);

mapFiltersDisabled();
adFormDisabled();

export {mapFiltersDisabled, adFormDisabled, addFormAndMapFiltersEnabled, setAddresInputValue}
