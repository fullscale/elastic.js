  /**
    @class
    <p>A filter that restricts matched results/docs to a given distance from the
    point of origin. The format conforms with the GeoJSON specification.</p>

    @name ejs.GeoDistanceFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    Filter results to those which fall within the given distance of the point of origin.

    @param {String} fieldName the document property/field containing the Geo Point (lon/lat).

    */
  ejs.GeoDistanceFilter = function (fieldName) {

    var
      _common = ejs.FilterMixin('geo_distance'),
      filter = _common.toJSON();

    filter.geo_distance[fieldName] = [0, 0];
    
    return extend(_common, {

      /**
            Sets the fields to filter against.

            @member ejs.GeoDistanceFilter
            @param {String} f A valid field name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (f) {
        var oldValue = filter.geo_distance[fieldName];
    
        if (f == null) {
          return fieldName;
        }

        delete filter.geo_distance[fieldName];
        fieldName = f;
        filter.geo_distance[f] = oldValue;
    
        return this;
      },
      
      /**
             Sets the numeric distance to be used.  The distance can be a 
             numeric value, and then the unit (either mi or km can be set) 
             controlling the unit. Or a single string with the unit as well.

             @member ejs.GeoDistanceFilter
             @param {Number} numericDistance the numeric distance
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      distance: function (numericDistance) {
        if (numericDistance == null) {
          return filter.geo_distance.distance;
        }
      
        if (!isNumber(numericDistance) && !isString(numericDistance)) {
          throw new TypeError('Argument must be a numeric or string value');
        }
        
        filter.geo_distance.distance = numericDistance + "";
        return this;
      },

      /**
             Sets the distance unit.  Valid values are "mi" for miles or "km"
             for kilometers. Defaults to "km".

             @member ejs.GeoDistanceFilter
             @param {Number} unit the unit of distance measure.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      unit: function (unit) {
        if (unit == null) {
          return filter.geo_distance.unit;
        }
      
        unit = unit.toLowerCase();
        if (unit === 'mi' || unit === 'km') {
          filter.geo_distance.unit = unit;
        }
        
        return this;
      },

      /**
             Sets the point of origin in which distance will be measured from

             @member ejs.GeoDistanceFilter
             @param {GeoPoint} p A valid GeoPoint object.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      point: function (p) {
        if (p == null) {
          return filter.geo_distance[fieldName];
        }
      
        if (isGeoPoint(p)) {
          filter.geo_distance[fieldName] = p.toJSON();
        } else {
          throw new TypeError('Argument must be a GeoPoint');
        }
        
        return this;
      },


      /**
            How to compute the distance. Can either be arc (better precision) 
            or plane (faster). Defaults to arc.

            @member ejs.GeoDistanceFilter
            @param {String} type The execution type as a string.  
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      distanceType: function (type) {
        if (type == null) {
          return filter.geo_distance.distance_type;
        }

        type = type.toLowerCase();
        if (type === 'arc' || type === 'plane') {
          filter.geo_distance.distance_type = type;
        }
        
        return this;
      },
      
      /**
            If the lat/long points should be normalized to lie within their
            respective normalized ranges.
            
            Normalized ranges are:
            lon = -180 (exclusive) to 180 (inclusive) range
            lat = -90 to 90 (both inclusive) range

            @member ejs.GeoDistanceFilter
            @param {String} trueFalse True if the coordinates should be normalized. False otherwise.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      normalize: function (trueFalse) {
        if (trueFalse == null) {
          return filter.geo_distance.normalize;
        }

        filter.geo_distance.normalize = trueFalse;
        return this;
      },
      
      /**
            Will an optimization of using first a bounding box check will be 
            used. Defaults to memory which will do in memory checks. Can also 
            have values of indexed to use indexed value check, or none which 
            disables bounding box optimization.

            @member ejs.GeoDistanceFilter
            @param {String} t optimization type of memory, indexed, or none.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      optimizeBbox: function (t) {
        if (t == null) {
          return filter.geo_distance.optimize_bbox;
        }

        t = t.toLowerCase();
        if (t === 'memory' || t === 'indexed' || t === 'none') {
          filter.geo_distance.optimize_bbox = t;
        }
        
        return this;
      }
      
    });
  };
