/* global window document */
import $ from 'jquery';
import { autocomplete, service } from './googleAPI';
import UIController, { DOM } from './UIController';

const $placeSearch = $(DOM.placeSearch);

function placeSearchChanged(placeSearch) {
  if (placeSearch.trim() === '') {
    UIController.hideSearchResults();
  } else {
    autocomplete.getQueryPredictions({
      input: placeSearch,
    }, (data) => {
      const results = data.map(place => ({
        name: place.description,
        id: place.place_id,
      }));
      UIController.displaySearchResults(results);
    });
  }
}

function getPlaceDetails(place) {
  $.ajax('https://api.foursquare.com/v2/venues/explore', {
    data: {
      client_id: 'HIRHIF3ESK5TAJTKTU0HQDMY3KABRJSFN3EA1SSOE2ULSCWH',
      client_secret: 'GACVTXG4OQ5KKICSQBNNHM5DPBGZGCLR0D0JG5LEX5TWMIOL',
      near: place,
      m: 'foursquare',
      v: 20170101,
    },
  }).done((...args) => console.log(args));
}

function placeClicked(place) {
  const $place = $(place);
  const name = $place.text().trim();
  const placeId = $place.data('place-id').trim();
  UIController.placeClicked({
    name, placeId,
  });
  getPlaceDetails(name);
  service.getDetails({
    placeId,
  }, (...args) => {
    console.log(args);
  });
  // navigator.geolocation.getCurrentPosition((...args) => {
  //   console.log(args);
  // }, (...args) => {
  //   console.log(args);
  // });
}

$placeSearch.on('keyup', () => {
  const placeSearchValue = $placeSearch.val();
  placeSearchChanged(placeSearchValue);
});

$(document).on('click', DOM.searchResult, (e) => {
  placeClicked(e.target);
});
