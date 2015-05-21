  /**
    @class
    <p>A single-value metrics aggregation that keeps track and returns the
    minimum value among numeric values extracted from the aggregated documents.
    These values can be extracted either from specific numeric fields in the
    documents, or be generated by a provided script.</p>

    @name ejs.MinAggregation
    @ejs aggregation
    @borrows ejs.MetricsAggregationMixin.field as field
    @borrows ejs.MetricsAggregationMixin.script as script
    @borrows ejs.MetricsAggregationMixin.lang as lang
    @borrows ejs.MetricsAggregationMixin.scriptValuesSorted as scriptValuesSorted
    @borrows ejs.MetricsAggregationMixin.params as params
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    @desc
    <p>Aggregation that keeps track and returns the minimum value among numeric
    values extracted from the aggregated documents.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.ScriptedMetricAggregation = function (name) {

    var
      _common = ejs.MetricsAggregationMixin(name, 'scripted_metric'),
      agg = _common.toJSON();
      
    delete _common.field;

    return extend(_common, {
        /**
      <p>Sets the init_script_file.</p>

      @member ejs.ScriptedMetricAggregation
      @param {String} init_script_file A valid script file name.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      init_script_file: function (init_script_file) {
        if (init_script_file == null) {
          return agg[name].scripted_metric.init_script_file;
        }

        agg[name].scripted_metric.init_script_file = init_script_file;
        return this;
      },
        
                /**
      <p>Sets the map_script_file.</p>

      @member ejs.ScriptedMetricAggregation
      @param {String} map_script_file A valid script file name.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      map_script_file : function (map_script_file) {
        if (map_script_file == null) {
          return agg[name].scripted_metric.map_script_file;
        }

        agg[name].scripted_metric.map_script_file = map_script_file;
        return this;
      },
        
                /**
      <p>Sets the combine_script_file.</p>

      @member ejs.ScriptedMetricAggregation
      @param {String} combine_script_file A valid script file name.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      combine_script_file: function (combine_script_file) {
        if (combine_script_file == null) {
          return agg[name].scripted_metric.combine_script_file;
        }

        agg[name].scripted_metric.combine_script_file = combine_script_file;
        return this;
      },
        
                /**
      <p>Sets the reduce_script_file.</p>

      @member ejs.ScriptedMetricAggregation
      @param {String} reduce_script_file A valid script file name.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      reduce_script_file: function (reduce_script_file) {
        if (reduce_script_file == null) {
          return agg[name].scripted_metric.reduce_script_file;
        }

        agg[name].scripted_metric.reduce_script_file = reduce_script_file;
        return this;
      }
    });
  };
