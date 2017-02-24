/* global google */
import { autocomplete, service } from './googleAPIs';

export default {
  query(text) {
    return new Promise((resolve) => {
      autocomplete.getQueryPredictions({
        input: text,
        types: ['geocode'],
      }, (data) => {
        const results = data.map(place => ({
          name: place.description,
          id: place.place_id,
        }));
        resolve(results);
      });
    });
  },
  getLatLong(placeId) {
    return new Promise((resolve) => {
      service.getDetails({
        placeId,
      }, (place) => {
        const { lat, lng } = place.geometry.location;
        resolve({
          lat: lat(),
          lng: lng(),
        });
      });
    });
  },
};
