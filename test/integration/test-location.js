const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { app, runServer, closeServer } = require('../../server');
const Location = require('../../server/model/locationModel');
const expect = chai.expect;

chai.use(chaiHttp);

function seedDatabase() {
  const promises = [];

  [1,2,3].forEach(function (i) {
    const promise = Location.create({ name: `Location ${i}` });
    promises.push(promise);
  });

  return Promise.all(promises);
}

function tearDownDatabase() {
  return mongoose.connection.dropDatabase();
}

describe('Location routes', function () {
  let locations;

  before(function () {
    return runServer();
  });

  beforeEach(function (done) {
    seedDatabase()
      .then(function (_locations) {
        locations = JSON.parse(JSON.stringify(_locations.map(loc => loc.toJson())));
        done();
      });
  });

  afterEach(function () {
    return tearDownDatabase();
  });

  after(function () {
    return closeServer();
  });
  
  describe('GET /locations', function () {
    context('no params', function () {
      it('should return all locations', function () {
        let res;

        return chai.request(app)
          .get('/locations')
          .then(function(_res) {
            res = _res;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.lengthOf(locations.length);
            expect(res.body).to.deep.members(locations);
          });
      });
    });

    context('with params', function () {
      context('location exists', function () {
        it('should return single location', function () {
          return chai.request(app)
            .get('/locations')
            .query({ name: locations[0].name })
            .then(function(res) {
              expect(res).to.have.status(200);
              expect(res).to.be.json;
              expect(res.body).to.deep.equal(locations[0]);
            });
        });
      });

      context('location does not exist', function () {
        it('should return null', function () {
          return chai.request(app)
            .get('/locations')
            .query({ name: 'Location That Does Not Exist' })
            .then(function(res) {
              expect(res).to.have.status(200);
              expect(res.body).to.be.null;
            });
        });
      });
    });
  });

  describe('GET /locations/:id', function () {
    context('logged in', function () {
      it('should return html', function () {
        return chai.request(app)
          .get(`/locations/${locations[0].id}`)
          .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
          });
      });
    });

    context('not logged in', function () {
      it('should redirect to /login', function () {
        return chai.request(app)
          .get(`/locations/${locations[0].id}`)
          .redirects(0)
          .then(Promise.reject)
          .catch(function(err) {
            const res = err.response;
            expect(res).to.redirect;
            expect(res).to.redirectTo('/login');
          });
      });
    });
  });

  describe('POST /locations', function () {
    context('valid request', function () {
      it('should create new location', function () {
        let res;

        return chai.request(app)
          .post('/locations')
          .field('name', 'New Location')
          .then(function(_res) {
            res = _res;
            return Location.find();
          })
          .then(function(_locations) {
            const newLocations = JSON.parse(JSON.stringify(_locations.map(loc => loc.toJson())));
            expect(newLocations).to.have.length.greaterThan(locations.length);
            expect(newLocations).to.include(res.body);
          });
      });
    });

    context('invalid request', function () {
      it('should respond server error', function () {
        return chai.request(app)
          .post('/locations')
          .then(Promise.reject)
          .catch(function(res) {
            expect(res).to.have.status(500);
            expect(res.body).to.not.exist;
          });
      });
    });
  });
});