import { autocomplete } from './apis';

function getPredictions(types, text) {
  return new Promise((resolve, reject) => {
    autocomplete.getPlacePredictions({
      input: text,
      types: types,
    }, (data) => {
      if (data !== null) {
        const results = data.map(place => ({
          name: place.description,
          id: place.place_id,
        }));
        resolve(results);
      } else {
        reject();
      }
    });
  });
}

export default {
  cities: getPredictions.bind(null, ['(cities)']),
  addresses: getPredictions.bind(null, ['geocode']),
};
