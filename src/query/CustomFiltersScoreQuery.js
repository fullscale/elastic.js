  /**
    @class
    <p>A custom_filters_score query allows to execute a query, and if the hit 
    matches a provided filter (ordered), use either a boost or a script 
    associated with it to compute the score.</p>

    <p>This can considerably simplify and increase performance for parameterized 
    based scoring since filters are easily cached for faster performance, and 
    boosting / script is considerably simpler.</p>
  
    @name ejs.CustomFiltersScoreQuery

    @desc
    Returned documents matched by the query and scored based on if the document
    matched in a filter.  

    @param {Object} qry A valid query object.
    @param {Array} filters An array of objects.  Each object must have a 
      'filter' property and either a 'boost' or 'script' property.
    */
  ejs.CustomFiltersScoreQuery = function (qry, filters) {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.CustomFiltersScoreQuery
         @property {Object} query
         */
    var query = {
      custom_filters_score: {
        query: qry.get(),
        filters: []
      }
    },
  
    // generate a valid filter object that can be inserted into the filters
    // array.  Returns null when an invalid filter is passed in.
    genFilterObject = function (filter) {
      var obj = null;
    
      if (filter.filter) {
        obj = {
          filter: filter.filter.get()
        };
      
        if (filter.boost) {
          obj.boost = filter.boost;
        } else if (filter.script) {
          obj.script = filter.script;
        } else {
          // invalid filter, must boost or script must be specified
          obj = null;
        }
      }
    
      return obj;
    }; 

    each(filters, function (filter) {
      var fObj = genFilterObject(filter);
      if (fObj !== null) {
        query.custom_filters_score.filters.push(fObj);
      }
    });
  
    return {

      /**
            Sets the query to be apply the custom boost to.

            @member ejs.CustomFiltersScoreQuery
            @param {Object} q A valid Query object
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      query: function (q) {
        if (q == null) {
          return query.custom_filters_score.query;
        }
  
        query.custom_filters_score.query = q.get();
        return this;
      },

      /**
            Sets the filters and their related boost or script scoring method.
            Takes an array of objects where each object has a 'filter' property
            and either a 'boost' or 'script' property.  Overwrites any existing
            filters.
          
            <code>
            {filter: someFilter, boost: 2.1}
            </code>

            @member ejs.CustomFiltersScoreQuery
            @param {Array} fltrs An array of objects contining a filter and
              either a boost or script property.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      filters: function (fltrs) {
        if (fltrs == null) {
          return query.custom_filters_score.filters;
        }
  
        query.custom_filters_score.filters = [];
        each(fltrs, function (f) {
          var fObj = genFilterObject(f);
          if (fObj !== null) {
            query.custom_filters_score.filters.push(fObj);
          }
        });
      
        return this;
      },
    
      /**
            A score_mode can be defined to control how multiple matching 
            filters control the score. By default, it is set to first which 
            means the first matching filter will control the score of the 
            result. It can also be set to min/max/total/avg/multiply which 
            will aggregate the result from all matching filters based on the 
            aggregation type.

            @member ejs.CustomFiltersScoreQuery
            @param {String} s The scoring type as a string. 
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      scoreMode: function (s) {
        if (s == null) {
          return query.custom_filters_score.score_mode;
        }

        s = s.toLowerCase();
        if (s === 'first' || s === 'min' || s === 'max' || s === 'total' || s === 'avg' || s === 'multiply') {
          query.custom_filters_score.score_mode = s;
        }
    
        return this;
      },
    
      /**
            Sets parameters that will be applied to the script.  Overwrites 
            any existing params.

            @member ejs.CustomFiltersScoreQuery
            @param {Object} q An object where the keys are the parameter name and 
              values are the parameter value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      params: function (p) {
        if (p == null) {
          return query.custom_filters_score.params;
        }
    
        query.custom_filters_score.params = p;
        return this;
      },
  
      /**
            Sets the language used in the script.  

            @member ejs.CustomFiltersScoreQuery
            @param {String} l The script language, defatuls to mvel.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      lang: function (l) {
        if (l == null) {
          return query.custom_filters_score.lang;
        }

        query.custom_filters_score.lang = l;
        return this;
      },

      /**
            Sets the maximum value a computed boost can reach.

            @member ejs.CustomFiltersScoreQuery
            @param {Double} max A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      maxBoost: function (max) {
        if (max == null) {
          return query.custom_filters_score.max_boost;
        }

        query.custom_filters_score.max_boost = max;
        return this;
      },
        
      /**
            Sets the boost value of the <code>Query</code>.

            @member ejs.CustomFiltersScoreQuery
            @param {Double} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.custom_filters_score.boost;
        }

        query.custom_filters_score.boost = boost;
        return this;
      },
      
      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.CustomFiltersScoreQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.CustomFiltersScoreQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };
