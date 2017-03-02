import { autocomplete } from './apis';

export default text => (
  new Promise((resolve, reject) => {
    autocomplete.getPlacePredictions({
      input: text,
      types: ['(cities)'],
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
  })
);
