  /**
    @class
    <p>A query that match on any (configurable) of the provided terms. This is 
    a simpler syntax query for using a bool query with several term queries 
    in the should clauses.</p>

    @name ejs.TermsQuery
    @ejs query
    @borrows ejs.QueryMixin.boost as boost
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    A Query that matches documents containing provided terms. 

    @param {String} field the document field/key to query against
    @param {(String|String[])} terms a single term or array of "terms" to match
    */
  ejs.TermsQuery = function (field, terms) {

    var
      _common = ejs.QueryMixin('terms'),
      query = _common.toJSON();
    
    if (isString(terms)) {
      query.terms[field] = [terms];
    } else if (isArray(terms)) {
      query.terms[field] = terms;
    } else {
      throw new TypeError('Argument must be string or array');
    }
    
    return extend(_common, {

      /**
            Sets the fields to query against.

            @member ejs.TermsQuery
            @param {String} f A valid field name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (f) {
        var oldValue = query.terms[field];
      
        if (f == null) {
          return field;
        }

        delete query.terms[field];
        field = f;
        query.terms[f] = oldValue;
      
        return this;
      },
    
      /**
            Sets the terms.  If you t is a String, it is added to the existing
            list of terms.  If t is an array, the list of terms replaces the
            existing terms.

            @member ejs.TermsQuery
            @param {(String|String[])} t A single term or an array or terms.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      terms: function (t) {
        if (t == null) {
          return query.terms[field];
        }

        if (isString(t)) {
          query.terms[field].push(t);
        } else if (isArray(t)) {
          query.terms[field] = t;
        } else {
          throw new TypeError('Argument must be string or array');
        }
      
        return this;
      },

      /**
            Sets the minimum number of terms that need to match in a document
            before that document is returned in the results.

            @member ejs.TermsQuery
            @param {Integer} min A positive integer.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      minimumShouldMatch: function (min) {
        if (min == null) {
          return query.terms.minimum_should_match;
        }
      
        query.terms.minimum_should_match = min;
        return this;
      },
      
      /**
            Enables or disables similarity coordinate scoring of documents
            matching the <code>Query</code>. Default: false.

            @member ejs.TermsQuery
            @param {String} trueFalse A <code>true/false</code value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      disableCoord: function (trueFalse) {
        if (trueFalse == null) {
          return query.terms.disable_coord;
        }

        query.terms.disable_coord = trueFalse;
        return this;
      }
      
    });
  };
