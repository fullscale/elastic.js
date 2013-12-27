  /**
    @class
    <p>A <code>TermQuery</code> can be used to return documents containing a given
    keyword or <em>term</em>. For instance, you might want to retieve all the
    documents/objects that contain the term <code>Javascript</code>. Term filters
    often serve as the basis for more complex queries such as <em>Boolean</em> queries.</p>

    @name ejs.TermQuery
    @ejs query
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    A Query that matches documents containing a term. This may be
    combined with other terms with a BooleanQuery.

    @param {String} field the document field/key to query against
    @param {String} term the literal value to be matched
    */
  ejs.TermQuery = function (field, term) {

    var
      _common = ejs.QueryMixin('term'),
      query = _common.toJSON();

    query.term[field] = {
      term: term
    };

    return extend(_common, {

      /**
            Sets the fields to query against.

            @member ejs.TermQuery
            @param {String} f A valid field name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (f) {
        var oldValue = query.term[field];
      
        if (f == null) {
          return field;
        }

        delete query.term[field];
        field = f;
        query.term[f] = oldValue;
      
        return this;
      },
    
      /**
            Sets the term.

            @member ejs.TermQuery
            @param {String} t A single term.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      term: function (t) {
        if (t == null) {
          return query.term[field].term;
        }

        query.term[field].term = t;
        return this;
      },
      
      /**
            Sets the boost value for documents matching the <code>Query</code>.

            @member ejs.TermQuery
            @param {Number} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.term[field].boost;
        }

        query.term[field].boost = boost;
        return this;
      }
      
    });
  };
