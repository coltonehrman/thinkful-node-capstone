/* global $ */

export default class Place {
  constructor(place) {
    this.place = place;
    this.$element = this.createElement();
  }

  createElement() {
    let html = `
      <div class="place col m6">
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
              <div class="chip right">
                <img src="${this.place.icon}" alt="Contact Person">
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
              <p class="place__rating">${this.place.rating}</p>`;
      }
      html += `
          </div>`;
    }
    html += `
        </div>
      </div>`;

    return $(html);
  }
}
