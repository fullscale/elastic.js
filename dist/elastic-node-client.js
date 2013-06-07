/*! elastic.js - v1.1.1 - 2013-06-07
 * https://github.com/fullscale/elastic.js
 * Copyright (c) 2013 FullScale Labs, LLC; Licensed MIT */

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
  ejs.NodeClient = function (serverUrl) {
    var

      // method to ensure the path always starts with a slash
      getPath = function (path) {
        if (path.charAt(0) !== '/') {
          path = '/' + path;
        }

        return path;
      };

    // Parse the serverUrl into an options object
    var serverUrlObj = url.parse(serverUrl);

    // Pick HTTP or HTTPS
    var httpClient;
    if (serverUrlObj.protocol === 'https') {
      httpClient = https;
    } else {
      httpClient = http;
    }

    return {

      /**
            Sets the ElasticSearch host.

            @member ejs.NodeClient
            @param {String} h the hostname of the ElasticSearch server
            @returns {Object} returns <code>this</code> so that calls can be
              chained. Returns {String} current value if `h` is not specified.
            */
      serverUrl: function (serverUrl) {
        if (serverUrl == null) {
          return url.format(serverUrlObj);
        }

        serverUrlObj = url.parse(serverUrl);
        return this;
      },

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
            path:     path + '?' + querystring.stringify(data),
            method:   'GET'
          },

          req = httpClient.request(opt, function (res) {
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
            path: path,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          },
          req = httpClient.request(opt, function (res) {
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
            path: path,
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            }
          },

          req = httpClient.request(opt, function (res) {
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
            path: path,
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          },

          req = httpClient.request(opt, function (res) {
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
            path: path + '?' + querystring.stringify(data),
            method: 'HEAD'
          },

          req = httpClient.request(opt, function (res) {
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
