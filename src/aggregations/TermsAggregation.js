  /**
    @class
    <p>A multi-bucket value source based aggregation where buckets are dynamically
    built - one per unique value.</p>

    @name ejs.TermsAggregation
    @ejs aggregation
    @borrows ejs.BucketsAggregationMixin.field as field
    @borrows ejs.BucketsAggregationMixin.script as script
    @borrows ejs.BucketsAggregationMixin.scriptId as scriptId
    @borrows ejs.BucketsAggregationMixin.scriptFile as scriptFile
    @borrows ejs.BucketsAggregationMixin.lang as lang
    @borrows ejs.BucketsAggregationMixin.params as params
    @borrows ejs.AggregationMixin.aggregation as aggregation
    @borrows ejs.AggregationMixin.agg as agg
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    @desc
    <p>Defines an aggregation of unique values/terms.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.TermsAggregation = function (name) {

    var
      _common = ejs.BucketsAggregationMixin(name, 'terms'),
      agg = _common.toJSON();

    agg[name].terms = {};

    return extend(_common, {

      /**
      Sets the format expression for the terms.  Use for number or date
      formatting

      @member ejs.TermsAggregation
      @param {String} f the format string
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      format: function (f) {
        if (f == null) {
          return agg[name].terms.format;
        }

        agg[name].terms.format = f;
        return this;
      },

      /**
      <p>Allows you to allow only specific entries using a regular
      expression.  You can also optionally pass in a set of flags to apply
      to the regular expression.  Valid flags are: CASE_INSENSITIVE,
      MULTILINE, DOTALL, UNICODE_CASE, CANON_EQ, UNIX_LINES, LITERAL,
      COMMENTS, and UNICODE_CHAR_CLASS.  Separate multiple flags with a |
      character.</p>

      @member ejs.TermsAggregation
      @param {String} include A regular expression include string
      @param {String} flags Optional regular expression flags..
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      include: function (include, flags) {
        if (agg[name].terms.include == null) {
          agg[name].terms.include = {};
        }

        if (include == null) {
          return agg[name].terms.include;
        }

        agg[name].terms.include.pattern = include;
        if (flags != null) {
          agg[name].terms.include.flags = flags;
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

      @member ejs.TermsAggregation
      @param {String} exclude A regular expression exclude string
      @param {String} flags Optional regular expression flags..
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      exclude: function (exclude, flags) {
        if (agg[name].terms.exclude == null) {
          agg[name].terms.exclude = {};
        }

        if (exclude == null) {
          return agg[name].terms.exclude;
        }

        agg[name].terms.exclude.pattern = exclude;
        if (flags != null) {
          agg[name].terms.exclude.flags = flags;
        }

        return this;
      },

      /**
      Sets the execution hint determines how the aggregation is computed.
      Supported values are: map and ordinals.

      @member ejs.TermsAggregation
      @param {String} h The hint value as a string.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      executionHint: function (h) {
        if (h == null) {
          return agg[name].terms.execution_hint;
        }

        h = h.toLowerCase();
        if (h === 'map' || h === 'ordinals') {
          agg[name].terms.execution_hint = h;
        }

        return this;
      },

      /**
      Sets the number of aggregation entries that will be returned.

      @member ejs.TermsAggregation
      @param {Integer} size The numer of aggregation entries to be returned.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      size: function (size) {
        if (size == null) {
          return agg[name].terms.size;
        }

        agg[name].terms.size = size;
        return this;
      },


      /**
      Determines how many terms the coordinating node will request from
      each shard.

      @member ejs.TermsAggregation
      @param {Integer} shardSize The numer of terms to fetch from each shard.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      shardSize: function (shardSize) {
        if (shardSize == null) {
          return agg[name].terms.shard_size;
        }

        agg[name].terms.shard_size = shardSize;
        return this;
      },

      /**
      Only return terms that match more than a configured number of hits.

      @member ejs.TermsAggregation
      @param {Integer} num The numer of minimum number of hits.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      minDocCount: function (num) {
        if (num == null) {
          return agg[name].terms.min_doc_count;
        }

        agg[name].terms.min_doc_count = num;
        return this;
      },

      /**
      Sets order for the aggregated values.

      @member ejs.TermsAggregation
      @param {String} order The order string.
      @param {String} direction The sort direction, asc or desc.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      order: function (order, direction) {
        if (order == null) {
          return agg[name].terms.order;
        }

        if (direction == null) {
          direction = 'desc';
        }

        direction = direction.toLowerCase();
        if (direction !== 'asc' && direction !== 'desc') {
          direction = 'desc';
        }

        agg[name].terms.order = {};
        agg[name].terms.order[order] = direction;
        return this;
      }

    });
  };
