/* global $ */
import state from '../../modules/state';
import DOM from './DOM';
import Place from '../../components/Place';

export default {
  displayPlaces(places) {
    const $placeResults = $(DOM.placeResults);

    let categories = places.map(place => place.category);
    categories = categories.filter((cat, i) => categories.indexOf(cat) === i);

    categories.forEach(cat => $placeResults.before(
      `<a class="category-selector waves-effect waves-teal btn-flat btn">${cat}</a>`,
    ));

    state.places = places.map(place => new Place(place));
    state.places.forEach((place, i) => {
      if (i % 2 === 0) {
        $placeResults.append($(`<div class="row"><div class="place col m6">${place.$element.html()}</div></div>`));
      } else {
        $placeResults.find('.row').last().append(place.$element);
      }
    });
    // $placeResults.append(state.places.map(place => place.$element));
  },
  displayPlacesByFilter(category) {
    const $placeResults = $(DOM.placeResults);
    const placesToShow = state.places.filter(place =>
      place.category === category,
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
