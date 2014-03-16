  /**
    @mixin
    <p>The AggregationMixin provides support for common options used across
    various <code>Aggregation</code> implementations.  This object should not be
    used directly.</p>

    @name ejs.AggregationMixin
    */
  ejs.AggregationMixin = function (name) {

    var aggs = {};
    aggs[name] = {};

    return {

      /**
      Add a nesated aggregation.  This method can be called multiple times
      in order to set multiple nested aggregations what will be executed
      at the same time as the parent aggregation.

      @member ejs.AggregationMixin
      @param {Aggregation} agg Any valid <code>Aggregation</code> object.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      aggregation: function(agg) {
        if (agg == null) {
          return aggs[name].aggs;
        }

        if (aggs[name].aggs == null) {
          aggs[name].aggs = {};
        }

        if (!isAggregation(agg)) {
          throw new TypeError('Argument must be an Aggregation');
        }

        extend(aggs[name].aggs, agg.toJSON());

        return this;
      },

      /**
      Add a nesated aggregation.  This method can be called multiple times
      in order to set multiple nested aggregations what will be executed
      at the same time as the parent aggregation.  Alias for the
      aggregation method.

      @member ejs.AggregationMixin
      @param {Aggregation} agg Any valid <code>Aggregation</code> object.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      agg: function(agg) {
        return this.aggregation(agg);
      },

      /**
            The type of ejs object.  For internal use only.

            @member ejs.AggregationMixin
            @returns {String} the type of object
            */
      _type: function () {
        return 'aggregation';
      },

      /**
            <p>Retrieves the internal <code>agg</code> object. This is typically used by
               internal API functions so use with caution.</p>

            @member ejs.AggregationMixin
            @returns {String} returns this object's internal object.
            */
      toJSON: function () {
        return aggs;
      }

    };
  };
