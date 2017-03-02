/* global $ document */
import state from './modules/state';
import { autocomplete, getLatLong } from './lib/google';
import UIController, { DOM, Search, Place } from './controllers/UIController';
import AttractionsController from './controllers/AttractionsController';

function setupEventListeners() {
  const $placeSearch = $(DOM.placeSearch);

  $placeSearch.on('keyup', () => {
    const search = $placeSearch.val().trim();
    if (search === '') {
      Search.hideResults();
    } else {
      Search.clearResults();
      autocomplete(search).then(results =>
        Search.displayResults(results),
      );
    }
  });

  $(document).on('click', DOM.searchResult, (e) => {
    const $place = $(e.target);
    const name = $place.text().trim();
    const placeId = $place.data('place-id').trim();
    state.placeId = placeId;

    UIController.placeClicked({
      name, placeId,
    });

    getLatLong(state.placeId).then((loc) => {
      AttractionsController.findAttractions(loc).then((attractions) => {
        console.log(attractions);
        Place.displayPlaces(attractions);
      });
    });
  });

  $(document).on('click', DOM.categorySelector, (e) => {
    const category = $(e.target).text();
    const $places = $(DOM.place);

    const $placesToShow = $places.filter((id, place) => {
      const placeCategory = $(place).data('category');
      return placeCategory === category;
    });

    const $placesToHide = $places.filter((id, place) => {
      const placeCategory = $(place).data('category');
      return placeCategory !== category;
    });

    $placesToShow.show().fadeIn();
    $placesToHide.fadeOut(400, (...args) => {
      $placesToHide.hide();
    });
  });
}

function init() {
  $(DOM.homeScreen).show();
  setupEventListeners();
}

$(init);
