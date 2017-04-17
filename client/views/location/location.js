/* global google document */
/* eslint func-names: 0 */
import 'styles'; // eslint-disable-line
import $ from 'jquery';
import { autocomplete } from 'google'; // eslint-disable-line
import APIController from './controllers/APIController';
import { DOM, Places } from './controllers/UIController';
import Place from './components/Place';
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
        const placeId = state.places.length;
        const newPlace = new Place(place, placeId);
        state.places[id].cancelForm();
        state.places.push(newPlace);
        Places.add(newPlace);
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

  $(DOM.places).on('click', DOM.placeDeleteBtn, function () {
    const $place = $(this).parents(DOM.place);
    const id = $place.data('id');
    const place = state.places[id];
    place.delete()
      .then(() => {
        state.places.splice(id, 1);
        Places.clear();
        Places.display(state.places);
      })
      .catch(err => console.log(err));
  });
}

function init() {
  setupEventListeners();
  APIController.findPlaces()
    .then((places) => {
      Places.hideProgress();
      state.places = places || [];
      state.places.unshift(null);
      state.places = state.places.map((place, i) => new Place(place, i));
      Places.display(state.places);
    })
    .catch(err => console.log(err));
}

$(init);
