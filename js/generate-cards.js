import {/*createAdvertisement,*/ TRANSLATE_TYPE, createOfferFeatures, createOfferPhotos} from './data.js';

// const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');


// const offer = createAdvertisement();

const createCard = ({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}}) => {
  const card = cardTemplate.cloneNode(true);
  const offerAvatar = card.querySelector('.popup__avatar');
  const offerTitle = card.querySelector('.popup__title');
  const offerAdress = card.querySelector('.popup__text--address');
  const offerPrice = card.querySelector('.popup__text--price');
  const offerType = card.querySelector('.popup__type');
  const offerCapacity = card.querySelector('.popup__text--capacity');
  const offerTime = card.querySelector('.popup__text--time');
  const offerFeatures = card.querySelector('.popup__features');
  const offerDescription = card.querySelector('.popup__description');
  const offerPhotos = card.querySelector('.popup__photos');

  if (avatar) {offerAvatar.src = avatar} else {
    offerAvatar.src = 'img/avatars/default.png'
  }

  if (title) {
    offerTitle.textContent = title
  } else {
    offerTitle.remove();
  }

  if (address) {offerAdress.textContent = address} else {
    offerAdress.remove();
  }

  if (price) {offerPrice.textContent = `${price} ₽/ночь`} else {
    offerPrice.remove();
  }

  if (type) {offerType.textContent = TRANSLATE_TYPE[type].ru} else {
    offerType.remove();
  }

  if (rooms && guests) {offerCapacity.textContent = `${rooms} комнаты для ${guests} гостей`} else {
    offerCapacity.remove()
  }

  if (checkin && checkout) {offerTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`} else {
    offerTime.remove()
  }

  if (features) {
    offerFeatures.innerHTML = '';
    offerFeatures.appendChild(createOfferFeatures(features))
  } else {
    offerFeatures.remove()
  }

  if (description) {
    offerDescription.innerHTML = '';
    offerDescription.textContent = description;
  } else {
    offerDescription.remove()
  }

  if (photos) {
    offerPhotos.innerHTML = '';
    offerPhotos.appendChild(createOfferPhotos(photos));
  } else {
    offerPhotos.remove()
  }

  return card
}

// const cardItem = createCard(offer);
// mapCanvas.appendChild(cardItem)
export {createCard};

