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

// const getData = (onSuccess, onFail) => {
//   fetch(GET_DATA_URL)
//     .then((response) => response.json())
//     .then((offers) => {
//       onSuccess(offers.slice(0, OFFERS_COUNT));
//     })
//     .catch(() => {
//       onFail('Ошибка загрузки данных с сервера');
//     });
// };

// const sendData = (onSuccess, onFail, body) => {
//   fetch(SEND_DATA_URL,
//     {
//       method: 'POST',
//       body: body,
//     },
//   )
//     .then((response) => {
//       if (response.ok) {
//         onSuccess();
//       } else {
//         onFail('Ошибка загрузки данных с сервера');
//       }
//     })
//     .catch(() => {
//       onFail('Ошибка загрузки данных с сервера');
//     });
// };

const getData = (onSuccess, onFail) => {
  fetch(GET_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Ошибка загрузки данных с сервера');
    })
    .then((cards) => onSuccess(cards))
    .catch((er) => {
      er.message = 'Ошибка загрузки данных с сервера';
      onFail(er);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(SEND_DATA_URL,
    {
      method: 'POST',
      body: body,
    }
  )
    .then((response) => response.ok ? onSuccess() : onFail())
    .catch(() => {
      onFail();
    });
};


export {TRANSLATE_TYPE, OFFERS_COUNT, createOfferPhotos, createOfferFeatures, getData, sendData};


