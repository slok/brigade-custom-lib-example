import * as brigadier from "../../src/custom-lib/brigadier"


export function mockEvent(payload:string="{}"): brigadier.BrigadeEvent {
    return {
        buildID: "1234567890abcdef",
        workerID: "test-1234567890abcdef-12345678",
        type: "push",
        provider: "github",
        revision: {
            commit: "c0ffee",
            ref: "c0ffee"
        },
        payload: payload,
    } as brigadier.BrigadeEvent
}

export function mockProject(secrets: { [key: string]: string }={}): brigadier.Project {
    return {
        id: "brigade-c0ff33544b459e6ac0ffee",
        name: "deis/empty-testbed",
        repo: {
            name: "deis/empty-testbed",
            cloneURL: "https://github.com/deis/empty-testbed.git",
            token: "supersecret",
            initGitSubmodules: false
        },
        kubernetes: {
            namespace: "default",
            vcsSidecar: "deis/git-sidecar:latest",
            buildStorageSize: "50Mi"
        },
        secrets: secrets,
        allowPrivilegedJobs: true,
        allowHostMounts: false,
    } as brigadier.Project
}

export function mockProjectWithDockerCredentials(secrets: { [key: string]: string } = {}): brigadier.Project {
    let project = mockProject(secrets)
    project.secrets = {
        dockerUser: "batman",
        dockerPassword: "darkKnight",
        dockerRepo: "dist.myrepo.batman.com:5000"
    }
    return project
}