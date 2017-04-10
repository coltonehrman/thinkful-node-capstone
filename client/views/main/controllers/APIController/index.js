import $ from 'jquery';

function findByName(url, name) {
  return new Promise((resolve, reject) => {
    $.ajax(`${url}?${$.param({ name })}`)
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
  locations: '/locations',
  findByName,
};
