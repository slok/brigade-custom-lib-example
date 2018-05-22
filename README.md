Brigade custom lib example
===================================

Example of how you could organize a custom brigade library and the creation of a worker with it.

## Get dependencies

```
make install-deps
```

## Build ditribution (library)

```
make build-lib
```

## Tests

```
make test
```

## Worker

Apart from the library it automates the generation of a brigade worker.

```
make docker-build-worker
```

## How to use

You only need to import in your brigade as local lib. Example

```js
const { events, Job, Group } = require("brigadier");
const { TestingJobGenerator } = require("./custom");

function getUnitTestsJob(e, project) {
    let tjg = new TestingJobGenerator(e, project);
    return tjg.golang("github.com/myorg/myrepo", "make ci");
}

...
```


## Hacks & ugly stuff...

**WARNING: this should be deleted when brigadier is a regular npm pacakge and we can import as a regular library**

At this moment this library acts in two ways, when you develop it acts as an npm library (the correct way) and it gets the brigadier library from the worker (is not a published library) and installed in the node_modules. But! our code can't execute as a library when running from a brigade worker because brigadier uses globals and runs as an app, so, in order to get working there are two files that import stuff from different places.

* In development mode `custom-lib/brigadier.ts` will import from our node_modules `brigadier` library.
* In the worker, our code will be with brigadier so it will import locally, for this we use `custom-lib/brigadier.ts_hack`. This file will be rename on the worker to `custom-lib/brigadier.ts` so imports to brigade are local.

Why this hack? well, in order so we don't have to modify all of our code imports, the ugly hack is only on that file, when everything will work as a regular npm module this would be the only file needed to change on our library.

Also, at this moment Yarn doesn't support dependencies that are on a subpath in a Git repository. To do this all our stuff is build in docker and this docker files inherit from the brigade-worker image (the one that has brigadier). so we asume that brigadier library is on `home/src` (the place where is on the dockerfile). So you will see an ugly hack on `package.json`:

```json
"devDependencies": {
   ...
    "brigadier": "/home/src"
}
```
