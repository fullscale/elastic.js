  /**
    @class
    <p>A filter that restricts matched results/docs to a geographic bounding box described by
    the specified lon and lat coordinates. The format conforms with the GeoJSON specification.</p>

    @name ejs.GeoBboxFilter

    @desc
    Filter results to those which are contained within the defined bounding box.

    @param {String} fieldName the document property/field containing the Geo Point (lon/lat).

    */
  ejs.GeoBboxFilter = function (fieldName) {

    /**
         The internal filter object. Use <code>get()</code>

         @member ejs.GeoBboxFilter
         @property {Object} filter
         */
    var filter = {
      "geo_bounding_box": {}
    };

    filter.geo_bounding_box[fieldName] = {};

    return {

      /**
             * Sets the top-left coordinate of the bounding box

             @member ejs.GeoBboxFilter
             @param {Array} pointsArray the array of points that represent the polygon
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      topLeft: function (lon, lat) {
        if (arguments.length === 0) {
          return filter.geo_bounding_box[fieldName].top_left;
        }
      
        filter.geo_bounding_box[fieldName].top_left = [lon, lat];
        return this;
      },

      /**
             * Sets the bottom-right coordinate of the bounding box

             @member ejs.GeoBboxFilter
             @param {Number} lon the longitude coordinate
             @param {Number} lat the latitude coordinate
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      bottomRight: function (lon, lat) {
        if (arguments.length === 0) {
          return filter.geo_bounding_box[fieldName].bottom_right;
        }
      
        filter.geo_bounding_box[fieldName].bottom_right = [lon, lat];
        return this;
      },

      /**
             Returns the filter container as a JSON string

             @member ejs.GeoBboxFilter
             @returns {String} JSON representation of the notFilter object
             */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
             Returns the filter object.

             @member ejs.GeoBboxFilter
             @returns {Object} filter object
             */
      get: function () {
        return filter;
      }
    };
  };
