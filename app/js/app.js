/* global google document */
import $ from 'jquery';
import state from './modules/state';
import UIController, { DOM } from './modules/UIController';
import SearchController from './modules/SearchController';
import AttractionsController from './modules/AttractionsController';

function setupEventListeners() {
  const $placeSearch = $(DOM.placeSearch);

  $placeSearch.on('keyup', () => {
    const text = $placeSearch.val().trim();
    if (text === '') {
      UIController.Search.hideResults();
    } else {
      UIController.Search.clearResults();
      SearchController.query(text)
        .then(results =>
          UIController.Search.displayResults(results),
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
  });

  $(DOM.attractionsBtn).on('click', () => {
    SearchController.getLatLong(state.placeId)
      .then((loc) => {
        AttractionsController.getAttractions(loc);
      });
  });
}

function init() {
  $(DOM.homeScreen).show();
  setupEventListeners();
}

$(init);

// function getPlaceDetails(place) {

// }

// function placeClicked(place) {
//
//   navigator.geolocation.getCurrentPosition((...args) => {
//     console.log(args);
//   }, (...args) => {
//     console.log(args);
//   });
// }
