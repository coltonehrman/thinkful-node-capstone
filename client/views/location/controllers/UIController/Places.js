/* global Materialize */
import $ from 'jquery';
import 'materialize'; // eslint-disable-line
import DOM from './DOM';
import state from '../../state';

function hideProgress() {
  $(DOM.progress).hide();
}

function appendPlace(place, index) {
  if (index % 2 === 0) {
    const $newRow = $('<div class="row"></div>');
    $newRow.append(place.$element);
    $(DOM.places).append($newRow);
  } else {
    $(DOM.places).find('.row').last().append(place.$element);
  }
}

function clear() {
  $(DOM.places).empty();
}

function showToast() {
  Materialize.toast('There are currently no places in this location yet!<br>Be the first to add one!');
}

function hideToast() {
  $('.toast').fadeOut();
}

function display(placesCount) {
  if (placesCount <= 0) {
    showToast();
  }
  state.places.forEach(appendPlace);
}

export default {
  hideProgress,
  clear,
  display,
  appendPlace,
  hideToast,
};
