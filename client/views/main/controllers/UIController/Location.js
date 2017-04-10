/* eslint comma-dangle: ["error", "ignore"] */
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

function setLocationName(name) {
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

function clearPlaces() {
  $(DOM.placeResults).empty();
}

export default {
  setLocationName,
  toggleProgress,
  displayPlaces(places) {
    places.unshift(new Place(null));
    if (!places) {
      $(DOM.placeName).append('<h5><em>No Current Places</em></h5>');
    } else {

    }
    appendPlaces(places);
    toggleProgress();
  },
  getMap($place) {
    return state.places.find(place => place.$element.is($place)).map;
  },
  showMap($place) {
    state.places.find(place => place.$element.is($place)).createMap();
  },
  reset() {
    toggleProgress();
    clearPlaces();
  },
};
