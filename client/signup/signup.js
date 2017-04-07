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

    $.ajax('/users', {
      data,
      method: 'POST',
    })
    .done((res, status, xhr) => {
      console.log(xhr);
      console.log(status);
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
