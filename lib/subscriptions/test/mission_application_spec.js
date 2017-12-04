let assert = require('assert');
let MembershipApplication = require('../models/membership_application');

describe('Membership application requirements', () => {
  let validApp;

  before(() => {
    validApp = new MembershipApplication({
      first: 'Test',
      last: 'User',
      email: 'test@test.com',
      age: 30,
      height: 66,
      weight: 180
    });  
  });

  describe('Application valid if...', () => {
    it('all validators successful', () => {
      assert(validApp.isValid(), 'Not valid'); 
    }); 
    it('email is 4 or more chars and contais an @', () => {
      assert(validApp.emailIsValid(), 'Email not valid');
    });
    it('height is between 60 and 75 inches', () => {
      assert(validApp.heightIsValid(), 'Height not valid');
    });
    it('age is between 15 and 100', () => {
      assert(validApp.ageIsValid(), 'Age not valid');
    });
    it('weight is between 100 and 300', () => {
      assert(validApp.weightIsValid(), 'Weight not valid');
    });
    it('first and last name are provided', () => {
      assert(validApp.nameIsValid(), 'Name not valid');
    });
  });
  describe('Application invalid if...', () => {
    it('is expired', () => {
      var app = new MembershipApplication({validUntil: Date.parse('01/01/2010')});
      assert(app.expired());
    });
    it('email is 4 characters or less', () => {
      var app = new MembershipApplication({email: 'dd'});
      assert(!app.emailIsValid());
    });
    it('email does not contain an @', () => {
      var app = new MembershipApplication({email: 'thingthingthingthing'});
      assert(!app.emailIsValid());
    });
    it('email is omitted', () => {
      var app = new MembershipApplication();
      assert(!app.emailIsValid());
    });
    it('height is less than 60 inches', () => {
      var app = new MembershipApplication({height: 10});
      assert(!app.heightIsValid());
    });
    it('height is more than 75 inches', () => {
      var app = new MembershipApplication({height: 80});
      assert(!app.heightIsValid());
    });
    it('height is omitted', () => {
      var app = new MembershipApplication();
      assert(!app.heightIsValid());
    });
    it('age is more than 100', () => {
      var app = new MembershipApplication({age: 101});
      assert(!app.ageIsValid());
    });
    it('age less than 15', () => {
      var app = new MembershipApplication({age: 14});
      assert(!app.ageIsValid());
    });
    it('age os omitted', () => {
      var app = new MembershipApplication();
      assert(!app.ageIsValid());
    });
    it('weight less than 100', () => {
      var app = new MembershipApplication({weight: 99});
      assert(!app.weightIsValid());
    });
    it('weight les more than 300', () => {
      var app = new MembershipApplication({weight: 301});
      assert(!app.weightIsValid());
    });
    it('weight is omitted', () => {
      var app = new MembershipApplication();
      assert(!app.weightIsValid());
    });
    it('first is omitted', () => {
      var app = new MembershipApplication();
      assert(!app.nameIsValid());
    });
    it('last is omitted', () => {
      var app = new MembershipApplication();
      assert(!app.nameIsValid());
    });
  });
});
