const OFFER_PHOTO = { width: 45, height: 40 };

const GET_DATA_URL = 'https://23.javascript.pages.academy/keksobooking/data';

const SEND_DATA_URL = 'https://23.javascript.pages.academy/keksobooking';


const OFFERS_COUNT = 10;

const TRANSLATE_TYPE = { flat: { ru: 'Квартира', minPrice: 1000 }, bungalow: { ru: 'Бунгало', minPrice: 0 }, hotel: {ru: 'Отель', minPrice: 3000 }, house: { ru: 'Дом', minPrice: 5000 }, palace: { ru: 'Дворец', minPrice: 10000 } };

const createOfferPhotos = (photos) => {
  const photosListFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const cardPhoto = document.createElement('img');
    cardPhoto.classList.add('popup__photo');
    cardPhoto.src = photo;
    cardPhoto.width = OFFER_PHOTO.width;
    cardPhoto.height = OFFER_PHOTO.height;
    cardPhoto.alt = 'Фотография жилья';
    photosListFragment.appendChild(cardPhoto);
  });
  return photosListFragment;
};

const createOfferFeatures = (features) => {
  const featuresItemsFragment = document.createDocumentFragment();
  features.forEach((feature) => {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature');
    featureItem.classList.add(`popup__feature--${feature}`);
    featuresItemsFragment.appendChild(featureItem);
  });
  return featuresItemsFragment;
}


// Функция получения данных с сервера

const getData = (onSuccess) => {
  fetch(GET_DATA_URL)
    .then((response) => response.json())
    .then((adsList) => {
      onSuccess(adsList);
    })
    .catch(() => {
      showAlert('Не удалось получить данные с сервера.');
    });
};

// Функция отправки данных на сервер

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
      else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {TRANSLATE_TYPE, OFFERS_COUNT, createOfferPhotos, createOfferFeatures, getData, sendData};


