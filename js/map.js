import {addformAndMapFiltersEnabled, address} from './form.js'
import { getAddress } from './util.js';
// import { advertisementList} from './data.js';
import { createCard } from './generate-cards.js';

const DEFAULT_COORDINATES = { lat: 35.652832, lng: 139.839478};

// добавление карты
/* global L:readonly */
const map = L.map('map-canvas')
  .on('load', () => {
    addformAndMapFiltersEnabled();
  })
  .setView({
    lat: DEFAULT_COORDINATES.lat,
    lng: DEFAULT_COORDINATES.lng,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
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

address.value = getAddress(marker.getLatLng());

marker.on('moveend', (evt) => {
  address.value = getAddress(evt.target.getLatLng());
});

// advertisementList.forEach(offer => {
//   L.marker(
//     {
//       lat: offer.location.x,
//       lng: offer.location.y,
//     },
//     {
//       icon: pinIcon,
//       keepInView: true,
//     },
//   ).addTo(map)
//     .bindPopup(createCard(offer));
// });
import { getData } from './data.js';

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
  renderOffers(offers);
})
