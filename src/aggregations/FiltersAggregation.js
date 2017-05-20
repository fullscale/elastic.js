  /**
    @class
    <p>Defines a multi bucket aggregations where each bucket is 
    associated with a filter. Each bucket will collect all documents 
    that match its associated filter.</p>

    @name ejs.FiltersAggregation
    @ejs aggregation
    @borrows ejs.AggregationMixin.aggregation as aggregation
    @borrows ejs.AggregationMixin.agg as agg
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    @desc
    <p>Defines a multi bucket aggregations where each bucket is 
    associated with a filter. Each bucket will collect all documents 
    that match its associated filter.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.FiltersAggregation = function (name) {

    var
      _common = ejs.AggregationMixin(name),
      agg = _common.toJSON();

    agg[name].filters = {'filters':{}};

    return extend(_common, {

      /**
      <p>Sets the filters to be used for this aggregation.</p>

      @member ejs.FiltersAggregation
      @param {Filter} oFilter A valid <code>Filter</code> object.
      @param {string} id A name for the filter.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      filter: function (oFilter, id) {
        var filters = {};
        // if (agg[name].filters.filters == null) {
        //   agg[name].filters.filters = {};
        // }

        if (!isFilter(oFilter)) {
          throw new TypeError('First argument must be a Filter');
        }

        if (id == null) {
          throw new TypeError('Second argument must be a name for the filter');
        }

        agg[name].filters.filters[id] = oFilter.toJSON();
        return this;
      }

    });
  };
