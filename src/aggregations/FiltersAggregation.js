  /**
    @class
    <p>Defines a single bucket of all the documents in the current document set
    context that match a specified filter. Often this will be used to narrow down
    the current aggregation context to a specific set of documents.</p>

    @name ejs.FilterAggregation
    @ejs aggregation
    @borrows ejs.AggregationMixin.aggregation as aggregation
    @borrows ejs.AggregationMixin.agg as agg
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    @desc
    <p>Defines a single bucket of all the documents that match a given filter.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.FiltersAggregation = function (name) {

    var
      _common = ejs.AggregationMixin(name),
      agg = _common.toJSON();

    return extend(_common, {

      /**
      <p>Sets the filters to be used for this aggregation.</p>

      @member ejs.FilterAggregation
      @param {Filter} oFilter A valid <code>Filter</code> object.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      filters: function (oFilters) {
        if (oFilters == null) {
          return agg[name].filters;
        }
        var filters = {}, key, oFilter;
        agg[name].filters = {
          filters: filters
        };
        for (key in oFilters) {
          oFilter = oFilters[key];
          if (!isFilter(oFilter)) {
            throw new TypeError('Argument must be a Filter');
          }
          filters[key] = oFilter.toJSON();
        }
        return this;
      }

    });
  };
