import $ from 'jquery';

const API_ENDPOINT = '/places';

function findPlaces(locationId) {
  return new Promise((resolve, reject) => {
    $.ajax(API_ENDPOINT, {
      data: { location_id: locationId },
    })
    .done((res) => {
      resolve(res);
    })
    .fail((xhr) => {
      const message = JSON.parse(xhr.responseText).message;
      reject(message);
    });
  });
}

export default {
  findPlaces,
};
