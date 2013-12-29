  /**
    @class
    <p>The indices query can be used when executed across multiple indices, 
    allowing to have a query that executes only when executed on an index that 
    matches a specific list of indices, and another query that executes when it 
    is executed on an index that does not match the listed indices.</p>

    @name ejs.IndicesQuery
    @ejs query
    @borrows ejs.QueryMixin.boost as boost
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    A configurable query that is dependent on the index name.

    @param {Query} qry A valid query object.
    @param {(String|String[])} indices a single index name or an array of index 
      names.
    */
  ejs.IndicesQuery = function (qry, indices) {

    if (!isQuery(qry)) {
      throw new TypeError('Argument must be a Query');
    }
    
    var 
      _common = ejs.QueryMixin('indices'),
      query = _common.toJSON();
    
    query.indices.query = qry.toJSON();

    if (isString(indices)) {
      query.indices.indices = [indices];
    } else if (isArray(indices)) {
      query.indices.indices = indices;
    } else {
      throw new TypeError('Argument must be a string or array');
    }
  
    return extend(_common, {

      /**
            Sets the indicies the query should match.  When passed a string,
            the index name is added to the current list of indices.  When passed
            an array, it overwites all current indices.

            @member ejs.IndicesQuery
            @param {(String|String[])} i A single index name or an array of index names.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      indices: function (i) {
        if (i == null) {
          return query.indices.indices;
        }
  
        if (isString(i)) {
          query.indices.indices.push(i);
        } else if (isArray(i)) {
          query.indices.indices = i;
        } else {
          throw new TypeError('Argument must be a string or array');
        }

        return this;
      },
    
      /**
            Sets the query to be executed against the indices specified.

            @member ejs.IndicesQuery
            @param {Query} q A valid Query object
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      query: function (q) {
        if (q == null) {
          return query.indices.query;
        }
  
        if (!isQuery(q)) {
          throw new TypeError('Argument must be a Query');
        }
        
        query.indices.query = q.toJSON();
        return this;
      },

      /**
            Sets the query to be used on an index that does not match an index
            name in the indices list.  Can also be set to "none" to not match any
            documents or "all" to match all documents.

            @member ejs.IndicesQuery
            @param {(Query|String)} q A valid Query object or "none" or "all"
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      noMatchQuery: function (q) {
        if (q == null) {
          return query.indices.no_match_query;
        }
  
        if (isString(q)) {
          q = q.toLowerCase();
          if (q === 'none' || q === 'all') {
            query.indices.no_match_query = q;
          }
        } else if (isQuery(q)) {
          query.indices.no_match_query = q.toJSON();
        } else {
          throw new TypeError('Argument must be string or Query');
        }
      
        return this;
      }
      
    });
  };
