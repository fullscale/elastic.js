  /**
    @class
    <p>A scripted metric aggregation.</p>

    @name ejs.ScriptedMetricAggregation
    @ejs aggregation
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    */
  ejs.ScriptedMetricAggregation = function (name) {
    var
      _common = ejs.MetricsAggregationMixin(name, 'scripted_metric'),
      agg = _common.toJSON();

    return extend(_common, {
      /**
      <p>Sets the initialization script.</p>

      @member ejs.ScriptedMetricAggregation
      @param {String} initScript The initialization script
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      initScript: function (initScript) {
        if (initScript == null) {
          return agg[name].scripted_metric.init_script;
        }

        agg[name].scripted_metric.init_script = initScript;
        return this;
      },

      /**
      <p>Sets the map script. This is the only required script.</p>
      @member ejs.ScriptedMetricAggregation
      @param {String} mapScript The map script.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      mapScript: function (mapScript) {
        if (mapScript == null) {
          return agg[name].scripted_metric.map_script;
        }

        agg[name].scripted_metric.map_script = mapScript;
        return this;
      },

      /**
      <p>Sets the combine phase script.</p>
      @member ejs.ScriptedMetricAggregation
      @param {String} combineScript The combine script.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      combineScript: function (combineScript) {
        if (combineScript == null) {
          return agg[name].scripted_metric.combine_script;
        }

        agg[name].scripted_metric.combine_script = combineScript;
        return this;
      },

      /**
      <p>Sets the combine phase script.</p>
      @member ejs.ScriptedMetricAggregation
      @param {String} reduceScript The reduce script.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      reduceScript: function (reduceScript) {
        if (reduceScript == null) {
          return agg[name].scripted_metric.reduce_script;
        }

        agg[name].scripted_metric.reduce_script = reduceScript;
        return this;
      },

      /**
      <p>Set parameters which will be passed to the init, map and combine scripts.</p>
      @member ejs.ScriptedMetricAggregation
      @param {String} params Parameters passed to the init, map and combine scripts.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      params: function (params) {
        if (params == null) {
          return agg[name].scripted_metric.params;
        }

        agg[name].scripted_metric.params = params;
        return this;
      },

      /**
      <p>Set parameters which will be passed to the reduce script.</p>
      @member ejs.ScriptedMetricAggregation
      @param {String} reduceParams Paramters to pass to the recude script.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      reduceParams: function (reduceParams) {
        if (reduceParams == null) {
          return agg[name].scripted_metric.reduce_params;
        }

        agg[name].scripted_metric.reduce_params = reduceParams;
        return this;
      },

      /**
      <p>Set the scripting language used for this aggregation.</p>
      @member ejs.ScriptedMetricAggregation
      @param {String} lang The script langauge.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      lang: function (lang) {
        if (lang == null) {
          return agg[name].scripted_metric.lang;
        }

        agg[name].scripted_metric.lang = lang;
        return this;
      }
    });
  };
