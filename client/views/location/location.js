/* global google document */
/* eslint func-names: 0 */
import 'styles'; // eslint-disable-line
import $ from 'jquery';
import { autocomplete } from 'google'; // eslint-disable-line
import APIController from './controllers/APIController';
import { DOM, Places } from './controllers/UIController';
import state from './state';

function setupEventListeners() {
  $(DOM.places).on('click', DOM.placeAddBtn, function () {
    const $place = $(this).parents(DOM.place);
    const id = $place.data('id');
    state.places[id].toForm();
  });

  $(DOM.places).on('click', DOM.placeCancelBtn, function () {
    const $place = $(this).parents(DOM.place);
    const id = $place.data('id');
    state.places[id].cancelForm();
  });

  $(DOM.places).on('click', DOM.placeCreateBtn, function () {
    const $place = $(this).parents(DOM.place);
    const id = $place.data('id');
    state.places[id].createPlace()
      .then((place) => {
        state.places[id].cancelForm();
        Places.add(place);
      })
      .catch(err => console.log(err));
  });

  $(DOM.places).on('click', `${DOM.placeAddPhotoBtn} a`, function () {
    const $fileInput = $(this).siblings('input');
    $fileInput.click();
  });

  $(DOM.places).on('change', `${DOM.placeAddPhotoBtn} input`, function () {
    const $place = $(this).parents(DOM.place);
    const id = $place.data('id');
    state.places[id].addPhoto(this.files[0]);
  });
}

function init() {
  setupEventListeners();
  APIController.findPlaces()
    .then((places) => {
      Places.hideProgress();
      Places.display(places || []);
    })
    .catch(err => console.log(err));
}

$(init);
