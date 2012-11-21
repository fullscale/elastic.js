  /**
    @class
    <p>A filter for locating documents that fall within a polygon of points. Simply provide a lon/lat
    for each document as a Geo Point type. The format conforms with the GeoJSON specification.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1877636">View Code Example</a></p>

    @name ejs.GeoPolygonFilter

    @desc
    Filter results to those which are contained within the polygon of points.

    @param {String} fieldName the document property/field containing the Geo Point (lon/lat).
    */
  ejs.GeoPolygonFilter = function (fieldName) {

    /**
         The internal filter object. Use <code>get()</code>

         @member ejs.GeoPolygonFilter
         @property {Object} filter
         */
    var filter = {
      "geo_polygon": {}
    };

    filter.geo_polygon[fieldName] = {};

    return {

      /**
             * Sets a series of points that represent a polygon

             @member ejs.GeoPolygonFilter
             @param {Array} pointsArray the array of points that represent the polygon
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      points: function (pointsArray) {
        if (pointsArray == null) {
          return filter.geo_polygon[fieldName].points;
        }
      
        filter.geo_polygon[fieldName].points = pointsArray;
        return this;
      },

      /**
             * Adds a point in the polygon

             @member ejs.GeoPolygonFilter
             @param {Number} lon the longitude coordinate
             @param {Number} lat the latitude coordinate
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      point: function (lon, lat) {
        if (filter.geo_polygon[fieldName].points == null) {
          filter.geo_polygon[fieldName].points = [];
        }
      
        if (arguments.length === 0) {
          return filter.geo_polygon[fieldName].points;
        }
      
        filter.geo_polygon[fieldName].points.push([lon, lat]);
        return this;
      },

      /**
             Returns the filter container as a JSON string

             @member ejs.GeoPolygonFilter
             @returns {String} JSON representation of the notFilter object
             */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
             Returns the filter object.

             @member ejs.GeoPolygonFilter
             @returns {Object} filter object
             */
      get: function () {
        return filter;
      }
    };
  };
