/*global require:true */

(function () {
  'use strict';

  var

    // node imports
    http = require('http'),
    https = require('https'),
    url  = require('url'),
    querystring = require('querystring'),

    // save reference to global object
    // `window` in browser
    // `exports` on server
    root = this,
    ejs;

  // create namespace
  // use existing ejs object if it exists
  if (typeof exports !== 'undefined') {
    ejs = exports;
  } else {
    if (root.ejs === null) {
      ejs = root.ejs = {};
    } else {
      ejs = root.ejs;
    }
  }

  /**
    @class
    A <code>NodeClient</code> is a type of <code>client</code> that uses
    NodeJS http module for communication with ElasticSearch.

    @name ejs.NodeClient

    @desc
    A client that uses the NodeJS http module for communication.

    @param {String} server the ElasticSearch server location.  Leave blank if
    code is running on the same server as ElasticSearch, ie. in a plugin.
    An example server is http://user:password@localhost:9200/.
    */
  ejs.NodeClient = function (serverUrlOrHost, portOrUndefined) {
    var

      // method to ensure the path always starts with a slash and is prefixed
      // with the path of the ES endpoint.
      getPath = function (path, queryStringData) {
        if (path !== '' && path.charAt(0) !== '/') {
          path = serverUrlObj.path + '/' + path;
        } else {
          path = serverUrlObj.path + path;
        }
        if (queryStringData !== undefined && queryStringData !== null) {
          var qs = querystring.stringify(queryStringData);
          if (qs) {
            path = path + '?' + qs;
          }
        }
        return path;
      };

    // Parse the serverUrl into an options object
    var serverUrlObj;

    // Pick HTTP or HTTPS
    var httpClientObj;

    var httpClientFct = function(c) {
      if (!c) {
        return httpClientObj;
      }
      if (c.protocol) {
        c = c.protocol;
      }
      if (typeof c === 'string') {
        if (c.indexOf('https') === 0) {
          httpClientObj = https;
        } else {
          httpClientObj = http;
        }
      } else if (typeof c.request === 'function') {
        httpClientObj = c;
      }
      return this;
    };
    var serverUrlFct = function (serverUrlOrHost, portOrUndefined) {
      if (!serverUrlOrHost) {
        return url.format(serverUrlObj);
      }
      var serverUrl;
      if (portOrUndefined > 0) {
        serverUrl = 'http://' + serverUrlOrHost + ':' + portOrUndefined;
      } else if (serverUrlOrHost.indexOf('://') === -1) {
        serverUrl = 'http://' + serverUrlOrHost + ':' + 80;
      } else {
        serverUrl = serverUrlOrHost;
      }

      serverUrlObj = url.parse(serverUrl);
      // remove the root path as we guarantee that there 
      // will be a '/' appended later
      if (serverUrlObj.path.charAt(serverUrlObj.path.length - 1) === '/' && serverUrlObj.pathname === '/') {
        serverUrlObj.path = serverUrlObj.path.slice(0, serverUrlObj.path.length - 1);
        serverUrlObj.pathname = '';
      }
      httpClientFct(serverUrlObj);
      return this;
    };
    if (serverUrlOrHost) {
      serverUrlFct(serverUrlOrHost, portOrUndefined);
    }
    if (serverUrlObj) {
      httpClientFct(serverUrlObj);
    }

    return {

      /**
            Sets the ElasticSearch endpoint.

            @member ejs.NodeClient
            @param {String} h the hostname of the ElasticSearch server
            @returns {Object} returns <code>this</code> so that calls can be
              chained. Returns {Object} current value if `h` is not specified.
            */
      serverUrl: serverUrlFct,

      /**
            Sets the httpClient used to make requests against Elasticsearch.
            Mostly used to customize the client or for testing.

            @member ejs.NodeClient
            @param {Object} `c` Either a url or a protocol or require('http') or require('https')
            @returns {Object} returns <code>this</code> so that calls can be
              chained. Returns {Object} current value if `c` is not specified.
            */
      httpClient: httpClientFct,

      /**
            Performs HTTP GET requests against the server.

            @member ejs.NodeClient
            @param {String} path the path to GET from the server
            @param {Object} data an object of url parameters for the request
            @param {Function} successcb a callback function that will be called with
              the results of the request.
            @param {Function} errorcb a callback function that will be called
                when there is an error with the request
            */
      get: function (path, data, successcb, errorcb) {
        var opt = {
            hostname: serverUrlObj.hostname,
            port:     serverUrlObj.port,
            auth:     serverUrlObj.auth,
            path:     getPath(path, data),
            method:   'GET'
          },

          req = httpClientObj.request(opt, function (res) {
            var resData = '';
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
              resData = resData + chunk;
            });

            res.on('end', function () {
              if (typeof successcb === 'function') {
                successcb(JSON.parse(resData));
              }
            });

          });

        // handle request errors
        if (typeof errorcb === 'function') {
          req.on('error', errorcb);
        }

        req.end();
      },

      /**
            Performs HTTP POST requests against the server.

            @member ejs.NodeClient
            @param {String} path the path to POST to on the server
            @param {String} data the POST body
            @param {Function} successcb a callback function that will be called with
              the results of the request.
            @param {Function} errorcb a callback function that will be called
                when there is an error with the request
            */
      post: function (path, data, successcb, errorcb) {
        var

          opt = {
            hostname: serverUrlObj.hostname,
            port:     serverUrlObj.port,
            auth:     serverUrlObj.auth,
            path:     getPath(path),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          },
          req = httpClientObj.request(opt, function (res) {
            var resData = '';
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
              resData = resData + chunk;
            });

            res.on('end', function () {
              if (typeof successcb === 'function') {
                successcb(JSON.parse(resData));
              }
            });

          });

        // handle request errors
        if (typeof errorcb === 'function') {
          req.on('error', errorcb);
        }

        req.write(data);
        req.end();
      },

      /**
            Performs HTTP PUT requests against the server.

            @member ejs.NodeClient
            @param {String} path the path to PUT to on the server
            @param {String} data the PUT body
            @param {Function} successcb a callback function that will be called with
              the results of the request.
            @param {Function} errorcb a callback function that will be called
                when there is an error with the request
            */
      put: function (path, data, successcb, errorcb) {
        var

          opt = {
            hostname: serverUrlObj.hostname,
            port:     serverUrlObj.port,
            auth:     serverUrlObj.auth,
            path:     getPath(path),
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            }
          },

          req = httpClientObj.request(opt, function (res) {
            var resData = '';
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
              resData = resData + chunk;
            });

            res.on('end', function () {
              if (typeof successcb === 'function') {
                successcb(JSON.parse(resData));
              }
            });

          });

        // handle request errors
        if (typeof errorcb === 'function') {
          req.on('error', errorcb);
        }

        req.write(data);
        req.end();
      },

      /**
            Performs HTTP DELETE requests against the server.

            @member ejs.NodeClient
            @param {String} path the path to DELETE to on the server
            @param {String} data the DELETE body
            @param {Function} successcb a callback function that will be called with
              the results of the request.
            @param {Function} errorcb a callback function that will be called
                when there is an error with the request
            */
      del: function (path, data, successcb, errorcb) {
        var

          opt = {
            hostname: serverUrlObj.hostname,
            port:     serverUrlObj.port,
            auth:     serverUrlObj.auth,
            path:     getPath(path),
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          },

          req = httpClientObj.request(opt, function (res) {
            var resData = '';
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
              resData = resData + chunk;
            });

            res.on('end', function () {
              if (typeof successcb === 'function') {
                successcb(JSON.parse(resData));
              }
            });

          });

        // handle request errors
        if (typeof errorcb === 'function') {
          req.on('error', errorcb);
        }

        req.write(data);
        req.end();
      },

      /**
            Performs HTTP HEAD requests against the server. Same as
            <code>get</code>, except only returns headers.

            @member ejs.NodeClient
            @param {String} path the path to HEAD to on the server
            @param {Object} data an object of url parameters.
            @param {Function} successcb a callback function that will be called with
              the an object of the returned headers.
            @param {Function} errorcb a callback function that will be called
                when there is an error with the request
            */
      head: function (path, data, successcb, errorcb) {
        var

          opt = {
            hostname: serverUrlObj.hostname,
            port:     serverUrlObj.port,
            auth:     serverUrlObj.auth,
            path:     getPath(path, data),
            method: 'HEAD'
          },

          req = httpClientObj.request(opt, function (res) {
            if (typeof successcb === 'function') {
              successcb(res.headers);
            }
          });

        // handle request errors
        if (typeof errorcb === 'function') {
          req.on('error', errorcb);
        }

        req.end();
      }
    };
  };

}).call(this);
