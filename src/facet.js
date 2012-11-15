  /**
    @class
    <p>A facet which returns the N most frequent terms within a collection
       or set of collections. Term facets are useful for building constructs
       which allow users to refine search results by filtering on terms returned
       by the facet.</p>

    <p>Facets are similar to SQL <code>GROUP BY</code> statements but perform much
       better. You can also construct several <em>"groups"</em> at once by simply
       specifying multiple facets.</p>

    <p>For more information on faceted navigation, see this Wikipedia article on
       <a href="http://en.wikipedia.org/wiki/Faceted_classification">Faceted Classification</a></p<

    @name ejs.TermFacet

    @desc
    <p>A facet which returns the N most frequent terms within a collection
       or set of collections.</p>

    @param {String} name The name which be used to refer to this facet. For instance,
        the facet itself might utilize a field named <code>doc_authors</code>. Setting
        <code>name</code> to <code>Authors</code> would allow you to refer to the
        facet by that name, possibly simplifying some of the display logic.
  
    */
  ejs.TermFacet = function (name) {

    /**
        The internal facet object.
        @member ejs.TermFacet
        @property {Object} facet
        */
    var facet = {};

    facet[name] = {
      terms: {}
    };

    return {

      /**
            Sets the field to be used to construct the this facet.

            @member ejs.TermFacet
            @param {String} fieldName The field name whose data will be used to construct the facet.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (fieldName) {
        facet[name].terms.field = fieldName;
        return this;
      },

      /**
            Sets the number of facet entries that will be returned for this facet. For instance, you
            might ask for only the top 5 <code>authors</code> although there might be hundreds of
            unique authors.

            @member ejs.TermFacet
            @param {Integer} facetSize The numer of facet entries to be returned.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      size: function (facetSize) {
        facet[name].terms.size = facetSize;
        return this;
      },

      /**
            <p>Allows you to define the ordering by which facets are returned. For example, you might
            want facet entries order by their frequency <em>(i.e., count)</em> or you may need them
            ordered alhpabetically.</p>

            <p>Possible ordering is <code>count, term, reverse_count,</code> and <code>reverse_term</code>.
            The default ordering is by <code>count</code>.</p>

            @member ejs.TermFacet
            @param {String} sortOrder The numer of facet entries to be returned.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      order: function (sortOrder) {
        facet[name].terms.order = sortOrder;
        return this;
      },

      /**
            <p>Allows you to return all terms, even if the frequency count is 0. This should not be
               used on fields that contain a large number of unique terms because it could cause
               <em>out-of-memory</em> errors.</p>

            @member ejs.TermFacet
            @param {String} trueFalse <code>true</code> or <code>false</code>
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      allTerms: function (trueFalse) {
        facet[name].terms.all_terms = trueFalse;
        return this;
      },

      /**
            <p>Allows you to filter out unwanted facet entries.</p>

            @member ejs.TermFacet
            @param {String ...args} args A variable length ist of terms to exclude.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      exclude: function () {
        facet[name].terms.exclude = [];
        for (var i = 0; i < arguments.length; i++) {
          facet[name].terms.exclude.push(arguments[i].get());
        }
        return this;
      },

      /**
            <p>Allows you to only include facet entries matching a specified regular expression.</p>

            @member ejs.TermFacet
            @param {String} exp A valid regular expression.
            @param {String} flags A valid regex flag - see <a href="http://docs.oracle.com/javase/6/docs/api/java/util/regex/Pattern.html#field_summary">Java Pattern API</a>
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      regex: function (exp, flags) {
        facet[name].terms.regex = exp;
        if (flags !== undefined) {
          facet[name].terms.regex_flags = flags;
        }
        return this;
      },

      /**
            <p>Allows you to reduce the documents used for computing facet results.</p>

            @member ejs.TermFacet
            @param {Object} oFilter A valid <code>Filter</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      filter: function (oFilter) {
        facet[name].facet_filter = oFilter.get();
        return this;
      },

      /**
            <p>Allows you to serialize this object into a JSON encoded string.</p>

            @member ejs.TermFacet
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(facet);
      },

      /**
            <p>Retrieves the internal <code>facet</code> property. This is typically used by
               internal API functions so use with caution.</p>

            @member ejs.TermFacet
            @returns {String} returns this object's internal <code>facet</code> property.
            */
      get: function () {
        return facet;
      }
    };
  };

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
        facet[name].facet_filter = oFilter.get();
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
            <p>Retrieves the internal <code>facet</code> object. This is typically used by
               internal API functions so use with caution.</p>

            @member ejs.DateHistogramFacet
            @returns {String} returns this object's internal <code>facet</code> property.
            */
      get: function () {
        return facet;
      }
    };
  };

  /**
    @class
    <p>The histogram facet works with numeric data by building a histogram across intervals
       of the field values. Each value is <em>rounded</em> into an interval (or placed in a
       bucket), and statistics are provided per interval/bucket (count and total).</p>

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

    @name ejs.HistogramFacet

    @desc
    <p>A facet which returns the N most frequent terms within a collection
       or set of collections.</p>

    @param {String} name The name which be used to refer to this facet. For instance,
        the facet itself might utilize a field named <code>doc_authors</code>. Setting
        <code>name</code> to <code>Authors</code> would allow you to refer to the
        facet by that name, possibly simplifying some of the display logic.
  
    */
  ejs.HistogramFacet = function (name) {

    /**
        The internal facet object.
        @member ejs.HistogramFacet
        @property {Object} facet
        */
    var facet = {};

    facet[name] = {
      histogram: {}
    };

    return {

      /**
            Sets the field to be used to construct the this facet.

            @member ejs.HistogramFacet
            @param {String} fieldName The field name whose data will be used to construct the facet.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (fieldName) {
        facet[name].histogram.field = fieldName;
        return this;
      },

      /**
            Sets the bucket interval used to calculate the distribution.

            @member ejs.HistogramFacet
            @param {Number} numericInterval The bucket interval in which to group values.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      interval: function (numericInterval) {
        facet[name].histogram.interval = numericInterval;
        return this;
      },

      /**
            Allows you to specify a different value field to aggrerate over.

            @member ejs.HistogramFacet
            @param {String} fieldName The name of the field to be used.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      valueField: function (fieldName) {
        facet[name].histogram.value_field = fieldName;
        return this;
      },

      /**
            Allows you to specify a different key field to be used to group intervals.

            @member ejs.HistogramFacet
            @param {String} fieldName The name of the field to be used.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      keyField: function (fieldName) {
        facet[name].histogram.key_field = fieldName;
        return this;
      },

      /**
            Allows you modify the <code>value</code> field using a script. The modified value
            is then used to compute the statistical data.

            @member ejs.HistogramFacet
            @param {String} scriptCode A valid script string to execute.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      valueScript: function (scriptCode) {
        facet[name].histogram.value_script = scriptCode;
        return this;
      },

      /**
            Allows you modify the <code>key</code> field using a script. The modified value
            is then used to generate the interval.

            @member ejs.HistogramFacet
            @param {String} scriptCode A valid script string to execute.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      keyScript: function (scriptCode) {
        facet[name].histogram.value_script = scriptCode;
        return this;
      },

      /**
            The script language being used. Currently supported values are
            <code>javascript</code>, <code>groovy</code>, and <code>mvel</code>.

            @member ejs.HistogramFacet
            @param {String} language The language of the script.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      lang: function (language) {
        facet[name].histogram.lang = language;
        return this;
      },

      /**
            <p>Allows you to reduce the documents used for computing facet results.</p>

            @member ejs.HistogramFacet
            @param {Object} oFilter A valid <code>Filter</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      filter: function (oFilter) {
        facet[name].facet_filter = oFilter.get();
        return this;
      },

      /**
            <p>Allows you to serialize this object into a JSON encoded string.</p>

            @member ejs.HistogramFacet
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(facet);
      },

      /**
            <p>Retrieves the internal <code>facet</code> object. This is typically used by
               internal API functions so use with caution.</p>

            @member ejs.HistogramFacet
            @returns {String} returns this object's internal <code>facet</code> property.
            */
      get: function () {
        return facet;
      }
    };
  };

  /**
    @class
    <p>A statistical facet allows you to compute statistical data over a numeric fields. Statistical data includes
    the count, total, sum of squares, mean (average), minimum, maximum, variance, and standard deviation.</p>

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

    @name ejs.StatisticalFacet

    @desc
    <p>A facet which returns statistical information about a numeric field</p>

    @param {String} name The name which be used to refer to this facet. For instance,
        the facet itself might utilize a field named <code>doc_authors</code>. Setting
        <code>name</code> to <code>Authors</code> would allow you to refer to the
        facet by that name, possibly simplifying some of the display logic.
  
    */
  ejs.StatisticalFacet = function (name) {

    /**
        The internal facet object.
        @member ejs.StatisticalFacet
        @property {Object} facet
        */
    var facet = {};

    facet[name] = {
      statistical: {}
    };

    return {

      /**
            Sets the field to be used to construct the this facet.

            @member ejs.StatisticalFacet
            @param {String} fieldName The field name whose data will be used to construct the facet.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (fieldName) {
        facet[name].statistical.field = fieldName;
        return this;
      },

      /**
            Aggregate statistical info across a set of fields.

            @member ejs.StatisticalFacet
            @param {Array} aFieldName An array of field names.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      fields: function (aFieldName) {
        facet[name].statistical.fields = aFieldName;
        return this;
      },

      /**
            Define a script to evaluate of which the result will be used to generate
            the statistical information.

            @member ejs.StatisticalFacet
            @param {String} code The script code to execute.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      script: function (code) {
        facet[name].statistical.script = code;
        return this;
      },

      /**
            The script language being used. Currently supported values are
            <code>javascript</code>, <code>groovy</code>, and <code>mvel</code>.

            @member ejs.StatisticalFacet
            @param {String} language The language of the script.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      lang: function (language) {
        facet[name].statistical.lang = language;
        return this;
      },

      /**
            Allows you to set script parameters to be used during the execution of the script.

            @member ejs.StatisticalFacet
            @param {Object} oParams An object containing key/value pairs representing param name/value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      params: function (oParams) {
        facet[name].statistical.params = oParams;
        return this;
      },

      /**
            <p>Allows you to reduce the documents used for computing facet results.</p>

            @member ejs.StatisticalFacet
            @param {Object} oFilter A valid <code>Filter</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      filter: function (oFilter) {
        facet[name].facet_filter = oFilter.get();
        return this;
      },

      /**
            <p>Allows you to serialize this object into a JSON encoded string.</p>

            @member ejs.StatisticalFacet
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(facet);
      },

      /**
            <p>Retrieves the internal <code>facet</code> object. This is typically used by
               internal API functions so use with caution.</p>

            @member ejs.StatisticalFacet
            @returns {String} returns this object's internal <code>facet</code> property.
            */
      get: function () {
        return facet;
      }
    };
  };

  /**
    @class
    <p>A termsStatsFacet allows you to compute statistics over an aggregate key (term). Essentially this
    facet provides the functionality of what is often refered to as a <em>pivot table</em>.</p>

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
    <a target="_blank" class="btn c9" href="https://gist.github.com/1895130">View Code Example</a></p>

    @name ejs.TermStatsFacet

    @desc
    <p>A facet which computes statistical data based on an aggregate key.</p>

    @param {String} name The name which be used to refer to this facet. For instance,
        the facet itself might utilize a field named <code>doc_authors</code>. Setting
        <code>name</code> to <code>Authors</code> would allow you to refer to the
        facet by that name, possibly simplifying some of the display logic.
  
    */
  ejs.TermStatsFacet = function (name) {

    /**
        The internal facet object.
        @member ejs.TermStatsFacet
        @property {Object} facet
        */
    var facet = {};

    facet[name] = {
      terms_stats: {}
    };

    return {

      /**
            Sets the field for which statistical information will be generated.

            @member ejs.TermStatsFacet
            @param {String} fieldName The field name whose data will be used to construct the facet.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      valueField: function (fieldName) {
        facet[name].terms_stats.value_field = fieldName;
        return this;
      },

      /**
            Sets the field which will be used to pivot on (group-by).

            @member ejs.TermStatsFacet
            @param {String} fieldName The field name whose data will be used to construct the facet.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      keyField: function (fieldName) {
        facet[name].terms_stats.key_field = fieldName;
        return this;
      },

      /**
            Define a script to evaluate of which the result will be used to generate
            the statistical information.

            @member ejs.TermStatsFacet
            @param {String} code The script code to execute.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      valueScript: function (code) {
        facet[name].terms_stats.value_script = code;
        return this;
      },

      /**
            The script language being used. Currently supported values are
            <code>javascript</code>, <code>groovy</code>, and <code>mvel</code>.

            @member ejs.TermStatsFacet
            @param {String} language The language of the script.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      lang: function (language) {
        facet[name].terms_stats.lang = language;
        return this;
      },

      /**
            Allows you to set script parameters to be used during the execution of the script.

            @member ejs.TermStatsFacet
            @param {Object} oParams An object containing key/value pairs representing param name/value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      params: function (oParams) {
        facet[name].terms_stats.params = oParams;
        return this;
      },

      /**
            Sets the number of facet entries that will be returned for this facet. For instance, you
            might ask for only the top 5 aggregate keys although there might be hundreds of
            unique keys. <strong>Higher settings could cause memory strain</strong>.

            @member ejs.TermStatsFacet
            @param {Integer} facetSize The numer of facet entries to be returned.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      size: function (facetSize) {
        facet[name].terms_stats.size = facetSize;
        return this;
      },

      /**
            Sets the order in which facets are returned.

            @member ejs.TermStatsFacet
            @param {String} ordering Valid options are <code>term, reverse_term, count, reverse_count, total, reverse_total, min, reverse_min, max, reverse_max</code>. Defaults to <code>term</code>.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      order: function (ordering) {
        facet[name].terms_stats.order = ordering;
        return this;
      },

      /**
            <p>Allows you to reduce the documents used for computing facet results.</p>

            @member ejs.TermStatsFacet
            @param {Object} oFilter A valid <code>Filter</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      filter: function (oFilter) {
        facet[name].facet_filter = oFilter.get();
        return this;
      },

      /**
            <p>Allows you to serialize this object into a JSON encoded string.</p>

            @member ejs.TermStatsFacet
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(facet);
      },

      /**
            <p>Retrieves the internal <code>facet</code> object. This is typically used by
               internal API functions so use with caution.</p>

            @member ejs.TermStatsFacet
            @returns {String} returns this object's internal <code>facet</code> property.
            */
      get: function () {
        return facet;
      }
    };
  };

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
        facet[name].facet_filter = oFilter.get();
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
            <p>Retrieves the internal <code>facet</code> object. This is typically used by
               internal API functions so use with caution.</p>

            @member ejs.GeoDistanceFacet
            @returns {String} returns this object's internal <code>facet</code> property.
            */
      get: function () {
        facet[name].geo_distance.ranges = ranges;
        if (field !== null) {
          facet[name].geo_distance[field] = geoCoordinate;
        }
        return facet;
      }
    };
  };

  /**
    @class
    <p>The QueryFacet facet allows you to specify any valid <code>Query</code> and
    have the number of matching hits returned as the value.</p>

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

    @name ejs.QueryFacet

    @desc
    <p>A facet that return a count of the hits matching the given query.</p>

    @param {String} name The name which be used to refer to this facet. For instance,
        the facet itself might utilize a field named <code>doc_authors</code>. Setting
        <code>name</code> to <code>Authors</code> would allow you to refer to the
        facet by that name, possibly simplifying some of the display logic.
  
    */
  ejs.QueryFacet = function (name) {

    /**
        The internal facet object.
        @member ejs.QueryFacet
        @property {Object} facet
        */
    var facet = {};
    facet[name] = {};

    return {

      /**
            <p>Sets the query to be used for this facet.</p>

            @member ejs.QueryFacet
            @param {Object} oQuery A valid <code>Query</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      query: function (oQuery) {
        facet[name].query = oQuery.get();
        return this;
      },

      /**
            <p>Allows you to reduce the documents used for computing facet results.</p>

            @member ejs.QueryFacet
            @param {Object} oFilter A valid <code>Filter</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      filter: function (oFilter) {
        facet[name].facet_filter = oFilter.get();
        return this;
      },

      /**
            <p>Allows you to serialize this object into a JSON encoded string.</p>

            @member ejs.QueryFacet
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(facet);
      },

      /**
            <p>Retrieves the internal <code>facet</code> object. This is typically used by
               internal API functions so use with caution.</p>

            @member ejs.QueryFacet
            @returns {String} returns this object's internal <code>facet</code> property.
            */
      get: function () {
        return facet;
      }
    };
  };

  /**
    @class
    <p>The FilterFacet allows you to specify any valid <code>Filter</code> and
    have the number of matching hits returned as the value.</p>

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

    @name ejs.FilterFacet

    @desc
    <p>A facet that return a count of the hits matching the given filter.</p>

    @param {String} name The name which be used to refer to this facet. For instance,
        the facet itself might utilize a field named <code>doc_authors</code>. Setting
        <code>name</code> to <code>Authors</code> would allow you to refer to the
        facet by that name, possibly simplifying some of the display logic.
  
    */
  ejs.FilterFacet = function (name) {

    /**
        The internal facet object.
        @member ejs.FilterFacet
        @property {Object} facet
        */
    var facet = {};
    facet[name] = {};

    return {

      /**
            <p>Sets the filter to be used for this facet.</p>

            @member ejs.FilterFacet
            @param {Object} oFilter A valid <code>Query</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      fltr: function (oFilter) {
        facet[name].filter = oFilter.get();
        return this;
      },

      /**
            <p>Allows you to reduce the documents used for computing facet results.</p>

            @member ejs.FilterFacet
            @param {Object} oFilter A valid <code>Filter</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      filter: function (oFilter) {
        facet[name].facet_filter = oFilter.get();
        return this;
      },

      /**
            <p>Allows you to serialize this object into a JSON encoded string.</p>

            @member ejs.FilterFacet
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(facet);
      },

      /**
            <p>Retrieves the internal <code>facet</code> object. This is typically used by
               internal API functions so use with caution.</p>

            @member ejs.FilterFacet
            @returns {String} returns this object's internal <code>facet</code> property.
            */
      get: function () {
        return facet;
      }
    };
  };

  /**
    @class
    <p>A RangeFacet allows you to specify a set of ranges and get both the number of docs (count) that
       fall within each range, and aggregated data based on the field, or another specified field.</p>

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

    @name ejs.RangeFacet

    @desc
    <p>A facet which provides information over a range of numeric intervals.</p>

    @param {String} name The name which be used to refer to this facet. For instance,
        the facet itself might utilize a field named <code>doc_authors</code>. Setting
        <code>name</code> to <code>Authors</code> would allow you to refer to the
        facet by that name, possibly simplifying some of the display logic.
  
    */
  ejs.RangeFacet = function (name) {

    /**
        The internal facet object.
        @member ejs.RangeFacet
        @property {Object} facet
        */
    var facet = {},
    ranges = [];

    facet[name] = {
      range: {}
    };

    return {

      /**
            Sets the document field to be used for the facet.

            @member ejs.RangeFacet
            @param {String} fieldName The field name whose data will be used to compute the interval.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (fieldName) {
        facet[name].range.field = fieldName;
        return this;
      },

      /**
            Allows you to specify an alternate key field to be used to compute the interval.

            @member ejs.RangeFacet
            @param {String} fieldName The field name whose data will be used to compute the interval.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      keyField: function (fieldName) {
        facet[name].range.key_field = fieldName;
        return this;
      },

      /**
            Allows you to specify an alternate value field to be used to compute statistical information.

            @member ejs.RangeFacet
            @param {String} fieldName The field name whose data will be used to compute statistics.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      valuefield: function (fieldName) {
        facet[name].range.value_field = fieldName;
        return this;
      },

      /**
            Allows you modify the <code>value</code> field using a script. The modified value
            is then used to compute the statistical data.

            @member ejs.RangeFacet
            @param {String} scriptCode A valid script string to execute.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      valueScript: function (scriptCode) {
        facet[name].range.value_script = scriptCode;
        return this;
      },

      /**
            Allows you modify the <code>key</code> field using a script. The modified value
            is then used to generate the interval.

            @member ejs.RangeFacet
            @param {String} scriptCode A valid script string to execute.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      keyScript: function (scriptCode) {
        facet[name].range.value_script = scriptCode;
        return this;
      },

      /**
            The script language being used. Currently supported values are
            <code>javascript</code>, <code>groovy</code>, and <code>mvel</code>.

            @member ejs.RangeFacet
            @param {String} language The language of the script.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      lang: function (language) {
        facet[name].range.lang = language;
        return this;
      },

      /**
            Adds a new bounded range.

            @member ejs.RangeFacet
            @param {Number} from The lower bound of the range (can also be <code>Date</code>).
            @param {Number} to The upper bound of the range (can also be <code>Date</code>).
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      addRange: function (from, to) {
        ranges.push({
          "from": from,
          "to": to
        });
        return this;
      },

      /**
            Adds a new unbounded lower limit.

            @member ejs.RangeFacet
            @param {Number} from The lower limit of the unbounded range (can also be <code>Date</code>).
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      addUnboundedFrom: function (from) {
        ranges.push({
          "from": from
        });
        return this;
      },

      /**
            Adds a new unbounded upper limit.

            @member ejs.RangeFacet
            @param {Number} to The upper limit of the unbounded range (can also be <code>Date</code>).
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      addUnboundedTo: function (to) {
        ranges.push({
          "to": to
        });
        return this;
      },

      /**
            <p>Allows you to reduce the documents used for computing facet results.</p>

            @member ejs.RangeFacet
            @param {Object} oFilter A valid <code>Filter</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      filter: function (oFilter) {
        facet[name].facet_filter = oFilter.get();
        return this;
      },

      /**
            <p>Allows you to serialize this object into a JSON encoded string.</p>

            @member ejs.RangeFacet
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        facet[name].range.ranges = ranges;
        return JSON.stringify(facet);
      },

      /**
            <p>Retrieves the internal <code>facet</code> object. This is typically used by
               internal API functions so use with caution.</p>

            @member ejs.RangeFacet
            @returns {String} returns this object's internal <code>facet</code> property.
            */
      get: function () {
        facet[name].range.ranges = ranges;
        return facet;
      }
    };
  };

