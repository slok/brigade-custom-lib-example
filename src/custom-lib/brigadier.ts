
// WARNING: This is an ugly hack done because we can't export brigadier as a package because it will run the app.
// Until brigadier can be use as a proper library or module we need to import only the files that we want.
// This should be removed ASAP.

export { BrigadeEvent, Project } from "../../node_modules/brigadier/dist/events";
export { Group } from "../../node_modules/brigadier/dist/group";
export { Job as JobAbs, Result } from "../../node_modules/brigadier/dist/job";
export { Job } from "../../node_modules/brigadier/dist/brigadier";