#!/bin/bash

if [ -d "/data/db/" ]; then
  sudo mongod --fork --logappend --logpath=/var/lib/mongodb/log
else
  echo "directory /data/db/ is missing"
fi
