#!/usr/bin/env node

(function() {

    var ejs = require('../../dist/elastic.js'),
        nc = require('../../dist/elastic-node-client.js'),
        terms = process.argv.slice(2),
        qstr = '*';
    
    // setup client
    ejs.client = nc.NodeClient('localhost', '9200');
    
    // generate the query string
    if (terms.length > 0) {
      qstr = terms.join(' ');
    }

    // a function to handle the results
    var resultsCallBack = function(results) {
        if (!results.hits) {
          console.log('Error executing search');
          process.exit(1);
        }
        
        var hits = results.hits;
        console.log('Found ' + hits.total + ' Results for ' + qstr);
        for (var i = 0; i < hits.hits.length; i++) {
          var hit = hits.hits[i];
          console.log(hit._source.user + ': ' + hit._source.message);
        }
    };

    // execute the search request
    var r = ejs.Request()
        .indices("twitter")
        .types("tweet")
        .query(ejs.QueryStringQuery(qstr));

    r.doSearch(resultsCallBack);
    
})(this);