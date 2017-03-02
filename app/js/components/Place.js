/* global $ */

export default class Place {
  constructor(place) {
    this.category = place.category;
    this.name = place.name;
    this.address = place.address;
    this.hours = place.hours;
    this.hidden = false;
    this.$element = this.createElement();
  }

  hide() {
    if (!this.hidden) {
      this.$element.fadeOut();
      this.hidden = true;
    }
  }

  show() {
    if (this.hidden) {
      this.$element.fadeIn();
      this.hidden = false;
    }
  }

  createElement() {
    let html = `
      <div class="place col m6">
        <div class="card">
          <div class="card-content grey-text">
            <div class="card-title">${this.name}</div>
            <p>${this.address}</p>`;

    if (typeof this.hours !== 'undefined') {
      html += `<p>${this.hours}</p>`;
    }

    html += `
          </div>
          <div class="card-action">
            <a href="#">This is a link</a>
            <a href="#">This is a link</a>
          </div>
        </div>
      </div>`;

    return $(html);
  }
}
