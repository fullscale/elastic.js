  /**
    @class
    <p>Constructs a filter for docs matching any of the terms added to this
    object. Unlike a RangeFilter this can be used for filtering on multiple
    terms that are not necessarily in a sequence.</p>

    @name ejs.TermFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    Constructs a filter for docs matching the term added to this object.

    @param {string} fieldName The document field/fieldName to execute the filter against.
    @param {string} term The literal term used to filter the results.
    */
  ejs.TermFilter = function (fieldName, term) {

    var
      _common = ejs.FilterMixin('term'),
      filter = _common.toJSON();

    filter.term[fieldName] = term;

    return extend(_common, {

      /**
             Provides access to the filter fieldName used to construct the 
             termFilter object.
             
             @member ejs.TermFilter
             @param {String} f the fieldName term
             @returns {Object} returns <code>this</code> so that calls can be chained.
              When k is not specified, Returns {String}, the filter fieldName used to construct 
              the termFilter object.
             */
      field: function (f) {
        var oldValue = filter.term[fieldName];
      
        if (f == null) {
          return fieldName;
        }
      
        delete filter.term[fieldName];
        fieldName = f;
        filter.term[fieldName] = oldValue;
      
        return this;
      },

      /**
             Provides access to the filter term used to construct the 
             termFilter object.
             
             @member ejs.TermFilter
             @returns {Object} returns <code>this</code> so that calls can be chained.
              When k is not specified, Returns {String}, the filter term used 
              to construct the termFilter object.
             */
      term: function (v) {
        if (v == null) {
          return filter.term[fieldName];
        }
      
        filter.term[fieldName] = v;
        return this;
      }
      
    });
  };
