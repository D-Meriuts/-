import './data.js';
import './card.js';
import './form.js';
import './map.js';
import {setAdsToMap} from './map.js';
import {getData} from './api.js';
const ADS_COUNT = 10;

getData((adsList) => {
  // setAdsToMap(adsList.slice(0, ADS_COUNT));
  setAdsToMap(adsList);
});

