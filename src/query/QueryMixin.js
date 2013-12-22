  /**
    @mixin
    <p>The QueryMixin provides support for common options used across 
    various <code>Query</code> implementations.  This object should not be 
    used directly.</p>

    @name ejs.QueryMixin
    */
  ejs.QueryMixin = function (type) {

    var query = {};
    query[type] = {};

    return {

      /**
            Sets the boost value for documents matching the <code>Query</code>.

            @member ejs.QueryMixin
            @param {Double} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query[type].boost;
        }

        query[type].boost = boost;
        return this;
      },
    
      /**
            The type of ejs object.  For internal use only.
          
            @member ejs.QueryMixin
            @returns {String} the type of object
            */
      _type: function () {
        return 'query';
      },
    
      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.QueryMixin
            @returns {String} returns this object's internal <code>query</code> property.
            */
      toJSON: function () {
        return query;
      }
  
    };
  };
