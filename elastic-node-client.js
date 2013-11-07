/*! elastic.js - v1.1.1 - 2013-08-14
 * https://github.com/fullscale/elastic.js
 * Copyright (c) 2013 FullScale Labs, LLC; Licensed MIT */

/*global require:true */

(function () {
  'use strict';

  var 

    // node imports
    protocol,
    http = require('http'),
    https = require('https'),
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
    if (root.ejs == null) {
      ejs = root.ejs = {};
    } else {
      ejs = root.ejs;
    }
  }
  
  /**
    @class
    A <code>NodeClient</code> is a type of <code>client</code> that uses
    NodeJS http or https module for communication with ElasticSearch.
    
    @name ejs.NodeClient

    @desc
    A client that uses the NodeJS http or https module for communication.

    @param {String} host the optional hostname of your ES server. Default localhost.
    @param {String} post the optional port of your ES server. Default 9200.
    @param {String} proto the optional protocol to use (http or https). Default http.
    */
  ejs.NodeClient = function (host, port, proto) {
    var 
      // http option defaults
      options = {
        headers: {
          'Content-Type': 'application/json'
        }
      },
      
      // clone defaults
      getOptions = function () {
        var option,
            opts = {};
            
        for (option in options) {
          if (!options.hasOwnProperty(option)) {
            continue;
          }
          
          opts[option] = options[option];
        }
        
        return opts;
      },
      
      // method to ensure the path always starts with a slash
      getPath = function (path) {
        if (path.charAt(0) !== '/') {
          path = '/' + path;
        }
        
        return path;
      };
    
    if (host == null) {
      host = 'localhost';
    }
    
    if (proto === 'https' || proto === 'HTTPS') {
      proto = 'https';
      protocol = https;
    } else {
      proto = 'http';
      protocol = http;
    }
    
    if (port == null && proto === 'http') {
      port = '9200';
    } else if (port == null && proto === 'https') {
      port = '443';
    }
    
    return {
    
      /**
            Sets the ElasticSearch host.

            @member ejs.NodeClient
            @param {String} h the hostname of the ElasticSearch server
            @returns {Object} returns <code>this</code> so that calls can be 
              chained. Returns {String} current value if `h` is not specified.
            */
      host: function (h) {
        if (h == null) {
          return host;
        }
        
        host = h;
        return this;
      },
      
      /**
            Sets the ElasticSearch port.

            @member ejs.NodeClient
            @param {String} p the port of the ElasticSearch server
            @returns {Object} returns <code>this</code> so that calls can be 
              chained. Returns {String} current value if `p` is not specified.
            */
      port: function (p) {
        if (p == null) {
          return port;
        }
        
        port = p;
        return this;
      },
      
      /**
            Sets the transport protocol, currently only http or https.

            @member ejs.NodeClient
            @param {String} p the protocol to use, http or https.
            @returns {Object} returns <code>this</code> so that calls can be 
              chained. Returns {String} current value if `p` is not specified.
            */
      protocol: function (p) {
        if (p == null) {
          return proto;
        }
        
        p = p.toLowerCase();
        if (p === 'https') {
          protocol = https;
          proto = p;
        } else {
          proto = 'http';
          protocol = http;
        }
        
        return this;
      },
      
      /**
            Sets a request option.

            @member ejs.NodeClient
            @param {String} oKey The option name
            @param {String} oVal The option value
            @returns {Object} returns <code>this</code> so that calls can be 
            chained. Returns the current value of oKey if oVal is not set.
            */
      option: function (oKey, oVal) {
        if (oKey == null) {
          return options;
        }
        
        if (oVal == null) {
          return options[oKey];
        }
        
        options[oKey] = oVal;
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
        var req,
            opt = getOptions();
          
        opt.host = host;
        opt.port = port;
        opt.path = path + '?' + querystring.stringify(data);
        opt.method = 'GET';
        
        req = protocol.request(opt, function (res) {
          var resData = '';
          res.setEncoding('utf8');

          res.on('data', function (chunk) {
            resData = resData + chunk;
          });

          res.on('end', function () {
            if (successcb != null) {
              successcb(JSON.parse(resData));
            }
          });
          
        });
        
        // handle request errors
        if (errorcb != null) {
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
        var req,
            opt = getOptions();
        
        opt.host = host;
        opt.port = port;
        opt.path = path;
        opt.method = 'POST';
        
        req = protocol.request(opt, function (res) {
          var resData = '';
          res.setEncoding('utf8');

          res.on('data', function (chunk) {
            resData = resData + chunk;
          });

          res.on('end', function () {
            if (successcb != null) {
              successcb(JSON.parse(resData));
            }
          });
          
        });
        
        // handle request errors
        if (errorcb != null) {
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
        var req,
            opt = getOptions();
        
        opt.host = host;
        opt.port = port;
        opt.path = path;
        opt.method = 'PUT';
                  
        req = protocol.request(opt, function (res) {
          var resData = '';
          res.setEncoding('utf8');

          res.on('data', function (chunk) {
            resData = resData + chunk;
          });

          res.on('end', function () {
            if (successcb != null) {
              successcb(JSON.parse(resData));
            }
          });
          
        });
        
        // handle request errors
        if (errorcb != null) {
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
        var req,
            opt = getOptions();
        
        opt.host = host;
        opt.port = port;
        opt.path = path;
        opt.method = 'DELETE';
          
        req = protocol.request(opt, function (res) {
          var resData = '';
          res.setEncoding('utf8');

          res.on('data', function (chunk) {
            resData = resData + chunk;
          });

          res.on('end', function () {
            if (successcb != null) {
              successcb(JSON.parse(resData));
            }
          });
          
        });
          
        // handle request errors
        if (errorcb != null) {
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
        var req,
            opt = getOptions();
          
        opt.host = host;
        opt.port = port;
        opt.path = path + '?' + querystring.stringify(data);
        opt.method = 'HEAD';
          
        req = protocol.request(opt, function (res) {
          if (successcb != null) {
            successcb(res.headers);
          }
        });
        
        // handle request errors
        if (errorcb != null) {
          req.on('error', errorcb);
        }
          
        req.end();        
      }
    };
  };

}).call(this);