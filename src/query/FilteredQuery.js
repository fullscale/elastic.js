  /**
    @class
    <p>Filter queries allow you to restrict the results returned by a query. There are
    several different types of filters that can be applied
    (see <a href="/jsdocs/ejs.filter.html">filter</a> module). A <code>filterQuery</code>
    takes a <code>Query</code> and a <code>Filter</code> object as arguments and constructs
    a new <code>Query</code> that is then used for the search.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1893397">View Code Example</a></p>
    </p>

    @name ejs.FilteredQuery

    @desc
    <p>A query that applies a filter to the results of another query.</p>

    @param {Object} someQuery a valid <code>Query</code> object such as a <code>termQuery, boolQuery,</code> etc.
    @param {Object} someFilter a valid <code>Filter</code> object such as a <code>termFilter, andFilter,</code> etc.

     */
  ejs.FilteredQuery = function (someQuery, someFilter) {

    /**
         The internal query object. Use <code>get()</code>
         @member ejs.FilteredQuery
         @property {Object} query
         */
    var query = {
      filtered: {
        query: someQuery.get(),
        filter: someFilter.get()
      }
    };

    return {

      /**
             Converts this object to a json string
             @member ejs.FilteredQuery
             @returns {Object} string
             */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
             returns the query object.
             @member ejs.FilteredQuery
             @returns {Object} query object
             */
      get: function () {
        return query;
      }
    };
  };
