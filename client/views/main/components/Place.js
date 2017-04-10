/* eslint global-require: 0, import/no-extraneous-dependencies: 0, import/no-unresolved: 0 */
/* global google */
import $ from 'jquery';
import { DOM } from '../controllers/UIController';

export default class Place {
  constructor(place) {
    if (!place) {
      this.$element = this.createPlaceholder();
    } else {
      this.place = place;
      this.$element = this.createElement();
      this.createRating();
      this.map = null;
      this.marker = null;
    }
  }

  createMap() {
    if (!this.map) {
      const coords = new google.maps.LatLng(
        this.place.coords.lat,
        this.place.coords.lng // eslint-disable-line
      );
      const map = new google.maps.Map(this.$element.find('.map').get(0), {
        zoom: 15,
        center: coords,
      });
      const marker = new google.maps.Marker({
        position: coords,
        map,
      });
      this.map = map;
      this.marker = marker;

      google.maps.event.addListener(map, 'idle', () => {
        map.setCenter(coords);
      });
    }
  }

  createRating() {
    const currentRating = this.$element.find(DOM.placeRating).data('current-rating');
    this.$element.find(DOM.placeRating).barrating('show', {
      theme: 'fontawesome-stars-o',
      showSelectedRating: false,
      initialRating: currentRating / 2,
      readonly: true,
    });
  }

  createElement() {
    let html = `
      <div class="place__item col s12 m6">
        <div class="card">`;
    if (typeof this.place.photo !== 'undefined') {
      html += `
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${this.place.photo}">
          </div>`;
    }
    html += `
          <div class="card-content grey-text">
            <div class="card-title">
              <i class="activator material-icons small right">location_on</i>
              <div class="chip right">
                <img src="${this.place.icon}">
                ${this.place.category}
              </div>
              ${this.place.name}`;
    if (typeof this.place.hours !== 'undefined') {
      html += `
              <p class="place__hours">${this.place.hours}</p>`;
    }
    html += `
            </div>
            <blockquote>${this.place.address.split(', ').join('<br>')}</blockquote>`;

    html += `
            </div>
            <div class="card-reveal">
              <span class="card-title grey-text">${this.place.name}<i class="material-icons right">close</i></span>
              <div class="map"></div>
            </div>`;
    if (typeof this.place.price !== 'undefined' || typeof this.place.rating !== 'undefined') {
      html += `
          <div class="card-action">`;
      if (typeof this.place.price !== 'undefined') {
        html += `
              <p class="place__price place__price--${this.place.price.length} right btn-floating red">${this.place.price}</p>`;
      }
      if (typeof this.place.rating !== 'undefined') {
        html += `
              <select class="place__rating" name="rating" data-current-rating="${this.place.rating}">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>`;
      }
      html += `
          </div>`;
    }
    html += `
        </div>
      </div>`;

    return $(html);
  }

  createPlaceholder() { // eslint-disable-line
    const html = `
      <div class="place__item col s12 m6">
        <div class="card">
          <div class="card__overlay">
            <a class="btn-floating btn-large ${DOM.placeAddBtn.slice(1)}"><i class="material-icons">add</i></a>
          </div>
          <div class="card-image">
            <img src="${require('placeholder-img.png')}">
          </div>

          <div class="card-content">
            <div class="card-title">
              <i class="material-icons small right">location_on</i>
              Lorem ipsum dolor
            </div>

            <blockquote>
              Lorem ipsum dolor sit amet
              Fusce eu nibh accumsan
              Integer eget diam tempor
              Praesent a lacus eu metus
            </blockquote>
          </div>

          <div class="card-action"></div>
        </div>
      </div>
    `;

    return $(html);
  }

  toForm() {
    this.$element.find('.card-title').replaceWith(`
      <div class="input-field">
        <input id="name" type="text">
        <label for="name">Place Name</label>
      </div>
    `);

    this.$element.find('blockquote').replaceWith(`
      <div class="input-field col s12">
        <textarea id="description" class="materialize-textarea"></textarea>
        <label for="description">Description</label>
      </div>
    `);

    this.$element.find('.card__overlay').hide();
  }
}
