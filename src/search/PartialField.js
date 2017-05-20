  /**
    @class
    <p>When loading data from _source, partial fields can be used 
    to use wildcards to control what part of the _source will be loaded 
    based on include and exclude patterns. </p>

    @name ejs.PartialField
    @ejs request

    @desc
    <p>Control what part of the _source will be loaded.</p>

    @param {String} fieldName A name of the partial field to create.

    */
  ejs.PartialField = function (fieldName) {
    var partial = {};

    partial[fieldName] = {};

    return {

      /**
            Allows to control how the _source field is returned with every hit.
            By default operations return the contents of the _source field
            unless you have used the fields parameter or if the _source field
            is disabled.  Set the includes parameter to false to completely
            disable returning the source field.

            @member ejs.PartialField
            @param {(String|String[])} include The field or list of fields to include as array.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      include: function (include) {
        if (include == null) {
          return partial[fieldName].include;
        }

        if (!isArray(include) && !isString(include)) {
          throw new TypeError('Argument include must be a string or an array');
        }

        partial[fieldName].include = include;

        return this;
      },

      /**
            Allows to control how the _source field is returned with every hit.
            By default operations return the contents of the _source field
            unless you have used the fields parameter or if the _source field
            is disabled.  Set the includes parameter to false to completely
            disable returning the source field.

            @member ejs.PartialField
            @param {(String|String[])} exclude The optional field or list of fields to exclude.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      exclude: function (exclude) {
        if (exclude == null) {
          return partial[fieldName].exclude;
        }

        if (!isArray(exclude) && !isString(exclude)) {
          throw new TypeError('Argument exclude must be a string or an array');
        }

        partial[fieldName].exclude = exclude;

        return this;
      },
  
      /**
            The type of ejs object.  For internal use only.
            
            @member ejs.PartialField
            @returns {String} the type of object
            */
      _type: function () {
        return 'partial field';
      },
      
      /**
            Retrieves the internal <code>script</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.PartialField
            @returns {String} returns this object's internal <code>facet</code> property.
            */
      toJSON: function () {
        return partial;
      }
    };
  };
