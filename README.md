# elastic.js

`elastic.js` is a JavaScript implementation of the [elasticsearch](http://www.elasticsearch.org/) Query [DSL](http://www.elasticsearch.org/guide/reference/query-dsl/).

## Getting Started
### Building From Source
1. Install node.js and npm
2. Run `npm install`
3. Ensure grunt was installed and is available on your PATH.
4. Run `grunt`

## Documentation
We're working on full API documentation.

## Examples
_(Coming Soon)_

### Client Implementations ###
In order to run on both client and server, elastic.js provides an interface that allows you to plug in different client implementations.
This provides the flexibility to run in different environments across different JavaScript frameworks while still maintaining a fairly
consistent experience.

Below are some client implementations we provide by default.

#### node.js ####
A mode.js client implementation for use on the server side.

    /* A simple search example using elasticjs on node */
    (function() {

        var ejs = require('../dist/elastic.js'),
            nc = require('../dist/elastic-node-client.js');

        /* setup client */
        ejs.client = nc.NodeClient('localhost', '9200');

        /* construct a termQuery object */
        var termQuery = ejs.TermQuery("message", "hello");

        /* a function to display results */
        var resultsCallBack = function(results) {
            if (results.hits) {
                var hits = results.hits.hits;
                for (var i = 0; i < hits.length; i++) {
                    var hit = hits[i];
                    console.log(hit._source.message);
                }
            }
        };

        /* execute the request */
        var r = ejs.Request()
            .collections("twitter")
            .types("tweet")
            .query(termQuery);

        r.get(resultsCallBack);

    })(this);

#### jQuery ####
A jQuery client implementation for general use from within a browser.

    (function($) {
    
        /* setup client */
        ejs.client = ejs.jQueryClient('http://localhost:9200');

        /* construct a termQuery object */
        var termQuery = ejs.TermQuery("message", "hello");
    
        /* a function to display results - uses underscore.js templates */
        var resultsCallBack = function(results) {
            console.log(results);
            if (results.hits) {
                var template = _.template($("#results").html(), results.hits);
                $(".search").empty();
                $(".search").append(template);
            }
        };
    
        /* execute the request */
        var r = ejs.Request()
            .collections("twitter")
            .types("tweet")
            .query(termQuery);
    
        console.log(r.toString());
        r.get(resultsCallBack);

    })(jQuery);

#### Angular.js ####
An angular.js service module that can be injected into your controllers via angular's dependency injection.

    /* start by injecting the module into your application */
    angular.module('MyApp', ['MyApp.controllers', 'elasticjs.service']);
   
    /* then, inject the ejsResource into your controller */
    angular.module('MyApp.controllers', [])
        .controller('SearchCtrl', function($scope, ejsResource) {

            /* instantiate (takes an optional url string) */
            var ejs = ejsResource();

            /* returns a promise - get() also takes success/error callbacks args */
            $scope.results = ejs.Request()
                .collections("twitter") 
                .types("tweet")
                .query(ejs.TermQuery("user", "kimchy"))
                .get();
        )};

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](http://gruntjs.com/).

_Also, please don't edit elastic.js and elastic.min.js files as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 FullScale Labs, LLC  
Licensed under the MIT license.
