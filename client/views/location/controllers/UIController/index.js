import $ from 'jquery';
import DOM from './DOM';
import Places from './Places';

function isLoggedIn() {
  return $('.is-logged-in').val() === 'true';
}

export {
  DOM,
  Places,
  isLoggedIn,
};
