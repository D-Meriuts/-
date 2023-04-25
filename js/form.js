import {TRANSLATE_TYPE, getDefauldCoordinates} from './data.js';
import { showSuccessMessage, showErrorMessage } from './message.js';
import { sendData } from './api.js';
import { resetMap, makeInitialization} from './map.js';
import { resetImages } from './images.js';


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

const avatar = adForm.querySelector('.ad-form-header__preview img');
const titleInput = adForm.querySelector('#title');
const description = adForm.querySelector('#description');
const features = adForm.querySelectorAll('.features__checkbox');
const photos = adForm.querySelectorAll('.ad-form__photo');



/**
 * Начальные значения элементов формы - сразу после загрузки страницы, до ввода пользователем
 */
const defaultFormSetting = {
  avatarKey: avatar.src,
  // Значение title = пустая строка (как изначально)
  titleKey: titleInput.value,
  // Значение типа жилья = пустая строка (как изначально)
  typeKey: housingTypeSelect.value,
  // Значение цены = пустая строка (как изначально)
  priceKey: priceInput.value,
  // Значение цены по умолчанию в плейсхолдере = значение плейсхолдера (как изначально)
  pricePlaceholder: priceInput.placeholder,
  // Значение времени заезда = значение value (как изначально)
  timeInKey: timeInSelect.value,
  // Значение времени выезда = значение value (как изначально)
  timeOutKey: timeOutSelect.value,
  // Значение количества комнат = значение value (как изначально)
  roomNumberKey: roomNumberSelect.value,
  // Значение количества жильцов = значение value (как изначально)
  capacityKey: capacity.value,
  // Значение поля ОПИСАНИЕ = значение value (как изначально)
  descriptionKey: description.value,
};

/**
 * Функция сброса введённых данных до дефолтных при нажатии кнопки ОЧИСТИТЬ или при удачной отправке формы
 */
const resetForm = () => {
  // Сбрасываем путь у картинки на дефолтный
  avatar.src = defaultFormSetting.avatarKey;
  // Сбрасываем значение у заголовка на дефолтный (пустая строка)
  titleInput.value = defaultFormSetting.titleKey;
  // Сбрасываем значение у типа жилья на дефолтный (Квартира)
  housingTypeSelect.value = defaultFormSetting.typeKey;
  // Сбрасываем значение у цены на дефолтный (пустая строка)
  priceInput.value = defaultFormSetting.priceKey;
  // Сбрасываем плейсхолдер у цены на дефолтный (5000)
  priceInput.placeholder = defaultFormSetting.pricePlaceholder;
  // Сбрасываем время заезда на дефолтное (12:00)
  timeInSelect.value = defaultFormSetting.timeInKey;
  // Сбрасываем время выезда на дефолтное (12:00)
  timeOutSelect.value = defaultFormSetting.timeOutKey;
  // Сбрасываем количество комнат на дефолтное (1)
  roomNumberSelect.value = defaultFormSetting.roomNumberKey;
  // Сбрасываем количество жильцов (вместимость) на дефолтное (1 гость)
  capacity.value = defaultFormSetting.capacityKey;
  // Сбрасываем описание на дефолтное (пустая строка)
  description.value = defaultFormSetting.descriptionKey;

  // Убираем checked у чекбоксов
  features.forEach((item) => {
    item.checked = false;
  });

  // Очищаем загруженные фотки объявления
  photos.innerHTML = '';

};





// меняет количество гостей на 1 при загрузке страницы и блокирует остальные
document.addEventListener('DOMContentLoaded', function() {
  if (roomNumberSelect.value === '1') {
    capacityOptions[2].removeAttribute('selected', '')
    capacityOptions[0].setAttribute('selected', '')
    capacityOptions[1].setAttribute('disabled', '');
    capacityOptions[2].setAttribute('disabled', '');
    capacityOptions[3].setAttribute('disabled', '');
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

const adFormDisabled = () => {
  adForm.classList.add('ad-form--disabled');

  for (let i = 0; i < adForm.children.length; i++) {
    adForm.children[i].setAttribute('disabled', 'disabled');
  }
};

adFormDisabled();


const enableFormsAndFilters = () => {

  mapFilters.classList.remove('map__filters--disabled');

  for (let i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].removeAttribute('disabled');
  }

  adForm.classList.remove('ad-form--disabled');

  for (let i = 0; i < adForm.children.length; i++) {
    adForm.children[i].removeAttribute('disabled');
  }
};

// Вспомогательная функция для записи координат по движению главной метки

const setCoordinates = (coordinates) => {
  address.setAttribute('readonly','readonly');
  address.value = `${  coordinates().lat.toFixed(5)  }, ${  coordinates().lng.toFixed(5)}`;
};

setCoordinates(getDefauldCoordinates);

makeInitialization(enableFormsAndFilters());




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
    }, 3000);


    setTimeout(() => {removeError(input);

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

  adForm.addEventListener('submit', function(evt){
    if (validation(this) == false) {
      evt.preventDefault()
    }

  });

  adForm.addEventListener('keyup', function(evt){
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
      resetImages();
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
  resetImages();
  setCoordinates(getDefauldCoordinates);
});


onSubmitAdForm(() => {
  showSuccessMessage();
  resetAdForm();
}, showErrorMessage);

mapFiltersDisabled();
adFormDisabled();

export {enableFormsAndFilters, adFormDisabled,  setCoordinates};

