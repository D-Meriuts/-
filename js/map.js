import {adFormAndMapFiltersEnabled, setAddresInputValue} from './form.js'
import { getAddress, showErrorMessage } from './util.js';
import { createCard } from './generate-cards.js';
import { getData, OFFERS_COUNT} from './data.js';

const DEFAULT_COORDINATES = { lat: 35.67752, lng: 139.74944};

// добавление карты
/* global L:readonly */

const map = L.map('map-canvas', {fadeAnimation: false});

map.on('load', () => {
  setTimeout(() => {
    adFormAndMapFiltersEnabled();
  }, 0);
})
.setView({
  lat: DEFAULT_COORDINATES.lat,
  lng: DEFAULT_COORDINATES.lng,
}, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// главная иконка маркера
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// обычная иконка маркера
const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
})

// добавление маркера на карту
const marker = L.marker(
  {
    lat: DEFAULT_COORDINATES.lat,
    lng: DEFAULT_COORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
marker.addTo(map)


marker.on('moveend', (evt) => {
  setAddresInputValue(getAddress(evt.target.getLatLng()));
});

const resetAddress = () => {
  marker.setLatLng(DEFAULT_COORDINATES);
  setAddresInputValue(getAddress(marker.getLatLng()));
};




const renderOffers = (offers) => {
  offers.forEach(offer => {
    L.marker(
      {
        lat: offer.location.lat,
        lng: offer.location.lng,
      },
      {
        icon: pinIcon,
      },
    ).addTo(map)
      .bindPopup(createCard(offer));
  });
}

getData((offers) => {
  renderOffers(offers.slice(0, OFFERS_COUNT));
}, showErrorMessage);

export {resetAddress}
