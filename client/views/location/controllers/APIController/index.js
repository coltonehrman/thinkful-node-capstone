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
    .done(res => resolve(res))
    .fail((xhr) => {
      const message = JSON.parse(xhr.responseText).message;
      reject(message);
    });
  });
}

function createPlace({ name, description }) {
  return new Promise((resolve, reject) => {
    $.ajax(API_ENDPOINT, {
      data: { name, description, location: LOCATION_ID },
      method: 'POST',
    })
    .done(res => resolve(res))
    .fail((xhr) => {
      const message = JSON.parse(xhr.responseText).message;
      reject(message);
    });
  });
}

export default {
  findPlaces,
  createPlace,
};
