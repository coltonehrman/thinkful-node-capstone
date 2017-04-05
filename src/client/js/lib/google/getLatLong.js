import { service } from './apis';

export default placeId => (
  new Promise((resolve) => {
    service.getDetails({
      placeId,
    }, (place) => {
      const { lat, lng } = place.geometry.location;
      resolve({
        lat: lat(),
        lng: lng(),
      });
    });
  })
);
