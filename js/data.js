const OFFER_PHOTO = { width: 45, height: 40 };

const TRANSLATE_TYPE = { flat: { ru: 'Квартира', minPrice: 1000 }, bungalow: { ru: 'Бунгало', minPrice: 0 }, hotel: {ru: 'Отель', minPrice: 3000 }, house: { ru: 'Дом', minPrice: 5000 }, palace: { ru: 'Дворец', minPrice: 10000 } };

const getDefauldCoordinates = () => ({
  lat: 35.67519,
  lng: 139.73104,
});


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

export {TRANSLATE_TYPE, getDefauldCoordinates, createOfferPhotos, createOfferFeatures};
