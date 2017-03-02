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
      ).catch(() =>
        Search.hideResults(),
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
        Place.hideProgress();
        Place.displayPlaces(attractions);
      });
    });
  });

  $(document).on('click', DOM.categorySelector, (e) => {
    const $categories = $(DOM.categorySelector);
    const $target = $(e.target);
    const category = $target.text();

    $categories.addClass('btn-flat');
    $target.removeClass('btn-flat');
    Place.displayPlacesByFilter(category);
  });

  $(DOM.backButton).on('click', () => {
    UIController.goBack();
  });
}

function init() {
  $(DOM.homeScreen).show();
  setupEventListeners();
}

$(init);
