/* global window google document */
/* eslint comma-dangle: ["error", "ignore"] */
import 'styles'; // eslint-disable-line
import $ from 'jquery';
import { autocomplete } from './lib/google';
import { DOM, Search } from './controllers/UIController';
import APIController from './controllers/APIController';
import state from './state';

function setupEventListeners() {
  const $placeSearch = $(DOM.placeSearch);

  $placeSearch.on('keyup', () => {
    const search = $placeSearch.val().trim();
    if (search === '') {
      Search.hideResults();
    } else {
      Search.clearResults();
      autocomplete(search).then(results =>
        Search.displayResults(results)
      )
      .catch(() =>
        Search.hideResults()
      );
    }
  });

  $(document).on('click', DOM.searchResult, (e) => {
    const $place = $(e.target).parents(DOM.searchResult);
    const name = $place.text().trim();

    Search.clear();

    APIController.findLocation(name)
      .then((location) => {
        if (!location) {
          return APIController.createLocation(name);
        }
        return location;
      })
      .then((location) => {
        window.location.replace(`/locations/${location.id}`);
      })
      .catch(err => console.log(err));
  });

  $(DOM.placeResults).on('click', DOM.placeAddBtn, () => {
    state.places[0].toForm();
  });

  // $(document).on('click', DOM.googleMapActivator, (e) => {
  //   const $place = $(e.target).parents(DOM.place);
  //   UIController.Location.showMap($place);
  //   window.currentMap = UIController.Location.getMap($place);
  // });
}

function init() {
  Search.focus();
  setupEventListeners();
}

$(init);
