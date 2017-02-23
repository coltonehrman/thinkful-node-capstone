/* global google document */
const autocomplete = new google.maps.places.AutocompleteService();
const service = new google.maps.places.PlacesService(document.createElement('div'));

export {
  autocomplete,
  service,
};
