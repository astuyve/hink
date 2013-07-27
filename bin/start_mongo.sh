#!/bin/bash

if [ -d "/data/db/" ]; then
  pkill mongo
  mongod --fork --logappend --logpath=/var/lib/mongodb/log
else
  echo "directory /data/db/ is missing"
fi
