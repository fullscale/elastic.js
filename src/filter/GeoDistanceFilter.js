  /**
    @class
    <p>A filter that restricts matched results/docs to a given distance from the
    point of origin. The format conforms with the GeoJSON specification.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1903734">View Code Example</a></p>

    @name ejs.GeoDistanceFilter

    @desc
    Filter results to those which fall within the given distance of the point of origin.

    @param {String} fieldName the document property/field containing the Geo Point (lon/lat).

    */
  ejs.GeoDistanceFilter = function (fieldName) {

    /**
         The internal filter object. Use <code>get()</code>

         @member ejs.GeoDistanceFilter
         @property {Object} filter
         */
    var filter = {
      "geo_distance": {
        "distance_unit": "mi"
      }
    };

    return {

      /**
             * Sets the numeric distance to be used

             @member ejs.GeoDistanceFilter
             @param {Number} numericDistance the numeric distance
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      distance: function (numericDistance) {
        if (numericDistance == null) {
          return filter.geo_distance.distance;
        }
      
        filter.geo_distance.distance = numericDistance;
        return this;
      },

      /**
             * Sets the distance unit

             @member ejs.GeoDistanceFilter
             @param {Number} unit the unit of distance measure. Can be either <code>mi</code> or <code>km</code>. Defaults to <code>mi</code>.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      distanceUnit: function (unit) {
        if (unit == null) {
          return filter.geo_distance.distance_unit;
        }
      
        filter.geo_distance.distance_unit = unit;
        return this;
      },

      /**
             * Sets the point of origin in which distance will be measured from

             @member ejs.GeoDistanceFilter
             @param {Number} lon the longitude coordinate
             @param {Number} lat the latitude coordinate
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      point: function (lon, lat) {
        if (arguments.length === 0) {
          return filter.geo_distance[fieldName];
        }
      
        filter.geo_distance[fieldName] = [lon, lat];
        return this;
      },

      /**
             Returns the filter container as a JSON string

             @member ejs.GeoDistanceFilter
             @returns {String} JSON representation of the notFilter object
             */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
             Returns the filter object.

             @member ejs.GeoDistanceFilter
             @returns {Object} filter object
             */
      get: function () {
        return filter;
      }
    };
  };
