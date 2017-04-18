/* global google document */
/* eslint func-names: 0 */
import 'styles'; // eslint-disable-line
import $ from 'jquery';
import { autocomplete } from 'google'; // eslint-disable-line
import APIController from './controllers/APIController';
import { DOM, Places } from './controllers/UIController';
import Place from './components/Place';
import state from './state';

function getIndex(el) {
  const $place = $(el).parents(DOM.place);
  return $place.data('index');
}

function getPlace(el) {
  const index = getIndex(el);
  return state.places.find(place => place.index === index);
}

function setupEventListeners() {
  $(DOM.places).on('click', DOM.placeAddBtn, function () {
    getPlace(this).toForm();
  });

  $(DOM.places).on('click', DOM.placeCancelBtn, function () {
    getPlace(this).cancelForm();
  });

  $(DOM.places).on('click', DOM.placeCreateBtn, function () {
    const place = getPlace(this);
    place.createPlace()
      .then((data) => {
        const index = state.nextIndex;
        const newPlace = new Place(data, index);
        state.nextIndex += 1;
        place.cancelForm();
        state.places.push(newPlace);
        Places.appendPlace(newPlace, state.places.length - 1);
      })
      .catch(err => console.log(err));
  });

  $(DOM.places).on('click', `${DOM.placeAddPhotoBtn} a`, function () {
    const $fileInput = $(this).siblings('input');
    $fileInput.click();
  });

  $(DOM.places).on('change', `${DOM.placeAddPhotoBtn} input`, function () {
    getPlace(this).addPhoto(this.files[0]);
  });

  $(DOM.places).on('click', DOM.placeDeleteBtn, function () {
    const place = getPlace(this);
    place.delete()
      .then(() => {
        const index = state.places.findIndex(p => p.index === place.index);
        state.places.splice(index, 1);
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
      state.nextIndex = state.places.length;
      Places.display(state.places);
    })
    .catch(err => console.log(err));
}

$(init);
