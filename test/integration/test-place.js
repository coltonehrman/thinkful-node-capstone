const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const passportStub = require('passport-stub');
const { app, runServer, closeServer } = require('../../server');
const User = require('../../server/model/userModel');
const Location = require('../../server/model/locationModel');
const Place = require('../../server/model/placeModel');
const expect = chai.expect;

chai.use(chaiHttp);
passportStub.install(app);

let user, location, place;

function createUser() {
  return User.create({
    email: 'cjames615@hotmail.com',
    username: 'cjames615',
    password: 'password',
  })
  .then(function (user) {
    return JSON.parse(JSON.stringify(user.toJson()));
  });
}

function createLocation() {
  return Location.create({ name: 'Location' })
    .then(function(location) {
      return JSON.parse(JSON.stringify(location.toJson()));
    });
}

function createPlace(user, location) {
  return Place.create({
    name: 'Place',
    description: 'test',
    location: location.id,
    user: user.id,
  }).then(function(place) {
    return JSON.parse(JSON.stringify(place.toJson(user.id)));
  });
}

function seedDatabase() {
  return createUser()
    .then(function(_user) {
      user = _user;
      return createLocation();
    })
    .then(function(_location) {
      location = _location;
      return createPlace(user, location);
    })
    .then(function(_place) {
      place = _place;
    });
}

function tearDownDatabase() {
  return mongoose.connection.dropDatabase();
}

describe('Place routes', function () {
  before(function () {
    return runServer();
  });

  beforeEach(function () {
    return seedDatabase()
      .then(function () {
        return passportStub.login(user);
      });
  });

  afterEach(function () {
    return tearDownDatabase()
      .then(function() {
        return passportStub.logout();
      });
  });

  after(function () {
    return closeServer();
  });

  describe('GET /places', function () {
    it('should return all places', function () {
      return chai.request(app)
        .get('/places')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.deep.include(place);
        });
    });
  });

  describe('POST /places', function () {
    it('should create new place', function () {
      let res;
      return chai.request(app)
        .post('/places')
        .field('name', 'New Place')
        .field('location', location.id)
        .then(function(_res) {
          const res = _res;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          place = JSON.parse(JSON.stringify(res.body));
          place.user = user.id;
          return Place.find();
        })
        .then(function(_places) {
          const places = JSON.parse(JSON.stringify(_places.map(place => place.toJson(user.id))));
          expect(places).to.have.lengthOf(2);
          expect(places).to.deep.include(place);
        });
    });
  });

  describe('DELETE /places', function () {
    it('should delete place', function () {
      let res;
      return chai.request(app)
        .delete(`/places/${place.id}`)
        .then(function(_res) {
          const res = _res;
          expect(res).to.have.status(204);
          return Place.find();
        })
        .then(function(places) {
          expect(places).to.have.lengthOf(0);
        });
    });
  });
});