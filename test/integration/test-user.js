const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const config = require('../../server/config');
const { app, runServer, closeServer } = require('../../server');
const User = require('../../server/model/userModel');
const expect = chai.expect;

chai.use(chaiHttp);

function seedDatabase() {
  const user = new User({
    email: 'cjames615@hotmail.com', 
    username: 'cjames615',
  });
  const password = 'password';

  return User.encryptPassword(password)
    .then(function(hash) {
      user.password = hash;
      return user.save();
    })
    .catch(function(err) {
      console.log(err);
      throw err;
    });
}

function tearDownDatabase() {
  return mongoose.connection.dropDatabase();
}

describe('User routes', function () {
  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  describe('GET /users', function () {
    context('not logged in', function () {
      it('should redirect to login page', function() {
        return chai.request(app)
          .get('/users')
          .redirects(0)
          .then(Promise.reject)
          .catch(function(err) {
            expect(err.response).to.redirect;
            expect(err.response).to.redirectTo('/login');
          });
      });
    });

    context('logged in & not admin', function () {
      xit('should redirect to login page', function() {
        return chai.request(app)
          .get('/users')
          .redirects(0)
          .then(Promise.reject)
          .catch(function(err) {
            expect(err.response).to.redirect;
            expect(err.response).to.redirectTo('/login');
          });
      });
    });

    context('logged in & admin', function () {
      xit('should return users', function() {
        return chai.request(app)
          .get('/users')
          .redirects(0)
          .then(Promise.reject)
          .catch(function(err) {
            expect(err.response).to.redirect;
            expect(err.response).to.redirectTo('/login');
          });
      });
    });
  });

  describe('POST /users', function () {
    context('valid request', function () {
      let beforePostUsersAmount;
      let res;

      beforeEach(function () {
        return User.find()
          .then(function(users) {
            beforePostUsersAmount = users.length;
            return chai.request(app)
              .post('/users')
              .field('email', 'email@email.com')
              .field('username', 'newUser')
              .field('password', 'pass')
              .then(function(_res) {
                res = _res;
              });
          });
      });

      afterEach(function () {
        return tearDownDatabase();
      });

      it('should create new user', function () {
        return User.find()
          .then(function(users) {
            expect(users).to.have.length.at.least(1);
            expect(users).to.have.length.above(beforePostUsersAmount);
          });
      });

      it('should return redirect object', function () {
        expect(res).to.be.json;
        expect(res.body).to.haveOwnProperty('redirect');
      });

      it('should redirect to /', function () {
        expect(res).to.be.json;
        expect(res.body).to.haveOwnProperty('redirect');
        expect(res.body.redirect).to.equal('/');
      });
    });

    context('invalid request', function () {
      describe('missing field(s)', function () {
        it('respond server error on no fields', function () {
          return chai.request(app)
            .post('/users')
            .then(Promise.reject)
            .catch(function(err) {
              const res = err.response;
              expect(res).to.have.status(500);
              expect(res).to.be.json;
            });
        });
      });
    });
  });
});
