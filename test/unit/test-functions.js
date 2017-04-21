const { expect } = require('chai');
const { getMenu } = require('../../server/util/functions');

const testCollection = [];

const loggedInObject = {
  onLoggedIn: true,
};

const loggedOutObject = {
  onLoggedIn: false,
};

describe('server functions', function () {
  describe('getMenu', function () {
    context('logged in', function() {
      it('should return loggedIn items', function () {
        const results = getMenu([loggedInObject, loggedOutObject], true);
        expect(results.length).to.equal(1);
        expect(results[0]).to.equal(loggedInObject);
      });
    });
    
    context('logged out', function() {
      it('should return loggedOut items', function () {
        const results = getMenu([loggedInObject, loggedOutObject], false);
        expect(results.length).to.equal(1);
        expect(results[0]).to.equal(loggedOutObject);
      });
    });

    it('throws on invalid parameter', function () {
      expect(getMenu.bind(null, null, false)).to.throw(TypeError, /filter/);
    });
  });
});
