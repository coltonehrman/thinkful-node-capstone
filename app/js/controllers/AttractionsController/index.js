import { getAttractions } from '../../lib/attractions';

function parseIcon(size, icon) {
  return `${icon.prefix}bg_${size}${icon.suffix}`;
}

function parsePlace(place) {
  const data = {};

  data.name = place.venue.name;

  place.venue.categories.forEach((category) => {
    data.icon = parseIcon(32, category.icon);
    data.category = category.name;
  });

  if (typeof place.venue.hours !== 'undefined') {
    data.open = place.venue.hours.isOpen;
    data.hours = place.venue.hours.status;
  }

  if (typeof place.venue.location !== 'undefined') {
    data.address = place.venue.location.formattedAddress.join(', ');
    data.coords = {
      lat: place.venue.location.lat,
      lng: place.venue.location.lng,
    };
  }

  if (place.venue.photos.count !== 0) {
    // console.log(place.venue.photos);
  }

  if (typeof place.venue.price !== 'undefined') {
    data.price = place.venue.price.currency.repeat(place.venue.price.tier);
  }

  if (typeof place.venue.rating !== 'undefined') {
    data.rating = `${place.venue.rating} out of 10`;
  }

  return data;
}

export default {
  findAttractions(coords) {
    return new Promise((resolve) => {
      getAttractions(coords).then((res) => {
        const places = [];
        const {
          headerFullLocation: location,
          totalResults: results,
          groups,
        } = res;

        // Inspect venue item
        // console.log(groups[0].items[0]);

        groups.forEach((group) => {
          group.items.forEach((place) => {
            places.push(parsePlace(place));
          });
        });

        resolve(places);
      });
    });
  },
};
