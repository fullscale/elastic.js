  /**
    @class
    <p>A facet which returns the N most frequent terms within a collection
       or set of collections. Term facets are useful for building constructs
       which allow users to refine search results by filtering on terms returned
       by the facet.</p>

    <p>Facets are similar to SQL <code>GROUP BY</code> statements but perform much
       better. You can also construct several <em>"groups"</em> at once by simply
       specifying multiple facets.</p>

    <p>For more information on faceted navigation, see this Wikipedia article on
       <a href="http://en.wikipedia.org/wiki/Faceted_classification">Faceted Classification</a></p<

    @name ejs.TermsFacet
    @ejs facet
    @borrows ejs.FacetMixin.facetFilter as facetFilter
    @borrows ejs.FacetMixin.global as global
    @borrows ejs.FacetMixin.mode as mode
    @borrows ejs.FacetMixin.cacheFilter as cacheFilter
    @borrows ejs.FacetMixin.scope as scope
    @borrows ejs.FacetMixin.nested as nested
    @borrows ejs.FacetMixin._type as _type
    @borrows ejs.FacetMixin.toJSON as toJSON

    @desc
    <p>A facet which returns the N most frequent terms within a collection
       or set of collections.</p>

    @param {String} name The name which be used to refer to this facet. For instance,
        the facet itself might utilize a field named <code>doc_authors</code>. Setting
        <code>name</code> to <code>Authors</code> would allow you to refer to the
        facet by that name, possibly simplifying some of the display logic.

    */
  ejs.TermsFacet = function (name) {

    var
      _common = ejs.FacetMixin(name),
      facet = _common.toJSON();

    facet[name].terms = {};

    return extend(_common, {

      /**
            Sets the field to be used to construct the this facet.  Set to
            _index to return a facet count of hits per _index the search was
            executed on.

            @member ejs.TermsFacet
            @param {String} fieldName The field name whose data will be used to construct the facet.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (fieldName) {
        if (fieldName == null) {
          return facet[name].terms.field;
        }

        facet[name].terms.field = fieldName;
        return this;
      },

      /**
            Aggregate statistical info across a set of fields.

            @member ejs.TermsFacet
            @param {Array} aFieldName An array of field names.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      fields: function (fields) {
        if (fields == null) {
          return facet[name].terms.fields;
        }

        if (!isArray(fields)) {
          throw new TypeError('Argument must be an array');
        }

        facet[name].terms.fields = fields;
        return this;
      },

      /**
            Sets a script that will provide the terms for a given document.

            @member ejs.TermsFacet
            @param {String} script The script code.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      scriptField: function (script) {
        if (script == null) {
          return facet[name].terms.script_field;
        }

        facet[name].terms.script_field = script;
        return this;
      },

      /**
            Sets the number of facet entries that will be returned for this facet. For instance, you
            might ask for only the top 5 <code>authors</code> although there might be hundreds of
            unique authors.

            @member ejs.TermsFacet
            @param {Integer} facetSize The numer of facet entries to be returned.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      size: function (facetSize) {
        if (facetSize == null) {
          return facet[name].terms.size;
        }

        facet[name].terms.size = facetSize;
        return this;
      },


      /**
            Determines how many terms the coordinating node will request from
            each shard.

            @member ejs.TermsFacet
            @param {Integer} shardSize The numer of terms to fetch from each shard.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      shardSize: function (shardSize) {
        if (shardSize == null) {
          return facet[name].terms.shard_size;
        }

        facet[name].terms.shard_size = shardSize;
        return this;
      },

      /**
            Sets the type of ordering that will be performed on the date
            buckets.  Valid values are:

            count - default, sort by the number of items in the bucket
            term - sort by term value.
            reverse_count - reverse sort of the number of items in the bucket
            reverse_term - reverse sort of the term value.

            @member ejs.TermsFacet
            @param {String} o The ordering method
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      order: function (o) {
        if (o == null) {
          return facet[name].terms.order;
        }

        o = o.toLowerCase();
        if (o === 'count' || o === 'term' ||
          o === 'reverse_count' || o === 'reverse_term') {

          facet[name].terms.order = o;
        }

        return this;
      },

      /**
            <p>Allows you to return all terms, even if the frequency count is 0. This should not be
               used on fields that contain a large number of unique terms because it could cause
               <em>out-of-memory</em> errors.</p>

            @member ejs.TermsFacet
            @param {String} trueFalse <code>true</code> or <code>false</code>
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      allTerms: function (trueFalse) {
        if (trueFalse == null) {
          return facet[name].terms.all_terms;
        }

        facet[name].terms.all_terms = trueFalse;
        return this;
      },

      /**
            <p>Allows you to filter out unwanted facet entries. When passed
            a single term, it is appended to the list of currently excluded
            terms.  If passed an array, it overwrites all existing values.</p>

            @member ejs.TermsFacet
            @param {(String|String[])} exclude A single term to exclude or an
              array of terms to exclude.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      exclude: function (exclude) {
        if (facet[name].terms.exclude == null) {
          facet[name].terms.exclude = [];
        }

        if (exclude == null) {
          return facet[name].terms.exclude;
        }

        if (isString(exclude)) {
          facet[name].terms.exclude.push(exclude);
        } else if (isArray(exclude)) {
          facet[name].terms.exclude = exclude;
        } else {
          throw new TypeError('Argument must be string or array');
        }

        return this;
      },

      /**
            <p>Allows you to only include facet entries matching a specified regular expression.</p>

            @member ejs.TermsFacet
            @param {String} exp A valid regular expression.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      regex: function (exp) {
        if (exp == null) {
          return facet[name].terms.regex;
        }

        facet[name].terms.regex = exp;
        return this;
      },

      /**
            <p>Allows you to set the regular expression flags to be used
            with the <code>regex</code></p>

            @member ejs.TermsFacet
            @param {String} flags A valid regex flag - see <a href="http://docs.oracle.com/javase/6/docs/api/java/util/regex/Pattern.html#field_summary">Java Pattern API</a>
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      regexFlags: function (flags) {
        if (flags == null) {
          return facet[name].terms.regex_flags;
        }

        facet[name].terms.regex_flags = flags;
        return this;
      },

      /**
            Allows you modify the term using a script. The modified value
            is then used in the facet collection.

            @member ejs.TermsFacet
            @param {String} scriptCode A valid script string to execute.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      script: function (scriptCode) {
        if (scriptCode == null) {
          return facet[name].terms.script;
        }

        facet[name].terms.script = scriptCode;
        return this;
      },

      /**
            The script language being used. Currently supported values are
            <code>javascript</code>, <code>groovy</code>, and <code>mvel</code>.

            @member ejs.TermsFacet
            @param {String} language The language of the script.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      lang: function (language) {
        if (language == null) {
          return facet[name].terms.lang;
        }

        facet[name].terms.lang = language;
        return this;
      },

      /**
            Sets parameters that will be applied to the script.  Overwrites
            any existing params.

            @member ejs.TermsFacet
            @param {Object} p An object where the keys are the parameter name and
              values are the parameter value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      params: function (p) {
        if (p == null) {
          return facet[name].terms.params;
        }

        facet[name].terms.params = p;
        return this;
      },

      /**
            Sets the execution hint determines how the facet is computed.
            Currently only supported value is "map".

            @member ejs.TermsFacet
            @param {Object} h The hint value as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      executionHint: function (h) {
        if (h == null) {
          return facet[name].terms.execution_hint;
        }

        facet[name].terms.execution_hint = h;
        return this;
      }

    });
  };
