  /**
    @class
    <p>A filter allowing to define scripts as filters</p>

    @name ejs.ScriptFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    A filter allowing to define scripts as filters.

    @param {String} script The script as a string.
    */
  ejs.ScriptFilter = function (script) {

    var
      _common = ejs.FilterMixin('script'),
      filter = _common.toJSON();
    
    filter.script.script = script;

    return extend(_common, {

      /**
            Sets the script.

            @member ejs.ScriptFilter
            @param {String} s The script as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      script: function (s) {
        if (s == null) {
          return filter.script.script;
        }
  
        filter.script.script = s;
        return this;
      },

      /**
            Sets parameters that will be applied to the script.  Overwrites 
            any existing params.

            @member ejs.ScriptFilter
            @param {Object} p An object where the keys are the parameter name and 
              values are the parameter value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      params: function (p) {
        if (p == null) {
          return filter.script.params;
        }
    
        filter.script.params = p;
        return this;
      },
    
      /**
            Sets the script language.

            @member ejs.ScriptFilter
            @param {String} lang The script language, default mvel.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      lang: function (lang) {
        if (lang == null) {
          return filter.script.lang;
        }
  
        filter.script.lang = lang;
        return this;
      }
      
    });
  };
