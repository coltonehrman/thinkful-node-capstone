import $ from 'jquery';

const API_ENDPOINT = '/locations';

function findByName(name) {
  return new Promise((resolve, reject) => {
    $.ajax(`${API_ENDPOINT}`, {
      data: { name },
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

function createLocation(name) {
  return new Promise((resolve, reject) => {
    $.ajax(`${API_ENDPOINT}`, {
      data: { name },
      method: 'POST',
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
  findByName,
  createLocation,
};
