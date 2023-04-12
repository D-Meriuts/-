import {addZeros, getRandomNumber, getRandomElementArray, getRandomElementsArray } from './util.js';

const OFFER_PHOTO = { width: 45, height: 40 };

const GET_URL_DATA = 'https://23.javascript.pages.academy/keksobooking/data';

const OFFERS_COUNT = 10;

const TRANSLATE_TYPE = { flat: { ru: 'Квартира', minPrice: 1000 }, bungalow: { ru: 'Бунгало', minPrice: 0 }, hotel: {ru: 'Отель', minPrice: 3000 }, house: { ru: 'Дом', minPrice: 5000 }, palace: { ru: 'Дворец', minPrice: 10000 } };

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

// const AFTERCOMMA = 5;

// const AVATAR_COUNT = {
//   min: 1,
//   max: 8,
// };

// const COORDINATES = {
//   x: {min: 35.65000, max: 35.70000},
//   y: {min: 139.70000, max: 139.80000},
// };

// const TIME = [
//   '12:00',
//   '13:00',
//   '14:00',
// ];

// const FEATURES = [
//   'wifi',
//   'dishwasher',
//   'parking',
//   'washer',
//   'elevator',
//   'conditioner',
// ];

// const PHOTOS = [
//   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
// ];

// const Titles = [
//   'Квартира мечты',
//   'Евро-двушка',
//   'Квартира в центре',
//   'Однушка в спальном районе',
//   'Квартира',
// ];

// const Price = {
//   min: 1000,
//   max: 1500,
// };

// const NumberRange = {
//   min: 1,
//   max: 20,
// };

// const Description = [
//   'Солнечная сторона. ',
//   'Вся мебель новая. ',
//   'Во дворе есть десткая площадка. ',
//   'В цену входит паркинг. ',
//   'В цену входит к/у. ',
//   'Заезжай и живи. ',
// ];

// const getRandomLocation = () => {
//   return { x: getRandomNumber(COORDINATES.x.min, COORDINATES.x.max, AFTERCOMMA) , y: getRandomNumber(COORDINATES.y.min, COORDINATES.y.max, AFTERCOMMA)};
// };

// const createAdvertisement = () => {
//   const location = getRandomLocation(COORDINATES);
//   return {
//     author: {
//       avatar: 'img/avatars/user' + addZeros(getRandomNumber(AVATAR_COUNT.min, AVATAR_COUNT.max), 2) + '.png',
//     },
//     offer: {
//       title: getRandomElementArray(Titles),
//       address: `${location.x}, ${location.y}`,
//       price: getRandomNumber(Price.min, Price.max),
//       type: getRandomElementArray(TYPE),
//       rooms: getRandomNumber(NumberRange.min, NumberRange.max),
//       guests: getRandomNumber(NumberRange.min, NumberRange.max),
//       checkin: getRandomElementArray(TIME),
//       checkout: getRandomElementArray(TIME),
//       features: getRandomElementsArray(FEATURES),
//       description: getRandomElementsArray(Description).join(' '),
//       photos: getRandomElementsArray(PHOTOS),
//     },
//     location: location,
//   };
// };

// const createAdvertisementList = (objectCount) => {
//   const array = [];
//   while (objectCount > 0) {
//     const location = getRandomLocation(COORDINATES);
//     array.push(createAdvertisement(location));
//     objectCount--;
//   }
//   return array;
// };

// const advertisementList = createAdvertisementList(OFFERS_COUNT);

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

const getData = (onSuccess) => {
  fetch(GET_URL_DATA)
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers.slice(0, OFFERS_COUNT));
    })
    .catch((a) => {
      console.log(a)
    });
};



export {TRANSLATE_TYPE, createOfferPhotos, createOfferFeatures, getData};


