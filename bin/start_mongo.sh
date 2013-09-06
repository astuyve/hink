#!/bin/bash

if [ -d "/data/db/" ]; then
  if [ -d "/var/log/mongodb" ]; then
    sudo mongod --fork --logappend --logpath=/var/log/mongodb/hink.log
  else
    # Must be one of those damn OSX users...
    mongod --fork --logappend --logpath=/usr/local/var/log/mongodb/hink.log
  fi
else
  echo "directory /data/db/ is required for mongo"
fi
