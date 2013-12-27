#!/bin/bash

grunt
./jsdoc -t elasticjs -d ../dist/docs ../dist/elastic.js
#../node_modules/.bin/jsdoc -t elasticjs -d ../dist/docs ../dist/elastic.js
