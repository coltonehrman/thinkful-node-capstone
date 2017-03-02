/* global $ */
import state from '../../modules/state';
import DOM from './DOM';
import Place from '../../components/Place';

let progressVisible = true;

function toggleProgress() {
  console.log(progressVisible);
  if (progressVisible) {
    progressVisible = false;
    $(DOM.progressBar).hide();
  } else {
    progressVisible = true;
    $(DOM.progressBar).show();
  }
}

function setPlaceName(name) {
  $(DOM.placeName).text(name);
}

function clearCategories() {
  $(DOM.categories).remove();
}

function clearPlaces() {
  $(DOM.placeResults).empty();
}

export default {
  setPlaceName,
  toggleProgress,
  displayPlaces(places) {
    const $placeResults = $(DOM.placeResults);
    const placeCategories = places.map(place => place.category);
    const categories = placeCategories.filter((cat, i) =>
      placeCategories.indexOf(cat) === i,
    );

    clearCategories();

    categories.forEach(cat => $placeResults.before(
      `<a class="category waves-effect waves-teal btn-flat btn">${cat}</a>`,
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
  reset() {
    toggleProgress();
    clearCategories();
    clearPlaces();
  },
};
