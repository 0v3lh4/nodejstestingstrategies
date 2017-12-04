let assert = require('assert');
let ReviewProcess = require('../processes/review');
let MembershipApplication = require('../models/membership_application');

describe('The Review Process', () => {

  describe('Receiving a valid application', () => {
    let decision;

    before((done) => {
      let validApp = new MembershipApplication({
        first: 'Test',
        last: 'User',
        email: 'test@test.com',
        age: 30,
        height: 66,
        weight: 180
      });

      let review = new ReviewProcess();

      review.processApplication(validApp, (err, result) => {
        decision = result;
        done();
      });
    });

    it('returns success', () => {
      assert(decision.success, decision.message);
    });
  });
});
