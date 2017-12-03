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
});
