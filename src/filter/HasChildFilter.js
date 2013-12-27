  /**
    @class
    <p>The has_child filter results in parent documents that have child docs 
    matching the query being returned.</p>

    @name ejs.HasChildFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    Returns results that have child documents matching the filter.

    @param {Object} qry A valid query object.
    @param {String} type The child type
    */
  ejs.HasChildFilter = function (qry, type) {

    if (!isQuery(qry)) {
      throw new TypeError('No Query object found');
    }
    
    var 
      _common = ejs.FilterMixin('has_child'),
      filter = _common.toJSON();
    
    filter.has_child.query = qry.toJSON();
    filter.has_child.type = type;

    return extend(_common, {

      /**
            Sets the query

            @member ejs.HasChildFilter
            @param {Query} q A valid Query object
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      query: function (q) {
        if (q == null) {
          return filter.has_child.query;
        }
  
        if (!isQuery(q)) {
          throw new TypeError('Argument must be a Query object');
        }
        
        filter.has_child.query = q.toJSON();
        return this;
      },

      /**
            Sets the filter

            @since elasticsearch 0.90
            @member ejs.HasChildFilter
            @param {Query} f A valid Filter object
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      filter: function (f) {
        if (f == null) {
          return filter.has_child.filter;
        }
  
        if (!isFilter(f)) {
          throw new TypeError('Argument must be a Filter object');
        }
        
        filter.has_child.filter = f.toJSON();
        return this;
      },

      /**
            Sets the child document type to search against

            @member ejs.HasChildFilter
            @param {String} t A valid type name
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      type: function (t) {
        if (t == null) {
          return filter.has_child.type;
        }
  
        filter.has_child.type = t;
        return this;
      },

      /**
            Sets the cutoff value to short circuit processing.

            @member ejs.HasChildFilter
            @param {Integer} cutoff A positive <code>integer</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      shortCircuitCutoff: function (cutoff) {
        if (cutoff == null) {
          return filter.has_child.short_circuit_cutoff;
        }

        filter.has_child.short_circuit_cutoff = cutoff;
        return this;
      },
      
      /**
            Sets the scope of the filter.  A scope allows to run facets on the 
            same scope name that will work against the child documents. 

            @deprecated since elasticsearch 0.90
            @member ejs.HasChildFilter
            @param {String} s The scope name as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      scope: function (s) {
        return this;
      }
      
    });
  };
