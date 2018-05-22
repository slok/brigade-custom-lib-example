import * as brigadier from "./brigadier";

const gopath = "/go";
const goTestImage = "golang:1.10";

/**
 * TestingJobsGenerator will return different testing jobs for different kind of project
 * types.
 */
export class TestingJobGenerator {
    constructor(public event: brigadier.BrigadeEvent, public project: brigadier.Project){}

    /**
     * golang will return a unit testing go job.
     * @param projectImportPath
     * @param testCommand
     * @param name="unit-test" Name for the job to be created
     */
    public golang(projectImportPath: string, testCommand: string, name = "unit-test"): brigadier.JobAbs {
        const localPath = `${gopath}/src/${projectImportPath}`
        var job = new brigadier.Job(name, goTestImage);
        job.env = {
            "DEST_PATH": localPath,
            "GOPATH": gopath
        };
        job.tasks = [
            `mkdir -p ${localPath}`,
            `mv /src/* ${localPath}`,
            `cd ${localPath}`,
            testCommand,
        ];
        return job;
    }
}
