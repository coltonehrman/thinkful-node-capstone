import $ from 'jquery';
import DOM from './DOM';
import state from '../../state';

function hideProgress() {
  $(DOM.progress).hide();
}

function appendPlace(place, id) {
  if (id % 2 === 0) {
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

function display(places) {
  if (places.length === 0) {
    // show no places
  }
  state.places.forEach(appendPlace);
}

function add(place) {
  appendPlace(place, place.id);
}

export default {
  hideProgress,
  clear,
  display,
  add,
};
