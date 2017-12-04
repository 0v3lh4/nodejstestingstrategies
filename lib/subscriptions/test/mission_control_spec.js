let moment = require("moment");
let MissionControl = require("../models/mission_control");
let sinon = require('sinon');
let assert = require("assert");
let Mission = require('../models/mission');
let db = require('../db');

sinon.stub(db, 'getMissionByLaunchDate').yields(null, null);
sinon.stub(db, 'createNextMission').yields(null, new Mission());

let missionControl = new MissionControl({db: db});

describe("Mission Planning", () => {
    describe("No Current Mission", () => {
        let currentMission;

        before((done) => {
            missionControl.currentMission((err, res) => {
                currentMission = res;
                done();
            }); 
        });

        it('it is created if none exist', () => {
            assert(currentMission); 
            assert(db.getMissionByLaunchDate.called);
        });
    });

    describe("Current Mission Exists", () => {
        let currentMission;

        before((done) => {
            //FIXME: unwrap it
            db.getMissionByLaunchDate.restore();
            sinon.stub(db, 'getMissionByLaunchDate').yields(null, {id: 1000});
            missionControl.currentMission((err, res) => {
                currentMission = res;
                done();
            }); 
        });

        it('it returns mission 1000', () => {
            assert(currentMission.id, 1000); 
            assert(db.getMissionByLaunchDate.called);
        });
    });
});
