import * as brigadier from "./brigadier";

/**
 * Debugger is a simple debugging class.
 */
export class Debugger {
    public event: brigadier.BrigadeEvent;
    public project: brigadier.Project;

    constructor(event: brigadier.BrigadeEvent, project: brigadier.Project) {
        this.event = event;
        this.project = project;
    }

    public debugEvent() {
        console.log("-----------------Event-----------------");
        console.log(this.event);
        console.log("---------------------------------------");
    }

    public debugProject() {
        console.log("-----------------Project-----------------");
        console.log(this.project);
        console.log("---------------------------------------");
    }

    public debugBoth() {
        this.debugEvent();
        this.debugProject();
    }
}
