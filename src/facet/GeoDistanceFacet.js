  /**
    @class
    <p>The geoDistanceFacet facet provides information over a range of distances from a
    provided point. This includes the number of hits that fall within each range,
    along with aggregate information (like total).</p>

    <p>Facets are similar to SQL <code>GROUP BY</code> statements but perform much
       better. You can also construct several <em>"groups"</em> at once by simply
       specifying multiple facets.</p>

    <div class="alert-message block-message info">
        <p>
            <strong>Tip: </strong>
            For more information on faceted navigation, see
            <a href="http://en.wikipedia.org/wiki/Faceted_classification">this</a>
            Wikipedia article on Faceted Classification.
        </p>
    </div>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1904208">View Code Example</a></p>

    @name ejs.GeoDistanceFacet

    @desc
    <p>A facet which provides information over a range of distances from a provided point.</p>

    @param {String} name The name which be used to refer to this facet. For instance,
        the facet itself might utilize a field named <code>doc_authors</code>. Setting
        <code>name</code> to <code>Authors</code> would allow you to refer to the
        facet by that name, possibly simplifying some of the display logic.

    */
  ejs.GeoDistanceFacet = function (name) {

    /**
        The internal facet object.
        @member ejs.GeoDistanceFacet
        @property {Object} facet
        */
    var facet = {},
      ranges = [],
      geoCoordinate = [0, 0],
      field = null;

    facet[name] = {
      geo_distance: {
        distance_unit: "mi"
      }
    };

    return {

      /**
            Sets the document field containing the geo-coordinate to be used to calculate the distance.

            @member ejs.GeoDistanceFacet
            @param {String} fieldName The field name whose data will be used to construct the facet.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      pointField: function (fieldName) {
        if (fieldName == null) {
          return field;
        }
      
        field = fieldName;
        //facet[name].geo_distance[field] = geoCoordinate;
        return this;
      },

      /**
            Sets the point of origin from where distances will be measured.

            @member ejs.GeoDistanceFacet
            @param {Number} lon the longitude coordinate
            @param {Number} lat the latitude coordinate
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      point: function (lon, lat) {
        if (arguments.length === 0) {
          return geoCoordinate;
        }
      
        geoCoordinate = [lon, lat];
        return this;
      },

      /**
            Adds a new bounded range.

            @member ejs.GeoDistanceFacet
            @param {Number} from The lower bound of the range
            @param {Number} to The upper bound of the range
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      addRange: function (from, to) {
        if (arguments.length === 0) {
          return ranges;
        }
      
        ranges.push({
          "from": from,
          "to": to
        });
        return this;
      },

      /**
            Adds a new unbounded lower limit.

            @member ejs.GeoDistanceFacet
            @param {Number} from The lower limit of the unbounded range
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      addUnboundedFrom: function (from) {
        if (from == null) {
          return ranges;
        }
      
        ranges.push({
          "from": from
        });
        return this;
      },

      /**
            Adds a new unbounded upper limit.

            @member ejs.GeoDistanceFacet
            @param {Number} to The upper limit of the unbounded range
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      addUnboundedTo: function (to) {
        if (to == null) {
          return ranges;
        }
      
        ranges.push({
          "to": to
        });
        return this;
      },

      /**
             * Sets the distance unit

             @member ejs.GeoDistanceFacet
             @param {Number} unit the unit of distance measure. Can be either <code>mi</code> or <code>km</code>. Defaults to <code>mi</code>.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      distanceUnit: function (unit) {
        if (unit == null) {
          return facet[name].geo_distance.distance_unit;
        }
      
        facet[name].geo_distance.distance_unit = unit;
        return this;
      },

      /**
             * Sets the type of measurment used to calculate distance.

             @member ejs.GeoDistanceFacet
             @param {Number} unit Determines how distance is calculated. Can be either <code>arc</code> (better precision) or <code>plane</code> (faster). Defaults to <code>arc</code>.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      distanceType: function (type) {
        if (type == null) {
          return facet[name].geo_distance.distance_type;
        }
      
        facet[name].geo_distance.distance_type = type;
        return this;
      },

      /**
            <p>Allows you to reduce the documents used for computing facet results.</p>

            @member ejs.GeoDistanceFacet
            @param {Object} oFilter A valid <code>Filter</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      filter: function (oFilter) {
        if (oFilter == null) {
          return facet[name].facet_filter;
        }
      
        facet[name].facet_filter = oFilter._self();
        return this;
      },

      /**
            <p>Allows you to serialize this object into a JSON encoded string.</p>

            @member ejs.GeoDistanceFacet
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        facet[name].geo_distance.ranges = ranges;
        if (field !== null) {
          //facet[name].geo_distance[field] = geoCoordinate;
        }
        return JSON.stringify(facet);
      },

      /**
            The type of ejs object.  For internal use only.
            
            @member ejs.GeoDistanceFacet
            @returns {String} the type of object
            */
      _type: function () {
        return 'facet';
      },
      
      /**
            <p>Retrieves the internal <code>facet</code> object. This is typically used by
               internal API functions so use with caution.</p>

            @member ejs.GeoDistanceFacet
            @returns {String} returns this object's internal <code>facet</code> property.
            */
      _self: function () {
        facet[name].geo_distance.ranges = ranges;
        if (field !== null) {
          facet[name].geo_distance[field] = geoCoordinate;
        }
        return facet;
      }
    };
  };
