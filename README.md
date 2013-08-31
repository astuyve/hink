Hink
====

### Purpose
Hink: A web-based bucket built in Node.js containing all of your notes, tasks, and bookmarks in a taggable, indexable way with a RESTful API to access them.


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
There is a cli script (`./bin/cli`) for use.
![Simple cli functionality](cli-screeny.png)

### Deployment

- Clone the repo
- `npm install`
- `node index.js` (use NODE_ENV=production to run production settings)

*Requires MongoDB*

### Testing  
[![Build Status](https://travis-ci.org/tippenein/hink.png?branch=master)](https://travis-ci.org/tippenein/hink)

### Authors

- [tippenein](https://github.com/tippenein)
- [ChrisArcand](https://github.com/ChrisArcand)
