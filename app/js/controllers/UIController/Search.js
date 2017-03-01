/* global $ */
import DOM from './DOM';

export default {
  hideResults() {
    $(DOM.searchResults).hide();
  },
  clearResults() {
    $(DOM.searchResults).empty();
  },
  displayResults(results) {
    const $searchResults = $(DOM.searchResults);
    $searchResults.empty();

    results.forEach((result) => {
      $searchResults.append(
        `<a href="#!" class="collection-item ${DOM.searchResult.slice(1)}" data-place-id="${result.id}">
          ${result.name}
        </a>`,
      );
    });

    $searchResults.show();
  },
};
