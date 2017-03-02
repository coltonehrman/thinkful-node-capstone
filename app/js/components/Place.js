export default class Place {
  constructor(place) {
    this.category = place.category;
    this.name = place.name;
    this.address = place.address;
    this.hours = place.hours;
  }

  render() {
    let html = `
      <div class="place col m6" data-category="${this.category}">
        <div class="card indigo lighten-5">
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

    return html;
  }
}
