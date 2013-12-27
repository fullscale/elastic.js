  /**
    @class
    <p>A GeoPoint object that can be used in queries and filters that 
    take a GeoPoint.  GeoPoint supports various input formats.</p>

    <p>See http://www.elasticsearch.org/guide/reference/mapping/geo-point-type.html</p>

    @name ejs.GeoPoint
    @ejs geo

    @desc
    <p>Defines a point</p>

    @param {Array} p An optional point as an array in [lat, lon] format.
    */
  ejs.GeoPoint = function (p) {

    var point = [0, 0];

    // p  = [lat, lon], convert it to GeoJSON format of [lon, lat]
    if (p != null && isArray(p) && p.length === 2) {
      point = [p[1], p[0]];
    }
  
    return {

      /**
            Sets the GeoPoint as properties on an object.  The object must have
            a 'lat' and 'lon' or a 'geohash' property.  
          
            Example:
            {lat: 41.12, lon: -71.34} or {geohash: "drm3btev3e86"}

            @member ejs.GeoPoint
            @param {Object} obj an object with a lat and lon or geohash property.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      properties: function (obj) {
        if (obj == null) {
          return point;
        }
      
        if (isObject(obj) && has(obj, 'lat') && has(obj, 'lon')) {
          point = {
            lat: obj.lat,
            lon: obj.lon
          };
        } else if (isObject(obj) && has(obj, 'geohash')) {
          point = {
            geohash: obj.geohash
          };
        }
      
        return this;
      },

      /**
            Sets the GeoPoint as a string.  The format is "lat,lon".
          
            Example:
          
            "41.12,-71.34"

            @member ejs.GeoPoint
            @param {String} s a String point in "lat,lon" format.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      string: function (s) {
        if (s == null) {
          return point;
        }
      
        if (isString(s) && s.indexOf(',') !== -1) {
          point = s;
        }
      
        return this;
      },
    
      /**
            Sets the GeoPoint as a GeoHash.  The hash is a string of 
            alpha-numeric characters with a precision length that defaults to 12.
          
            Example:
            "drm3btev3e86"

            @member ejs.GeoPoint
            @param {String} hash an GeoHash as a string
            @param {Integer} precision an optional precision length, defaults
              to 12 if not specified.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      geohash: function (hash, precision) {
        // set precision, default to 12
        precision = (precision != null && isNumber(precision)) ? precision : 12;
      
        if (hash == null) {
          return point;
        }
      
        if (isString(hash) && hash.length === precision) {
          point = hash;
        }
      
        return this;
      },
    
      /**
            Sets the GeoPoint from an array point.  The array must contain only
            2 values.  The first value is the lat and the 2nd value is the lon.
          
            Example:
            [41.12, -71.34]

            @member ejs.GeoPoint
            @param {Array} a an array of length 2.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      array: function (a) {
        if (a == null) {
          return point;
        }
      
      
        // convert to GeoJSON format of [lon, lat]
        if (isArray(a) && a.length === 2) {
          point = [a[1], a[0]];
        }
      
        return this;
      },

      /**
            The type of ejs object.  For internal use only.
            
            @member ejs.GeoPoint
            @returns {String} the type of object
            */
      _type: function () {
        return 'geo point';
      },
      
      /**
            Retrieves the internal <code>script</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.GeoPoint
            @returns {String} returns this object's internal object representation.
            */
      toJSON: function () {
        return point;
      }
    };
  };
