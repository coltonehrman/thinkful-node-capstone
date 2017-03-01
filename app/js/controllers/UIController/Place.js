/* global $ */
import DOM from './DOM';

export default {
  displayPlaces(places) {
    const $placeResults = $(DOM.placeResults);
    console.log($placeResults);

    places.forEach((place) => {
      console.log(place);
      let html = `
        <div class="col m6">
          <div class="card indigo lighten-5">
            <div class="card-content grey-text">
              <div class="card-title">${place.name}</div>
              <p>${place.address}</p>`;

      if (typeof place.hours !== 'undefined') {
        html += `<p>${place.hours}</p>`;
      }


      html += `
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>`;

      $placeResults.append(
        html,
      );
    });
  },
};
