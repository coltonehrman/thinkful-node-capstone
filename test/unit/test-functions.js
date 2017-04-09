const { expect } = require('chai');
const { getMenu } = require('../../server/util/functions');

const testCollection = [];

const loggedInObject = {
  onLoggedIn: true,
};

const loggedOutObject = {
  onLoggedIn: false,
};

describe('server functions', () => {
  describe('getMenu', () => {
    context('user is logged out', () => {
      it('return loggedIn items', () => {
        const results = getMenu([loggedInObject, loggedOutObject], true);
        expect(results.length).to.equal(1);
        expect(results[0]).to.equal(loggedInObject);
      });
    });

    context('user is logged in', () => {
      it('return loggedIn items', () => {
        const results = getMenu([loggedInObject, loggedOutObject], false);
        expect(results.length).to.equal(1);
        expect(results[0]).to.equal(loggedOutObject);
      });
    });

    context('invalid inputs', () => {
      it('throws on invalid parameter', () => {
        expect(getMenu.bind(null, null, false)).to.throw(TypeError, /filter/);
      });
    });
  });
});
