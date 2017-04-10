/* global window google document */
/* eslint comma-dangle: ["error", "ignore"] */
import 'styles'; // eslint-disable-line
import $ from 'jquery';
import { autocomplete } from './lib/google';
import UIController, { DOM } from './controllers/UIController';
import APIController from './controllers/APIController';
import state from './state';

function setupEventListeners() {
  const $placeSearch = $(DOM.placeSearch);

  $placeSearch.on('keyup', () => {
    const search = $placeSearch.val().trim();
    if (search === '') {
      UIController.Search.hideResults();
    } else {
      UIController.Search.clearResults();
      autocomplete(search).then(results =>
        UIController.Search.displayResults(results)
      )
      .catch(() =>
        UIController.Search.hideResults()
      );
    }
  });

  $(document).on('click', DOM.searchResult, (e) => {
    const $place = $(e.target).parents(DOM.searchResult);
    const name = $place.text().trim();

    UIController.Search.clear();
    UIController.Location.setLocationName(name);
    UIController.Screen.goTo(DOM.placeScreen);

    APIController.findByName(APIController.locations, name)
      .then((location) => {
        if (location.length === 0 || location.places.length === 0) {
          return UIController.Location.displayPlaces(state.places);
        }
        return APIController.findByIds(APIController.places, location.places);
      })
      .then((places) => {

      })
      .catch(err => console.log(err));
  });

  $(DOM.placeResults).on('click', DOM.placeAddBtn, () => {
    state.places[0].toForm();
  });

  $(document).on('click', DOM.googleMapActivator, (e) => {
    const $place = $(e.target).parents(DOM.place);
    UIController.Location.showMap($place);
    window.currentMap = UIController.Location.getMap($place);
  });
}

function init() {
  UIController.Screen.goTo(DOM.homeScreen);
  UIController.Search.focus();
  setupEventListeners();
}

$(init);
