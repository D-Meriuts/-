import {createAdvertisement, getTanslateType, createOfferPhotos, createOfferFeatures} from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const mapCanvas = document.querySelector('#map-canvas');
const offer = createAdvertisement();

const createCard = (createAdvertisement) => {
  var card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__title').textContent = createAdvertisement.offer.title;

  card.querySelector('.popup__text--address').textContent = createAdvertisement.offer.address;

  card.querySelector('.popup__text--price').textContent = `${createAdvertisement.offer.price} ₽/ночь`;

  card.querySelector('.popup__type').textContent = getTanslateType(createAdvertisement.offer.type);

  card.querySelector('.popup__text--capacity').textContent = `${createAdvertisement.offer.rooms} комнаты для ${createAdvertisement.offer.guests} гостей`;

  card.querySelector('.popup__text--time').textContent = `Заезд после ${createAdvertisement.offer.checkin}, выезд до ${createAdvertisement.offer.checkout}`;

  card.querySelector('.popup__features').innerHTML = '';
  card.querySelector('.popup__features').appendChild(createOfferFeatures(createAdvertisement.offer.features));

  card.querySelector('.popup__description').innerHTML = '';
  card.querySelector('.popup__description').textContent = createAdvertisement.offer.description;

  card.querySelector('.popup__photos').innerHTML = '';
  card.querySelector('.popup__photos').appendChild(createOfferPhotos(createAdvertisement.offer.photos));

  card.querySelector('.popup__avatar').src = createAdvertisement.author.avatar;

  return card
};

const cardItem = createCard(offer);
mapCanvas.appendChild(cardItem)
