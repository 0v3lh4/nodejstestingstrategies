let assert = require('assert');
let ReviewProcess = require('../processes/review');
let MembershipApplication = require('../models/membership_application');
let sinon = require('sinon');

describe('The Review Process', () => {

  describe('Receiving a valid application', () => {
    let decision;
    let validApp = new MembershipApplication({
      first: 'Test',
      last: 'User',
      email: 'test@test.com',
      age: 30,
      height: 66,
      weight: 180
    });

    let review = new ReviewProcess();
    let validationSpy = sinon.spy();
    let missionSpy = sinon.spy();
    let roleAvailableSpy = sinon.spy();
    let roleCompatibleSpy = sinon.spy();

    before((done) => {
      review.on('validated', validationSpy);
      review.on('mission-selected', missionSpy);
      review.on('role-available', roleAvailableSpy);
      review.on('role-compatible', roleCompatibleSpy);

      review.processApplication(validApp, (err, result) => {
        decision = result;
        done();
      });
    });

    it('returns success', () => {
      assert(decision.success, decision.message);
    });

    it('ensures the application is valid', () => {
      assert(validationSpy.called);
    });

    it('selects a mission', () => {
      assert(missionSpy.called);
    });

    it('ensures a role exists', () => {
      assert(roleAvailableSpy.called);
    });

    it('ensures role compatibility', () => {
      assert(roleCompatibleSpy.called);
    });
  });
});
