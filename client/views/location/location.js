/* global window google document */
import 'styles'; // eslint-disable-line
import $ from 'jquery';
import APIController from './controllers/APIController';
import { Places } from './controllers/UIController';

const path = window.location.pathname.split('/');
const LOCATION_ID = path[path.length - 1];

function setupEventListeners() {
}

function init() {
  setupEventListeners();
  APIController.findPlaces(LOCATION_ID)
    .then((places) => {
      Places.hideProgress();
      Places.display(places);
    })
    .catch(err => console.log(err));
}

$(init);
