  /**
    @class
    <p>A metric aggregation that executes using scripts to provide a metric output.</p>

    @name ejs.ScriptedMetricAggregation
    @ejs aggregation
    @borrows ejs.MetricsAggregationMixin.lang as lang
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
    delete _common.script;
    delete _common.scriptId;
    delete _common.scriptFile;
  
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
      <p>Sets the init_script_file.</p>

      @member ejs.ScriptedMetricAggregation
      @param {String} init_script_file A valid script file name.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      initScriptFile: function (init_script_file) {
        if (init_script_file == null) {
          return agg[name].scripted_metric.init_script_file;
        }

        agg[name].scripted_metric.init_script_file = init_script_file;
        return this;
      },

      /**
      <p>Sets the init_script_id.</p>

      @member ejs.ScriptedMetricAggregation
      @param {String} init_script_id A valid id from indexed script.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      initScriptId: function (init_script_id) {
        if (init_script_id == null) {
          return agg[name].scripted_metric.init_script_id;
        }

        agg[name].scripted_metric.init_script_id = init_script_id;
        return this;
      },
        
      /**
      <p>Sets the map_script_file.</p>

      @member ejs.ScriptedMetricAggregation
      @param {String} map_script_file A valid script file name.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      mapScriptFile : function (map_script_file) {
        if (map_script_file == null) {
          return agg[name].scripted_metric.map_script_file;
        }

        agg[name].scripted_metric.map_script_file = map_script_file;
        return this;
      },

      /**
      <p>Sets the map_script_id.</p>

      @member ejs.ScriptedMetricAggregation
      @param {String} map_script_id A valid id from indexed script.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      mapScriptId : function (map_script_id) {
        if (map_script_id == null) {
          return agg[name].scripted_metric.map_script_id;
        }

        agg[name].scripted_metric.map_script_id = map_script_id;
        return this;
      },

      /**
      <p>Sets the combine_script_file.</p>

      @member ejs.ScriptedMetricAggregation
      @param {String} combine_script_file A valid script file name.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      combineScriptFile: function (combine_script_file) {
        if (combine_script_file == null) {
          return agg[name].scripted_metric.combine_script_file;
        }

        agg[name].scripted_metric.combine_script_file = combine_script_file;
        return this;
      },
        
      /**
      <p>Sets the combine_script_id.</p>

      @member ejs.ScriptedMetricAggregation
      @param {String} combine_script_id A valid id from indexed script.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      combineScriptId: function (combine_script_id) {
        if (combine_script_id == null) {
          return agg[name].scripted_metric.combine_script_id;
        }

        agg[name].scripted_metric.combine_script_id = combine_script_id;
        return this;
      },

      /**
      <p>Sets the reduce_script_file.</p>

      @member ejs.ScriptedMetricAggregation
      @param {String} reduce_script_file A valid script file name.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      reduceScriptFile: function (reduce_script_file) {
        if (reduce_script_file == null) {
          return agg[name].scripted_metric.reduce_script_file;
        }

        agg[name].scripted_metric.reduce_script_file = reduce_script_file;
        return this;
      },

      /**
      <p>Sets the reduce_script_id.</p>

      @member ejs.ScriptedMetricAggregation
      @param {String} reduce_script_id A valid id from indexed script.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      reduceScriptId: function (reduce_script_id) {
        if (reduce_script_id == null) {
          return agg[name].scripted_metric.reduce_script_id;
        }

        agg[name].scripted_metric.reduce_script_id = reduce_script_id;
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
