  /**
    @class
    <p>A spanTermQuery is the basic unit of Lucene's Span Query which allows for nested,
    positional restrictions when matching documents. The spanTermQuery simply matches
    spans containing a term. It's essentially a termQuery with positional information asscoaited.</p>

    @name ejs.SpanTermQuery
    @ejs query
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    Matches spans containing a term

    @param {String} field the document field/field to query against
    @param {String} value the literal value to be matched
    */
  ejs.SpanTermQuery = function (field, value) {

    var
      _common = ejs.QueryMixin('span_term'),
      query = _common.toJSON();

    query.span_term[field] = {
      term: value
    };

    return extend(_common, {

      /**
            Sets the field to query against.

            @member ejs.SpanTermQuery
            @param {String} f A valid field name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (f) {
        var oldValue = query.span_term[field];
      
        if (f == null) {
          return field;
        }

        delete query.span_term[field];
        field = f;
        query.span_term[f] = oldValue;
      
        return this;
      },
    
      /**
            Sets the term.

            @member ejs.SpanTermQuery
            @param {String} t A single term.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      term: function (t) {
        if (t == null) {
          return query.span_term[field].term;
        }

        query.span_term[field].term = t;
        return this;
      },
      
      /**
            Sets the boost value for documents matching the <code>Query</code>.

            @member ejs.SpanTermQuery
            @param {Double} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.span_term[field].boost;
        }

        query.span_term[field].boost = boost;
        return this;
      }
      
    });
  };
