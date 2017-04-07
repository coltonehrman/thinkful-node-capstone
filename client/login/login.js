/* global window */
import 'styles'; // eslint-disable-line
import $ from 'jquery';
import { DOM } from './controllers/UIController';

function setupEventListeners() {
  const $form = $(DOM.form);

  $form.on('submit', (e) => {
    const data = {};
    e.preventDefault();

    $form.serializeArray().forEach((field) => {
      data[field.name] = field.value;
    });

    $.ajax('/login', {
      data,
      method: 'POST',
    })
    .done((res) => {
      if (res.redirect) {
        window.location.replace(`http://${window.location.host}${res.redirect}`);
      }
      console.log(res);
    })
    .fail((xhr) => {
      const message = JSON.parse(xhr.responseText).message;
      if (xhr.status === 401) {
        // invalid credintials
      } else if (xhr.stats === 500) {
        // server error
      }
      console.log(message);
    });
  });
}

function init() {
  setupEventListeners();
}

$(init);
