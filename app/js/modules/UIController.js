import $ from 'jquery';

const DOM = {
  screens: '.screen',
  homeScreen: '.screen.home',
  placeSearch: '.place-search',
  searchResults: '.results',
  searchResult: '.results__item',
  placeScreen: '.screen.place',
  placeName: '.place__name',
};

export {
  DOM,
};

export default {
  hideSearchResults() {
    $(DOM.searchResults).hide();
  },
  displaySearchResults(results) {
    const $searchResults = $(DOM.searchResults);
    $searchResults.empty();

    results.forEach((result) => {
      $searchResults.append(
        `<li class="${DOM.searchResult.slice(1)}" data-place-id="${result.id}">
          ${result.name}
        </li>`,
      );
    });

    $searchResults.show();
  },
  placeClicked(place) {
    $(DOM.screens).hide();
    $(DOM.placeScreen).show();
    $(DOM.placeName).text(place.name);
  },
};
