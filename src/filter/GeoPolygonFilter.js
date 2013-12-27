  /**
    @class
    <p>A filter for locating documents that fall within a polygon of points. Simply provide a lon/lat
    for each document as a Geo Point type. The format conforms with the GeoJSON specification.</p>

    @name ejs.GeoPolygonFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    Filter results to those which are contained within the polygon of points.

    @param {String} fieldName the document property/field containing the Geo Point (lon/lat).
    */
  ejs.GeoPolygonFilter = function (fieldName) {

    var
      _common = ejs.FilterMixin('geo_polygon'),
      filter = _common.toJSON(); 

    filter.geo_polygon[fieldName] = {
      points: []
    };

    return extend(_common, {

      /**
           Sets the fields to filter against.

           @member ejs.GeoPolygonFilter
           @param {String} f A valid field name.
           @returns {Object} returns <code>this</code> so that calls can be chained.
           */
      field: function (f) {
        var oldValue = filter.geo_polygon[fieldName];

        if (f == null) {
          return fieldName;
        }

        delete filter.geo_polygon[fieldName];
        fieldName = f;
        filter.geo_polygon[f] = oldValue;

        return this;
      },
       
      /**
             Sets a series of points that represent a polygon.  If passed a 
             single <code>GeoPoint</code> object, it is added to the current 
             list of points.  If passed an array of <code>GeoPoint</code> 
             objects it replaces all current values. 

             @member ejs.GeoPolygonFilter
             @param {Array} pointsArray the array of points that represent the polygon
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      points: function (p) {
        var i, len;
        
        if (p == null) {
          return filter.geo_polygon[fieldName].points;
        }
      
        if (isGeoPoint(p)) {
          filter.geo_polygon[fieldName].points.push(p.toJSON());
        } else if (isArray(p)) {
          filter.geo_polygon[fieldName].points = [];
          for (i = 0, len = p.length; i < len; i++) {
            if (!isGeoPoint(p[i])) {
              throw new TypeError('Argument must be Array of GeoPoints');
            }
            
            filter.geo_polygon[fieldName].points.push(p[i].toJSON());
          }
        } else {
          throw new TypeError('Argument must be a GeoPoint or Array of GeoPoints');
        }
        
        return this;
      },

      /**
            If the lat/long points should be normalized to lie within their
            respective normalized ranges.
            
            Normalized ranges are:
            lon = -180 (exclusive) to 180 (inclusive) range
            lat = -90 to 90 (both inclusive) range

            @member ejs.GeoPolygonFilter
            @param {String} trueFalse True if the coordinates should be normalized. False otherwise.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      normalize: function (trueFalse) {
        if (trueFalse == null) {
          return filter.geo_polygon.normalize;
        }

        filter.geo_polygon.normalize = trueFalse;
        return this;
      }
      
    });
  };
