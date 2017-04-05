import $ from 'jquery';
import 'jquery-bar-rating';
import state from '../../modules/state';
import DOM from './DOM';
import Place from '../../components/Place';

let progressVisible = true;

function toggleProgress() {
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

function appendPlaces(places) {
  const $placeResults = $(DOM.placeResults);
  places.forEach((place, i) => {
    if (i % 2 === 0) {
      const $row = $('<div class="row"></div>');
      $row.append(place.$element);
      $placeResults.append($row);
    } else {
      $placeResults.find('.row').last().append(place.$element);
    }
  });
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
    const placeCategories = places.map(place => place.category);
    const categories = placeCategories.filter((cat, i) =>
      placeCategories.indexOf(cat) === i,
    );

    clearCategories();

    categories.forEach(cat => $(DOM.categoryContainer).append(
      `<a class="${DOM.categories.slice(1)} waves-effect btn-flat btn">${cat}</a>`,
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

    appendPlaces(state.places);
  },
  displayPlacesByFilter(category) {
    const $placeResults = $(DOM.placeResults);
    const placesToShow = state.places.filter(place =>
      place.place.category === category,
    );

    if ($placeResults.children().length >= 1) {
      $placeResults.empty();
    }

    appendPlaces(placesToShow);
  },
  getMap($place) {
    return state.places.find(place => place.$element.is($place)).map;
  },
  showMap($place) {
    state.places.find(place => place.$element.is($place)).createMap();
  },
  reset() {
    toggleProgress();
    clearCategories();
    clearPlaces();
  },
};
