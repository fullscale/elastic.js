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
      _common = ejs.AggregationMixin(name),
      agg = _common.toJSON();

    agg[name].top_hits = {};

    return extend(_common, {
      /**
      <p> The offset from the first result you want to fetch. </p>

      @member ejs.TopHitsAggregation
      @param {Integer} from The offset from the first result you want to fetch.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      from: function (from) {
        if (from === null) {
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
        if (size === null) {
          return agg[name].top_hits.size;
        }

        agg[name].top_hits.size = size;
        return this;
      },

      /**
      <p>The maximum number of top matching hits to return per bucket.</p>

      @member ejs.TopHitsAggregation
      @param {Array} sort How to sort the the top matching hits
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      sort: function (sort) {
        if (sort === null) {
          return agg[name].top_hits.sort;
        }

        agg[name].top_hits.sort = sort;
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
        if (trueFalse === null) {
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
        if (trueFalse === null) {
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
        if (trueFalse === null) {
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
        if (h === null) {
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
        if (oScriptField === null) {
          return agg[name].top_hits.script_fields;
        }

        if (agg[name].top_hits.script_fields === undefined) {
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
      fieldDataFields: function (fielddata_fields) {
        if (fielddata_fields === null) {
          return agg[name].top_hits.fielddata_fields;
        }

        agg[name].top_hits.fielddata_fields = fielddata_fields;
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
        if (includes === undefined && excludes === undefined) {
          return agg[name].top_hits._source;
        }

        if (!isArray(includes) && !isString(includes) && !isBoolean(includes)) {
          throw new TypeError('Argument includes must be a string, an array, or a boolean');
        }

        if (excludes !== undefined && !isArray(excludes) && !isString(excludes)) {
          throw new TypeError('Argument excludes must be a string or an array');
        }

        if (isBoolean(includes)) {
          agg[name].top_hits._source = includes;
        } else {
          agg[name].top_hits._source = {
            includes: includes
          };

          if (excludes != null) {
            agg[name].top_hits._source.excludes = excludes;
          }
        }

        return this;
      }
    });
  };
