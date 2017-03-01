import { autocomplete } from './apis';

export default text => (
  new Promise((resolve) => {
    autocomplete.getPlacePredictions({
      input: text,
      types: ['(cities)'],
    }, (data) => {
      const results = data.map(place => ({
        name: place.description,
        id: place.place_id,
      }));
      resolve(results);
    });
  })
);
