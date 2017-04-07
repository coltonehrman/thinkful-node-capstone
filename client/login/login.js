import 'styles'; // eslint-disable-line
import $ from 'jquery';
import { DOM } from './controllers/UIController';

function setupEventListeners() {
  const $form = $(DOM.login.form);

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
    .done((res, status, xhr) => {
      console.log(xhr);
      console.log(status);
      console.log(res);
    })
    .fail((xhr, status, err) => {
      console.log(xhr);
      console.log(status);
      console.log(err);
    });
  });
}

function init() {
  setupEventListeners();
}

$(init);
