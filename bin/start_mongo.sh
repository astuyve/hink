#!/bin/bash

if [ -d "/data/db/" ]; then
  if [ -d "/var/lib/mongodb" ]; then
    sudo mongod --fork --logappend --logpath=/var/lib/mongodb/log
  else
    # Must be one of those damn OSX users...
    mongod --fork --logappend --logpath=/usr/local/var/log/mongodb/mongo.log
  fi
else
  echo "directory /data/db/ is missing"
fi
