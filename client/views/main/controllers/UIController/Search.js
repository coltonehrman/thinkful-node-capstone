/* eslint comma-dangle: ["error", "ignore"] */
import $ from 'jquery';
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
    $(DOM.locationSearch).focus();
  },
  displayResults(results) {
    const $searchResults = $(DOM.searchResults);
    $searchResults.empty();

    results.forEach((result) => {
      $searchResults.append(
        `<li class="${DOM.searchResult.slice(1)}">
          <span>${result.name}</span>
        </li>`
      );
    });

    $searchResults.show();
  },
  clear() {
    $(DOM.locationSearch).val('');
    clearResults();
    hideResults();
  },
};
