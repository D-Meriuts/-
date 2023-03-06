import {addZeros, getRandomNumber, getRandomElementArray, getRandomElementsArray } from './functions.js';

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const AFTERCOMMA = 5;

const AVATAR_COUNT = {
  min: 1,
  max: 10,
};

const COORDINATES = {
  x: {min: 35.65000, max: 35.70000},
  y: {min: 139.70000, max: 139.80000},
};

const TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const Titles = [
  'Квартира мечты',
  'Евро-двушка',
  'Квартира в центре',
  'Однушка в спальном районе',
  'Квартира',
];

const Price = {
  min: 1000,
  max: 1500,
};

const RandomNumber = {
  min: 1,
  max: 20,
};

const Description = [
  'Солнечная сторона',
  'Вся мебель новая',
  'Во дворе есть десткая площадка',
  'В цену входит паркинг',
  'В цену входит к/у',
  'Заезжай и живи',
];

const getRandomLocation = () => {
  return { x: getRandomNumber(COORDINATES.x.min, COORDINATES.x.max, AFTERCOMMA) , y: getRandomNumber(COORDINATES.y.min, COORDINATES.y.max, AFTERCOMMA)};
};

const createAdvertisement = (location) => {
  return {
    author: {
      avatar: 'img/avatars/user' + addZeros(getRandomNumber(AVATAR_COUNT.min, AVATAR_COUNT.max), 2) + '.png',
    },
    offer: {
      title: getRandomElementArray(Titles),
      address: `${location.x}, ${location.y}`,
      price: getRandomNumber(Price.min, Price.max),
      type: getRandomElementArray(TYPE),
      rooms: getRandomNumber(RandomNumber.min, RandomNumber.max),
      guests: getRandomNumber(RandomNumber.min, RandomNumber.max),
      checkin: getRandomElementArray(TIME),
      checkout: getRandomElementArray(TIME),
      features: getRandomElementsArray(FEATURES),
      description: getRandomElementsArray(Description),
      photos: getRandomElementsArray(PHOTOS),
    },
    location: location,
  };
};

const createAdvertisementList = (offersCount) => {
  const array = [];
  while (offersCount > 0) {
    const location = getRandomLocation(COORDINATES);
    array.push(createAdvertisement(location));
    offersCount--;
  }
  return array;
};

export default createAdvertisementList;
