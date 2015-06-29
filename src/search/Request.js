  /**
    @class
    <p>The <code>Request</code> object provides methods generating an elasticsearch request body.</p>

    @name ejs.Request
    @ejs request

    @desc
    <p>Provides methods for generating request bodies.</p>

    @param {Object} conf A configuration object containing the initilization
      parameters.  The following parameters can be set in the conf object:
        indices - single index name or array of index names
        types - single type name or array of types
        routing - the shard routing value
    */
  ejs.Request = function () {

    /**
        The internal query object.
        @member ejs.Request
        @property {Object} query
        */
    var query = {};

    return {

      /**
            <p>Sets the sorting for the query.  This accepts many input formats.</p>

            <dl>
                <dd><code>sort()</code> - The current sorting values are returned.</dd>
                <dd><code>sort(fieldName)</code> - Adds the field to the current list of sorting values.</dd>
                <dd><code>sort(fieldName, order)</code> - Adds the field to the current list of
                    sorting with the specified order.  Order must be asc or desc.</dd>
                <dd><code>sort(ejs.Sort)</code> - Adds the Sort value to the current list of sorting values.</dd>
                <dd><code>sort(array)</code> - Replaces all current sorting values with values
                    from the array.  The array must contain only strings and Sort objects.</dd>
            </dl>

            <p>Multi-level sorting is supported so the order in which sort fields
            are added to the query requests is relevant.</p>

            <p>It is recommended to use <code>Sort</code> objects when possible.</p>

            @member ejs.Request
            @param {String} fieldName The field to be sorted by.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      sort: function () {
        var i, len;

        if (!has(query, "sort")) {
          query.sort = [];
        }

        if (arguments.length === 0) {
          return query.sort;
        }

        // if passed a single argument
        if (arguments.length === 1) {
          var sortVal = arguments[0];

          if (isString(sortVal)) {
            // add  a single field name
            query.sort.push(sortVal);
          } else if (isSort(sortVal)) {
            // add the Sort object
            query.sort.push(sortVal.toJSON());
          } else if (isArray(sortVal)) {
            // replace with all values in the array
            // the values must be a fieldName (string) or a
            // Sort object.  Any other type throws an Error.
            query.sort = [];
            for (i = 0, len = sortVal.length; i < len; i++) {
              if (isString(sortVal[i])) {
                query.sort.push(sortVal[i]);
              } else if (isSort(sortVal[i])) {
                query.sort.push(sortVal[i].toJSON());
              } else {
                throw new TypeError('Invalid object in array');
              }
            }
          } else {
            // Invalid object type as argument.
            throw new TypeError('Argument must be string, Sort, or array');
          }
        } else if (arguments.length === 2) {
          // handle the case where a single field name and order are passed
          var field = arguments[0],
            order = arguments[1];

          if (isString(field) && isString(order)) {
            order = order.toLowerCase();
            if (order === 'asc' || order === 'desc') {
              var sortObj = {};
              sortObj[field] = {order: order};
              query.sort.push(sortObj);
            }
          }
        }

        return this;
      },

      /**
           Enables score computation and tracking during sorting.  Be default,
           when sorting scores are not computed.

            @member ejs.Request
            @param {Boolean} trueFalse If scores should be computed and tracked.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      trackScores: function (trueFalse) {
        if (trueFalse == null) {
          return query.track_scores;
        }

        query.track_scores = trueFalse;
        return this;
      },

      /**
            A search result set could be very large (think Google). Setting the
            <code>from</code> parameter allows you to page through the result set
            by making multiple request. This parameters specifies the starting
            result/document number point. Combine with <code>size()</code> to achieve paging.

            @member ejs.Request
            @param {Array} f The offset at which to start fetching results/documents from the result set.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      from: function (f) {
        if (f == null) {
          return query.from;
        }

        query.from = f;
        return this;
      },

      /**
            Sets the number of results/documents to be returned. This is set on a per page basis.

            @member ejs.Request
            @param {Integer} s The number of results that are to be returned by the search.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      size: function (s) {
        if (s == null) {
          return query.size;
        }

        query.size = s;
        return this;
      },

      /**
            A timeout, bounding the request to be executed within the
            specified time value and bail when expired. Defaults to no timeout.

            <p>This option is valid during the following operations:
                <code>search</code> and <code>delete by query</code></p>

            @member ejs.Request
            @param {Long} t The timeout value in milliseconds.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      timeout: function (t) {
        if (t == null) {
          return query.timeout;
        }

        query.timeout = t;
        return this;
      },


      /**
            By default, searches return full documents, meaning every property or field.
            This method allows you to specify which fields you want returned.

            Pass a single field name and it is appended to the current list of
            fields.  Pass an array of fields and it replaces all existing
            fields.

            @member ejs.Request
            @param {(String|String[])} s The field as a string or fields as array
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      fields: function (fieldList) {
        if (fieldList == null) {
          return query.fields;
        }

        if (query.fields == null) {
          query.fields = [];
        }

        if (isString(fieldList)) {
          query.fields.push(fieldList);
        } else if (isArray(fieldList)) {
          query.fields = fieldList;
        } else {
          throw new TypeError('Argument must be a string or an array');
        }

        return this;
      },

      /**
            Allows to control how the _source field is returned with every hit.
            By default operations return the contents of the _source field
            unless you have used the fields parameter or if the _source field
            is disabled.  Set the includes parameter to false to completely
            disable returning the source field.

            @member ejs.Request
            @param {(String|Boolean|String[])} includes The field or list of fields to include as array.
              Set to a boolean false to disable the source completely.
            @param {(String|String[])} excludes The  optional field or list of fields to exclude.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      source: function (includes, excludes) {
        if (includes == null && excludes == null) {
          return query._source;
        }

        if (!isArray(includes) && !isString(includes) && !isBoolean(includes)) {
          throw new TypeError('Argument includes must be a string, an array, or a boolean');
        }

        if (excludes != null && !isArray(excludes) && !isString(excludes)) {
          throw new TypeError('Argument excludes must be a string or an array');
        }

        if (isBoolean(includes)) {
          query._source = includes;
        } else {
          query._source = {
            includes: includes
          };

          if (excludes != null) {
            query._source.excludes = excludes;
          }
        }

        return this;
      },

      /**
            Once a query executes, you can use rescore to run a secondary, more
            expensive query to re-order the results.

            @member ejs.Request
            @param {Rescore} r The rescore configuration.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      rescore: function (r) {
        if (r == null) {
          return query.rescore;
        }

        if (!isRescore(r)) {
          throw new TypeError('Argument must be a Rescore');
        }

        query.rescore = r.toJSON();

        return this;
      },

      /**
            Allows you to set the specified query on this search object. This is the
            query that will be used when the search is executed.

            @member ejs.Request
            @param {Query} someQuery Any valid <code>Query</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      query: function (someQuery) {
        if (someQuery == null) {
          return query.query;
        }

        if (!isQuery(someQuery)) {
          throw new TypeError('Argument must be a Query');
        }

        query.query = someQuery.toJSON();
        return this;
      },

      /**
            Allows you to set the specified facet on this request object. Multiple facets can
            be set, all of which will be returned when the search is executed.

            @member ejs.Request
            @param {Facet} facet Any valid <code>Facet</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      facet: function (facet) {
        if (facet == null) {
          return query.facets;
        }

        if (query.facets == null) {
          query.facets = {};
        }

        if (!isFacet(facet)) {
          throw new TypeError('Argument must be a Facet');
        }

        extend(query.facets, facet.toJSON());

        return this;
      },

      /**
      Add an aggregation.  This method can be called multiple times
      in order to set multiple nested aggregations that will be executed
      at the same time as the search request.

      @member ejs.Request
      @param {Aggregation} agg Any valid <code>Aggregation</code> object.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      aggregation: function(agg) {
        if (agg == null) {
          return query.aggs;
        }

        if (query.aggs == null) {
          query.aggs = {};
        }

        if (!isAggregation(agg)) {
          throw new TypeError('Argument must be an Aggregation');
        }

        extend(query.aggs, agg.toJSON());

        return this;
      },

      /**
      Add an aggregation.  This method can be called multiple times
      in order to set multiple nested aggregations that will be executed
      at the same time as the search request.  Alias for the aggregation method.

      @member ejs.Request
      @param {Aggregation} agg Any valid <code>Aggregation</code> object.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      agg: function(agg) {
        return this.aggregation(agg);
      },

      /**
            Allows you to set a specified filter on this request object.

            @member ejs.Request
            @param {Object} filter Any valid <code>Filter</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      filter: function (filter) {
        if (filter == null) {
          return query.filter;
        }

        if (!isFilter(filter)) {
          throw new TypeError('Argument must be a Filter');
        }

        query.filter = filter.toJSON();
        return this;
      },

      /**
            Performs highlighting based on the <code>Highlight</code>
            settings.

            @member ejs.Request
            @param {Highlight} h A valid Highlight object
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      highlight: function (h) {
        if (h == null) {
          return query.highlight;
        }

        if (!isHighlight(h)) {
          throw new TypeError('Argument must be a Highlight object');
        }

        query.highlight = h.toJSON();
        return this;
      },

      /**
            Allows you to set the specified suggester on this request object.
            Multiple suggesters can be set, all of which will be returned when
            the search is executed.  Global suggestion text can be set by
            passing in a string vs. a <code>Suggest</code> object.

            @since elasticsearch 0.90

            @member ejs.Request
            @param {(String|Suggest)} s A valid Suggest object or a String to
              set as the global suggest text.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      suggest: function (s) {
        if (s == null) {
          return query.suggest;
        }

        if (query.suggest == null) {
          query.suggest = {};
        }

        if (isString(s)) {
          query.suggest.text = s;
        } else if (isSuggest(s)) {
          extend(query.suggest, s.toJSON());
        } else {
          throw new TypeError('Argument must be a string or Suggest object');
        }

        return this;
      },

      /**
            Computes a document property dynamically based on the supplied <code>ScriptField</code>.

            @member ejs.Request
            @param {ScriptField} oScriptField A valid <code>ScriptField</code>.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      scriptField: function (oScriptField) {
        if (oScriptField == null) {
          return query.script_fields;
        }

        if (query.script_fields == null) {
          query.script_fields = {};
        }

        if (!isScriptField(oScriptField)) {
          throw new TypeError('Argument must be a ScriptField');
        }

        extend(query.script_fields, oScriptField.toJSON());
        return this;
      },

      /**
            Boosts hits in the specified index by the given boost value.

            @member ejs.Request
            @param {String} index the index to boost
            @param {Double} boost the boost value
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      indexBoost: function (index, boost) {
        if (query.indices_boost == null) {
          query.indices_boost = {};
        }

        if (arguments.length === 0) {
          return query.indices_boost;
        }

        query.indices_boost[index] = boost;
        return this;
      },

      /**
            Enable/Disable explanation of score for each search result.

            @member ejs.Request
            @param {Boolean} trueFalse true to enable, false to disable
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      explain: function (trueFalse) {
        if (trueFalse == null) {
          return query.explain;
        }

        query.explain = trueFalse;
        return this;
      },

      /**
            Enable/Disable returning version number for each search result.

            @member ejs.Request
            @param {Boolean} trueFalse true to enable, false to disable
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      version: function (trueFalse) {
        if (trueFalse == null) {
          return query.version;
        }

        query.version = trueFalse;
        return this;
      },

      /**
            Filters out search results will scores less than the specified minimum score.

            @member ejs.Request
            @param {Double} min a positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      minScore: function (min) {
        if (min == null) {
          return query.min_score;
        }

        query.min_score = min;
        return this;
      },

      /**
            The type of ejs object.  For internal use only.

            @member ejs.Request
            @returns {String} the type of object
            */
      _type: function () {
        return 'request';
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.Request
            @returns {String} returns this object's internal object representation.
            */
      toJSON: function () {
        return query;
      }

    };
  };
