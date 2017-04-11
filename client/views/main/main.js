/* global window google document */
/* eslint comma-dangle: ["error", "ignore"] */
import 'styles'; // eslint-disable-line
import $ from 'jquery';
import { autocomplete } from 'google'; // eslint-disable-line
import { DOM, Search } from './controllers/UIController';
import APIController from './controllers/APIController';

function setupEventListeners() {
  const $placeSearch = $(DOM.placeSearch);

  $placeSearch.on('keyup', () => {
    const search = $placeSearch.val().trim();
    if (search === '') {
      Search.hideResults();
    } else {
      Search.clearResults();
      autocomplete.cities(search)
        .then(results => Search.displayResults(results))
        .catch(() => Search.hideResults());
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
}

function init() {
  Search.focus();
  setupEventListeners();
}

$(init);
