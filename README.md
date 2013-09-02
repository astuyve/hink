Hink
====

### Purpose
Hink: A web-based bucket built in Node.js containing all of your notes, tasks,
and bookmarks in a taggable, indexable way with a RESTful API to access them.

[![Build Status](https://travis-ci.org/tippenein/hink.png?branch=master)](https://travis-ci.org/tippenein/hink)

### Resources supported  
We're currently developing these models to start with:

- Notes
- Links (url bookmarks)
- Images

### Endpoints supplied by all:
```
 GET /<name>/:category -> list
 POST /<name>/:category -> create
 GET /<name>/:category/search/:q -> search
 GET /<name>/:category/:id -> show
 GET /<name>/:category/:id/edit -> edit
 PUT /<name>/:category/:id -> update
```

Hink should be able to easily add new content types simply by defining a schema
and restarting the server.

### The CLI
There is a cli script (`./bin/cli`).
![Simple cli functionality](cli-screeny.png)

### Deployment

- `npm install`
- MongoDB requires `/data/db/` to exist for the data store.
- `./bin/start_mongo.sh` will start up your mongo instance. (configure as you
  like, this is nothing fancy)
- `node index.js` (use NODE_ENV=production to run production settings)

### Authors

- [tippenein](https://github.com/tippenein)
- [ChrisArcand](https://github.com/ChrisArcand)
