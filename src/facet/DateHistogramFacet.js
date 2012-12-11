  /**
    @class
    <p>The DateHistogram facet works with time-based values by building a histogram across time
       intervals of the <code>value</code> field. Each value is <em>rounded</em> into an interval (or
       placed in a bucket), and statistics are provided per interval/bucket (count and total).</p>

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
    <a target="_blank" class="btn c9" href="https://gist.github.com/1905236">View Code Example</a></p>

    @name ejs.DateHistogramFacet

    @desc
    <p>A facet which returns the N most frequent terms within a collection
       or set of collections.</p>

    @param {String} name The name which be used to refer to this facet. For instance,
        the facet itself might utilize a field named <code>doc_authors</code>. Setting
        <code>name</code> to <code>Authors</code> would allow you to refer to the
        facet by that name, possibly simplifying some of the display logic.

    */
  ejs.DateHistogramFacet = function (name) {

    /**
        The internal facet object.
        @member ejs.DateHistogramFacet
        @property {Object} facet
        */
    var facet = {};

    facet[name] = {
      date_histogram: {}
    };

    return {

      /**
            Sets the field to be used to construct the this facet.

            @member ejs.DateHistogramFacet
            @param {String} fieldName The field name whose data will be used to construct the facet.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (fieldName) {
        if (fieldName == null) {
          return facet[name].date_histogram.field;
        }
      
        facet[name].date_histogram.field = fieldName;
        return this;
      },

      /**
            Sets the bucket interval used to calculate the distribution.

            @member ejs.DateHistogramFacet
            @param {String} timeInterval The bucket interval. Valid values are <code>year, month, week, day, hour,</code> and <code>minute</code>.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      interval: function (timeInterval) {
        if (timeInterval == null) {
          return facet[name].date_histogram.interval;
        }
      
        facet[name].date_histogram.interval = timeInterval;
        return this;
      },

      /**
            By default, time values in Cloud9 are stored in UTC format. This method allows users
            to set a time zone value that is then used to compute intervals.

            @member ejs.DateHistogramFacet
            @param {Integer} tz An offset value from UTC. For example, <code>-5</code> would indicate EST.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      timeZone: function (tz) {
        if (tz == null) {
          return facet[name].date_histogram.time_zone;
        }
      
        facet[name].date_histogram.time_zone = tz;
        return this;
      },

      /**
            Allows you to specify a different value field to aggrerate over.

            @member ejs.DateHistogramFacet
            @param {String} fieldName The name of the field to be used.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      valueField: function (fieldName) {
        if (fieldName == null) {
          return facet[name].date_histogram.value_field;
        }
      
        facet[name].date_histogram.value_field = fieldName;
        return this;
      },

      /**
            Allows you to specify a different key field to be used to group intervals.

            @member ejs.DateHistogramFacet
            @param {String} fieldName The name of the field to be used.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      keyField: function (fieldName) {
        if (fieldName == null) {
          return facet[name].date_histogram.key_field;
        }
      
        facet[name].date_histogram.key_field = fieldName;
        return this;
      },

      /**
            Allows you modify the <code>value</code> field using a script. The modified value
            is then used to compute the statistical data.

            @member ejs.DateHistogramFacet
            @param {String} scriptCode A valid script string to execute.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      valueScript: function (scriptCode) {
        if (scriptCode == null) {
          return facet[name].date_histogram.value_script;
        }
      
        facet[name].date_histogram.value_script = scriptCode;
        return this;
      },

      /**
            The script language being used. Currently supported values are
            <code>javascript</code>, <code>groovy</code>, and <code>mvel</code>.

            @member ejs.DateHistogramFacet
            @param {String} language The language of the script.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      lang: function (language) {
        if (language == null) {
          return facet[name].date_histogram.lang;
        }
      
        facet[name].date_histogram.lang = language;
        return this;
      },

      /**
            <p>Allows you to reduce the documents used for computing facet results.</p>

            @member ejs.DateHistogramFacet
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

            @member ejs.DateHistogramFacet
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(facet);
      },

      /**
            The type of ejs object.  For internal use only.
            
            @member ejs.DateHistogramFacet
            @returns {String} the type of object
            */
      _type: function () {
        return 'facet';
      },
      
      /**
            <p>Retrieves the internal <code>facet</code> object. This is typically used by
               internal API functions so use with caution.</p>

            @member ejs.DateHistogramFacet
            @returns {String} returns this object's internal <code>facet</code> property.
            */
      _self: function () {
        return facet;
      }
    };
  };
