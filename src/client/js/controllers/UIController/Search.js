/* global $ */
import DOM from './DOM';

function hideResults() {
  $(DOM.searchResults).hide();
}

function clearResults() {
  $(DOM.searchResults).empty();
}

export default {
  hideResults,
  clearResults,
  focus() {
    $(DOM.placeSearch).focus();
  },
  displayResults(results) {
    const $searchResults = $(DOM.searchResults);
    $searchResults.empty();

    results.forEach((result) => {
      $searchResults.append(
        `<li class="${DOM.searchResult.slice(1)}" data-place-id="${result.id}">
          <span>${result.name}</span>
        </li>`,
      );
    });

    $searchResults.show();
  },
  clear() {
    $(DOM.placeSearch).val('');
    clearResults();
    hideResults();
  },
};
