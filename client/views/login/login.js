/* global window */
import 'styles'; // eslint-disable-line
import $ from 'jquery';
import { DOM } from './controllers/UIController';

function setupEventListeners() {
  const $form = $(DOM.form);
  const $errorMessage = $(DOM.errorMessage);
  const $demoMenu = $(DOM.demoMenu);
  const $demoInfo = $(DOM.demoInfo);

  $demoMenu.on('click', () => {
    console.log('clicked');
    $demoInfo.tapTarget('open');
  });

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
        window.location.replace(res.redirect);
      } else {
        console.log(res);
      }
    })
    .fail((xhr) => {
      const $err = $(DOM.errorMessage);
      const message = JSON.parse(xhr.responseText).message;

      if (xhr.status === 401) {
        $err.html(`${message}<i class="${DOM.errorCloseBtn.slice(1)} material-icons right">close</i>`).removeClass('hide');
      } else if (xhr.status === 500) {
        // server error
      }
    });
  });

  $errorMessage.on('click', DOM.errorCloseBtn, () => {
    $errorMessage.html('').addClass('hide');
  });
}

function init() {
  setupEventListeners();
  $(DOM.demoInfo).tapTarget('open');
}

$(init);
