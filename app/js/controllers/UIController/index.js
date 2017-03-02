/* global $ */
import DOM from './DOM';

export { DOM };
export default {
  goBack() {
    $(DOM.screens).hide();
    $(DOM.homeScreen).show();
    $(DOM.placeResults).empty();
  },
  placeClicked(place) {
    $(DOM.screens).hide();
    $(DOM.placeScreen).show();
    $(DOM.placeName).text(place.name);
  },
};
export { default as Search } from './Search';
export { default as Place } from './Place';
