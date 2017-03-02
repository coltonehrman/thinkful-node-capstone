/* global $ */
import state from '../../modules/state';
import DOM from './DOM';
import Place from '../../components/Place';

export default {
  hideProgress() {
    $(DOM.progressBar).hide();
  },
  displayPlaces(places) {
    const $placeResults = $(DOM.placeResults);

    let categories = places.map(place => place.category);
    categories = categories.filter((cat, i) => categories.indexOf(cat) === i);

    categories.forEach(cat => $placeResults.before(
      `<a class="category-selector waves-effect waves-teal btn-flat btn">${cat}</a>`,
    ));

    state.places = places.map(place => new Place(place)).sort((a, b) => {
      if (typeof a.place.photo !== 'undefined') {
        if (typeof b.place.photo !== 'undefined') {
          return 0;
        }
        return -1;
      }
      return 1;
    });
    state.places.forEach((place, i) => {
      if (i % 2 === 0) {
        $placeResults.append($(`<div class="row"><div class="place col m6">${place.$element.html()}</div></div>`));
      } else {
        $placeResults.find('.row').last().append(place.$element);
      }
    });
  },
  displayPlacesByFilter(category) {
    const $placeResults = $(DOM.placeResults);
    const placesToShow = state.places.filter(place =>
      place.place.category === category,
    );

    if ($placeResults.children().length >= 1) {
      $placeResults.empty();
    }

    placesToShow.forEach((place, i) => {
      if (i % 2 === 0) {
        $placeResults.append($(`<div class="row"><div class="place col m6">${place.$element.html()}</div></div>`));
      } else {
        $placeResults.find('.row').last().append(place.$element);
      }
    });
  },
};
