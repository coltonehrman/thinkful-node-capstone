import $ from 'jquery';
import DOM from './DOM';
import Place from '../../components/Place';
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

function display(places) {
  places.unshift(null);
  if (places.length === 0) {
    // show no places
  }
  state.places = places.map((place, i) => new Place(place, i));
  console.log(state.places);
  state.places.forEach(appendPlace);
}

function add(place) {
  const id = state.places.length;
  const newPlace = new Place(place, id);
  state.places.push(newPlace);
  appendPlace(newPlace, id);
}

export default {
  hideProgress,
  display,
  add,
};
