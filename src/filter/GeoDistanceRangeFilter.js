  /**
    @class
    <p>A filter that restricts matched results/docs to a given distance range from the
    point of origin. The format conforms with the GeoJSON specification.</p>

    @name ejs.GeoDistanceRangeFilter

    @desc
    Filter results to those which fall within the given distance range of the point of origin.

    @param {String} fieldName the document property/field containing the Geo Point (lon/lat).

    */
  ejs.GeoDistanceRangeFilter = function (fieldName) {

    /**
         The internal filter object. Use <code>get()</code>

         @member ejs.GeoDistanceRangeFilter
         @property {Object} filter
         */
    var filter = {
      "geo_distance_range": {
        "distance_unit": "mi"
      }
    };

    return {

      /**
             * Sets the start point of the distance range

             @member ejs.GeoDistanceRangeFilter
             @param {Number} numericDistance the numeric distance
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      from: function (numericDistance) {
        if (numericDistance == null) {
          return filter.geo_distance_range.from;
        }
      
        filter.geo_distance_range.from = numericDistance;
        return this;
      },

      /**
             * Sets the end point of the distance range

             @member ejs.GeoDistanceRangeFilter
             @param {Number} numericDistance the numeric distance
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      to: function (numericDistance) {
        if (numericDistance == null) {
          return filter.geo_distance_range.to;
        }
      
        filter.geo_distance_range.to = numericDistance;
        return this;
      },

      /**
             * Sets the distance unit

             @member ejs.GeoDistanceRangeFilter
             @param {Number} unit the unit of distance measure. Can be either <code>mi</code> or <code>km</code>. Defaults to <code>mi</code>.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      distanceUnit: function (unit) {
        if (unit == null) {
          return filter.geo_distance_range.distance_unit;
        }
      
        filter.geo_distance_range.distance_unit = unit;
        return this;
      },

      /**
             * Sets the point of origin in which distance will be measured from

             @member ejs.GeoDistanceRangeFilter
             @param {Number} lon the longitude coordinate
             @param {Number} lat the latitude coordinate
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      point: function (lon, lat) {
        if (arguments.length === 0) {
          return filter.geo_distance_range[fieldName];
        }
      
        filter.geo_distance_range[fieldName] = [lon, lat];
        return this;
      },

      /**
             Returns the filter container as a JSON string

             @member ejs.GeoDistanceRangeFilter
             @returns {String} JSON representation of the notFilter object
             */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
             Returns the filter object.

             @member ejs.GeoDistanceRangeFilter
             @returns {Object} filter object
             */
      get: function () {
        return filter;
      }
    };
  };
