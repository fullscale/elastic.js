/**
 @namespace
 @name ejs
 @desc All elastic.js modules are organized under the ejs namespace.
 */
(function () {

  var 

    // save reference to global object
    // `window` in browser
    // `exports` on server
    root = this,
    
    // save the previous version of ejs
    _ejs = root.ejs,

    // from underscore.js, used in utils
    ArrayProto = Array.prototype, 
    ObjProto = Object.prototype, 
    slice = ArrayProto.slice,
    hasOwnProp = ObjProto.hasOwnProperty,
    nativeForEach = ArrayProto.forEach,
    breaker = {},
    has,
    each,
    extend,

    // create ejs object
    ejs;
    
  if (typeof exports !== 'undefined') {
    ejs = exports;
  } else {
    ejs = root.ejs = {};
  }
