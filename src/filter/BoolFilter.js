  /**
    @class
    <p>A <code>BoolFilter</code> allows you to build <em>Boolean</em> filter constructs
    from individual filters. Similar in concept to Boolean query, except that 
    the clauses are other filters. Can be placed within queries that accept a 
    filter.
  
    @name ejs.BoolFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    A Filter that matches documents matching boolean combinations of other
    filters.

    */
  ejs.BoolFilter = function () {

    var
      _common = ejs.FilterMixin('bool'),
      filter = _common.toJSON();

    return extend(_common, {

      /**
             Adds filter to boolean container. Given filter "must" appear in 
             matching documents.  If passed a single Filter it is added to the
             list of existing filters.  If passed an array of Filters, they
             replace all existing filters.

             @member ejs.BoolFilter
             @param {(Filter|Filter[])} oFilter A valid Filter or array of
              Filter objects.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      must: function (oFilter) {
        var i, len;
        
        if (filter.bool.must == null) {
          filter.bool.must = [];
        }
    
        if (oFilter == null) {
          return filter.bool.must;
        }

        if (isFilter(oFilter)) {
          filter.bool.must.push(oFilter.toJSON());
        } else if (isArray(oFilter)) {
          filter.bool.must = [];
          for (i = 0, len = oFilter.length; i < len; i++) {
            if (!isFilter(oFilter[i])) {
              throw new TypeError('Argument must be an array of Filters');
            }
            
            filter.bool.must.push(oFilter[i].toJSON());
          }
        } else {
          throw new TypeError('Argument must be a Filter or array of Filters');
        }
        
        return this;
      },

      /**
             Adds filter to boolean container. Given filter "must not" appear 
             in matching documents. If passed a single Filter it is added to 
             the list of existing filters.  If passed an array of Filters, 
             they replace all existing filters.

             @member ejs.BoolFilter
             @param {(Filter|Filter[])} oFilter A valid Filter or array of
               Filter objects.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      mustNot: function (oFilter) {
        var i, len;
        
        if (filter.bool.must_not == null) {
          filter.bool.must_not = [];
        }

        if (oFilter == null) {
          return filter.bool.must_not;
        }
    
        if (isFilter(oFilter)) {
          filter.bool.must_not.push(oFilter.toJSON());
        } else if (isArray(oFilter)) {
          filter.bool.must_not = [];
          for (i = 0, len = oFilter.length; i < len; i++) {
            if (!isFilter(oFilter[i])) {
              throw new TypeError('Argument must be an array of Filters');
            }
            
            filter.bool.must_not.push(oFilter[i].toJSON());
          }
        } else {
          throw new TypeError('Argument must be a Filter or array of Filters');
        }
        
        return this;
      },

      /**
             Adds filter to boolean container. Given filter "should" appear in 
             matching documents. If passed a single Filter it is added to 
             the list of existing filters.  If passed an array of Filters, 
             they replace all existing filters.

             @member ejs.BoolFilter
             @param {(Filter|Filter[])} oFilter A valid Filter or array of
                Filter objects.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      should: function (oFilter) {
        var i, len;
        
        if (filter.bool.should == null) {
          filter.bool.should = [];
        }

        if (oFilter == null) {
          return filter.bool.should;
        }
    
        if (isFilter(oFilter)) {
          filter.bool.should.push(oFilter.toJSON());
        } else if (isArray(oFilter)) {
          filter.bool.should = [];
          for (i = 0, len = oFilter.length; i < len; i++) {
            if (!isFilter(oFilter[i])) {
              throw new TypeError('Argument must be an array of Filters');
            }
            
            filter.bool.should.push(oFilter[i].toJSON());
          }
        } else {
          throw new TypeError('Argument must be a Filter or array of Filters');
        }
        
        return this;
      }
      
    });
  };
