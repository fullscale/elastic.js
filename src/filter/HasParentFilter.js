  /**
    @class
    <p>The has_parent results in child documents that have parent docs matching 
    the query being returned.</p>

    @name ejs.HasParentFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    Returns results that have parent documents matching the filter.

    @param {Object} qry A valid query object.
    @param {String} parentType The child type
    */
  ejs.HasParentFilter = function (qry, parentType) {

    if (!isQuery(qry)) {
      throw new TypeError('No Query object found');
    }
    
    var 
      _common = ejs.FilterMixin('has_parent'),
      filter = _common.toJSON();
    
    filter.has_parent.query = qry.toJSON();
    filter.has_parent.parent_type = parentType;

    return extend(_common, {

      /**
            Sets the query

            @member ejs.HasParentFilter
            @param {Object} q A valid Query object
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      query: function (q) {
        if (q == null) {
          return filter.has_parent.query;
        }

        if (!isQuery(q)) {
          throw new TypeError('Argument must be a Query object');
        }
        
        filter.has_parent.query = q.toJSON();
        return this;
      },
      
      /**
            Sets the filter

            @since elasticsearch 0.90
            @member ejs.HasParentFilter
            @param {Object} f A valid Filter object
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      filter: function (f) {
        if (f == null) {
          return filter.has_parent.filter;
        }

        if (!isFilter(f)) {
          throw new TypeError('Argument must be a Filter object');
        }
        
        filter.has_parent.filter = f.toJSON();
        return this;
      },

      /**
            Sets the child document type to search against

            @member ejs.HasParentFilter
            @param {String} t A valid type name
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      parentType: function (t) {
        if (t == null) {
          return filter.has_parent.parent_type;
        }

        filter.has_parent.parent_type = t;
        return this;
      },

      /**
            Sets the scope of the filter.  A scope allows to run facets on the 
            same scope name that will work against the parent documents. 

            @deprecated since elasticsearch 0.90
            @member ejs.HasParentFilter
            @param {String} s The scope name as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      scope: function (s) {
        return this;
      }
      
    });
  };
