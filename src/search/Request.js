  /**
    @class
    <p>The <code>Request</code> object provides methods generating and 
    executing search requests.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1895052">View Code Example</a></p>

    @name ejs.Request

    @desc
    <p>Provides methods for executing search requests</p>

    @param {Object} conf A configuration object containing the initilization
      parameters.  The following parameters can be set in the conf object:
        indices - single index name or array of index names
        types - single type name or array of types
        routing - the shard routing value
    */
  ejs.Request = function (conf) {

    var query, indices, types, routing;

    /**
        The internal query object.
        @member ejs.Request
        @property {Object} query
        */
    query = {};

    conf = conf || {};
    // check if we are searching across any specific indeices        
    if (conf.indices == null) {
      indices = [];
    } else if (isString(conf.indices)) {
      indices = [conf.indices];
    } else {
      indices = conf.indices;
    }

    // check if we are searching across any specific types
    if (conf.types == null) {
      types = [];
    } else if (isString(conf.types)) {
      types = [conf.types];
    } else {
      types = conf.types;
    }

    // check that an index is specified when a type is
    // if not, search across _all indices
    if (indices.length === 0 && types.length > 0) {
      indices = ["_all"];
    }

    if (conf.routing != null) {
      routing = conf.routing;
    } else {
      routing = '';
    }
    
    return {

      /**
            Sets the sorting for the query.  This accepts many input formats.
            
            sort() - The current sorting values are returned.
            sort(fieldName) - Adds the field to the current list of sorting values.
            sort(fieldName, order) - Adds the field to the current list of
              sorting with the specified order.  Order must be asc or desc.
            sort(ejs.Sort) - Adds the Sort value to the current list of sorting values. 
            sort(array) - Replaces all current sorting values with values
              from the array.  The array must contain only strings and Sort
              objects.

            Multi-level sorting is supported so the order in which sort fields 
            are added to the query requests is relevant.
            
            It is recommended to use <code>Sort</code> objects when possible.
            
            @member ejs.Request
            @param {String} fieldName The field to be sorted by.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      sort: function () {
        var i, len;
        
        if (!has(query, "sort")) {
          query.sort = [];
        }

        if (arguments.length === 0) {
          return query.sort;
        }
      
        // if passed a single argument
        if (arguments.length === 1) {
          var sortVal = arguments[0];
          
          if (isString(sortVal)) {
            // add  a single field name
            query.sort.push(sortVal);
          } else if (isSort(sortVal)) {
            // add the Sort object
            query.sort.push(sortVal._self());
          } else if (isArray(sortVal)) {
            // replace with all values in the array
            // the values must be a fieldName (string) or a
            // Sort object.  Any other type throws an Error.
            query.sort = [];
            for (i = 0, len = sortVal.length; i < len; i++) {
              if (isString(sortVal[i])) {
                query.sort.push(sortVal[i]);
              } else if (isSort(sortVal[i])) {
                query.sort.push(sortVal[i]._self());
              } else {
                throw new TypeError('Invalid object in array');
              }
            }
          } else {
            // Invalid object type as argument.
            throw new TypeError('Argument must be string, Sort, or array');
          } 
        } else if (arguments.length === 2) {
          // handle the case where a single field name and order are passed
          var field = arguments[0],
            order = arguments[1];
            
          if (isString(field) && isString(order)) {
            order = order.toLowerCase();
            if (order === 'asc' || order === 'desc') {
              var sortObj = {};
              sortObj[field] = {order: order};
              query.sort.push(sortObj);
            }
          }
        }

        return this;
      },

      /**
           Enables score computation and tracking during sorting.  Be default, 
           when sorting scores are not computed.

            @member ejs.Request
            @param {Boolean} trueFalse If scores should be computed and tracked.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      trackScores: function (trueFalse) {
        if (trueFalse == null) {
          return query.track_scores;
        }
      
        query.track_scores = trueFalse;
        return this;
      },
      
      /**
            Sets the number of results/documents to be returned. This is set on a per page basis.

            @member ejs.Request
            @param {Integer} s The number of results that are to be returned by the search.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      size: function (s) {
        if (s == null) {
          return query.size;
        }
      
        query.size = s;
        return this;
      },

      /**
            A search timeout, bounding the search request to be executed 
            within the specified time value and bail with the hits accumulated 
            up to that point when expired. Defaults to no timeout.

            @member ejs.Request
            @param {Long} t The timeout value in milliseconds.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      timeout: function (t) {
        if (t == null) {
          return query.timeout;
        }
      
        query.timeout = t;
        return this;
      },
                  
      /**
            Sets the shard routing parameter.  Only shards matching routing
            values will be searched.  Set to an empty string to disable routing.
            Disabled by default.

            @member ejs.Request
            @param {String} route The routing values as a comma-separated string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      routing: function (route) {
        if (route == null) {
          return routing;
        }
      
        routing = route;
        return this;
      },

      /**
            By default, searches return full documents, meaning every property or field.
            This method allows you to specify which fields you want returned.
            
            Pass a single field name and it is appended to the current list of
            fields.  Pass an array of fields and it replaces all existing 
            fields.

            @member ejs.Request
            @param {String || Array} s The field as a string or fields as array
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      fields: function (fieldList) {
        if (fieldList == null) {
          return query.fields;
        }
      
        if (query.fields == null) {
          query.fields = [];
        }
        
        if (isString(fieldList)) {
          query.fields.push(fieldList);
        } else if (isArray(fieldList)) {
          query.fields = fieldList;
        } else {
          throw new TypeError('Argument must be string or array');
        }
        
        return this;
      },

      /**
            A search result set could be very large (think Google). Setting the
            <code>from</code> parameter allows you to page through the result set
            by making multiple request. This parameters specifies the starting
            result/document number point. Combine with <code>size()</code> to achieve paging.

            @member ejs.Request
            @param {Array} f The offset at which to start fetching results/documents from the result set.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      from: function (f) {
        if (f == null) {
          return query.from;
        }
        
        query.from = f;
        return this;
      },

      /**
            Allows you to set the specified query on this search object. This is the
            query that will be used when the search is executed.

            @member ejs.Request
            @param {Query} someQuery Any valid <code>Query</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      query: function (someQuery) {
        if (someQuery == null) {
          return query.query;
        }
      
        if (!isQuery(someQuery)) {
          throw new TypeError('Argument must be a Query');
        }
        
        query.query = someQuery._self();
        return this;
      },

      /**
            Allows you to set the specified indices on this request object. This is the
            set of indices that will be used when the search is executed.

            @member ejs.Request
            @param {Array} indexArray An array of collection names.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      indices: function (indexArray) {
        if (indexArray == null) {
          return indices;
        } else if (isString(indexArray)) {
          indices = [indexArray];
        } else if (isArray(indexArray)) {
          indices = indexArray;
        } else {
          throw new TypeError('Argument must be a string or array');
        }

        // check that an index is specified when a type is
        // if not, search across _all indices
        if (indices.length === 0 && types.length > 0) {
          indices = ["_all"];
        }

        return this;
      },

      /**
            Allows you to set the specified content-types on this request object. This is the
            set of indices that will be used when the search is executed.

            @member ejs.Request
            @param {Array} typeArray An array of content-type names.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      types: function (typeArray) {
        if (typeArray == null) {
          return types;
        } else if (isString(typeArray)) {
          types = [typeArray];
        } else if (isArray(typeArray)) {
          types = typeArray;
        } else {
          throw new TypeError('Argument must be a string or array');
        }

        // check that an index is specified when a type is
        // if not, search across _all indices
        if (indices.length === 0 && types.length > 0) {
          indices = ["_all"];
        }

        return this;
      },

      /**
            Allows you to set the specified facet on this request object. Multiple facets can
            be set, all of which will be returned when the search is executed.

            @member ejs.Request
            @param {Facet} facet Any valid <code>Facet</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      facet: function (facet) {
        if (facet == null) {
          return query.facets;
        }
      
        if (query.facets == null) {
          query.facets = {};
        }
      
        if (!isFacet(facet)) {
          throw new TypeError('Argument must be a Facet');
        }
        
        extend(query.facets, facet._self());

        return this;
      },

      /**
            Allows you to set a specified filter on this request object.

            @member ejs.Request
            @param {Object} filter Any valid <code>Filter</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      filter: function (filter) {
        if (filter == null) {
          return query.filter;
        }
      
        if (!isFilter(filter)) {
          throw new TypeError('Argument must be a Filter');
        }
        
        query.filter = filter._self();
        return this;
      },

      /**
            Performs highlighting based on the <code>Highlight</code> 
            settings.

            @member ejs.Request
            @param {Highlight} h A valid Highlight object
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      highlight: function (h) {
        if (h == null) {
          return query.highlight;
        }
      
        if (!isHighlight(h)) {
          throw new TypeError('Argument must be a Highlight object');
        }

        query.highlight = h._self();
        return this;
      },

      /**
            Computes a document property dynamically based on the supplied <code>ScriptField</code>.

            @member ejs.Request
            @param {ScriptField} oScriptField A valid <code>ScriptField</code>.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      scriptField: function (oScriptField) {
        if (oScriptField == null) {
          return query.script_fields;
        }
      
        if (query.script_fields == null) {
          query.script_fields = {};
        }
      
        if (!isScriptField(oScriptField)) {
          throw new TypeError('Argument must be a ScriptField');
        }
        
        extend(query.script_fields, oScriptField._self());
        return this;
      },

      /**
            Controls a preference of which shard replicas to execute the search request on.
            By default, the operation is randomized between the each shard replicas.  The
            preference can be one of the following:

            _primary - the operation will only be executed on primary shards
            _local - the operation will prefer to be executed on local shards
            _only_node:$nodeid - the search will only be executed on node with id $nodeid
            custom - any string, will guarentee searches always happen on same node.

            @member ejs.Request
            @param {String} perf the preference, any of _primary, _local, _only_:$nodeid, or a custom string value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      preference: function (perf) {
        if (perf == null) {
          return query.preference;
        }
      
        query.preference = perf;
        return this;
      },

      /**
            Boosts hits in the specified index by the given boost value.

            @member ejs.Request
            @param {String} index the index to boost
            @param {Double} boost the boost value
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      indexBoost: function (index, boost) {
        if (query.indices_boost == null) {
          query.indices_boost = {};
        }

        if (arguments.length === 0) {
          return query.indices_boost;
        }
      
        query.indices_boost[index] = boost;
        return this;
      },

      /**
            Enable/Disable explanation of score for each search result.

            @member ejs.Request
            @param {Boolean} trueFalse true to enable, false to disable
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      explain: function (trueFalse) {
        if (trueFalse == null) {
          return query.explain;
        } 
        
        query.explain = trueFalse;
        return this;
      },

      /**
            Enable/Disable returning version number for each search result.

            @member ejs.Request
            @param {Boolean} trueFalse true to enable, false to disable
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      version: function (trueFalse) {
        if (trueFalse == null) {
          return query.version;
        }
        
        query.version = trueFalse;
        return this;
      },

      /**
            Filters out search results will scores less than the specified minimum score.

            @member ejs.Request
            @param {Double} min a positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      minScore: function (min) {
        if (min == null) {
          return query.min_score;
        }
        
        query.min_score = min;
        return this;
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.Request
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            The type of ejs object.  For internal use only.
            
            @member ejs.Request
            @returns {String} the type of object
            */
      _type: function () {
        return 'request';
      },
      
      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.Request
            @returns {String} returns this object's internal object representation.
            */
      _self: function () {
        return query;
      },
      
      /**
            Executes the search. This call runs synchronously when used on the server side.
            The callback is still executed and the function returns the return value of the callback.

            @member ejs.Request
            @param {Function} fnCallBack A callback function that handles the search response.
            @returns {void} Returns the value of the callback when executing on the server.
            */
      doSearch: function (fnCallBack) {
        var 
          queryData = JSON.stringify(query),
          searchUrl = '';
      
        // make sure the user has set a client
        if (ejs.client == null) {
          throw new Error("No Client Set");
        }
          
        // generate the search url
        if (indices.length > 0) {
          searchUrl = searchUrl + '/' + indices.join();
        }

        if (types.length > 0) {
          searchUrl = searchUrl + '/' + types.join();
        }
        
        searchUrl = searchUrl + '/_search';
        
        if (routing !== '') {
          searchUrl = searchUrl + '?routing=' + encodeURIComponent(routing);
        }
        
        return ejs.client.post(searchUrl, queryData, fnCallBack);
      }
    };
  };
