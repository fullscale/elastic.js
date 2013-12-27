  /**
    @class
    <p>This filter can be used to match on all the documents
    in a given set of collections and/or types.</p>

    @name ejs.MatchAllFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    <p>A filter that matches on all documents</p>

     */
  ejs.MatchAllFilter = function () {
    return ejs.FilterMixin('match_all');
  };
