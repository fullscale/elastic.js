  /**
    @class
    <p>A filter that restricts matched results/docs to a geographic bounding box described by
    the specified lon and lat coordinates. The format conforms with the GeoJSON specification.</p>

    @name ejs.GeoBboxFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    Filter results to those which are contained within the defined bounding box.

    @param {String} fieldName the document property/field containing the Geo Point (lon/lat).

    */
  ejs.GeoBboxFilter = function (fieldName) {

    var
      _common = ejs.FilterMixin('geo_bounding_box'),
      filter = _common.toJSON();
    
    filter.geo_bounding_box[fieldName] = {};

    return extend(_common, {

      /**
            Sets the fields to filter against.

            @member ejs.GeoBboxFilter
            @param {String} f A valid field name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (f) {
        var oldValue = filter.geo_bounding_box[fieldName];
    
        if (f == null) {
          return fieldName;
        }

        delete filter.geo_bounding_box[fieldName];
        fieldName = f;
        filter.geo_bounding_box[f] = oldValue;
    
        return this;
      },
      
      /**
             Sets the top-left coordinate of the bounding box

             @member ejs.GeoBboxFilter
             @param {GeoPoint} p A valid GeoPoint object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      topLeft: function (p) {
        if (p == null) {
          return filter.geo_bounding_box[fieldName].top_left;
        }
      
        if (isGeoPoint(p)) {
          filter.geo_bounding_box[fieldName].top_left = p.toJSON();
        } else {
          throw new TypeError('Argument must be a GeoPoint');
        }
        
        return this;
      },

      /**
             Sets the bottom-right coordinate of the bounding box

             @member ejs.GeoBboxFilter
             @param {GeoPoint} p A valid GeoPoint object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      bottomRight: function (p) {
        if (p == null) {
          return filter.geo_bounding_box[fieldName].bottom_right;
        }
      
        if (isGeoPoint(p)) {
          filter.geo_bounding_box[fieldName].bottom_right = p.toJSON();
        } else {
          throw new TypeError('Argument must be a GeoPoint');
        }
        
        return this;
      },

      /**
            Sets the type of the bounding box execution. Valid values are
            "memory" and "indexed".  Default is memory.

            @member ejs.GeoBboxFilter
            @param {String} type The execution type as a string.  
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      type: function (type) {
        if (type == null) {
          return filter.geo_bounding_box.type;
        }

        type = type.toLowerCase();
        if (type === 'memory' || type === 'indexed') {
          filter.geo_bounding_box.type = type;
        }
        
        return this;
      },
      
      /**
            If the lat/long points should be normalized to lie within their
            respective normalized ranges.
            
            Normalized ranges are:
            lon = -180 (exclusive) to 180 (inclusive) range
            lat = -90 to 90 (both inclusive) range

            @member ejs.GeoBboxFilter
            @param {String} trueFalse True if the coordinates should be normalized. False otherwise.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      normalize: function (trueFalse) {
        if (trueFalse == null) {
          return filter.geo_bounding_box.normalize;
        }

        filter.geo_bounding_box.normalize = trueFalse;
        return this;
      }
      
    });
  };
