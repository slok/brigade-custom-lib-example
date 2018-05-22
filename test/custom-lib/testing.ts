import "mocha";
import { assert } from "chai";

import * as testing from "../../src/custom-lib/testing";
import * as mocks from "./mocks";
import * as brigadier from "../../src/custom-lib/brigadier";

describe("testing", function () {
    describe("TestingJobsGenerator", function () {
        let t: testing.TestingJobGenerator;
        beforeEach(function () {
            let mEvent = mocks.mockEvent(); 
            let mProject = mocks.mockProject();
            t = new testing.TestingJobGenerator(mEvent, mProject);
        })

        describe("#golang", function () {
            let job: brigadier.JobAbs;
            let cmd = "make ci";
            beforeEach(function () {
                job = t.golang("github.com/custom/toilet", cmd);
            })
            it("should return a testing job with the GOPATH set", function () {
                assert.property(job.env, "GOPATH");
            })
            it("should return a testing job with the wanted test command as a task", function () {
                assert.includeMembers(job.tasks, [cmd]);
            })
        })
    })
})