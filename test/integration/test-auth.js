const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
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

describe('Auth routes', function () {
  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  describe('GET /login', function () {
    it('should return html', function () {
      return chai.request(app)
        .get('/login')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.html;
        });
    });
  });

  describe('GET /signup', function () {
    it('should return html', function () {
      return chai.request(app)
        .get('/signup')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(res).to.be.html;
        });
    });
  });

  describe('POST /login', function () {

    context('incorrect username', function () {
      let res;

      before(function() {
        return seedDatabase()
          .then(function() {
            return chai.request(app)
              .post('/login')
              .field('username', 'coltonje')
              .field('password', 'password')
          })
          .then(Promise.reject)
          .catch(function(err) {
            res = err.response;
          });
      });

      after(function() {
        return tearDownDatabase();
      });

      it('should not return redirect object', function () {
        expect(res).to.be.json;
        expect(res.body).to.not.haveOwnProperty('redirect');
      });

      it('should return message', function () {
        expect(res.body).to.haveOwnProperty('message');
        expect(res.body.message.toLowerCase()).to.have.string('incorrect username');
      });

      it('should not be authorized', function () {
        expect(res).to.have.status(401);
      });
    });

    context('correct username & wrong password', function () {
      let res;

      before(function() {
        return seedDatabase()
          .then(function() {
            return chai.request(app)
              .post('/login')
              .field('username', 'cjames615')
              .field('password', 'wrong')
          })
          .then(Promise.reject)
          .catch(function(err) {
            res = err.response;
          });
      });

      after(function() {
        return tearDownDatabase();
      });

      it('should not return redirect object', function () {
        expect(res).to.be.json;
        expect(res.body).to.not.haveOwnProperty('redirect');
      });

      it('should return message', function () {
        expect(res).to.be.json;
        expect(res.body).to.haveOwnProperty('message');
        expect(res.body.message.toLowerCase()).to.have.string('incorrect password');
      });

      it('should not be authorized', function () {
        expect(res).to.have.status(401);
      });
    });

    context('correct username & correct password', function () {
      let res;

      before(function() {
        return seedDatabase()
          .then(function() {
            return chai.request(app)
              .post('/login')
              .field('username', 'cjames615')
              .field('password', 'password')
          })
          .then(function(_res) {
            res = _res;
          });
      });

      after(function() {
        return tearDownDatabase();
      });

      it('should return redirect object', function () {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.haveOwnProperty('redirect');
      });

      it('should redirect to /', function () {
        expect(res.body).to.haveOwnProperty('redirect');
        expect(res.body.redirect).to.equal('/');
      });

      it('should be authorized', function () {
        expect(res).to.have.status(200);
      });
    });
  });
});
