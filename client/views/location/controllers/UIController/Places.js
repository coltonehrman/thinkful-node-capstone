import $ from 'jquery';
import DOM from './DOM';
import Place from '../../components/Place';

function hideProgress() {
  $(DOM.progress).hide();
}

function display(results) {
  const places = results || [];
  places.unshift(null);
  if (places.length === 0) {
    // show no places
  }
  places.map((place) => {
    return new Place(place);
  })
  .forEach((place, i) => {
    if (i % 2 === 0) {
      const $newRow = $('<div class="row"></div>');
      $newRow.append(place.$element);
      $(DOM.places).append($newRow);
    } else {
      $(DOM.places).find('.row').last().append(new Place(place));
    }
  });
}

export default {
  hideProgress,
  display,
};
