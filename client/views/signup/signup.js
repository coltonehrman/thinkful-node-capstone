/* global window */
import 'styles'; // eslint-disable-line
import $ from 'jquery';
import { DOM } from './controllers/UIController';

function setupEventListeners() {
  const $form = $(DOM.form);
  const $errorMessage = $(DOM.errorMessage);

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
    .done((res) => {
      if (res.redirect) {
        window.location.replace(res.redirect);
      } else {
        console.log(res);
      }
    })
    .fail((xhr) => {
      const $err = $(DOM.errorMessage);
      let message = JSON.parse(xhr.responseText).message;

      if (message.match(/duplicate/) && message.match(/email/)) {
        message = 'Email already in use.';
      }

      if (message.match(/duplicate/) && message.match(/username/)) {
        message = 'Username not available.';
      }

      if (xhr.status === 401 || xhr.status === 500) {
        $err.html(`${message}<i class="${DOM.errorCloseBtn.slice(1)} material-icons right">close</i>`).removeClass('hide');
      }
    });
  });

  $errorMessage.on('click', DOM.errorCloseBtn, () => {
    $errorMessage.html('').addClass('hide');
  });
}

function init() {
  setupEventListeners();
}

$(init);
