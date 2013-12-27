  /**
    @class
    <p>This query can be used to match all the documents
    in a given set of collections and/or types.</p>

    @name ejs.MatchAllQuery
    @ejs query
    @borrows ejs.QueryMixin.boost as boost
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    <p>A query that returns all documents.</p>

     */
  ejs.MatchAllQuery = function () {
    return ejs.QueryMixin('match_all');
  };
