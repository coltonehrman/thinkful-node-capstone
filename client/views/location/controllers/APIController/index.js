/* global window */
import $ from 'jquery';

const path = window.location.pathname.split('/');
const LOCATION_ID = path[path.length - 1];
const API_ENDPOINT = '/places';

function findPlaces() {
  return new Promise((resolve, reject) => {
    $.ajax(API_ENDPOINT, {
      data: { location_id: LOCATION_ID },
    })
    .done(resolve)
    .fail((xhr) => {
      const message = JSON.parse(xhr.responseText).message;
      reject(message);
    });
  });
}

function createPlace(data) {
  data.set('location', LOCATION_ID);
  return new Promise((resolve, reject) => {
    $.ajax(API_ENDPOINT, {
      data,
      method: 'POST',
      contentType: false,
      processData: false,
    })
    .done(resolve)
    .fail((xhr) => {
      const message = JSON.parse(xhr.responseText).message;
      reject(message);
    });
  });
}

function deletePlace(id) {
  return new Promise((resolve, reject) => {
    $.ajax(`${API_ENDPOINT}/${id}`, {
      method: 'DELETE',
    })
    .done(resolve)
    .fail((xhr) => {
      const message = JSON.parse(xhr.responseText).message;
      reject(message);
    });
  });
}

function submitReview(placeId, review) {
  return new Promise((resolve, reject) => {
    $.post('/reviews', {
      place_id: placeId,
      description: review,
    })
    .done(resolve)
    .fail((xhr) => {
      const message = JSON.parse(xhr.responseText).message;
      reject(message);
    });
  });
}

function isLoggedIn() {
  return new Promise((resolve, reject) => {
    $.get('/users/me')
      .done(resolve)
      .fail(reject);
  });
}

export default {
  findPlaces,
  createPlace,
  deletePlace,
  submitReview,
  isLoggedIn,
};
