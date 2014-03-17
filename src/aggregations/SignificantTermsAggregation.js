  /**
    @class
    <p>An aggregation that returns interesting or unusual occurrences of terms in
    a set.</p>

    @name ejs.SignificantTermsAggregation
    @ejs aggregation
    @borrows ejs.AggregationMixin.aggregation as aggregation
    @borrows ejs.AggregationMixin.agg as agg
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    @desc
    <p>An aggregation that returns interesting or unusual occurrences of terms in
    a set.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.SignificantTermsAggregation = function (name) {

    var
      _common = ejs.AggregationMixin(name),
      agg = _common.toJSON();

    agg[name].significant_terms = {};

    return extend(_common, {

      /**
      <p>Sets the field to gather terms from.</p>

      @member ejs.SignificantTermsAggregation
      @param {String} field a valid field name..
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      field: function (field) {
        if (field == null) {
          return agg[name].significant_terms.field;
        }

        agg[name].significant_terms.field = field;
        return this;
      },

      /**
      Sets the format expression for the terms.  Use for number or date
      formatting.

      @member ejs.SignificantTermsAggregation
      @param {String} f the format string
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      format: function (f) {
        if (f == null) {
          return agg[name].significant_terms.format;
        }

        agg[name].significant_terms.format = f;
        return this;
      },

      /**
      <p>Allows you to allow only specific entries using a regular
      expression.  You can also optionally pass in a set of flags to apply
      to the regular expression.  Valid flags are: CASE_INSENSITIVE,
      MULTILINE, DOTALL, UNICODE_CASE, CANON_EQ, UNIX_LINES, LITERAL,
      COMMENTS, and UNICODE_CHAR_CLASS.  Separate multiple flags with a |
      character.</p>

      @member ejs.SignificantTermsAggregation
      @param {String} include A regular expression include string
      @param {String} flags Optional regular expression flags..
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      include: function (include, flags) {
        if (agg[name].significant_terms.include == null) {
          agg[name].significant_terms.include = {};
        }

        if (include == null) {
          return agg[name].significant_terms.include;
        }

        agg[name].significant_terms.include.pattern = include;
        if (flags != null) {
          agg[name].significant_terms.include.flags = flags;
        }

        return this;
      },

      /**
      <p>Allows you to filter out unwanted facet entries using a regular
      expression.  You can also optionally pass in a set of flags to apply
      to the regular expression.  Valid flags are: CASE_INSENSITIVE,
      MULTILINE, DOTALL, UNICODE_CASE, CANON_EQ, UNIX_LINES, LITERAL,
      COMMENTS, and UNICODE_CHAR_CLASS.  Separate multiple flags with a |
      character.</p>

      @member ejs.SignificantTermsAggregation
      @param {String} exclude A regular expression exclude string
      @param {String} flags Optional regular expression flags..
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      exclude: function (exclude, flags) {
        if (agg[name].significant_terms.exclude == null) {
          agg[name].significant_terms.exclude = {};
        }

        if (exclude == null) {
          return agg[name].significant_terms.exclude;
        }

        agg[name].significant_terms.exclude.pattern = exclude;
        if (flags != null) {
          agg[name].significant_terms.exclude.flags = flags;
        }

        return this;
      },

      /**
      Sets the execution hint determines how the aggregation is computed.
      Supported values are: map and ordinals.

      @member ejs.SignificantTermsAggregation
      @param {String} h The hint value as a string.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      executionHint: function (h) {
        if (h == null) {
          return agg[name].significant_terms.execution_hint;
        }

        h = h.toLowerCase();
        if (h === 'map' || h === 'ordinals') {
          agg[name].significant_terms.execution_hint = h;
        }

        return this;
      },

      /**
      Sets the number of aggregation entries that will be returned.

      @member ejs.SignificantTermsAggregation
      @param {Integer} size The numer of aggregation entries to be returned.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      size: function (size) {
        if (size == null) {
          return agg[name].significant_terms.size;
        }

        agg[name].significant_terms.size = size;
        return this;
      },


      /**
      Determines how many terms the coordinating node will request from
      each shard.

      @member ejs.SignificantTermsAggregation
      @param {Integer} shardSize The numer of terms to fetch from each shard.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      shardSize: function (shardSize) {
        if (shardSize == null) {
          return agg[name].significant_terms.shard_size;
        }

        agg[name].significant_terms.shard_size = shardSize;
        return this;
      },

      /**
      Only return terms that match more than a configured number of hits.

      @member ejs.SignificantTermsAggregation
      @param {Integer} num The numer of minimum number of hits.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      minDocCount: function (num) {
        if (num == null) {
          return agg[name].significant_terms.min_doc_count;
        }

        agg[name].significant_terms.min_doc_count = num;
        return this;
      }

    });
  };
