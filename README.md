Hink
====

### Purpose
An API built with Node.js containing all of your text or file
based data.  Hink tries to make it easy to store notes, links, images which are
searchable via mongo and a RESTful API.

[![Build Status](https://travis-ci.org/tippenein/hink.png?branch=master)](https://travis-ci.org/tippenein/hink)

### Endpoints supplied by all:
```
 List   -> GET  /<name>/:category
 Create -> POST /<name>/:category
 Show   -> GET  /<name>/:category/:id
 Delete -> DEL  /<name>/:category/:id
 Update -> PUT  /<name>/:category/:id
```

### Search endpoints
```
 /<name>/:category/search/:query -> Search category of <name> -> GET
 /<name>/search/:query           -> Search <name>
 /search/:query                  -> Search all the data types
```

### Goal
Hink should be able to easily add new content types and define which parts are
searchable. The basic idea is to categorize and partition portions of your data
that you'd like easily query-able (we'll pretend that's a word).

This project is frontend agnostic, so anything that consumes this api will be up
to you or included in a different repository.

### Deployment

- `npm install`
- MongoDB requires `/data/db/` to exist for the data store.
- `./bin/start_mongo.sh` will start up your mongo instance. (configure as you
  like, this is nothing fancy)
- `node server.js` (use NODE_ENV=production to run production settings)

### No controllers or models file?!
The controllers are generated from base controllers for each type of data you
define in the `manifest.yaml`.  The model schemas are crafted from the key
list, also specified per type in the `manifest.yaml`.

### The idea of manifest.yaml
Instead of creating models for each of the types of data we want, we create a
manifest of models and their attributes. The reason for this is, with a model,
you can't specify which fields are searchable. The `searchable` list within each
type defines how those data pieces are indexed. The `type` keyword basically
defines the type of base controller this type of data will use (what kind of
data is this? Pick the right controller.) `type: text` gets the
`TextController` object.. you get the idea.

### The CLI
There is a cli script (`./bin/cli`). It allows you to do one-off queries from
the command line, or interactively prod your database. The interactive
functionality is provided given the -i or --interactive flag.

![Simple cli functionality](cli-screeny.png)

__Hink means "bucket" in Swedish__
