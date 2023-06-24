#!/bin/bash

FILE=./node_modules/umzug/lib/migration.js
if [ -f $FILE ];then
  sed -i.bak 's/require(this.path);/import(this.path);/' $FILE
fi
