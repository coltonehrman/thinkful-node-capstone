/* global window google document */
import 'styles'; // eslint-disable-line
import $ from 'jquery';
import APIController from './controllers/APIController';

const path = window.location.pathname.split('/');
const LOCATION_ID = path[path.length - 1];

function setupEventListeners() {

}

function init() {
  setupEventListeners();
  APIController.findPlaces(LOCATION_ID)
    .then((places) => {
      console.log(places);
    })
    .catch(err => console.log(err));
}

$(init);
