/**
    @class
    <p>A metric aggregation that computes the bounding box containing all geo_point values for a field.</p>

    @name ejs.GeoBoundsAggregation
    @ejs aggregation
    @borrows ejs.MetricsAggregationMixin.field as field
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    @desc
    <p>Aggregation that computes the bounding box containing all geo_point values for a field.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.GeoBoundsAggregation = function (name) {

    var
      _common = ejs.MetricsAggregationMixin(name, 'geo_bounds'),
      agg = _common.toJSON();

    // not supported in geo bounds aggregation
    delete _common.scriptValuesSorted;
    delete _common.script;
    delete _common.lang;
    delete _common.params;


    return extend(_common, {

      /**
      Optional parameter which specifies whether the bounding box should be allowed to overlap the international date line. The default value is true

      @member ejs.wrapLongitude
      @param {Boolean} trueFalse to overlap the international date line. 
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      wrapLongitude: function (trueFalse) {
        if (trueFalse == null) {
          return agg[name].geo_bounds.wrap_longitude;
        }

        agg[name].geo_bounds.wrap_longitude = trueFalse;
        return this;
      }

    });

  };
