  /**
    @class
    <p>A top_hits metric aggregator keeps track of the most relevant document being
    aggregated. This aggregator is intended to be used as a sub aggregator, so that
    the top matching documents can be aggregated per bucket. </p>

    @name ejs.TopHitsAggregation
    @ejs aggregation
    @borrows ejs.AggregationMixin.aggregation as aggregation
    @borrows ejs.AggregationMixin.agg as agg
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    @desc
    <p>top_hits metric aggregator keeps track of the most relevant document being
    aggregated.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.TopHitsAggregation = function (name) {

    var
    _common = ejs.MetricsAggregationMixin(name, 'top_hits'),
    agg = _common.toJSON();

    agg[name].top_hits = {
      size: 0,
      from: 0
    };

    return extend(_common, {
      /**
      <p> The offset from the first result you want to fetch. </p>

      @member ejs.TopHitsAggregation
      @param {Integer} from The offset from the first result you want to fetch.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      from: function (from) {
        if (from == null) {
          return agg[name].top_hits.from;
        }

        agg[name].top_hits.from = from;
        return this;
      },

      /**
      <p> Sets the maximum number of top matching hits to return per bucket. </p>

      @member ejs.TopHitsAggregation
      @param {Integer} size The numer of aggregation entries to be returned per bucket.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      size: function (size) {
        if (size == null) {
          return agg[name].top_hits.size;
        }

        agg[name].top_hits.size = size;
        return this;
      },

      /**
      <p>The maximum number of top matching hits to return per bucket.</p>

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

      @member ejs.TopHitsAggregation
      @param {Array} sort How to sort the the top matching hits
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      sort: function () {
        var i, len;
        var query = agg[name].top_hits;

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
      <p>Enables score computation and tracking during sorting.
      By default, sorting scores are not computed. <p/>

      @member ejs.TopHitsAggregation
      @param {Boolean} trueFalse If scores should be computed and tracked.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      trackScores: function (trueFalse) {
        if (trueFalse == null) {
          return agg[name].top_hits.track_scores;
        }

        agg[name].top_hits.track_scores = trueFalse;
        return this;
      },

      /**
      <p>Enable/Disable returning version number for each hit.</p>

      @member ejs.TopHitsAggregation
      @param {Boolean} trueFalse true to enable, false to disable
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      version: function (trueFalse) {
        if (trueFalse == null) {
          return agg[name].top_hits.version;
        }

        agg[name].top_hits.version = trueFalse;
        return this;
      },

      /**
      <p>Enable/Disable explanation of score for each hi.</p>

      @member ejs.TopHitsAggregation
      @param {Boolean} trueFalse true to enable, false to disable
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      explain: function (trueFalse) {
        if (trueFalse == null) {
          return agg[name].top_hits.explain;
        }

        agg[name].top_hits.explain = trueFalse;
        return this;
      },

      /**
      <p>Performs highlighting based on the <code>Highlight</code> settings.</p>

      @member ejs.TopHitsAggregation
      @param {Highlight} h A valid Highlight object
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      highlight: function (h) {
        if (h == null) {
          return agg[name].top_hits.highlight;
        }

        if (!isHighlight(h)) {
          throw new TypeError('Argument must be a Highlight object');
        }

        agg[name].top_hits.highlight = h.toJSON();
        return this;
      },

      /**
      <p>Computes a document property dynamically based on the supplied <code>ScriptField</code>.</p>

      @member ejs.TopHitsAggregation
      @param {ScriptField} oScriptField A valid <code>ScriptField</code>.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      scriptField: function (oScriptField) {
        if (oScriptField == null) {
          return agg[name].top_hits.script_fields;
        }

        if (agg[name].top_hits.script_fields == null) {
          agg[name].top_hits.script_fields = {};
        }

        if (!isScriptField(oScriptField)) {
          throw new TypeError('Argument must be a ScriptField');
        }

        extend(agg[name].top_hits.script_fields, oScriptField.toJSON());
        return this;
      },

    /**
      <p>Allows to return the field data representation of a field for each hit.</p>

      @member ejs.TopHitsAggregation
      @param {Array} Fields to return field data representation for.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      fieldDataFields: function (fieldList) {
        var query = agg[name].top_hits;
        if (fieldList == null) {
          return query.fielddata_fields;
        }

        if (query.fielddata_fields == null) {
          query.fielddata_fields = [];
        }

        if (isString(fieldList)) {
          query.fielddata_fields.push(fieldList);
        } else if (isArray(fieldList)) {
          query.fielddata_fields = fieldList;
        } else {
          throw new TypeError('Argument must be a string or an array');
        }

        return this;
      },

      /**
      <p> Allows to control how the _source field is returned with every hit.
       By default operations return the contents of the _source field
       unless you have used the fields parameter or if the _source field
       is disabled.  Set the includes parameter to false to completely
       disable returning the source field. </p>

       @member ejs.TopHitsAggregation
       @param {(String|Boolean|String[])} includes The field or list of fields to include as array.
         Set to a boolean false to disable the source completely.
       @param {(String|String[])} excludes The  optional field or list of fields to exclude.
       @returns {Object} returns <code>this</code> so that calls can be chained.
       */
      source: function (includes, excludes) {
        var query = agg[name].top_hits;
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
      }
    });
  };
