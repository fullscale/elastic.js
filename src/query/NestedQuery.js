  /**
    @class
    <p>Nested queries allow you to search against content within objects that are
       embedded inside of other objects. It is similar to <code>XPath</code> expressions
       in <code>XML</code> both conceptually and syntactically.</p>

    <p>The query is executed against the nested objects / docs as if they were 
    indexed as separate docs and resulting in the rootparent doc (or parent 
    nested mapping).</p>
    
    @name ejs.NestedQuery
    @ejs query
    @borrows ejs.QueryMixin.boost as boost
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    <p>Constructs a query that is capable of executing a search against objects
       nested within a document.</p>

    @param {String} path The nested object path.

     */
  ejs.NestedQuery = function (path) {

    var 
      _common = ejs.QueryMixin('nested'),
      query = _common.toJSON();
    
    query.nested.path = path;

    return extend(_common, {
      
      /**
             Sets the root context for the nested query.
             
             @member ejs.NestedQuery
             @param {String} path The path defining the root context for the nested query.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      path: function (path) {
        if (path == null) {
          return query.nested.path;
        }
      
        query.nested.path = path;
        return this;
      },

      /**
             Sets the nested query to be executed.
             
             @member ejs.NestedQuery
             @param {Object} oQuery A valid Query object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      query: function (oQuery) {
        if (oQuery == null) {
          return query.nested.query;
        }
    
        if (!isQuery(oQuery)) {
          throw new TypeError('Argument must be a Query');
        }
        
        query.nested.query = oQuery.toJSON();
        return this;
      },


      /**
             Sets the nested filter to be executed.
             
             @member ejs.NestedQuery
             @param {Object} oFilter A valid Filter object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      filter: function (oFilter) {
        if (oFilter == null) {
          return query.nested.filter;
        }
    
        if (!isFilter(oFilter)) {
          throw new TypeError('Argument must be a Filter');
        }
        
        query.nested.filter = oFilter.toJSON();
        return this;
      },

      /**
             Sets how the inner (nested) matches affect scoring on the parent document.
             
             @member ejs.NestedQuery
             @param {String} mode The mode of scoring to be used for nested matches.
                             Options are avg, total, max, none - defaults to avg
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      scoreMode: function (mode) {
        if (mode == null) {
          return query.nested.score_mode;
        }
      
        mode = mode.toLowerCase();
        if (mode === 'avg' || mode === 'total' || mode === 'max' || 
          mode === 'none' || mode === 'sum') {
            
          query.nested.score_mode = mode;
        }
        
        return this;
      },

      /**
            Sets the scope of the query.  A scope allows to run facets on the 
            same scope name that will work against the nested documents. 

            @deprecated since elasticsearch 0.90
            @member ejs.NestedQuery
            @param {String} s The scope name as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      scope: function (s) {
        return this;
      }
      
    });
  };
