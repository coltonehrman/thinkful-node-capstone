/* global $ */
import DOM from './DOM';

function showScreen(selector) {
  $(DOM.screens).hide();
  $(selector).show();
}

export default {
  goTo(screen) {
    showScreen(screen);
  },
};
