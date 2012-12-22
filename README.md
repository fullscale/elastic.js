# elastic.js

A JavaScript implementation of the [ElasticSearch](http://www.elasticsearch.org/) Query [DSL](http://www.elasticsearch.org/guide/reference/query-dsl/) and Core API.

## Getting Started
### In the browser
1. Include elastic.min.js
2. Include your client, elastic-jquery-client.min.js or elastic-angular-client.min.js.
3. Initialize your client:
    * jQuery Client - `ejs.client = ejs.jQueryClient('http://localhost:9200');`
    * Angular Client
        ```javascript
        /* start by injecting the module into your application */
        angular.module('MyApp', ['MyApp.controllers', 'elasticjs.service']);

        /* then, inject the ejsResource into your controller */
        angular.module('MyApp.controllers', [])
            .controller('SearchCtrl', function($scope, ejsResource) {

                /* instantiate (takes an optional url string) */
                var ejs = ejsResource();
        ```
4. Write your application
        
### In Node.js
1. Run `npm install elastic.js`
2. Require elastic.js and elastic-node-client.js
    ```javascript
    var ejs = require('elastic.js'),
        nc = require('elastic-node-client.js');
    ```
3. Initialize your client - `ejs.client = nc.NodeClient('localhost', '9200');`
4. Write your application

### Building From Source
1. Install node.js and npm
2. Run `npm install`
3. Ensure grunt was installed and is available on your PATH.
4. Run `grunt`
5. Resulting files will be placed in the `dist` directory.

## Documentation
You can find the official documentation at the following locations:

- [User Guide](http://docs.fullscale.co/elasticjs/user)
- [API Documentation](http://docs.fullscale.co/elasticjs/api)

You will also be able to find unofficial documentation and examples on on our 
[blog](http://fullscale.github.com/blog/) and GitHub Gist pages [here](https://gist.github.com/mattweber)
and [here](https://gist.github.com/egaumer).

## Examples
You can find some basic examples in the `examples` directory.  To run the examples you need to
have node.js installed and have built elastic.js from source.  Start an instance of ElasticSearch
using the default settings so it is available at [localhost:9200](http://localhost:9200/).

### Angular and jQuery Examples
These examples need to served from a web server.  We have provided a very basic web server written
in Node.js for this purpose.

1. Navigate to the `examples` directory.
2. Run server.js: `node server.js`.
3. Open [Angular Example](http://localhost:8125/angular) or [jQuery Example](http://localhost:8125/jquery).

### Node.js Example
The Node.js example is a basic command line tool that accepts a set of query terms, executes the query,
and prints the results.

1. Navigate to the `examples/node` directory.
2. Run findtweets.js with your query terms.  `node findtweets.js query terms here`

### Client Implementations ###
In order to run on both client and server, elastic.js provides an interface that allows you to plug in different client implementations.
This provides the flexibility to run in different environments across different JavaScript frameworks while still maintaining a fairly
consistent experience. Below are some client implementations we provide by default.

#### node.js ####
A node.js client implementation for use on the server side.

```javascript
    /* A simple search example using elasticjs on node */
    (function() {

        var ejs = require('elastic.js'),
            nc = require('elastic-node-client.js');

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

        r.doSearch(resultsCallBack);

    })(this);
```

#### jQuery ####
A jQuery client implementation for general use from within a browser.

```javascript
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
        r.doSearch(resultsCallBack);

    })(jQuery);
```

#### Angular.js ####
An angular.js service module that can be injected into your controllers via angular's dependency injection.

```javascript
    /* start by injecting the module into your application */
    angular.module('MyApp', ['MyApp.controllers', 'elasticjs.service']);
   
    /* then, inject the ejsResource into your controller */
    angular.module('MyApp.controllers', [])
        .controller('SearchCtrl', function($scope, ejsResource) {

            /* instantiate (takes an optional url string) */
            var ejs = ejsResource();

            /* returns a promise - get() also takes success/error callback args */
            $scope.results = ejs.Request()
                .collections("twitter") 
                .types("tweet")
                .query(ejs.TermQuery("user", "kimchy"))
                .doSearch();
        )};
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](http://gruntjs.com/).

_Also, please don't edit elastic.js and elastic.min.js files as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## License
Copyright (c) 2012 FullScale Labs, LLC  
Licensed under the MIT license.
