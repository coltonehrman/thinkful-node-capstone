/* global window document FileReader FormData */
/* eslint global-require: 0, import/no-extraneous-dependencies: 0, import/no-unresolved: 0 */
/* eslint comma-dangle: ["error", "ignore"] */
import $ from 'jquery';
import { DOM } from '../controllers/UIController';
import APIController from '../controllers/APIController';

export default class Place {
  constructor(place, id) {
    this.id = id;

    if (!place) {
      this.place = this.placeholderData();
      this.place.photo = require('placeholder-img.png');
      this.$element = this.createElement();
      this.addOverlay();
    } else {
      this.place = place;
      this.$element = this.createElement();
    }
  }

  placeholderData() { // eslint-disable-line
    return {
      name: 'Lorem ipsum dolor',
      description: `
      Lorem ipsum dolor sit amet
      Fusce eu nibh accumsan
      Integer eget diam tempor
      Praesent a lacus eu metus`,
    };
  }

  createPlace() {
    const name = this.$element.find('#name').val();
    const description = this.$element.find('#description').val();
    const data = new FormData();
    data.set('name', name);
    data.set('description', description);
    if (this.photo) {
      data.set('photo', this.photo);
    }
    return APIController.createPlace(data);
  }

  createElement() {
    const html = `
      <div class="place__item col s12 m6" data-id="${this.id}">
        <div class="card">
          <div class="card-image">
            <img src="${this.place.photo}">
          </div>

          <div class="card-content">
            <div class="card-title">${this.place.name}</div>

            <blockquote>${this.place.description}</blockquote>
          </div>

          <div class="card-action"></div>
        </div>
      </div>
    `;

    return $(html);
  }

  addPhoto(file) {
    if (!file) {
      return;
    }

    const img = document.createElement('img');

    this.photo = file;

    img.src = window.URL.createObjectURL(file);
    img.onload = () => window.URL.revokeObjectURL(img.src);

    this.$element.find('.card-image img').replaceWith(img);
  }

  addOverlay() {
    this.$element.find('.card').append(`
      <div class="card__overlay">
        <a class="btn-floating btn-large ${DOM.placeAddBtn.slice(1)}">
          <i class="material-icons">add</i>
        </a>
      </div>
    `);
  }

  toForm() {
    this.$element.find('.card-image').append(`
      <div class="${DOM.placeAddPhotoBtn.slice(1)}">
        <input type="file" class="hide" name="fileInput" />
        <a class="btn-floating halfway-fab waves-effect waves-light red">
          <i class="material-icons">add_a_photo</i>
        </a>
      </div>
    `);

    this.$element.find('.card-title').replaceWith(`
      <div class="input-field card-title">
        <input id="name" type="text">
        <label for="name">Name</label>
      </div>
    `);

    this.$element.find('blockquote').replaceWith(`
      <div class="input-field">
        <blockquote>
          <textarea id="description" class="materialize-textarea"></textarea>
          <label for="description">Description</label>
        </blockquote>
      </div>
    `);

    this.$element.find('.card-action').append(`
      <a class="${DOM.placeCancelBtn.slice(1)} btn-floating btn-large waves-effect waves-light red">
        <i class="material-icons">close</i>
      </a>
    `, `
      <a class="${DOM.placeCreateBtn.slice(1)} btn-floating btn-large right waves-effect waves-light green accent-3">
        <i class="material-icons">check</i>
      </a>
    `);

    this.$element.find('.card__overlay').hide();
  }

  cancelForm() {
    this.$element.find('.card-title').replaceWith(`
      <div class="card-title">Lorem ipsum dolor</div>
    `);

    this.$element.find('blockquote').parents('.input-field').replaceWith(`
      <blockquote>
        Lorem ipsum dolor sit amet
        Fusce eu nibh accumsan
        Integer eget diam tempor
        Praesent a lacus eu metus
      </blockquote>
    `);

    this.$element.find(DOM.placeAddPhotoBtn).remove();
    this.$element.find('.card-action').empty();
    this.$element.find('.card__overlay').show();
  }
}
