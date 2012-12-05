  /* Utility methods, most of which are pulled from underscore.js. */
  
  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  has = function (obj, key) {
    return hasOwnProp.call(obj, key);
  };
    
  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  each = function (obj, iterator, context) {
    if (obj == null) {
      return;
    }
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) {
          return;
        }
      }
    } else {
      for (var key in obj) {
        if (has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) {
            return;
          }
        }
      }
    }
  };
      
  // Extend a given object with all the properties in passed-in object(s).
  extend = function (obj) {
    each(slice.call(arguments, 1), function (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  // switched to ===, not sure why underscore used ==
  isArray = nativeIsArray || function (obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  isObject = function (obj) {
    return obj === Object(obj);
  };
  
  // switched to ===, not sure why underscore used ==
  isString = function (obj) {
    return toString.call(obj) === '[object String]';
  };
  
  // switched to ===, not sure why underscore used ==
  isNumber = function (obj) {
    return toString.call(obj) === '[object Number]';
  };
  