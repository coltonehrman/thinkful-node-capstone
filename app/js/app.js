/* global window google $ document */
import { autocomplete, getLatLong } from './lib/google';
import UIController, { DOM } from './controllers/UIController';
import AttractionsController from './controllers/AttractionsController';

function setupEventListeners() {
  const $placeSearch = $(DOM.placeSearch);

  $placeSearch.on('keyup', () => {
    const search = $placeSearch.val().trim();
    if (search === '') {
      UIController.Search.hideResults();
    } else {
      UIController.Search.clearResults();
      autocomplete(search).then(results =>
        UIController.Search.displayResults(results),
      ).catch(() =>
        UIController.Search.hideResults(),
      );
    }
  });

  $(document).on('click', DOM.searchResult, (e) => {
    const $place = $(e.target).parents(DOM.searchResult);
    const name = $place.text().trim();
    const placeId = $place.data('place-id').trim();

    UIController.Search.clear();
    UIController.Place.setPlaceName(name);
    UIController.Screen.goTo(DOM.placeScreen);

    getLatLong(placeId).then((loc) => {
      AttractionsController.findAttractions(loc).then((attractions) => {
        UIController.Place.toggleProgress();
        UIController.Place.displayPlaces(attractions);
      });
    });
  });

  $(document).on('click', DOM.categories, (e) => {
    const $categories = $(DOM.categories);
    const $target = $(e.target);
    const category = $target.text();

    $categories.addClass('btn-flat');
    $target.removeClass('btn-flat');
    UIController.Place.displayPlacesByFilter(category);
  });

  $(DOM.backButton).on('click', () => {
    UIController.Screen.goTo(DOM.homeScreen);
    UIController.Search.focus();
    UIController.Place.reset();
  });

  $(document).on('click', DOM.googleMapActivator, (e) => {
    const $place = $(e.target).parents(DOM.place);
    UIController.Place.showMap($place);
    window.currentMap = UIController.Place.getMap($place);
  });
}

function init() {
  UIController.Screen.goTo(DOM.homeScreen);
  UIController.Search.focus();
  setupEventListeners();
}

$(init);
