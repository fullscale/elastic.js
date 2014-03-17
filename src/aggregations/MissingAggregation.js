  /**
    @class
    <p>A field data based single bucket aggregation, that creates a bucket of all
    documents in the current document set context that are missing a field value
    (effectively, missing a field or having the configured NULL value set).</p>

    @name ejs.MissingAggregation
    @ejs aggregation
    @borrows ejs.AggregationMixin.aggregation as aggregation
    @borrows ejs.AggregationMixin.agg as agg
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    @desc
    <p>Defines a bucket of all documents that are missing a field value.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.MissingAggregation = function (name) {

    var
      _common = ejs.AggregationMixin(name),
      agg = _common.toJSON();

    agg[name].missing = {};

    return extend(_common, {

      /**
      <p>Sets the field to gather missing terms from.</p>

      @member ejs.MissingAggregation
      @param {String} field a valid field name..
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      field: function (field) {
        if (field == null) {
          return agg[name].missing.field;
        }

        agg[name].missing.field = field;
        return this;
      }

    });
  };
