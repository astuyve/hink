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
 Search -> GET  /<name>/:category/search/:q
```

Hink should be able to easily add new content types and define which parts are
searchable via the included manifest.yaml file (not quite ready).

This project is frontend agnostic, so anything that consumes this api will be up
to you or included in a different repository.

### Deployment

- `npm install`
- MongoDB requires `/data/db/` to exist for the data store.
- `./bin/start_mongo.sh` will start up your mongo instance. (configure as you
  like, this is nothing fancy)
- `node index.js` (use NODE_ENV=production to run production settings)

### The CLI
There is a cli script (`./bin/cli`). It allows you to do one-off queries from
the command line, or interactively prod your database. The interactive
functionality is provided given the -i or --interactive flag.

![Simple cli functionality](cli-screeny.png)

__Hink means "bucket" in Swedish__
