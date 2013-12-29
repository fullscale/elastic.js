  /**
    @class
    <p>Filters documents that have fields that match any of the provided 
    terms (not analyzed)</p>

    @name ejs.TermsFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    A Filter that matches documents containing provided terms. 

    @param {String} field the document field/key to filter against
    @param {(String|String[])} terms a single term or an array of terms.
    */
  ejs.TermsFilter = function (field, terms) {

    var
      _common = ejs.FilterMixin('terms'),
      filter = _common.toJSON(),
    
      // make sure we are setup for a list of terms
      setupTerms = function () {
        if (!isArray(filter.terms[field])) {
          filter.terms[field] = [];
        }
      },
    
      // make sure we are setup for a terms lookup
      setupLookup = function () {
        if (isArray(filter.terms[field])) {
          filter.terms[field] = {};
        }
      };
   
    if (isArray(terms)) {
      filter.terms[field] = terms;
    } else {
      filter.terms[field] = [terms];
    }

    return extend(_common, {

      /**
            Sets the fields to filter against.

            @member ejs.TermsFilter
            @param {String} f A valid field name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (f) {
        var oldValue = filter.terms[field];
    
        if (f == null) {
          return field;
        }

        delete filter.terms[field];
        field = f;
        filter.terms[f] = oldValue;
    
        return this;
      },
  
      /**
            Sets the terms.  If t is a String, it is added to the existing
            list of terms.  If t is an array, the list of terms replaces the
            existing terms.

            @member ejs.TermsFilter
            @param {(String|String[])} t A single term or an array or terms.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      terms: function (t) {
        setupTerms();
        if (t == null) {
          return filter.terms[field];
        }
        
        if (isArray(t)) {
          filter.terms[field] = t;
        } else {
          filter.terms[field].push(t);
        }
    
        return this;
      },

      /**
            Sets the index the document containing the terms is in when 
            performing a terms lookup.  Defaults to the index currently 
            being searched.

            @since elasticsearch 0.90
            @member ejs.TermsFilter
            @param {String} idx A valid index name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      index: function (idx) {
        setupLookup();
        if (idx == null) {
          return filter.terms[field].index;
        }
        
        filter.terms[field].index = idx;
        return this;
      },

      /**
            Sets the type the document containing the terms when performing a 
            terms lookup.

            @since elasticsearch 0.90
            @member ejs.TermsFilter
            @param {String} type A valid type name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      type: function (type) {
        setupLookup();
        if (type == null) {
          return filter.terms[field].type;
        }
        
        filter.terms[field].type = type;
        return this;
      },


      /**
            Sets the document id of the document containing the terms to use
            when performing a terms lookup.

            @since elasticsearch 0.90
            @member ejs.TermsFilter
            @param {String} id A valid index name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      id: function (id) {
        setupLookup();
        if (id == null) {
          return filter.terms[field].id;
        }
        
        filter.terms[field].id = id;
        return this;
      },
      
      /**
            Sets the path/field name where the terms in the source document
            are located when performing a terms lookup.

            @since elasticsearch 0.90
            @member ejs.TermsFilter
            @param {String} path A valid index name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      path: function (path) {
        setupLookup();
        if (path == null) {
          return filter.terms[field].path;
        }
        
        filter.terms[field].path = path;
        return this;
      },
      
      /**
            Sets the routing value for the source document when performing a 
            terms lookup.

            @since elasticsearch 0.90.2
            @member ejs.TermsFilter
            @param {String} path A valid index name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      routing: function (r) {
        setupLookup();
        if (r == null) {
          return filter.terms[field].routing;
        }
        
        filter.terms[field].routing = r;
        return this;
      },
      
      /**
            Enable or disable caching of the lookup

            @member ejs.TermsFilter
            @param {Boolean} trueFalse True to cache the lookup, false otherwise.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      cacheLookup: function (trueFalse) {
        setupLookup();
        if (trueFalse == null) {
          return filter.terms[field].cache;
        }

        filter.terms[field].cache = trueFalse;
        return this;
      },
      
      /**
            Sets the way terms filter executes is by iterating over the terms 
            provided and finding matches docs (loading into a bitset) and 
            caching it.  Valid values are: plain, bool, bool_nocache, and, 
            and_nocache, or, or_nocache.  Defaults to plain.

            @member ejs.TermsFilter
            @param {String} e A valid execution method.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      execution: function (e) {
        if (e == null) {
          return filter.terms.execution;
        }
      
        e = e.toLowerCase();
        if (e === 'plain' || e === 'bool' || e === 'bool_nocache' || 
          e === 'and' || e === 'and_nocache' || e === 'or' || e === 'or_nocache') {
          filter.terms.execution = e;
        }
      
        return this;
      }
      
    });
  };
