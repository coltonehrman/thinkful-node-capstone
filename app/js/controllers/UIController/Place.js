/* global $ */
import DOM from './DOM';
import Place from '../../components/Place';

export default {
  displayPlaces(places) {
    const $placeResults = $(DOM.placeResults);

    let categories = places.map(place => place.category);
    categories = categories.filter((cat, i) => categories.indexOf(cat) === i);

    categories.forEach(cat => $placeResults.before(
      `<a class="category-selector waves-effect waves-teal btn-flat">${cat}</a>`,
    ));

    places.forEach((place) => {
      $placeResults.append(
        new Place(place).render(),
      );
    });
  },
};
