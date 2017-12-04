let async = require('async');
let assert = require('assert');

var ReviewProcess = function(args) {
  assert(args.application, 'Need an application to review');
  let app = args.application;

  //make sure the app is valid
  this.ensureAppValid = (next) => {
      if(app.isValid()) {
          next(null, true);
      } else {
          next(app.validationMessage(), null);
      }
  };

  //find the next mission
  this.findNextMission = (next) => {
    //stub this out for now
    const mission = {
      commander : null,
      pilot : null,
      MAVPilot : null,
      passengers : []
    };

      next(null, mission);
  };

  //make sure role selected is available
  this.roleIsAvailable = (next) => {
    //we have no concept of role seletion just yet
    //TODO: What about a role? Need more info
    next(null, true);
  };

  //make sure height/weight/age is right for role
  this.ensureRoleCompatible = (next) => {
    //TODO: find out about roles and height/weight etc
    next(null, true);
  };

  this.approveApplication = (next) => {
      next(null, true);
  };

  this.processApplication = (next) => {
      async.series({
          validated: this.ensureAppValid,
          mission: this.findNextMission,
          roleAvailable: this.roleIsAvailable,
          roleCompatible: this.ensureRoleCompatible,
          success: this.approveApplication
      }, (err, result) => {
        if(err) {
            next(null, {
                success: false,
                message: err
            });
        } else {
            result.message = "Welcome to Mars!";
            next(null, result);
        }
      });
  };
};

module.exports = ReviewProcess;
