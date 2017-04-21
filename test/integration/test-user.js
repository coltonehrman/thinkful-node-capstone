const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const sinon = require('sinon');
const passportStub = require('passport-stub');
const { app, runServer, closeServer } = require('../../server');
const User = require('../../server/model/userModel');
const fn = require('../../server/util/functions');
const expect = chai.expect;

chai.use(chaiHttp);
passportStub.install(app);

let user;

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
      it('should redirect to /login', function() {
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
      let stubs = [];

      beforeEach(function () {
        stubs.push(sinon.stub(fn, 'isLoggedIn').returns(true));
        stubs.push(sinon.stub(fn, 'isAdmin').returns(false));
      });

      afterEach(function () {
        stubs.forEach(stub => stub.restore());
      });

      it('should redirect to /', function() {
        return chai.request(app)
          .get('/users')
          .redirects(0)
          .then(Promise.reject)
          .catch(function(err) {
            expect(err.response).to.redirect;
            expect(err.response).to.redirectTo('/');
          });
      });
    });

    context('logged in & admin', function () {
      let stubs = [];

      beforeEach(function () {
        stubs.push(sinon.stub(fn, 'isLoggedIn').returns(true));
        stubs.push(sinon.stub(fn, 'isAdmin').returns(true));
      });

      afterEach(function () {
        stubs.forEach(stub => stub.restore());
      });

      it('should return users', function() {
        let res;

        return chai.request(app)
          .get('/users')
          .then(function(_res) {
            res = _res;
            expect(res).to.be.json;
            return User.find()
              .select('-password')
              .exec();
          })
          .then(function(_users) {
            const users = _users.map(user => user.toJson());
            expect(res.body).to.deep.equal(users);
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
              expect(res.body).to.haveOwnProperty('message');
              expect(res.body.message.toLowerCase()).to.have.string('missing field');
            });
        });

        it('respond server error on missing email', function () {
          return chai.request(app)
            .post('/users')
            .field('username', 'cjames615')
            .field('password', 'password')
            .then(Promise.reject)
            .catch(function(err) {
              const res = err.response;
              expect(res).to.have.status(500);
              expect(res).to.be.json;
              expect(res.body).to.haveOwnProperty('message');
              expect(res.body.message.toLowerCase()).to.have.string('missing field');
            });
        });

        it('respond server error on missing username', function () {
          return chai.request(app)
            .post('/users')
            .field('email', 'cjames615@hotmail.com')
            .field('password', 'password')
            .then(Promise.reject)
            .catch(function(err) {
              const res = err.response;
              expect(res).to.have.status(500);
              expect(res).to.be.json;
              expect(res.body).to.haveOwnProperty('message');
              expect(res.body.message.toLowerCase()).to.have.string('missing field');
            });
        });

        it('respond server error on missing password', function () {
          return chai.request(app)
            .post('/users')
            .field('email', 'cjames615@hotmail.com')
            .field('username', 'cjames615')
            .then(Promise.reject)
            .catch(function(err) {
              const res = err.response;
              expect(res).to.have.status(500);
              expect(res).to.be.json;
              expect(res.body).to.haveOwnProperty('message');
              expect(res.body.message.toLowerCase()).to.have.string('missing field');
            });
        });
      });
    });
  });

  describe('GET /users/me', function () {
    context('not logged in', function () {
      it('should redirect to /login', function() {
        return chai.request(app)
          .get('/users/me')
          .redirects(0)
          .then(Promise.reject)
          .catch(function(err) {
            expect(err.response).to.redirect;
            expect(err.response).to.redirectTo('/login');
          });
      });
    });

    context('is logged in', function () {
      beforeEach(function () {
        return seedDatabase()
          .then(function(_user) {
            user = _user;
            passportStub.login(user);
          });
      });

      afterEach(function () {
        passportStub.logout();
        return tearDownDatabase();
      });

      it('should return logged in user', function() {
        return chai.request(app)
          .get('/users/me')
          .then(function(res) {
            user = JSON.parse(JSON.stringify(user.toJson()));
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.deep.equal(user);
          });
      });
    });
  });
});
