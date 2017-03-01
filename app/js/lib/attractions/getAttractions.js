import $ from 'jquery';

export default ({ lat, lng }) => (
  new Promise((resolve) => {
    $.ajax('https://api.foursquare.com/v2/venues/explore', {
      data: {
        client_id: 'HIRHIF3ESK5TAJTKTU0HQDMY3KABRJSFN3EA1SSOE2ULSCWH',
        client_secret: 'GACVTXG4OQ5KKICSQBNNHM5DPBGZGCLR0D0JG5LEX5TWMIOL',
        ll: `${lat},${lng}`,
        m: 'foursquare',
        v: 20170101,
      },
    }).done((data) => {
      resolve(data.response);
    });
  })
);
