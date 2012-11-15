  /**
    @class
    <p>Constructs a filter for docs matching any of the terms added to this
    object. Unlike a RangeFilter this can be used for filtering on multiple
    terms that are not necessarily in a sequence.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1893529">View Code Example</a></p>

    @name ejs.TermFilter

    @desc
    Constructs a filter for docs matching any of the terms added to this object.

    @param {string} key The document field/key to execute the filter against.
    @param {string} value The literal value used to filter the results.
    */
  ejs.TermFilter = function (key, value) {

    /**
         The internal filter object. Use the get() method for access.
         @member ejs.TermFilter
         @property {Object} filter
         */
    var filter = {
      term: {}
    };

    filter.term[key] = value;

    return {

      /**
             Serializes the internal filter object as a JSON string.
             @member ejs.TermFilter
             @returns {String} Returns a JSON representation of the termFilter object.
             */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
             Provides access to the filter key used to construct the termFilter object.
             @member ejs.TermFilter
             @returns {String} Returns the filter key used to construct the
             termFilter object.
             */
      key: function () {
        return key;
      },

      /**
             Provides access to the filter value used to construct the termFilter object.
             @member ejs.TermFilter
             @returns {String} Returns the filter value used to construct the
             termFilter object.
             */
      value: function () {
        return value;
      },

      /**
            This method is used to retrieve the raw filter object. It's designed
            for internal use when composing and serializing queries.
            @member ejs.TermFilter
            @returns {Object} Returns the object's filter property.
            */
      get: function () {
        return filter;
      }
    };
  };

  /**
    @class
    <p>A Filter that filters results by a specified index type.</p>

    @name ejs.TypeFilter

    @desc
    Filter results by a specified index type.

    @param {String} type the index type to filter on.
    */
  ejs.TypeFilter = function (type) {

    /**
         The internal filter object. Use <code>get()</code>

         @member ejs.TypeFilter
         @property {Object} filter
         */
    var filter = {
      "type": {
        "value": type
      }
    };

    return {

      /**
             * Sets the type

             @member ejs.TypeFilter
             @param {String} type the index type to filter on
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      type: function (type) {
        filter.type.value = type;
        return this;
      },

      /**
             Returns the filter container as a JSON string

             @member ejs.TypeFilter
             @returns {String} JSON representation of the notFilter object
             */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
             Returns the filter object.

             @member ejs.TypeFilter
             @returns {Object} filter object
             */
      get: function () {
        return filter;
      }
    };
  };

  /**
    @class
    <p>A container Filter that excludes the documents matched by the
    contained filter.</p>

    @name ejs.NotFilter

    @desc
    Container filter that excludes the matched documents of the contained filter.

    @param {Object} oFilter a valid Filter object such as a termFilter, etc.
    */
  ejs.NotFilter = function (oFilter) {

    /**
         The internal filter object. Use <code>get()</code>

         @member ejs.NotFilter
         @property {Object} filter
         */
    var filter = {
      "not": oFilter.get()
    };

    return {

      /**
             * Sets the filter

             @member ejs.NotFilter
             @param {Object} fltr A valid filter object such as a termFilter, etc.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      filter: function (fltr) {
        filter.not = fltr.get();
        return this;
      },

      /**
             Returns the filter container as a JSON string

             @member ejs.NotFilter
             @returns {String} JSON representation of the notFilter object
             */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
             Returns the filter object.

             @member ejs.NotFilter
             @returns {Object} filter object
             */
      get: function () {
        return filter;
      }
    };
  };

  /**
    @class
    A container Filter that allows Boolean AND composition of Filters.

    @name ejs.AndFilter

    @desc
    A container Filter that allows Boolean AND composition of Filters.

    @param {Array} filterArray A javascript array of valid Filter objects such as termFilter, etc.
    */
  ejs.AndFilter = function (filterArray) {

    /**
         The internal filter object. Use <code>get()</code>

         @member ejs.AndFilter
         @property {Object} filter
         */
    var filter, i, len;

    filter = {
      "and": []
    };

    for (i = 0, len = filterArray.length; i < len; i++) {
      filter.and.push(filterArray[i].get());
    }

    return {

      /**
             * Adds a new filter to the filter container

             @member ejs.AndFilter
             @param {Object} fltr A valid filter object such as a termFilter, etc.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      add: function (fltr) {
        filter.and.push(fltr.get());
        return this;
      },

      /**
             Returns the filter container as a JSON string

             @member ejs.AndFilter
             @returns {String} JSON representation of the andFilter object
             */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
             Returns the filter object.

             @member ejs.AndFilter
             @returns {Object} filter object
             */
      get: function () {
        return filter;
      }
    };
  };

  /**
    @class
    A Filter that only accepts numeric values within a specified range.

    @name ejs.NumericRangeFilter

    @desc
    A Filter that only accepts numeric values within a specified range.

    @param {string} fieldName A javascript array of valid Filter objects such as termFilter, etc.
    */
  ejs.NumericRangeFilter = function (fieldName) {

    var filter, start, end;

    /**
         The internal filter object. Use <code>get()</code>

         @member ejs.NumericRangeFilter
         @property {Object} filter
         */
    filter = {
      "numeric_range": {}
    };

    filter.numeric_range[fieldName] = {};

    /**
         A numeric value representing the start of the range.

         @member ejs.NumericRangeFilter
         @property {String} start
         */
    start = '-1';

    /**
         A numeric value representing the end of the range.

         @member ejs.NumericRangeFilter
         @property {String} end
         */
    end = '-1';

    return {

      /**
             Sets the endpoint for the current range.

             @member ejs.NumericRangeFilter
             @param {Number} startPoint A numeric value representing the start of the range
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      from: function (startPoint) {
        if (typeof startPoint === 'undefined' || startPoint === null) {
          return start;
        }

        filter.numeric_range[fieldName].from = startPoint;
        start = JSON.stringify(startPoint);
        return this;
      },

      /**
             Sets the endpoint for the current range.

             @member ejs.NumericRangeFilter
             @param {Number} endPoint A numeric value representing the end of the range
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      to: function (endPoint) {
        if (typeof endPoint === 'undefined' || endPoint === null) {
          return end;
        }

        filter.numeric_range[fieldName].to = endPoint;
        end = JSON.stringify(endPoint);
        return this;
      },

      /**
             Returns the field name used to create this object.

             @member ejs.NumericRangeFilter
             @returns {String} field name
             */
      field: function () {
        return fieldName;
      },

      /**
             Returns the filter term used to create this object.

             @member ejs.NumericRangeFilter
             @returns {String} filter term
             */
      key: function () {
        return fieldName;
      },

      /**
             Returns the filter value used to create this object.

             @member ejs.NumericRangeFilter
             @returns {String} filter term
             */
      value: function () {
        return start;
      },

      /**
             Returns the filter container as a JSON string.

             @member ejs.NumericRangeFilter
             @returns {String} JSON representation of the numericRangeFilter object
             */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
             Returns the filter object.

             @member ejs.NumericRangeFilter
             @returns {Object} filter object
             */
      get: function () {
        return filter;
      }
    };
  };

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
        if (typeof filter.geo_polygon[fieldName].points === 'undefined' || filter.geo_polygon[fieldName].points === null) {
          filter.geo_polygon[fieldName].points = [];
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

  /**
    @class
    <p>An existsFilter matches documents where the specified field is present
    and the field contains a legitimate value.</p>

    @name ejs.ExistsFilter

    @desc
    Filters documents where a specified field exists and contains a value.

    @param {String} fieldName the field name that must exists and contain a value.
    */
  ejs.ExistsFilter = function (fieldName) {

    /**
         The internal filter object. Use <code>get()</code>

         @member ejs.ExistsFilter
         @property {Object} filter
         */
    var filter = {
      "exists": {
        "field": fieldName
      }
    };

    return {

      /**
             Returns the filter container as a JSON string

             @member ejs.ExistsFilter
             @returns {String} JSON representation of the existsFilter object
             */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
             Returns the filter object.

             @member ejs.ExistsFilter
             @returns {Object} filter object
             */
      get: function () {
        return filter;
      }
    };
  };

  /**
    @class
    <p>Filters documents that have fields containing terms with a specified prefix (not analyzed). Similar
    to phrase query, except that it acts as a filter. Can be placed within queries that accept a filter.</p>

    @name ejs.PrefixFilter

    @desc
    Filters documents that have fields containing terms with a specified prefix.

    @param {String} fieldName the field name to be used during matching.
    */
  ejs.PrefixFilter = function (fieldName) {

    /**
         The internal filter object. Use <code>get()</code>

         @member ejs.PrefixFilter
         @property {Object} filter
         */
    var filter = {
      "prefix": {}
    };

    return {

      /**
             Returns the filter container as a JSON string

             @member ejs.PrefixFilter
             @param {String} value the prefix value to match
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      prefix: function (value) {
        filter.prefix[fieldName] = value;
        return this;
      },

      /**
             Returns the filter container as a JSON string

             @member ejs.PrefixFilter
             @returns {String} JSON representation of the prefixFilter object
             */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
             Returns the filter object.

             @member ejs.PrefixFilter
             @returns {Object} filter object
             */
      get: function () {
        return filter;
      }
    };
  };

  /**
    @class
    <p>An missingFilter matches documents where the specified field contains no legitimate value.</p>

    @name ejs.MissingFilter

    @desc
    Filters documents where a specific field has no value present.

    @param {String} fieldName the field name to check for missing values.
    */
  ejs.MissingFilter = function (fieldName) {

    /**
         The internal filter object. Use <code>get()</code>

         @member ejs.MissingFilter
         @property {Object} filter
         */
    var filter = {
      "missing": {
        "field": fieldName
      }
    };

    return {

      /**
             Returns the filter container as a JSON string

             @member ejs.MissingFilter
             @returns {String} JSON representation of the missingFilter object
             */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
             Returns the filter object.

             @member ejs.MissingFilter
             @returns {Object} filter object
             */
      get: function () {
        return filter;
      }
    };
  };

  /**
    @class
    A container filter that allows Boolean OR composition of filters.

    @name ejs.OrFilter

    @desc
    A container Filter that allows Boolean OR composition of filters.

    @param {Array} filterArray A javascript array of valid Filter objects such as termFilter, etc.
    */
  ejs.OrFilter = function (filterArray) {

    /**
         The internal filter object. Use <code>get()</code>

         @member ejs.OrFilter
         @property {Object} filter
         */
    var filter, i, len;

    filter = {
      "or": []
    };

    for (i = 0, len = filterArray.length; i < len; i++) {
      filter.or.push(filterArray[i].get());
    }

    return {

      /**
             * Adds a new filter to the filter container

             @member ejs.OrFilter
             @param {Object} fltr A valid filter object such as a termFilter, etc.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      add: function (fltr) {
        filter.or.push(fltr.get());
        return this;
      },

      /**
             Returns the filter container as a JSON string

             @member ejs.OrFilter
             @returns {String} JSON representation of the orFilter object
             */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
             Returns the filter object.

             @member ejs.OrFilter
             @returns {Object} filter object
             */
      get: function () {
        return filter;
      }
    };
  };

