const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const sinon = require('sinon');
const { app, runServer, closeServer } = require('../../server');
const fn = require('../../server/util/functions');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Root routes', function () {
  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  describe('GET /', function () {
    let stubs = [];

    beforeEach(function () {
      stubs.push(sinon.stub(fn, 'isLoggedIn').returns(true));
    });

    afterEach(function () {
      stubs.forEach(stub => stub.restore());
    });

    context('not logged in', function () {
      it('should return html', function () {
        return chai.request(app)
          .get('/')
          .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
          });
      });
    });

    context('logged in', function () {
      it('should return html', function () {
        return chai.request(app)
          .get('/')
          .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.html;
          });
      });
    });
  });
});