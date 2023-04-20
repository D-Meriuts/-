import {enableForms, setCoordinates} from './form.js'
// import { createAdsArray} from './data.js';
import { createCard } from './card.js';
import { getDefauldCoordinates } from './data.js';



// Установка начального состояния карты

const map = L.map('map-canvas');

const makeInitialization = () => {

  map.on('load', () => {
    enableForms();
    setCoordinates(getDefauldCoordinates);
  });
};


const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: getDefauldCoordinates().lat,
    lng: getDefauldCoordinates().lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Получение адреса главной метки от ее перемещения по карте

mainPinMarker.on('moveend', (evt) => {
  const getNewCoordinates = () => evt.target.getLatLng();
  setCoordinates(getNewCoordinates);
});

//  Функция возвращения карты в начальное состояние

const resetMap = () => {
  map.setView({
    lat: getDefauldCoordinates().lat,
    lng: getDefauldCoordinates().lng,
  }, 12);

  mainPinMarker.setLatLng([getDefauldCoordinates().lat, getDefauldCoordinates().lng]).update();
};

resetMap();

// Вывод маркеров объявлений на основе данных сгенерированного массива объявлений

const setAdsToMap = (adsList) => {
  adsList.forEach((adsListElement) => {
    const icon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      {
        lat: adsListElement.location.lat,
        lng: adsListElement.location.lng,
      },
      {
        icon,
      },
    );
    marker
      .addTo(map)
      .bindPopup(
        createCard(adsListElement),
        {
          keepInView: true,
        },
      );
  });
};

export {setAdsToMap, resetMap, makeInitialization};

// // Загрузка карты и включение доступа к форме по загрузке
// const map = L.map('map-canvas')
//   .on('load', () => {
//     enableForms();
//   })
//   .setView({
//     lat: DEFAULT_COORDINATES.lat,
//     lng: DEFAULT_COORDINATES.lng,
//   }, 12);

// L.tileLayer(
//   'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
// {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//   },
// ).addTo(map);

// // Установка главной метки
// const mainPinIcon = L.icon({
//   iconUrl: '../img/main-pin.svg',
//   iconSize: [52, 52],
//   iconAnchor: [26, 52],
// });

// const mainPinMarker = L.marker(
//   {
//     lat: DEFAULT_COORDINATES.lat,
//     lng: DEFAULT_COORDINATES.lng,
//   },
//   {
//     draggable: true,
//     icon: mainPinIcon,
//   },
// );

// mainPinMarker.addTo(map);

// // Получение адреса главной метки от ее перемещения по карте
// mainPinMarker.on('moveend', (evt) => {
//   const newCoordinates = evt.target.getLatLng();
//   setCoordinates(newCoordinates);
// });

// // Функция возвращения карты в начальное состояние

// const resetMap = () => {
//   map.setView({
//     lat: DEFAULT_COORDINATES.lat,
//     lng: DEFAULT_COORDINATES.lng,
//   }, 12);

//   mainPinMarker.setLatLng().update();
// };

// resetMap();



// const resetAddress = () => {
//   marker.setLatLng(TOKYO);
//   setAddresInputValue(getAddress(marker.getLatLng()));
// };

// // Вывод маркеров объявлений на основе данных сгенерированного массива объявлений
// adsList.forEach((offer) => {
//   const icon = L.icon({
//     iconUrl: '../img/pin.svg',
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//   });

//   const marker = L.marker(
//     {
//       lat: offer.location.x,
//       lng: offer.location.y,
//     },
//     {
//       icon,
//     },
//   );
//   marker
//     .addTo(map)
//     .bindPopup(
//       createCard(offer),
//       {
//         keepInView: true,
//       },
//     );
// });


// // // добавление карты
// // /* global L:readonly */
// // const map = L.map('map-canvas')
// //   .on('load', () => {
// //     addformAndMapFiltersEnabled();
// //   })
// //   .setView({
// //     lat: DEFAULT_COORDINATES.lat,
// //     lng: DEFAULT_COORDINATES.lng,
// //   }, 12);

// // L.tileLayer(
// //   'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
// //   {
// //     // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
// //   },
// // ).addTo(map);

// // // главная иконка маркера
// // const mainPinIcon = L.icon({
// //   iconUrl: './img/main-pin.svg',
// //   iconSize: [52, 52],
// //   iconAnchor: [26, 52],
// // });

// // // обычная иконка маркера
// // const pinIcon = L.icon({
// //   iconUrl: './img/pin.svg',
// //   iconSize: [40, 40],
// //   iconAnchor: [20, 40],
// // })

// // // добавление маркера на карту
// // const marker = L.marker(
// //   {
// //     lat: DEFAULT_COORDINATES.lat,
// //     lng: DEFAULT_COORDINATES.lng,
// //   },
// //   {
// //     draggable: true,
// //     icon: mainPinIcon,
// //   },
// // );
// // marker.addTo(map)

// // address.value = getAddress(marker.getLatLng());

// // marker.on('moveend', (evt) => {
// //   address.value = getAddress(evt.target.getLatLng());
// // });

// // advertisementList.forEach(offer => {
// //   L.marker(
// //     {
// //       lat: offer.location.x,
// //       lng: offer.location.y,
// //     },
// //     {
// //       icon: pinIcon,
// //       keepInView: true,
// //     },
// //   ).addTo(map)
// //     .bindPopup(createCard(offer));
// // });
