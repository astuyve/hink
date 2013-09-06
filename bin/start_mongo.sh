#!/bin/bash

if [ -d "/data/db/" ]; then
  sudo mongod --fork --logappend --logpath=/var/log/mongodb/hink.log
else
  echo "directory /data/db/ is required for mongo"
fi
