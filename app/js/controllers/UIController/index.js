/* global $ */
import DOM from './DOM';

export { DOM };
export default {
  placeClicked(place) {
    $(DOM.screens).hide();
    $(DOM.placeScreen).show();
    $(DOM.placeName).text(place.name);
  },
  loadAttractions(attractions) {
  },
};
export { default as Search } from './Search';
export { default as Place } from './Place';
