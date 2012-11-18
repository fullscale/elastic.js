(function () {

  var 

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
  
  ejs.jQueryClient = function (server) {
    var 
    
      options = {
        contentType: 'application/json',
        dataType: 'json',
        processData: false
      },
    
      getPath = function (path) {
        if (path.charAt(0) !== '/') {
          path = '/' + path;
        }
        
        return server + path;
      };
    
      
    if (server == null) {
      server = '';
    } else if (server.charAt(server.length - 1) === '/') {
      server = server.substring(0, server.length - 1);
    }
      
    return {
      
      server: function (s) {
        if (s == null) {
          return server;
        }
        
        if (s.charAt(s.length - 1) === '/') {
          server = s.substring(0, s.length - 1);
        } else {
          server = s;
        }
        
        return this;
      },
      
      option: function (oKey, oVal) {
        if (oKey == null) {
          return options;
        }
        
        if (oVal == null) {
          return options[oKey];
        }
        
        options[oKey] = oVal;
      },
      
      get: function (path, data, cb) {
        var opt = jQuery.extend({}, options);
        
        opt.type = 'GET';
        opt.url = getPath(path);
        opt.data = data;
        opt.success = cb;

        return jQuery.ajax(opt);
      },
      
      post: function (path, data, cb) {
        var opt = jQuery.extend({}, options);
        
        opt.type = 'POST';
        opt.url = getPath(path);
        opt.data = data;
        opt.success = cb;
       
        return jQuery.ajax(opt);  
      },
      
      put: function (path, data, cb) {
        var opt = jQuery.extend({}, options);
        
        opt.type = 'PUT';
        opt.url = getPath(path);
        opt.data = data;
        opt.success = cb;
        
        return jQuery.ajax(opt);
      },
      
      del: function (path, data, cb) {
        var opt = jQuery.extend({}, options);
        
        opt.type = 'DELETE';
        opt.url = getPath(path);
        opt.data = data;
        opt.success = cb;
        
        return jQuery.ajax(opt);
      },
      
      head: function (path, data, cb) {
        var opt = jQuery.extend({}, options);
        
        opt.type = 'HEAD';
        opt.url = getPath(path);
        opt.data = data;
        opt.complete = function (jqXHR, textStatus) {
          var headers = jqXHR.getAllResponseHeaders().split('\n'),
            resp = {},
            parts,
            i;
            
          for (i = 0; i < headers.length; i++) {
            parts = headers[i].split(':');
            if (parts.length !== 2) {
              resp[parts[0]] = parts[1];
            }
          }
          
          cb(resp);
        };
        
        return jQuery.ajax(opt);
      }
    };
  };

}(this));