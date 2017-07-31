/* global window google document */
/* eslint comma-dangle: ["error", "ignore"] */
import 'styles'; // eslint-disable-line
import $ from 'jquery';
import { autocomplete } from 'google'; // eslint-disable-line
import { DOM, Search } from './controllers/UIController';
import APIController from './controllers/APIController';

function getSearchResults() {
  const $locationSearch = $(DOM.locationSearch);
  const search = $locationSearch.val().trim();

  console.log(search);

  if (search === '') {
    Search.hideResults();
  } else {
    Search.clearResults();
    autocomplete.cities(search)
      .then(Search.displayResults)
      .catch(Search.hideResults);
  }
}

function setupEventListeners() {
  const $locationSearch = $(DOM.locationSearch);

  $locationSearch.on('keyup', getSearchResults);

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
        console.log(location);
        window.location.replace(`/locations/${location.id}`);
      })
      .catch(err => console.log(err));
  });
}

function init() {
  setupEventListeners();
}

$(init);
