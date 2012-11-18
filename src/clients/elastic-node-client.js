/*global require:true */
(function () {

  var 

    // node imports
    http = require('http'),
    querystring = require('querystring'),
    
    // save reference to global object
    // `window` in browser
    // `exports` on server
    root = this,
    ejs;
    
  if (typeof exports !== 'undefined') {
    ejs = exports;
  } else {
    if (root.ejs == null) {
      ejs = root.ejs = {};
    } else {
      ejs = root.ejs;
    }
  }
  
  ejs.NodeClient = function (host, port) {
    var 
    
      getPath = function (path) {
        if (path.charAt(0) !== '/') {
          path = '/' + path;
        }
        
        return path;
      };
    
    return {
    
      host: function (h) {
        if (h == null) {
          return host;
        }
        
        host = h;
        return this;
      },
      
      port: function (p) {
        if (p == null) {
          return port;
        }
        
        port = p;
        return this;
      },
      
      get: function (path, data, cb) {
        var 
        
          opt = {
            host: host,
            port: port,
            path: path + '?' + querystring.stringify(data),
            method: 'GET'
          },
          
          req = http.request(opt, function (res) {
            var resData = '';
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
              resData = resData + chunk;
            });

            res.on('end', function () {
              cb(JSON.parse(resData));
            });
            
          });
          
        req.end();
      },
      
      post: function (path, data, cb) {
        var 
        
          opt = {
            host: host,
            port: port,
            path: path,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          },
          
          req = http.request(opt, function (res) {
            var resData = '';
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
              resData = resData + chunk;
            });

            res.on('end', function () {
              cb(JSON.parse(resData));
            });
            
          });
          
        req.write(data);
        req.end();        
      },
      
      put: function (path, data, cb) {
        var 
        
          opt = {
            host: host,
            port: port,
            path: path,
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            }
          },
          
          req = http.request(opt, function (res) {
            var resData = '';
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
              resData = resData + chunk;
            });

            res.on('end', function () {
              cb(JSON.parse(resData));
            });
            
          });
          
        req.write(data);
        req.end();        
      },
      
      del: function (path, data, cb) {
        var 
        
          opt = {
            host: host,
            port: port,
            path: path,
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          },
          
          req = http.request(opt, function (res) {
            var resData = '';
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
              resData = resData + chunk;
            });

            res.on('end', function () {
              cb(JSON.parse(resData));
            });
            
          });
          
        req.write(data);
        req.end();        
      },
      
      head: function (path, data, cb) {
        var 
        
          opt = {
            host: host,
            port: port,
            path: path + '?' + querystring.stringify(data),
            method: 'HEAD'
          },
          
          req = http.request(opt, function (res) {
            cb(res.headers);
          });
          
        req.end();        
      }
    };
  };

}(this));